package ru.nsu.gemuev.backendjpa.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto {
    private Long id;
    private String firstName;
    private String secondName;
    private String email;
    private String username;
}
