package ru.nsu.gemuev.backendjpa.mappers;

import org.mapstruct.Mapper;
import ru.nsu.gemuev.backendjpa.dto.CategoryDto;
import ru.nsu.gemuev.backendjpa.domain.TouristCategory;

@Mapper(componentModel = "spring")
public interface TouristCategoryMapper {
    CategoryDto toDto(TouristCategory category);
}
