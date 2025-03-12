package com.thuyen.dev.papr.service;

import com.thuyen.dev.papr.entity.Author;
import com.thuyen.dev.papr.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true) // ✅ Tối ưu transaction
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    // ✅ Lấy danh sách tất cả tác giả
    public List<Author> findAll() {
        return authorRepository.findAll();
    }

    // ✅ Tìm tác giả theo tên
    public Optional<Author> findByAuthorName(String authorName) {
        return authorRepository.findByAuthorName(authorName);
    }

    // ✅ Tìm tác giả theo slug (thay vì chuyển slug về tên)
    public Optional<Author> findBySlug(String slug) {
        return authorRepository.findBySlug(slug);
    }
}
