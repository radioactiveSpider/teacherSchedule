package com.teacherschedule.repositories;

import com.teacherschedule.Models.Teacher;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TeacherRepository extends MongoRepository<Teacher, String>{
    public Optional<Teacher> findTeacherByPolytechId(String polytechId);
}