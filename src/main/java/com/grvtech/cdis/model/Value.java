package com.grvtech.cdis.model;

import java.util.Comparator;
import java.util.Date;

public class Value {
	private int idvalue;
	private String value;
	private Date date;
	private int iddata;
	private Date entrydate;
	

	public Value(int idvalue, String value, Date date, int iddata, Date entrydate) {
		super();
		this.idvalue = idvalue;
		this.value = value;
		this.date = date;
		this.iddata = iddata;
		this.entrydate = entrydate;
	}

	public Value() {
		// TODO Auto-generated constructor stub
	}


	public int getIdvalue() {
		return idvalue;
	}
	public void setIdvalue(int idvalue) {
		this.idvalue = idvalue;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}

	public int getIddata() {
		return iddata;
	}

	public void setIddata(int iddata) {
		this.iddata = iddata;
	}

	public Date getEntrydate() {
		return entrydate;
	}

	public void setEntrydate(Date entrydate) {
		this.entrydate = entrydate;
	}

}
