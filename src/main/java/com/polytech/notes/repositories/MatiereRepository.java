package com.polytech.notes.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.polytech.notes.models.Matiere;
import com.polytech.notes.models.Unite;

@Repository
public interface MatiereRepository extends JpaRepository<Matiere, Long>{
	Matiere findMatiereById(Long id);
	List<Matiere> findMatiereByUnite(Unite u);
	Matiere findMatiereByCode(String code);
	//Matiere findMatiereByUniteCode(String code);
}
