package ru.nsu.gemuev.backendjpa.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Set;

@Entity
@Table(name = "hikes")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Hike {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;

    @ManyToMany(mappedBy = "hikes", cascade = CascadeType.ALL)
    private Set<Tourist> tourists;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "route_id")
    private Route route;

    @OneToMany(mappedBy = "hike", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<HikeDiaryRecord> diaryRecords;

    @Column(name = "description")
    private String description;

    @Column(name = "name")
    private String name;

    @Column(name = "start_")
    private Timestamp start;

    @Column(name = "end_")
    private Timestamp end;
}
