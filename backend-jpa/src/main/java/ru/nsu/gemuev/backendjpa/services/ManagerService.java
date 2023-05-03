package ru.nsu.gemuev.backendjpa.services;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.dto.IdDto;
import ru.nsu.gemuev.backendjpa.dto.UserDto;
import ru.nsu.gemuev.backendjpa.mappers.UserMapper;
import ru.nsu.gemuev.backendjpa.repositories.ManagerRepository;
import ru.nsu.gemuev.backendjpa.utils.RequestFieldChecker;

@Service
@RequiredArgsConstructor
public class ManagerService {
    private final ManagerRepository managerRepository;
    private final UserMapper userMapper;

    public @NonNull UserDto getById(@NonNull final IdDto request){
        RequestFieldChecker.requireNonNull(request.getId());
        return userMapper.toDto(managerRepository
                .findById(request.getId()).orElseThrow());
    }
}
