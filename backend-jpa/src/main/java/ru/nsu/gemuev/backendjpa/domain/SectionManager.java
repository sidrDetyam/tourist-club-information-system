package ru.nsu.gemuev.backendjpa.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ru.nsu.gemuev.backendjpa.security.entities.User;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "section_managers")
@NoArgsConstructor
@Getter
public class SectionManager extends User {

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "sectionManager")
    private Set<Section> sections;

    @Column(name = "hired_date")
    private LocalDate hiredDate;
}
