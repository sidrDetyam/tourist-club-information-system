package ru.nsu.gemuev.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.nsu.gemuev.backend.entity.Role;
import ru.nsu.gemuev.backend.repositories.RoleRepository;
import ru.nsu.gemuev.backend.repositories.UserRepository;

@Component
public class Test {

    @Autowired
    public Test(JwtProvider jwtProvider, UserRepository userRepository, RoleRepository roleRepository){
        var users = userRepository.findAll();
        users.forEach(u -> System.out.println(roleRepository.findRolesByUserId(u.getId()).stream().map(Role::getAuthority).toList()));
    }

}
