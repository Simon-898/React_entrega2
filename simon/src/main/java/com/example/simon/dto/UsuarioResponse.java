package com.example.simon.dto;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UsuarioResponse {
    private Long id;
    private String nombre;
    private String email;
    private String rol;       // String
    private String estado;    // String
    private LocalDateTime fechaCreacion;
}