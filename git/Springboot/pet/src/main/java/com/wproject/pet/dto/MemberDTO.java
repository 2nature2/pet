package com.wproject.pet.dto;


import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

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
	
	

}
