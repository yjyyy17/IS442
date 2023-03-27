package com.is442.springbootbackend.repository;

import com.is442.springbootbackend.model.UserGroup_Workflows;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface UserGroup_WorkflowsRepository extends JpaRepository<UserGroup_Workflows, Long> {
    UserGroup_Workflows findByUsergroupUserGroupIdAndWorkflowWorkflowId(Long userGroupId, Long workflowId);
    List<UserGroup_Workflows> findByUsergroupUserGroupId(Long userGroupId);
}
