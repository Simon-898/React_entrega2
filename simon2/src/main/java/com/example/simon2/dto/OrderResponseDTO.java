package com.example.simon2.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {
    private Long id;
    private Long usuarioId;
    private String usuarioEmail;
    private BigDecimal total;
    private LocalDateTime fechaCreacion;
    private List<OrderItemDTO> items;
}
