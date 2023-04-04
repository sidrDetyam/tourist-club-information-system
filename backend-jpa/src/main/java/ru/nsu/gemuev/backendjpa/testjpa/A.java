package ru.nsu.gemuev.backendjpa.testjpa;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.Set;

@Entity
@Table(name = "a")
@NoArgsConstructor
@Data
public class A {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @OneToMany(mappedBy = "a", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<B> bSet;
}
