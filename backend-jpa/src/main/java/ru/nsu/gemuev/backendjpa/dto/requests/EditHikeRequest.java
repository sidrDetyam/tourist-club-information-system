package ru.nsu.gemuev.backendjpa.dto.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class EditHikeRequest {
    private Long id;
    private Timestamp start;
    private Timestamp end;
    private String name;
    private Long routeId;
    private Long trainerId;
    private List<Long> touristIds;
}
