package ru.nsu.gemuev.backendjpa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "trainers")
@Getter
@Setter
public class Trainer extends Tourist {

    @ManyToOne
    @JoinColumn(name = "trainer_category_id")
    private TrainerCategory trainerCategory;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "section_id")
    private Section section;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "trainer")
    private Set<SectionGroup> trainerSectionGroups;

}
