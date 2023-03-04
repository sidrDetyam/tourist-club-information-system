package ru.nsu.gemuev.backend.security.entities;

import lombok.NonNull;
import lombok.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.security.core.GrantedAuthority;

@Table("roles")
@Value
public class Role implements GrantedAuthority {
    @Id
    Long id;

    @Column("role_name")
    String roleName;

    @Override
    public @NonNull String getAuthority() {
        return roleName;
    }
}
