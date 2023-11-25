package com.polytech.notes.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.polytech.notes.models.Matiere;
import com.polytech.notes.models.Note;
import com.polytech.notes.models.Session;
import com.polytech.notes.models.Unite;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long>{

	Note findNoteByEtudiantNumeroAndMatiereCode(String numero,String code); 
	Note findByEtudiantNomAndEtudiantPrenomAndMatiereCode(String nom,String prenom,String code); 
	Note findNoteByUniteCodeAndEtudiantNumero(String code,String numero);
	@Query("select n.etudiant.numero,n.etudiant.nom,n.etudiant.prenom,n.matiere.libelle,n.note from Note n where "
			+ "n.matiere.unite.code=:code and n.etudiant.numero=:numero and n.annee=:annee")
	List<Object[]> getNoteMatieresOfUnite(String code,String numero,String annee);
	@Query("select n from Note n where "
			+ "n.matiere.unite.code=:code and n.etudiant.numero=:numero and n.annee=:annee")
	List<Note> getListNoteMatieresOfUnite(String code,String numero,String annee);
	
	List<Note> findNoteByMatiereUniteCodeAndEtudiantNomAndEtudiantPrenom(String u,String nom,String prenom);
	Note findNoteByUniteCodeAndEtudiantNomAndEtudiantPrenom(String code,String nom,String prenom);
	//List<Note> findNoteByUnite
	@Query("select n from Note n where n.matiere is not null and n.matiere.code=:code and n.session=:session and n.etudiant.numero=:numero")
	Note getNoteEtudiantBySession(String code,Session session,String numero);
}