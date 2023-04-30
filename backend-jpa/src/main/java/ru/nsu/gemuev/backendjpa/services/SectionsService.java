package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.dto.EditSectionDto;
import ru.nsu.gemuev.backendjpa.dto.SectionDto;
import ru.nsu.gemuev.backendjpa.dto.SectionGroupDto;
import ru.nsu.gemuev.backendjpa.dto.requests.CreateSectionRequest;
import ru.nsu.gemuev.backendjpa.entity.Section;
import ru.nsu.gemuev.backendjpa.entity.SectionGroup;
import ru.nsu.gemuev.backendjpa.mappers.ScheduleItemMapper;
import ru.nsu.gemuev.backendjpa.mappers.SectionGroupMapper;
import ru.nsu.gemuev.backendjpa.mappers.SectionMapper;
import ru.nsu.gemuev.backendjpa.repositories.*;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
@AllArgsConstructor
public class SectionsService {
    private final SectionsRepository sectionsRepository;
    private final TouristRepository touristRepository;
    private final ManagerRepository managerRepository;
    private final TrainersRepository trainersRepository;
    private final SectionMapper sectionMapper;
    private final SectionGroupRepository sectionGroupRepository;
    private final SectionGroupMapper sectionGroupMapper;
    private final ScheduleItemMapper scheduleItemMapper;
    private final SectionGroupService sectionGroupService;

    @Transactional
    public @NonNull List<String> getAllSectionsNames() {
        return StreamSupport
                .stream(sectionsRepository.findAll().spliterator(), false)
                .map(Section::getName)
                .toList();
    }

//    @Transactional
//    public @NonNull List<String> getTouristSectionsNames(@NonNull final String username)
//            throws NoSuchElementException {
//        final Tourist tourist = touristRepository.findByUsername(username)
//                .orElseThrow(() -> new NoSuchElementException("This tourist doesn`t exist"));
//
//        //bruh N+1
//        return tourist.getSectionGroups().stream()
//                .map(SectionGroup::getSection)
//                .map(Section::getName)
//                .toList();
//    }

    @Transactional
    public @NonNull List<SectionDto> getAllSectionsInfo() {
        return StreamSupport
                .stream(sectionsRepository.findAll().spliterator(), false)
                .map(sectionMapper::toDto)
                .toList();
    }

    @Transactional
    public @NonNull SectionGroupDto getSectionGroup(final long id) {
        return sectionGroupMapper.toDto(sectionGroupRepository
                .findById(id)
                .orElseThrow());
    }

    @Transactional
    public void editSection(final @NonNull EditSectionDto editSectionDto,
                            final @NonNull String managerUsername) {

        final Section section = sectionsRepository.findById(editSectionDto.getId()).orElseThrow();

//        final SectionManager manager = managerRepository.findByUsername(managerUsername).orElseThrow();
//        final Section section = manager.getSections().stream()
//                .filter(s -> Objects.equals(s.getId(), editSectionDto.getId()))
//                .findFirst()
//                .orElseThrow();

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

    @Transactional
    public void editSchedule(final @NonNull SectionGroupDto dto){
        final SectionGroup group = sectionGroupRepository.findById(dto.getId()).orElseThrow();
        group.getScheduleItems().clear();
        for(var itemDto : dto.getSchedule()){
            final var item = scheduleItemMapper.toScheduleItem(itemDto);
            item.setId(null);
            item.setSectionGroup(group);
            group.getScheduleItems().add(item);
        }
    }

    @Transactional
    public void createSection(final @NonNull CreateSectionRequest request){
        final Section section = new Section();
        section.setName(request.getName());
        sectionsRepository.save(section);
    }

    @Transactional
    public void deleteSection(final long id){
        final Section section = sectionsRepository.findById(id).orElseThrow();
        if(section.getSectionManager() != null){
            section.getSectionManager().getSections().remove(section);
            section.setSectionManager(null);
        }
        section.getTrainers().forEach(t -> t.setSection(null));
        section.getTrainers().clear();

        section.getSectionGroup().forEach(t -> sectionGroupService.deleteGroup(t.getId()));
        section.getSectionGroup().clear();

        sectionsRepository.delete(section);
    }
}
