package ru.nsu.gemuev.backendjpa.testjpa;

import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

@Service
@Data
public class TestService {
    @Autowired
    private ARep aRep;

    @Autowired
    private BRep bRep;

    @Autowired
    public TestService(ARep a, BRep b){
        this.aRep = a;
        bRep = b;
    }

    @Transactional
    public void test1(){
        try {
            var a = aRep.findAll().iterator().next();
            System.out.println(a.getBSet());
            System.out.println(a);
            bRep.findAll().forEach(System.out::println);
        }
        catch (Throwable e){
            e.printStackTrace();
        }
    }
}
