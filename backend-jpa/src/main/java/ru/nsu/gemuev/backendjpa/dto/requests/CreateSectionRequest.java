package ru.nsu.gemuev.backendjpa.dto.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class CreateSectionRequest {
    private String name;
}
