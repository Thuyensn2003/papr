import Image from "next/image";
import Link from "next/link";
import SocialLink from "../../data/social/SocialLink.json";

const FooterOne = () => {
  const categories = [
    { title: "Công nghệ", items: ["Sản phẩm mới", "Đánh giá"] },
    { title: "Thời trang", items: ["Xu hướng", "Thương hiệu"] },
    { title: "Ẩm thực", items: ["Công thức", "Đánh giá"] },
    { title: "Du lịch", items: ["Điểm đến", "Kinh nghiệm"] },
    { title: "Thể thao", items: ["Tin tức", "Sự kiện"] },
    { title: "Giải trí", items: ["Phim", "Âm nhạc"] },
    { title: "Xã hội", items: ["Sự kiện", "Hoạt động", "Cộng đồng"] },
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
                <a>
                  <Image
                    src="/images/SMP.png"
                    alt="footer logo"
                    width={86}
                    height={28}
                    className="footer-logo"
                  />
                </a>
              </Link>
            </div>
            <div className="col-md-auto">
              <div className="footer-social-share">
                <div className="axil-social-title">Ghé thăm các nền tảng khác</div>
                <ul className="social-share social-share__with-bg">
                  {["fb", "twitter", "yt"].map((key) => (
                    <li key={key}>
                      <a href={SocialLink[key].url}>
                        <i className={SocialLink[key].icon} />
                      </a>
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