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
public class Mobilite {

	private enum TypeMobilite{
		stage,
		etude,
		autre
	}
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String pays; 
	private String description; 
	private String ville;
	private int nbrSem;
	private TypeMobilite type;
	@OneToOne
	private AnneeUniversitaire annee;
	private String societe; //si mobilité stage
	private String dateDepart; 
	private String dateRetour; 
	@OneToOne
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Etudiant etudiant;
	
	
}
