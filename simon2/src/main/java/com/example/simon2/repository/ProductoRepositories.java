package com.example.simon2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepositories extends JpaRepository<com.example.simon2.entities.Producto, Long> {
}
