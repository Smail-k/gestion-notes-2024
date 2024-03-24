package com.polytech.notes.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.polytech.notes.models.User;

@Service
public interface UserService {
	User saveUser(User user);	
	User getUser(String username);
	List<User> getUsers();
	boolean userExist(String username);
}