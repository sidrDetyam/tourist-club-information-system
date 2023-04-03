package ru.nsu.gemuev.backendjpa.repositories;

import lombok.NonNull;
import org.springframework.data.repository.CrudRepository;
import ru.nsu.gemuev.backendjpa.security.entities.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> getByUsername(@NonNull String username);
}
