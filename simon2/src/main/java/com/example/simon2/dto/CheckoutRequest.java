package com.example.simon2.dto;

import lombok.Data;
import java.util.List;

@Data
public class CheckoutRequest {
    private List<CheckoutItem> items;
}
