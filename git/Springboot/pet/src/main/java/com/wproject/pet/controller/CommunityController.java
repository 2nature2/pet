package com.wproject.pet.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
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
	public Page<CommunityDTO> getPosts(
            @PageableDefault(size = 20, sort = "bnum", direction = Direction.DESC) Pageable pageable,
            @RequestParam(required = false, defaultValue = "") String field,
            @RequestParam(required = false, defaultValue = "") String word) {
        return communityService.findAll(field, word, pageable);
    }
	
	@GetMapping("/view/{bnum}")
	public CommunityDTO view(@PathVariable Long bnum) {
		return communityService.view(bnum);
	}
	
	@PutMapping("/update/{bnum}")
	public void updatePost(@PathVariable Long bnum, @RequestBody CommunityDTO communityDTO) {
        communityDTO.setBnum(bnum);
        communityService.update(communityDTO);
    }
	
	@DeleteMapping("/delete/{bnum}")
	public Long delete(@PathVariable Long bnum) {
		communityService.delete(bnum);
		return bnum;
	}
}
