/**
 * 
 */
package com.grvtech.cdis.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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
	private String sex; // 1 Male | 2 Female
	private Date dob; // date of birth
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
	private Date dod;// date of death
	private String death_cause;
	private String dcause;
	private Date entrydate;
	private String idcommunity;
	private String phone;
	private int active;

	public Patient() {
		super();
		idpatient = 0;
	}

	public Patient(int idpatient, String ramq, String chart, String band, String giu, String jbnqa, String fname, String lname, String sex, Date dob, String mfname, String mlname, String pfname,
			String plname, String address, String city, String province, String idprovince, String postalcode, int consent, int iscree, Date dod, String death_cause, String dcause, Date entrydate,
			String idcommunity, String phone, int active) {
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
		this.dob = dob;
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
		this.dod = dod;
		this.death_cause = death_cause;
		this.dcause = dcause;
		this.entrydate = entrydate;
		this.idcommunity = idcommunity;
		this.phone = phone;
		this.active = active;
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
	 * @return the ramq
	 */
	public String getRamq() {
		return ramq;
	}

	/**
	 * @param ramq
	 *            the ramq to set
	 */
	public void setRamq(String ramq) {
		this.ramq = ramq;
	}

	/**
	 * @return the chart
	 */
	public String getChart() {
		return chart;
	}

	/**
	 * @param chart
	 *            the chart to set
	 */
	public void setChart(String chart) {
		this.chart = chart;
	}

	/**
	 * @return the band
	 */
	public String getBand() {
		return band;
	}

	/**
	 * @param band
	 *            the band to set
	 */
	public void setBand(String band) {
		this.band = band;
	}

	/**
	 * @return the giu
	 */
	public String getGiu() {
		return giu;
	}

	/**
	 * @param giu
	 *            the giu to set
	 */
	public void setGiu(String giu) {
		this.giu = giu;
	}

	/**
	 * @return the jbnqa
	 */
	public String getJbnqa() {
		return jbnqa;
	}

	/**
	 * @param jbnqa
	 *            the jbnqa to set
	 */
	public void setJbnqa(String jbnqa) {
		this.jbnqa = jbnqa;
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
	 * @return the sex
	 */
	public String getSex() {
		return sex;
	}

	/**
	 * @param sex
	 *            the sex to set
	 */
	public void setSex(String sex) {
		this.sex = sex;
	}

	/**
	 * @return the dob
	 */
	public Date getDob() {
		return dob;
	}

	/**
	 * @param dob
	 *            the dob to set
	 */
	public void setDob(Date dob) {
		this.dob = dob;
	}

	/**
	 * @return the mfname
	 */
	public String getMfname() {
		return mfname;
	}

	/**
	 * @param mfname
	 *            the mfname to set
	 */
	public void setMfname(String mfname) {
		this.mfname = mfname;
	}

	/**
	 * @return the mlname
	 */
	public String getMlname() {
		return mlname;
	}

	/**
	 * @param mlname
	 *            the mlname to set
	 */
	public void setMlname(String mlname) {
		this.mlname = mlname;
	}

	/**
	 * @return the pfname
	 */
	public String getPfname() {
		return pfname;
	}

	/**
	 * @param pfname
	 *            the pfname to set
	 */
	public void setPfname(String pfname) {
		this.pfname = pfname;
	}

	/**
	 * @return the plname
	 */
	public String getPlname() {
		return plname;
	}

	/**
	 * @param plname
	 *            the plname to set
	 */
	public void setPlname(String plname) {
		this.plname = plname;
	}

	/**
	 * @return the address
	 */
	public String getAddress() {
		return address;
	}

	/**
	 * @param address
	 *            the address to set
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	/**
	 * @return the city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * @param city
	 *            the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * @return the province
	 */
	public String getProvince() {
		return province;
	}

	/**
	 * @param province
	 *            the province to set
	 */
	public void setProvince(String province) {
		this.province = province;
	}

	/**
	 * @return the idprovince
	 */
	public String getIdprovince() {
		return idprovince;
	}

	/**
	 * @param idprovince
	 *            the idprovince to set
	 */
	public void setIdprovince(String idprovince) {
		this.idprovince = idprovince;
	}

	/**
	 * @return the postalcode
	 */
	public String getPostalcode() {
		return postalcode;
	}

	/**
	 * @param postalcode
	 *            the postalcode to set
	 */
	public void setPostalcode(String postalcode) {
		this.postalcode = postalcode;
	}

	/**
	 * @return the consent
	 */
	public int getConsent() {
		return consent;
	}

	/**
	 * @param consent
	 *            the consent to set
	 */
	public void setConsent(int consent) {
		this.consent = consent;
	}

	/**
	 * @return the iscree
	 */
	public int getIscree() {
		return iscree;
	}

	/**
	 * @param iscree
	 *            the iscree to set
	 */
	public void setIscree(int iscree) {
		this.iscree = iscree;
	}

	/**
	 * @return the dod
	 */
	public Date getDod() {
		return dod;
	}

	/**
	 * @param dod
	 *            the dod to set
	 */
	public void setDod(Date dod) {
		this.dod = dod;
	}

	/**
	 * @return the death_cause
	 */
	public String getDeath_cause() {
		return death_cause;
	}

	/**
	 * @param death_cause
	 *            the death_cause to set
	 */
	public void setDeath_cause(String death_cause) {
		this.death_cause = death_cause;
	}

	/**
	 * @return the dcause
	 */
	public String getDcause() {
		return dcause;
	}

	/**
	 * @param dcause
	 *            the dcause to set
	 */
	public void setDcause(String dcause) {
		this.dcause = dcause;
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

	/**
	 * @return the idcommunity
	 */
	public String getIdcommunity() {
		return idcommunity;
	}

	/**
	 * @param idcommunity
	 *            the idcommunity to set
	 */
	public void setIdcommunity(String idcommunity) {
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

}
