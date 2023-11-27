package com.wproject.pet.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
public class Comment {
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private int c_id;
	@NotNull
	private String c_content;
	@NotNull
	private String c_writer;
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@NotNull
	private Date c_date;
	@ColumnDefault("0")
	private int c_like;
	
	@ManyToOne
	@JoinColumn(name="b_id")
	@NotNull
	private Community community;
}
