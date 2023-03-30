package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.exception.ResourceNotFoundException;
import com.is442.springbootbackend.model.User;
import com.is442.springbootbackend.model.Vendor;
import com.is442.springbootbackend.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;

import com.is442.springbootbackend.repository.FormStatusRepository;
import com.is442.springbootbackend.model.Workflow;
import com.is442.springbootbackend.model.UserGroup;
import com.is442.springbootbackend.model.User;
import com.is442.springbootbackend.model.FormStatus;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;
import org.springframework.core.env.Environment;

import com.sendgrid.*;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.TimeUnit;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class VendorController {

    @Autowired
    private Environment env;
    @Autowired
    private VendorRepository vendorRepository;


    @Autowired
    private FormStatusRepository formStatusRepository;

    //get all vendors
    @GetMapping("/vendor")
    public List<Vendor> getAllVendors(){
        return vendorRepository.findAll();
    }

    //get vendor by id
    @GetMapping("/vendor/{id}")
    public ResponseEntity<Vendor> getVendorById(@PathVariable Long id){
        Vendor vendor = vendorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor does not exist with id: " + id));
        return ResponseEntity.ok(vendor);
    }

    //create new vendor
    @PostMapping("/vendor")
    public Vendor createVendor(@RequestBody Vendor vendor){
        return vendorRepository.save(vendor);
    }

    //update vendor by id
    @PutMapping("/vendor/{id}")
    public ResponseEntity<Vendor> updateVendor(@PathVariable Long id, @RequestBody Vendor vendorDetails) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor does not exist with id :" + id));

        vendor.setName(vendorDetails.getName());
        vendor.setEmail(vendorDetails.getEmail());
        vendor.setPhoneNo(vendorDetails.getPhoneNo());
        vendor.setPassword(vendorDetails.getPassword());
        vendor.setAddress(vendorDetails.getAddress());
        vendor.setIndustry(vendorDetails.getIndustry());

        Vendor updatedVendor = vendorRepository.save(vendor);
        return ResponseEntity.ok(updatedVendor);
    }

    //delete vendor by id
    @DeleteMapping("/vendor/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteVendor(@PathVariable Long id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor does not exist with id :" + id));

        vendorRepository.delete(vendor);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Vendor with id " + id + " has been deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    // send overdue emails
    @GetMapping("/sendOverdueEmails")
    public ResponseEntity<?> sendOverdueEmails() throws JobExecutionException{
        String apikey = env.getProperty("spring.sendgrid.apikey");
        System.out.println("Getting companies and email..");
        HashMap<String, HashMap<String, String>> vendorEmailList = getVendorsToEmail();
        for(String email: vendorEmailList.keySet()){
            String workflowTitle = vendorEmailList.get(email).get("workflowTitle");
            String vendorName = vendorEmailList.get(email).get("vendorName");

            String fromEmail = "jiayi.fok.2020@scis.smu.edu.sg";
            String subject = "Test form overdue email";

            System.out.println("Formatting email..");
            Mail mail = formatEmail(vendorName, workflowTitle,  fromEmail, subject, email);
            System.out.println("Emailing: " + email);

            SendGrid sg = new SendGrid(apikey);

            Request request = new Request();
            try {
                request.setMethod(Method.POST);
                request.setEndpoint("/mail/send");
                request.setBody(mail.build());
                Response response = sg.api(request);
                System.out.println(response.getStatusCode());
                System.out.println(response.getBody());
                System.out.println(response.getHeaders());
            } catch (IOException ex) {
                System.out.println("Email not sent to " + email);
                ex.printStackTrace();
                throw new JobExecutionException();
            }
        }
        return ResponseEntity.ok(vendorEmailList);
    }

    // method to retrieve list of vendors with overdue forms
//        {
//            "vendor@email.com":
//            {
//                "workflowTitle": "Vendor Evaluation Form",
//                "vendorName": "Company A"
//            }
//        }
    public HashMap<String, HashMap<String, String>> getVendorsToEmail(){
        HashMap<String, HashMap<String, String>> allVendorsToEmail = new HashMap<String, HashMap<String, String>>();

        // retrieve all vendor id, workflow id and due date from formStatusRepo
        List<FormStatus> formStatusList = formStatusRepository.findAll();
        for(FormStatus oneFS: formStatusList){
            if(oneFS.getEvaluationStatus().equals("Assigned")){
                Date today = new Date();
                Date dueDate = oneFS.getDueDate();
                if(getDaysBetween(dueDate, today) == 8 || getDaysBetween(dueDate, today) == 10 || getDaysBetween(dueDate, today) == 13 || getDaysBetween(dueDate, today) >= 20 ){
                    System.out.println("One form due");
                    HashMap<String, String> oneVendor = new HashMap<>();
                    User vendor = oneFS.getUser();
                    Workflow workflow = oneFS.getWorkflow();
                    oneVendor.put("workflowTitle", workflow.getTitle());
                    oneVendor.put("vendorName", vendor.getName());
                    System.out.println("vendorName:" + vendor.getName());
                    allVendorsToEmail.put(vendor.getEmail(), oneVendor);
                }

            }
        }
        return allVendorsToEmail;
    }


    // method to create Mail object
    public Mail formatEmail(String vendorName, String workflowTitle, String fromEmail, String subject, String toEmail){
        Email from = new Email(fromEmail);
        Email to = new Email(toEmail);
        String emailHtml = "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<title>Online HTML Editor</title>\n" +
                "<head>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <table border=0>\n" +
                "        <tr>\n" +
                "            <td style=\"padding:20px\">\n" +
                "                <img width=\"80\" alt=\"logo\" src=\"https://static.wixstatic.com/media/4ebc73_49f82740a16644d195b1ee67ff4899d3~mv2.png/v1/fill/w_135,h_122,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/circle-logo.png\">\n" +
                "            </td>\n" +
                "            <td>\n" +
                "                <p style=\"display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; font-weight:bold;\">QUANTUM LEAP INCORPORATION</p>\n" +
                "            </td>\n" +
                "        </tr>\n" +
                "    </table>" +
                "    <div style=\"background-color:#0079B3;padding:20px\">\n" +
                "        <p style=\"background-color:white;padding:2em\">\n" +
                "            Dear " + vendorName + ",\n" +
                "            <br><br>\n" +
                "            This is an email reminder that the deadline for filling out the form for <b>" + workflowTitle + "</b> has passed, and we have not yet received your submission.\n" +
                "            <br><br>\n" +
                "            Do complete the form as soon as possible through the portal and if you need any assistance or have any questions, please do not hesitate to contact us.\n" +
                "            <br><br>\n" +
                "            Thank you for your attention to this matter, and we look forward to receiving your completed form soon.\n" +
                "            <br><br>\n" +
                "            Best regards, \n" +
                "            <br>\n" +
                "            QLI\n" +
                "        </p>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";
        Content content = new Content("text/html", emailHtml);
        Mail mail = new Mail(from, subject, to, content);

        return mail;

    }

    public long getDaysBetween(Date startDate, Date endDate) {
        long diffInMillies = Math.abs(endDate.getTime() - startDate.getTime());
        long diffInDays = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
        return diffInDays;
    }



}
