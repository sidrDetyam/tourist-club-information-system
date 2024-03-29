package ru.nsu.gemuev.backendjpa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.gemuev.backendjpa.domain.SectionGroup;

@Repository
public interface SectionGroupRepository extends CrudRepository<SectionGroup, Long> {
}
