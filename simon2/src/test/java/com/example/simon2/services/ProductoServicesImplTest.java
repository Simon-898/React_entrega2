package com.example.simon2.services;

import com.example.simon2.entities.Categoria;
import com.example.simon2.entities.Producto;
import com.example.simon2.repository.ProductoRepositories;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductoServicesImplTest {
    

    @InjectMocks
    private ProductoServicesImpl service;

    @Mock
    private ProductoRepositories repository;

    private List<Producto> dummy;

    @BeforeEach
    void setUp() {
        Categoria cat = new Categoria();
        cat.setId(8L);
        cat.setNombre("Chaquetas");

        Producto p1 = new Producto();
        p1.setId(1L);
        p1.setNombre("Chaqueta Nike");
        p1.setDescripcion("Corta viento");
        p1.setPrecio(50000d);
        p1.setCategoria(cat);
        p1.setActivo(true);
        p1.setTalla("M");
        p1.setStock(5);

        Producto p2 = new Producto();
        p2.setId(2L);
        p2.setNombre("Polera básica");
        p2.setDescripcion("Algodón");
        p2.setPrecio(9990d);
        p2.setCategoria(cat);
        p2.setActivo(true);
        p2.setTalla("L");
        p2.setStock(10);

        dummy = Arrays.asList(p1, p2);
    }

    @Test
    void listar_deberiaRetornarTodos() {
        when(repository.findAll()).thenReturn(dummy);

        var out = service.listarTodas();

        assertEquals(2, out.size(), "Debe traer 2 productos");
        verify(repository, times(1)).findAll();
        verifyNoMoreInteractions(repository);
    }

    @Test
    void crear_deberiaGuardarYRetornarConId() {
        Categoria cat = new Categoria();
        cat.setId(8L);
        Producto nuevo = new Producto(null, "Zapatilla", "Running", 79990d, true, "42",
                "/images/foo.png", 3, cat, null);

        Producto guardado = new Producto(10L, "Zapatilla", "Running", 79990d, true, "42",
                "/images/foo.png", 3, cat, null);

        when(repository.save(nuevo)).thenReturn(guardado);

        var out = service.crear(nuevo);

        assertNotNull(out.getId());
        assertEquals(10L, out.getId());
        assertEquals("Zapatilla", out.getNombre());
        verify(repository).save(nuevo);
    }

    @Test
    void actualizar_deberiaModificarCamposBasicos() {
        Long id = 1L;
        Producto existente = new Producto(1L, "Chaqueta Nike", "Corta viento", 50000d, true, "M",
                "/images/x.png", 5, null, null);

        Producto cambio = new Producto(null, "Chaqueta Nike Pro", "Mejor tela", 54990d, true, "M",
                "/images/x.png", 7, null, null);

        when(repository.findById(id)).thenReturn(Optional.of(existente));
        when(repository.save(any(Producto.class))).thenAnswer(inv -> inv.getArgument(0));

        var out = service.actualizar(id, cambio);

        assertEquals("Chaqueta Nike Pro", out.getNombre());
        assertEquals(54990d, out.getPrecio());
        assertEquals(7, out.getStock());
        verify(repository).findById(id);
        verify(repository).save(existente);
    }

    @Test
    void desactivar_deberiaPonerActivoFalse() {
        Long id = 2L;
        Producto existente = new Producto(2L, "Polera básica", "Algodón", 9990d, true, "L",
                "/images/y.png", 10, null, null);

        when(repository.findById(id)).thenReturn(Optional.of(existente));

        service.desactivar(id);

        assertFalse(existente.isActivo(), "Debe quedar inactivo");
        verify(repository).findById(id);
        verify(repository).save(existente);
    }

    
}
