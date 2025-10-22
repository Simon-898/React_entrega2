package com.example.simon2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.simon2.entities.Categoria;

public interface CategoriaRepositories extends JpaRepository<Categoria, Long> {
}   
