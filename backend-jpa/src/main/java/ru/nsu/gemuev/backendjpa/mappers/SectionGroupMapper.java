package ru.nsu.gemuev.backendjpa.mappers;

import org.mapstruct.Mapper;
import ru.nsu.gemuev.backendjpa.dto.SectionGroupDto;
import ru.nsu.gemuev.backendjpa.entity.SectionGroup;

@Mapper(componentModel = "spring")
public interface SectionGroupMapper {
    SectionGroupDto toDto(SectionGroup sectionGroup);
}
