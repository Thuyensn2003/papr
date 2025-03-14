import { useState, useRef, useEffect } from "react";
import styles from "../styles/ChatBot.module.css";
// --- Các hàm hỗ trợ từ file script.js --- //

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const GOOGLE_CX = process.env.NEXT_PUBLIC_GOOGLE_CX;

// Hàm trích xuất từ khóa từ câu hỏi
function extractKeyword(text) {
    const stopwords = [
        "tìm",
        "kiếm",
        "các",
        "những",
        "gì",
        "liên",
        "quan",
        "bài",
        "viết",
        "báo",
        "về",
        "xin",
        "cho",
        "biết",
        "tôi",
        "tao",
        "mình",
        "cần",
        "nội",
        "dung",
        "thông",
        "tin",
        "danh",
        "mục",
    ];
    const words = text.toLowerCase().split(/\s+/);
    const keywords = words.filter((word) => !stopwords.includes(word));
    return keywords.slice(0, 2).join(" ");
}

async function callSpringBootAPI(question) {
    try {
        const keyword = extractKeyword(question);
        const url =
            "http://localhost:8082/api/posts/search?question=" +
            encodeURIComponent(keyword);
        const response = await fetch(url);
        if (!response.ok) {
            return (
                "Nội dung không được tìm thấy, bạn có thể đưa ra câu hỏi chi tiết hơn không ? " +
                response.statusText
            );
        }
        const data = await response.json();
        if (!data || data.length === 0) {
            return "Không tìm thấy bài viết nào liên quan.";
        }
        let resultText = "";
        data.forEach((post, index) => {
            const articleLink = `http://yourdomain.com/articles/${post.slug}`;
            resultText += `Bài viết ${index + 1}:\n`;
            resultText += `Tiêu đề: ${post.title}\n`;
            resultText += `Tóm tắt: ${post.excerpt}\n`;
            resultText += `Xem chi tiết: ${articleLink}\n\n`;
        });
        return resultText.trim();
    } catch (error) {
        console.error("Lỗi khi gọi Spring Boot API:", error);
        return "Có lỗi xảy ra khiến máy chủ không phản hồi, hãy thử lại.";
    }
}

async function searchGoogle(query) {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${GOOGLE_CX}&q=${encodedQuery}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return `Lỗi khi tìm kiếm trên Google: ${response.statusText}`;
        }
        const json = await response.json();
        const items = json.items;
        if (items && items.length > 0) {
            const resultCount = items.length;
            const requestedCount = extractResultCount(query);
            const limitCount =
                requestedCount > 0 && requestedCount <= resultCount
                    ? requestedCount
                    : resultCount;
            let resultText = "";
            for (let i = 0; i < limitCount; i++) {
                const item = items[i];
                resultText += `${item.title}\nLink: ${item.link}\n\n`;
            }
            return resultText.trim();
        } else {
            return "Không tìm thấy kết quả nào trên Google.";
        }
    } catch (e) {
        return "Lỗi trong quá trình tìm kiếm: " + e.message;
    }
}

function extractResultCount(query) {
    const regex = /hiển thị (\d+) kết quả/i;
    const match = regex.exec(query);
    return match ? parseInt(match[1], 10) : 5;
}

async function searchYouTube(query, maxResults) {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodedQuery}&key=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return [];
        }
        const json = await response.json();
        const items = json.items;
        const videoTitles = [];
        for (let i = 0; i < items.length; i++) {
            const videoId = items[i].id.videoId;
            if (videoId) {
                const title = items[i].snippet.title;
                videoTitles.push(
                    `${title} (https://www.youtube.com/watch?v=${videoId})`
                );
            }
        }
        return videoTitles;
    } catch (e) {
        return [];
    }
}

async function generateBotResponse(question) {
    const MODEL_NAME = "models/gemini-2.0-flash-exp";
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/${MODEL_NAME}:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: question }] }],
                }),
            }
        );
        const data = await response.json();
        if (
            data &&
            data.candidates &&
            data.candidates[0]?.content?.parts[0]?.text
        ) {
            return data.candidates[0].content.parts[0].text;
        }
        return "Không tìm thấy câu trả lời!";
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        return "Đã xảy ra lỗi khi xử lý yêu cầu!";
    }
}

