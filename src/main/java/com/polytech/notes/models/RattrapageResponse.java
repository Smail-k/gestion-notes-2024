package com.polytech.notes.models;

import java.util.List;

public class RattrapageResponse {

	private String numeroEtudiant;
	private String nom;
	private String prenom;
	private List<String> matiereRatts;
	
	public RattrapageResponse(String numeroEtudiant, String nom, String prenom, List<String> matiereRatts) {
		super();
		this.numeroEtudiant = numeroEtudiant;
		this.nom = nom;
		this.prenom = prenom;
		this.matiereRatts = matiereRatts;
	}
	
	public String getNumeroEtudiant() {
		return numeroEtudiant;
	}
	public void setNumeroEtudiant(String numeroEtudiant) {
		this.numeroEtudiant = numeroEtudiant;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public List<String> getMatiereRatts() {
		return matiereRatts;
	}
	public void setMatiereRatts(List<String> matiereRatts) {
		this.matiereRatts = matiereRatts;
	}
	
}