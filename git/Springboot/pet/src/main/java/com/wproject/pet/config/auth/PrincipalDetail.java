package com.wproject.pet.config.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.wproject.pet.dto.Member;
import com.wproject.pet.repository.MemberRepository;




@Service
public class PrincipalDetail implements UserDetailsService {
	@Autowired
	private MemberRepository memberRepository;
	
	@Override
	public UserDetails loadUserByUsername(String memberid) throws UsernameNotFoundException {
		System.out.println("loadUserByUsername");
		Member member = memberRepository.findByUserid(memberid);
		if(member==null) return null;
		//회원이라면 시큐리티가 적용된 user 리턴
		PrincipalUser pmember = new PrincipalUser(member);
		return pmember;
	}

}
