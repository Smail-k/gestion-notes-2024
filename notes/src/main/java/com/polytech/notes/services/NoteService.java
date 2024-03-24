package com.polytech.notes.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.polytech.notes.models.Matiere;
import com.polytech.notes.models.Note;
import com.polytech.notes.models.Session;
import com.polytech.notes.models.Unite;

@Service
public interface NoteService {

	Note getNoteEtudiantByMatiere(String numero,String code);
	Note getNoteEtudiantByNomAndMatiere(String nom,String prenom,String code);
	Note saveNote(Note note);
	Note getNoteByUniteCodeAndEtudiantNumero(String code,String numero);
	List<Object[]> getNoteByMatiereUnite(String code, String numero,String annee);
	List<Note> getListNoteByMatiereUnite(String code, String numero,String annee);
	List<Note> getNoteByUnite(String u, String nom, String prenom);
	Note getTotalNoteUnite(String unite, String nom, String prenom);
	Note getNoteEtudiantBySession(String code, Session s, String numero);
	Note ModifyNote(Long id,double note);
}
