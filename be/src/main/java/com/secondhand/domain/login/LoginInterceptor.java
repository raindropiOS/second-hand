package com.secondhand.domain.login;

import com.secondhand.domain.member.Member;
import com.secondhand.exception.MemberNotFoundException;
import com.secondhand.domain.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Component
@RequiredArgsConstructor
public class LoginInterceptor implements HandlerInterceptor {

    public static final String BEARER = "Bearer";
    public static final String USER_ID = "userId";
    private final AuthorizationExtractor authExtractor;
    private final JwtTokenProvider jwtService;
    private final MemberRepository memberRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.debug("인터셉터 실행");

        if (loginCheck(handler)) {
            String token = authExtractor.extract(request, BEARER);

            //헤더로 부터 토큰을 얻어온 후 유효한 토큰인지 검증한다. 요청에  디코딩한 값을 세팅
            if ((token != null && !token.equals(""))) {
                TokenType tokenType = jwtService.validateToken(token);
                Long id;
                if (tokenType == TokenType.ACCESS_TOKEN) {
                    id = jwtService.getSubject(token); // 액세스 토큰에서 사용자 ID 추출
                } else {
                    id = jwtService.getSubjectRefreshSecretKey(token); // 리프레시 토큰에서 사용자 ID 추출
                }

                log.debug("토큰으로 부터 받아온 userId = {}", id);
                request.setAttribute(USER_ID, id);
            }
        }

        return true;
    }

    private boolean loginCheck(Object handler) {
        return handler instanceof HandlerMethod
                && ((HandlerMethod) handler).hasMethodAnnotation(LoginCheck.class);
    }
}
