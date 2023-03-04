package ru.nsu.gemuev.backend.dto;

import lombok.NonNull;
import lombok.Value;

@Value
public class MessageDto {
    @NonNull String msg;
}
