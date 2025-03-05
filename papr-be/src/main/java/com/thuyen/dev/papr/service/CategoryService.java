package com.thuyen.dev.papr.service;

import com.thuyen.dev.papr.dto.CategoryDto;
import com.thuyen.dev.papr.entity.Category;
import com.thuyen.dev.papr.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Optional<Category> findBySlug(String slug) {
        return categoryRepository.findBySlug(slug);
    }

    public List<CategoryDto> findAllWithPostCount() {
        return categoryRepository.findAllWithPostCount();
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

}
