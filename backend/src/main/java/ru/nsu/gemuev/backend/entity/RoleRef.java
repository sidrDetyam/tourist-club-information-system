package ru.nsu.gemuev.backend.entity;

import lombok.Data;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("users_roles")
@Data
public class RoleRef {
    @Column("role_id")
    private Long role;
}
