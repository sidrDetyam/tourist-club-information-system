package ru.nsu.gemuev.backendjpa.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.Set;

@Entity
@Table(name = "trainers")
@Getter
public class Trainer extends Toutist{

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "section_id")
    private Section section;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "trainers_section_groups",
            joinColumns = @JoinColumn(name = "trainer_id"),
            inverseJoinColumns = @JoinColumn(name = "section_group_id"))
    private Set<SectionGroup> trainerSectionGroups;

}
