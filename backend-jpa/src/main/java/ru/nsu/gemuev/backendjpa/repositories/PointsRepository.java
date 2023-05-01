package ru.nsu.gemuev.backendjpa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.gemuev.backendjpa.entity.ControlPoint;

@Repository
public interface PointsRepository extends CrudRepository<ControlPoint, Long> {
}
