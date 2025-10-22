package com.example.simon.swagger;

import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@Configuration
@OpenAPIDefinition(
  info = @Info(
    title = "API Ropa",
    version = "1.0.0",
    description = "CRUD Usuarios y Productos"
  )
)
public class OpenApiConfig {}
