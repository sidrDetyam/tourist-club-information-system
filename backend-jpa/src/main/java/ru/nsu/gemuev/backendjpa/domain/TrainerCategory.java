package ru.nsu.gemuev.backendjpa.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "trainer_categories")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TrainerCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "value")
    private String value;
}

