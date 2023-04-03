package ru.nsu.gemuev.backendjpa.security.dto;

import lombok.*;

@Value
public class JwtLoginRequestDto {
    @NonNull String username;
    @NonNull String password;
}