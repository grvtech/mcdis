package com.grvtech.cdis.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cdis_value", schema = "ncdis")
public class Cdisvalue {

	/* @GeneratedValue(strategy = GenerationType.AUTO) */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idvalue")
	private Integer idvalue;
	private Date datevalue;
	private String value;
	private int idpatient;
	private int iddata;
	private Date entrydate;
	public Cdisvalue(Integer idvalue, Date datevalue, String value, int idpatient, int iddata, Date entrydate) {
		super();
		this.idvalue = idvalue;
		this.datevalue = datevalue;
		this.value = value;
		this.idpatient = idpatient;
		this.iddata = iddata;
		this.entrydate = entrydate;
	}
	public Cdisvalue() {
		super();
		// TODO Auto-generated constructor stub
	}
	/**
	 * @return the idvalue
	 */
	public Integer getIdvalue() {
		return idvalue;
	}
	/**
	 * @param idvalue
	 *            the idvalue to set
	 */
	public void setIdvalue(Integer idvalue) {
		this.idvalue = idvalue;
	}
	/**
	 * @return the datevalue
	 */
	public Date getDatevalue() {
		return datevalue;
	}
	/**
	 * @param datevalue
	 *            the datevalue to set
	 */
	public void setDatevalue(Date datevalue) {
		this.datevalue = datevalue;
	}
	/**
	 * @return the value
	 */
	public String getValue() {
		return value;
	}
	/**
	 * @param value
	 *            the value to set
	 */
	public void setValue(String value) {
		this.value = value;
	}
	/**
	 * @return the idpatient
	 */
	public int getIdpatient() {
		return idpatient;
	}
	/**
	 * @param idpatient
	 *            the idpatient to set
	 */
	public void setIdpatient(int idpatient) {
		this.idpatient = idpatient;
	}
	/**
	 * @return the iddata
	 */
	public int getIddata() {
		return iddata;
	}
	/**
	 * @param iddata
	 *            the iddata to set
	 */
	public void setIddata(int iddata) {
		this.iddata = iddata;
	}
	/**
	 * @return the entrydate
	 */
	public Date getEntrydate() {
		return entrydate;
	}
	/**
	 * @param entrydate
	 *            the entrydate to set
	 */
	public void setEntrydate(Date entrydate) {
		this.entrydate = entrydate;
	}

}
