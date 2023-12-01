package com.wproject.pet.dto;

<<<<<<< HEAD
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;

import com.wproject.pet.entity.Member;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class MemberDTO {
	
=======
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDTO {
>>>>>>> 616481e280bb49214379d4b056e76cf784f3e248
	private int member_id;
	private String userid;
	private String password;
	private String name;
	private int tel;
	private String address;
	private String email;
<<<<<<< HEAD
	private String auth;
	
	public MemberDTO(Member memberDAO) {
		member_id=memberDAO.getMember_id();
		userid=memberDAO.getUserid();
		password=memberDAO.getPassword();
		name=memberDAO.getName();
		tel=memberDAO.getTel();
		address=memberDAO.getAddress();
		email=memberDAO.getEmail();
		auth=memberDAO.getAuth();
	}
=======
	private int auth;
>>>>>>> 616481e280bb49214379d4b056e76cf784f3e248
}
