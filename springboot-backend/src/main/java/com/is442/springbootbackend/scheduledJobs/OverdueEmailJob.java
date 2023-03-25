package com.is442.springbootbackend.scheduledJobs;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.sendgrid.*;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.util.*;


public class OverdueEmailJob implements Job {

//    private String apikey;
//    private final String apikey = "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";
   @Value("${app.sendgrid.apikey}")
   private String apikey;

    public Mail formatEmail(String companyName, String formName, String fromEmail, String subject, String toEmail){
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
                "            Dear " + companyName + ",\n" +
                "            <br><br>\n" +
                "            This is an email reminder that the deadline for filling out the " + formName + " form has passed, and we have not yet received your submission.\n" +
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

    public void execute(JobExecutionContext arg0) throws JobExecutionException {
        /* todo:
        *  1. get list of usergroupIds with forms that have expired (add deadline to the usergroup_workflow table)
        *  2. for each usergroupid:
        *       - get vendor details: email, name
        *       - form name
        *  3. format and send email
        * */

        System.out.println("Getting companies and email..");

        HashMap<String, String> recipients = new HashMap<String, String>();
//        recipients.put("fokjiayi@gmail.com", "Company A");
        recipients.put("jiatotheyi@gmail.com", "Company B");

        for(String email: recipients.keySet()){
            String comName = recipients.get(email);

            String formName = "New Vendor Form";
            String fromEmail = "jiayi.fok.2020@scis.smu.edu.sg";
            String subject = "Test form overdue email";


            System.out.println("Formatting email..");

            Mail mail = formatEmail(comName, formName,  fromEmail, subject, email);

            System.out.println("Emailing: " + email);
            System.out.println(apikey);

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

    }

}