package ru.nsu.gemuev.backendjpa.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "sections")
@NoArgsConstructor
@Getter
@Setter
public class Section {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description", length = 100000)
    private String description;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "manager_id")
    private SectionManager sectionManager;

    @OneToMany(mappedBy = "section", cascade = CascadeType.PERSIST)
    private Set<SectionGroup> sectionGroup;

    @OneToMany(mappedBy = "section", cascade = CascadeType.PERSIST)
    private Set<Trainer> trainers;
}
