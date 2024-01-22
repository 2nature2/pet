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
import com.wproject.pet.dto.MemberDTO;
import com.wproject.pet.service.BoardReportService;
import com.wproject.pet.service.CommentReportService;
import com.wproject.pet.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
	private final BoardReportService boardReportService;
	private final CommentReportService commentReportService;
	private final MemberService memberService;
	
	@GetMapping("/boardReport")
	public ResponseEntity<Page<BoardReportDTO>> getBoardReports(
			 @PageableDefault(size = Integer.MAX_VALUE, sort = "brid", direction = Direction.DESC) Pageable pageable,
			 @RequestParam(required = false, defaultValue = "0") int page

			){
		System.out.println("신고리스트:"+page);
		Page<BoardReportDTO> boardReports = boardReportService.findAll(pageable);
		return ResponseEntity.ok(boardReports);
	}
	
	@GetMapping("/commentReport")
	public ResponseEntity<Page<CommentReportDTO>> getCommentReports(
			@PageableDefault(size = Integer.MAX_VALUE, sort = "crid", direction = Direction.DESC) Pageable pageable,
			@RequestParam(required = false, defaultValue = "0") int page
			){
		Page<CommentReportDTO> commentReports = commentReportService.findAll(pageable);
		return ResponseEntity.ok(commentReports);
	}
	
	//회원리스트
	@GetMapping("/memberList")
	public ResponseEntity<Page<MemberDTO>> getPosts(
			@PageableDefault(size = 5, sort = "memberid", direction = Direction.ASC) Pageable pageable,
			@RequestParam(required = false, defaultValue = "0") int page) {
		System.out.println("회원리스트:"+page);
	  Page<MemberDTO> resultPage = memberService.findAll(pageable);
	  return ResponseEntity.ok(resultPage);
	}
	
	
}
