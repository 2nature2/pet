package com.wproject.pet.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wproject.pet.dto.CommentDTO;
import com.wproject.pet.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
	private final CommentService commentService;
	
	@PostMapping("/insert/{bnum}")
	public String insert(@PathVariable Long bnum, @RequestBody CommentDTO commentDTO) {
		commentService.insert(bnum, commentDTO);
		return "success";
	}
}
