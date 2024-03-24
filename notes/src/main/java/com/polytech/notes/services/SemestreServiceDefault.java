package com.polytech.notes.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.polytech.notes.models.Matiere;
import com.polytech.notes.models.Semestre;
import com.polytech.notes.repositories.SemestreRepository;

@Service
public class SemestreServiceDefault implements SemestreService{

	@Autowired
	private SemestreRepository repository;
	
	@Override
	public Semestre saveSemestre(Semestre s) {
		if(repository.findSemestreByCode(s.getCode())==null)
			return repository.save(s);
		return null;
	}

	@Override
	public Semestre findSemestreById(Long id) {
		return repository.findById(id).orElse(null);
	}

	@Override
	public Semestre findSemestreByCode(String code) {
		return repository.findSemestreByCode(code);
	}

	@Override
	public List<String> allSemestres() {
		return repository.getAllSemestre();
	}

	@Override
	public List<Matiere> matiereOfSemestre(String sem) {
		return repository.getMatieresOfSemestre(sem);
	}

	
}