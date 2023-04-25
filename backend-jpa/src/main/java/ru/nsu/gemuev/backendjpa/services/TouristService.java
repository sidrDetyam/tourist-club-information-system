package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.dto.TrainerDto;
import ru.nsu.gemuev.backendjpa.dto.UserDto;
import ru.nsu.gemuev.backendjpa.mappers.UserMapper;
import ru.nsu.gemuev.backendjpa.repositories.TrainersRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class TouristService {
    private final TrainersRepository trainersRepository;
    private final UserMapper userMapper;

    @Transactional
    public List<UserDto> getAllTrainers(){
        return StreamSupport
                .stream(trainersRepository.findAll().spliterator(), false)
                .map(userMapper::toDto)
                .toList();
    }

    @Transactional
    public List<UserDto> getSectionTrainers(long sectionId){
        return trainersRepository.findAllBySectionId(sectionId).stream()
                .map(userMapper::toDto)
                .toList();
    }
}
