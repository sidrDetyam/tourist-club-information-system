package ru.nsu.gemuev.backendjpa.repositories;

import lombok.NonNull;
import org.springframework.data.repository.CrudRepository;
import ru.nsu.gemuev.backendjpa.entity.TouristCategory;

@NonNull
public interface TouristCategoryRepository extends CrudRepository<TouristCategory, Long> {
}
