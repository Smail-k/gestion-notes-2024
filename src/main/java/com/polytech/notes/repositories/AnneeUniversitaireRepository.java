package com.polytech.notes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.polytech.notes.models.AnneeUniversitaire;
import java.lang.String;

public interface AnneeUniversitaireRepository  extends JpaRepository<AnneeUniversitaire, Long> {
	
	AnneeUniversitaire findByAnnee(String annee);
	
}