package ru.nsu.gemuev.backendjpa.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TrainerDto extends TouristDto {
    private String trainerCategory;
}
