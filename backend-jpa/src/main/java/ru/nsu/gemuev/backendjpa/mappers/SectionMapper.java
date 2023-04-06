package ru.nsu.gemuev.backendjpa.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import ru.nsu.gemuev.backendjpa.dto.SectionDto;
import ru.nsu.gemuev.backendjpa.entity.Section;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface SectionMapper {
    SectionMapper INSTANCE = Mappers.getMapper(SectionMapper.class);

    @Mapping(source = "id", target = "sectionId")
    @Mapping(source = "sectionManager", target = "manager")
    SectionDto toDto(Section section);

    Set<SectionDto> toDtoSet(Set<Section> sectionSet);

    @Mapping(source = "sectionId", target = "id")
    @Mapping(source = "manager", target = "sectionManager")
    Section toEntity(SectionDto sectionDto);
}