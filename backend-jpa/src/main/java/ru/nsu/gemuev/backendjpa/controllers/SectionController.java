package ru.nsu.gemuev.backendjpa.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.nsu.gemuev.backendjpa.dto.SectionsListDto;
import ru.nsu.gemuev.backendjpa.security.services.AuthService;
import ru.nsu.gemuev.backendjpa.services.SectionsService;

import java.util.NoSuchElementException;

@RestController
@AllArgsConstructor
@RequestMapping("/sections")
public class SectionController {

    private final SectionsService sectionsService;
    private final AuthService authService;

    @GetMapping("/all")
    public ResponseEntity<SectionsListDto> all(){
        return new ResponseEntity<>(
                new SectionsListDto(sectionsService.getAllSectionsNames()),
                HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<SectionsListDto> allToUser(){
        final String username = authService.getAuthInfo().getPrincipal();
        try{
            return new ResponseEntity<>(
                    new SectionsListDto(sectionsService.getTouristSectionsNames(username)),
                    HttpStatus.OK);
        }
        catch (NoSuchElementException ignore){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
