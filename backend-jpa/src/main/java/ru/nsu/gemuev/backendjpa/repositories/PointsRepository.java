package ru.nsu.gemuev.backendjpa.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.gemuev.backendjpa.domain.ControlPoint;

import java.util.List;

@Repository
public interface PointsRepository extends CrudRepository<ControlPoint, Long> {

    @Query("select distinct cp from ControlPoint cp join Route r where r.id=:id")
    List<ControlPoint> findControlPointsByRoute(long id);
}
