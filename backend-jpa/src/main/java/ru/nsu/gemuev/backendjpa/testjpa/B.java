package ru.nsu.gemuev.backendjpa.testjpa;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Service;

@Entity
@Table(name = "b")
@NoArgsConstructor
@Getter
@Setter
//@ToString(of = "id")
public class B {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "a_id")
    private A a;
}
