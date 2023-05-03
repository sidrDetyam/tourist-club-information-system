package ru.nsu.gemuev.backendjpa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.gemuev.backendjpa.domain.TouristCategory;

import java.util.Optional;

@Repository
public interface TouristCategoryRepository extends CrudRepository<TouristCategory, Long> {
    Optional<TouristCategory> getTouristCategoryByValue(String value);
}
