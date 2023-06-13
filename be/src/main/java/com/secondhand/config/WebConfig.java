package com.secondhand.config;

import com.secondhand.oauth.Oauth;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class WebConfig {

    private final Oauth oauth;
}
