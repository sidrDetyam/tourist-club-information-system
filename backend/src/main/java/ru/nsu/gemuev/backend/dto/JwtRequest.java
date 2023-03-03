package ru.nsu.gemuev.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class JwtRequest {
    private String username;
    private String password;
}