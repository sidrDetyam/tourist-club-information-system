package ru.nsu.gemuev.backendjpa.controllers;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.nsu.gemuev.backendjpa.dto.UserDto;
import ru.nsu.gemuev.backendjpa.security.services.AuthService;
import ru.nsu.gemuev.backendjpa.services.UserService;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final @NonNull AuthService authService;
    private final @NonNull UserService userService;

    @GetMapping("/auth-info")
    public ResponseEntity<UserDto> authInfo(){
        final String username = authService.getAuthInfo().getPrincipal();
        final UserDto userDto = userService.getUserByUsername(username).orElseThrow();

        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }
}
