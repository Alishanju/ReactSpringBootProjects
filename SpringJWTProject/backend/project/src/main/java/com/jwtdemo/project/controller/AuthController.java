package com.jwtdemo.project.controller;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.jwtdemo.project.config.JwtUtil;
import com.jwtdemo.project.dto.AuthRequest;
import com.jwtdemo.project.dto.AuthResponse;
import com.jwtdemo.project.entity.User;
import com.jwtdemo.project.exception.InvalidCredentialsException;
import com.jwtdemo.project.exception.UserNotFoundException;
import com.jwtdemo.project.repository.UserRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository repo,
                          PasswordEncoder encoder,
                          JwtUtil jwtUtil) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public void register(@RequestBody AuthRequest req) {
        User user = new User();
        user.setUsername(req.username);
        user.setPassword(encoder.encode(req.password));
        user.setRole("ROLE_USER");
        repo.save(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest req) {
      User user = repo.findByUsername(req.username)
                .orElseThrow(() -> new UserNotFoundException(req.username));

        if (!encoder.matches(req.password, user.getPassword())) {
            throw new InvalidCredentialsException();
        }
        return new AuthResponse(
                jwtUtil.generateToken(user.getUsername(), user.getRole())
        );
    }
}
