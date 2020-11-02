package com.grvtech.cdis.dao;

import java.util.ArrayList;

import org.springframework.stereotype.Repository;

import com.grvtech.cdis.model.PersonalPatient;
import com.grvtech.cdis.model.User;

@Repository
public interface IUserDao {
	public boolean addUser(User user);
	public int editUser(User user);
	public boolean deleteUser(User user);
	public boolean deactivateUser(User user);
	public User getUserByUsernamePassword(String username, String password);
	public User getUserBySession(String usersession);
	public User getUserById(long id);
	public ArrayList<PersonalPatient> getPersonalPatients(long iduser, String usertype);
	public String getUserProfesion(long iduser);
}
