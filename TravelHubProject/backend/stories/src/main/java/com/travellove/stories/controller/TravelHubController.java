package com.travellove.stories.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travellove.stories.entity.TravelHub;
import com.travellove.stories.repository.TravelHubRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/travelhub")
public class TravelHubController {

    private final TravelHubRepository repo;

    public TravelHubController(TravelHubRepository repo){
        this.repo=repo;
    }

    // CREATE
    @PostMapping
    public TravelHub create(@RequestBody TravelHub hub) {
        return repo.save(hub);
    }

     // READ ALL
    @GetMapping
    public List<TravelHub> getAll() {
        return repo.findAll();
    }

    //READ BY ID
    @GetMapping("/{id}")
    public TravelHub getById(@PathVariable int id) {
        return repo.findById(id).orElse(null);
    }

    //UPDATE
    @PutMapping("/{id}")
    public TravelHub update(@PathVariable int id, @RequestBody TravelHub hub) {
       hub.setId(id);
       return repo.save(hub);
    }

    //DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id){
        repo.deleteById(id);
    }
    
   


}
