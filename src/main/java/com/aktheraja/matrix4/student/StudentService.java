package com.aktheraja.matrix4.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
