package ru.nsu.gemuev.backendjpa.dto.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CreateSectionGroupRequest {
    private Long sectionId;
    private String name;
}
