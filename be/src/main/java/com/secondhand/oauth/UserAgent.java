package com.secondhand.oauth;

public enum UserAgent {

    IOS("iOS"),
    WEB("Web"),
    OTHER("Other");

    private final String userAgent;

    UserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public static UserAgent fromUserAgentDtoValidationUserAgent(String userAgentString) {
        if (userAgentString.contains("iPhone") || userAgentString.contains("iPad")) {
            return IOS;
        } else if (userAgentString.contains("Windows") || userAgentString.contains("Macintosh")) {
            return WEB;
        } else {
            return OTHER;
        }
    }
}
