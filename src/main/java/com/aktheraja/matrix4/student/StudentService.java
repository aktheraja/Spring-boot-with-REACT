package com.aktheraja.matrix4.student;

import com.aktheraja.matrix4.EmailValidator;
import com.aktheraja.matrix4.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {
   private  final StudentDataAccess studentDataAccess;
   private final EmailValidator emailValidator;
    @Autowired
    public StudentService(StudentDataAccess studentDataAccess, EmailValidator emailValidator) {
        this.studentDataAccess = studentDataAccess;
        this.emailValidator = emailValidator;
    }

    public List<Student> getAllStudents() {
        return studentDataAccess.selectAllStudents();
    }
    void addNewStudent(Student student){
        addNewStudent (null , student);
    }

    void addNewStudent(UUID studentId , Student student) {
        UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());
        //TODO: Validate email
        if (!emailValidator.test(student.getEmail())) {
            throw new ApiRequestException(student.getEmail() + " is not valid");
        }
        //TODO:Verify that email is not take
          if (studentDataAccess.isEmailTaken(student.getEmail())) {
            throw new ApiRequestException(student.getEmail() + " is taken");
        }
             studentDataAccess.insertStudent(newStudentId, student);
    }
}
