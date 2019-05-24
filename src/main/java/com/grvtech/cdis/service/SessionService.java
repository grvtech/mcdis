package com.grvtech.cdis.service;

import java.sql.Timestamp;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grvtech.cdis.dao.ISessionDao;
import com.grvtech.cdis.model.Session;

@Service
public class SessionService implements ISessionService {

	@Autowired
	ISessionDao sdao;

	@Override
	public boolean isValid(String idsession) {
		return sdao.existsById(idsession);
	}

	@Override
	public boolean addSession(Session session) {
		Session t = sdao.save(session);
		return sdao.existsById(t.getIdsession());
	}

	@Override
	public boolean updateSession(Session session) {
		session.setModified(new Timestamp(new Date().getTime()));
		Session t = sdao.save(session);
		return sdao.existsById(t.getIdsession());
	}

	@Override
	public boolean deleteSession(Session session) {
		sdao.delete(session);
		return !sdao.existsById(session.getIdsession());
	}

	@Override
	public Session getSession(String idsession) {
		return sdao.getOne(idsession);
	}

	@Override
	public Session getSessionByIdUser(int iduser) {
		Session s = sdao.findByIdUser(iduser);
		System.out.println("aaaaaaaaaaaaa" + s.getIdsession());
		return s;
	}

}
