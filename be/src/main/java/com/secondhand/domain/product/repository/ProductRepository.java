package com.secondhand.domain.product.repository;

import com.secondhand.domain.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>, ProductCustomRepository {

    List<Product> findByUsername(String username);
}
