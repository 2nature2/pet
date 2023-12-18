package com.wproject.pet.config;

import org.springframework.web.filter.CorsFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import lombok.RequiredArgsConstructor;


@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	 @Autowired
	    private JwtTokenProvider jwtTokenProvider;
	 
	  @Override
	    protected void configure(HttpSecurity http) throws Exception {
	        // 다른 설정들...

	        // JWT를 사용하기 위한 설정
	        http.apply(new JwtConfigurer(jwtTokenProvider));
	    }

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        // 필요한 경우 CORS 설정 수정
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*"));

        source.registerCorsConfiguration("/**", config);

        CorsFilter corsFilter = new CorsFilter(source);

        FilterRegistrationBean<CorsFilter> filterBean = new FilterRegistrationBean<>(corsFilter);
        filterBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return filterBean;
    }

    @Bean
    public BCryptPasswordEncoder encodePwd() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeHttpRequests()
           // .authorizeRequests()
            .antMatchers("/member/*").authenticated()
            .anyRequest().permitAll()
            .and()
            .formLogin()
            .loginPage("/login")
            .defaultSuccessUrl("http://localhost:3000")
            .failureUrl("http://localhost:3000/login?error=true")
            .and()
            .oauth2Login()
            .and()
            .logout()
            .logoutUrl("/logout")
            .logoutSuccessUrl("/")
            .invalidateHttpSession(true);
        return http.build();
    }
    

//class FailAuthenticationEntryPoint implements AuthenticationEntryPoint {
//
//    @Override
//    public void commence(HttpServletRequest request, HttpServletResponse response,
//            AuthenticationException authException) throws IOException, ServletException {
//
//        response.setContentType("application/json");
//        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); //SC_UNAUTHORIZED : 권한 없음
//        response.getWriter().write("{\"code\": \"NP\", \"message\": \"Authorization Failed.\"}");
//
//    }
//}
}
