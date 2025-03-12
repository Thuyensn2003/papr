package com.thuyen.dev.papr.service;

import com.thuyen.dev.papr.entity.NewsletterSubscription;
import com.thuyen.dev.papr.repository.NewsletterSubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewsletterSubscriptionService {

    private final NewsletterSubscriptionRepository repository;

    @Autowired
    public NewsletterSubscriptionService(NewsletterSubscriptionRepository repository) {
        this.repository = repository;
    }

    public NewsletterSubscription subscribe(String email) {
        // Nếu muốn chặn đăng ký trùng email, kiểm tra ở đây
        if (repository.existsByEmail(email)) {
            throw new RuntimeException("Email này đã đăng ký nhận tin trước đó.");
        }
        NewsletterSubscription subscription = NewsletterSubscription.builder()
                .email(email)
                .build();
        return repository.save(subscription);
    }
}
