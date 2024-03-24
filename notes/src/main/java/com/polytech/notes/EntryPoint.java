package com.polytech.notes;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.polytech.notes.models.User;
import com.polytech.notes.services.SemestreService;
import com.polytech.notes.services.UniteService;
import com.polytech.notes.services.UserService;

@CrossOrigin("*")
@SpringBootApplication
public class EntryPoint {

	public static void main(String[] args) {
		SpringApplication.run(EntryPoint.class, args);
	}
	
	@Bean 
	CommandLineRunner run(UserService userService,SemestreService semestreService,UniteService uniteService) {
		return args->{
			userService.saveUser(new User(null,"smailox","smail","123","secretaire")); 
		};
	}
	
	@Bean
	PasswordEncoder passwordEncoder() { 
		return new BCryptPasswordEncoder(); 
	}
}