package com.thuyen.dev.papr.controller;

import com.thuyen.dev.papr.dto.PostDto;
import com.thuyen.dev.papr.entity.Post;
import com.thuyen.dev.papr.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3001") // Hoặc 3001 nếu dùng Next.js
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

}
