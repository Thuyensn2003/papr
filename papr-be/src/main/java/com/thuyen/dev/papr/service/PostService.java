package com.thuyen.dev.papr.service;

import com.thuyen.dev.papr.dto.PostDto;
import com.thuyen.dev.papr.entity.Author;
import com.thuyen.dev.papr.entity.AuthorSocial;
import com.thuyen.dev.papr.entity.Category;
import com.thuyen.dev.papr.entity.Post;
import com.thuyen.dev.papr.repository.AuthorRepository;
import com.thuyen.dev.papr.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Optional;

import java.util.stream.Collectors;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private AuthorService authorService;
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private CategoryService categoryService;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

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
                .author_name(post.getAuthor() != null ? post.getAuthor().getAuthorName() : "Unknown")
                .cate(post.getCate())
                .cate_bg(post.getCate_bg())
                .cate_img(post.getCate_img())
                .date(post.getDate())
                .featureImg(post.getFeatureImg())
                .post_share(post.getPost_share())
                .post_views(post.getPost_views())
                .author_social(getDefaultAuthorSocial())
                .content(post.getContent())
                .rating(post.getRating())
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

    public List<PostDto> findByAuthorName(String author_name) {
        Optional<Author> author = authorRepository.findByAuthorName(author_name);
        if (author.isEmpty()) {
            throw new RuntimeException("Author not found: " + author_name);
        }
        return postRepository.findByAuthorId(author.get().getId()).stream()
                .map(this::mapToDto)
                .toList();
    }

    public List<PostDto> findByCategorySlug(String slug) {
        Category category = categoryService.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Category not found: " + slug));
        return postRepository.findByCategoryId(category.getId())
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    public Optional<Post> findBySlug(String slug) {
        return postRepository.findAll().stream()
                .filter(post -> post.getSlug().equals(slug))
                .findFirst();
    }

    public List<PostDto> findByAuthorId(Long authorId) {
        return postRepository.findByAuthorId(authorId)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    public List<Post> findByCategoryId(Long categoryId) {
        return postRepository.findByCategoryId(categoryId);
    }

    public List<PostDto> findPostsByRating(String rating) {
        return postRepository.findPostsByRating(rating)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    public List<PostDto> searchPostsByQuestion(String question) {
        List<Post> posts = postRepository.searchPostsByQuestion(question);
        return posts.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // Phương thức tìm kiếm bài viết theo danh mục
    public List<PostDto> searchPostsByCategory(String category) {
        List<Post> posts = postRepository.findByCateContainingIgnoreCase(category);
        return posts.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
}
