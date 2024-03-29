package ru.nsu.gemuev.backendjpa.mappers;

import org.mapstruct.Mapper;
import ru.nsu.gemuev.backendjpa.dto.ScheduleItemDto;
import ru.nsu.gemuev.backendjpa.domain.ScheduleItem;

@Mapper(componentModel = "spring")
public interface ScheduleItemMapper {
    ScheduleItemDto toDto(ScheduleItem scheduleItem);

    ScheduleItem toScheduleItem(ScheduleItemDto scheduleItemDto);
}
