package ru.nsu.gemuev.backendjpa.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.context.annotation.Bean;
import ru.nsu.gemuev.backendjpa.dto.SectionDto;
import ru.nsu.gemuev.backendjpa.entity.Section;

@Mapper(componentModel = "spring",
        uses = {UserMapper.class, SectionGroupMapper.class})
public interface SectionMapper {
    @Mapping(source = "id", target = "sectionId")
    @Mapping(source = "sectionManager", target = "manager")
    @Mapping(source = "sectionGroup", target = "groups")
    SectionDto toDto(Section section);

//    Set<SectionDto> toDtoSet(Set<Section> sectionSet);
}