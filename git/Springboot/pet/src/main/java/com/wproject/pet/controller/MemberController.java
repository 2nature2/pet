package com.wproject.pet.controller;





import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;


import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import com.wproject.pet.dto.MemberDTO;
import com.wproject.pet.entity.Member;
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
	
	
	  
//	  @PostMapping("/login")
//	  @ResponseBody
//	  public String loginform(@RequestBody Map<String, String> loginInfo) {
//	    System.out.println("로그인 테스트");
//	    String userid = loginInfo.get("userid");
//	    String password = loginInfo.get("password");
//
////	    // 로그인 로직 수행 후 실패 시 "failure" 반환
////	    if (loginFailed) {
////	      return "failure";
////	    }
//
//	    return "success";
//	  }
	  

	
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
//	//카카오 로그인
//	@GetMapping("/user/kakao/callback")
//	 public Long kakaoLogin(@RequestParam String code, HttpServletResponse response) throws JsonProcessingException {
//        // code: 카카오 서버로부터 받은 인가 코드
//        SignupSocialDto signupKakaoDto = kakaoUserService.kakaoLogin(code);
//        response.addHeader(AUTH_HEADER, signupKakaoDto.getToken());
//
//        return signupKakaoDto.getUserId();
//    }
}
