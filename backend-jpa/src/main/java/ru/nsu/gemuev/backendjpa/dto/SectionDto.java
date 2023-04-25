package ru.nsu.gemuev.backendjpa.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SectionDto {
    private Long sectionId;
    private String name;
    private String description;
    private UserDto manager;
    private List<UserDto> trainers;
}
