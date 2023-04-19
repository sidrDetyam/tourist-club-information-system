package ru.nsu.gemuev.backendjpa;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ru.nsu.gemuev.backendjpa.services.SectionsService;
import ru.nsu.gemuev.backendjpa.testjpa.A;
import ru.nsu.gemuev.backendjpa.testjpa.ARep;
import ru.nsu.gemuev.backendjpa.testjpa.B;
import ru.nsu.gemuev.backendjpa.testjpa.BRep;

@SpringBootTest
class BackendJpaApplicationTests {

    @Autowired
    private SectionsService sectionsService;

    @Test
    void delete() {
        var sections = sectionsService.getAllSectionsInfo();
        ObjectMapper objectMapper = new ObjectMapper();
        sections.forEach(s -> {
            try {
                System.out.println(objectMapper.writeValueAsString(s));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        });
    }
}
