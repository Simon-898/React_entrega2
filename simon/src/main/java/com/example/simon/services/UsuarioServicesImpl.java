package com.example.simon.services;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.simon.dto.CambiarPasswordRequest;
import com.example.simon.dto.UsuarioRequest;
import com.example.simon.dto.UsuarioResponse;
import com.example.simon.entities.Usuario;
import com.example.simon.repository.UsuarioRepositories;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UsuarioServicesImpl implements UsuarioServices {

    @Autowired
    private UsuarioRepositories usuarioRepositories;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private UsuarioResponse toResponse(Usuario u) {
        return UsuarioResponse.builder()
                .id(u.getId())
                .nombre(u.getNombre())
                .email(u.getEmail())
                .rol(u.getRol())
                .estado(u.getEstado())
                .fechaCreacion(u.getFechaCreacion())
                .build();
    }

    @Override
    public UsuarioResponse crear(UsuarioRequest request) {
        if (request.getEmail() == null || !request.getEmail().toLowerCase().endsWith("@duoc.cl")) {
            throw new IllegalArgumentException("El email debe terminar en @duoc.cl");
        }
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            throw new IllegalArgumentException("La contraseña es obligatoria y debe tener al menos 6 caracteres");
        }
        if (usuarioRepositories.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Ya existe un usuario con ese email");
        }

        Usuario u = new Usuario();
        u.setNombre(request.getNombre());
        u.setEmail(request.getEmail());
        u.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        u.setRol(request.getRol() != null ? request.getRol().toUpperCase() : "CLIENTE");
        u.setEstado("ACTIVO");

        u = usuarioRepositories.save(u);
        return toResponse(u);
    }

    @Override
    public UsuarioResponse obtenerId(Long id) {
        Usuario u = usuarioRepositories.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));
        return toResponse(u);
    }

    @Override
    public List<UsuarioResponse> listarTodas() {
        return usuarioRepositories.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public void eliminar(Long id) {
        if (!usuarioRepositories.existsById(id)) {
            throw new EntityNotFoundException("Usuario no encontrado");
        }
        usuarioRepositories.deleteById(id);
    }

    @Override
    public UsuarioResponse actualizar(Long id, UsuarioRequest request) {
        Usuario existente = usuarioRepositories.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        if (request.getEmail() != null && !request.getEmail().equalsIgnoreCase(existente.getEmail())) {
            if (usuarioRepositories.existsByEmail(request.getEmail())) {
                throw new IllegalArgumentException("Ya existe un usuario con ese email");
            }
            existente.setEmail(request.getEmail());
        }

        if (request.getNombre() != null) {
            existente.setNombre(request.getNombre());
        }

        if (request.getRol() != null) {
            existente.setRol(request.getRol().toUpperCase());
        }

        Usuario actualizado = usuarioRepositories.save(existente);
        return toResponse(actualizado);
    }

    @Override
    public UsuarioResponse inhabilitar(Long id) {
        Usuario u = usuarioRepositories.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));
        u.setEstado("INACTIVO");
        return toResponse(usuarioRepositories.save(u));
    }

    @Override
    public UsuarioResponse cambiarPassword(Long id, CambiarPasswordRequest req) {
        Usuario u = usuarioRepositories.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));
        u.setPasswordHash(passwordEncoder.encode(req.getNuevaPassword()));
        return toResponse(usuarioRepositories.save(u));
    }

   
    @Override
    public UsuarioResponse validarCredenciales(String email, String password) {
        // busca por email (asegúrate de tener findByEmail en el repository)
        var user = usuarioRepositories.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Credenciales inválidas"));

        // compara encriptado vs plano
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new IllegalArgumentException("Credenciales inválidas");
        }

        // si quieres además bloquear INACTIVO:
        if ("INACTIVO".equalsIgnoreCase(user.getEstado())) {
            throw new IllegalArgumentException("Credenciales inválidas");
        }

        return toResponse(user);
    }

}
