package ru.nsu.gemuev.backendjpa.controllers;


import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.nsu.gemuev.backendjpa.dto.CategoryDto;
import ru.nsu.gemuev.backendjpa.dto.IdDto;
import ru.nsu.gemuev.backendjpa.dto.TouristDto;
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

    @PostMapping("/get-by-id")
    public ResponseEntity<TouristDto> getTrainerById(@RequestBody IdDto request){
        return new ResponseEntity<>(trainerService.getById(request.getId()), HttpStatus.OK);
    }

    @PostMapping("/reduce")
    public ResponseEntity<Void> reduceToTourist(@RequestBody IdDto request){
        trainerService.reduceToTourist(request.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/increase")
    public ResponseEntity<Void> increaseToTrainer(@RequestBody IdDto request){
        trainerService.increaseToTrainer(request.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> delete(@RequestBody IdDto request){
        trainerService.deleteTrainer(request.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/edit")
    public ResponseEntity<Void> edit(@RequestBody TrainerDto request){
        trainerService.edit(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
