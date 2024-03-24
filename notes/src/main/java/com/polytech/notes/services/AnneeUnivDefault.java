package com.polytech.notes.services;

import com.polytech.notes.models.AnneeUniversitaire;
import com.polytech.notes.models.Configuration;
import com.polytech.notes.repositories.AnneeUniversitaireRepository;
import com.polytech.notes.repositories.ConfigurationRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnneeUnivDefault implements AnneeUnivService {
 
	@Autowired
	private AnneeUniversitaireRepository repo;

	@Override
	public AnneeUniversitaire add(AnneeUniversitaire a) {
		return repo.save(a);
	}

	@Override
	public AnneeUniversitaire getAnneeUniversitaire(String annee) {
		return repo.findByAnnee(annee);
	}
}
