package ru.nsu.gemuev.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Set;

@Table("users")
@Getter
@Setter
@AllArgsConstructor
public class User {
    @Id
    private Long id;

    @Column("username")
    private String username;

    @Column("password")
    private String password;

    @MappedCollection(idColumn = "user_id", keyColumn = "role_id")
    private Set<RoleRef> rolesId;
}
