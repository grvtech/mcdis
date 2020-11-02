package com.grvtech.cdis.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.grvtech.cdis.model.User;

public class UserMapper implements RowMapper<User> {

	@Override
	public User mapRow(ResultSet rs, int rowNum) throws SQLException {
		User user = new User();
		user.setIduser(rs.getInt("iduser"));
		user.setFname(rs.getString("fname"));
		user.setLname(rs.getString("lname"));
		user.setIdcommunity(rs.getInt("idcommunity"));
		user.setUsername(rs.getString("username"));
		user.setPassword(rs.getString("password"));
		user.setIdprofesion(rs.getInt("idprofesion"));
		user.setActive(rs.getInt("active"));
		user.setPhone(rs.getString("phone"));
		return user;
	}

}
