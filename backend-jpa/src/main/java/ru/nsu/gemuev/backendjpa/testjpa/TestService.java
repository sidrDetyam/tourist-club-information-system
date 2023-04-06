package ru.nsu.gemuev.backendjpa.testjpa;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.stream.StreamSupport;

//@Service
@Data
public class TestService {

    //@Autowired
    private ARep aRep;

    //@Autowired
    private BRep bRep;

    @PersistenceContext
    private EntityManager manager;

    @Transactional
    public void test1(){
        try {
            //var as = StreamSupport.stream(aRep.findAll().spliterator(), false).toList();
            //as.get(0).getBSet().clear();
            //aRep.deleteAll();

            //System.out.println(a);

            B b = new B();

            A a = new A();
            a.setFoo("создано с помощью b");
            b.setA(a);
            manager.persist(b);
            manager.flush();
            manager.refresh(a);

            //manager.remove(a);
            //manager.remove(b);
            manager.flush();

            System.out.println(a.getBSet());
            System.out.println(b.getA());
//            System.out.println(a);
//            aRep.findAll().forEach(System.out::println);
//            bRep.findAll().forEach(System.out::println);
        }
        catch (Throwable e){
            e.printStackTrace();
        }
    }
}
