package com.aktheraja.matrix4.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {
    final StudentDataAccess studentDataAccess;
    @Autowired
    public StudentService(StudentDataAccess studentDataAccess) {
        this.studentDataAccess = studentDataAccess;
    }

    public List<Student> getAllStudents() {
        return studentDataAccess.selectAllStudents();
    }
    void addNewStudent(Student student){
        addNewStudent (null , student);
    }

    void addNewStudent(UUID studentId , Student student) {
        UUID newStudentId=Optional.ofNullable(studentId).orElse(UUID.randomUUID());
        //TODO:Verify that email is not take
        studentDataAccess.insertStudent(newStudentId,student);
    }
}
