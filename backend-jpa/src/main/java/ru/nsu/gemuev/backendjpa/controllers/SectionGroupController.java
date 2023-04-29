package ru.nsu.gemuev.backendjpa.controllers;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.nsu.gemuev.backendjpa.dto.IdDto;
import ru.nsu.gemuev.backendjpa.dto.requests.CreateSectionGroupRequest;
import ru.nsu.gemuev.backendjpa.services.SectionGroupService;

@RestController
@AllArgsConstructor
@RequestMapping("/section-groups")
public class SectionGroupController {
    private final SectionGroupService sectionGroupService;

    @PostMapping("/create")
    public ResponseEntity<Long> createGroup(@RequestBody @NonNull CreateSectionGroupRequest request){
        final long id = sectionGroupService.createGroup(request.getSectionId(), request.getName());
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> deleteGroup(@RequestBody @NonNull IdDto id){
        sectionGroupService.deleteGroup(id.getId());
        return ResponseEntity.ok().build();
    }
}
