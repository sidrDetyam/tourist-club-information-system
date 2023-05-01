package ru.nsu.gemuev.backendjpa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "schedule")
@NoArgsConstructor
@Getter
@Setter
public class ScheduleItem {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "day")
    private Long day;

    @Column(name = "time_")
    private LocalTime time;

    @Column(name = "place")
    private String place;

    @Column(name = "type")
    private String type;

    @ManyToOne(optional = false, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "section_group_id")
    private SectionGroup sectionGroup;
}
