package com.tasswit;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Properties;
import java.util.Random;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	@Autowired
	private UserService service;
	
	@GetMapping("/api/users")
	public List<User> list() {
		return service.listAll();
	}
	
	@GetMapping("/api/users/{cnie}")
	public ResponseEntity<User> get(@PathVariable String cnie) {
		try {
			User user = service.get(cnie);
			return new ResponseEntity<User>(user, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/api/users/login")//login criteria to use LATER if time
	public ResponseEntity<User> get(@RequestBody User u) {
		User existUser = service.checkAndGet(u);
		if (existUser != null) {
			return new ResponseEntity<User>(existUser, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}
	
	
	@PostMapping("/api/users")
	public void add(@RequestBody User user) {
		service.save(user);
	}
	
	@PutMapping("/api/users/{cnie}")
	public ResponseEntity<?> update(@RequestBody User user, @PathVariable String cnie) {//convert repre to java obj
		try {
			User existUser = service.get(cnie);
			service.save(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
		} catch(NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/api/users/{cnie}")
	public void delete(@PathVariable String cnie) {
		service.delete(cnie);
	}
	
	@PutMapping("/api/users/email")
	private ResponseEntity<?> sendmail(@RequestBody User user) throws AddressException, MessagingException, IOException {
		try {
		   Properties props = new Properties();
		   props.put("mail.smtp.auth", "true");
		   props.put("mail.smtp.starttls.enable", "true");
		   props.put("mail.smtp.host", "smtp.gmail.com");
		   props.put("mail.smtp.port", "587");
		   
		   Session session = Session.getInstance(props, new javax.mail.Authenticator() {
		      protected PasswordAuthentication getPasswordAuthentication() {
		         return new PasswordAuthentication("", "");
		      }
		   });
		   Random ran = new Random();
		   String code = "";
		   for (int i = 0; i < 4; i++) {
			   int tmp = ran.nextInt((9 - 0 + 1) + 0);
			   code += String.valueOf(tmp);
		   }
		   Message msg = new MimeMessage(session);
		   msg.setFrom(new InternetAddress("", false));

		   msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(user.getEmail()));
		   msg.setSubject("Verification code for TASSWIT");
		   msg.setContent("Your verification code for E-Elections is : " + code, "text/html");
		   msg.setSentDate(new Date());

		   user.setDigitsVerif(code);//if match proceed later on
		   service.save(user);//save new code
		   
		   Transport.send(msg);   
		   return new ResponseEntity<User>(user, HttpStatus.OK);
		} catch(NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
		
}
