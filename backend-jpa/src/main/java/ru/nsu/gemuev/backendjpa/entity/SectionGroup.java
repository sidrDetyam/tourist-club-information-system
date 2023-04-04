package ru.nsu.gemuev.backendjpa.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "section_groups")
@NoArgsConstructor
@Data
public class SectionGroup {
    @Id
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "section_id")
    private Section section;
}
