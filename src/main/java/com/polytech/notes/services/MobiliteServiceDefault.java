package com.polytech.notes.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.polytech.notes.models.Etudiant;
import com.polytech.notes.models.Mobilite;
import com.polytech.notes.repositories.MobiliteRepository;

@Service
public class MobiliteServiceDefault implements MobiliteService{

	@Autowired
	private EtudiantService etudiantService; 
	@Autowired
	private MobiliteRepository mobiliteRepo;
	@Autowired
	private AnneeUnivService anneeService;
	
	public Mobilite addMobilite(Mobilite mobilite) {
		System.out.println(mobilite);
		Etudiant e = etudiantService.getEtudiantByNumero(mobilite.getEtudiant().getNumero());
		mobilite.setEtudiant(e);
		mobilite.setAnnee(anneeService.getAnneeUniversitaire(mobilite.getAnnee().getAnnee()));
		e.setMobilite(mobilite);
		return mobiliteRepo.save(mobilite);
	}

}
