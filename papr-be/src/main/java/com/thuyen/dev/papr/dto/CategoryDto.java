package com.thuyen.dev.papr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryDto {
    private Long id;
    private String cate;
    private String cateImg;
    private String slug;
    private Long count;
}
