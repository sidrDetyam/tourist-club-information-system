package ru.nsu.gemuev.backendjpa.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "competitions")
@NoArgsConstructor
@Getter
public class Competition {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
}
