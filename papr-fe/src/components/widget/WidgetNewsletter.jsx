import { useRef, useEffect } from 'react';
import FormGroup from '../contact/FormGroup';

const WidgetNewsletter = () => {

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
        {/* End of .section-title */}
        <div className="subscription-form-wrapper">
          <form action="#" className="subscription-form">
            <FormGroup pClass="form-group-small m-b-xs-20" type="text" name="subscription-email-2" label="Nhập địa chỉ email..." />
            <div className="m-b-xs-0">
              <button className="btn btn-primary btn-small">Đăng ký</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WidgetNewsletter;