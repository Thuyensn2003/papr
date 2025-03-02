package com.thuyen.dev.papr.service;

import com.thuyen.dev.papr.entity.Author;
import com.thuyen.dev.papr.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    // ✅ Thêm phương thức findAll()
    public List<Author> findAll() {
        return authorRepository.findAll();
    }

    // ✅ Thêm phương thức findByAuthorName()
    public Optional<Author> findByAuthorName(String authorName) {
        return authorRepository.findByAuthorName(authorName);
    }

    public Optional<Author> findBySlug(String slug) {
        return authorRepository.findBySlug(slug);
    }

}
