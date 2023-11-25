package com.polytech.notes.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class AnneeUniversitaire {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String annee;
	
	public AnneeUniversitaire() {
		// TODO Auto-generated constructor stub
	}
	public AnneeUniversitaire(String annee) {
		this.annee = annee;
	}
	
}