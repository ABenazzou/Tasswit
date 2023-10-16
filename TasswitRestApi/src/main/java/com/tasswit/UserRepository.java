package com.tasswit;


import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String>{
	//User findByCnieAndPassword(User user);//different than usual operations

	User findByCnieAndPassword(String cnie, String password);
	
}
