package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.Utils.SpecificationUtils;
import ru.nsu.gemuev.backendjpa.dto.CategoryDto;
import ru.nsu.gemuev.backendjpa.dto.TrainerDto;
import ru.nsu.gemuev.backendjpa.dto.requests.TrainerRequest;
import ru.nsu.gemuev.backendjpa.entity.Trainer;
import ru.nsu.gemuev.backendjpa.entity.TrainerCategory;
import ru.nsu.gemuev.backendjpa.mappers.TrainerMapper;
import ru.nsu.gemuev.backendjpa.repositories.TrainerCategoryRepository;
import ru.nsu.gemuev.backendjpa.repositories.TrainersRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class TrainerService {
    private final TrainerCategoryRepository trainerCategoryRepository;
    private final TrainersRepository trainersRepository;
    private final TrainerMapper trainerMapper;

    @Transactional
    public @NonNull List<CategoryDto> getCategoryDto() {
        return StreamSupport
                .stream(trainerCategoryRepository.findAll().spliterator(), false)
                .map(touristCategory -> new CategoryDto(touristCategory.getId(), touristCategory.getValue()))
                .toList();
    }

    @Transactional
    public @NonNull List<TrainerDto> getTourists(@NonNull final TrainerRequest request) {
        final List<Specification<Trainer>> specifications = new ArrayList<>();

        if (request.getFirstName() != null && !"".equals(request.getFirstName())) {
            specifications.add(SpecificationUtils.equalSpec("firstName", request.getFirstName()));
        }

        if (request.getLastName() != null && !"".equals(request.getLastName())) {
            specifications.add(SpecificationUtils.equalSpec("lastName", request.getLastName()));
        }

        if (request.getTrainerCategory() != null) {
            final TrainerCategory category = new TrainerCategory(request.getTrainerCategory(), null);
            specifications.add(SpecificationUtils.equalSpec("trainerCategory", category));
        }

        return trainersRepository.findAll(Specification.allOf(specifications))
                .stream()
                .map(trainerMapper::toDto)
                .toList();
    }
}
