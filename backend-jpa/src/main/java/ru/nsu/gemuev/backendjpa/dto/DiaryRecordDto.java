package ru.nsu.gemuev.backendjpa.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.sql.Timestamp;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class DiaryRecordDto {
    private Long id;
    private String record;
    private Timestamp timestamp;
}
