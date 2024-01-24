package com.wproject.pet.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class BoardReport {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="br_id")
	private int brid;
	@NotNull
	private String b_reason;
	@NotNull
	private String b_reporter;
	@ColumnDefault("'no'")
	private String reportStatus;
	@ManyToOne
	@JoinColumn(name="b_id")
	@NotNull
	private Community community;
	
}
