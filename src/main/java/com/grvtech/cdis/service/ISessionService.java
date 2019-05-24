package com.grvtech.cdis.service;

import com.grvtech.cdis.model.Session;

public interface ISessionService {
	public boolean isValid(String idsession);
	public boolean addSession(Session session);
	public boolean updateSession(Session session);
	public boolean deleteSession(Session session);
	public Session getSession(String idsession);
	public Session getSessionByIdUser(int iduser);

}
