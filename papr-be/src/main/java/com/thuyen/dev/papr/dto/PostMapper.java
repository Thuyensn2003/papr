package com.thuyen.dev.papr.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import com.thuyen.dev.papr.dto.PostDto;
import com.thuyen.dev.papr.entity.Post;

@Mapper(componentModel = "spring")
public interface PostMapper {
    PostMapper INSTANCE = Mappers.getMapper(PostMapper.class);

    @Mapping(target = "categoryName", source = "category.cate")
    PostDto toDto(Post post);
}