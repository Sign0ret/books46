package com.example.library.repository;

import com.example.library.model.Patron;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatronRepository extends JpaRepository<Patron, Long> {
    // Métodos de consulta adicionales pueden ser definidos aquí si se necesitan
}