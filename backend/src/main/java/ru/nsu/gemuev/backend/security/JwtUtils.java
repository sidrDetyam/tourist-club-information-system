package ru.nsu.gemuev.backend.security;

import io.jsonwebtoken.Claims;
import lombok.NonNull;
import lombok.experimental.UtilityClass;
import ru.nsu.gemuev.backend.entity.Role;

import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@UtilityClass
public final class JwtUtils {

    public static JwtAuthentication generate(Claims claims) {
        final JwtAuthentication jwtInfoToken = new JwtAuthentication();
        jwtInfoToken.setRoles(getRoles(claims));
        jwtInfoToken.setUsername(claims.get("username", String.class));
        jwtInfoToken.setUsername(claims.getSubject());
        return jwtInfoToken;
    }

    private static @NonNull Set<Role> getRoles(@NonNull Claims claims) {
        final List<HashMap<String, String>> roles = claims.get("roles", List.class);
        return roles.stream()
                .map(hm -> hm.get("authority"))
                .map(s -> new Role(null, s))
                .collect(Collectors.toSet());
    }
}
