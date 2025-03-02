package com.thuyen.dev.papr.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

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
    private String cate;
    private String cate_bg;
    private String cate_img;
    private String date;
    private String featureImg;
    private String post_share;
    private String post_views;

    @Lob
    private String content;

    // ✅ Tránh vòng lặp JSON vô hạn
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    @JsonBackReference
    private Author author;
}
