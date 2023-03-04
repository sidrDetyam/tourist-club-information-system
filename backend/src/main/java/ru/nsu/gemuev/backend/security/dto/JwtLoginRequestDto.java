package ru.nsu.gemuev.backend.security.dto;

import lombok.*;

@Value
public class JwtLoginRequestDto {
    @NonNull String username;
    @NonNull String password;
}