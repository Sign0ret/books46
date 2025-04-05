package com.example.library.controller;

import com.example.library.model.Patron;
import com.example.library.repository.PatronRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patrons")
public class PatronController {

    @Autowired
    private PatronRepository patronRepository;

    @GetMapping
    public List<Patron> getAllPatrons() {
        return patronRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patron> getPatronById(@PathVariable Long id) {
        return patronRepository.findById(id)
                .map(patron -> ResponseEntity.ok().body(patron))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Patron createPatron(@RequestBody Patron patron) {
        return patronRepository.save(patron);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patron> updatePatron(@PathVariable Long id, @RequestBody Patron patronDetails) {
        return patronRepository.findById(id)
                .map(patron -> {
                    patron.setFirstName(patronDetails.getFirstName());
                    patron.setLastName(patronDetails.getLastName());
                    patron.setEmail(patronDetails.getEmail());
                    patron.setPhoneNumber(patronDetails.getPhoneNumber());
                    patron.setAddress(patronDetails.getAddress());
                    patron.setCity(patronDetails.getCity());
                    patron.setState(patronDetails.getState());
                    patron.setZipCode(patronDetails.getZipCode());
                    patron.setDateOfBirth(patronDetails.getDateOfBirth());
                    patron.setMembershipStatus(patronDetails.getMembershipStatus());
                    patron.setLastVisit(patronDetails.getLastVisit());

                    Patron updatedPatron = patronRepository.save(patron);
                    return ResponseEntity.ok(updatedPatron);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatron(@PathVariable Long id) {
        return patronRepository.findById(id)
                .map(patron -> {
                    patronRepository.delete(patron);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}