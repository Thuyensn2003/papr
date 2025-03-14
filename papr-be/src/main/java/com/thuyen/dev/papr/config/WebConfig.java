package com.thuyen.dev.papr.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Chỉ định path nào được phép CORS, ví dụ /api/**
                .allowedOrigins("http://127.0.0.1:5500") // Cho phép origin này
                .allowedMethods("GET", "OPTIONS") // Cho phép các method
                .allowedHeaders("*") // Cho phép tất cả header
                .allowCredentials(true);
    }
}