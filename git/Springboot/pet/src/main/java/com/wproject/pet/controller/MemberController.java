package com.wproject.pet.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.wproject.pet.dto.Member;
import com.wproject.pet.repository.MemberRepository;
import com.wproject.pet.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
//@RequestMapping("/member/*")
@CrossOrigin(origins = "http://localhost:3000") 
public class MemberController {
	private final MemberService memberService;
	private final MemberRepository memberRepository;
	
	
	
	//회원가입
	@PostMapping("/member/join")
	@ResponseBody
	public String insert(@RequestBody Member member) {
		System.out.println("test");
		 //id이 있으면 fail
		 if(memberRepository.findByUserid(member.getUserid())!=null) {
			 return "fail";
		 }
		memberService.insert(member);
		return "success";
	}
	
	//로그인
	 @GetMapping("/login")
		public String loginform() {
			return "/login";
		}
	
	
}
