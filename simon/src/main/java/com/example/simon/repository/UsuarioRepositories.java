package com.example.simon.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.simon.entities.Usuario;

public interface UsuarioRepositories extends JpaRepository<Usuario, Long> {
    boolean existsByEmail(String email);
    Optional<Usuario> findByEmail(String email); 
}
