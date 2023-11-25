package com.polytech.notes.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.polytech.notes.models.Etudiant;
import com.polytech.notes.models.Mobilite;
import com.polytech.notes.models.Note;
import com.polytech.notes.models.PromotionType;

@Service
public interface EtudiantService {

	Etudiant saveEtudiant(Etudiant e);
	Etudiant modifyEtudiant(Etudiant e);
	void deleteEtudiantById(Etudiant e);
	void deleteEtudiantByNumero(String numero);
	Etudiant getEtudiantByNumero(String numero); 
	Etudiant getNoteEtudiantByNumero(String numero,String annee);
	Etudiant getNoteEtudiantByNom(String nom,String annee);
	List<Object[]> getNoteSemestre(String nom,String prenom,String sem);
	//List<Note> getNoteAnnee(String nom,String prenom,String niveau);
	List<Etudiant> getEtudiants(String p,String annee);
	List<Object[]> moyennesUniteBySem(String promo,String annee,String sem,String numero);
	List<String> getAnneeUniversitaires();
	List<String> getPromotions();
	List<Etudiant> getAll();
	String lastEtudiantNumero();
	List<Object[]> getEtudiantsMoyenneModules(String p, String annee);
	List<Object[]> getEtudiantRattrapage(String promo,String annee);
	List<Object[]> getRedoublantsByPromotion(String promo,String annee);
	List<String> listeRattrapagesEtudiant(String annee, String numero);
	List<Object[]> listeDesAdmisRatt(String annee,String promo);
	List<Object[]> listeDesAdmisPrin(String annee,String promo);
	void setMobilite(String numero, Mobilite mobilite);
	
}