package com.wproject.pet.dto;

import java.util.List;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;

import com.wproject.pet.entity.Authority;
import com.wproject.pet.entity.Role;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class MemberDTO {
	private int memberid;
	private String userid;
	private String password;
	private String name;
	private String tel;
//	private String address;
	private String nickname;
	private String email;
	private Role role;
	



}
