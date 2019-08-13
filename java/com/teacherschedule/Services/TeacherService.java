package com.teacherschedule.Services;

import com.teacherschedule.Models.Teacher;
import com.teacherschedule.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("teacherService")
@Transactional
public class TeacherService {

	@Autowired
	private TeacherRepository teacherRepository;

	public Teacher findByPolytechId(String id){
		return teacherRepository.findTeacherByPolytechId(id).orElse(null);
	}

	public Teacher findById(String id){
		return teacherRepository.findById(id).orElse(null);
	}

	public boolean save(Teacher teacher){
		Teacher teacher_ = teacherRepository.findTeacherByPolytechId(teacher.getPolytechId()).orElse(null);
		if(teacher_ != null)
			return false;
		else {
			teacherRepository.save(teacher);
			return true;
		}
	}
}