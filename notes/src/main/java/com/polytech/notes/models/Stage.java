package com.polytech.notes.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Entity
@Data
public class Stage {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private int duree; 
	private String societe; 
	private String description;
	private String dateDebut;
	private String dateFin;
	private String numConvention;
	@OneToOne
	private AnneeUniversitaire annee;
	@OneToOne
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Etudiant etudiant;  
	
	
	
}
