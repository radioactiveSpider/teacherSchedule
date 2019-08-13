package com.teacherschedule.repositories;

import com.teacherschedule.Models.Group;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface GroupRepository extends MongoRepository<Group, String> {
    public Optional<Group> findByPolytechId(String polytechId);
}
