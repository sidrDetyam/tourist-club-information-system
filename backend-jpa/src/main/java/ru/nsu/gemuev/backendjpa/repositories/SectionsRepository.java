package ru.nsu.gemuev.backendjpa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.gemuev.backendjpa.domain.Section;

@Repository
public interface SectionsRepository extends CrudRepository<Section, Long> {
}
