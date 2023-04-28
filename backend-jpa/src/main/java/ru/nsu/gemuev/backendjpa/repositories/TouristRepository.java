package ru.nsu.gemuev.backendjpa.repositories;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import ru.nsu.gemuev.backendjpa.entity.Tourist;

import java.util.Optional;

@Repository
public interface TouristRepository extends CrudRepository<Tourist, Long>, JpaSpecificationExecutor<Tourist> {
    Optional<Tourist> findByUsername(@NonNull String username);


    static @NonNull Specification<Tourist> equalSpec(@NonNull String fieldName,
                                                     @NonNull Object value) {
        return (book, cq, cb) -> cb.equal(book.get(fieldName), value);
    }
}
