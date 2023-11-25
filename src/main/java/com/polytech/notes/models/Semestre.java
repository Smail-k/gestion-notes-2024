package com.polytech.notes.models;

import java.util.List;
import java.util.Vector;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity

public class Semestre {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nom;
	@Column(unique = true)
	private String code;
	@OneToMany(targetEntity = Unite.class,cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	@JoinColumn(name="semestre_id",referencedColumnName = "id")
	@JsonIgnore
	private List<Unite> unites=new Vector<Unite>();
	
	public Semestre(String nom, String code) {
		super();
		this.nom = nom;
		this.code = code;
	}
	
	public Semestre(Long id, String nom, String code, List<Unite> unites) {
		super();
		this.id = id;
		this.nom = nom;
		this.code = code;
		this.unites = unites;
	}

	public Semestre() {
		super();
	}

	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getNom() {
		return nom;
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

	public List<Unite> getUnites() {
		return unites;
	}

	public void setUnites(List<Unite> unites) {
		this.unites = unites;
	}

	@Override
	public String toString() {
		return "Semestre [id=" + id + ", nom=" + nom + ", code=" + code + ", unites=" + unites + "]";
	}
	public Double getSemestreCoefficient() {
		Double value=0.0;
		for (Unite unite : unites) {
			value+=unite.getCoefficient();
		}
		return value;
	}
	
}