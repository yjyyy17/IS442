package com.is442.springbootbackend;
import com.is442.springbootbackend.scheduledJobs.CheckAndSendEmail;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringbootBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootBackendApplication.class, args);

		// run check overdue job everytime the application runs
		CheckAndSendEmail.checkOverdueFormsAndSendEmail();

	}

}
