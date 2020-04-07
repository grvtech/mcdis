package com.grvtech.cdis.service;

import java.util.ArrayList;

import com.grvtech.cdis.model.Cdisdata;
import com.grvtech.cdis.model.DataLimits;
import com.grvtech.cdis.model.Patient;
import com.grvtech.cdis.model.Value;

public interface IPatientService {
	public Patient getPatientById(long id);
	public Patient getPatientByRamq(String ramq);
	public Patient getPatientRecord(long id);
	public ArrayList<Value> getPatientDiabetHistory(int id);
	public ArrayList<Value> getPatientDataHistory(int id);
	public Cdisdata getData(long id);
	public DataLimits getDataLimits(long id);
	
}
