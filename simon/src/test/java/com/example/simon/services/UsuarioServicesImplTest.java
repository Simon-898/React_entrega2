
package com.example.simon.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.simon.dto.UsuarioRequest;
import com.example.simon.dto.UsuarioResponse;
import com.example.simon.entities.Usuario;
import com.example.simon.repository.UsuarioRepositories;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UsuarioServicesImplTest {

    @InjectMocks
    private UsuarioServicesImpl service;

    @Mock
    private UsuarioRepositories repository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private List<Usuario> dummy;

    @BeforeEach
    void setUp() {
        Usuario u1 = new Usuario();
        u1.setId(1L);
        u1.setNombre("Ana");
        u1.setEmail("ana@duoc.cl");
        u1.setPasswordHash("hash1");
        u1.setRol("CLIENTE");
        u1.setEstado("ACTIVO");

        Usuario u2 = new Usuario();
        u2.setId(2L);
        u2.setNombre("Benja");
        u2.setEmail("benja@duoc.cl");
        u2.setPasswordHash("hash2");
        u2.setRol("ADMIN");
        u2.setEstado("ACTIVO");

        dummy = Arrays.asList(u1, u2);
    }

    @Test
    void listar_deberiaRetornarTodos() {
        when(repository.findAll()).thenReturn(dummy);

        List<UsuarioResponse> out = service.listarTodas();

        assertEquals(2, out.size(), "Debe traer 2 usuarios");
        verify(repository, times(1)).findAll();
        verifyNoMoreInteractions(repository);
    }

    @Test
    void crear_deberiaValidarDominioYEncriptarPassword() {
        // Nuevo usuario desde el front
        UsuarioRequest request = new UsuarioRequest();
        request.setNombre("Cata");
        request.setEmail("cata@duoc.cl");      // dominio válido
        request.setPassword("123456");         // plano desde el front
        request.setRol(null);                  // lo fija el servicio (CLIENTE)

        // Stubs
        when(passwordEncoder.encode("123456")).thenReturn("ENC_123456");
        when(repository.save(any(Usuario.class))).thenAnswer(inv -> {
            Usuario u = inv.getArgument(0);
            u.setId(20L);                      // simular autogenerado
            return u;
        });

        // Ejecutar
        UsuarioResponse out = service.crear(request);

        assertNotNull(out.getId());
        assertEquals(20L, out.getId());
        assertEquals("CLIENTE", out.getRol()); // rol por defecto
        verify(passwordEncoder).encode("123456");
        verify(repository).save(any(Usuario.class));
    }

    @Test
    void crear_conCorreoInvalido_deberiaLanzarExcepcion() {
        UsuarioRequest invalido = new UsuarioRequest();
        invalido.setNombre("Cata");
        invalido.setEmail("cata@gmail.com");   // dominio NO válido
        invalido.setPassword("123456");

        assertThrows(IllegalArgumentException.class, () -> service.crear(invalido));
        verify(repository, never()).save(any());
        verifyNoInteractions(passwordEncoder);
    }

    @Test
    void inhabilitar_deberiaPonerEstadoInactivo() {
        Long id = 2L;
        Usuario existente = new Usuario();
        existente.setId(2L);
        existente.setNombre("Benja");
        existente.setEmail("benja@duoc.cl");
        existente.setPasswordHash("hash2");
        existente.setRol("ADMIN");
        existente.setEstado("ACTIVO");

        when(repository.findById(id)).thenReturn(Optional.of(existente));
        when(repository.save(any(Usuario.class))).thenAnswer(inv -> inv.getArgument(0));

        UsuarioResponse out = service.inhabilitar(id);

        assertEquals("INACTIVO", out.getEstado(), "Debe quedar inactivo");
        verify(repository).findById(id);
        verify(repository).save(existente);
    }
}
