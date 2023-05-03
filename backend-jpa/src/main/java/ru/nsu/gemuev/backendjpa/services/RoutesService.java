package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.dto.PointDto;
import ru.nsu.gemuev.backendjpa.dto.RouteDto;
import ru.nsu.gemuev.backendjpa.dto.requests.CreatePointRequest;
import ru.nsu.gemuev.backendjpa.dto.requests.CreateRouteRequest;
import ru.nsu.gemuev.backendjpa.entity.ControlPoint;
import ru.nsu.gemuev.backendjpa.entity.Route;
import ru.nsu.gemuev.backendjpa.mappers.RouteMapper;
import ru.nsu.gemuev.backendjpa.repositories.RoutesRepository;
import ru.nsu.gemuev.backendjpa.utils.RequestFieldChecker;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class RoutesService {
    private final RoutesRepository routesRepository;
    private final RouteMapper routeMapper;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Transactional
    public @NonNull RouteDto getRouteById(final long id) {
        return routeMapper.toDto(routesRepository.findById(id).orElseThrow());
    }

    @Transactional
    public @NonNull List<RouteDto> getAllRoutes() {
        return StreamSupport.stream(routesRepository.findAll().spliterator(), false)
                .map(routeMapper::toDto)
                .toList();
    }

    @Transactional
    public void createRoute(@NonNull CreateRouteRequest request) {
        RequestFieldChecker.requireNonNull(request.getName());
        final var route = new Route();
        route.setName(request.getName());
        routesRepository.save(route);
    }

    @Transactional
    public void deleteRoute(final long id) {
        final KeyHolder holder = new GeneratedKeyHolder();
        final SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id", id);

        namedParameterJdbcTemplate.update("delete from routes_control_points where route_id=:id",
                parameters, holder);

        namedParameterJdbcTemplate.update("update hikes set route_id=null where route_id=:id",
                parameters, holder);

        namedParameterJdbcTemplate.update("delete from routes where id = :id",
                parameters, holder);
    }
//
//    @Transactional
//    public void editPoint(final @NonNull PointDto request) {
//        RequestFieldChecker.requireNonNull(request.getPoint());
//        RequestFieldChecker.requireNonNull(request.getDescription());
//        RequestFieldChecker.requireNonNull(request.getId());
//
//        final ControlPoint point = pointsRepository.findById(request.getId()).orElseThrow();
//        point.setDescription(request.getDescription());
//        point.setPoint(request.getPoint());
//        pointsRepository.save(point);
//    }
}
