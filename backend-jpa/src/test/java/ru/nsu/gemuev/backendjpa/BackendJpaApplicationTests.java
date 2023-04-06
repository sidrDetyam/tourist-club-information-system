package ru.nsu.gemuev.backendjpa;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ru.nsu.gemuev.backendjpa.testjpa.A;
import ru.nsu.gemuev.backendjpa.testjpa.ARep;
import ru.nsu.gemuev.backendjpa.testjpa.B;
import ru.nsu.gemuev.backendjpa.testjpa.BRep;

@SpringBootTest
class BackendJpaApplicationTests {

    @Autowired
    private ARep aRep;
    @Autowired
    private BRep bRep;

    @Test
    void init() {
        A a = new A();
        //aRep.save(a);

        B b = new B();
        b.setA(a);

        bRep.save(b);
    }

    @Test
    void delete() {
        var a = aRep.findAll().iterator().next();
        System.out.println(a.getBSet());
    }
}
