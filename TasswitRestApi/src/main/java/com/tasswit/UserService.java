package com.tasswit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	private UserRepository repo;
	
	public List<User> listAll() {//get list of all users
		return repo.findAll();
	}
	
	public void save(User user) {//register/update user
		repo.save(user);
	}
	
	public User get(String cnie) {//get user by cnie
		return repo.findById(cnie).get();
	}
	
	public void delete(String cnie) {//delete user
		repo.deleteById(cnie);
	}
	
	public User checkAndGet(User u) {
		return repo.findByCnieAndPassword(u.getCnie(), u.getPassword());
	}
}
