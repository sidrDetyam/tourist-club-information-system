package ru.nsu.gemuev.backend.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import lombok.NonNull;
import lombok.experimental.UtilityClass;
import lombok.extern.log4j.Log4j2;
import org.jetbrains.annotations.Range;
import ru.nsu.gemuev.backend.security.entities.Role;

import java.security.Key;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@UtilityClass
@Log4j2
public final class JwtUtils {

    public static @NonNull JwtAuthentication generateAuthByClaims(@NonNull final Claims claims) {
        return new JwtAuthentication(claims.getSubject(), getRoles(claims));
    }

    public static boolean validateToken(@NonNull final String token, @NonNull final Key secret) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secret)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException expEx) {
            log.error("Token expired", expEx);
        } catch (UnsupportedJwtException unsEx) {
            log.error("Unsupported jwt", unsEx);
        } catch (MalformedJwtException mjEx) {
            log.error("Malformed jwt", mjEx);
        } catch (SignatureException sEx) {
            log.error("Invalid signature", sEx);
        } catch (Exception e) {
            log.error("Invalid token", e);
        }
        return false;
    }

    public static @NonNull Claims getClaims(@NonNull final String token, @NonNull final Key secret) {
        return Jwts.parserBuilder()
                .setSigningKey(secret)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public static @NonNull Date dateFromNow(@Range(from = 0, to = Long.MAX_VALUE) final long minutes) {
        final LocalDateTime now = LocalDateTime.now();
        final Instant accessExpirationInstant = now
                .plusMinutes(minutes)
                .atZone(ZoneId.systemDefault())
                .toInstant();
        return Date.from(accessExpirationInstant);
    }

    private static @NonNull Set<Role> getRoles(@NonNull final Claims claims) {
        ///TODO
        final List<HashMap<String, String>> roles = claims.get("roles", List.class);
        return roles.stream()
                .map(hm -> hm.get("authority"))
                .map(s -> new Role(null, s))
                .collect(Collectors.toSet());
    }
}
