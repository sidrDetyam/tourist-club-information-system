package ru.nsu.gemuev.backendjpa.mappers;


import org.mapstruct.Mapper;
import ru.nsu.gemuev.backendjpa.dto.PointDto;
import ru.nsu.gemuev.backendjpa.domain.ControlPoint;

@Mapper(componentModel = "spring")
public interface PointMapper {
    PointDto toDto(ControlPoint point);
}
