package com.is442.springbootbackend.repository;

import com.is442.springbootbackend.model.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
    Set<UserGroup> findByAssignedWorkflows_WorkflowId(Long workflowId);
}
