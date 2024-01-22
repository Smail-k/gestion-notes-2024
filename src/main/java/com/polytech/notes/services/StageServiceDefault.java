package com.polytech.notes.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.polytech.notes.models.Etudiant;
import com.polytech.notes.models.Stage;
import com.polytech.notes.repositories.StageRepository;

@Service
public class StageServiceDefault {

	@Autowired
	private EtudiantService etudiantService; 
	@Autowired
	private AnneeUnivService anneeService;
	@Autowired
	private StageRepository stageRepo;
	
	public Stage addStage(Stage s) {
		System.out.println(s);
		Etudiant e = etudiantService.getEtudiantByNumero(s.getEtudiant().getNumero());
		s.setEtudiant(e);
		s.setAnnee(anneeService.getAnneeUniversitaire(s.getAnnee().getAnnee()));
		e.getStages().add(s);
		return stageRepo.save(s);
	}
	
}
