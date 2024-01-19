package com.wproject.pet.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class CommentReport {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cr_id")
	private int crid;
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
