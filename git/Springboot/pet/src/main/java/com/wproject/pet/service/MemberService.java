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
	public void insert(Member member) {
		 //비번 암호화
		 String encPassword = encoder.encode(member.getPassword());
		 member.setPassword(encPassword);
		
		memberRepository.save(member);
	}
}
