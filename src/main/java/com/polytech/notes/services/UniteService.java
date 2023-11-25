package com.polytech.notes.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.polytech.notes.models.Matiere;
import com.polytech.notes.models.Unite;

@Service
public interface UniteService {

	Unite saveModule(Unite m);
	Unite findUniteByLibelle(String libelle);
	Unite findUniteByCode(String codeUnite);
	List<Unite> findUniteByPromo(String nom);
	List<Unite> findAll();
	List<Matiere> findUniteMatiereByCode(String code);
	List<Object[]> getEtudiantUniteNonValidee(String etudiant,String annee); 
	List<Object[]> getMatiereNonValidee(String etudiant,String unite);
}
