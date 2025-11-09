package com.example.simon.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        // No hay header o no es Bearer => seguir la cadena sin autenticar
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(7);

        try {
            String username = jwtService.extractUsername(token);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // 1) leer claim "rol" del token
                String claimRole = jwtService.extractClaim(token, claims -> (String) claims.get("rol"));
                // 2) normalizar y dejarlo como final
                final String role = (claimRole == null ? "USER" : claimRole).toUpperCase();

                // 3) construir authorities con prefijo ROLE_
                Collection<? extends GrantedAuthority> authorities =
                        Collections.singleton(new SimpleGrantedAuthority("ROLE_" + role));

                // 4) validar y autenticar
                if (jwtService.isTokenValid(token, username)) {
                    User principal = new User(username, "", authorities);
                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(principal, null, authorities);

                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        } catch (Exception e) {
            System.out.println("⚠️ JWT inválido: " + e.getMessage());
        }

        // 👇 MUY IMPORTANTE: continuar con el resto de filtros / endpoint
        filterChain.doFilter(request, response);
    }
}
