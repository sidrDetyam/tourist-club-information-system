package ru.nsu.gemuev.backendjpa.testjpa;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

@Service
public class BruhService {
    private final TestService testService;

    private ScheduledExecutorService scheduledExecutorService = new ScheduledThreadPoolExecutor(1);

    public BruhService(TestService testService){
        this.testService = testService;
        scheduledExecutorService.schedule(testService::test1, 1000, TimeUnit.MILLISECONDS);
    }
}
