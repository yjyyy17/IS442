package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.exception.ResourceNotFoundException;
import com.is442.springbootbackend.model.Action;
import com.is442.springbootbackend.model.FormTemplate;
import com.is442.springbootbackend.model.Workflow;
import com.is442.springbootbackend.repository.ActionRepository;
import com.is442.springbootbackend.repository.FormTemplateRepository;
import com.is442.springbootbackend.repository.WorkflowRepository;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ActionController {
    @Autowired
    private ActionRepository actionRepository;

    @Autowired
    private WorkflowRepository workflowRepository;

    @Autowired
    private FormTemplateRepository formTemplateRepository;

    //get all actions
    @GetMapping("/action")
    public List<Action> getAllActions(){
        return actionRepository.findAll();
    }

    //get action by id
    @GetMapping("/action/{id}")
    public ResponseEntity<Action> getActionById(@PathVariable Long id){
        Action action = actionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Action does not exist with id: " + id));
        return ResponseEntity.ok(action);
    }

    @GetMapping("/action/workflow/{workflowId}")
    public ResponseEntity<List<Action>> findByWorkflowWorkflowId(@PathVariable Long workflowId){
        List<Action> actions = actionRepository.findByWorkflowWorkflowId(workflowId);
        return ResponseEntity.ok(actions);
    }

    @GetMapping("/action/formTemplate/{formId}")
    public ResponseEntity<List<Action>> findByFormTemplateFormId(@PathVariable int formId){
        List<Action> actions = actionRepository.findByFormTemplateFormId(formId);
        return ResponseEntity.ok(actions);
    }

    //create new action
    @PostMapping("/action")
    public Action createAction(@RequestBody Action action){
        return actionRepository.save(action);
    }

    //update action by id
    @PutMapping("/action/{id}")
    public ResponseEntity<Action> updateAction(@PathVariable Long id, @RequestBody Action actionDetails){
        Action action = actionRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Action does not exist with id : " + id));

        action.setTitle(actionDetails.getTitle());
        action.setAssigneeRole(actionDetails.getAssigneeRole());

        Action updatedAction = actionRepository.save(action);
        return ResponseEntity.ok(updatedAction);
    }

    //update mapping for workflow
    @PutMapping("/action/{actionId}/workflow/{workflowId}")
    public Action assignWorkflow(@PathVariable Long actionId, @PathVariable Long workflowId){
        Action action = actionRepository.findById(actionId).get();
        Workflow workflow = workflowRepository.findById(workflowId).get();
        action.setWorkflow(workflow);
        return actionRepository.save(action);
    }

    //update mapping for form template
    @PutMapping("/action/{actionId}/formTemplate/{formId}")
    public Action assignFormTemplate(@PathVariable Long actionId, @PathVariable int formId){
        Action action = actionRepository.findById(actionId).get();
        FormTemplate formTemplate = formTemplateRepository.findById(formId).get();
        action.setFormTemplate(formTemplate);
        return actionRepository.save(action);
    }

    //delete action by id
    @DeleteMapping("/action/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteAction(@PathVariable Long id){
        Action action = actionRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Action does not exist with id : " + id));
        actionRepository.delete(action);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Action with id " + id + " has been deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
