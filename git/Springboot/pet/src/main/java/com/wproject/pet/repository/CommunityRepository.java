package com.wproject.pet.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.wproject.pet.entity.Community;

public interface CommunityRepository extends JpaRepository<Community, Long>{
	public Page<Community> findByBTitleContaining(String word, Pageable pageable);
	public Page<Community> findByBContentContaining(String word, Pageable pageable);
	
}
