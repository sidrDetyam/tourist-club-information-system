package ru.nsu.gemuev.backendjpa.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ru.nsu.gemuev.backendjpa.security.entities.User;

import java.util.Set;

@Entity
@Table(name = "section_managers")
@NoArgsConstructor
@Getter
public class SectionManager extends User {

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "sectionManager")
    private Set<Section> sections;
}
