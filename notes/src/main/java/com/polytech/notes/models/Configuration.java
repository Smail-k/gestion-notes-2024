package com.polytech.notes.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Configuration {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String libelle;
  private Double seuil;
  private String description;

  public Configuration() {
    super();
  }

  public Configuration(String libelle, Double seuil, String description) {
    super();
    this.libelle = libelle;
    this.seuil = seuil;
    this.description = description;
  }

  public String getLibelle() {
    return libelle;
  }

  public Double getSeuil() {
    return seuil;
  }

  public String getDescription() {
    return description;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setLibelle(String libelle) {
    this.libelle = libelle;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
