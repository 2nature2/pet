package com.wproject.pet.dto;

import com.wproject.pet.entity.BoardReport;
import com.wproject.pet.entity.Community;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BoardReportDTO {
	private int br_id;
	private String b_reason;
	private String b_reporter;
	private Community community;
	
	public BoardReportDTO(BoardReport boardReportDAO) {
		br_id = boardReportDAO.getBr_id();
		b_reason = boardReportDAO.getB_reason();
		b_reporter = boardReportDAO.getB_reporter();
		community = boardReportDAO.getCommunity();
	}
}
