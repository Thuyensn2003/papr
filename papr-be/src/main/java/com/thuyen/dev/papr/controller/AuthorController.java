package com.thuyen.dev.papr.controller;

import com.thuyen.dev.papr.entity.Author;
import com.thuyen.dev.papr.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/authors")
@CrossOrigin(origins = "http://localhost:3001")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    // Lấy tất cả tác giả
    @GetMapping("/")
    public List<Author> getAllAuthors() {
        return authorService.findAll();
    }

    // Lấy tác giả theo tên (hoặc slug nếu bạn chuyển đổi trong service)
    @GetMapping("/{authorName}")
    public ResponseEntity<Author> getAuthorByName(@PathVariable String authorName) {
        Optional<Author> author = authorService.findByAuthorName(authorName);
        return author.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
