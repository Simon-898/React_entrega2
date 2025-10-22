package com.example.simon2.controller;

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
import org.springframework.web.bind.annotation.RequestParam;

import com.example.simon2.entities.Producto;
import com.example.simon2.services.ProductoServices;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/productos")
public class ProductoRestControllers {

    @Autowired
    private ProductoServices productoServices;

    @PostMapping
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto producto) {
        Producto nuevoProducto = productoServices.crear(producto);
        return ResponseEntity.ok(nuevoProducto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable Long id) {
        Producto producto = productoServices.obtenerId(id);
        return ResponseEntity.ok(producto);
    }

    @GetMapping
    public ResponseEntity<List<Producto>> listarProductos() {
        List<Producto> productos = productoServices.listarTodas();
        return ResponseEntity.ok(productos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        productoServices.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id,
            @RequestBody Producto productoActualizado) {
        Producto producto = productoServices.actualizar(id, productoActualizado);
        return ResponseEntity.ok(producto);
    }

    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<Producto> desactivar(@PathVariable Long id) {
        return ResponseEntity.ok(productoServices.desactivar(id));
    }

    // GET solo el número de stock
    @GetMapping("/{id}/stock")
    public ResponseEntity<Integer> getStock(@PathVariable Long id) {
        Producto p = productoServices.obtenerId(id);
        return ResponseEntity.ok(p.getStock() == null ? 0 : p.getStock());
    }

    // PATCH setea el stock a un valor exacto: /api/productos/{id}/stock?value=10
    @PatchMapping("/{id}/stock")
    public ResponseEntity<Producto> setStock(@PathVariable Long id, @RequestParam int value) {
        if (value < 0)
            return ResponseEntity.badRequest().build();
        Producto p = productoServices.obtenerId(id);
        p.setStock(value);
        return ResponseEntity.ok(productoServices.actualizar(id, p));
    }

    // PATCH ajusta stock con delta: /api/productos/{id}/stock/ajustar?delta=-1
    @PatchMapping("/{id}/stock/ajustar")
    public ResponseEntity<Producto> ajustarStock(@PathVariable Long id, @RequestParam int delta) {
        Producto p = productoServices.obtenerId(id);
        int base = p.getStock() == null ? 0 : p.getStock();
        int nuevo = base + delta;
        if (nuevo < 0)
            return ResponseEntity.badRequest().build();
        p.setStock(nuevo);
        return ResponseEntity.ok(productoServices.actualizar(id, p));
    }

}