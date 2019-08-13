package com.teacherschedule.Controllers;

import com.teacherschedule.Models.Group;
import com.teacherschedule.Models.Teacher;
import com.teacherschedule.Services.GroupService;
import com.teacherschedule.Services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Controller
@RequestMapping("/home")
public class HomeController {

    private TeacherService teacherService;
    private GroupService groupService;

    @Autowired
    public HomeController(TeacherService teacherService, GroupService groupService) {
        this.teacherService = teacherService;
        this.groupService = groupService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public String showStartPage() {
        return "index";
    }

    @RequestMapping(value = "/findByPolyId", method = RequestMethod.GET)
    public @ResponseBody
    Teacher findTeacher(String teacherId) {

        Teacher teacher = teacherService.findByPolytechId(teacherId);
        return teacher;
    }

    @RequestMapping(value = "/addTeacher", method = RequestMethod.POST)

    public @ResponseBody
    boolean addTeacher(@RequestBody Teacher teacher) {
        try {
            Boolean output = teacherService.save(teacher);
            return output;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @RequestMapping(value = "/addGroups", method = RequestMethod.POST)
    public @ResponseBody
    boolean addGroups(@RequestBody ArrayList<Group> groups) {
        return groupService.saveAll(groups);
    }

}
