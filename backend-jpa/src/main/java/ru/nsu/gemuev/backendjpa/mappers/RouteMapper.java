package ru.nsu.gemuev.backendjpa.mappers;

import org.mapstruct.Mapper;
import ru.nsu.gemuev.backendjpa.dto.RouteDto;
import ru.nsu.gemuev.backendjpa.domain.Route;

@Mapper(componentModel = "spring",
        uses = {PointMapper.class, TouristCategoryMapper.class})
public interface RouteMapper {
    RouteDto toDto(Route route);
}
