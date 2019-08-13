package com.teacherschedule.Models;

import java.util.ArrayList;
import java.util.List;

public class Student {

    private String fullName;
    private List<Day> attendance = new ArrayList<>();
    private List<Work> works = new ArrayList<>();

    public List<Work> getWorks() {
        return works;
    }

    public void setWorks(List<Work> works) {
        this.works = works;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public List<Day> getAttendance() {
        return attendance;
    }

    public void setAttendance(List<Day> attendance) {
        this.attendance = attendance;
    }
}
