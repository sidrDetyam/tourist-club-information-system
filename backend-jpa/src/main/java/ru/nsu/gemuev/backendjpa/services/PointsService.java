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
import ru.nsu.gemuev.backendjpa.dto.requests.CreatePointRequest;
import ru.nsu.gemuev.backendjpa.entity.ControlPoint;
import ru.nsu.gemuev.backendjpa.mappers.PointMapper;
import ru.nsu.gemuev.backendjpa.repositories.PointsRepository;
import ru.nsu.gemuev.backendjpa.utils.RequestFieldChecker;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class PointsService {
    private final PointsRepository pointsRepository;
    private final PointMapper pointMapper;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Transactional
    public @NonNull PointDto getPointById(final long id) {
        return pointMapper.toDto(pointsRepository.findById(id).orElseThrow());
    }

    @Transactional
    public @NonNull List<PointDto> getAllPoints() {
        return StreamSupport.stream(pointsRepository.findAll().spliterator(), false)
                .map(pointMapper::toDto)
                .toList();
    }

    @Transactional
    public void createPoint(@NonNull CreatePointRequest request) {
        RequestFieldChecker.requireNonNull(request.getPoint());
        RequestFieldChecker.requireNonNull(request.getDescription());
        final var point = new ControlPoint();
        point.setPoint(request.getPoint());
        point.setDescription(request.getDescription());
        pointsRepository.save(point);
    }

    @Transactional
    public void deletePoint(final long id) {
        final KeyHolder holder = new GeneratedKeyHolder();
        final SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id", id);

        namedParameterJdbcTemplate.update(
                "delete from routes_control_points where point_id=:id; " +
                "delete from control_points where id=:id", parameters, holder);
    }

    @Transactional
    public void editPoint(final @NonNull PointDto request){
        RequestFieldChecker.requireNonNull(request.getPoint());
        RequestFieldChecker.requireNonNull(request.getDescription());
        RequestFieldChecker.requireNonNull(request.getId());

        final ControlPoint point = pointsRepository.findById(request.getId()).orElseThrow();
        point.setDescription(request.getDescription());
        point.setPoint(request.getPoint());
        pointsRepository.save(point);
    }
}
