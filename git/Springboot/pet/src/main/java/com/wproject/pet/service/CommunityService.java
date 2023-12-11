package com.wproject.pet.service;

import java.util.Date;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.wproject.pet.dto.CommunityDTO;
import com.wproject.pet.entity.Community;
import com.wproject.pet.repository.CommunityRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommunityService {
	private final CommunityRepository communityRepository;
	
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
		Page<Community> lists = communityRepository.findAll(pageable);
		if("bTitle".equals(field)){
			lists = communityRepository.findByBTitleContaining(word, pageable);
		}else if("bContent".equals(field)) {
			lists = communityRepository.findByBContentContaining(word, pageable);
		}
		return lists.map(community -> new CommunityDTO(
				community.getBnum(),
				community.getB_category(),
	            community.getBTitle(),
	            community.getBContent(),
	            community.getB_writer(),
	            community.getB_date(),
	            community.getB_like(),
	            community.getHitcount()
				));
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
	                community.getHitcount()
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
		community.setB_date(new Date());
		communityRepository.save(community);
	}
	
	//삭제 
	public void delete(Long bnum) {
		communityRepository.deleteById(bnum);
	}
}
