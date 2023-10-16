package com.tasswit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PartyService {
	@Autowired
	private PartyRepository repo;
	
	public List<Party> listAll() {
		return repo.findAll();
	}

	
	public void save(Party p) {//register/update user
		repo.save(p);
	}
	
	public Party get(Integer id) {//get user by cnie
		return repo.findById(id).get();
	}
	
	public void delete(Integer id) {//delete user
		repo.deleteById(id);
	}
	
}
