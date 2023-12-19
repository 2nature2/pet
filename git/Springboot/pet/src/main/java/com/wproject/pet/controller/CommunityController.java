package com.wproject.pet.controller;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wproject.pet.dto.CommunityDTO;
import com.wproject.pet.service.CommunityService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/community")
@RequiredArgsConstructor
public class CommunityController {
	private final CommunityService communityService;
	
	@PostMapping("/insert")
	public String insert(@RequestBody CommunityDTO communityDTO) {
		communityService.insert(communityDTO);
		return "success";
	}
	
	@GetMapping("/")
	public ResponseEntity<Page<CommunityDTO>> getPosts(
			@PageableDefault(size = 20, sort = "bnum", direction = Direction.DESC) Pageable pageable,
			@RequestParam(required = false, defaultValue = "") String field,
			@RequestParam(required = false, defaultValue = "") String word,
			@RequestParam(required = false, defaultValue = "0") int page) {
	  Page<CommunityDTO> resultPage = communityService.findAll(field, word, PageRequest.of(page, pageable.getPageSize(), pageable.getSort()));
	  return ResponseEntity.ok(resultPage);
	}
	
	@GetMapping("/view/{bnum}")
	public CommunityDTO view(@PathVariable Long bnum) {
		return communityService.view(bnum);
	}
	
	@PutMapping("/update/{bnum}")
	public void updatePost(@PathVariable Long bnum, @RequestBody Map<String, Object> requestBody) {
		System.out.println(requestBody);
		CommunityDTO communityDTO = communityService.view(bnum);
		if (requestBody.get("b_category") != null && !((String) requestBody.get("b_category")).isEmpty()) {
	        communityDTO.setB_category((String) requestBody.get("b_category"));
	    }

	    if (requestBody.get("b_title") != null && !((String) requestBody.get("b_title")).isEmpty()) {
	        communityDTO.setB_title((String) requestBody.get("b_title"));
	    }

	    if (requestBody.get("b_content") != null && !((String) requestBody.get("b_content")).isEmpty()) {
	        communityDTO.setB_content((String) requestBody.get("b_content"));
	    }

        communityService.update(communityDTO);
    }
	
	@DeleteMapping("/delete/{bnum}")
	public Long delete(@PathVariable Long bnum) {
		communityService.delete(bnum);
		return bnum;
	}
	
	@GetMapping("/like/{bnum}")
	public void like(@PathVariable Long bnum) {
		communityService.like(bnum);
	}
}
