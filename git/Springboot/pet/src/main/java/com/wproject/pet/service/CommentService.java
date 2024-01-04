package com.wproject.pet.service;


import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.wproject.pet.dto.CommentDTO;
import com.wproject.pet.entity.Comment;
import com.wproject.pet.entity.Community;
import com.wproject.pet.repository.CommentRepository;
import com.wproject.pet.repository.CommunityRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
	private final CommentRepository commentRepository;
	private final CommunityRepository communityRepository;
	
	@Transactional
	public void insert(Long bnum, CommentDTO commentDTO) {
		Community community = communityRepository.findById(bnum).get();
		Comment comment = new Comment();
		comment.setC_writer(commentDTO.getC_writer());
		comment.setC_content(commentDTO.getC_content());
		comment.setCommunity(community);
		commentRepository.save(comment);
	}
	
	public List<Comment> findAll(Long bnum){
		return commentRepository.findCommentsByBId(bnum);
	}
}
