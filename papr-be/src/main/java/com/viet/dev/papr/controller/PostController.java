package com.viet.dev.papr.controller;

import com.viet.dev.papr.dto.PostDto;
import com.viet.dev.papr.entity.Post;
import com.viet.dev.papr.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3001/")
public class PostController {
    @Autowired
    private PostService postService;
    @GetMapping("/")
    public List<PostDto> getAllPosts(){
        return postService.findAll().stream().map(postService::mapToDto).toList();
    }

    @GetMapping("/{slug}")
    public PostDto getAllPosts(@PathVariable String slug){
        return postService.findAll().stream().filter(post -> post.getSlug().equals(slug)).findFirst().map(postService::mapToDto).get();
    }
}
