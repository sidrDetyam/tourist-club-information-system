package ru.nsu.gemuev.backendjpa.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.nsu.gemuev.backendjpa.dto.SectionDto;
import ru.nsu.gemuev.backendjpa.domain.Section;

@Mapper(componentModel = "spring",
        uses = {UserMapper.class, SectionGroupMapper.class, TrainerMapper.class})
public interface SectionMapper {
    @Mapping(source = "id", target = "sectionId")
    @Mapping(source = "sectionManager", target = "manager")
    @Mapping(source = "sectionGroup", target = "groups")
    SectionDto toDto(Section section);

//    Set<SectionDto> toDtoSet(Set<Section> sectionSet);
}