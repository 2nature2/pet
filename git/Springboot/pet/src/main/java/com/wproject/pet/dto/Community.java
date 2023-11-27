package com.wproject.pet.dto;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Community {
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private int b_id;
	@NotNull
	private String b_title;
	@Column(length = 2000)
	@NotNull
	private String b_content;
	@NotNull
	private String b_writer;

	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@NotNull
	private Date b_date;
	@ColumnDefault("0")
	private int b_like;
}
