package ru.nsu.gemuev.backendjpa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.nsu.gemuev.backendjpa.security.entities.User;

import java.util.Set;

@Entity
@Table(name = "tourists")
@NoArgsConstructor
@Getter
@Setter
public class Tourist extends User {

    @ManyToOne
    @JoinColumn(name = "category_id")
    private TouristCategory category;

    @ManyToMany
    @JoinTable(name = "tourists_section_groups",
            joinColumns = @JoinColumn(name = "tourist_id"),
            inverseJoinColumns = @JoinColumn(name = "section_group_id"))
    private Set<SectionGroup> sectionGroups;

    @ManyToMany
    @JoinTable(name = "tourists_hikes",
            joinColumns = @JoinColumn(name = "tourist_id"),
            inverseJoinColumns = @JoinColumn(name = "hike_id"))
    private Set<Hike> hikes;
}
