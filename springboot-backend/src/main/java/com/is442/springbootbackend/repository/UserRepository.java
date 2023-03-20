package com.is442.springbootbackend.repository;

import com.is442.springbootbackend.model.FormStatus;
import com.is442.springbootbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
}
