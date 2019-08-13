package com.teacherschedule.Controllers;

import com.teacherschedule.Models.Group;
import com.teacherschedule.Services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/group")
public class GroupController {

    @Autowired
    GroupService groupService;

    @RequestMapping(value = "/findByPolyId", method = RequestMethod.GET)
    public @ResponseBody
    Group findGroup(String groupId) {
        Group group = groupService.findByPolitechId(groupId);
        return group;
    }

    @RequestMapping(value = "/updateGroupInfo", method = RequestMethod.POST)
    public @ResponseBody
    int updateGroupInfo(@RequestBody Group group) {
        groupService.save(group);
        return 1;
    }

    @RequestMapping(value = "/groupWorks", method = RequestMethod.GET)
    public String showGroupWorks(String groupId, Model model) {
        Group group = groupService.findByPolitechId(groupId);
        model.addAttribute("group", group);
        model.addAttribute("groupId", groupId);
        return "newGroupWork";
    }
}
