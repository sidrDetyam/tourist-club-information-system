package ru.nsu.gemuev.backendjpa.dto.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CreatePointRequest {
    private String point;
    private String description;
}
