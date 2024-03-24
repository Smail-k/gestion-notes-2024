package com.polytech.notes.services;

import java.util.List;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.polytech.notes.models.Matiere;
import com.polytech.notes.models.Note;
import com.polytech.notes.models.Unite;
import com.polytech.notes.repositories.UniteRepository;

@Service
public class UniteServiceDefault implements UniteService{

	@Autowired
	private UniteRepository repository;

	@Override
	public Unite saveModule(Unite u) {
		if(repository.findUniteByCode(u.getCode())==null)
			return repository.save(u);
		return null;
	}

	@Override
	public Unite findUniteByLibelle(String libelle) {
		return repository.findUniteBylibelle(libelle);
	}

	@Override
	public Unite findUniteByCode(String codeUnite) {
		return repository.findUniteByCode(codeUnite);
	}

	@Override
	public List<Unite> findUniteByPromo(String nom) {
		List<Unite> list=null;
		if(nom.equals("3A")) {
			list=repository.findUniteBySemestreNom("SEM 5");
			list.addAll(repository.findUniteBySemestreNom("SEM 6"));
		}
		else if(nom.equals("4A")) {
			list=repository.findUniteBySemestreNom("SEM 7");
			list.addAll(repository.findUniteBySemestreNom("SEM 8"));
		}
		else if(nom.equals("5A")) {
			list=repository.findUniteBySemestreNom("SEM 9");
			list.addAll(repository.findUniteBySemestreNom("SEM 10"));
		}
		
		return list;
	}
	 
	@Override
	public List<Unite> findAll(){
		return repository.findAll();
	}

	@Override
	public List<Matiere> findUniteMatiereByCode(String code) {
		return repository.findUniteByCode(code).getMatieres();
	}
	public List<Object[]> getEtudiantUniteNonValidee(String etudiant,String annee){
		List<Object[]> tab= repository.getUniteNonValidee(annee,etudiant);
		List<Object[]> l=new Vector<Object[]>();
		for (Object[] unite : tab) {
			l.addAll(getMatiereNonValidee(etudiant,unite[0]+""));
			
		}
		
		return l;
	}

	@Override
	public List<Object[]> getMatiereNonValidee(String etudiant, String unite) {
		return repository.getMatiereNonValidee(etudiant, unite);
	}
}
