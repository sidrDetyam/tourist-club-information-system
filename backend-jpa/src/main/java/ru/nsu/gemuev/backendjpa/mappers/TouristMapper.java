package ru.nsu.gemuev.backendjpa.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.nsu.gemuev.backendjpa.dto.TouristDto;
import ru.nsu.gemuev.backendjpa.domain.Tourist;

@Mapper(componentModel = "spring")
public interface TouristMapper {
    @Mapping(target = "secondName", source = "lastName")
    @Mapping(target = "touristCategory",
            expression = "java(tourist.getCategory() == null? null : tourist.getCategory().getValue())")
    TouristDto toDto(Tourist tourist);
}
