import Breadcrumb from "../../components/common/Breadcrumb";
import HeadMeta from "../../components/elements/HeadMeta";
import FooterOne from "../../components/footer/FooterOne";
import HeaderOne from "../../components/header/HeaderOne";
import PostFormatAudio from "../../components/post/post-format/PostFormatAudio";
import PostFormatGallery from "../../components/post/post-format/PostFormatGallery";
import PostFormatQuote from "../../components/post/post-format/PostFormatQuote";
import PostFormatStandard from "../../components/post/post-format/PostFormatStandard";
import PostFormatText from "../../components/post/post-format/PostFormatText";
import PostFormatVideo from "../../components/post/post-format/PostFormatVideo";
import PostSectionSix from "../../components/post/PostSectionSix";
import { useEffect, useState } from "react";
import axios from "axios";
import markdownToHtml from "../../../lib/markdownToHtml";


const PostDetails = ({ slug }) => {
	const [allPosts, setAllPosts] = useState([]);
	const [postContent, setPostContent] = useState({});
	useEffect(() => {
		axios.get('http://localhost:8082/api/posts/').then(res => { setAllPosts(res.data) }).catch(err => { console.log(err) })
		const fetchPost = async () => {
			try {
				const res = await axios.get(`http://localhost:8082/api/posts/${slug}`);
				const contentHtml = await markdownToHtml(res.data.content || "");

				setPostContent({
					...res.data,
					content: contentHtml, // Ensure this contains the resolved HTML
				});
			} catch (err) {
				console.error("Error fetching post:", err);
			}
		};

		fetchPost();

	}, [slug]);

	const PostFormatHandler = () => {
		if (postContent.postFormat === 'video') {
			return <PostFormatVideo postData={postContent} allData={allPosts} />
		} else if (postContent.postFormat === 'gallery') {
			return <PostFormatGallery postData={postContent} allData={allPosts} />
		} else if (postContent.postFormat === 'audio') {
			return <PostFormatAudio postData={postContent} allData={allPosts} />
		} else if (postContent.postFormat === 'quote') {
			return <PostFormatQuote postData={postContent} allData={allPosts} />
		} else if (postContent.postFormat === 'text') {
			return <PostFormatText postData={postContent} allData={allPosts} />
		} else {
			return <PostFormatStandard postData={postContent} allData={allPosts} />
		}
	}

	return (
		"content" in postContent && <>
			<HeadMeta metaTitle="Post Details" />
			<HeaderOne />
			<Breadcrumb bCat={postContent.cate} aPage={postContent.title} />
			<PostFormatHandler />
			<PostSectionSix postData={allPosts} />
			<FooterOne />
		</>
	);
}

export default PostDetails;

export async function getStaticPaths() {
	return {
		paths: [{ params: { slug: "example" } }],
		fallback: "blocking",
	};
}

export async function getStaticProps({ params }) {
	return {
		props: { slug: params.slug },
	};
}
