package com.wproject.pet.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;


import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.wproject.pet.config.auth.PrincipalDetail;
import com.wproject.pet.config.auth.PrincipalUser;
import com.wproject.pet.dto.MemberDTO;
import com.wproject.pet.entity.Member;
import com.wproject.pet.entity.Role;
import com.wproject.pet.repository.MemberRepository;
import com.wproject.pet.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member/*")
@CrossOrigin(origins = "http://localhost:3000") 
public class MemberController {
	private final MemberService memberService;
	private final MemberRepository memberRepository;
	
	
	
	//회원가입
	@PostMapping("/join")
	@ResponseBody
	public String insert(@RequestBody MemberDTO memberDTO) {
		System.out.println("test");
		 //id이 있으면 fail
		
		 if(memberRepository.findByUserid(memberDTO.getUserid())!=null) {
			 return "fail";
		 }
		memberService.insert(memberDTO);
		
		return "success";
	}
	
	
	//회원가입시 아이디 중복확인
	@CrossOrigin(origins = "http://localhost:3000") 
	 @PostMapping("/checkId")
	 @ResponseBody
	 public String checkId(@RequestBody MemberDTO memberDTO) {
		System.out.println("아이디 중복확인 테스트");
		Member member = new Member();
		member.setUserid(memberDTO.getUserid());
		 if (memberRepository.findByUserid(member.getUserid()) != null) {
			 System.out.println("fail");
	            return "fail";
	        } else {
	        	System.out.println("success"+member.getUserid());
	            return "success";
	        }
	 }
	
	
	//회원정보
	@GetMapping("/api/user")
	public Map<String, Object> userInfo(@AuthenticationPrincipal PrincipalUser principaluser){
		System.out.println("회원정보 : "+ principaluser.getUsername() );
		Member member = principaluser.getMember();
		String name = member.getName();
		String address = member.getAddress();
		String email = member.getEmail();
		Role role = member.getRole();
		int tel = member.getTel();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("name",name );
		map.put("address",address );
		map.put("email",email );
		map.put("tel",tel );
		map.put("role", role);
		if(name==null) {
			name="null";
		}
		return map;
	}
	

}
