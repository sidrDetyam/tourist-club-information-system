package ru.nsu.gemuev.backendjpa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.gemuev.backendjpa.domain.Route;

@Repository
public interface RoutesRepository extends CrudRepository<Route, Long> {
}
