package com.wproject.pet.service;

import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.wproject.pet.dto.BoardReportDTO;
import com.wproject.pet.dto.CommunityDTO;
import com.wproject.pet.entity.BoardReport;
import com.wproject.pet.entity.Community;
import com.wproject.pet.repository.BoardReportRepository;
import com.wproject.pet.repository.CommunityRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommunityService {
	private final CommunityRepository communityRepository;
	private final BoardReportRepository boardReportRepository;
	
	@Transactional
	public void insert(CommunityDTO communityDTO) {
		Community community = new Community();
		community.setB_category(communityDTO.getB_category());
		community.setBContent(communityDTO.getB_content());
		community.setBTitle(communityDTO.getB_title());
		community.setB_writer(communityDTO.getB_writer());
		communityRepository.save(community);
	}
	
	//전체보기(페이징, 검색)
	public Page<CommunityDTO> findAll(String field, String word, Pageable pageable){
		Page<Community> lists;
		
		if("bTitle".equals(field)){
			lists = communityRepository.findByBTitleContaining(word, pageable);
		}else if("bContent".equals(field)) {
			lists = communityRepository.findByBContentContaining(word, pageable);
		}else {
			lists = communityRepository.findAll(pageable);
		}
		return new PageImpl<>(
				lists.getContent().stream()
					.map(community -> new CommunityDTO(
						community.getBnum(),
						community.getB_category(),
			            community.getBTitle(),
			            community.getBContent(),
			            community.getB_writer(),
			            community.getB_date(),
			            community.getB_like(),
			            community.getHitcount(),
			            community.getB_comments()
					))
					.collect(Collectors.toList()),
				pageable,
				lists.getTotalElements()
				);
		}

	//상세보기
	@Transactional
	public CommunityDTO view(Long bnum) {
		System.out.println("View method called for bnum: " + bnum);
		Optional<Community> communityOptional = communityRepository.findById(bnum);
		if(communityOptional.isPresent()) {
			Community community = communityOptional.get();
			community.setHitcount(community.getHitcount()+1);
			return new CommunityDTO(
					community.getBnum(),
					community.getB_category(),
	                community.getBTitle(),
	                community.getBContent(),
	                community.getB_writer(),
	                community.getB_date(),
	                community.getB_like(),
	                community.getHitcount(),
	                community.getB_comments()
					);
		}else {
			return null;
		}
	}
	
	//수정
	@Transactional
	public void update(CommunityDTO communityDTO) {
		Community community = communityRepository.findById(communityDTO.getBnum()).get();
		community.setB_category(communityDTO.getB_category());
		community.setBTitle(communityDTO.getB_title());
		community.setBContent(communityDTO.getB_content());
		community.setB_date(communityDTO.getB_date());
		communityRepository.save(community);
	}
	
	//삭제 
	public void delete(Long bnum) {
		communityRepository.deleteById(bnum);
	}
	
	public void like(Long bnum) {
		Community community = communityRepository.findById(bnum).get();
		community.setB_like(community.getB_like()+1);
		communityRepository.save(community);
	}
	
	public void send(Long bnum, BoardReportDTO boardReportDTO) {
		Community community = communityRepository.findById(bnum).get();
		BoardReport boardReport = new BoardReport();
		boardReport.setB_reporter(boardReportDTO.getB_reporter());
		boardReport.setB_reason(boardReportDTO.getB_reason());
		boardReport.setCommunity(community);
		boardReportRepository.save(boardReport);
	}
}
