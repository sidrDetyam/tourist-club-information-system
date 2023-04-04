package ru.nsu.gemuev.backendjpa.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "sections")
@NoArgsConstructor
@Data
public class Section {
    @Id
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToOne(mappedBy = "section", cascade = CascadeType.ALL, orphanRemoval = true)
    private SectionManager sectionManager;

    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<SectionGroup> sectionGroup;
}
