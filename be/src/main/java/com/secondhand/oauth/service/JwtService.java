package com.secondhand.oauth.service;

import com.secondhand.oauth.dto.OAuthMemberInfoDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    private String secret; // 시크릿 키를 설정

    public JwtService(@Value("${JWT_SECRET_KEY}") String secret) {
        this.secret = secret;
    }

    public String createToken(OAuthMemberInfoDTO memberInfo) {
        return Jwts.builder()
                .setSubject("login_member")
                .claim("memberInfo", memberInfo) //페이로드,헤더는 자동설정
                .setExpiration(new Date((new Date()).getTime() + 24 * 60 * 60 * 1000)) // 토큰의 만료일을 설정 : 현재 1일
                .signWith(SignatureAlgorithm.HS256, secret) // HS256 알고리즘과 시크릿 키를 사용하여 서명
                .compact(); // 토큰을 생성하세요.
    }

    public boolean validateToken(String token) {
        try {
            // 토큰 검증
            Jws<Claims> claimsJws = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token);

            // 토큰이 만료되었는지 확인
            if (claimsJws.getBody().getExpiration().before(new Date())) {
                return false; // 토큰이 만료되었습니다.
            }

            return true; // 토큰이 유효합니다.

        } catch (Exception e) {
            return false; // 토큰 검증에 실패했습니다.
        }
    }
}
