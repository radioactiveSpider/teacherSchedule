package com.teacherschedule.Models;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

public class Teacher{

	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	private String polytechId;
	private String firstName;

	private String lastName;
	private String chair;
	private List<Group> groups = new ArrayList<>();

	public Teacher() {

	}

	public String getPolytechId() {
		return polytechId;
	}

	public void setPolytechId(String mongoId) {
		this.polytechId = mongoId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getChair() {return this.chair;}

	public void setChair(String chair) { this.chair = chair;}

	public List<Group> getGroups() {return this.groups;}

	public void setGroups(List<Group> groups) { this.groups = groups;}

}