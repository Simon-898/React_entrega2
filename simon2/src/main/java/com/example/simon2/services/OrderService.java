package com.example.simon2.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.simon2.dto.CheckoutItem;
import com.example.simon2.dto.CreateOrderDTO;
import com.example.simon2.dto.OrderItemDTO;
import com.example.simon2.dto.OrderResponseDTO;
import com.example.simon2.entities.Order;
import com.example.simon2.entities.OrderItem;
import com.example.simon2.entities.Producto;
import com.example.simon2.entities.Usuario;
import com.example.simon2.repository.OrderRepository;
import com.example.simon2.repository.ProductoRepositories;
import com.example.simon2.repository.UsuarioRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductoRepositories productoRepository;
    private final UsuarioRepository usuarioRepository;

    @Transactional
    public OrderResponseDTO createOrder(CreateOrderDTO dto) {
        // Validaciones
        if (dto.getItems() == null || dto.getItems().isEmpty()) {
            throw new IllegalArgumentException("La orden debe contener al menos un producto");
        }

        // Obtener usuario
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        // Crear orden
        Order order = new Order();
        order.setUsuario(usuario);
        order.setTotal(BigDecimal.ZERO);

        BigDecimal total = BigDecimal.ZERO;
        List<OrderItem> items = new ArrayList<>();

        // Procesar cada item y decrementar stock
        for (CheckoutItem checkoutItem : dto.getItems()) {
            Producto producto = productoRepository.findById(checkoutItem.getProductoId())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Producto no encontrado: " + checkoutItem.getProductoId()));

            // Verificar stock
            if (producto.getStock() < checkoutItem.getCantidad()) {
                throw new IllegalArgumentException(
                        "Stock insuficiente para: " + producto.getNombre());
            }

            // Decrementar stock
            producto.setStock(producto.getStock() - checkoutItem.getCantidad());
            productoRepository.save(producto);

            // Crear item de orden
            OrderItem orderItem = new OrderItem();
            orderItem.setProducto(producto);
            orderItem.setCantidad(checkoutItem.getCantidad());
            orderItem.setTalla(checkoutItem.getTalla());
            orderItem.setPrecioUnitario(BigDecimal.valueOf(producto.getPrecio()));
            orderItem.setOrder(order);

            items.add(orderItem);

            // Sumar al total
            BigDecimal subtotal = BigDecimal.valueOf(producto.getPrecio())
                    .multiply(BigDecimal.valueOf(checkoutItem.getCantidad()));
            total = total.add(subtotal);
        }

        order.setItems(items);
        order.setTotal(total);

        // Guardar orden
        Order savedOrder = orderRepository.save(order);

        // Convertir a DTO
        return convertToDTO(savedOrder);
    }

    public OrderResponseDTO getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Orden no encontrada"));
        return convertToDTO(order);
    }

    public List<OrderResponseDTO> getOrdersByCustomerId(Long customerId) {
        List<Order> orders = orderRepository.findByUsuarioId(customerId);
        return orders.stream().map(this::convertToDTO).toList();
    }

    private OrderResponseDTO convertToDTO(Order order) {
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setId(order.getId());
        dto.setUsuarioId(order.getUsuario().getId());
        dto.setUsuarioEmail(order.getUsuario().getEmail());
        dto.setTotal(order.getTotal());
        dto.setFechaCreacion(order.getFechaCreacion());

        List<OrderItemDTO> itemDTOs = new ArrayList<>();
        for (OrderItem item : order.getItems()) {
            OrderItemDTO itemDTO = new OrderItemDTO();
            itemDTO.setId(item.getId());
            itemDTO.setProductoId(item.getProducto().getId());
            itemDTO.setProductoNombre(item.getProducto().getNombre());
            itemDTO.setCantidad(item.getCantidad());
            itemDTO.setTalla(item.getTalla());
            itemDTO.setPrecioUnitario(item.getPrecioUnitario());
            itemDTO.setSubtotal(item.getSubtotal());
            itemDTOs.add(itemDTO);
        }

        dto.setItems(itemDTOs);
        return dto;
    }
}
