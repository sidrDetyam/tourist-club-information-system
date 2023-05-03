package ru.nsu.gemuev.backendjpa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.gemuev.backendjpa.domain.Hike;

@Repository
public interface HikeRepository extends CrudRepository<Hike, Long> {
}
