package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.dto.SectionDto;
import ru.nsu.gemuev.backendjpa.entity.Section;
import ru.nsu.gemuev.backendjpa.entity.SectionGroup;
import ru.nsu.gemuev.backendjpa.entity.Toutist;
//import ru.nsu.gemuev.backendjpa.mappers.SectionMapper;
import ru.nsu.gemuev.backendjpa.mappers.SectionMapper;
import ru.nsu.gemuev.backendjpa.repositories.SectionsRepository;
import ru.nsu.gemuev.backendjpa.repositories.TouristRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.StreamSupport;

@Service
@AllArgsConstructor
public class SectionsService {
    private final SectionsRepository sectionsRepository;
    private final TouristRepository touristRepository;
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
}
