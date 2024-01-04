package com.wproject.pet.entity;



import java.util.Set;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotNull;

import com.wproject.pet.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Member {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int member_id;
	@NotNull
	private String userid;
	@NotNull
	private String password;
	@NotNull
	private String name;
	@NotNull
	private int tel;
	@NotNull
	private String address;
	@NotNull
	private String email;
	
	
	 @Enumerated(EnumType.STRING)
	    private Role role; // ROLE_USER, ROLE_ADMIN
	 
	 @Builder
	 public Member(int member_id,String userid, String password,String name,int tel, String address, String email) {
		 this.member_id=member_id;
		 this.userid=userid;
		 this.password=password;
		 this.name=name;
		 this.tel=tel;
		 this.address=address;
		 this.email=email;
	 }
//	
//	@ElementCollection(fetch=FetchType.EAGER)
//	@Enumerated(EnumType.STRING)
//	private Set<Role> roles;
	
//	@PrePersist
//    @PreUpdate
//    public void prePersist() {
//        if (this.auth == null) {
//            this.auth = "0";
//        }
//    }
  
}