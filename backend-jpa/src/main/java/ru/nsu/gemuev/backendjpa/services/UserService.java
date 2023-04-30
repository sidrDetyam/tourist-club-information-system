package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.dto.UserDto;
import ru.nsu.gemuev.backendjpa.mappers.UserMapper;
import ru.nsu.gemuev.backendjpa.repositories.UserRepository;
import ru.nsu.gemuev.backendjpa.security.entities.User;

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

    @Transactional
    public void editUser(@NonNull UserDto request){
        final User user = userRepository.findById(request.getId()).orElseThrow();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getSecondName());
        userRepository.save(user);
    }
}
