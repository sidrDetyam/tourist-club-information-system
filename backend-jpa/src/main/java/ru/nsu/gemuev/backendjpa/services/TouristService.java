package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.dto.CategoryDto;
import ru.nsu.gemuev.backendjpa.dto.TouristDto;
import ru.nsu.gemuev.backendjpa.dto.TouristRequest;
import ru.nsu.gemuev.backendjpa.dto.UserDto;
import ru.nsu.gemuev.backendjpa.mappers.UserMapper;
import ru.nsu.gemuev.backendjpa.repositories.TouristCategoryRepository;
import ru.nsu.gemuev.backendjpa.repositories.TrainersRepository;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class TouristService {
    private final TrainersRepository trainersRepository;
    private final UserMapper userMapper;
    private final TouristCategoryRepository touristCategoryRepository;

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

    @Transactional
    public @NonNull List<CategoryDto> getCategoryDto(){
        return StreamSupport
                .stream(touristCategoryRepository.findAll().spliterator(), false)
                .map(touristCategory -> new CategoryDto(touristCategory.getId(), touristCategory.getValue()))
                .toList();
    }

//    @Transactional
//    public @NonNull List<TouristDto> getTourists(@NonNull final TouristRequest request){
//
//    }
}
