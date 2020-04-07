package com.grvtech.cdis.model;

public class DataLimits {
	private long iddata;
	private String maxvalue;
	private String minvalue;
	private String startvalue;
	private String endvalue;
	public DataLimits() {
		super();
		// TODO Auto-generated constructor stub
	}
	public DataLimits(long iddata, String maxvalue, String minvalue, String startvalue, String endvalue) {
		super();
		this.iddata = iddata;
		this.maxvalue = maxvalue;
		this.minvalue = minvalue;
		this.startvalue = startvalue;
		this.endvalue = endvalue;
	}
	public long getIddata() {
		return iddata;
	}
	public void setIddata(long iddata) {
		this.iddata = iddata;
	}
	public String getMaxvalue() {
		return maxvalue;
	}
	public void setMaxvalue(String maxvalue) {
		this.maxvalue = maxvalue;
	}
	public String getMinvalue() {
		return minvalue;
	}
	public void setMinvalue(String minvalue) {
		this.minvalue = minvalue;
	}
	public String getStartvalue() {
		return startvalue;
	}
	public void setStartvalue(String startvalue) {
		this.startvalue = startvalue;
	}
	public String getEndvalue() {
		return endvalue;
	}
	public void setEndvalue(String endvalue) {
		this.endvalue = endvalue;
	}
	
	
}
