package com.grvtech.cdis.dao;

import org.springframework.stereotype.Repository;

import com.grvtech.cdis.model.Complications;
import com.grvtech.cdis.model.Diabet;
import com.grvtech.cdis.model.Lab;
import com.grvtech.cdis.model.Lipid;
import com.grvtech.cdis.model.Meds;
import com.grvtech.cdis.model.Miscellaneous;
import com.grvtech.cdis.model.Renal;
import com.grvtech.cdis.model.Values;
import com.grvtech.cdis.model.Visit;

@Repository
public interface IDataDao {

	Values getValuesPatientData(int idpatient, int iddata);
	Values getValuesPatientData(int idpatient, String codedata);
	Lab getLabPatient(int idpatient);
	Renal getRenalPatient(int idpatient);
	Lipid getLipidPatient(int idpatient);
	Visit getVisitPatient(int idpatient);
	Diabet getDiabetPatient(int idpatient);
	Complications getComplicationsPatient(int idpatient);
	Meds getMedsPatient(int idpatient);
	Miscellaneous getMiscellaneousPatient(int idpatient);

}
