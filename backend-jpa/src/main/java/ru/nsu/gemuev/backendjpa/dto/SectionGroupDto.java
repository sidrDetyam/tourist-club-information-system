package ru.nsu.gemuev.backendjpa.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SectionGroupDto {
    private Long id;
    private String name;
    private List<ScheduleItemDto> schedule;
    private TrainerDto trainer;
    private List<TouristDto> tourists;
}
