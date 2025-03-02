package com.thuyen.dev.papr.repository;

import com.thuyen.dev.papr.entity.Post;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findBySlug(String slug);

    @Query("SELECT p FROM Post p WHERE p.author.id = :authorId")
    List<Post> findByAuthorId(@Param("authorId") Long authorId);
}
