import Head from "next/head";

const HeadMeta = ({ metaTitle }) => {
    return (
        <Head>
            {/* Basic metas */}
            <meta charSet="utf-8" />
            <meta name="robots" content="noindex, follow" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="description" content="" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>{metaTitle ? metaTitle : "Trang Chủ"}</title>

            {/* Bootstrap CSS (bạn đã có) */}
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                rel="stylesheet"
            />

            {/* Bootstrap Icons (thường dùng để hiển thị icon) */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
            />

            {/* (Tuỳ chọn) Import file CSS cục bộ (nếu bạn có /public/css/styles.css) 
          => Đặt file styles.css vào thư mục public/css/styles.css
      */}
            {/* <link rel="stylesheet" href="/css/styles.css" /> */}

            {/* Favicon */}
            <link
                rel="icon"
                type="image/x-icon"
                href={`${process.env.NODE_ENV === "production"
                    ? process.env.NEXT_PUBLIC_BASEPATH ?? ""
                    : ""
                    }/favicon.ico`}
            />

            {/* (Tuỳ chọn) Script cục bộ, ví dụ firebase.js
          => Đặt file firebase.js vào /public/js/firebase.js
          => Lưu ý: Next.js khuyến nghị dùng <Script> thay vì <script> thuần
      */}
            {/* <script type="module" src="/js/firebase.js"></script> */}
        </Head>
    );
};

export default HeadMeta;
