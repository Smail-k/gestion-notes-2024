package com.polytech.notes.models;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity

public class Note {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private double note; 
	private boolean situation; 	
	@OneToOne
	private Matiere matiere; 
	@OneToOne
	private Semestre semestre; 
	//@JsonIgnore
	@OneToOne
	private Unite unite;
	@JsonIgnore
	@ManyToOne
	private Etudiant etudiant;
	private String annee;
    @Enumerated(EnumType.STRING)
	private Session session;
	
	public Note(double note, boolean situation, Matiere matiere,Unite unite,Etudiant e) {
		super();
		this.note = note;
		this.situation = situation;
		this.matiere = matiere;
		if(matiere!=null)
			this.unite=matiere.getUnite();
		this.etudiant=e;
	}
	
	public Note() {
		super();
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public double getNote() {
		return note;
	}
	public void setNote(double note) {
		this.note = note;
	}
	public boolean isSituation() {
		return situation;
	}
	public void setSituation(boolean situation) {
		this.situation = situation;
	}
	public Matiere getMatiere() {
		return matiere;
	}
	public void setMatiere(Matiere matiere) {
		this.matiere = matiere;
	}
	
	public Etudiant getEtudiant() {
		return etudiant;
	}
	
	public void setEtudiant(Etudiant etudiant) {
		this.etudiant = etudiant;
	}
	public void setUnite(Unite unite) {
		this.unite = unite;
	}
	public Unite getUnite() {
		return unite;
	}
	public void setAnnee(String annee) {
		this.annee = annee;
	}
	public String getAnnee() {
		return annee;
	}
	public Session getSession() {
		return session;
	}
	public void setSession(Session session) {
		this.session = session;
	}

	@Override
	public String toString() {
		return "Note [id=" + id + ", note=" + note + "]";
	}
	
}