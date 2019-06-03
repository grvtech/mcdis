package com.grvtech.cdis.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.grvtech.cdis.model.Value;

public class ValueMapper implements RowMapper<Value> {
	@Override
	public Value mapRow(ResultSet rs, int rowNum) throws SQLException {
		Value value = new Value();
		value.setIdvalue(rs.getInt("idvalue"));
		value.setOrder(rs.getInt("order"));
		value.setCode(rs.getString("code"));
		value.setName(rs.getString("name"));
		value.setUnit(rs.getString("unit"));
		value.setVtype(rs.getString("vtype"));
		value.setDate(rs.getString("date"));
		value.setValue(rs.getString("value"));
		return value;
	}

}
