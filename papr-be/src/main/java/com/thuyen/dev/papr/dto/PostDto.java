package com.thuyen.dev.papr.dto;

import com.thuyen.dev.papr.entity.Author;
import com.thuyen.dev.papr.entity.AuthorSocial;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private Long id;
    private String postFormat;
    private String slug;
    private Boolean trending;
    private Boolean story;
    private String title;
    private String excerpt;
    private String author_name;
    private String cate;
    private String cate_bg;
    private String cate_img;
    private String date;
    private String featureImg;
    private String post_share;
    private String post_views;
    private String content;
    private List<String> gallery;
    private List<AuthorSocial> author_social;
}
