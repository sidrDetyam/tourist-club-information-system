package ru.nsu.gemuev.backendjpa.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class HikeDto {
    private Long id;
    private Set<TouristDto> tourists;
    private TrainerDto trainer;
    private String description;
    private List<DiaryRecordDto> diaryRecords;
    private String name;
}
