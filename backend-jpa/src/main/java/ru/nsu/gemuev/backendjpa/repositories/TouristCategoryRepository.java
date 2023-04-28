package ru.nsu.gemuev.backendjpa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.gemuev.backendjpa.entity.TouristCategory;

@Repository
public interface TouristCategoryRepository extends CrudRepository<TouristCategory, Long> {
}
