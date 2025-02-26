package com.viet.dev.papr.entity;

import jakarta.persistence.*;
import lombok.*;

import java.text.DateFormat;
import java.util.List;

@Entity
@Table(name = "posts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Lob
    private String content;
}
