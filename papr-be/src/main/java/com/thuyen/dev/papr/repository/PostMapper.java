package com.thuyen.dev.papr.repository;

import com.thuyen.dev.papr.dto.PostDto;
import com.thuyen.dev.papr.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostMapper {
    @Mapping(source = "category.cate", target = "cate")
    @Mapping(source = "category.slug", target = "slug")
    PostDto toDto(Post post);
}