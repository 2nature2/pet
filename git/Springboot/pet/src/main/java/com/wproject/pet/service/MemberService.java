package com.wproject.pet.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import com.wproject.pet.dto.MemberDTO;
import com.wproject.pet.entity.Member;
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
		 member.setAddress(memberDTO.getAddress());
		 //member.setR(memberDTO.getRoles());
		
		memberRepository.save(member);
	}
}
