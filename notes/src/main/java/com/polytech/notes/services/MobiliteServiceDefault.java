package com.polytech.notes.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.polytech.notes.models.AnneeUniversitaire;
import com.polytech.notes.models.Etudiant;
import com.polytech.notes.models.Mobilite;
import com.polytech.notes.models.Mobilite.TypeMobilite;
import com.polytech.notes.models.Stage;
import com.polytech.notes.repositories.MobiliteRepository;

@Service
public class MobiliteServiceDefault implements MobiliteService{

	@Autowired
	private EtudiantService etudiantService; 
	@Autowired
	private MobiliteRepository mobiliteRepo;
	@Autowired
	private AnneeUnivService anneeService;
	@Autowired
	private StageServiceDefault stageService;
	
	
	public Mobilite addMobilite(Mobilite mobilite) {
		//System.out.println(mobilite);
		Etudiant e = etudiantService.getEtudiantByNumero(mobilite.getEtudiant().getNumero());
		mobilite.setEtudiant(e);
		mobilite.setAnnee(anneeService.getAnneeUniversitaire(mobilite.getAnnee().getAnnee()));
		e.setMobilite(mobilite);
		
		// if the mobility is an internship we must add it in internship table
		
		
		
		Mobilite m = mobiliteRepo.save(mobilite);
		
		if(mobilite.getType()==TypeMobilite.stage) {
			Stage s = new Stage();
			AnneeUniversitaire an = new AnneeUniversitaire();
			an.setAnnee(mobilite.getAnnee().getAnnee());
			s.setAnnee(an);
			s.setDateDebut(m.getDateDepart());
			s.setDateFin(m.getDateRetour());
			s.setNumConvention(mobilite.getNumConvention());
			s.setDuree(m.getNbrSem());
			Etudiant et = new Etudiant();
			et.setNumero(m.getEtudiant().getNumero());
			s.setEtudiant(et);
			s.setSociete(m.getSociete());
			s.setDescription(m.getDescription());
			System.out.println(s);
			stageService.addStage(s);
		}
		
		return m;
	}

}
