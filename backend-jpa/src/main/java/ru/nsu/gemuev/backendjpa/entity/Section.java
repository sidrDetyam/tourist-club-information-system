package ru.nsu.gemuev.backendjpa.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sections")
@NoArgsConstructor
@Data
public class Section {
    @Id
    private Long id;

    @Column(name = "name")
    private String name;
}
