package com.thuyen.dev.papr.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "authors")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "author_name", unique = true, nullable = false)
    private String authorName;

    @Column(name = "author_bio")
    private String authorBio;

    @Column(name = "author_img")
    private String authorImg;

    @Column(name = "slug", unique = true)
    private String slug;

    // ✅ Tránh vòng lặp JSON vô hạn
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Post> posts;
}
