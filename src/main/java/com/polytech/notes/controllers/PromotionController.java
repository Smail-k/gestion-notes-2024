package com.polytech.notes.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.polytech.notes.models.AnneeUniversitaire;
import com.polytech.notes.models.Promotion;
import com.polytech.notes.repositories.AnneeUniversitaireRepository;
import com.polytech.notes.repositories.PromotionRepository;
import com.polytech.notes.services.EtudiantService;

@RestController
@RequestMapping("/api/promotion")
public class PromotionController {

	@Autowired
	private EtudiantService service;
	@Autowired
	private PromotionRepository rep;
	
	@Autowired
	private AnneeUniversitaireRepository repAnneeUniv;
	
	@GetMapping("/anneesAll")
	public List<AnneeUniversitaire> getAnneeUniversitaires(){
		return repAnneeUniv.findAll();
	}
	
	@GetMapping("/promotions")
	public List<String> getPromotions(){
		return rep.allPromotions();
	}
	
	@GetMapping("/anneeUniv/promotions")
	public List<String> getPromotions(String annee){
		return rep.getPromotionsByAnnee(annee);
	}
	
	@GetMapping("/promoAnnee")
	public Promotion getPromotion(String promo,String annee){
		return rep.getPromotionByPromoAndAnnee(promo,annee);
	}
	
}