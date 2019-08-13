package com.teacherschedule.Services;

import com.teacherschedule.Models.Day;
import com.teacherschedule.Models.Group;
import com.teacherschedule.Models.Student;
import com.teacherschedule.repositories.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("groupService")
@Transactional
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    public boolean saveAll(List<Group> groups) {
        for (Group group : groups) {
            for (String date : group.getDatesOfLesson()) {
                group.getIsCheckedDates().add(new Day(date, "false"));
                for (Student student : group.getStudents()) {
                    student.getAttendance().add(new Day(date, "none"));
                }
            }
            groupRepository.saveAll(groups);
        }
        return true;
    }

    public Group findById(String id) {
        return groupRepository.findById(id).orElse(new Group());
    }

    public Group findByPolitechId(String id) {
        return groupRepository.findByPolytechId(id).orElse(new Group());
    }

    public void save(Group group) {
        groupRepository.save(group);
    }

}
