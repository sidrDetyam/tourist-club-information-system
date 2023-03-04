package ru.nsu.gemuev.backend.security.dto;

import lombok.NonNull;
import lombok.Value;

@Value
public class JwtLoginResponseDto {
    String type = "Bearer";
    @NonNull String accessToken;
    @NonNull String refreshToken;
}
