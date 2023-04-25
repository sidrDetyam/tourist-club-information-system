package ru.nsu.gemuev.backendjpa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.gemuev.backendjpa.entity.Trainer;

import java.util.List;

@Repository
public interface TrainersRepository extends CrudRepository<Trainer, Long> {
    List<Trainer> findAllBySectionId(Long id);
}
