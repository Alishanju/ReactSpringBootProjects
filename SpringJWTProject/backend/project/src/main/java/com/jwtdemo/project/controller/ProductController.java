package com.jwtdemo.project.controller;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.jwtdemo.project.dto.ProductRequest;
import com.jwtdemo.project.entity.Product;
import com.jwtdemo.project.repository.ProductRepository;


@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository repo;

    public ProductController(ProductRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Product> getAll() {
        return repo.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Product add(@RequestBody ProductRequest req) {
        Product p = new Product();
        p.setName(req.name);
        p.setPrice(req.price);
        p.setImageUrl(req.imageUrl);
        return repo.save(p);
    }
}
