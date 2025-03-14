import { useEffect, useState } from "react";
import SectionTitle from "../elements/SectionTitle";
import PostLayoutFour from "./layout/PostLayoutFour";

const PostSectionSix = () => {
    const [foodPosts, setFoodPosts] = useState([]);

    useEffect(() => {
        const fetchFoodPosts = async () => {
            try {
                const response = await fetch("http://localhost:8082/api/posts/category/am-thuc");
                if (!response.ok) {
                    throw new Error(`Lỗi HTTP! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Dữ liệu nhận được từ API:", data); // Debug dữ liệu nhận về
                setFoodPosts(data);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        fetchFoodPosts();
    }, []);

    return (
        <div className="related-post p-b-xs-30 food-drink">
            <div className="container">
                <SectionTitle title="Ẩm thực" btnText="" />
                <div className="grid-wrapper">
                    <div className="row">
                        {foodPosts.length > 0 ? (
                            foodPosts.slice(0, 4).map((data) => (
                                <div className="col-lg-3 col-md-4" key={data.slug}>
                                    <PostLayoutFour data={data} />
                                </div>
                            ))
                        ) : (
                            <p className="text-center">Không có bài viết nào.</p>
                        )}
                    </div>
                </div>
            </div>
            <style jsx>{`
        /* Giả sử component SectionTitle sử dụng class .section-title để hiển thị tiêu đề */
        .food-drink :global(.section-title) {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
          text-transform: uppercase;
          margin-bottom: 20px;
          border-bottom: 2px solid #333;
          padding-bottom: 10px;
        }
      `}</style>
        </div>

    );

};

export default PostSectionSix;
