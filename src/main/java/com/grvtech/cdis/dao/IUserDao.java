package com.grvtech.cdis.dao;

import org.springframework.stereotype.Repository;

import com.grvtech.cdis.model.User;

@Repository
public interface IUserDao {
	public boolean addUser(User user);
	public int editUser(User user);
	public boolean deleteUser(User user);
	public boolean deactivateUser(User user);
	public User getUserByUsernamePassword(String username, String password);
	public User getUserById(long id);

}
