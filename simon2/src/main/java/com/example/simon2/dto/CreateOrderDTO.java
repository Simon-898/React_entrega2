package com.example.simon2.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderDTO {
    private Long usuarioId;
    private List<CheckoutItem> items;
}
