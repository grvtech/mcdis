package com.grvtech.cdis.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.grvtech.cdis.model.Session;

@Repository
public interface ISessionDao extends JpaRepository<Session, String> {

	/*
	 * @Query("SELECT con FROM Contact con  WHERE con.phoneType=(:pType) AND con.lastName= (:lName)"
	 * ) List<Contact> findByLastNameAndPhoneType(@Param("pType") PhoneType
	 * pType, @Param("lName") String lName);
	 */

	@Query(value = "select top 1 * from ncdis.session where iduser = :iduser order by modified desc", nativeQuery = true)
	Session findByIdUser(@Param("iduser") Integer iduser);
}
