package com.wproject.pet.config;

import org.springframework.web.filter.CorsFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;





@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	 @Autowired
	    private UserDetailsService userDetailsService;
	 
	 @Bean
	    public AuthenticationSuccessHandler authenticationSuccessHandler() {
	        return new CustomAuthenticationSuccessHandler();
	    }
	
	@Override
    public void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .cors().and()  // CORS 설정 활성화
            .authorizeRequests()
            .antMatchers("/*").authenticated()
            .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
            .anyRequest().permitAll()
            .and()
            .formLogin()
            .loginPage("/login")
            .loginProcessingUrl("/login")
            .defaultSuccessUrl("http://localhost/")
            .successHandler(authenticationSuccessHandler())
            .failureUrl("http://localhost/loginFail")
            .and()
            .logout()
            .logoutUrl("/logout")
            .logoutSuccessUrl("/")
            .invalidateHttpSession(true);
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        // 필요한 경우 CORS 설정 수정
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*"));

        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }

    @Bean
    public BCryptPasswordEncoder encodePwd() {
        return new BCryptPasswordEncoder();
    }
	
//    @Bean
//    public FilterRegistrationBean<CorsFilter> corsFilter() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        CorsConfiguration config = new CorsConfiguration();
//        // 필요한 경우 CORS 설정 수정
//        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
//        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        config.setAllowedHeaders(Arrays.asList("*"));
//
//        source.registerCorsConfiguration("/**", config);
//
//        CorsFilter corsFilter = new CorsFilter(source);
//
//        FilterRegistrationBean<CorsFilter> filterBean = new FilterRegistrationBean<>(corsFilter);
//        filterBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
//        return filterBean;
//    }
//
//    @Bean
//    public BCryptPasswordEncoder encodePwd() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.csrf().disable()
//        	.cors().and()
//        	.authorizeRequests()
//        	.antMatchers("/*").authenticated()
//        	.antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
//        	.anyRequest().permitAll()
//            .and()
//            .formLogin()
//            .loginPage("/login")
//            .loginProcessingUrl("/login")
//            .defaultSuccessUrl("http://localhost:3000")
//            .failureUrl("http://localhost:3000/loginFail")
//            .defaultSuccessUrl("http://localhost:3000")
//            .and()
//            .logout()
//            .logoutUrl("/logout")
//            .logoutSuccessUrl("/")
//            .invalidateHttpSession(true);
//        return http.build();
//    }
    

}
