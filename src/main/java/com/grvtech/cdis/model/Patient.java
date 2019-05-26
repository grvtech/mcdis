/**
 * 
 */
package com.grvtech.cdis.model;


import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Hashtable;
import java.util.Vector;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.sql.DataSource;


/**
 * @author radu
 *
 */
@Entity
@Table(name = "patient", schema = "ncdis")
public class Patient {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idpatient")
	private int idpatient;
	private String ramq;
	private String chart;
	private String band;
	private String giu;
	private String jbnqa;
	private String fname;
	private String lname;
	private String sex; //1 Male | 2 Female
	private String dob; //date of birth
	private String mfname;
	private String mlname;
	private String pfname;
	private String plname;
	private String address;
	private String city;
	private String province;
	private String idprovince;
	private String postalcode;
	private int consent;
	private int iscree;
	private String dod;//date of death
	private String dcause;
	private String entrydate;
	private String idcommunity;
	
	private String phone;
	
	public Patient(int idpatient, String ramq, String chart, String band,
			String giu, String jbnqa, String fname, String lname, String sex,
			String dob, String mfname, String mlname, String pfname,
			String plname, String address, String city, String province,
			String postalcode, int consent, int iscree, String dod,
			String dcause, String entrydate,  String idcommunity, String idprovince,String phone) {
		super();
		this.idpatient = idpatient;
		this.ramq = ramq;
		this.chart = chart;
		this.band = band;
		this.giu = giu;
		this.jbnqa = jbnqa;
		this.fname = fname;
		this.lname = lname;
		this.sex = sex;
		if(dob!= null && dob.equals("1900-01-01")){
			this.dob = "";
		}else{
			this.dob = dob;
		}
		this.mfname = mfname;
		this.mlname = mlname;
		this.pfname = pfname;
		this.plname = plname;
		this.address = address;
		this.city = city;
		this.province = province;
		this.idprovince = idprovince;
		this.postalcode = postalcode;
		this.consent = consent;
		this.iscree = iscree;
		if( dod!=null && dod.equals("1900-01-01")){
			this.dod = "";
		}else{
			this.dod = dod;
		}
		this.dcause = dcause;
		this.entrydate = entrydate;
		this.idcommunity = idcommunity;
		
		this.phone= phone;
	}
	
	
	
	public Patient() {
		super();
		idpatient = 0;
	}
	
	
	public String getIdprovince() {
		return idprovince;
	}

	public void setIdprovince(String idprovince) {
		this.idprovince = idprovince;
	}
	
	
	public String getIdcommunity() {
		return idcommunity;
	}

	public void setIdcommunity(String idcommunity) {
		this.idcommunity = idcommunity;
	}

	
	public boolean isValidPatient(){
		if(idpatient == 0 )return false;
		else return true;
	}

	
	
	public int getIdpatient() {
		return idpatient;
	}

	public void setIdpatient(int idpatient) {
		this.idpatient = idpatient;
	}

	public String getRamq() {
		return ramq;
	}

	public void setRamq(String ramq) {
		this.ramq = ramq;
	}

	public String getChart() {
		return chart;
	}

	public void setChart(String chart) {
		this.chart = chart;
	}

	public String getBand() {
		return band;
	}

	public void setBand(String band) {
		this.band = band;
	}

	public String getGiu() {
		return giu;
	}

	public void setGiu(String giu) {
		this.giu = giu;
	}

	public String getJbnqa() {
		return jbnqa;
	}

	public void setJbnqa(String jbnqa) {
		this.jbnqa = jbnqa;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getMfname() {
		return mfname;
	}

	public void setMfname(String mfname) {
		this.mfname = mfname;
	}

	public String getMlname() {
		return mlname;
	}

	public void setMlname(String mlname) {
		this.mlname = mlname;
	}

	public String getPfname() {
		return pfname;
	}

	public void setPfname(String pfname) {
		this.pfname = pfname;
	}

	public String getPlname() {
		return plname;
	}

	public void setPlname(String plname) {
		this.plname = plname;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getPostalcode() {
		return postalcode;
	}

	public void setPostalcode(String postalcode) {
		this.postalcode = postalcode;
	}

	public int getConsent() {
		return consent;
	}

	public void setConsent(int consent) {
		this.consent = consent;
	}

	public int getIscree() {
		return iscree;
	}

	public void setIscree(int iscree) {
		this.iscree = iscree;
	}

	public String getDod() {
		return dod;
	}

	public void setDod(String dod) {
		this.dod = dod;
	}

	public String getDcause() {
		return dcause;
	}

	public void setDcause(String dcause) {
		this.dcause = dcause;
	}

	public String getEntrydate() {
		return entrydate;
	}

	public void setEntrydate(String entrydate) {
		this.entrydate = entrydate;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	

	
}
