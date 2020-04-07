package com.grvtech.cdis.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.jdbc.core.RowMapper;

import com.grvtech.cdis.model.Value;

public class ValueMapper implements RowMapper<Value> {
	@Override
	public Value mapRow(ResultSet rs, int rowNum) throws SQLException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Value value = new Value();
		value.setIdvalue(rs.getInt("idvalue"));
		value.setIddata(rs.getInt("iddata"));
		value.setDate(rs.getDate("datevalue"));
		value.setEntrydate(rs.getDate("entrydate"));
		value.setValue(rs.getString("value"));
		System.out.println("anoter value " + sdf.format(new Date()));
		return value;
	}
}
