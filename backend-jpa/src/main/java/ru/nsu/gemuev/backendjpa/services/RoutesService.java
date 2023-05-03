package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.dto.RouteDto;
import ru.nsu.gemuev.backendjpa.dto.requests.CreateRouteRequest;
import ru.nsu.gemuev.backendjpa.dto.requests.EditRouteRequest;
import ru.nsu.gemuev.backendjpa.entity.Route;
import ru.nsu.gemuev.backendjpa.mappers.RouteMapper;
import ru.nsu.gemuev.backendjpa.repositories.RoutesRepository;
import ru.nsu.gemuev.backendjpa.utils.RequestFieldChecker;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class RoutesService {
    private final RoutesRepository routesRepository;
    private final RouteMapper routeMapper;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final JdbcTemplate jdbcTemplate;

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

    @Transactional
    public void editRoute(final @NonNull EditRouteRequest request) {
        RequestFieldChecker.requireNonNull(request.getId());
        RequestFieldChecker.requireNonNull(request.getCategoryId());
        RequestFieldChecker.requireNonNull(request.getName());
        RequestFieldChecker.requireNonNull(request.getPointIds());

        final KeyHolder holder = new GeneratedKeyHolder();
        final SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id", request.getId())
                .addValue("name", request.getName())
                .addValue("category_id", request.getCategoryId());

        namedParameterJdbcTemplate.update("delete from routes_control_points where route_id=:id", parameters, holder);
        namedParameterJdbcTemplate.update("update routes set name=:name, category_id=:category_id where id=:id",
                parameters, holder);

        jdbcTemplate.batchUpdate("insert into routes_control_points (route_id, point_id) values(?,?)",
                new BatchPreparedStatementSetter(){
            @Override
            public void setValues(@NotNull PreparedStatement ps, int i) throws SQLException {
                final long pointId = request.getPointIds().get(i);
                ps.setLong(1, request.getId());
                ps.setLong(2, pointId);
            }

            @Override
            public int getBatchSize() {
                return request.getPointIds().size();
            }
        });

    }
}
