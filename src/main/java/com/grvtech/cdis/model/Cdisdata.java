package com.grvtech.cdis.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cdis_data", schema = "ncdis")
public class Cdisdata {

	/* @GeneratedValue(strategy = GenerationType.AUTO) */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "iddata")
	private Integer iddata;
	@Column(name = "data_name")
	private String name;
	@Column(name = "data_code")
	private String code;
	@Column(name = "data_unit")
	private String unit;
	@Column(name = "data_type")
	private String type;
	private int idsection;
	@Column(name = "data_order")
	private int order;
	private int active;
	public Cdisdata(Integer iddata, String name, String code, String unit, String type, int idsection, int order, int active) {
		super();
		this.iddata = iddata;
		this.name = name;
		this.code = code;
		this.unit = unit;
		this.type = type;
		this.idsection = idsection;
		this.order = order;
		this.active = active;
	}
	public Cdisdata() {
		super();
		// TODO Auto-generated constructor stub
	}
	/**
	 * @return the iddata
	 */
	public Integer getIddata() {
		return iddata;
	}
	/**
	 * @param iddata
	 *            the iddata to set
	 */
	public void setIddata(Integer iddata) {
		this.iddata = iddata;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the code
	 */
	public String getCode() {
		return code;
	}
	/**
	 * @param code
	 *            the code to set
	 */
	public void setCode(String code) {
		this.code = code;
	}
	/**
	 * @return the unit
	 */
	public String getUnit() {
		return unit;
	}
	/**
	 * @param unit
	 *            the unit to set
	 */
	public void setUnit(String unit) {
		this.unit = unit;
	}
	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}
	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}
	/**
	 * @return the idsection
	 */
	public int getIdsection() {
		return idsection;
	}
	/**
	 * @param idsection
	 *            the idsection to set
	 */
	public void setIdsection(int idsection) {
		this.idsection = idsection;
	}
	/**
	 * @return the order
	 */
	public int getOrder() {
		return order;
	}
	/**
	 * @param order
	 *            the order to set
	 */
	public void setOrder(int order) {
		this.order = order;
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
