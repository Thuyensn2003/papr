import HeadMeta from "../../components/elements/HeadMeta";
import HeaderOne from "../../components/header/HeaderOne";
import FooterOne from "../../components/footer/FooterOne";
import Breadcrumb from "../../components/common/Breadcrumb";
import PostLayoutTwo from "../../components/post/layout/PostLayoutTwo";

const PostCategory = ({ categoryData, postData, allPosts }) => {
    return (
        <>
            <HeadMeta metaTitle={categoryData.cate || "Danh mục"} />
            <HeaderOne />
            <Breadcrumb aPage={categoryData.cate || "Danh mục"} />
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">{categoryData.cate}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="random-posts section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {postData.map((data) => (
                                <PostLayoutTwo data={data} postSizeMd={true} key={data.slug} />
                            ))}
                        </div>
                        <div className="col-lg-4">
                            {/* Sidebar có thể sử dụng WidgetCategory với allPosts nếu cần */}
                        </div>
                    </div>
                </div>
            </div>
            <FooterOne />
        </>
    );
};

export default PostCategory;



export async function getStaticProps({ params }) {
    const slug = params.slug;

    // Lấy thông tin danh mục theo slug
    const categoryRes = await fetch(`http://localhost:8082/api/categories/${slug}`);
    if (!categoryRes.ok) return { notFound: true };
    const categoryData = await categoryRes.json();

    // Lấy bài viết thuộc danh mục đó
    const postsRes = await fetch(`http://localhost:8082/api/posts/category/${slug}`);
    const postData = await postsRes.json();

    return {
        props: {
            categoryData,
            postData: Array.isArray(postData) ? postData : []
        },
        revalidate: 10,
    };
}


export async function getStaticPaths() {
    try {
        const res = await fetch("http://localhost:8082/api/categories/");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const categories = await res.json();

        if (!Array.isArray(categories)) {
            console.error("API /api/categories/ không trả về mảng:", categories);
            return { paths: [], fallback: false };
        }

        const paths = categories
            .filter(cat => cat && cat.slug)
            .map(cat => ({
                params: { slug: cat.slug }
            }));

        return { paths, fallback: "blocking" };
    } catch (error) {
        console.error("Lỗi khi fetch categories:", error);
        return { paths: [], fallback: false };
    }
}
