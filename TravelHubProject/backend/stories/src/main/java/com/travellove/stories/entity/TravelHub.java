package com.travellove.stories.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="travelhub")
@JsonPropertyOrder({"id", "place", "description", "image", "travelDate"})
public class TravelHub {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    @Column(name="place")
    private String place;

    @Column(name="description")
    private String description;

    @Column(name="image")
    private String image;

    @Column(name="travel_date")
    private LocalDate travelDate;

    public TravelHub(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDate getTravelDate() {
        return travelDate;
    }

    public void setTravelDate(LocalDate travelDate) {
        this.travelDate = travelDate;
    }

    


    
}
