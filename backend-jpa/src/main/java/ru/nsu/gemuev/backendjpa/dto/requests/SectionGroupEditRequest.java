package ru.nsu.gemuev.backendjpa.dto.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NonNull;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class SectionGroupEditRequest {
    private Long groupId;
    private String name;
    private List<Long> touristIds;
    private Long trainerId;
}
