package com.polytech.notes.services;

import java.util.List;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.polytech.notes.models.Etudiant;
import com.polytech.notes.models.Mobilite;
import com.polytech.notes.models.Note;
import com.polytech.notes.models.Promotion;
import com.polytech.notes.models.Session;
import com.polytech.notes.repositories.EtudiantRepository;
import com.polytech.notes.repositories.MobiliteRepository;

@Service
public class EtudiantServiceDefault implements EtudiantService{

	@Autowired
	private EtudiantRepository repository;
	@Autowired
	private MobiliteRepository mobiliteRepo;
	
	
	@Override
	public Etudiant saveEtudiant(Etudiant e) {
		if(repository.getEtudiantByNumero(e.getNumero())==null)
			return repository.save(e);
		return null;
	}

	@Override
	public Etudiant modifyEtudiant(Etudiant e) {
		//id doesn't change (fixed)
		Etudiant existingEtudiant= repository.findById(e.getId()).orElse(null);
		if(existingEtudiant==null)
			return null;
		existingEtudiant.setNom(e.getNom());
		existingEtudiant.setNotes(e.getNotes());
		existingEtudiant.setNumero(e.getNumero());
		existingEtudiant.setPrenom(e.getPrenom());
		existingEtudiant.setPromotion(e.getPromotion());
		repository.save(existingEtudiant);
		return e;
	}

	public void deleteEtudiantById(Etudiant e) {
		repository.deleteById(e.getId());
	}
	
	public void deleteEtudiantByNumero(String numero) {
		repository.deleteEtudiantByNumero(numero);
	}

	@Override
	public Etudiant getEtudiantByNumero(String numero) {
		return repository.getEtudiantByNumero(numero);
	}

	@Override
	public Etudiant getNoteEtudiantByNumero(String numero, String annee) {
		return repository.findEtudiantByNumeroAndNotesAnnee(numero, annee);
	}

	@Override
	public Etudiant getNoteEtudiantByNom(String nom, String annee) {
		return repository.findEtudiantByNomAndNotesAnnee(nom, annee);
	}
	
//	public List<Note> getNoteAnnee(String nom,String prenom,String niveau) { //niveau : 3A,4A,5A
//		List<Note> notes;
//		Note n;
//		switch (niveau) {
//		case "3A":
//			notes= getNoteSemestre(nom,prenom,"SEM 5");
//			n = notes.get(notes.size()-1);
//			notes.remove(notes.size()-1);
//			notes.addAll(getNoteSemestre(nom,prenom,"SEM 6"));
//			notes.add(notes.size()-1, n);
//			break;
//		case "4A":
//			notes= getNoteSemestre(nom,prenom,"SEM 7");
//			n = notes.get(notes.size()-1);
//			notes.remove(notes.size()-1);
//			notes.addAll(getNoteSemestre(nom,prenom,"SEM 8"));
//			notes.add(notes.size()-1, n);
//			break;
//		case "5A":
//			notes= getNoteSemestre(nom,prenom,"SEM 9");
//			n = notes.get(notes.size()-1);
//			notes.remove(notes.size()-1);
//			notes.addAll(getNoteSemestre(nom,prenom,"SEM 10"));
//			notes.add(notes.size()-1, n);
//			break;
//		default:
//			return null;
//		}
//		Note finale = new Note();
//		finale.setNote((notes.get(notes.size()-2).getNote()+notes.get(notes.size()-1).getNote())/2);
//		notes.add(finale);
//		return notes;
//	}
	
	public List<Object[]> getNoteSemestre(String sem,String promo,String anneeUniv) {
		System.out.println(sem+"-"+promo+"-"+anneeUniv);
		List<Etudiant> list= repository.getEtudiantsByPromotion(promo, anneeUniv);
		List<Object[]> resultats = new Vector<Object[]>();
		System.out.println(list.size()+"***");
		for (Etudiant etudiant : list) {
			Double noteFinale=0.0;
			Double totalCoefficient=1.0;
			List<Note> notes= repository.getEtudiantByPromotionAndAnneeUniv(etudiant.getNom(), etudiant.getPrenom(),anneeUniv);
			if(etudiant.getNumero().equals("1074172"))
				System.out.println(notes+"---------------------------------------");
			if(notes.size()==0)
				return null;
			for (Note note : notes) {
				if(note.getUnite()!=null && note.getUnite().getSemestre().getNom().equals(sem) && note.getSession()==Session.normale) {//isSituation = validé
					noteFinale+= note.getNote()*note.getUnite().getCoefficient();
					//System.out.println("----------------------------------"+sem+"****"+note.getUnite().getSemestre().getNom());
					if(totalCoefficient==1.0)
						totalCoefficient=note.getUnite().getSemestre().getSemestreCoefficient();
					System.out.println(totalCoefficient+"----------------------------------"+notes);
				}else if(note.getUnite()!=null && note.getUnite().getSemestre().getNom().equals(sem) && note.getSession()==Session.rattrapage) {
					//System.out.println("..---....");
					noteFinale+= note.getNote()*note.getUnite().getCoefficient();
					if(totalCoefficient==1.0)
						totalCoefficient=note.getUnite().getSemestre().getSemestreCoefficient();
				}
			}
			if(totalCoefficient!=1.0) {
				Object [] resEtudiant = new Object[] {etudiant.getNom(),etudiant.getPrenom(),etudiant.getNumero(),noteFinale/totalCoefficient,sem};
				resultats.add(resEtudiant);
			}
			
		}
		return resultats;
	}

	
	
