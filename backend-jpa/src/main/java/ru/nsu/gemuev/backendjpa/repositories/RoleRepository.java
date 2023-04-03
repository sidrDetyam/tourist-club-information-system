package ru.nsu.gemuev.backendjpa.repositories;

import lombok.NonNull;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import ru.nsu.gemuev.backendjpa.security.entities.Role;

import java.util.Set;

public interface RoleRepository extends CrudRepository<Role, Long> {
    @Query(value = "select r.* from roles r join users_roles ur on r.id = ur.role_id where ur.user_id = :user_id", nativeQuery = true)
    @NonNull Set<Role> findRolesByUserId(@NonNull @Param("user_id") Long userId);
}
