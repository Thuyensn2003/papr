import Image from "next/image";
import { getFileContentBySlug, getAllPosts } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import Breadcrumb from "../components/common/Breadcrumb";
import BreadcrumbBanner from "../components/common/BreadcrumbBanner";
import HeadMeta from "../components/elements/HeadMeta";
import SectionTitleTwo from "../components/elements/SectionTitleTwo";
import FooterOne from "../components/footer/FooterOne";
import HeaderOne from "../components/header/HeaderOne";
import TeamOne from "../components/team/TeamOne";
import WidgetNewsletter from "../components/widget/WidgetNewsletter";
import WidgetPost from "../components/widget/WidgetPost";
import WidgetSocialShare from "../components/widget/WidgetSocialShare";
import { removeDuplicates } from "../utils";

const AboutUs = ({ aboutData, allPosts, authors }) => {
    return (
        <>
            <HeadMeta metaTitle="About Us" />
            <HeaderOne />
            <Breadcrumb aPage="Về chúng tôi" />
            <BreadcrumbBanner pageTitle="Về chúng tôi" />

            <div className="axil-about-us section-gap-top p-b-xs-20">
                <div className="container">
                    <figure className="m-b-xs-40">
                        <img
                            src={aboutData.featuredImg}
                            alt="about us"
                            className="img-fluid mx-auto"
                            style={{ width: "1110px", height: "451px" }}
                        />
                    </figure>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="about-us-content">
                                <div dangerouslySetInnerHTML={{ __html: aboutData.content }}></div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <aside className="post-sidebar">
                                {/* Nếu cần thêm widget */}
                            </aside>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hiển thị danh sách tác giả */}
            <div className="axil-our-team section-gap section-gap-top__with-text bg-grey-light-three">
                <div className="container">
                    <div className="axil-team-grid-wrapper">
                        <h2>Đội ngũ tác giả</h2>
                        <div className="row">
                            {authors && authors.length > 0 ? (
                                authors.slice(0, 6).map((author) => (
                                    <div className="col-lg-4" key={author.slug}>
                                        <TeamOne
                                            data={{
                                                author_name: author.authorName,
                                                author_img: author.authorImg || "/default-avatar.png",
                                                author_desg: author.authorBio || "Chưa cập nhật",
                                                author_social: []
                                            }}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">Không có tác giả nào để hiển thị.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <FooterOne />
        </>
    );
};

export default AboutUs;


export async function getServerSideProps() {
    let allPosts = [];
    try {
        const postsRes = await fetch("http://localhost:8082/api/posts/");
        if (postsRes.ok) {
            allPosts = await postsRes.json();
        } else {
            console.error("Posts API lỗi với status:", postsRes.status);
        }
    } catch (error) {
        console.error("Lỗi khi gọi API posts:", error);
    }

    let aboutData = {};
    try {
        // Giả sử bạn đã triển khai endpoint để lấy dữ liệu về "About Us"
        const aboutRes = await fetch("http://localhost:8082/api/about");
        if (aboutRes.ok) {
            aboutData = await aboutRes.json();
        } else {
            console.error("About API lỗi với status:", aboutRes.status);
        }
    } catch (error) {
        console.error("Lỗi khi gọi API about:", error);
    }

    let authors = [];
    try {
        const res = await fetch("http://localhost:8082/api/authors/");
        if (res.ok) {
            authors = await res.json();
        } else {
            console.error("Authors API lỗi với status:", res.status);
        }
    } catch (error) {
        console.error("Lỗi khi gọi API authors:", error);
    }

    return {
        props: {
            aboutData,
            allPosts,
            authors,
        },
    };
}






