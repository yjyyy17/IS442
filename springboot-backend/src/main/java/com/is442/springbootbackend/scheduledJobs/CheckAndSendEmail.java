package com.is442.springbootbackend.scheduledJobs;
import com.is442.springbootbackend.scheduledJobs.OverdueEmailJob;

import java.util.List;

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


public class CheckAndSendEmail{

    //		--- scheduled job to send overdue forms email ---
    public static void checkOverdueFormsAndSendEmail(){

        SchedulerFactory schedFact = new StdSchedulerFactory();
        try {

            Scheduler sched = schedFact.getScheduler();
            JobDetail overdueEmailJob = JobBuilder.newJob(OverdueEmailJob.class).withIdentity("overdueEmailJob", "group2").build();
            // CronTrigger
            Trigger triggerA = TriggerBuilder
                    .newTrigger()
                    .withIdentity("triggerA", "group2")
                    .withSchedule(
                            CronScheduleBuilder.cronSchedule("0 09 18 * * ?")) // trigger at 4pm everyday ; sec min hour dayofmonth month dayofweek year(optional)
                    .build();

            sched.scheduleJob(overdueEmailJob, triggerA);
            sched.start();

        } catch (SchedulerException e) {
            e.printStackTrace();
        }

    }
}