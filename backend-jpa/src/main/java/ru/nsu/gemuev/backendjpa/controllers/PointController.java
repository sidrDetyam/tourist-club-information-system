package ru.nsu.gemuev.backendjpa.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.nsu.gemuev.backendjpa.dto.IdDto;
import ru.nsu.gemuev.backendjpa.dto.PointDto;
import ru.nsu.gemuev.backendjpa.dto.requests.CreatePointRequest;
import ru.nsu.gemuev.backendjpa.services.PointsService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/points")
public class PointController {
    private final PointsService pointsService;

    @PostMapping("/get-by-id")
    public ResponseEntity<PointDto> getPointById(@RequestBody IdDto request){
        return new ResponseEntity<>(pointsService.getPointById(request.getId()), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestBody CreatePointRequest request){
        pointsService.createPoint(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> delete(@RequestBody IdDto request){
        pointsService.deletePoint(request.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/edit")
    public ResponseEntity<Void> edit(@RequestBody PointDto request){
        pointsService.editPoint(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<PointDto>> getAll(){
        return new ResponseEntity<>(pointsService.getAllPoints(), HttpStatus.OK);
    }
}
