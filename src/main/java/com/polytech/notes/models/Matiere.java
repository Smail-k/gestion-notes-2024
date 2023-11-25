package com.polytech.notes.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;




@Entity
public class Matiere {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true)
	private String code; 
	private double coefficient; 
	private String libelle; 
	@ManyToOne(fetch = FetchType.EAGER)
	//@JsonIgnore
	@JoinColumn(name="unite_id")
	private Unite unite;
	
	
	public Matiere(String code, double coefficient, String libelle, Unite unite) {
		super();
		this.code = code;
		this.coefficient = coefficient;
		this.libelle = libelle;
		this.unite = unite;
	}
	
	public Matiere() {
		// TODO Auto-generated constructor stub
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
	public double getCoefficient() {
		return coefficient;
	}
	public void setCoefficient(double coefficient) {
		this.coefficient = coefficient;
	}
	public String getLibelle() {
		return libelle;
	}
	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
	public Unite getUnite() {
		return unite;
	}
	public void setUnite(Unite unite) {
		this.unite = unite;
	}

	@Override
	public String toString() {
		return "Matiere [id=" + id + ", code=" + code + ", coefficient=" + coefficient + ", libelle=" + libelle
				+ ", unite=" + unite + "]";
	}
	
	
}
