package com.wproject.pet.service;

import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.wproject.pet.dto.CommentReportDTO;
import com.wproject.pet.entity.CommentReport;
import com.wproject.pet.repository.CommentReportRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentReportService {
	
	private final CommentReportRepository commentReportRepository;
	
	public Page<CommentReportDTO> convertToDto(Page<CommentReport> creport){
		return new PageImpl<>(
				creport.getContent().stream()
				.map(report -> new CommentReportDTO(
						report.getCrid(),
						report.getC_reporter(),
						report.getC_reason(),
						report.getCommunity(),
						report.getComment()
						))
				.collect(Collectors.toList()),
				creport.getPageable(),
				creport.getTotalElements()
				);
	}
	
	public Page<CommentReportDTO> findAll(Pageable pageable){
		
		Page<CommentReport> creports = commentReportRepository.findAll(pageable);
		
		return convertToDto(creports);
	}

}
