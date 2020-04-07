package com.grvtech.cdis.dao;

import java.util.List;

import com.grvtech.cdis.model.Value;

public interface ICdisvalueDao {
	List<Value> getPatientValues(int idpatient);
	List<Value> getPatientDataValues(int idpatient, int iddata);

}
