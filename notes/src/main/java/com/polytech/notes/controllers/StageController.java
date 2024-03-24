package com.polytech.notes.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.polytech.notes.models.Stage;
import com.polytech.notes.services.StageServiceDefault;

@RestController
@RequestMapping("/api/stage")
public class StageController {

	@Autowired
	private StageServiceDefault service;
	
	@PostMapping("/add")
	public Stage add(@RequestBody Stage s) {
		return service.addStage(s);
	}
	
	
}