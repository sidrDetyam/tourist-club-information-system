package ru.nsu.gemuev.backendjpa;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.jdbc.core.JdbcTemplate;
import ru.nsu.gemuev.backendjpa.entity.TouristCategory;
import ru.nsu.gemuev.backendjpa.entity.Trainer;
import ru.nsu.gemuev.backendjpa.repositories.TouristRepository;
import ru.nsu.gemuev.backendjpa.services.SectionsService;
import ru.nsu.gemuev.backendjpa.services.TrainerService;
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

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private TrainerService trainerService;

    @Test
    void delete() {

//        var cat = new TouristCategory(1L, null);
//
//        var list = touristRepository
//                .findAll(Specification
//                        .where(TouristRepository.equalSpec("firstName", "Егор"))
//                        .and(TouristRepository.equalSpec("lastName", "Чернов"))
//                        .and(TouristRepository.equalSpec("category", cat)))
//                .stream().toList();
//
//        System.out.println(list);

//        System.out.println(jdbcTemplate.queryForObject("select COUNT(*) from users u", Integer.class));

        trainerService.reduceToTourist(5);

//        touristRepository.findById(1L).orElseThrow();
    }
}
