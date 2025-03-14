package com.thuyen.dev.papr.controller;

import com.thuyen.dev.papr.dto.PostDto;
import com.thuyen.dev.papr.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = { "http://localhost:3001", "http://127.0.0.1:5500" }) // Hoặc 3001 nếu dùng Next.js
@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping("/")
    public List<PostDto> getAllPosts() {
        return postService.findAll().stream().map(postService::mapToDto).toList();
    }

    @GetMapping("/{slug}")
    public PostDto getAllPosts(@PathVariable String slug) {
        return postService.findAll().stream().filter(post -> post.getSlug().equals(slug)).findFirst()
                .map(postService::mapToDto).get();
    }

    @GetMapping("/author/{author_name}")
    public ResponseEntity<List<PostDto>> getPostsByAuthor(@PathVariable String author_name) {
        List<PostDto> posts = postService.findByAuthorName(author_name);
        if (posts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(posts);
        }
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/category/{slug}")
    public ResponseEntity<List<PostDto>> getPostsByCategory(@PathVariable String slug) {
        List<PostDto> posts = postService.findByCategorySlug(slug);
        if (posts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/category/id/{categoryId}")
    public ResponseEntity<List<PostDto>> getPostsByCategoryId(@PathVariable Long categoryId) {
        List<PostDto> posts = postService.findByCategoryId(categoryId)
                .stream()
                .map(postService::mapToDto)
                .toList();
        if (posts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/rating/{rating}")
    public ResponseEntity<List<PostDto>> getPostsByRating(@PathVariable String rating) {
        List<PostDto> posts = postService.findPostsByRating(rating);
        if (posts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/search")
    public ResponseEntity<List<PostDto>> searchPosts(@RequestParam("question") String question) {
        List<PostDto> posts = postService.searchPostsByQuestion(question);
        if (posts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/search/category")
    public ResponseEntity<List<PostDto>> searchPostsByCategory(@RequestParam("category") String category) {
        List<PostDto> posts = postService.searchPostsByCategory(category);
        if (posts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(posts);
    }

}
