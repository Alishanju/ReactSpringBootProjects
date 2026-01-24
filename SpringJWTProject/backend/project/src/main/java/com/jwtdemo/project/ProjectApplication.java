package com.jwtdemo.project;

//import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.context.annotation.Bean;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);
		 
	}

// 	@Bean
// CommandLineRunner testBCrypt() {
//     return args -> {
//         BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//         System.out.println("password1:"+encoder.encode("admin123"));
//         System.out.println("password2:"+encoder.encode("user123"));
//     };
// }



}
