package ru.nsu.gemuev.backendjpa.controllers;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.nsu.gemuev.backendjpa.dto.*;
import ru.nsu.gemuev.backendjpa.security.services.AuthService;
import ru.nsu.gemuev.backendjpa.services.SectionsService;
import ru.nsu.gemuev.backendjpa.services.TouristService;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@AllArgsConstructor
@RequestMapping("/sections")
public class SectionController {

    private final SectionsService sectionsService;
    private final TouristService touristService;
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

    @GetMapping("/all-info")
    public ResponseEntity<List<SectionDto>> allInfo(){
        final List<SectionDto> info = sectionsService.getAllSectionsInfo();
        info.forEach(i -> i.setTrainers(touristService.getSectionTrainers(i.getSectionId())));
        return new ResponseEntity<>(info, HttpStatus.OK);
    }

    @PostMapping("/edit")
    public ResponseEntity<StatusDto> editSection(@RequestBody @NonNull EditSectionDto editSectionDto){
        sectionsService.editSection(editSectionDto, authService.getAuthInfo().getPrincipal());
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/all-trainers")
    public ResponseEntity<List<UserDto>> allTrainers(){
        final var trainers = touristService.getAllTrainers();
        return new ResponseEntity<>(trainers, HttpStatus.OK);
    }
}
