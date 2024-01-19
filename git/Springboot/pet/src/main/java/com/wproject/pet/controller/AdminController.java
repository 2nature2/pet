package com.wproject.pet.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wproject.pet.dto.BoardReportDTO;
import com.wproject.pet.dto.CommentReportDTO;
import com.wproject.pet.service.BoardReportService;
import com.wproject.pet.service.CommentReportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
	private final BoardReportService boardReportService;
	private final CommentReportService commentReportService;
	
	@GetMapping("/report")
	public ResponseEntity<ReportResponseDTO> getReports(
			@PageableDefault(size = Integer.MAX_VALUE, sort = "brid", direction = Direction.DESC) Pageable boardPageable,
            @PageableDefault(size = Integer.MAX_VALUE, sort = "cr_id", direction = Direction.DESC) Pageable commentPageable,
            @RequestParam(required = false, defaultValue = "0") int boardPage,
            @RequestParam(required = false, defaultValue = "0") int commentPage
			){
		Page<BoardReportDTO> bResult = boardReportService.findAll(PageRequest.of(boardPage, boardPageable.getPageSize(), boardPageable.getSort()));
		Page<CommentReportDTO> cResult = commentReportService.findAll(PageRequest.of(commentPage, commentPageable.getPageSize(), commentPageable.getSort()));
		
		ReportResponseDTO reportResponseDTO = new ReportResponseDTO(bResult, cResult);
		
		return ResponseEntity.ok(reportResponseDTO);
	}
	
	public static class ReportResponseDTO {
		private final Page<BoardReportDTO> boardReports;
		private final Page<CommentReportDTO> commentReports;
		
		public ReportResponseDTO(Page<BoardReportDTO> boardReports, Page<CommentReportDTO> commentReports) {
			this.boardReports = boardReports;
			this.commentReports = commentReports;
		}
	}
	
	
}
