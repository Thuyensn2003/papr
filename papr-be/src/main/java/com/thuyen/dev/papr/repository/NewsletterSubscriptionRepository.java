package com.thuyen.dev.papr.repository;

import com.thuyen.dev.papr.entity.NewsletterSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsletterSubscriptionRepository extends JpaRepository<NewsletterSubscription, Long> {
    // check trùng lặp mail đã đăng ký trước đó
    boolean existsByEmail(String email);
}
