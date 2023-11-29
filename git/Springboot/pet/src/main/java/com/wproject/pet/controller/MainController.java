package com.wproject.pet.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000") 
public class MainController {
	
	@GetMapping("/api/main")
	public String getMain() {
		return "Hello SpringBoot";
	}
}
