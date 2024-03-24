package com.polytech.notes.models;

import java.util.List;
import java.util.Vector;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity

public class Unite {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true)
	private String code;
	private String libelle;
	@ManyToOne
	//@JsonIgnore
	private Semestre semestre;
	private double coefficient;
	
	@OneToMany(mappedBy = "unite",cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Matiere> matieres=new Vector<Matiere>();

	
	
	

	public Unite() {
		super();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getLibelle() {
		return libelle;
	}
	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
	public List<Matiere> getMatieres() {
		return matieres;
	}

	public void setMatieres(List<Matiere> matiere) {
		this.matieres = matiere;
	}
	public Semestre getSemestre() {
		return semestre;
	}
	public void setSemestre(Semestre semestre) {
		this.semestre = semestre;
	}
	public void setCoefficient(double coefficient) {
		this.coefficient = coefficient;
	}
	public double getCoefficient() {
		return coefficient;
	}
	
}
