package com.is442.springbootbackend.repository;

import com.is442.springbootbackend.model.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
}
