package com.grvtech.cdis.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.grvtech.cdis.model.Complications;
import com.grvtech.cdis.model.Diabet;
import com.grvtech.cdis.model.Lab;
import com.grvtech.cdis.model.Lipid;
import com.grvtech.cdis.model.Meds;
import com.grvtech.cdis.model.Miscellaneous;
import com.grvtech.cdis.model.Renal;
import com.grvtech.cdis.model.Values;
import com.grvtech.cdis.model.Visit;

public class DataDao implements IDataDao {

	@Autowired
	JdbcTemplate jdbctemplate;

	@Override
	public Values getValuesPatientData(int idpatient, int iddata) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Values getValuesPatientData(int idpatient, String codedata) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Lab getLabPatient(int idpatient) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Renal getRenalPatient(int idpatient) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Lipid getLipidPatient(int idpatient) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Visit getVisitPatient(int idpatient) {
		String sql = "select vv.idvalue, vv.datevalue as date, vv.value, dd.data_order as order, dd.data_unit as unit, dd.data_type as vtype, dd.data_code as code, dd.data_name as name from ncdis.cdis_value vv left join ncdis.cdis_data dd on vv.iddata = dd.iddata where vv.idpatient = '"
				+ idpatient + "' and dd.idsection=3 order by vv.datevalue desc";
		jdbctemplate.query(sql, new ValueMapper());

		return null;
	}

	@Override
	public Diabet getDiabetPatient(int idpatient) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Complications getComplicationsPatient(int idpatient) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Meds getMedsPatient(int idpatient) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Miscellaneous getMiscellaneousPatient(int idpatient) {
		// TODO Auto-generated method stub
		return null;
	}

}
