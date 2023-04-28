package ru.nsu.gemuev.backendjpa.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TouristDto extends UserDto {
    private String touristCategory;
}
