package com.thuyen.dev.papr.repository;

import com.thuyen.dev.papr.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    Optional<Author> findByAuthorName(String authorName); // ✅ Đúng với biến trong `Author.java`

    Optional<Author> findBySlug(String slug);

}
