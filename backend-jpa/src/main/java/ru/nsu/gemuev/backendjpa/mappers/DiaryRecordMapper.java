package ru.nsu.gemuev.backendjpa.mappers;

import org.mapstruct.Mapper;
import ru.nsu.gemuev.backendjpa.dto.DiaryRecordDto;
import ru.nsu.gemuev.backendjpa.entity.HikeDiaryRecord;

@Mapper(componentModel = "spring")
public interface DiaryRecordMapper {
    DiaryRecordDto toDto(HikeDiaryRecord record);
}
