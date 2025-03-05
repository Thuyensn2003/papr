import axios from "axios";
import { getAllPosts } from "../../lib/api";
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderOne from "../components/header/HeaderOne";
import PostSectionFive from "../components/post/PostSectionFive";
import PostSectionFour from "../components/post/PostSectionFour";
import PostSectionOne from "../components/post/PostSectionOne";
import PostSectionSix from "../components/post/PostSectionSix";
import PostSectionThree from "../components/post/PostSectionThree";
import PostSectionTwo from "../components/post/PostSectionTwo";
import { useEffect, useState } from "react";

const HomeOne = () => {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8082/api/posts/').then(res => { setAllPosts(res.data) }).catch(err => { console.log(err) })
  }, []);

  return (
    <>
      <HeadMeta metaTitle="Home One" />
      <HeaderOne />
      <PostSectionOne postData={allPosts} />
      {/* <PostSectionTwo postData={allPosts} /> */}
      <PostSectionThree postData={allPosts} />
      {/* <PostSectionFour postData={allPosts} /> */}
      <PostSectionFive postData={allPosts} adBanner={true} />
      <PostSectionSix postData={allPosts} />
      <FooterOne />
    </>
  );
}

export default HomeOne;



