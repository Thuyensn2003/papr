import Image from "next/image";
import Breadcrumb from "../../components/common/Breadcrumb";
import HeadMeta from "../../components/elements/HeadMeta";
import FooterOne from "../../components/footer/FooterOne";
import HeaderOne from "../../components/header/HeaderOne";
import PostLayoutTwo from "../../components/post/layout/PostLayoutTwo";
import WidgetAd from "../../components/widget/WidgetAd";
// import WidgetCategory from "../../components/widget/WidgetCategory";
import WidgetPost from "../../components/widget/WidgetPost";
import WidgetSocialShare from "../../components/widget/WidgetSocialShare";
import { useRouter } from "next/router";

const PostAuthor = ({ authorData, postData, allPosts }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <h2>Loading...</h2>;
    }

    if (!authorData) {
        return <h2>Không tìm thấy tác giả.</h2>;
    }

    return (
        <>
            <HeadMeta metaTitle={authorData.authorName || "Không có tên"} />
            <HeaderOne />
            <Breadcrumb aPage={authorData.authorName || "Không có tên"} />
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="author-details-block">
                                <div className="media post-block post-block__mid m-b-xs-0">
                                    <a href="#" className="align-self-center">
                                        <Image
                                            src={authorData.authorImg || "/images/default-avatar.png"}
                                            alt={authorData.authorName || "Không có tên"}
                                            width={210}
                                            height={210}
                                            className="m-r-xs-30"
                                        />
                                    </a>
                                    <div className="media-body">
                                        <h2 className="h4 m-b-xs-15">
                                            {authorData.authorName || "Không có tên"}
                                        </h2>
                                        <p className="mid">
                                            {authorData.authorBio || "Chưa có tiểu sử"}
                                        </p>
                                        <div className="post-metas">
                                            <ul className="list-inline">
                                                <li>
                                                    <a href="#">
                                                        <i className="fal fa-user-edit" /> Đã viết: ({postData.length})
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="author-social-share">
                                            <ul className="social-share social-share__with-bg">
                                                {authorData.author_social?.map((data, index) => (
                                                    <li key={index}>
                                                        <a href={data.url}>
                                                            <i className={data.icon} />
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="random-posts section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="axil-content">
                                <h2 className="h3 m-b-xs-40">Bài viết của tác giả này</h2>
                                {postData.map((data) => (
                                    <PostLayoutTwo data={data} postSizeMd={true} key={data.slug} />
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            {/* <div className="post-sidebar">
                                <WidgetAd />
                                <WidgetSocialShare />
                                <WidgetCategory cateData={allPosts} />
                                <WidgetPost dataPost={allPosts} />
                                <WidgetAd img="/images/clientbanner/clientbanner3.jpg" height={492} width={320} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <FooterOne />
        </>
    );
};

export default PostAuthor;



export async function getStaticProps({ params }) {
    const slug = params.slug; // Ví dụ: "ashley-graham"

    // Chuyển đổi slug thành tên tác giả:
    // Chia chuỗi theo dấu "-" sau đó viết hoa chữ cái đầu mỗi từ
    const authorName = slug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    // Gọi API lấy thông tin tác giả theo tên
    const authorRes = await fetch(`http://localhost:8082/api/authors/${encodeURIComponent(authorName)}`);
    if (!authorRes.ok) {
        return { notFound: true };
    }
    const authorData = await authorRes.json();

    if (!authorData || Object.keys(authorData).length === 0) {
        return { notFound: true };
    }

    // Gọi API lấy bài viết của tác giả theo tên
    const postRes = await fetch(`http://localhost:8082/api/posts/author/${encodeURIComponent(authorName)}`);
    const postData = await postRes.json();

    return {
        props: {
            authorData,
            postData: Array.isArray(postData) ? postData : []
        },
        revalidate: 10,
    };
}




export async function getStaticPaths() {
    try {
        const res = await fetch("http://localhost:8082/api/authors/");
        if (!res.ok) throw new Error("Failed to fetch authors");
        const authors = await res.json();

        if (!Array.isArray(authors)) {
            console.error("API /api/authors/ không trả về mảng:", authors);
            return { paths: [], fallback: false };
        }

        const paths = authors
            .filter(author => author && author.slug)
            .map(author => ({
                params: { slug: author.slug }
            }));

        return { paths, fallback: "blocking" };
    } catch (error) {
        console.error("Lỗi khi fetch authors:", error);
        return { paths: [], fallback: false };
    }
}




