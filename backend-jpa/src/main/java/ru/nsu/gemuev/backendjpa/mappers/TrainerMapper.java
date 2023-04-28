package ru.nsu.gemuev.backendjpa.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.nsu.gemuev.backendjpa.dto.TrainerDto;
import ru.nsu.gemuev.backendjpa.entity.Trainer;

@Mapper(componentModel = "spring")
public interface TrainerMapper {
    @Mapping(target = "secondName", source = "lastName")
    @Mapping(target = "touristCategory",
            expression = "java(trainer.getCategory().getValue())")
    @Mapping(target = "trainerCategory",
            expression = "java(trainer.getTrainerCategory().getValue())")
    TrainerDto toDto(Trainer trainer);
}
