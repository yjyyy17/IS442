package com.is442.springbootbackend.repository;

import com.is442.springbootbackend.model.Action;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActionRepository extends JpaRepository<Action, Long> {
    List<Action> findByWorkflowWorkflowId(Long workflowId);
    List<Action> findByFormTemplateFormId(int formId);

}
