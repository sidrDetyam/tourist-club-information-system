package ru.nsu.gemuev.backendjpa.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.context.annotation.Bean;
import ru.nsu.gemuev.backendjpa.dto.SectionDto;
import ru.nsu.gemuev.backendjpa.entity.Section;

@Mapper(componentModel = "spring",
        uses = {UserMapper.class})
public interface SectionMapper {
    @Mapping(source = "id", target = "sectionId")
    @Mapping(source = "sectionManager", target = "manager")
    SectionDto toDto(Section section);

//    Set<SectionDto> toDtoSet(Set<Section> sectionSet);
}