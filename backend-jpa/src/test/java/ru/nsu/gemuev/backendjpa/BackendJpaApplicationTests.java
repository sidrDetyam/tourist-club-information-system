package ru.nsu.gemuev.backendjpa;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.domain.Specification;
import ru.nsu.gemuev.backendjpa.entity.TouristCategory;
import ru.nsu.gemuev.backendjpa.repositories.TouristRepository;
import ru.nsu.gemuev.backendjpa.services.SectionsService;
import ru.nsu.gemuev.backendjpa.testjpa.A;
import ru.nsu.gemuev.backendjpa.testjpa.ARep;
import ru.nsu.gemuev.backendjpa.testjpa.B;
import ru.nsu.gemuev.backendjpa.testjpa.BRep;

@SpringBootTest
class BackendJpaApplicationTests {

    @Autowired
    private SectionsService sectionsService;

    @Autowired
    private TouristRepository touristRepository;

    @Test
    void delete() {

        var cat = new TouristCategory(1L, null);

        var list = touristRepository
                .findAll(Specification
                        .where(TouristRepository.equalSpec("firstName", "Егор"))
                        .and(TouristRepository.equalSpec("lastName", "Чернов"))
                        .and(TouristRepository.equalSpec("category", cat)))
                .stream().toList();

        System.out.println(list);
    }
}
