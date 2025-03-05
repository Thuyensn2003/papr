package com.thuyen.dev.papr.controller;

import com.thuyen.dev.papr.entity.Author;
import com.thuyen.dev.papr.service.AuthorService;
import com.thuyen.dev.papr.service.PostService; // Import PostService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/authors")
@CrossOrigin(origins = "http://localhost:3001")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    // Tiêm postService nếu cần dùng để lấy bài viết của tác giả
    @Autowired
    private PostService postService;

    // API lấy tất cả tác giả
    @GetMapping("/")
    public List<Author> getAllAuthors() {
        return authorService.findAll();
    }

    // API lấy tác giả theo tên (hoặc slug)
    @GetMapping("/{authorName}")
    public Optional<Author> getAuthorByName(@PathVariable String authorName) {
        return authorService.findByAuthorName(authorName);
    }

    // API lấy thông tin tác giả kèm bài viết dựa trên slug
    @GetMapping("/{slug}/posts")
    public ResponseEntity<?> getAuthorWithPosts(@PathVariable String slug) {
        // Chuyển slug thành tên tác giả gốc
        String authorName = convertSlugToName(slug);

        Optional<Author> authorOpt = authorService.findByAuthorName(authorName);
        if (authorOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Author author = authorOpt.get();
        List<?> posts = postService.findByAuthorId(author.getId());

        Map<String, Object> result = new HashMap<>();
        result.put("author", author);
        result.put("posts", posts);
        return ResponseEntity.ok(result);
    }

    // Thêm phương thức chuyển đổi slug thành tên tác giả gốc
    private String convertSlugToName(String slug) {
        String[] parts = slug.split("-");
        for (int i = 0; i < parts.length; i++) {
            if (parts[i].length() > 0) {
                parts[i] = parts[i].substring(0, 1).toUpperCase() + parts[i].substring(1);
            }
        }
        return String.join(" ", parts);
    }

}
