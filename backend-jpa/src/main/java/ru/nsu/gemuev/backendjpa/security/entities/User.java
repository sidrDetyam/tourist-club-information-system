package ru.nsu.gemuev.backendjpa.security.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity(name = "users")
@Data
@NoArgsConstructor
public class User {
    @Id
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "refresh_token")
    private String refreshToken;

    @ManyToMany
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;
}
