package ru.nsu.gemuev.backendjpa.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.nsu.gemuev.backendjpa.dto.MessageDto;
import ru.nsu.gemuev.backendjpa.security.entities.User;
import ru.nsu.gemuev.backendjpa.repositories.UserRepository;
import ru.nsu.gemuev.backendjpa.security.jwt.JwtAuthentication;
import ru.nsu.gemuev.backendjpa.security.services.AuthService;

@RestController
@RequestMapping("/")
@AllArgsConstructor
public class HelloController {

    private final UserRepository userRepository;
    private final AuthService authService;

    @GetMapping("hello")
    public ResponseEntity<User> hello(){
        return new ResponseEntity<>(userRepository.findById(1L).orElseThrow(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("hello/user")
    public ResponseEntity<String> helloUser(@RequestBody MessageDto messageDto) {
        final JwtAuthentication authInfo = authService.getAuthInfo();
        return ResponseEntity.ok("Hello user " + authInfo.getPrincipal() + "! " + messageDto.getMsg());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("hello/admin")
    public ResponseEntity<String> helloAdmin() {
        final JwtAuthentication authInfo = authService.getAuthInfo();
        return ResponseEntity.ok("Hello admin " + authInfo.getPrincipal() + "!");
    }
}
