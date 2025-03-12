package com.thuyen.dev.papr.repository;

import com.thuyen.dev.papr.entity.NewsletterSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsletterSubscriptionRepository extends JpaRepository<NewsletterSubscription, Long> {
    // Nếu muốn kiểm tra email tồn tại, có thể thêm:
    boolean existsByEmail(String email);
}
