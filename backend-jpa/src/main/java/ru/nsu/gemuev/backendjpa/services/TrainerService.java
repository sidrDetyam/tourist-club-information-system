package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.utils.SpecificationUtils;
import ru.nsu.gemuev.backendjpa.dto.CategoryDto;
import ru.nsu.gemuev.backendjpa.dto.TrainerDto;
import ru.nsu.gemuev.backendjpa.dto.requests.TrainerRequest;
import ru.nsu.gemuev.backendjpa.domain.Trainer;
import ru.nsu.gemuev.backendjpa.domain.TrainerCategory;
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
    private final JdbcTemplate jdbcTemplate;
    private final TouristService touristService;

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

    @Transactional
    public @NonNull TrainerDto getById(final long id){
        final var trainer = trainersRepository.findById(id).orElseThrow();
        return trainerMapper.toDto(trainer);
    }

    @Transactional
    public void reduceToTourist(final long id){
        jdbcTemplate.update("UPDATE section_groups SET trainer_id=NULL WHERE trainer_id = ?", id);
        jdbcTemplate.update("update hikes set trainer_id=null where trainer_id = ?", id);
        jdbcTemplate.update("delete from trainers where id=?", id);
    }

    @Transactional
    public void increaseToTrainer(final long id){
        jdbcTemplate.update("INSERT INTO trainers VALUES (?, null, null)", id);
    }

    @Transactional
    public void deleteTrainer(final long id){
        reduceToTourist(id);
        touristService.delete(id);
    }

    @Transactional
    public void edit(final @NonNull TrainerDto request){
        touristService.edit(request);
        final Trainer trainer = trainersRepository.findById(request.getId()).orElseThrow();
        trainer.setTrainerCategory(trainerCategoryRepository
                .findByValue(request.getTrainerCategory()).orElseThrow());
        trainersRepository.save(trainer);
    }
}
