package com.community.sample.config.Jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

public class JwtUtil {
    private static final String SECRET_KEY = "my_secret_key_example";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24시간

    public static String createToken(Long userId, String nickname, String role) {
        return Jwts.builder()
                .claim("userId", userId)
                .claim("nickname", nickname)
                .claim("role", role)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // JWT 토큰에서 Claims 추출
    public static Claims parseToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

}
