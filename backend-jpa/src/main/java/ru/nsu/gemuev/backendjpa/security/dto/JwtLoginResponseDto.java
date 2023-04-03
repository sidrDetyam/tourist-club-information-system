package ru.nsu.gemuev.backendjpa.security.dto;

import lombok.NonNull;
import lombok.Value;

@Value
public class JwtLoginResponseDto {
    String type = "Bearer";
    @NonNull String accessToken;
    @NonNull String refreshToken;
}
