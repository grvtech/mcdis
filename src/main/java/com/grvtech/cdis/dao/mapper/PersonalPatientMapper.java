package com.grvtech.cdis.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.grvtech.cdis.model.PersonalPatient;

public class PersonalPatientMapper implements RowMapper<PersonalPatient> {

	@Override
	public PersonalPatient mapRow(ResultSet rs, int rowNum) throws SQLException {
		PersonalPatient sp = new PersonalPatient();
		sp.setChart(rs.getInt("chart"));
		sp.setFirstname(rs.getString("fname"));
		sp.setLastname(rs.getString("lname"));
		sp.setNextvisit(rs.getDate("nextvisit"));
		sp.setIdpatient(rs.getInt("idpatient"));
		sp.setRamq(rs.getString("ramq"));
		sp.setCommunity(rs.getString("community"));
		return sp;
	}

}
