package com.is442.springbootbackend.repository;

import com.is442.springbootbackend.model.Workflow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowRepository extends JpaRepository<Workflow, Long> {
}
