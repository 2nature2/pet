package com.wproject.pet.config;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;

@Component
public class JwtTokenProvider {
	  // Secret Key, 토큰 유효 시간 등의 설정

    public String generateToken(Authentication authentication) {
    	   // 현재 인증된 사용자의 정보를 가져옵니다.
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // 토큰에 담을 클레임(클레임은 토큰에 저장되는 속성) 설정
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", userDetails.getUsername());
        claims.put("iat", new Date().getTime());

        // JWT 토큰 생성
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    public boolean validateToken(String token) {
    	 try {
    	        // 토큰을 파싱하여 검증
    	        Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
    	        return true;
    	    } catch (SignatureException | MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
    	        // 토큰이 유효하지 않은 경우 예외가 발생
    	        return false;
    	    }
    }

    public Authentication getAuthentication(String token) {
    	 Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();

    	    // 클레임에서 사용자 이름을 가져옵니다.
    	    String username = claims.getSubject();

    	    // 가져온 사용자 이름으로 UserDetails를 가져와서 Authentication 객체를 생성합니다.
    	    UserDetails userDetails = yourUserDetailsService.loadUserByUsername(username);

    	    return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
}
