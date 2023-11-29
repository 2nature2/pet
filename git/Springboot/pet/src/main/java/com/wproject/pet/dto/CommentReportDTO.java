package com.wproject.pet.dto;

import com.wproject.pet.entity.Comment;
import com.wproject.pet.entity.CommentReport;
import com.wproject.pet.entity.Community;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentReportDTO {
	private int cr_id;
	private String c_reason;
	private String c_reporter;
	private Community community;
	private Comment comment;
	
	public CommentReportDTO(CommentReport commentReportDAO) {
		cr_id = commentReportDAO.getCr_id();
		c_reason = commentReportDAO.getC_reason();
		c_reporter = commentReportDAO.getC_reporter();
		community = commentReportDAO.getCommunity();
		comment = commentReportDAO.getComment();
	}
}
