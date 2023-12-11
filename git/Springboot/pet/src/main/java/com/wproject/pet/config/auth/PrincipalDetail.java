package com.wproject.pet.config.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.wproject.pet.dto.MemberDTO;
import com.wproject.pet.entity.Member;
import com.wproject.pet.repository.MemberRepository;




@Service
public class PrincipalDetail implements UserDetailsService {
	@Autowired
	private MemberRepository memberRepository;
	
	@Override
	public UserDetails loadUserByUsername(String userid) throws UsernameNotFoundException {
		System.out.println("loadUserByUsername::"+userid);
		  // 사용자를 찾을 수 없는 경우
	  //  throw new UsernameNotFoundException("User not found with username: " + userid);
		Member member = memberRepository.findByUserid(userid);
		if (member == null) {
	        throw new UsernameNotFoundException("User not found with username: " + userid);
	    }
		System.out.println("repositorytest::"+userid);
		//회원이라면 시큐리티가 적용된 user 리턴
		PrincipalUser pmember = new PrincipalUser(member);
		return pmember;
	}

}
