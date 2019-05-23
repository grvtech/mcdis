package com.grvtech.cdis.service;

import com.grvtech.cdis.model.User;

public interface IUserService {
	public User getUserById(long id);
	public User getUserByUsernamePassword(String username, String password);

}
