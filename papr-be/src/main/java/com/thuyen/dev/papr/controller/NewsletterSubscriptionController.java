package com.thuyen.dev.papr.controller;

import com.thuyen.dev.papr.entity.NewsletterSubscription;
import com.thuyen.dev.papr.service.NewsletterSubscriptionService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/newsletters")
@CrossOrigin(origins = "http://localhost:3001") // nếu bạn dùng Next.js trên cổng 3001
public class NewsletterSubscriptionController {

    private final NewsletterSubscriptionService subscriptionService;

    @Autowired
    public NewsletterSubscriptionController(NewsletterSubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email không được để trống");
        }

        try {
            NewsletterSubscription saved = subscriptionService.subscribe(email);
            return ResponseEntity.ok("Đăng ký nhận tin thành công: " + saved.getEmail());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
