import SocialLink from "../../data/social/SocialLink.json";

const ContactInfo = () => {
  return (
    <div className="axil-contact-info-wrapper p-l-md-45 m-b-xs-30">
      <div className="axil-contact-info-inner">
        <h2 className="h4 m-b-xs-10">Thông tin liên hệ</h2>
        <div className="axil-contact-info">
          <address className="address">
            <p className="mid m-b-xs-30">
              Mai Dich Cau Giay Ha Noi
              <br />
              Ha Noi Viet Nam
            </p>
            <div className="h5 m-b-xs-10">Chỉ là dự án khoá luận tốt nghiệp</div>
            <div>
              <a className="tel" href="tel:8884562790">
                <i className="fas fa-phone" />
                ....
              </a>
            </div>
            <div>
              <a className="tel" href="tel:12125553333">
                <i className="fas fa-fax" />
                ....
              </a>
            </div>
          </address>
          {/* End of address */}
          <div className="contact-social-share m-t-xs-30">
            <div className="axil-social-title h5">Theo dõi chúng tôi</div>
            <ul className="social-share social-share__with-bg">
              <li>
                <a href={SocialLink.fb.url}>
                  <i className={SocialLink.fb.icon} />
                </a>
              </li>
              <li>
                <a href={SocialLink.twitter.url}>
                  <i className={SocialLink.twitter.icon} />
                </a>
              </li>
              <li>
                <a href={SocialLink.yt.url}>
                  <i className={SocialLink.yt.icon} />
                </a>
              </li>
              <li>
                <a href={SocialLink.linked.url}>
                  <i className={SocialLink.linked.icon} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
