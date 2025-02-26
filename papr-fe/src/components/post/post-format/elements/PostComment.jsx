import FormGroup from "../../../contact/FormGroup";

const PostComment = () => {

  return (
    <div className="post-comment-area">
      <div className="comment-box">
        <h2>Để lại bình luận</h2>
        <p>
          Thông tin của bạn như địa chỉ mail sẽ được ẩn danh
          <span className="primary-color">*</span>
        </p>
      </div>
      {/* End of .comment-box */}
      <form action="#" className="comment-form row m-b-xs-60">
        <div className="col-12">
          <FormGroup pClass="comment-message-field" label="Viết bình luận..." type="textarea" name="comment-message" rows={6} />
        </div>
        <div className="col-md-4">
          <FormGroup type="text" name="name" label="Tên" />
        </div>
        <div className="col-md-4">
          <FormGroup type="text" name="email" label="Email" />
        </div>
        <div className="col-md-4">
          <FormGroup type="text" name="website" label="Liên hệ (nếu có)" />
        </div>
        <div className="col-12">
          <button className="btn btn-primary">Đăng Bình Luận</button>
        </div>
      </form>
    </div>
  );
};

export default PostComment;
