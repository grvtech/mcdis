package com.grvtech.cdis.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Repository;

@Repository
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	/* @GeneratedValue(strategy = GenerationType.AUTO) */
	private Integer iduser;
	private String lname;
	private String fname;
	private String username;
	private String password;
	private int idcommunity;
	private String phone;
	private int active;
	private int idprofesion;

	public User(Integer iduser, String lname, String fname, String username, String password, int idcommunity, String phone, int active, int idprofesion) {
		super();
		this.iduser = iduser;
		this.lname = lname;
		this.fname = fname;
		this.username = username;
		this.password = password;
		this.idcommunity = idcommunity;
		this.phone = phone;
		this.active = active;
		this.idprofesion = idprofesion;
	}

	public User() {
		super();
		this.iduser = 0;
	}

	public boolean isEmpty() {
		if (this.iduser == 0)
			return true;
		else
			return false;
	}

	/**
	 * @return the iduser
	 */
	public Integer getIduser() {
		return iduser;
	}
	/**
	 * @param iduser
	 *            the iduser to set
	 */
	public void setIduser(Integer iduser) {
		this.iduser = iduser;
	}
	/**
	 * @return the lname
	 */
	public String getLname() {
		return lname;
	}
	/**
	 * @param lname
	 *            the lname to set
	 */
	public void setLname(String lname) {
		this.lname = lname;
	}
	/**
	 * @return the fname
	 */
	public String getFname() {
		return fname;
	}
	/**
	 * @param fname
	 *            the fname to set
	 */
	public void setFname(String fname) {
		this.fname = fname;
	}
	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}
	/**
	 * @param username
	 *            the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * @param password
	 *            the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**
	 * @return the idcommunity
	 */
	public int getIdcommunity() {
		return idcommunity;
	}
	/**
	 * @param idcommunity
	 *            the idcommunity to set
	 */
	public void setIdcommunity(int idcommunity) {
		this.idcommunity = idcommunity;
	}
	/**
	 * @return the phone
	 */
	public String getPhone() {
		return phone;
	}
	/**
	 * @param phone
	 *            the phone to set
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}
	/**
	 * @return the active
	 */
	public int getActive() {
		return active;
	}
	/**
	 * @param active
	 *            the active to set
	 */
	public void setActive(int active) {
		this.active = active;
	}
	/**
	 * @return the idprofesion
	 */
	public int getIdprofesion() {
		return idprofesion;
	}
	/**
	 * @param idprofesion
	 *            the idprofesion to set
	 */
	public void setIdprofesion(int idprofesion) {
		this.idprofesion = idprofesion;
	}

}
