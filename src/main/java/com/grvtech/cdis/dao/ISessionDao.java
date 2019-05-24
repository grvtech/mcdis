package com.grvtech.cdis.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grvtech.cdis.model.Session;

public interface ISessionDao extends JpaRepository<Session, Integer> {
	public boolean isValid(Integer idsession);
	
}
