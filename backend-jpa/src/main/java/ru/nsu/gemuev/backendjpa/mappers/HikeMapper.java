package ru.nsu.gemuev.backendjpa.mappers;

import org.mapstruct.Mapper;
import ru.nsu.gemuev.backendjpa.dto.HikeDto;
import ru.nsu.gemuev.backendjpa.entity.Hike;

@Mapper(componentModel = "spring",
        uses = {TouristMapper.class, TrainerMapper.class, DiaryRecordMapper.class})
public interface HikeMapper {
    HikeDto toDto(Hike hike);
}
