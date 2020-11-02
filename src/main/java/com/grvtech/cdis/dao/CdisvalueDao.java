package com.grvtech.cdis.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.stereotype.Service;

import com.grvtech.cdis.dao.mapper.ValueMapper;
import com.grvtech.cdis.model.Value;

@Service
public class CdisvalueDao implements ICdisvalueDao {

	@Autowired
	JdbcTemplate jdbcTemplate; 
	
	@Override
	public List<Value> getPatientValues(int idpatient) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
		Date d1 = new Date();
		System.out.println("--------------------------------------");
		System.out.println("before sql "+sdf.format(d1));
		System.out.println("--------------------------------------");
		//List<Value> values = jdbcTemplate.query("select idvalue,datevalue,value,iddata,entrydate from ncdis.ncdis.cdis_value where idpatient = '" + idpatient + "' order by datevalue desc", new ValueMapper());
		String query = "select idvalue,datevalue,value,iddata,entrydate from ncdis.ncdis.cdis_value where idpatient =? order by datevalue desc";
		List<Value> values = jdbcTemplate.query(query, new PreparedStatementSetter() {
	         public void setValues(PreparedStatement preparedStatement) throws SQLException {
	            preparedStatement.setInt(1, idpatient);
	         }}, new ValueMapper());
		Date d2 = new Date();
		System.out.println("--------------------------------------");
		System.out.println("after sql "+sdf.format(d2));
		System.out.println("--------------------------------------");
		return values;
	}

	@Override
	public List<Value> getPatientDataValues(int idpatient, int iddata) {
		String query = "select idvalue,datevalue,value,iddata,entrydate from ncdis.ncdis.cdis_value where idpatient =? and iddata=? order by datevalue desc";
		//List<Value> values = jdbcTemplate.query("select idvalue,datevalue,value,iddata,entrydate from ncdis.ncdis.cdis_value where idpatient = '" + idpatient + "' and iddata= '"+iddata+"' order by datevalue desc", new ValueMapper());
		List<Value> values = jdbcTemplate.query(query, new PreparedStatementSetter() {
	         public void setValues(PreparedStatement preparedStatement) throws SQLException {
	            preparedStatement.setInt(1, idpatient);
	            preparedStatement.setInt(2, iddata);
	         }}, new ValueMapper());
		return values;
	}

}
