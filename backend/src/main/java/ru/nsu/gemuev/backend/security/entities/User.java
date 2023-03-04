package ru.nsu.gemuev.backend.security.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Set;

@Table("users")
@Data
@Builder(toBuilder = true)
public class User {
    @Id
    private Long id;

    @Column("username")
    private String username;

    @Column("password")
    private String password;

    @Column("refresh_token")
    private String refreshToken;

    @MappedCollection(idColumn = "user_id", keyColumn = "role_id")
    private Set<RoleRef> rolesId;
}
