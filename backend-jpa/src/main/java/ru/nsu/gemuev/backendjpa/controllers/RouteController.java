package ru.nsu.gemuev.backendjpa.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.nsu.gemuev.backendjpa.dto.IdDto;
import ru.nsu.gemuev.backendjpa.dto.RouteDto;
import ru.nsu.gemuev.backendjpa.dto.requests.CreateRouteRequest;
import ru.nsu.gemuev.backendjpa.services.RoutesService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/routes")
public class RouteController {
    private final RoutesService routesService;

    @PostMapping("/get-by-id")
    public ResponseEntity<RouteDto> getRouteById(@RequestBody IdDto request){
        return new ResponseEntity<>(routesService.getRouteById(request.getId()), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestBody CreateRouteRequest request){
        routesService.createRoute(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> delete(@RequestBody IdDto request){
        routesService.deleteRoute(request.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @PostMapping("/edit")
//    public ResponseEntity<Void> edit(@RequestBody PointDto request){
//        pointsService.editPoint(request);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @GetMapping("/get-all")
    public ResponseEntity<List<RouteDto>> getAll(){
        return new ResponseEntity<>(routesService.getAllRoutes(), HttpStatus.OK);
    }
}
