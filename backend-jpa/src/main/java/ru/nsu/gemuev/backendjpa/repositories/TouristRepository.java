package ru.nsu.gemuev.backendjpa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import ru.nsu.gemuev.backendjpa.entity.Toutist;

import java.util.Optional;

@Repository
public interface TouristRepository extends CrudRepository<Toutist, Long> {
    Optional<Toutist> findByUsername(@NonNull String username);
}
