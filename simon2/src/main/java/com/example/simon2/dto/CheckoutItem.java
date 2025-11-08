package com.example.simon2.dto;

import lombok.Data;

@Data
public class CheckoutItem {
    private Long productoId;
    private Integer cantidad;
    private String talla; 
}
