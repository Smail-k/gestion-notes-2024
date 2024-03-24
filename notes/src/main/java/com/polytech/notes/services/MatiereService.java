package com.polytech.notes.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.polytech.notes.models.Matiere;
import com.polytech.notes.models.Unite;

@Service
public interface MatiereService {

	Matiere saveMatiere(Matiere m);
	Matiere findMatiereById(Long id);
	List<Matiere> findMatiereByUnite(Unite u);
	Matiere findMatiereByCode(String code);
	List<Matiere> findAll();
	List<Matiere> matieresBySemestre(String sem);
}
