package com.thuyen.dev.papr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = { "com.thuyen.dev.papr" })
public class PaprApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaprApplication.class, args);
	}

}
