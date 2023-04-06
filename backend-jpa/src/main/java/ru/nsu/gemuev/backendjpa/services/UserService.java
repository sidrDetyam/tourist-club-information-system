package ru.nsu.gemuev.backendjpa.services;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.repositories.UserRepository;

@Service
@AllArgsConstructor
public class UserService {
    private final @NonNull UserRepository userRepository;


}
