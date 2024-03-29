package com.polytech.notes.controllers;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.exc.StreamWriteException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.polytech.notes.models.User;
import com.polytech.notes.services.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/users")
	public ResponseEntity<List<User>> getUsers(){
		System.out.println(userService.getUsers()+"*****************************");
		return ResponseEntity.ok().body(userService.getUsers());
	}
	
	@PostMapping("/user/save")
	public ResponseEntity<User> saveUser(@RequestBody User user){
		return ResponseEntity.ok(userService.saveUser(user));
	}
	
	@GetMapping("/token/refresh")
	public void refreshToken(HttpServletRequest request,HttpServletResponse response) throws StreamWriteException, DatabindException, IOException {
		String authorizationHeader = request.getHeader("Authorization");
		if(authorizationHeader!= null && authorizationHeader.startsWith("Bearer ")) {
			try {
				String refreshToken = authorizationHeader.substring("Bearer ".length());
				Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
				JWTVerifier verfier = JWT.require(algorithm).build();
				DecodedJWT decodedJWT = verfier.verify(refreshToken);
				String username = decodedJWT.getSubject();
				User user = userService.getUser(username);
				
				String accessToken = JWT.create()
						.withSubject(user.getUsername())
						.withExpiresAt(new Date(System.currentTimeMillis()+10*60*1000))
						.withIssuer(request.getRequestURL().toString())
						.sign(algorithm);
				
				
				
				Map<String, String> tokens = new HashMap<String, String>();
				tokens.put("access token", accessToken);
				tokens.put("refresh token", refreshToken);
				response.setContentType("application/json");
				new ObjectMapper().writeValue(response.getOutputStream(),tokens);
			} catch (Exception e) {
				response.setHeader("error", e.getMessage());
				response.setStatus(403);
				//response.sendError(403);
				Map<String, String> errors = new HashMap<String, String>();
				errors.put("error_message", e.getMessage());
				response.setContentType("application/json");
				new ObjectMapper().writeValue(response.getOutputStream(),errors);
			}
		}
		else {
			throw new RuntimeException("refresh token is missing");
		}
	}
	
	@RequestMapping("/user/exist/{username}")
	public boolean userExist(@PathVariable String username) {
		return userService.userExist(username);
	}
}