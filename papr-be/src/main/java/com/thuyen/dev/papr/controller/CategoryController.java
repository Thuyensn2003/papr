package com.thuyen.dev.papr.controller;

import com.thuyen.dev.papr.dto.CategoryDto;
import com.thuyen.dev.papr.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3001")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/")
    public List<CategoryDto> getAllCategories() {
        return categoryService.findAllWithPostCount();
    }

    @GetMapping("/{slug}")
    public CategoryDto getCategoryBySlug(@PathVariable String slug) {
        // Nếu cần, bạn có thể tạo thêm phương thức trong service để tìm theo slug và
        // trả về CategoryDto
        // Ví dụ: categoryService.findBySlug(slug)
        // Ở đây mình chỉ demo lấy từ danh sách
        return categoryService.findAllWithPostCount().stream()
                .filter(cat -> cat.getSlug().equals(slug))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Category not found: " + slug));
    }
}
