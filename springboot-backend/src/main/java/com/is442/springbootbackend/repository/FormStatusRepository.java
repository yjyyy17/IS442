package com.is442.springbootbackend.repository;

import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.is442.springbootbackend.model.FormStatus;
import com.is442.springbootbackend.model.FormStatusId;

@Repository
public interface FormStatusRepository extends JpaRepository<FormStatus, FormStatusId> {
//    FormStatus findByIdFormAndIdWorkflowAndIdUser(int formID, Long workflowID, Long userID);
    FormStatus findByFormFormIdAndWorkflowWorkflowIdAndUserUserId(int formId, Long workflowId, Long userId);
    FormStatus findByWorkflowWorkflowIdAndUserUserId(Long workflowId, Long userId);
    List<FormStatus> findByFormFormId(int formId);
    List<FormStatus> findByWorkflowWorkflowId(Long workflowId);
    List<FormStatus> findByUserUserId(Long userId);
}


