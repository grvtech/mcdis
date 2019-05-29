package com.grvtech.cdis.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.grvtech.cdis.model.Patient;
import com.grvtech.cdis.model.Session;

@Repository
public interface IPatientDao extends JpaRepository<Patient, Long> {

	@Query(value = "select top 1 * from ncdis.patient where ramq = :ramq", nativeQuery = true)
	Patient findByRamq(@Param("ramq") String ramq);
	
}
