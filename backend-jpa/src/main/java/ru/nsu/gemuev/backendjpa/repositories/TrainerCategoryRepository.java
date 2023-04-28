package ru.nsu.gemuev.backendjpa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.gemuev.backendjpa.entity.TrainerCategory;

@Repository
public interface TrainerCategoryRepository extends CrudRepository<TrainerCategory, Long> {
}
