package ru.nsu.gemuev.backendjpa.controllers;


import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.nsu.gemuev.backendjpa.dto.CategoryDto;
import ru.nsu.gemuev.backendjpa.dto.TrainerDto;
import ru.nsu.gemuev.backendjpa.dto.requests.TrainerRequest;
import ru.nsu.gemuev.backendjpa.services.TrainerService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/trainers")
public class TrainerController {
    private final TrainerService trainerService;

    @GetMapping("/category-info")
    public ResponseEntity<List<CategoryDto>> categoryInfo(){
        final var categories  = trainerService.getCategoryDto();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping("/get")
    public ResponseEntity<List<TrainerDto>> getTrainers(@RequestBody @NonNull TrainerRequest touristRequest){
        final var result = trainerService.getTourists(touristRequest);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