	@Override
	public List<Etudiant> getEtudiants(String p, String annee) {
		List<Etudiant> etudiants; 
		if(p.toLowerCase().equals("3a"))
		{
			etudiants=repository.getEtudiantsByPromotion("3afise", annee);
			etudiants.addAll(repository.getEtudiantsByPromotion("3afisa", annee));
			return etudiants;
		}
		else if(p.toLowerCase().equals("4a"))
		{
			etudiants=repository.getEtudiantsByPromotion("4afise", annee);
			etudiants.addAll(repository.getEtudiantsByPromotion("4afisa", annee));
			return etudiants;
		}
		else if(p.toLowerCase().equals("5a"))
		{
			etudiants=repository.getEtudiantsByPromotion("5afise", annee);
			etudiants.addAll(repository.getEtudiantsByPromotion("5afisa", annee));
			return etudiants;
		}
		
		
		return repository.getEtudiantsByPromotion(p, annee);
	}
	
	@Override
	public List<String> getAnneeUniversitaires() {
		return repository.findAnneeUniversitaires();
	}
	
	@Override
	public List<String> getPromotions() {
		return repository.findPromotions();
	}

	@Override
	public List<Etudiant> getAll() {
		return repository.findAll();
	}
	
	@Override
	public String lastEtudiantNumero() {
		return Integer.parseInt(repository.findLastNumero())+1+"";
	}
	@Override
	public List<Object[]> getEtudiantsMoyenneModules(String p, String annee) {
//		List<Etudiant> etudiants = repository.getEtudiantsByPromotion(p, annee);
//		List<Note> list ;
//		for (Etudiant etudiant : etudiants) {
//			list = new Vector<Note>();
//			for (Note n : etudiant.getNotes()) {
//				System.out.println(n.getMatiere()+"---");
//				if(n.getMatiere()==null) {
//					System.out.println("///////////////");
//					//etudiant.getNotes().remove(n);
//					list.add(n);
//				}
//			}
//			etudiant.setNotes(list);
//		}
//		return etudiants;
		return repository.getListeEtudiantsMoyennesModules(p,annee);
	}

	@Override
	public List<Object[]> getEtudiantRattrapage(String promo,String annee) {
		return repository.etudiantsRattrapages(promo, annee);
	}
	
	@Override
	public List<Object[]> getRedoublantsByPromotion(String promo,String annee) {
		return repository.etudiantsRedoublants(promo, annee);
	}

	@Override
	public List<String> listeRattrapagesEtudiant(String annee, String numero) {
		List<String> list=new Vector<String>();
		for (String unite : repository.unitesARattrapper(annee, numero)) {
			list.addAll(repository.matieresRatt(annee, numero, unite));
		} 
		return list;
	}

	@Override
	public List<Object[]> listeDesAdmisRatt(String annee, String promo) {
		return repository.listeAdmisApresRatt(annee, promo);
	}

	@Override
	public List<Object[]> listeDesAdmisPrin(String annee, String promo) {
		return repository.listeAdmisEnPrincipale(annee, promo);
	}
	
	public List<Object[]> moyennesUniteBySem(String promo,String annee,String sem,String numero) {
		return repository.getEtudiantMoyennesModulesBySem(promo,annee,sem,numero);
	}

	@Override
	public void setMobilite(String numero, Mobilite mobilite) {
		Mobilite m =mobiliteRepo.save(mobilite);
		Etudiant e= repository.getEtudiantByNumero(numero);
		e.setMobilite(m);
		repository.save(e);
	}
	
	
}