package com.grvtech.cdis.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.grvtech.cdis.model.PatientHcp;
import com.grvtech.cdis.model.SearchPatient;

@Repository
public interface IPatientCustomDao {
	public List<SearchPatient> searchPatient(String criteria, String value);
	public PatientHcp getPatienthcp(long idpatient);
}
