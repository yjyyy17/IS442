package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.model.Response;
import com.is442.springbootbackend.model.User;
import com.is442.springbootbackend.repository.QuestionRepository;
import com.is442.springbootbackend.repository.ResponseRepository;
import com.is442.springbootbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.annotation.Repeatable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/response")
public class ResponseController {

    @Autowired
    private ResponseRepository responseRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping(path = "/getresponse")
    public List<Response> getResponseForUser(@RequestBody Response response) throws NullPointerException {

        long userID = response.getUserID().getUserId();
//        System.out.println(userID + "userid");
        long questionID = response.getQuestion().getQuestionID();
//        System.out.println(questionID + "questionid");
        long formID = response.getQuestion().getFormID().getFormId();

        List<Response> reponses = responseRepository.findAll();
        List<Response> filteredResponse = new ArrayList<>();

        Iterator<Response> responseIterator = reponses.iterator();
//        System.out.println("HERE");
        while(responseIterator.hasNext()){
            Response responseIterated = responseIterator.next();
            long userIDIterator = responseIterated.getUserID().getUserId();
            System.out.println("new" + userIDIterator);
            long questionIDIterator = responseIterated.getQuestion().getQuestionID();
            System.out.println("THIS IS THW QUESTION ID" + questionIDIterator);
            long formIDIterator = responseIterated.getQuestion().getFormID().getFormId();;
            System.out.println(formIDIterator + " FORMITERATOR");

            if (userIDIterator == userID && questionIDIterator == questionID && formIDIterator == formID){
                filteredResponse.add(responseIterated);
                System.out.println("ADDED " + userIDIterator + " " + questionIDIterator + " " + formIDIterator);
            }

            else {
                System.out.println("There is an issue" + questionIDIterator + formIDIterator + userIDIterator + questionID + formID + userID);
            }
        }

        System.out.println(reponses);
        System.out.println(response.getUserID().getUserId());
        System.out.println(questionID + " " + formID);

        return filteredResponse;
    }

    @PostMapping(path = "/add")
    public ResponseEntity<?> addResponses(@RequestBody List<Response> responses){

        Iterator<Response> interateResponses = responses.iterator();
        User user = null;
        boolean completionStatus = false;
        while(interateResponses.hasNext()){
            Response response = interateResponses.next();
            //check if valid formID exists
            int formid = response.getQuestion().getFormID().getFormId();
            boolean formiDExists = responseRepository.existsById(formid);

            //check if valid questionID exists
            int questionID = response.getQuestion().getQuestionID();
            boolean questionIDExists = responseRepository.existsById(questionID);

            if (formiDExists == false ){
                return ResponseEntity.badRequest().body("FormID " + formid +" not exist ");

            } else if (questionIDExists == false){
                return ResponseEntity.badRequest().body("QuestionID " + questionID + " does not exist ");
            }
            System.out.println(response.getAnswer());
            if (response.getUserID() != null)
            {
                 user = response.getUserID();

                 responseRepository.save(response);
                 completionStatus = true;

            } else{
                Response rs = new Response();
                rs.setUserID(user);
                rs.setAnswer(response.getAnswer());
                rs.setStatus(response.getStatus());
                rs.setQuestion(response.getQuestion());
                responseRepository.save(rs);
                completionStatus = true;


            }

//            System.out.println("form " + formiDExists + "question " + questionIDExists);


        }
        if(completionStatus == true){
            return ResponseEntity.ok().body("Added");
        } else {
            return ResponseEntity.badRequest().body("Unable to add");
        }

    }

    @PutMapping("/update")
    public ResponseEntity<?> updateResponses( @RequestBody List<Response> responses) {

        Iterator<Response> interateResponses = responses.iterator();
        User user = null;
        int responseID = 0;
        boolean completionStatus = false;
        while (interateResponses.hasNext()) {
            Response response = interateResponses.next();
            responseID = response.getResponseID();
//            System.out.println(responseID + "GOING HERE ");
            if (response.getUserID() != null)
            {
                user = response.getUserID();
                responseRepository.save(response);

            }
            if (responseRepository.existsById(responseID)){
                System.out.println("exists");

                Response selectedResponse = responseRepository.getById(responseID);

                selectedResponse.setUserID(user);
                selectedResponse.setAnswer(response.getAnswer());
                selectedResponse.setStatus(response.getStatus());
                selectedResponse.setQuestion(response.getQuestion());
                responseRepository.save(selectedResponse);


            } else {
                return ResponseEntity.badRequest().body("Unable to update responseID " + responseID + " not found");
            }
        }

        return ResponseEntity.ok().body("Updated");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteResponses(Response deleteResponses){

        int formId = deleteResponses.getQuestion().getFormID().getFormId();
        long userId = deleteResponses.getUserID().getUserId();

        List<Response> allResponses = responseRepository.findAll();

        Iterator<Response> response = allResponses.iterator();

        while (response.hasNext()){
            Response iteratedResponse = response.next();

            if(iteratedResponse.getUserID().getUserId() == userId && iteratedResponse.getQuestion().getFormID().getFormId() == formId){
                iteratedResponse.setStatus("Inactive");
                responseRepository.save(iteratedResponse);
            }
        }
        return ResponseEntity.ok().body("Updated");
    }
}
