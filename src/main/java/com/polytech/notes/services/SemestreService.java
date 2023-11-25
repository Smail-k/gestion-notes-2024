package com.polytech.notes.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.polytech.notes.models.Matiere;
import com.polytech.notes.models.Semestre;

@Service
public interface SemestreService {

	Semestre saveSemestre(Semestre s);
	Semestre findSemestreById(Long id);
	Semestre findSemestreByCode(String code);
	List<String> allSemestres();
	List<Matiere> matiereOfSemestre(String sem);
}
