package ru.nsu.gemuev.backendjpa.controllers;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.nsu.gemuev.backendjpa.dto.CategoryDto;
import ru.nsu.gemuev.backendjpa.dto.IdDto;
import ru.nsu.gemuev.backendjpa.dto.TouristDto;
import ru.nsu.gemuev.backendjpa.dto.requests.CreateUserRequest;
import ru.nsu.gemuev.backendjpa.dto.requests.TouristRequest;
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

    @PostMapping("/get")
    public ResponseEntity<List<TouristDto>> getTourists(@RequestBody @NonNull TouristRequest touristRequest){
        final var result = touristService.getTourists(touristRequest);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/get-by-id")
    public ResponseEntity<TouristDto> getTouristById(@RequestBody IdDto request){
        return new ResponseEntity<>(touristService.getById(request.getId()), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createTourist(@RequestBody CreateUserRequest createUserRequest){
        touristService.createUser(createUserRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
