package com.wproject.pet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wproject.pet.entity.CommentReport;

public interface CommentReportRepository extends JpaRepository<CommentReport, Integer> {

}
