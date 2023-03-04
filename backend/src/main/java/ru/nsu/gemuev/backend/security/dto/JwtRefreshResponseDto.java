package ru.nsu.gemuev.backend.security.dto;

import lombok.NonNull;
import lombok.Value;

@Value
public class JwtRefreshResponseDto {
    @NonNull String accessToken;
}
