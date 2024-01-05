package com.wproject.pet.dto;

import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;

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
	



}
