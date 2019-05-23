package com.grvtech.cdis.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grvtech.cdis.dao.IUserDao;
import com.grvtech.cdis.model.User;

@Service
public class UserService implements IUserService {

	@Autowired
	IUserDao udao;

	@Override
	public User getUserById(long id) {
		return udao.getUserById(id);
	}

	@Override
	public User getUserByUsernamePassword(String username, String password) {
		return udao.getUserByUsernamePassword(username, password);
	}

}
