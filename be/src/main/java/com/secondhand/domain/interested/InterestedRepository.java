package com.secondhand.domain.interested;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InterestedRepository extends JpaRepository<Interested, Long> {
    Interested findByProductId(long productId);
}
