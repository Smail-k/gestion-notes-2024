package com.polytech.notes.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.polytech.notes.models.Matiere;
import com.polytech.notes.models.Unite;
import com.polytech.notes.repositories.MatiereRepository;

@Service
public class MatiereServiceDefault implements MatiereService{

	@Autowired
	private MatiereRepository repository;

	@Override
	public Matiere saveMatiere(Matiere m) {
		if(repository.findMatiereByCode(m.getCode())==null)
			return repository.save(m);
		return null;
	}

	@Override
	public Matiere findMatiereById(Long id) {
		return repository.findMatiereById(id);
	}

	@Override
	public List<Matiere> findMatiereByUnite(Unite u) {
		return repository.findMatiereByUnite(u);
	}

	@Override
	public Matiere findMatiereByCode(String code) {
		return repository.findMatiereByCode(code);
	}
	
	
	@Override
	public List<Matiere> findAll() {
		return repository.findAll();
	}

	@Override
	public List<Matiere> matieresBySemestre(String sem) {
		return repository.getMatiereBySemestre(sem);
	}

}
