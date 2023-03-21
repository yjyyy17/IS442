package com.is442.springbootbackend.repository;

import com.is442.springbootbackend.model.FormTemplate;
import com.is442.springbootbackend.model.Response;
import com.is442.springbootbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResponseRepository extends JpaRepository<Response, Integer> {

//    public Optional<Response> findByUserID (long userID);
}
