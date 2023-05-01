package ru.nsu.gemuev.backendjpa.utils;

import lombok.experimental.UtilityClass;

@UtilityClass
public class RequestFieldChecker {
    public static void requireNonNull(Object object){
        if(object == null){
            throw new NullRequestFieldException("Null field");
        }
    }
}
