import Image from "next/image";
import Link from "next/link";
import SocialLink from "../../data/social/SocialLink.json";

const FooterOne = () => {
  const categories = [
    { title: "Thế giới", items: ["U.N.", "Xung đột", "Khủng bố", "Khí hậu toàn cầu", "Môi trường"] },
    { title: "Giải trí", items: ["Tin tức người nổi tiếng", "Phim", "Tin tức truyền hình", "Tin tức âm nhạc", "Tin tức phong cách", "Video giải trí"] },
    { title: "Kinh doanh", items: ["Thị trường", "Chính trị", "Công nghệ", "Đặc trưng", "Lãnh đạo doanh nghiệp"] },
    { title: "Sức khoẻ", items: ["Sống khỏe mạnh", "Nghiên cứu y khoa", "Sức khỏe tâm thần", "Ung thư", "Sức khỏe tim mạch", "Sức khỏe trẻ em"] },
    { title: "Về chúng tôi", items: ["Liên hệ với chúng tôi", "Nghề nghiệp", "Quảng cáo", "Quan hệ truyền thông", "Sự tuân thủ"] },
  ];

  return (
    <footer className="page-footer bg-grey-dark-key">
      <div className="container">
        <div className="footer-top">
          <div className="row">
            {categories.map((category, index) => (
              <div key={index} className="col-lg-2 col-md-4 col-6">
                <div className="footer-widget">
                  <h2 className="footer-widget-title">{category.title}</h2>
                  <ul className="footer-nav">
                    {category.items.map((item, i) => (
                      <li key={i}>
                        <Link href="/"><a>{item}</a></Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-mid">
          <div className="row align-items-center">
            <div className="col-md">
              <Link href="/">
                <a><Image src="/images/SMP.png" alt="footer logo" width={86} height={28} className="footer-logo" /></a>
              </Link>
            </div>
            <div className="col-md-auto">
              <div className="footer-social-share">
                <div className="axil-social-title">Ghé thăm các nền tảng khác</div>
                <ul className="social-share social-share__with-bg">
                  {["fb", "twitter", "yt"].map((key) => (
                    <li key={key}>
                      <a href={SocialLink[key].url}><i className={SocialLink[key].icon} /></a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="axil-copyright-txt">© {new Date().getFullYear()} Phát triển bởi ThuyenLee 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;