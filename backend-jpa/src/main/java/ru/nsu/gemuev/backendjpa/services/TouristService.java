package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.dto.CategoryDto;
import ru.nsu.gemuev.backendjpa.dto.TouristDto;
import ru.nsu.gemuev.backendjpa.dto.TrainerDto;
import ru.nsu.gemuev.backendjpa.dto.requests.TouristRequest;
import ru.nsu.gemuev.backendjpa.dto.UserDto;
import ru.nsu.gemuev.backendjpa.entity.Tourist;
import ru.nsu.gemuev.backendjpa.entity.TouristCategory;
import ru.nsu.gemuev.backendjpa.mappers.TouristMapper;
import ru.nsu.gemuev.backendjpa.mappers.TrainerMapper;
import ru.nsu.gemuev.backendjpa.mappers.UserMapper;
import ru.nsu.gemuev.backendjpa.repositories.TouristCategoryRepository;
import ru.nsu.gemuev.backendjpa.repositories.TouristRepository;
import ru.nsu.gemuev.backendjpa.repositories.TrainersRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class TouristService {
    private final TrainersRepository trainersRepository;
    private final UserMapper userMapper;
    private final TouristCategoryRepository touristCategoryRepository;
    private final TouristRepository touristRepository;
    private final TouristMapper touristMapper;
    private final TrainerMapper trainerMapper;

    @Transactional
    public List<UserDto> getAllTrainers(){
        return StreamSupport
                .stream(trainersRepository.findAll().spliterator(), false)
                .map(userMapper::toDto)
                .toList();
    }

    @Transactional
    public List<TrainerDto> getSectionTrainers(long sectionId){
        return trainersRepository.findAllBySectionId(sectionId).stream()
                .map(trainerMapper::toDto)
                .toList();
    }

    @Transactional
    public @NonNull List<CategoryDto> getCategoryDto(){
        return StreamSupport
                .stream(touristCategoryRepository.findAll().spliterator(), false)
                .map(touristCategory -> new CategoryDto(touristCategory.getId(), touristCategory.getValue()))
                .toList();
    }

    @Transactional
    public @NonNull List<TouristDto> getTourists(@NonNull final TouristRequest request){
        final List<Specification<Tourist>> specifications = new ArrayList<>();

        if(request.getFirstName() != null && !"".equals(request.getFirstName())){
            specifications.add(TouristRepository.equalSpec("firstName", request.getFirstName()));
        }

        if(request.getLastName() != null && !"".equals(request.getLastName())){
            specifications.add(TouristRepository.equalSpec("lastName", request.getLastName()));
        }

        if(request.getTouristCategory() != null){
            final TouristCategory category = new TouristCategory(request.getTouristCategory(), null);
            specifications.add(TouristRepository.equalSpec("category", category));
        }

        final var touristsStream = specifications.isEmpty()?
                StreamSupport.stream(touristRepository.findAll().spliterator(), false) :
                touristRepository.findAll(Specification.allOf(specifications)).stream();

        return touristsStream.map(touristMapper::toDto).toList();

//        final var list = touristsStream.toList();
//
//        return List.of();
    }
}
