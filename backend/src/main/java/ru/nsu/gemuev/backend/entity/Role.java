package ru.nsu.gemuev.backend.entity;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.security.core.GrantedAuthority;

@Table("roles")
@AllArgsConstructor
public class Role implements GrantedAuthority {
    @Id
    private Long id;

    @Column("role_name")
    private String roleName;

    @Override
    public @NonNull String getAuthority() {
        return roleName;
    }
}
