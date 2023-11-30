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
import org.springframework.web.bind.annotation.ResponseBody;
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
	@ResponseBody
	public String insert(@RequestBody CommunityDTO communityDTO) {
		communityService.insert(communityDTO);
		return "success";
	}
	
	@GetMapping("/")
	public Page<CommunityDTO> getPosts(
            @PageableDefault(size = 20, sort = "b_id", direction = Direction.DESC) Pageable pageable,
            @RequestParam(required = false, defaultValue = "") String field,
            @RequestParam(required = false, defaultValue = "") String word) {
        return communityService.findAll(field, word, pageable);
    }
	
	@GetMapping("/view/{b_id}")
	public CommunityDTO view(@PathVariable int b_id) {
		return communityService.view(b_id);
	}
	
	@PutMapping("/update/{b_id}")
	public void updatePost(@PathVariable int b_id, @RequestBody CommunityDTO communityDTO) {
        communityDTO.setB_id(b_id); // 경로 변수로 전달된 b_id를 사용하여 업데이트
        communityService.update(communityDTO);
    }
	
	@DeleteMapping("/delete/{b_id}")
	public int delete(@PathVariable int b_id) {
		communityService.delete(b_id);
		return b_id;
	}
}