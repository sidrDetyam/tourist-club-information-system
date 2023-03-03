package ru.nsu.gemuev.backend.repositories;

import lombok.NonNull;
import org.springframework.data.repository.CrudRepository;
import ru.nsu.gemuev.backend.entity.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> getByUsername(@NonNull String username);
}
