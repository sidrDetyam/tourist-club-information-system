package ru.nsu.gemuev.backendjpa.testjpa;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ARep extends CrudRepository<A, Long> {
}
