package com.wproject.pet.service;

import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.wproject.pet.dto.BoardReportDTO;
import com.wproject.pet.entity.BoardReport;
import com.wproject.pet.repository.BoardReportRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardReportService {
	
	private final BoardReportRepository boardReportRepository;
	
	private Page<BoardReportDTO> convertToDto(Page<BoardReport> breport){
		
		return new PageImpl<>(
				breport.getContent().stream()
					.map(report -> new BoardReportDTO(
							report.getBrid(),
							report.getB_reporter(),
							report.getB_reason(),
							report.getCommunity()
							))
					.collect(Collectors.toList()),
				breport.getPageable(),
				breport.getTotalElements()
				);
	}
	
	
	public Page<BoardReportDTO> findAll(Pageable pageable){
		
		Page<BoardReport> breports = boardReportRepository.findAll(pageable);
		
		return convertToDto(breports);
	}
	

}
