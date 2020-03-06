package com.grvtech.cdis.model;

import java.util.List;

public class Section {
	private int idsection;
	private List<Cdisdata> data;
	private List<Cdisvalue> values;
	public Section(int idsection, List<Cdisdata> data, List<Cdisvalue> values) {
		super();
		this.idsection = idsection;
		this.data = data;
		this.values = values;
	}
	public Section() {
		super();
		// TODO Auto-generated constructor stub
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
	 * @return the data
	 */
	public List<Cdisdata> getData() {
		return data;
	}
	/**
	 * @param data
	 *            the data to set
	 */
	public void setData(List<Cdisdata> data) {
		this.data = data;
	}
	/**
	 * @return the values
	 */
	public List<Cdisvalue> getValues() {
		return values;
	}
	/**
	 * @param values
	 *            the values to set
	 */
	public void setValues(List<Cdisvalue> values) {
		this.values = values;
	}

}
