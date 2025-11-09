package com.example.simon.controller;

import com.example.simon.dto.UsuarioRequest;
import com.example.simon.dto.UsuarioResponse;
import com.example.simon.security.JwtService;
import com.example.simon.services.UsuarioServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UsuarioServices usuarioServices;
    private final JwtService jwtService;

    public AuthController(UsuarioServices usuarioServices, JwtService jwtService) {
        this.usuarioServices = usuarioServices;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UsuarioRequest req) {
        // valida email + password
        UsuarioResponse user = usuarioServices.validarCredenciales(req.getEmail(), req.getPassword());

        // genera JWT con email y rol
        String token = jwtService.generateToken(user.getEmail(), user.getRol());

        Map<String, Object> body = new HashMap<>();
        body.put("token", token);
        body.put("rol", user.getRol());
        body.put("email", user.getEmail());
        return ResponseEntity.ok(body);
    }

    @GetMapping("/ping")
    public Map<String, String> ping() {
        return Map.of("ok", "pong");
    }
}
