package com.polytech.notes.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.Data;


@Entity
@Data
public class Etudiant {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nom;
	private String prenom;
	private boolean ppes;
	private String description;
	private boolean tierTemps;
	private boolean boursier;
	private String nationalite;
	private String tele;
	@Column(unique = true)
	private String numero;
	@OneToMany(targetEntity = Note.class,cascade = CascadeType.ALL)
	//@JsonIgnore
	@JoinColumn(name="etudiant_id",referencedColumnName = "id")
	private List<Note> notes;
	@ManyToOne
	private Promotion promotion; 
	private String annee;
	@OneToOne
	private Mobilite mobilite;
	@OneToMany
	@JoinColumn(name = "etudiant_id")
	private List<Stage> stages; 
	
	
	
	public Etudiant() {
		super();
	}

	public Etudiant(String nom, String prenom, List<Note> notes) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.notes = notes;
	}

	
}
