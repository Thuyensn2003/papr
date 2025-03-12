import SectionTitle from "../elements/SectionTitle";
import PostLayoutTwo from "./layout/PostLayoutTwo";

const PostSectionThree = ({ postData }) => {
  // Lọc các bài viết có trường rating là "trending" (không phân biệt chữ hoa chữ thường)
  const trendingPost = postData.filter(
    post => post.rating && post.rating.toLowerCase() === 'trending'
  );

  return (
    <div className="section-gap section-gap-top__with-text trending-stories">
      <div className="container">
        <SectionTitle title="Tin tức thịnh hành" btnText="Các TIN TỨC HÀNG ĐẦU" />
        <div className="row">
          {trendingPost.slice(0, 6).map((data) => (
            <div className="col-lg-6" key={data.slug}>
              <PostLayoutTwo data={data} />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        /* Giả sử component SectionTitle sử dụng class .section-title để hiển thị tiêu đề */
        .trending-stories :global(.section-title) {
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

export default PostSectionThree;
