import { useState } from "react";

const WidgetNewsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email state:", email); // Debug
    if (!email || email.trim() === "") {
      setMessage("Vui lòng nhập địa chỉ email.");
      return;
    }
    try {
      const res = await fetch("http://localhost:8082/api/newsletters/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        const data = await res.text();
        setMessage(data);
        setEmail("");
      } else {
        const errMessage = await res.text();
        setMessage(`Lỗi: ${errMessage}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Có lỗi xảy ra khi đăng ký.");
    }
  };

  return (
    <div className="newsletter-widget weekly-newsletter bg-grey-light-three m-b-xs-40">
      <div className="newsletter-content">
        <div className="newsletter-icon">
          <i className="feather icon-send" />
        </div>
        <div className="section-title">
          <h3 className="axil-title">Đăng ký nhận bản tin hàng tuần của chúng tôi</h3>
          <p className="mid m-t-xs-10 m-b-xs-20">
            Không có spam, chỉ có thông báo về các sản phẩm, cập nhật mới.
          </p>
        </div>
        <div className="subscription-form-wrapper">
          <form onSubmit={handleSubmit} className="subscription-form">
            <div className="form-group-small m-b-xs-20">
              <input placeholder="Nhập địa chỉ email..."
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="m-b-xs-0">
              <button className="btn btn-primary btn-small" type="submit">
                Đăng ký
              </button>
            </div>
          </form>
          {message && (
            <div style={{ marginTop: "10px", color: "green" }}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WidgetNewsletter;
