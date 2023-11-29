package com.wproject.pet.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommunityDTO {
	
	private int b_id;
	private String b_title;
	private String b_content;
	private String b_writer;
	private Date b_date;
	private int b_like;
	private int hitcount;

}
