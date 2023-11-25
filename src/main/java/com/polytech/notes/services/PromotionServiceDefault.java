package com.polytech.notes.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.polytech.notes.models.Promotion;
import com.polytech.notes.repositories.PromotionRepository;

@Service
public class PromotionServiceDefault implements PromotionService{

	@Autowired
	private PromotionRepository rep;
	
	@Override
	public Promotion addPromotion(Promotion p) {
		return rep.save(p);
	}
	
}
