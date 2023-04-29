package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.entity.Section;
import ru.nsu.gemuev.backendjpa.entity.SectionGroup;
import ru.nsu.gemuev.backendjpa.repositories.SectionGroupRepository;
import ru.nsu.gemuev.backendjpa.repositories.SectionsRepository;

@Service
@RequiredArgsConstructor
public class SectionGroupService {
    private final SectionsRepository sectionsRepository;
    private final SectionGroupRepository sectionGroupRepository;

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
        sectionGroupRepository.deleteById(id);
    }
}
