package com.example.simon2.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {
    private Long id;
    private Long productoId;
    private String productoNombre;
    private Integer cantidad;
    private String talla;
    private BigDecimal precioUnitario;
    private BigDecimal subtotal;
}
