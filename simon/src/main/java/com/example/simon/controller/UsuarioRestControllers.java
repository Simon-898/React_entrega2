package com.example.simon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.simon.dto.CambiarPasswordRequest;
import com.example.simon.dto.UsuarioRequest;
import com.example.simon.dto.UsuarioResponse;
import com.example.simon.services.UsuarioServices;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173/")
public class UsuarioRestControllers {

    @Autowired
    private UsuarioServices usuarioServices;

    @PostMapping
    public ResponseEntity<UsuarioResponse> crear(@Valid @RequestBody UsuarioRequest request) {
        return ResponseEntity.ok(usuarioServices.crear(request));
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> listar() {
        return ResponseEntity.ok(usuarioServices.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioServices.obtenerId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponse> actualizar(@PathVariable Long id,
                                                      @Valid @RequestBody UsuarioRequest request) {
        return ResponseEntity.ok(usuarioServices.actualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        usuarioServices.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/inhabilitar")
    public ResponseEntity<UsuarioResponse> inhabilitar(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioServices.inhabilitar(id));
    }

    @PatchMapping("/{id}/password")
    public ResponseEntity<UsuarioResponse> cambiarPassword(@PathVariable Long id,
                                                           @Valid @RequestBody CambiarPasswordRequest req) {
        return ResponseEntity.ok(usuarioServices.cambiarPassword(id, req));
    }
}
