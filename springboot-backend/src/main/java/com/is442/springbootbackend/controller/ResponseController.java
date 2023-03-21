package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.model.Response;
import com.is442.springbootbackend.repository.QuestionRepository;
import com.is442.springbootbackend.repository.ResponseRepository;
import com.is442.springbootbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        long questionID = response.getQuestion().getQuestionID();
        long formID = response.getQuestion().getFormID().getFormId();

        List<Response> reponses = responseRepository.findAll();
        List<Response> filteredResponse = new ArrayList<>();

        Iterator<Response> responseIterator = reponses.iterator();

        while(responseIterator.hasNext()){
            Response responseIterated = responseIterator.next();
            long userIDIterator = responseIterated.getUserID().getUserId();
            long questionIDIterator = responseIterated.getQuestion().getQuestionID();
            long formIDIterator = responseIterated.getQuestion().getFormID().getFormId();;


            if (userIDIterator == userID && questionIDIterator == questionID && formIDIterator == formID){
                filteredResponse.add(responseIterated);
            }
        }

        System.out.println(reponses);
        System.out.println(response.getUserID().getUserId());
        System.out.println(questionID + " " + formID);

        return filteredResponse;
    }
}
