package com.thuyen.dev.papr.service;

import com.thuyen.dev.papr.dto.PostDto;
import com.thuyen.dev.papr.entity.AuthorSocial;
import com.thuyen.dev.papr.entity.Post;
import com.thuyen.dev.papr.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<Post> findAll() {
        return postRepository.findAll();
    }

    public PostDto mapToDto(Post post) {
        return PostDto.builder()
                .id(post.getId())
                .postFormat(post.getPostFormat())
                .slug(post.getSlug())
                .trending(post.getTrending())
                .story(post.getStory())
                .title(post.getTitle())
                .excerpt(post.getExcerpt())
                .author_name(post.getAuthor_name())
                .cate(post.getCate())
                .cate_bg(post.getCate_bg())
                .cate_img(post.getCate_img())
                .date(post.getDate())
                .featureImg(post.getFeatureImg())
                .post_share(post.getPost_share())
                .post_views(post.getPost_views())
                .author_social(getDefaultAuthorSocial())
                .content(post.getContent())
                .gallery(List.of("/images/posts/gallery-1.png", "/images/posts/gallery-2.png",
                        "/images/posts/gallery-3.png", "/images/posts/gallery-4.png"))
                .build();
    }

    public List<AuthorSocial> getDefaultAuthorSocial() {
        return List.of(
                new AuthorSocial("facebook", "https://www.facebook.com/"),
                new AuthorSocial("twitter", "https://twitter.com/"),
                new AuthorSocial("instagram", "https://www.instagram.com/"));
    }
}
