package com.secondhand.domain.interested;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface InterestedRepository extends JpaRepository<Interested, Long> {

    @Query("SELECT i FROM Interested i WHERE i.product.id = :productId AND i.member.id = :memberId")
    Optional<Interested> findByProductIdAndMemberId(@Param("productId") long productId,@Param("memberId") Long memberId);
}
