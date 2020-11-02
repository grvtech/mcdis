package com.grvtech.cdis.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.grvtech.cdis.dao.mapper.PersonalPatientMapper;
import com.grvtech.cdis.dao.mapper.UserMapper;
import com.grvtech.cdis.model.PersonalPatient;
import com.grvtech.cdis.model.User;

@Service
public class UserDao implements IUserDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public boolean addUser(User user) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public int editUser(User user) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public boolean deleteUser(User user) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean deactivateUser(User user) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public User getUserByUsernamePassword(String username, String password) {
		List<User> users = jdbcTemplate.query("select * from ncdis.ncdis.users where username = '" + username + "' and password = '" + password + "'", new UserMapper());
		if (users.isEmpty())
			return new User();
		return users.get(0);
	}

	@Override
	public User getUserById(long id) {
		List<User> users = jdbcTemplate.query("select * from ncdis.ncdis.users where iduser = '" + id + "'", new UserMapper());
		if (users.isEmpty())
			return new User();
		return users.get(0);
	}

	@Override
	public User getUserBySession(String usersession) {
		List<User> users = jdbcTemplate.query("select uu.* from ncdis.ncdis.users uu left join ncdis.ncdis.session ee on uu.iduser=ee.iduser where ee.idsession = '"+usersession+"'", new UserMapper());
		if (users.isEmpty())
			return new User();
		return users.get(0);
	}

	@Override
	public ArrayList<PersonalPatient> getPersonalPatients(long iduser, String usertype) {
		String sql = "select uu.idpatient,ee.fname, ee.lname, ee.chart, ee.ramq, ff.name_en as community, dateadd(month, CEILING(DATEDIFF(month, hh.datevisit, GETDATE()) / cast (hh.frequency as float)) * hh.frequency ,   hh.datevisit) as nextvisit  "
				+ " from ncdis.ncdis.patient_hcp uu left join ncdis.ncdis.patient ee on uu.idpatient=ee.idpatient"
				+ " left join ncdis.ncdis.community ff on ee.idcommunity = ff.idcommunity "
				+ " left join ncdis.ncdis.schedulevisits hh on uu.idpatient = hh.idpatient and hh.iduser = '"+iduser+"' "
						+ " where uu."+usertype+" = '"+iduser+"'";
		System.out.println(sql);
		List<PersonalPatient> patients = jdbcTemplate.query(sql, new PersonalPatientMapper());
		
		
		
		return (ArrayList<PersonalPatient>) patients;
	}

	@Override
	public String getUserProfesion(long iduser) {
		User u = getUserById(iduser);
		String sql = "select profesion_code from ncdis.ncdis.profesion where idprofesion = '"+u.getIdprofesion()+"'";
		List<Map<String, Object>> codes = jdbcTemplate.queryForList(sql);
		if(codes.isEmpty()) {
			return "";
		}else {
			Map<String, Object> cod = codes.get(0);
			return cod.get("profesion_code").toString();
		}
	}

}
