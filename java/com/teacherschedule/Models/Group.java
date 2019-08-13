package com.teacherschedule.Models;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

public class Group {

    @Id
    private String id;
    private String type;
    private String course;
    private String polytechId;
    private String groupNumber;

    private List<Student> students = new ArrayList<>();
    private List<String> datesOfLesson = new ArrayList<>();
    private List<Day> isCheckedDates = new ArrayList<>();
    private List<Work> works = new ArrayList<>();

    public Group(){
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setIsCheckedDates(List<Day> isCheckedDates) {
        this.isCheckedDates = isCheckedDates;
    }

    public List<Work> getWorks() {
        return works;
    }

    public void setWorks(List<Work> works) {
        this.works = works;
    }

    public String getPolytechId() {
        return polytechId;
    }

    public void setPolytechId(String polytechId) {
        this.polytechId = polytechId;
    }

    public List<Day> getIsCheckedDates() {
        return isCheckedDates;
    }

    public void setIsCheckedDatesMap(List<Day> isCheckedDates) {
        this.isCheckedDates = isCheckedDates;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setGroupNumber(String groupNumber) {
        this.groupNumber = groupNumber;
    }

    public void setStudents(List<Student> students){
        this.students = students;
    }

    public String getGroupNumber(){
        return this.groupNumber;
    }

    public List<Student> getStudents(){
        return this.students;
    }

    public void setCourse(String course){
        this.course = course;
    }

    public String getCourse(){
        return this.course;
    }

    public void setDatesOfLesson(List<String> datesOfLesson){
        this.datesOfLesson = datesOfLesson;
    }

    public List<String> getDatesOfLesson(){
        return this.datesOfLesson;
    }
}
