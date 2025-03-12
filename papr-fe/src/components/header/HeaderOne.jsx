import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { dateFormate } from "../../utils";
import SocialLink from "../../data/social/SocialLink.json";
import MenuData from "../../data/menu/HeaderMenu.json";
import OffcanvasMenu from "./OffcanvasMenu";

const HeaderOne = () => {
  const router = useRouter();

  // Quản lý dropdown bằng state
  const [activeDropdown, setActiveDropdown] = useState(null);
  const handleDropdownToggle = (index) => {
    setActiveDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  // Offcanvas Menu
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Header Search
  const [searchShow, setSearchShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const headerSearchShow = () => setSearchShow(true);
  const headerSearchClose = () => {
    setSearchShow(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Mobile Menu Toggle
  const [mobileToggle, setMobileToggle] = useState(false);
  const MobileMenuToggler = () => {
    setMobileToggle(!mobileToggle);
    document.querySelector("html").classList.toggle("main-menu-opened");
  };

  // Lấy dữ liệu tất cả posts từ API
  useEffect(() => {
    const fetchAllPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8082/api/posts/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        // console.log("Dữ liệu từ API:", data);
        const mappedData = data.map((item) => ({
          id: item.id,
          title: item.title,
          path: item.slug ? `/post/${item.slug}` : `/post/${item.id}`,
        }));
        setAllData(mappedData);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setAllData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  // Xử lý tìm kiếm phía client
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      const filteredResults = allData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?q=${searchQuery}`);
      headerSearchClose();
    }
  };

  return (
    <>
      <OffcanvasMenu ofcshow={show} ofcHandleClose={handleClose} />
      <header className="page-header">
        {/* Header Top */}
        <div className="header-top bg-grey-dark-one">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md">
                <ul className="header-top-nav list-inline justify-content-center justify-content-md-start">
                  <li className="current-date">{dateFormate()}</li>
                  <li>
                    <Link href="/">
                      <a>Xin chào !</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-us">
                      <a>Về chúng tôi</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <a>Liên hệ</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-auto">
                <ul className="ml-auto social-share header-top__social-share">
                  {["fb", "twitter", "instagram", "linked"].map((key) => (
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

        {/* Main Navbar */}
        <nav className="navbar bg-white">
          <div className="container">
            <div className="navbar-inner">
              {/* Logo */}
              <div className="brand-logo-container">
                <Link href="/">
                  <a>
                    <Image
                      src="/images/SMP.png"
                      alt="brand-logo"
                      width={102}
                      height={34}
                    />
                  </a>
                </Link>
              </div>

              {/* Main Nav */}
              <div className="main-nav-wrapper">
                <ul className="main-navigation list-inline">
                  {MenuData.map((data, index) => {
                    const isActive = activeDropdown === index;
                    return data.submenu ? (
                      <li
                        className={`has-dropdown ${isActive ? "active" : ""}`}
                        key={index}
                      >
                        {/* Khi có submenu, ngăn chặn Link chuyển trang ngay lập tức để toggle */}
                        <Link href={data.path}>
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              handleDropdownToggle(index);
                            }}
                          >
                            {data.label}
                          </a>
                        </Link>
                        <ul className={`submenu ${isActive ? "opened" : ""}`}>
                          {data.submenu.map((sub, i) => (
                            <li key={i}>
                              <Link href={sub.subpath}>
                                <a>{sub.sublabel}</a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      <li key={index}>
                        <Link href={data.path}>
                          <a>{data.label}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Search + Offcanvas + Mobile Toggler */}
              <div className="navbar-extra-features ml-auto">
                {/* Form Search */}
                <form
                  onSubmit={handleSearchSubmit}
                  className={`navbar-search ${searchShow ? "show-nav-search" : ""
                    }`}
                >
                  <div className="search-field">
                    <input
                      type="text"
                      className="navbar-search-field"
                      placeholder="Search Here..."
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                    <button className="navbar-search-btn" type="submit">
                      <i className="fal fa-search" />
                    </button>
                    <span
                      className="navbar-search-close"
                      onClick={headerSearchClose}
                    >
                      <i className="fal fa-times" />
                    </span>
                  </div>
                  {searchQuery.length > 2 && (
                    <ul className="search-results">
                      {loading ? (
                        <li>Loading...</li>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((result) => (
                          <li key={result.id}>
                            <Link href={result.path}>
                              <a>{result.title}</a>
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li>Không tìm thấy kết quả</li>
                      )}
                    </ul>
                  )}
                </form>

                {/* Nút mở form search */}
                <button
                  className="nav-search-field-toggler"
                  onClick={headerSearchShow}
                >
                  <i className="far fa-search" />
                </button>

                {/* Nút mở offcanvas menu */}
                <button className="side-nav-toggler" onClick={handleShow}>
                  <span />
                  <span />
                  <span />
                </button>
              </div>

              {/* Mobile toggler */}
              <div
                className={`main-nav-toggler d-block d-lg-none ${mobileToggle ? "expanded" : ""
                  }`}
              >
                <div className="toggler-inner" onClick={MobileMenuToggler}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Style nội tuyến (có thể tách riêng) */}
      <style jsx>{`
  /* Căn chỉnh phần navbar */
  .navbar-extra-features {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px; /* Khoảng cách giữa các phần tử */
    flex-grow: 1;
  }

  /* Kiểu dáng thanh tìm kiếm */
  .navbar-search {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 450px; /* Điều chỉnh kích thước cho hợp lý */
    background-color: white !important; /* Đặt nền trắng */
    box-shadow: none !important;
    
  }

  /* Ô nhập liệu */
  .navbar-search-field {
    padding: 12px 50px 12px 20px;
    border: 1px solid #ccc;
    border-radius: 30px; /* Bo góc mềm mại */
    width: 100%;
    font-size: 16px;
    background-color: transparent !important;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .navbar-search-field:focus {
    outline: none;
    box-shadow: none;
    background-color: white;
  }

  /* Nút tìm kiếm */
  .navbar-search-btn {
    position: absolute;
    right: 15px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 18px;
    color: #007bff;
  }

  /* Nút đóng tìm kiếm */
  .navbar-search-close {
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 16px;
    color: #666;
    display: ${searchShow ? "block" : "none"};
  }

  /* Kết quả tìm kiếm */
  .search-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    list-style: none;
    padding: 10px 0;
    margin: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    opacity: ${searchQuery.length > 2 ? 1 : 0};
    transform: ${searchQuery.length > 2 ? "translateY(0)" : "translateY(-10px)"};
    pointer-events: ${searchQuery.length > 2 ? "auto" : "none"};
  }

  .search-results li {
    padding: 12px 20px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s ease;
  }

  .search-results li:last-child {
    border-bottom: none;
  }

  .search-results a {
    text-decoration: none;
    color: #333;
    display: block;
  }

  .search-results a:hover {
    background: #f8f9fa;
    color: #007bff;
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .navbar-extra-features {
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }

    .navbar-search {
      max-width: 100%;
      width: 100%;
    }

    .search-results {
      max-width: 100%;
      width: 100%;
    }
  }
`}</style>

    </>
  );
};

export default HeaderOne;
