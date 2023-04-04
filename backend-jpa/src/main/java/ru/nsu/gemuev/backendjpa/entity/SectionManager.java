package ru.nsu.gemuev.backendjpa.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ru.nsu.gemuev.backendjpa.security.entities.User;

@Entity
@Table(name = "section_managers")
@NoArgsConstructor
@Getter
public class SectionManager extends User {

    @OneToOne
    @JoinColumn(name = "section_id")
    private Section section;
}
