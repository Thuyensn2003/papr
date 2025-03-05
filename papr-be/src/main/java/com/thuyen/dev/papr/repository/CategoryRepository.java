package com.thuyen.dev.papr.repository;

import com.thuyen.dev.papr.dto.CategoryDto;
import com.thuyen.dev.papr.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findBySlug(String slug);

    @Query("SELECT new com.thuyen.dev.papr.dto.CategoryDto(c.id, c.cate, c.cateImg, c.slug, COUNT(p)) " +
            "FROM Category c LEFT JOIN Post p ON c.id = p.category.id " +
            "GROUP BY c.id, c.cate, c.cateImg, c.slug")
    List<CategoryDto> findAllWithPostCount();

}
