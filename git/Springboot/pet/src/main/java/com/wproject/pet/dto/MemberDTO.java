package com.wproject.pet.dto;




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
	private int member_id;
	private String userid;
	private String password;
	private String name;
	private int tel;
	private String address;
	private String email;
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
}
