package ru.nsu.gemuev.backendjpa.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.nsu.gemuev.backendjpa.dto.HikeDto;
import ru.nsu.gemuev.backendjpa.dto.IdDto;
import ru.nsu.gemuev.backendjpa.services.HikeService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/hikes")
public class HikeController {
    private final HikeService hikeService;

    @GetMapping("/all")
    public ResponseEntity<List<HikeDto>> all(){
        final var hikes = hikeService.allHikes();
        return new ResponseEntity<>(hikes, HttpStatus.OK);
    }

    @PostMapping("/get-by-id")
    public ResponseEntity<HikeDto> getById(@RequestBody IdDto request){
        final var hike = hikeService.getById(request.getId());
        return new ResponseEntity<>(hike, HttpStatus.OK);
    }
}
