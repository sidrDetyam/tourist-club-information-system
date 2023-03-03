package ru.nsu.gemuev.backend.services;

import io.jsonwebtoken.Claims;
import jakarta.security.auth.message.AuthException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backend.dto.JwtRequest;
import ru.nsu.gemuev.backend.dto.JwtResponse;
import ru.nsu.gemuev.backend.entity.Role;
import ru.nsu.gemuev.backend.entity.User;
import ru.nsu.gemuev.backend.repositories.RoleRepository;
import ru.nsu.gemuev.backend.repositories.UserRepository;
import ru.nsu.gemuev.backend.security.JwtAuthentication;
import ru.nsu.gemuev.backend.security.JwtProvider;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final Map<String, String> refreshStorage = new HashMap<>();
    private final JwtProvider jwtProvider;

    public @NonNull JwtResponse login(@NonNull JwtRequest authRequest) throws AuthException {
        final User user = userRepository.getByUsername(authRequest.getUsername())
                .orElseThrow(() -> new AuthException("User not found"));

        if (user.getPassword().equals(authRequest.getPassword())) {
            final Set<Role> userRoles = roleRepository.findRolesByUserId(user.getId());
            final String accessToken = jwtProvider.generateAccessToken(user, userRoles);
            final String refreshToken = jwtProvider.generateRefreshToken(user);
            refreshStorage.put(user.getUsername(), refreshToken);
            return new JwtResponse(accessToken, refreshToken);
        } else {
            throw new AuthException("Incorrect password");
        }
    }

    public @NonNull JwtResponse getAccessToken(@NonNull String refreshToken) throws AuthException {
        if (jwtProvider.validateRefreshToken(refreshToken)) {
            final Claims claims = jwtProvider.getRefreshClaims(refreshToken);
            final String username = claims.getSubject();
            final String saveRefreshToken = refreshStorage.get(username);
            if (saveRefreshToken != null && saveRefreshToken.equals(refreshToken)) {
                final User user = userRepository.getByUsername(username)
                        .orElseThrow(() -> new AuthException("User not found: %s".formatted(username)));
                final Set<Role> userRoles = roleRepository.findRolesByUserId(user.getId());
                final String accessToken = jwtProvider.generateAccessToken(user, userRoles);
                return new JwtResponse(accessToken, null);
            }
        }
        return new JwtResponse(null, null);
    }

    public JwtResponse refresh(@NonNull String refreshToken) throws AuthException {
        if (jwtProvider.validateRefreshToken(refreshToken)) {
            final Claims claims = jwtProvider.getRefreshClaims(refreshToken);
            final String username = claims.getSubject();
            final String saveRefreshToken = refreshStorage.get(username);
            if (saveRefreshToken != null && saveRefreshToken.equals(refreshToken)) {
                final User user = userRepository.getByUsername(username)
                        .orElseThrow(() -> new AuthException("Пользователь не найден"));
                final Set<Role> userRoles = roleRepository.findRolesByUserId(user.getId());
                final String accessToken = jwtProvider.generateAccessToken(user, userRoles);
                final String newRefreshToken = jwtProvider.generateRefreshToken(user);
                refreshStorage.put(user.getUsername(), newRefreshToken);
                return new JwtResponse(accessToken, newRefreshToken);
            }
        }
        throw new AuthException("Невалидны");
    }

    public JwtAuthentication getAuthInfo() {
        return (JwtAuthentication) SecurityContextHolder.getContext().getAuthentication();
    }

}