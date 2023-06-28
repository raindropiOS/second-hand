package com.secondhand.service.repository;

import com.secondhand.domain.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long>, ProductCustomRepository {
    @Modifying
    @Query("UPDATE Product p set p.countView = p.countView + 1 WHERE p.id = :productId")
    int countViews(@Param("productId") Long productId);



}
