package ru.nsu.gemuev.backendjpa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "section_groups")
@NoArgsConstructor
@Getter
@Setter
public class SectionGroup {
    @Id
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "section_id")
    private Section section;
}
