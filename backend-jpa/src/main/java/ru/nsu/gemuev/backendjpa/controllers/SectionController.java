package ru.nsu.gemuev.backendjpa.controllers;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.nsu.gemuev.backendjpa.dto.*;
import ru.nsu.gemuev.backendjpa.dto.requests.CreateSectionRequest;
import ru.nsu.gemuev.backendjpa.security.services.AuthService;
import ru.nsu.gemuev.backendjpa.services.SectionsService;
import ru.nsu.gemuev.backendjpa.services.TouristService;

import java.util.List;

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

    @PostMapping("/section-group-info")
    public ResponseEntity<SectionGroupDto> getGroupInfo(@RequestBody RequestIdDto idDto){
        return new ResponseEntity<>(sectionsService.getSectionGroup(idDto.getId()),
                HttpStatus.OK);
    }

    @PostMapping("/edit-schedule")
    public ResponseEntity<Void> editSchedule(@RequestBody SectionGroupDto sectionGroupDto){
        sectionsService.editSchedule(sectionGroupDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createSection(@RequestBody CreateSectionRequest request){
        sectionsService.createSection(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> deleteSection(@RequestBody RequestIdDto requestIdDto){
        sectionsService.deleteSection(requestIdDto.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
