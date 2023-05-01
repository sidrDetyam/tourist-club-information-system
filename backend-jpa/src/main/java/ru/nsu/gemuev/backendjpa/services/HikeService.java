package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.dto.HikeDto;
import ru.nsu.gemuev.backendjpa.mappers.HikeMapper;
import ru.nsu.gemuev.backendjpa.repositories.HikeRepository;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class HikeService {
    private final HikeRepository hikeRepository;
    private final HikeMapper hikeMapper;

    @Transactional
    public @NonNull List<HikeDto> allHikes(){
        return StreamSupport
                .stream(hikeRepository.findAll().spliterator(), false)
                .map(hikeMapper::toDto)
                .toList();
    }

    @Transactional
    public @NonNull HikeDto getById(final long id){
        return hikeMapper.toDto(hikeRepository.findById(id).orElseThrow());
    }
}
