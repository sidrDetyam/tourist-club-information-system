package ru.nsu.gemuev.backendjpa.utils;

import lombok.NonNull;

public class NullRequestFieldException extends RuntimeException{
    public NullRequestFieldException(@NonNull String cause){
        super(cause);
    }
}
