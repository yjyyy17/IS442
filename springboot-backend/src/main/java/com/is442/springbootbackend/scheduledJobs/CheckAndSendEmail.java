package com.is442.springbootbackend.scheduledJobs;
import com.is442.springbootbackend.scheduledJobs.OverdueEmailJob;

import com.is442.springbootbackend.repository.UserGroup_WorkflowsRepository;
import com.is442.springbootbackend.repository.FormStatusRepository;
import com.is442.springbootbackend.controller.UserGroupController;
//import com.is442.springbootbackend.controller.FormStatusController;
import com.is442.springbootbackend.model.UserGroup_Workflows;
import com.is442.springbootbackend.model.Workflow;
import com.is442.springbootbackend.model.UserGroup;
import com.is442.springbootbackend.model.User;
import com.is442.springbootbackend.model.FormStatus;

import java.util.List;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;
import org.quartz.CronScheduleBuilder;

@Component
public class CheckAndSendEmail{

    @Value("${app.sendgrid.apikey}")
    private static String apikey;


    //		--- scheduled job to send overdue forms email ---
    public static void checkOverdueFormsAndSendEmail(){

//        allVendors = userGroup_WorkflowsRepository.findAll();

        SchedulerFactory schedFact = new StdSchedulerFactory();
        try {

            Scheduler sched = schedFact.getScheduler();
            JobDetail overdueEmailJob = JobBuilder.newJob(OverdueEmailJob.class).withIdentity("overdueEmailJob", "group2").build();
            // CronTrigger
            Trigger triggerA = TriggerBuilder
                    .newTrigger()
                    .withIdentity("triggerA", "group2")
                    .withSchedule(
                            CronScheduleBuilder.cronSchedule("0 0 10 * * ?")) // trigger at 10am everyday ; sec min hour dayofmonth month dayofweek year(optional) ; change 10 to "0/1" to send every minute
                    .build();

            sched.scheduleJob(overdueEmailJob, triggerA);
            sched.start();

        } catch (SchedulerException e) {
            e.printStackTrace();
        }

    }

    public static String getApikey(){
        return apikey;
    }
//    public static List<UserGroup_Workflows> getFromUserGroup_WorkflowRepository(){
//        return allVendors;
//    }
}