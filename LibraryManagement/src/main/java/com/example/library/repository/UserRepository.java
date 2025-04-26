package com.example.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.library.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // Métodos de consulta adicionales pueden ser definidos aquí si se necesitan
}