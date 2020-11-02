package com.grvtech.cdis.service;

import java.util.ArrayList;

import com.grvtech.cdis.model.PersonalPatient;
import com.grvtech.cdis.model.User;

public interface IUserService {
	public User getUserById(long id);
	public User getUserByUsernamePassword(String username, String password);
	public User getUserBySession(String usersession);
	public ArrayList<PersonalPatient> getPersonalpatients(long iduser);
}
