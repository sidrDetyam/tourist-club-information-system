package ru.nsu.gemuev.backendjpa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ru.nsu.gemuev.backendjpa.security.entities.User;

import java.util.Set;

@Entity
@Table(name = "tourists")
@NoArgsConstructor
@Getter
public class Tourist extends User {

    @ManyToOne
    @JoinColumn(name = "category_id")
    private TouristCategory category;

    @ManyToMany
    @JoinTable(name = "tourists_section_groups",
            joinColumns = @JoinColumn(name = "tourist_id"),
            inverseJoinColumns = @JoinColumn(name = "section_group_id"))
    private Set<SectionGroup> sectionGroups;
}