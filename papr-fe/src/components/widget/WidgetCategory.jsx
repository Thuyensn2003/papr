import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useRouter } from "next/router";

// Định nghĩa hàm slugify
function slugify(text) {
	return text
		.normalize("NFD")                     // Tách các ký tự dấu khỏi ký tự cơ bản
		.replace(/[\u0300-\u036f]/g, "")        // Loại bỏ các dấu
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')                  // Thay khoảng trắng bằng dấu gạch ngang
		.replace(/[^\w\-]+/g, '')              // Loại bỏ ký tự không hợp lệ
		.replace(/\-\-+/g, '-');               // Thay thế dấu gạch ngang liên tiếp bằng một dấu
}


const WidgetCategory = ({ cateData = [] }) => {
	// Tạo danh sách danh mục từ cateData (giữ nguyên logic đếm)
	const categories = cateData.map(data => ({
		id: data.id,
		name: data.cate,
		thumb: data.cate_img
	}));

	const categoryCounts = categories.reduce((acc, curr) => {
		if (curr.name) {
			acc[curr.name] = (acc[curr.name] || 0) + 1;
		}
		return acc;
	}, {});

	const cateList = Object.keys(categoryCounts).map(cateName => {
		const matchingPosts = categories.filter(item => item.name === cateName);
		return {
			id: matchingPosts[0]?.id, // sử dụng id của danh mục
			name: cateName,
			slug: slugify(cateName),
			count: categoryCounts[cateName],
			cateImg: matchingPosts[0]?.thumb || "/images/default-category.jpg"
		};
	});

	// Cài đặt Slider như cũ
	const slideSettings = {
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		adaptiveHeight: true,
	};

	const CustomNavRef = useRef(null);
	const router = useRouter();

	// State quản lý Offcanvas (vẫn giữ Offcanvas để hiển thị thông báo chuyển hướng)
	const [showOffcanvas, setShowOffcanvas] = useState(false);

	// Hàm xử lý khi click vào danh mục: chuyển hướng và đóng Offcanvas
	const handleCategoryClick = (e, category) => {
		e.preventDefault(); // Ngăn chặn chuyển hướng mặc định
		// Chuyển hướng tới trang category dựa trên slug
		router.push(`/category/${category.slug}`);
		// Đóng offcanvas
		setShowOffcanvas(false);
	};

	return (
		<>
			<div className="category-widget m-b-xs-40">
				<div className="widget-title">
					<h3>Danh Mục</h3>
					<div className="owl-nav">
						<button className="custom-owl-prev" onClick={() => CustomNavRef?.current?.slickPrev()}>
							<i className="feather icon-chevron-left" />
						</button>
						<button className="custom-owl-next" onClick={() => CustomNavRef?.current?.slickNext()}>
							<i className="feather icon-chevron-right" />
						</button>
					</div>
				</div>
				<div className="category-carousel">
					<Slider ref={CustomNavRef} {...slideSettings}>
						<div className="cat-carousel-inner">
							<ul className="category-list-wrapper">
								{cateList.slice(0, 4).map((data) => (
									<li className="category-list perfect-square" key={data.slug}>
										{/* Thay Link bằng thẻ <a> với onClick để chuyển hướng */}
										<a
											href="#"
											className="list-inner"
											onClick={(e) => handleCategoryClick(e, data)}
										>
											<Image
												unoptimized
												src={data.cateImg}
												alt={data.name}
												width={155}
												height={190}
											/>
											<div className="post-info-wrapper overlay">
												<div className="counter-inner">
													<span className="counter">{data.count}</span>+
												</div>
												<h4 className="cat-title">{data.name}</h4>
											</div>
										</a>
									</li>
								))}
							</ul>
						</div>
						{/* Nếu có slide khác, bạn có thể thêm tại đây */}
					</Slider>
				</div>
			</div>

			{/* Offcanvas (có thể dùng để hiển thị loading, thông báo chuyển hướng, v.v.) */}
			<Offcanvas
				show={showOffcanvas}
				onHide={() => setShowOffcanvas(false)}
				placement="end"
				className="offcanvas-menu"
			>
				<Offcanvas.Header closeButton />
				<Offcanvas.Title>Đang chuyển hướng...</Offcanvas.Title>
				<Offcanvas.Body>
					<p>Vui lòng chờ trong giây lát...</p>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default WidgetCategory;
