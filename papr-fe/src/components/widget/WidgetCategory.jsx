import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import Slider from "react-slick";

// Định nghĩa hàm slugify nếu chưa có
function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')         // Thay khoảng trắng bằng dấu gạch ngang
		.replace(/[^\w\-]+/g, '')     // Loại bỏ ký tự không hợp lệ
		.replace(/\-\-+/g, '-');      // Thay thế dấu gạch ngang liên tiếp bằng một dấu
}

const WidgetCategory = ({ cateData = [] }) => {
	const categories = cateData.map(data => ({
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
			name: cateName,
			slug: slugify(cateName),
			count: categoryCounts[cateName],
			cateImg: matchingPosts[0]?.thumb || "/images/default-category.jpg"
		};
	});

	const slideSettings = {
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		adaptiveHeight: true,
	};

	const CustomNavRef = useRef(null);

	return (
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
									<Link href={`/category/${data.slug}`}>
										<a className="list-inner">
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
									</Link>
								</li>
							))}
						</ul>
					</div>
					{/* Các slide khác */}
				</Slider>
			</div>
		</div>
	);
};

export default WidgetCategory;
