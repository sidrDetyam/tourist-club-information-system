package ru.nsu.gemuev.backendjpa.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "routes")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "category_id")
    private TouristCategory category;

    @Column(name = "description")
    private String description;

    @ManyToMany
    @JoinTable(name = "routes_control_points",
            joinColumns = @JoinColumn(name = "route_id"),
            inverseJoinColumns = @JoinColumn(name = "point_id"))
    private Set<ControlPoint> points;

    @OneToMany(mappedBy = "route", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Hike> hikes;
}
