package com.aktheraja.matrix4.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;
@RestController
@RequestMapping("students")
public class StudentController {
    @GetMapping
    public List<Student> getAllStudent(){
        return List.of(
                new Student(
                        UUID.randomUUID(),
                        "JAMES",
                        "Bond",
                        "jamesbond@gmail.com",
                        Student.Gender.MALE),
        new Student(
                UUID.randomUUID(),
                "ELISA",
                "TAMARA",
                "elisatamara@hotmail.com",
                Student.Gender.FEMALE)
       );
    }
}
