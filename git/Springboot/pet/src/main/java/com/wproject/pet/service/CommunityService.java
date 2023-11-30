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
		community.setBContent(communityDTO.getB_content());
		community.setBTitle(communityDTO.getB_title());
		community.setB_writer(communityDTO.getB_writer());
		communityRepository.save(community);
	}
	
	//전체보기(페이징, 검색)
	public Page<CommunityDTO> findAll(String field, String word, Pageable pageable){
		Page<Community> lists = communityRepository.findAll(pageable);
		if("b_title".equals(field)){
			lists = communityRepository.findByBTitleContaining(word, pageable);
		}else if("b_content".equals(field)) {
			lists = communityRepository.findByBContentContaining(word, pageable);
		}else {
	        lists = communityRepository.findAll(pageable);
	    }
		return lists.map(community -> new CommunityDTO(
				community.getB_id(),
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
	public CommunityDTO view(int b_id) {
		Optional<Community> communityOptional = communityRepository.findById(b_id);
		if(communityOptional.isPresent()) {
			Community community = communityOptional.get();
			community.setHitcount(community.getHitcount()+1);
			return new CommunityDTO(
					community.getB_id(),
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
		Community community = communityRepository.findById(communityDTO.getB_id()).get();
		community.setBTitle(communityDTO.getB_title());
		community.setBContent(communityDTO.getB_content());
		community.setB_date(new Date());
		communityRepository.save(community);
	}
	
	//삭제 
	public void delete(int b_id) {
		communityRepository.deleteById(b_id);
	}
}
