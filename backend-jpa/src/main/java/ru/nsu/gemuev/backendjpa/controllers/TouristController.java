package ru.nsu.gemuev.backendjpa.controllers;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.nsu.gemuev.backendjpa.dto.CategoryDto;
import ru.nsu.gemuev.backendjpa.dto.TouristDto;
import ru.nsu.gemuev.backendjpa.dto.TouristRequest;
import ru.nsu.gemuev.backendjpa.services.TouristService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/tourists")
public class TouristController {
    private final @NonNull TouristService touristService;

    @GetMapping("/category-info")
    public ResponseEntity<List<CategoryDto>> categoryInfo(){
        final var categories  = touristService.getCategoryDto();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping("/get-toursists")
    public ResponseEntity<List<TouristDto>> getTourists(@RequestBody @NonNull TouristRequest touristRequest){
        System.out.println(touristRequest);
        return ResponseEntity.badRequest().build();
    }
}
