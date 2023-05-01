package ru.nsu.gemuev.backendjpa.config;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.nsu.gemuev.backendjpa.utils.NullRequestFieldException;

import java.util.NoSuchElementException;

@RestControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler(value = {NoSuchElementException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String noSuchElement(Exception ex) {
        return "Entity not found";
    }

    @ExceptionHandler(value = {NullRequestFieldException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String nullField(NullRequestFieldException ex) {
        return ex.getMessage();
    }
}
