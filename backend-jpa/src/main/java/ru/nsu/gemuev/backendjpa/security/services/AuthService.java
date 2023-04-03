package ru.nsu.gemuev.backendjpa.security.services;

import io.jsonwebtoken.Claims;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.nsu.gemuev.backendjpa.security.dto.JwtLoginRequestDto;
import ru.nsu.gemuev.backendjpa.security.dto.JwtLoginResponseDto;
import ru.nsu.gemuev.backendjpa.security.dto.JwtRefreshResponseDto;
import ru.nsu.gemuev.backendjpa.security.entities.Role;
import ru.nsu.gemuev.backendjpa.security.entities.User;
import ru.nsu.gemuev.backendjpa.repositories.RoleRepository;
import ru.nsu.gemuev.backendjpa.repositories.UserRepository;
import ru.nsu.gemuev.backendjpa.security.jwt.JwtAuthentication;
import ru.nsu.gemuev.backendjpa.security.jwt.JwtProvider;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtProvider jwtProvider;

    @Transactional
    public @NonNull JwtLoginResponseDto login(@NonNull final JwtLoginRequestDto authRequest) throws Exception {
        final User user = userRepository.getByUsername(authRequest.getUsername())
                .orElseThrow(() -> new Exception("User not found"));

        if (!user.getPassword().equals(authRequest.getPassword())) {
            throw new Exception("Incorrect password");
        }

        final Set<Role> userRoles = roleRepository.findRolesByUserId(user.getId());
        final JwtLoginResponseDto jwtLoginResponseDto = generateJwtResponse(user, userRoles);
        user.setRefreshToken(jwtLoginResponseDto.getRefreshToken());
        userRepository.save(user);
        return jwtLoginResponseDto;
    }

    @Transactional(readOnly = true)
    public @NonNull JwtRefreshResponseDto refreshAccessToken(@NonNull final String refreshToken) throws Exception {
        if (!jwtProvider.validateRefreshToken(refreshToken)) {
            throw new Exception("Invalid refresh token");
        }

        final Claims claims = jwtProvider.getRefreshClaims(refreshToken);
        final String username = claims.getSubject();

        final User user = userRepository.getByUsername(username)
                .orElseThrow(() -> new Exception("User not found: %s".formatted(username)));

        if (!refreshToken.equals(user.getRefreshToken())) {
            throw new Exception("New and old refresh tokens aren`t equal");
        }

        final Set<Role> userRoles = roleRepository.findRolesByUserId(user.getId());
        final String accessToken = jwtProvider.generateAccessToken(user.getUsername(), userRoles);
        ///TODO
        //final String newRefreshToken = jwtProvider.generateRefreshToken(user.getUsername());
        //user.setRefreshToken(newRefreshToken);
        //userRepository.save(user);
        return new JwtRefreshResponseDto(accessToken);
    }

    public @NonNull JwtAuthentication getAuthInfo() {
        return (JwtAuthentication) SecurityContextHolder.getContext().getAuthentication();
    }

    private @NonNull JwtLoginResponseDto generateJwtResponse(@NonNull final User user,
                                                             @NonNull final Set<? extends Role> roles) {
        final String accessToken = jwtProvider.generateAccessToken(user.getUsername(), roles);
        final String refreshToken = jwtProvider.generateRefreshToken(user.getUsername());
        return new JwtLoginResponseDto(accessToken, refreshToken);
    }
}
