package com.is442.springbootbackend.controller;

import java.util.*;

import com.is442.springbootbackend.model.*;
import com.is442.springbootbackend.repository.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;

//import com.is442.springbootbackend.model.FormStatusId;
import com.is442.springbootbackend.exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class FormStatusController {

    @Autowired
    private FormStatusRepository formStatusRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private FormTemplateRepository formTemplateRepository;

    @Autowired
    private WorkflowRepository workflowRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ResponseRepository responseRepository;

    @GetMapping(path = "/formstatus")
    public List<FormStatus> getAllForm() {
        return formStatusRepository.findAll();
    }

    // Get a specific FormStatus record by workflowID, and userID
    // RequestParam: ?workflowId=1&userId=2
    @GetMapping("formstatusByWorkflowAndUser")
    public ResponseEntity<FormStatus> getFormStatusById(
            @RequestParam long workflowId, @RequestParam long userId) {

        FormStatus formStatus = formStatusRepository.findByWorkflowWorkflowIdAndUserUserId(workflowId, userId);
        if (formStatus == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(formStatus);
    }

    // Get a specific FormStatus record by formID, workflowID, and userID
    // RequestParam: ?formId=1&workflowId=1&userId=2
    @GetMapping("formstatusByIds")
    public ResponseEntity<FormStatus> getFormStatusById(
            @RequestParam int formId, @RequestParam long workflowId, @RequestParam long userId) {

        FormStatus formStatus = formStatusRepository.findByFormFormIdAndWorkflowWorkflowIdAndUserUserId(formId, workflowId, userId);
        if (formStatus == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(formStatus);
    }

    // Get a FormStatus record by formID
    // RequestParam: ?formId=1
    @GetMapping("formstatusByFormId")
    public ResponseEntity<List<FormStatus>> getFormStatusByFormId(
            @RequestParam int formId) {

        List<FormStatus> formStatus = formStatusRepository.findByFormFormId(formId);
        if (formStatus.size() == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(formStatus);
    }

    // Get a FormStatus record by workflowID
    // RequestParam: ?workflowId=1
    @GetMapping("formstatusByWorkflowId")
    public ResponseEntity<List<FormStatus>> getFormStatusByWorkflowId(
            @RequestParam long workflowId) {

        List<FormStatus> formStatus = formStatusRepository.findByWorkflowWorkflowId(workflowId);
        if (formStatus.size() == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(formStatus);
    }

    // Get a FormStatus record by userID
    // RequestParam: ?userId=2
    @GetMapping("formstatusByUserId")
    public ResponseEntity<List<FormStatus>> getFormStatusByUserId(
            @RequestParam long userId) {

        List<FormStatus> formStatus = formStatusRepository.findByUserUserId(userId);

        if (formStatus == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(formStatus);
    }

    // create new form status
//    JSON format:
//    {
//        "form": {
//            "formId": 1
//        },
//        "user": {
//            "userId": 1
//        },
//        "workflow": {
//            "workflowId": 1
//        },
//        "evaluationStatus": "Rejected",
//        "rejectionPersonnel": 1,
//        "rejectionComments": "Anyhow"
//    }
    @PostMapping(path = "/formstatus")
    public ResponseEntity<String> createFormStatus(@RequestBody FormStatus formStatus) {
        try{
            int formId = formStatus.getForm().getFormId();
            long userId = formStatus.getUser().getUserId();
            long workflowId = formStatus.getWorkflow().getWorkflowId();

            FormStatus fs = formStatusRepository.findByFormFormIdAndWorkflowWorkflowIdAndUserUserId(formId, workflowId, userId);

            if(fs == null){
                FormTemplate formtemplate = (FormTemplate) formTemplateRepository.findById(formId).orElse(null);
                if (formtemplate != null) {
                    formStatus.setForm(formtemplate);
                } else {
                    return ResponseEntity.badRequest().body("Form with ID " + formId + " does not exist.");
                }

                Workflow workflow = (Workflow) workflowRepository.findById(workflowId).orElse(null);
                formStatus.setWorkflow(workflow);
                if (workflow != null) {
                    formStatus.setWorkflow(workflow);
                } else {
                    return ResponseEntity.badRequest().body("Workflow with ID " + workflowId + " does not exist.");
                }

                User user = (User) userRepository.findById(userId).orElse(null);
                if (user != null) {
                    formStatus.setUser(user);
                } else {
                    return ResponseEntity.badRequest().body("User with ID " + userId + " does not exist.");
                }
                formStatusRepository.save(formStatus);

            }
            else{
                // if already created, update the due date only
                fs.setEvaluationStatus(formStatus.getEvaluationStatus());
                fs.setDueDate(formStatus.getDueDate());
                formStatusRepository.save(fs);
            }

            return ResponseEntity.ok().body("Successfully created.");
        }
        catch(DataAccessException e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error creating form status.");

        }
    }

    // Update an existing FormStatus record
//     @RequestParam: ?formId=1&workflowId=1&userId=2
//     JSON:
//    {
//        "evaluationStatus": "Approved 3",
//        "rejectionPersonnel": 1,
//        "rejectionComments": null
//    }
    @PutMapping("/formstatus")
    public ResponseEntity<String> updateFormStatus(@RequestParam int formId,
                                                   @RequestParam long workflowId, @RequestParam long userId,
                                                   @RequestBody FormStatus formStatusDetails) throws ResourceNotFoundException {
        FormStatus formStatus = formStatusRepository.findByFormFormIdAndWorkflowWorkflowIdAndUserUserId(formId, workflowId, userId);
        if(formStatus!=null){
            // update evaluation status, rejection personnel, and rejection comments
            formStatus.setEvaluationStatus(formStatusDetails.getEvaluationStatus());
            formStatus.setRejectionPersonnel(formStatusDetails.getRejectionPersonnel());
            formStatus.setRejectionComments(formStatusDetails.getRejectionComments());
            formStatus.setDueDate(formStatusDetails.getDueDate());

            final FormStatus updatedFormStatus = formStatusRepository.save(formStatus);
            return ResponseEntity.ok().body("Successfully saved.");
        }
        else{
            return ResponseEntity.badRequest().body("Error saving form status.");
        }
    }

    // Delete a FormStatus record
    // @RequestParam: ?formId=1&workflowId=1&userId=2
    @DeleteMapping("/formstatus")
    public ResponseEntity<String> deleteFormStatus(
            @RequestParam int formId,
            @RequestParam long workflowId, @RequestParam long userId) {

        FormStatus formStatus = formStatusRepository.findByFormFormIdAndWorkflowWorkflowIdAndUserUserId(formId, workflowId, userId);
        if(formStatus != null) {
            formStatusRepository.delete(formStatus);
            return ResponseEntity.ok().body("Successfully deleted.");
        }
        else{
//            return ResponseEntity.badRequest().body("Error deleting form status.");
            return ResponseEntity.badRequest().body("Error deleting form status.");
        }

    }

    // @GetMapping(path = "/formstatus/completedforms")
    // public HashMap<String, ArrayList> getCompletedFormsByUserID(@RequestParam long userId){
    //     HashMap<String, ArrayList> completedForms = new HashMap<>();
    //     List<FormStatus> allForms = new ArrayList<>();

    //     allForms = formStatusRepository.findAll();

    //     for(FormStatus form: allForms){
    //         System.out.println(form.getForm().getFormId() + " " + form.getEvaluationStatus());

    //         String formStatus = form.getEvaluationStatus();
    //         long userID = form.getUser().getUserId();
    //         System.out.println(formStatus + " || " + userID);
    //         if(formStatus.equals("Approved") ){
    //             if(userID == userID){
    //                 ArrayList<HashMap> formInfo = new ArrayList<>();

    //                 HashMap<String, String> title = new HashMap<>();
    //                 HashMap<String, String> description = new HashMap<>();
    //                 HashMap<String, String> formNumber = new HashMap<>();

    //                 title.put("title", form.getForm().getTitle());
    //                 description.put("description", form.getForm().getDescription());
    //                 formNumber.put("formNumber", form.getForm().getFormNumber());
    //                 formInfo.add(title);
    //                 formInfo.add(description);
    //                 formInfo.add(formNumber);
    //                 completedForms.put(String.valueOf(form.getForm().getFormId()), formInfo);

    //             }

    //         }

    //     }

    //     return completedForms;
    // }

    @GetMapping(path = "/formstatus/completedforms")
    public List<HashMap> getCompletedFormsByUserID(@RequestParam long userId){
        
        HashMap<String, String> completedForms = new HashMap<>();
        List<HashMap> completedFormsList = new ArrayList<>();
        List<FormStatus> allForms = new ArrayList<>();

        allForms = formStatusRepository.findAll();

        ArrayList<Integer> checkFormID = new ArrayList<Integer>();

        for(FormStatus form: allForms){
            System.out.println(form.getForm().getFormId() + " " + form.getEvaluationStatus());
            String formStatus = form.getEvaluationStatus();
            long userID = form.getUser().getUserId();
            System.out.println(formStatus + " || " + userID);
            if(formStatus.equals("Approved") ){
                if(userID == userId){
                    Integer formId = form.getForm().getFormId();

                    if(!checkFormID.contains(formId)){
                        checkFormID.add(formId);
                        System.out.println(form.getWorkflow().getWorkflowId() + "VERIFYING");
                        // ArrayList<HashMap> formInfo = new ArrayList<>();

                        completedForms.put("FormId",String.valueOf(form.getForm().getFormId()));
                        completedForms.put("title", form.getForm().getTitle());
                        completedForms.put("description", form.getForm().getDescription());
                        completedForms.put("formNumber", form.getForm().getFormNumber());
                        completedFormsList.add(completedForms);
                        completedForms = new HashMap<>();
                }}

            }

        }

        return completedFormsList;
    }

//     @GetMapping(path = "/formstatus/questions")
//     public HashMap<String, ArrayList> getCompletedQuestionsByUserID(@RequestParam long userId , @RequestParam long formId){
//         HashMap<String, ArrayList> questionsResponse = new HashMap<>();
//         List<Response> allResponses = new ArrayList<>();

//         allResponses = responseRepository.findAll();

//         for(Response response: allResponses){

//             int formID = response.getQuestion().getFormID().getFormId();
//             long userID = response.getUserID().getUserId();
//             System.out.println(formID + " || " + userID);

//             if(formID == formId && userID == userId){
//                     int questionID = response.getQuestion().getQuestionID();
//                     Question question = questionRepository.findById(questionID).orElseThrow(() -> new ResourceNotFoundException("Question does not exist with id : " + questionID));

//                     String questionLabel = question.getLabel();
//                     String questionResponse = response.getAnswer();

//                     ArrayList<HashMap> qnInfo = new ArrayList<>();

//                     HashMap<String, String> label = new HashMap<>();
//                     HashMap<String, String> qnResponse = new HashMap<>();
// //                    HashMap<String, String> formNumber = new HashMap<>();


//                 label.put("question", questionLabel);
//                 qnResponse.put("response", questionResponse);
//                 qnInfo.add(label);
//                 qnInfo.add(qnResponse);

//                 questionsResponse.put(String.valueOf(questionID), qnInfo);



//             }

//         }

//         return questionsResponse;
//     }

@GetMapping(path = "/formstatus/questions")
    public List<HashMap> getCompletedQuestionsByUserID(@RequestParam long userId , @RequestParam long formId){
        HashMap<String, ArrayList> questionsResponse = new HashMap<>();
        List<HashMap> questionsInFormList = new ArrayList<>();

        List<Response> allResponses = new ArrayList<>();

        allResponses = responseRepository.findAll();

        for(Response response: allResponses){

            int formID = response.getQuestion().getFormID().getFormId();
            long userID = response.getUserID().getUserId();
            System.out.println(formID + " || " + formId + "|" + userID + " |" + userID);

            if(formID == formId && userID == userId){
                System.out.println("TEST");
                HashMap<String,Object> row = new HashMap<>();
                HashMap<String, String> qnResponse = new HashMap<>();

                    int questionID = response.getQuestion().getQuestionID();
                    Question question = questionRepository.findById(questionID).orElseThrow(() -> new ResourceNotFoundException("Question does not exist with id : " + questionID));
                    
                    String questionLabel = question.getLabel();
                    String questionResponse = response.getAnswer();

                    ArrayList<HashMap> qnInfo = new ArrayList<>();



                    qnResponse.put("question", questionLabel);
                    qnResponse.put("response", questionResponse);
                    row.put(String.valueOf(questionID),qnResponse);
                    row.put("User Id",String.valueOf(userID));
                    row.put("Form Id", String.valueOf(formID));
                    
                    questionsInFormList.add(row);







            }

        }

        return questionsInFormList;
    }


}