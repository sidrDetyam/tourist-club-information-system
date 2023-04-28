package ru.nsu.gemuev.backendjpa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hikes")
@NoArgsConstructor
@Getter
public class Hikes {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

}
