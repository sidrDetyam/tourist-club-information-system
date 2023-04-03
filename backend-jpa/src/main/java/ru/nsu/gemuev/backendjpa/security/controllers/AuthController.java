package ru.nsu.gemuev.backendjpa.security.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.nsu.gemuev.backendjpa.security.dto.JwtLoginRequestDto;
import ru.nsu.gemuev.backendjpa.security.dto.JwtLoginResponseDto;
import ru.nsu.gemuev.backendjpa.security.dto.JwtRefreshRequestDto;
import ru.nsu.gemuev.backendjpa.security.dto.JwtRefreshResponseDto;
import ru.nsu.gemuev.backendjpa.security.services.AuthService;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("login")
    public ResponseEntity<JwtLoginResponseDto> login(@RequestBody final JwtLoginRequestDto authRequest) throws Exception {
        final JwtLoginResponseDto response = authService.login(authRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("refresh")
    public ResponseEntity<JwtRefreshResponseDto> getNewAccessToken(@RequestBody final JwtRefreshRequestDto request) throws Exception {
        final JwtRefreshResponseDto response = authService.refreshAccessToken(request.getRefreshToken());
        return ResponseEntity.ok(response);
    }
}
