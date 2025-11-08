package com.example.simon2.services;

import com.example.simon2.dto.CheckoutItem;
import com.example.simon2.dto.CheckoutRequest;
import com.example.simon2.repository.ProductoRepositories;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CheckoutServiceImpl implements CheckoutService {

    private final ProductoRepositories productoRepo;

    @Override
    @Transactional
    public void checkout(CheckoutRequest request) {
        if (request == null || request.getItems() == null || request.getItems().isEmpty()) {
            return;
        }

        for (CheckoutItem it : request.getItems()) {
            int ok = productoRepo.descontarStockSiAlcanza(it.getProductoId(), it.getCantidad());
            if (ok == 0) {
                throw new IllegalStateException(
                    "Sin stock suficiente para producto id=" + it.getProductoId() +
                    " (cantidad solicitada: " + it.getCantidad() + ")"
                );
            }
        }
    }
}
