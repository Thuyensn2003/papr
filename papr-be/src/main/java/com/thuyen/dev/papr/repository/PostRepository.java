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

    List<Post> findByCategoryId(Long categoryId);

    List<Post> findByCategorySlug(String slug);

    @Query(value = "SELECT p.* FROM posts p JOIN post_rating pr ON p.id = pr.post_id WHERE pr.rating = :rating", nativeQuery = true)
    List<Post> findPostsByRating(@Param("rating") String rating);

    @Query(value = "SELECT * FROM posts p " +
            "WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :question, '%')) " +
            "OR LOWER(p.content) LIKE LOWER(CONCAT('%', :question, '%'))", nativeQuery = true)
    List<Post> searchPostsByQuestion(@Param("question") String question);

    List<Post> findByCateContainingIgnoreCase(String cate);

}
