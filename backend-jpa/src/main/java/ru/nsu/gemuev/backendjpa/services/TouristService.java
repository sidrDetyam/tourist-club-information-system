package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.dto.CategoryDto;
import ru.nsu.gemuev.backendjpa.dto.TouristDto;
import ru.nsu.gemuev.backendjpa.dto.TrainerDto;
import ru.nsu.gemuev.backendjpa.dto.requests.CreateUserRequest;
import ru.nsu.gemuev.backendjpa.dto.requests.TouristRequest;
import ru.nsu.gemuev.backendjpa.dto.UserDto;
import ru.nsu.gemuev.backendjpa.domain.Tourist;
import ru.nsu.gemuev.backendjpa.domain.TouristCategory;
import ru.nsu.gemuev.backendjpa.mappers.TouristMapper;
import ru.nsu.gemuev.backendjpa.mappers.TrainerMapper;
import ru.nsu.gemuev.backendjpa.mappers.UserMapper;
import ru.nsu.gemuev.backendjpa.repositories.RoleRepository;
import ru.nsu.gemuev.backendjpa.repositories.TouristCategoryRepository;
import ru.nsu.gemuev.backendjpa.repositories.TouristRepository;
import ru.nsu.gemuev.backendjpa.repositories.TrainersRepository;
import ru.nsu.gemuev.backendjpa.security.entities.Role;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
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
    private final RoleRepository roleRepository;
    private final JdbcTemplate jdbcTemplate;
    private final UserService userService;

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

    @Transactional
    public @NonNull TouristDto getById(final long id){
        return touristMapper.toDto(touristRepository
                .findById(id).orElseThrow());
    }

    @Transactional
    public void createUser(@NonNull final CreateUserRequest request){
        final Tourist tourist = new Tourist();
        tourist.setEmail(request.getEmail());
        tourist.setUsername(request.getUsername());
        tourist.setFirstName(request.getFirstName());
        tourist.setLastName(request.getSecondName());
        tourist.setPassword("");
        Set<Role> roles = Set.of(roleRepository.findByRoleName("USER").orElseThrow());
        tourist.setRoles(roles);
        touristRepository.save(tourist);
    }

    @Transactional
    public void delete(final long id){
        jdbcTemplate.update("delete from tourists_section_groups where tourist_id = ?", id);
        jdbcTemplate.update("delete from tourists where id = ?", id);
        jdbcTemplate.update("delete from users_roles where user_id = ?", id);
        jdbcTemplate.update("delete from users where id = ?", id);
    }

    @Transactional
    public void edit(final @NonNull TouristDto touristDto){
        userService.editUser(touristDto);
        final Tourist tourist = touristRepository.findById(touristDto.getId()).orElseThrow();
        tourist.setCategory(touristCategoryRepository
                .getTouristCategoryByValue(touristDto.getTouristCategory()).orElseThrow());
        touristRepository.save(tourist);
    }
}
