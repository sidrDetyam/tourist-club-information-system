package ru.nsu.gemuev.backendjpa.dto.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class EditRouteRequest {
    private Long id;
    private Long categoryId;
    private String name;
    private List<Long> pointIds;
    private String description;
}
