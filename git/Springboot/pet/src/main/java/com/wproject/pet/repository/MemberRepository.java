package com.wproject.pet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.wproject.pet.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member,Integer> {
Member findByUserid(String userid);
}
