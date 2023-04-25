package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.dto.UserDto;
import ru.nsu.gemuev.backendjpa.mappers.UserMapper;
import ru.nsu.gemuev.backendjpa.repositories.UserRepository;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private final @NonNull UserRepository userRepository;
    private final @NonNull UserMapper userMapper;

    @Transactional
    public Optional<UserDto> getUserByUsername(@NonNull String username){
        return userRepository.getByUsername(username).map(userMapper::toDto);
    }
}
