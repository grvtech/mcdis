package com.grvtech.cdis.model;

public class PatientHcp {
	private int idpatienthcp;
	private int idpatient;
	private User md;
	private User nur;
	private User nut;
	private User chr;
	public PatientHcp() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PatientHcp(int idpatienthcp, int idpatient, User md, User nur, User nut, User chr) {
		super();
		this.idpatienthcp = idpatienthcp;
		this.idpatient = idpatient;
		this.md = md;
		this.nur = nur;
		this.nut = nut;
		this.chr = chr;
	}
	public int getIdpatienthcp() {
		return idpatienthcp;
	}
	public void setIdpatienthcp(int idpatienthcp) {
		this.idpatienthcp = idpatienthcp;
	}
	public int getIdpatient() {
		return idpatient;
	}
	public void setIdpatient(int idpatient) {
		this.idpatient = idpatient;
	}
	public User getMd() {
		return md;
	}
	public void setMd(User md) {
		this.md = md;
	}
	public User getNur() {
		return nur;
	}
	public void setNur(User nur) {
		this.nur = nur;
	}
	public User getNut() {
		return nut;
	}
	public void setNut(User nut) {
		this.nut = nut;
	}
	public User getChr() {
		return chr;
	}
	public void setChr(User chr) {
		this.chr = chr;
	}
	
	
	
	
	
}
