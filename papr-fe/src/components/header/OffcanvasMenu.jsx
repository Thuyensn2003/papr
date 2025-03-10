import Link from "next/link";
import Offcanvas from 'react-bootstrap/Offcanvas';
import SocialLink from "../../data/social/SocialLink.json";

const OffcanvasMenu = ({ ofcshow, ofcHandleClose }) => {
    return (
        <Offcanvas show={ofcshow} onHide={ofcHandleClose} placement="end" className="offcanvas-menu">
            <Offcanvas.Header closeButton className="close-offcanvasmeu"></Offcanvas.Header>
            <div className="side-nav">
                <div className="side-nav-inner nicescroll-container">

                    {/* End of .side-nav-search-form */}
                    <div className="side-nav-content">
                        <div className="row ">
                            <div className="col-lg-6">
                                <ul className="main-navigation side-navigation list-inline flex-column">
                                    <li>
                                        <Link href="/category/fashion">
                                            <a>Thời trang</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/category/lifestyle">
                                            <a>Phong cách sống</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/category/technology">
                                            <a>Công nghệ</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/category/sports">
                                            <a>Thể thao</a>
                                        </Link>
                                    </li>
                                </ul>
                                {/* End of .main-navigation */}
                            </div>
                            {/* End of  .col-md-6 */}
                            <div className="col-lg-6">
                                <div className="axil-contact-info-inner">
                                    <h5 className="h5 m-b-xs-10">
                                        Thông tin liên hệ
                                    </h5>
                                    <div className="axil-contact-info">
                                        <address className="address">
                                            <p className="m-b-xs-30  mid grey-dark-three ">Mai Dich ,Cau Giay<br />Ha Noi ,Viet Nam</p>
                                            <div className="h5 m-b-xs-5">Đây chỉ là dự án khoá luận tốt nghiệp</div>
                                            <div>
                                                <a className="tel" href="tel:8884562790"><i className="fas fa-phone" />...-...-...</a>
                                            </div>
                                            <div>
                                                <a className="tel" href="tel:12125553333"><i className="fas fa-fax" />...-...-...</a>
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
                                                    <a href={SocialLink.behance.url}>
                                                        <i className={SocialLink.behance.icon} />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href={SocialLink.linked.url}>
                                                        <i className={SocialLink.linked.icon} />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* End of .contact-shsdf */}
                                    </div>
                                    {/* End of .axil-contact-info */}
                                </div>
                                {/* End of .axil-contact-info-inner */}
                            </div>
                        </div>
                        {/* End of .row */}
                    </div>
                </div>
                {/* End of .side-nav-inner */}
            </div>
        </Offcanvas>
    );
}

export default OffcanvasMenu;