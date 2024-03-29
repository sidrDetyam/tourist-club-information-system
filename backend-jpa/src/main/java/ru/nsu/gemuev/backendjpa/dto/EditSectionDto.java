package ru.nsu.gemuev.backendjpa.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class EditSectionDto {
    private Long id;
    private String name;
    private String description;
    private List<Long> trainersId;
}
