package ru.nsu.gemuev.backendjpa.repositories;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.gemuev.backendjpa.domain.Trainer;

import java.util.List;

@Repository
public interface TrainersRepository extends CrudRepository<Trainer, Long>, JpaSpecificationExecutor<Trainer> {
    List<Trainer> findAllBySectionId(Long id);
}
