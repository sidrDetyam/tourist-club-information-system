package ru.nsu.gemuev.backendjpa.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "control_points")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ControlPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "point")
    private String point;

    @ManyToMany(mappedBy = "points")
    private Set<Route> hikes;
}
