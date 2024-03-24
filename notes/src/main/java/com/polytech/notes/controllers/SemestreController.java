package com.polytech.notes.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.polytech.notes.models.Matiere;
import com.polytech.notes.services.SemestreService;

@RestController
@RequestMapping("/api/semestre")
public class SemestreController {

	@Autowired
	private SemestreService semestre;
	
	@GetMapping("/all")
	public List<String> semestres() {
		return semestre.allSemestres();
	}
	
	@GetMapping("/matieres")
	public List<Matiere> matieresSemstre(String sem) {
		return semestre.matiereOfSemestre(sem);
	}
	
}