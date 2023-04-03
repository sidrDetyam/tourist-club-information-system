package ru.nsu.gemuev.backendjpa.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ru.nsu.gemuev.backendjpa.security.entities.User;

import java.util.Set;

@Entity
@Table(name = "tourists")
@NoArgsConstructor
@Getter
public class Toutist extends User {

    @ManyToMany
    @JoinTable(name = "tourists_section_groups",
            joinColumns = @JoinColumn(name = "tourist_id"),
            inverseJoinColumns = @JoinColumn(name = "section_group_id"))
    private Set<SectionGroup> sectionGroups;
}