function formatMessage(content, type) {
    if (type === "youtube") {
        const [header, ...items] = content.split("\n\n");
        if (items.length === 0 || !items[0]) return header;
        const formattedItems = items[0]
            .split("\n")
            .map((item, index) => `  ${index + 1}. ${item}`)
            .join("\n");
        return `${header}\n\n${formattedItems}`;
    } else if (type === "google") {
        const lines = content.split("\n\n").filter((line) => line.trim());
        if (lines.length === 0) return content;
        return lines.map((line) => line.trim()).join("\n\n");
    } else {
        const maxLengthPerLine = 200;
        let result = "";
        let currentLine = "";
        const words = content.split(" ");
        for (const word of words) {
            if ((currentLine + word).length > maxLengthPerLine) {
                result += currentLine.trim() + "\n";
                currentLine = "";
            }
            currentLine += word + " ";
        }
        if (currentLine.trim()) result += currentLine.trim();
        return result;
    }
}

// Các hàm parse tin nhắn từ bot (để hiển thị code, in đậm, link, …)

/* --- Các hàm parse để chuyển đổi URL thành liên kết click được --- */
// Sử dụng React để trả về các phần tử thay vì DOM nodes thuần
function parseLink(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
        if (urlRegex.test(part)) {
            return (
                <a
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1e90ff", textDecoration: "underline" }}
                >
                    {part}
                </a>
            );
        }
        return <span key={index}>{part}</span>;
    });
}

function parseInlineCodeAndLink(text) {
    // Nếu có logic cho inline code, bạn có thể bổ sung ở đây
    return parseLink(text);
}

function parseFormat(text) {
    return parseInlineCodeAndLink(text);
}

function parseBotMessage(text) {
    return parseFormat(text);
}

// --- Component ChatBot --- //

