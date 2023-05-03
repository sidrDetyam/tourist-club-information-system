package ru.nsu.gemuev.backendjpa.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "hike_diary_records")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class HikeDiaryRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(optional = false, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "hike_id")
    private Hike hike;

    @Column(name = "record")
    private String record;

    @Column(name = "time_stamp")
    private Timestamp timestamp;
}
