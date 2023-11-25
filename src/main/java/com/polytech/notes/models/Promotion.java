package com.polytech.notes.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Promotion {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String promo;
	@ManyToOne
	private AnneeUniversitaire annee;
	
	public Promotion() {
	}

	public Promotion(String promo, AnneeUniversitaire annee) {
		super();
		this.promo = promo;
		this.annee = annee;
	}

	public Promotion(String promo) {
		super();
		this.promo = promo;
	}

	public String getPromo() {
		return promo;
	}

	public void setPromo(String promo) {
		this.promo = promo;
	}
	
	public AnneeUniversitaire getAnnee() {
		return annee;
	}

	public void setAnnee(AnneeUniversitaire annee) {
		this.annee = annee;
	}

	
}
