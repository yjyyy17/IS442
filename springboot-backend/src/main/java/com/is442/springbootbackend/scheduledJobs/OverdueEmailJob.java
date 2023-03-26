package com.is442.springbootbackend.scheduledJobs;
import com.is442.springbootbackend.scheduledJobs.CheckAndSendEmail;

import java.io.IOException;
import java.net.URISyntaxException;
import org.springframework.beans.factory.annotation.Autowired;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;


@Component
public class OverdueEmailJob implements Job {

//    private String apikey;
//    private final String apikey = "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";
//   @Value("${app.sendgrid.apikey}")
//   private String apikey;
    @Autowired
    private CheckAndSendEmail checkAndSendEmail;

    public void execute(JobExecutionContext arg0) throws JobExecutionException {
        try {
            // create a request
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("http://localhost:8080/api/sendOverdueEmails"))
                    .GET()
                    .build();

            HttpResponse<String> response = HttpClient.newHttpClient()
                    .send(request, HttpResponse.BodyHandlers.ofString());
            // the response:
            System.out.println(response.body());
        } catch (URISyntaxException ue) {
            System.out.println("java.net.URISyntaxException error");
        } catch (IOException io) {
            System.out.println("java.io.IOException error");
        } catch (Exception e) {
            System.out.println("Exception occurred");
        }
    }
}