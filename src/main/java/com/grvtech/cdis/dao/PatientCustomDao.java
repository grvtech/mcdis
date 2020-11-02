package com.grvtech.cdis.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.grvtech.cdis.dao.mapper.PatientHcpMapper;
import com.grvtech.cdis.dao.mapper.SearchPatientMapper;
import com.grvtech.cdis.model.PatientHcp;
import com.grvtech.cdis.model.SearchPatient;

@Service
public class PatientCustomDao implements IPatientCustomDao {

	@Autowired
	JdbcTemplate jdbctemplate;

	@Override
	public List<SearchPatient> searchPatient(String criteria, String value) {
		List<SearchPatient> result = new ArrayList();
		String sql = "";
		if (criteria.equals("chart")) {
			sql = "select p.idpatient, p.fname, p.lname, p.ramq, p.chart, p.giu, c.name_en as community from ncdis.patient p left join ncdis.community c on p.idcommunity = c.idcommunity where p.chart like '"
					+ value + "%' and p.active =1 and (p.dod is null or p.dod = '1900-01-01') order by chart asc";
		} else if (criteria.equals("ramq")) {
			sql = "select p.idpatient, p.fname, p.lname, p.ramq, p.chart, p.giu, c.name_en as community from ncdis.patient p left join ncdis.community c on p.idcommunity = c.idcommunity where p.ramq like '"
					+ value + "%' and p.active =1 and (p.dod is null or p.dod = '1900-01-01') order by ramq asc";
		} else if (criteria.equals("giu")) {
			sql = "select p.idpatient, p.fname, p.lname, p.ramq, p.chart, p.giu, c.name_en as community from ncdis.patient p left join ncdis.community c on p.idcommunity = c.idcommunity where p.giu like '"
					+ value + "%' and p.active =1 and (p.dod is null or p.dod = '1900-01-01') order by giu asc";
		} else {
			sql = "select p.idpatient, p.fname, p.lname, p.ramq, p.chart, p.giu, c.name_en as community from ncdis.patient p left join ncdis.community c on p.idcommunity = c.idcommunity where (p.fname like '"
					+ value + "%' or p.lname like '\"+value+\"%') and p.active =1 and (p.dod is null or p.dod = '1900-01-01') order by lname asc";
		}

		result = jdbctemplate.query(sql, new SearchPatientMapper());
		return result;
	}

	@Override
	public PatientHcp getPatienthcp(long idpatient) {
		PatientHcp result = new PatientHcp();
		String sql = "select top 1 * from ncdis.ncdis.patient_hcp where idpatient='"+idpatient+"'";
		result = jdbctemplate.queryForObject(sql, new PatientHcpMapper());
		return result;
	}

}
