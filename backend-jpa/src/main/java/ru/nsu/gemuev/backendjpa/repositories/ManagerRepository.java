package ru.nsu.gemuev.backendjpa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.gemuev.backendjpa.entity.SectionManager;

import java.util.Optional;

@Repository
public interface ManagerRepository extends CrudRepository<SectionManager, Long> {
    Optional<SectionManager> findByUsername(String username);
}
