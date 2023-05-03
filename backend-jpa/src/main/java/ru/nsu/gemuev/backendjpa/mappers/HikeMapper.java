package ru.nsu.gemuev.backendjpa.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.nsu.gemuev.backendjpa.dto.HikeDto;
import ru.nsu.gemuev.backendjpa.entity.Hike;

@Mapper(componentModel = "spring",
        uses = {TouristMapper.class, TrainerMapper.class, DiaryRecordMapper.class, RouteMapper.class})
public interface HikeMapper {
    @Mapping(source = "description", target = "description")
    HikeDto toDto(Hike hike);
}
