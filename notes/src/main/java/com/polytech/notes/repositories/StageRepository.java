package com.polytech.notes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.polytech.notes.models.Stage;

@Repository
public interface StageRepository extends JpaRepository<Stage, Long>{

}
