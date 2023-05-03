package ru.nsu.gemuev.backendjpa.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.nsu.gemuev.backendjpa.dto.IdDto;
import ru.nsu.gemuev.backendjpa.dto.UserDto;
import ru.nsu.gemuev.backendjpa.services.ManagerService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/managers")
public class ManagerController {
    private final ManagerService managerService;

    @PostMapping("/get-by-id")
    public ResponseEntity<UserDto> getById(@RequestBody final IdDto request){
        final var dto = managerService.getById(request);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
