package com.is442.springbootbackend.repository;

import com.is442.springbootbackend.model.Action;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActionRepository extends JpaRepository<Action, Long> {
}
