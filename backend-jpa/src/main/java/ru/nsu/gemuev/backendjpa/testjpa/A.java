package ru.nsu.gemuev.backendjpa.testjpa;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "a")
@NoArgsConstructor
@Data
public class A {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "foo")
    private String foo;

    @OneToMany(mappedBy = "a", cascade = CascadeType.PERSIST)
    private List<B> bSet;

    public void removeB(B b){
        bSet.remove(b);
        b.setA(null);
    }
}
