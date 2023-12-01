package com.wproject.pet.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class BoardReport {
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private int br_id;
	@NotNull
	private String b_reason;
	@NotNull
	private String b_reporter;
	
	@ManyToOne
	@JoinColumn(name="b_id")
	@NotNull
	private Community community;
}
