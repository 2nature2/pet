package com.wproject.pet.config;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import io.jsonwebtoken.io.IOException;

public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler{
	
	@Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException, java.io.IOException {
        // 로그인 성공 후 프론트엔드로 리다이렉션
        response.sendRedirect("http://localhost/");
    }

}
