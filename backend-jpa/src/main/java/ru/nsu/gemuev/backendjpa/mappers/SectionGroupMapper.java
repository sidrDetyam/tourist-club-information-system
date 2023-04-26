package ru.nsu.gemuev.backendjpa.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.nsu.gemuev.backendjpa.dto.SectionGroupDto;
import ru.nsu.gemuev.backendjpa.entity.SectionGroup;

@Mapper(componentModel = "spring",
        uses = {ScheduleItemMapper.class})
public interface SectionGroupMapper {
    @Mapping(source = "scheduleItems", target = "schedule")
    SectionGroupDto toDto(SectionGroup sectionGroup);
}
