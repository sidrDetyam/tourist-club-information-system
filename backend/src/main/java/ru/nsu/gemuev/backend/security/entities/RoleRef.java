package ru.nsu.gemuev.backend.security.entities;

import lombok.Value;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("users_roles")
@Value
public class RoleRef {
    @Column("role_id")
    Long role;
}
