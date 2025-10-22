package com.example.simon.services;

import java.util.List;

import com.example.simon.dto.CambiarPasswordRequest;
import com.example.simon.dto.UsuarioRequest;
import com.example.simon.dto.UsuarioResponse;

public interface UsuarioServices {
    UsuarioResponse crear(UsuarioRequest request);
    UsuarioResponse obtenerId(Long id);
    List<UsuarioResponse> listarTodas();
    void eliminar(Long id);                 // Hard delete
    UsuarioResponse actualizar(Long id, UsuarioRequest request);
    UsuarioResponse inhabilitar(Long id);   // Soft delete (estado INACTIVO)
    UsuarioResponse cambiarPassword(Long id, CambiarPasswordRequest req);
}