const ChatBot = () => {
    // State quản lý các tin nhắn, input và chế độ hoạt động
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [isYoutubeMode, setIsYoutubeMode] = useState(false);
    const [isSpringBootMode] = useState(true); // Bạn có thể cấu hình lại nếu cần
    const [hasGreeted, setHasGreeted] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto cuộn xuống dưới khi có tin mới
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Hàm thêm tin nhắn vào state
    const addMessage = (text, role) => {
        setMessages((prev) => [
            ...prev,
            { id: Math.random().toString(36).substring(2), text, role },
        ]);
    };

    // Hiệu ứng "typing" của bot
    const addTypingIndicator = () => {
        const id = "typing_" + Math.random().toString(36).substring(2);
        setMessages((prev) => [...prev, { id, text: "", role: "typing" }]);
        return id;
    };

    const removeTypingIndicator = (id) => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
    };

    // Xử lý chuyển đổi chế độ tìm kiếm (toggle)
    const handleToggleSearch = () => {
        setIsSearchMode(!isSearchMode);
        if (!isSearchMode) {
            addMessage(
                "Chế độ tìm kiếm đã được bật. Nhập từ khóa để tìm trên Google hoặc thêm 'video' để tìm trên YouTube.",
                "model"
            );
        } else {
            addMessage(
                "Chế độ tìm kiếm đã được tắt. Bạn có thể tiếp tục chat bình thường.",
                "model"
            );
            setIsYoutubeMode(false);
        }
    };

    // Xử lý gửi tin nhắn
    const handleSendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = input;
        addMessage(userMessage, "user");
        setInput("");

        // Hiển thị hiệu ứng "typing" của bot
        const typingId = addTypingIndicator();

        // Xử lý theo chế độ
        if (isSearchMode) {
            if (userMessage.toLowerCase().includes("video")) {
                setIsYoutubeMode(true);
                const searchQuery = userMessage
                    .replace(/video/gi, "")
                    .replace(/[:,.?]/g, "")
                    .trim();
                const maxResults = extractResultCount(userMessage);
                const videoResults = await searchYouTube(searchQuery, maxResults);
                const botAnswerRaw =
                    videoResults.length > 0
                        ? `Dưới đây là ${videoResults.length} video về "${searchQuery}":\n\n` +
                        videoResults
                            .map((v, i) => `Video ${i + 1}: ${v}`)
                            .join("\n")
                        : "Không tìm thấy video phù hợp!";
                const botAnswer = formatMessage(botAnswerRaw, "youtube");
                setTimeout(() => {
                    removeTypingIndicator(typingId);
                    addMessage(botAnswer, "model");
                }, 1500);
            } else {
                setIsYoutubeMode(false);
                const searchResultText = await searchGoogle(userMessage);
                const botAnswerTextRaw = `Dưới đây là kết quả tìm kiếm trên Google:\n\n${searchResultText}`;
                const botAnswerText = formatMessage(botAnswerTextRaw, "google");
                setTimeout(() => {
                    removeTypingIndicator(typingId);
                    addMessage(botAnswerText, "model");
                }, 1500);
            }
        } else if (isSpringBootMode) {
            const springBootResponse = await callSpringBootAPI(userMessage);
            const formattedAnswer = formatMessage(springBootResponse, "bot");
            setTimeout(() => {
                removeTypingIndicator(typingId);
                addMessage(formattedAnswer, "model");
            }, 1500);
        } else {
            const answerRaw = await generateBotResponse(userMessage);
            const answer = formatMessage(answerRaw, "bot");
            setTimeout(() => {
                removeTypingIndicator(typingId);
                addMessage(answer, "model");
            }, 1500);
        }
    };
    const [isOpen, setIsOpen] = useState(false);
    // Hàm gọi khi chat mở (ví dụ: hiển thị lời chào)
    const handleToggleChat = () => {
        setIsOpen((prev) => !prev);
        if (!hasGreeted) {
            setTimeout(() => {
                addMessage(
                    "Xin chào! Tôi là chatbot, có thể hỗ trợ gì cho bạn?",
                    "model"
                );
                setHasGreeted(true);
            }, 300);
        }
    };

    return (
        <div>
            {/* Các nút điều khiển: bật/tắt chat và toggle tìm kiếm */}
            <div className={styles.chatControls}>
                <button className={styles.chatToggleBtn} onClick={handleToggleChat}>
                    <i className="bi bi-robot"></i>
                </button>
                {/* Chỉ hiển thị nút kính lúp nếu popup chat đang mở (isOpen) */}
                {isOpen && (
                    <button
                        className={`${styles.searchToggleBtn} ${isSearchMode ? styles.active : ""
                            }`}
                        onClick={handleToggleSearch}
                        title={isSearchMode ? "Tắt tìm kiếm" : "Bật tìm kiếm qua internet"}
                    >
                        {isSearchMode ? <i className="bi bi-x"></i> : <i className="bi bi-search"></i>}
                    </button>
                )}
            </div>

            {/* Popup Chat */}
            <div className={`${styles.chatPopup} ${isOpen ? styles.chatPopupActive : ""}`}>
                <div className={styles.topbar}>
                    <div>
                        <strong>Trợ lý ảo</strong>
                    </div>
                    <button onClick={handleToggleChat}>
                        <i className="bi bi-x"></i>
                    </button>
                </div>
                <div className={styles.chatContainer}>
                    <div className={styles.chatMessages}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={styles.messageContainer}>
                                {msg.role === "user" ? (
                                    <div className={styles.userBubble}>{msg.text}</div>
                                ) : msg.role === "typing" ? (
                                    <div className={`${styles.botBubble} ${styles.typingIndicator}`}>
                                        <span className={styles.typingDot}></span>
                                        <span className={styles.typingDot}></span>
                                        <span className={styles.typingDot}></span>
                                    </div>
                                ) : (
                                    <div className={styles.botBubble}>
                                        {parseBotMessage(msg.text)}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className={styles.inputArea}>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                id={styles.chatInput}
                                placeholder={
                                    isSearchMode ? "Tìm kiếm trên web..." : "Nhập nội dung..."
                                }
                                className={styles.chatInput}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSendMessage();
                                }}
                            />
                            <button className={styles.sendBtn} onClick={handleSendMessage}>
                                <i className="bi bi-send"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
