package com.wproject.pet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.wproject.pet.entity.Member;

public interface MemberRepository extends JpaRepository<Member,Integer> {
	Member findByUserid(String userid);
}
