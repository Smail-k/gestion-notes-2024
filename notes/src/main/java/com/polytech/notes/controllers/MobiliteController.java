package com.polytech.notes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.polytech.notes.models.Mobilite;
import com.polytech.notes.services.MobiliteService;

@RestController
@RequestMapping("/api/mobilite")
public class MobiliteController {

	@Autowired
	private MobiliteService mobiliteService; 
	
	@PostMapping("/add")
	public Mobilite addMobilite(@RequestBody Mobilite m) {
		return mobiliteService.addMobilite(m);
	}
	
}
