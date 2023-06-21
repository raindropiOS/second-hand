package com.secondhand.login;

import com.secondhand.domain.exception.MemberNotFoundException;
import com.secondhand.domain.member.MemberRepository;
import com.secondhand.oauth.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Component
@RequiredArgsConstructor
public class LoginInterceptor implements HandlerInterceptor {

    private final AuthorizationExtractor authExtractor;
    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.debug("인터셉터 실행");
        HandlerMethod handlerMethod = (HandlerMethod) handler;

        if (!handlerMethod.hasMethodAnnotation(LoginCheck.class)) {
            return true;
        }

        String token = authExtractor.extract(request, "Bearer");

        //헤더로 부터 토큰을 얻어온 후 유효한 토큰인지 검증한다. 요청에  디코딩한 값을 세팅
        if (!StringUtils.isEmpty(token) && jwtService.validateToken(token)) {
            Long userId = jwtService.getSubject(token);
            request.setAttribute("userId", userId);

            memberRepository.findById(userId)
                    .orElseThrow(() -> new MemberNotFoundException());
        }
        return true;
    }
}
