package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
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
    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public @NonNull PointDto getPointById(final long id){
        return pointMapper.toDto(pointsRepository.findById(id).orElseThrow());
    }

    @Transactional
    public @NonNull List<PointDto> getAllPoints(){
        return StreamSupport.stream(pointsRepository.findAll().spliterator(), false)
                .map(pointMapper::toDto)
                .toList();
    }

    @Transactional
    public void createPoint(@NonNull CreatePointRequest request){
        RequestFieldChecker.requireNonNull(request.getPoint());
        RequestFieldChecker.requireNonNull(request.getDescription());
        final var point = new ControlPoint();
        point.setPoint(request.getPoint());
        point.setDescription(request.getDescription());
        pointsRepository.save(point);
    }

    @Transactional
    public void deletePoint(final long id){

    }
}
