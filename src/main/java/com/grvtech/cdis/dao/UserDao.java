package com.grvtech.cdis.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.grvtech.cdis.model.User;

@Service
public class UserDao implements IUserDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public boolean addUser(User user) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public int editUser(User user) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public boolean deleteUser(User user) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean deactivateUser(User user) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public User getUserByUsernamePassword(String username, String password) {
		List<User> users = jdbcTemplate.query("select * from ncdis.ncdis.users where username = '" + username + "' and password = '" + password + "'", new UserMapper());
		if (users.isEmpty())
			return new User();
		return users.get(0);
	}

	@Override
	public User getUserById(long id) {
		List<User> users = jdbcTemplate.query("select * from ncdis.ncdis.users where iduser = '" + id + "'", new UserMapper());
		if (users.isEmpty())
			return new User();
		return users.get(0);
	}

	@Override
	public User getUserBySession(String usersession) {
		List<User> users = jdbcTemplate.query("select uu.* from ncdis.ncdis.users uu left join ncdis.ncdis.session ee on uu.iduser=ee.iduser where ee.idsession = '"+usersession+"'", new UserMapper());
		if (users.isEmpty())
			return new User();
		return users.get(0);
	}

}
