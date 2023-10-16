package com.tasswit;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PartyController {
	@Autowired
	private PartyService service; 
	@GetMapping("/api/partis")
	public List<Party> list() {
		return service.listAll();
	}
	
	@GetMapping("/api/partis/{id}")
	public ResponseEntity<Party> get(@PathVariable Integer id) {
		try {
			Party p = service.get(id);
			return new ResponseEntity<Party>(p, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Party>(HttpStatus.NOT_FOUND);
		}
	}
	



}
