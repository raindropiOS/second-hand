package com.secondhand.domain.member;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberPasswordRepository extends JpaRepository<MemberPassword, Long> {
}
