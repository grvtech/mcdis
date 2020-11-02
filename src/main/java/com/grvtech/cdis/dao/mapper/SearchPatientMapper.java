package com.grvtech.cdis.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.grvtech.cdis.model.SearchPatient;

public class SearchPatientMapper implements RowMapper<SearchPatient> {

	@Override
	public SearchPatient mapRow(ResultSet rs, int rowNum) throws SQLException {
		SearchPatient sp = new SearchPatient();
		sp.setChart(rs.getInt("chart"));
		sp.setFirstname(rs.getString("fname"));
		sp.setLastname(rs.getString("lname"));
		sp.setGiu(rs.getString("giu"));
		sp.setIdpatient(rs.getInt("idpatient"));
		sp.setRamq(rs.getString("ramq"));
		sp.setCommunity(rs.getString("community"));
		return sp;
	}

}
