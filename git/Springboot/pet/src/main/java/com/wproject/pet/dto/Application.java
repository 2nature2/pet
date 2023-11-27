package com.wproject.pet.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Application {
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private int app_id;
	@NotNull
	private String name;
	@NotNull
	private int tel;
	@NotNull
	private String address;
	@NotNull
	private String info_num;
	@NotNull
	private String c_name;
}
