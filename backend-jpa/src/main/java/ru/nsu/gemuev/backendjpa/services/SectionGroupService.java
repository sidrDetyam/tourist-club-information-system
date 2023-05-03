package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.dto.requests.SectionGroupEditRequest;
import ru.nsu.gemuev.backendjpa.domain.Section;
import ru.nsu.gemuev.backendjpa.domain.SectionGroup;
import ru.nsu.gemuev.backendjpa.repositories.SectionGroupRepository;
import ru.nsu.gemuev.backendjpa.repositories.SectionsRepository;
import ru.nsu.gemuev.backendjpa.repositories.TouristRepository;
import ru.nsu.gemuev.backendjpa.repositories.TrainersRepository;

import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class SectionGroupService {
    private final SectionsRepository sectionsRepository;
    private final SectionGroupRepository sectionGroupRepository;
    private final TrainersRepository trainersRepository;
    private final TouristRepository touristRepository;

    @Transactional
    public long createGroup(final long sectionId, @NonNull final String name){
        SectionGroup sectionGroup = new SectionGroup();
        sectionGroup.setName(name);
        final Section section = sectionsRepository.findById(sectionId).orElseThrow();
        sectionGroup.setSection(section);
//        section.getSectionGroup().add(sectionGroup);
        sectionGroupRepository.save(sectionGroup);
        return sectionGroup.getId();
    }

    @Transactional
    public void deleteGroup(final long id){
        final SectionGroup group = sectionGroupRepository.findById(id).orElseThrow();
        group.getTourists().forEach(t -> t.getSectionGroups().remove(group));
        if(group.getTrainer() != null) {
            group.getTrainer().getTrainerSectionGroups().remove(group);
        }
        group.setTrainer(null);
        group.getTourists().clear();
        sectionGroupRepository.delete(group);
    }

    @Transactional
    public void editGroup(final @NonNull SectionGroupEditRequest request){
        final var group = sectionGroupRepository.findById(request.getGroupId()).orElseThrow();
        if(request.getName() != null) {
            group.setName(request.getName());
        }

        if(request.getTrainerId() != null){
            final var trainer = trainersRepository.findById(request.getTrainerId()).orElseThrow();
            group.setTrainer(trainer);
        }
        else{
            group.setTrainer(null);
        }

        group.getTourists().forEach(t -> t.getSectionGroups().remove(group));
        group.getTourists().clear();
        final var newTourists = StreamSupport.stream(touristRepository
                .findAllById(request.getTouristIds()).spliterator(), false).toList();
        newTourists.forEach(t -> t.getSectionGroups().add(group));
        group.getTourists().addAll(newTourists);
        sectionGroupRepository.save(group);
    }
}
