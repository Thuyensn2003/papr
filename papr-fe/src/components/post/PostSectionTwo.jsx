import SectionTitle from "../elements/SectionTitle";
import PostLayoutThree from "./layout/PostLayoutThree";

const PostSectionTwo = ({ postData }) => {
  // Lọc ra các bài viết có rating "top"
  const topPosts = postData.filter(post => post.rating === 'top');

  return (
    <div className="section-gap section-gap-top__with-text top-stories bg-grey-light-three">
      <div className="container">
        <SectionTitle title="TIN TỨC HÀNG ĐẦU" btnText="TẤT CẢ TIN TỨC HÀNG ĐẦU" />
        <div className="row">
          <div className="col-lg-8">
            {topPosts.slice(0, 1).map((data) => (
              <PostLayoutThree data={data} postSizeLg={true} key={data.slug} />
            ))}
          </div>
          <div className="col-lg-4">
            {topPosts.slice(1, 3).map((data) => (
              <PostLayoutThree data={data} key={data.slug} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSectionTwo;
