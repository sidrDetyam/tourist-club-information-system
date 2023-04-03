package ru.nsu.gemuev.backendjpa.dto;

import lombok.NonNull;
import lombok.Value;

@Value
public class MessageDto {
    @NonNull String msg;
}
