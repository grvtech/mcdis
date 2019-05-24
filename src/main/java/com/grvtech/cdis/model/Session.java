package com.grvtech.cdis.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "session", schema = "ncdis")
public class Session {

	/* @GeneratedValue(strategy = GenerationType.IDENTITY) */
	/* @GeneratedValue(strategy = GenerationType.AUTO) */
	@Id
	private String idsession;
	private int iduser;
	private String ipuser;
	private Timestamp created;
	private Timestamp modified;
	private int reswidth;
	private int resheight;
	private int active;

	public int getActive() {
		return active;
	}

	public void setActive(int active) {
		this.active = active;
	}

	public Timestamp getModified() {
		return modified;
	}

	public void setModified(Timestamp modified) {
		this.modified = modified;
	}

	public int getReswidth() {
		return reswidth;
	}

	public void setReswidth(int reswidth) {
		this.reswidth = reswidth;
	}

	public int getResheight() {
		return resheight;
	}

	public void setResheight(int resheight) {
		this.resheight = resheight;
	}

	public Session() {
		super();
	}

	public Session(String idsession, int iduser, String ipuser, Timestamp created, Timestamp modified, int reswidth, int resheight, int active) {
		super();
		this.idsession = idsession;
		this.iduser = iduser;
		this.ipuser = ipuser;
		this.created = created;
		this.modified = modified;
		this.reswidth = reswidth;
		this.resheight = resheight;
		this.active = active;
	}

	public String getIdsession() {
		return idsession;
	}

	public void setIdsession(String idsession) {
		this.idsession = idsession;
	}

	public int getIduser() {
		return iduser;
	}

	public void setIduser(int iduser) {
		this.iduser = iduser;
	}

	public String getIpuser() {
		return ipuser;
	}

	public void setIpuser(String ipuser) {
		this.ipuser = ipuser;
	}

	public Timestamp getCreated() {
		return created;
	}

	public void setCreated(Timestamp created) {
		this.created = created;
	}

}
