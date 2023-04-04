package ru.nsu.gemuev.backendjpa.testjpa;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BRep extends CrudRepository<B, Long> {
}
