package ru.nsu.gemuev.backendjpa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "section_groups")
@NoArgsConstructor
@Getter
@Setter
public class SectionGroup {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne(optional = false, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "section_id")
    private Section section;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;

    @ManyToMany(mappedBy = "sectionGroups", cascade = CascadeType.ALL)
    private Set<Tourist> tourists;

    @OneToMany(mappedBy = "sectionGroup", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ScheduleItem> scheduleItems;
}
