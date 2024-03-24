package com.polytech.notes.services;

import org.springframework.stereotype.Service;

import com.polytech.notes.models.AnneeUniversitaire;

@Service
public interface AnneeUnivService {
  AnneeUniversitaire add(AnneeUniversitaire a);
  AnneeUniversitaire getAnneeUniversitaire(String annee);
}
