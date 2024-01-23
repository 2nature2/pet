package com.wproject.pet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.wproject.pet.entity.Member;

public interface MemberRepository extends JpaRepository<Member,Integer> {
	Member findByUserid(String username);
	
	Member findByNickname(String nickname);

	Member findByMemberid(int memberid);
	
	@Modifying
	@Query(value = "delete from member where userid=:userid", nativeQuery = true)
	public void deleteByUserid(String userid);
	
	
	@Query(value = "select * from member where role='ROLE_USER'", nativeQuery = true)
	Page<Member> findMember(Pageable pageable);
	
	public Page<Member> findByNameContaining(String word,Pageable pageable);
	public Page<Member> findByUseridContaining(String word,Pageable pageable);
	public Page<Member> findByTelContaining(String word,Pageable pageable);
	
	@Query(value = "select userid from member where name=:name and tel=:tel", nativeQuery = true)
	public String searchId(String name, String tel);


}
