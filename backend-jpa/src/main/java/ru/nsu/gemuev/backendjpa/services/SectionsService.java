package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.dto.EditSectionDto;
import ru.nsu.gemuev.backendjpa.dto.SectionDto;
import ru.nsu.gemuev.backendjpa.entity.*;
import ru.nsu.gemuev.backendjpa.mappers.SectionMapper;
import ru.nsu.gemuev.backendjpa.repositories.ManagerRepository;
import ru.nsu.gemuev.backendjpa.repositories.SectionsRepository;
import ru.nsu.gemuev.backendjpa.repositories.TouristRepository;
import ru.nsu.gemuev.backendjpa.repositories.TrainersRepository;

import java.util.*;
import java.util.stream.StreamSupport;

@Service
@AllArgsConstructor
public class SectionsService {
    private final SectionsRepository sectionsRepository;
    private final TouristRepository touristRepository;
    private final ManagerRepository managerRepository;
    private final TrainersRepository trainersRepository;
    private final SectionMapper sectionMapper;

    @Transactional
    public @NonNull List<String> getAllSectionsNames() {
        return StreamSupport
                .stream(sectionsRepository.findAll().spliterator(), false)
                .map(Section::getName)
                .toList();
    }

    @Transactional
    public @NonNull List<String> getTouristSectionsNames(@NonNull final String username)
            throws NoSuchElementException {
        final Toutist tourist = touristRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("This tourist doesn`t exist"));

        //bruh N+1
        return tourist.getSectionGroups().stream()
                .map(SectionGroup::getSection)
                .map(Section::getName)
                .toList();
    }

    @Transactional
    public @NonNull List<SectionDto> getAllSectionsInfo() {
        return StreamSupport
                .stream(sectionsRepository.findAll().spliterator(), false)
                .map(sectionMapper::toDto)
                .toList();
    }

    @Transactional
    public void editSection(final @NonNull EditSectionDto editSectionDto,
                            final @NonNull String managerUsername) {

        final SectionManager manager = managerRepository.findByUsername(managerUsername).orElseThrow();
        final Section section = manager.getSections().stream()
                .filter(s -> Objects.equals(s.getId(), editSectionDto.getId()))
                .findFirst()
                .orElseThrow();

        if (editSectionDto.getName() != null) {
            section.setName(editSectionDto.getName());
        }
        if (editSectionDto.getDescription() != null) {
            section.setDescription(editSectionDto.getDescription());
        }
        if (editSectionDto.getTrainersId() != null) {
//            final List<Trainer> newTrainers = new ArrayList<>(section.getTrainers()
//                    .stream()
//                    .filter(trainer -> editSectionDto.getTrainersId().contains(trainer.getId()))
//                    .toList());

//            newTrainers.forEach(t -> t.setSection(null));

            trainersRepository
                    .findAllBySectionId(section.getId())
                    .stream().filter(t -> !editSectionDto.getTrainersId().contains(t.getId()))
                    .forEach(t -> t.setSection(null));

            StreamSupport.stream(trainersRepository
                    .findAllById(editSectionDto.getTrainersId())
                    .spliterator(), false)
                    .forEach(t -> t.setSection(section));
        }
    }
}
