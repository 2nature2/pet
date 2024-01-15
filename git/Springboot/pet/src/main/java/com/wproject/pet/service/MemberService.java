package com.wproject.pet.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.wproject.pet.dto.MemberDTO;
import com.wproject.pet.entity.Member;
import com.wproject.pet.entity.Role;
import com.wproject.pet.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final BCryptPasswordEncoder encoder;

	
	//회원가입
	public void insert(MemberDTO memberDTO) {
		 //비번 암호화
		 String encPassword = encoder.encode(memberDTO.getPassword());
		 Member member=new Member();
		 member.setUserid(memberDTO.getUserid());
		 member.setPassword(encPassword);
		 member.setName(memberDTO.getName());
		 member.setEmail(memberDTO.getEmail());
		 member.setTel(memberDTO.getTel());
		 member.setNickname(memberDTO.getNickname());
		// member.setAddress(memberDTO.getAddress());
		 member.setRole("ROLE_USER");
	
		
		memberRepository.save(member);
	}
	
	//회원정보 수정
	@Transactional
	public void update(int memberid,MemberDTO memberDTO) {
		
		Member member = memberRepository.findByMemberid(memberid);
		String encPassword = encoder.encode(memberDTO.getPassword());
		 if (member != null) {
		        member.setUserid(memberDTO.getUserid());
		        member.setName(memberDTO.getName());
		        member.setEmail(memberDTO.getEmail());
		        member.setTel(memberDTO.getTel());
		        member.setNickname(memberDTO.getNickname());
		        member.setRole("ROLE_USER");
		        member.setPassword(encPassword);
		        // 업데이트된 회원 정보를 저장
		        memberRepository.save(member);
		    } 
	}
}
