package com.travellove.stories.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travellove.stories.entity.TravelHub;

public interface TravelHubRepository extends JpaRepository<TravelHub,Integer> {
	
}
