package com.grvtech.cdis.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;

import com.grvtech.cdis.model.PatientHcp;
import com.grvtech.cdis.model.SearchPatient;
import com.grvtech.cdis.model.User;
import com.grvtech.cdis.service.IUserService;

public class PatientHcpMapper implements RowMapper<PatientHcp> {
	
	@Autowired
	IUserService ius;
	
	@Override
	public PatientHcp mapRow(ResultSet rs, int rowNum) throws SQLException {
		PatientHcp sp = new PatientHcp();
		sp.setIdpatienthcp(rs.getInt("idpatienthcp"));
		sp.setIdpatient(rs.getInt("idpatient"));
		User md = new User();
		User nur = new User();
		User nut = new User();
		User chr = new User();
		try {
			Integer idmd = rs.getInt("md");
			md = ius.getUserById(idmd);
		}catch(Exception e){}
		sp.setMd(md);
		
		try {
			Integer idnur = rs.getInt("nur");
			nur = ius.getUserById(idnur);
		}catch(Exception e){}
		sp.setNur(nur);
		

		try {
			Integer idnut = rs.getInt("nut");
			nut = ius.getUserById(idnut);
		}catch(Exception e){}
		sp.setNut(nut);
		
		try {
			Integer idchr = rs.getInt("chr");
			chr = ius.getUserById(idchr);
		}catch(Exception e){}
		sp.setChr(chr);
		
		return sp;
	}

}
