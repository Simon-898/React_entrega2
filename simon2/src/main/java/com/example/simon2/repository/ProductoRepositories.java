package com.example.simon2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

@Repository
public interface ProductoRepositories extends JpaRepository<com.example.simon2.entities.Producto, Long> {
    @Modifying
    @Transactional
    @Query("""
        UPDATE Producto p
        SET p.stock = p.stock - :qty
        WHERE p.id = :id
        AND p.stock >= :qty
    """)
    int descontarStockSiAlcanza(@Param("id") Long id, @Param("qty") int qty);
}
