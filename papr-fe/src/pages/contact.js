import Image from "next/image";
import Breadcrumb from "../components/common/Breadcrumb";
import BreadcrumbBanner from "../components/common/BreadcrumbBanner";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import HeadMeta from "../components/elements/HeadMeta";
import SectionTitleTwo from "../components/elements/SectionTitleTwo";
import FooterOne from "../components/footer/FooterOne";
import HeaderOne from "../components/header/HeaderOne";

const ContactPage = () => {

    return (
        <>
            <HeadMeta metaTitle="Contact Us" />
            <HeaderOne />
            <Breadcrumb aPage="Liên hệ" />
            <BreadcrumbBanner pageTitle="Liên hệ" />
            <div className="axil-about-us section-gap  section-gap-top__with-text">
                <div className="container">
                    <SectionTitleTwo title="" />
                    <figure className="m-b-xs-30 p-t-xs-10">
                        <Image
                            src="/images/contact-banner.jpg"
                            height={451}
                            width={1110}
                            alt="contact banner"
                        />
                    </figure>
                </div>
            </div>
            <div className="contact-form section-gap bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7">
                            <ContactForm />
                        </div>
                        <div className="col-lg-5">
                            <ContactInfo />
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-gap our-location section-gap-top__with-text">
                <div className="container">
                    <div className="section-title">
                        <h2 className="axil-title m-b-xs-40">
                            Vị trí của chúng tôi
                        </h2>
                    </div>
                    {/* End of .section-title */}
                    <div className="axil-map-wrapper m-b-xs-30">
                        <iframe src="https://www.google.com/maps/place/Mai+D%E1%BB%8Bch,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/@21.0402463,105.7644019,15z/data=!3m1!4b1!4m6!3m5!1s0x313454c90abeff65:0x71a3921134bd13e4!8m2!3d21.0395659!4d105.7740712!16s%2Fg%2F1hb_dzz83?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D" width={600} height={450} allowFullScreen />
                    </div>
                    {/* End of .axil-map-wrapper */}
                </div>
                {/* End of .container */}
            </div>
            <FooterOne />
        </>
    );
}

export default ContactPage;





