package com.secondhand.oauth.service;

import com.secondhand.oauth.dto.OAuthMemberInfoDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.OptionalLong;

@Service
public class JwtService {

    public static final String SUBJECT_NAME = "login_member";
    public static final String USER_ID = "userId";
    public static final String USER_INFO = "userIdInfo";
    private String secret;

    public JwtService(@Value("${JWT_SECRET_KEY}") String secret) {
        this.secret = secret;
    }

    public String createToken(OAuthMemberInfoDTO memberInfo) {
        return Jwts.builder()
                .setSubject(SUBJECT_NAME)
                .claim(USER_INFO, memberInfo) //페이로드,헤더는 자동설정
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

    public Optional<Long> getSubject(String token) {
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        Object userIdInfoObject = claims.get(USER_INFO);

        if (userIdInfoObject instanceof OAuthMemberInfoDTO) {
            OAuthMemberInfoDTO userIdInfo = (OAuthMemberInfoDTO) userIdInfoObject;
            return Optional.ofNullable(userIdInfo.getId());
        }

        return Optional.empty();
    }
}
