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
public class CommentReport {
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private int cr_id;
	@NotNull
	private String c_reason;
	@NotNull
	private String c_reporter;
	
	@ManyToOne
	@JoinColumn(name="b_id")
	@NotNull
	private Community community;
	
	@ManyToOne
	@JoinColumn(name="c_id")
	@NotNull
	private Comment comment;
}
