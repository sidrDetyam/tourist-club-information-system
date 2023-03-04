package ru.nsu.gemuev.backend.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import ru.nsu.gemuev.backend.entity.Role;
import ru.nsu.gemuev.backend.entity.User;

import javax.crypto.SecretKey;
import java.util.Set;

@Slf4j
@Component
public class JwtProvider {

    private final SecretKey jwtAccessSecret;
    private final SecretKey jwtRefreshSecret;
    private final Integer jwtAccessExpirationMinutes;
    private final Integer jwtRefreshExpirationMinutes;

    public JwtProvider(
            @Value("${jwt.secret.access}") @NonNull String jwtAccessSecret,
            @Value("${jwt.secret.refresh}") @NonNull String jwtRefreshSecret,
            @Value("${jwt.access-expiration}") @NonNull Integer jwtAccessExpiration,
            @Value("${jwt.refresh-expiration}") @NonNull Integer jwtRefreshExpiration
    ) {
        this.jwtAccessSecret = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtAccessSecret));
        this.jwtRefreshSecret = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtRefreshSecret));
        this.jwtAccessExpirationMinutes = jwtAccessExpiration;
        this.jwtRefreshExpirationMinutes = jwtRefreshExpiration;
    }

    public @NonNull String generateAccessToken(@NonNull User user, @NonNull Set<Role> roles) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setExpiration(JwtUtils.dateFromNow(jwtAccessExpirationMinutes))
                .signWith(jwtAccessSecret)
                .claim("roles", roles)
                .compact();
    }

    public @NonNull String generateRefreshToken(@NonNull User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setExpiration(JwtUtils.dateFromNow(jwtRefreshExpirationMinutes))
                .signWith(jwtRefreshSecret)
                .compact();
    }

    public boolean validateAccessToken(@NonNull String accessToken) {
        return JwtUtils.validateToken(accessToken, jwtAccessSecret);
    }

    public boolean validateRefreshToken(@NonNull String refreshToken) {
        return JwtUtils.validateToken(refreshToken, jwtRefreshSecret);
    }

    public Claims getAccessClaims(@NonNull String token) {
        return JwtUtils.getClaims(token, jwtAccessSecret);
    }

    public Claims getRefreshClaims(@NonNull String token) {
        return JwtUtils.getClaims(token, jwtRefreshSecret);
    }
}