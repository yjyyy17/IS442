package com.is442.springbootbackend.repository;

import com.is442.springbootbackend.model.UserGroup_Workflows;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserGroup_WorkflowsRepository extends JpaRepository<UserGroup_Workflows, Long> {
    UserGroup_Workflows findByUsergroupUserGroupIdAndWorkflowWorkflowId(Long userGroupId, Long workflowId);
}
