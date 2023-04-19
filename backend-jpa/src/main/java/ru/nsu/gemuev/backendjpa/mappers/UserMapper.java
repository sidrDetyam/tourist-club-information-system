package ru.nsu.gemuev.backendjpa.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.nsu.gemuev.backendjpa.dto.UserDto;
import ru.nsu.gemuev.backendjpa.security.entities.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "secondName", source = "lastName")
    UserDto toDto(User user);
}
