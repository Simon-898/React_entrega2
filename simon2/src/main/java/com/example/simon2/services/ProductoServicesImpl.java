package com.example.simon2.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.simon2.entities.Producto;
import com.example.simon2.repository.ProductoRepositories;

@Service
public class ProductoServicesImpl implements ProductoServices {

    @Autowired
    private ProductoRepositories productoRepositories;

    @Override
    public Producto crear(Producto producto) {
        return productoRepositories.save(producto);
    }

    @Override
    public Producto obtenerId(Long id) {
        return productoRepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    @Override
    public List<Producto> listarTodas() {
        return (List<Producto>) productoRepositories.findAll();
    }

    @Override
    public void eliminar(Long id) {
        if (!productoRepositories.existsById(id)) {
            throw new RuntimeException("Producto no encontrado");
        }
        productoRepositories.deleteById(id);
    }

    @Override
    public Producto actualizar(Long id, Producto productoActualizado) {
        Producto existente = obtenerId(id);

        if (productoActualizado.getNombre() != null)
            existente.setNombre(productoActualizado.getNombre());
        if (productoActualizado.getDescripcion() != null)
            existente.setDescripcion(productoActualizado.getDescripcion());
        if (productoActualizado.getPrecio() != null)
            existente.setPrecio(productoActualizado.getPrecio());
        if (productoActualizado.getTalla() != null)
            existente.setTalla(productoActualizado.getTalla());

        // activo (siempre viene en boolean)
        existente.setActivo(productoActualizado.isActivo());

        // imagen y stock
        existente.setImageUrl(productoActualizado.getImageUrl());
        if (productoActualizado.getStock() != null && productoActualizado.getStock() >= 0)
            existente.setStock(productoActualizado.getStock());

        // categoría (si llega como objeto con id)
        if (productoActualizado.getCategoria() != null)
            existente.setCategoria(productoActualizado.getCategoria());

        return productoRepositories.save(existente);
    }

    @Override
    public Producto desactivar(Long id) {
        Producto producto = obtenerId(id);
        producto.setActivo(false);
        return productoRepositories.save(producto);
    }

}