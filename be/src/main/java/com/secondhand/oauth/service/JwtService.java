package com.secondhand.oauth.service;

import com.secondhand.domain.member.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Slf4j
@Service
public class JwtService {

    public static final String SUBJECT_NAME = "login_member";
    public static final String MEMBER_ID = "memberId";
    private String secret;

    public JwtService(@Value("${JWT_SECRET_KEY}") String secret) {
        this.secret = secret;
    }

    public String createToken(Member member) {
        log.debug("memberID ={}", member.getId());
        return Jwts.builder()
                .setSubject(SUBJECT_NAME)
                .claim(MEMBER_ID, member.getId()) //페이로드,헤더는 자동설정
                .setExpiration(new Date((new Date()).getTime() + 24 * 60 * 60 * 1000)) // 토큰의 만료일을 설정 : 현재 1일
                .signWith(SignatureAlgorithm.HS256, secret) // HS256 알고리즘과 시크릿 키를 사용하여 서명
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token);

            if (claimsJws.getBody().getExpiration().before(new Date())) {
                return false;
            }

            return true;

        } catch (Exception e) {
            return false;
        }
    }

    public Long getSubject(String token) {
        log.debug("jwt token = {}", token);
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();

        return claims.get("id", Long.class);
    }
}
