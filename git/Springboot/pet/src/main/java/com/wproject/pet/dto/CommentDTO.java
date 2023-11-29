package com.wproject.pet.dto;

import java.util.Date;

import com.wproject.pet.entity.Comment;
import com.wproject.pet.entity.Community;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentDTO {
	private int c_id;
	private String c_content;
	private String c_writer;
	private Date c_date;
	private int c_like;
	private Community community;
	
	public CommentDTO(Comment commentDAO) {
		c_id = commentDAO.getC_id();
		c_content = commentDAO.getC_content();
		c_writer = commentDAO.getC_writer();
		c_date = commentDAO.getC_date();
		c_like = commentDAO.getC_like();
		community = commentDAO.getCommunity();
	}
}
