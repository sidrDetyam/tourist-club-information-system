package ru.nsu.gemuev.backend.repositories;

import lombok.NonNull;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import ru.nsu.gemuev.backend.security.entities.Role;

import java.util.Set;

public interface RoleRepository extends CrudRepository<Role, Long> {
    @Query("select r.* from roles r join users_roles ur on r.id = ur.role_id where ur.user_id = :user_id")
    @NonNull Set<Role> findRolesByUserId(@NonNull @Param("user_id") Long userId);
}
