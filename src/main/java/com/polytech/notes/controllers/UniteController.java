package com.polytech.notes.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.polytech.notes.models.Matiere;
import com.polytech.notes.models.Unite;
import com.polytech.notes.services.UniteService;

@RestController
@RequestMapping("/api/unites")
public class UniteController {

	@Autowired
	private UniteService service;
	
	@GetMapping("/promotion")
	public List<Unite> getUniteByPromo(String promo) {
		return service.findUniteByPromo(promo);
	}
	
	@GetMapping("/all")
	public List<Unite> all(){
		return service.findAll();
	}
	
	@GetMapping("/matiere")
	public List<Matiere> matieresByUnite(String code){
		return service.findUniteMatiereByCode(code);
	}
	
	
	
}
