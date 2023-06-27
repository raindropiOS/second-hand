package com.secondhand.domain.exception;

import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;

@RestController
@ControllerAdvice
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception e, WebRequest request) {
        ExceptionResponse exceptionResponse =
                new ExceptionResponse(e.getMessage(), request.getDescription(false));

        return new ResponseEntity(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MissingTokenException.class)
    public final ResponseEntity<Object> handleTokenExceptions(MissingTokenException e, WebRequest request) {
        ExceptionResponse exceptionResponse =
                new ExceptionResponse(e.getMessage(), request.getDescription(false));
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ElementNotFoundException.class)
    public final ResponseEntity<Object> handleElementNotFoundExceptions(ElementNotFoundException e,
                                                                        WebRequest request) {
        ExceptionResponse exceptionResponse =
                new ExceptionResponse(e.getMessage(), request.getDescription(false));

        return new ResponseEntity(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(TownNotFoundException.class)
    public final ResponseEntity<Object> handleTownNotFoundExceptions(TownNotFoundException e,
                                                                     WebRequest request) {
        ExceptionResponse exceptionResponse =
                new ExceptionResponse(e.getMessage(), request.getDescription(false));

        return new ResponseEntity(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MemberNotFoundException.class)
    public final ResponseEntity<Object> handleMemberNotFoundExceptions(MemberNotFoundException e,
                                                                       WebRequest request) {
        ExceptionResponse exceptionResponse =
                new ExceptionResponse(e.getMessage(), request.getDescription(false));

        return new ResponseEntity(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CategoryNotFoundException.class)
    public final ResponseEntity<Object> handleGCategoryFoundExceptions(CategoryNotFoundException e,
                                                                       WebRequest request) {
        ExceptionResponse exceptionResponse =
                new ExceptionResponse(e.getMessage(), request.getDescription(false));

        return new ResponseEntity(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(StatusNotFoundException.class)
    public final ResponseEntity<Object> handleStatusNotFoundExceptions(CategoryNotFoundException e,
                                                                       WebRequest request) {
        ExceptionResponse exceptionResponse =
                new ExceptionResponse(e.getMessage(), request.getDescription(false));

        return new ResponseEntity(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NotUserMineProductException.class)
    public final ResponseEntity<Object> handleNotUserMineProductExceptions(CategoryNotFoundException e,
                                                                       WebRequest request) {
        ExceptionResponse exceptionResponse =
                new ExceptionResponse(e.getMessage(), request.getDescription(false));

        return new ResponseEntity(exceptionResponse, HttpStatus.NOT_FOUND);
    }
}
