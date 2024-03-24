package com.polytech.notes.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.polytech.notes.models.Matiere;
import com.polytech.notes.services.MatiereService;

@RestController
@RequestMapping("/matieres")
public class MatiereController {

	@Autowired
	private MatiereService service;
	
	@GetMapping("/all")
	public List<Matiere> all(){
		return service.findAll();
	}
	
	@GetMapping("/sem/{sem}")
	public List<Matiere> matieresBySem(@PathVariable String sem){
		return service.matieresBySemestre(sem);
	}
	
}
