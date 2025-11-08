package com.example.simon.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuario", uniqueConstraints = {
    @UniqueConstraint(name = "uk_usuario_email", columnNames = "email")
})
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @Email(message = "Formato de email inválido")
    @NotBlank(message = "El email es obligatorio")
    private String email;

    @JsonIgnore
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    // Rol como String con validación
    @NotBlank(message = "El rol es obligatorio")
    @Pattern(regexp = "CLIENTE|VENDEDOR|SUPER_ADMIN", message = "Rol inválido")
    @Column(nullable = false, length = 20)
    private String rol = "CLIENTE";

    // Estado como String con validación
    @NotBlank(message = "El estado es obligatorio")
    @Pattern(regexp = "ACTIVO|INACTIVO", message = "Estado inválido")
    @Column(nullable = false, length = 20)
    private String estado = "ACTIVO";

    @CreationTimestamp
    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getPasswordHash() {
        return passwordHash;
    }
}
