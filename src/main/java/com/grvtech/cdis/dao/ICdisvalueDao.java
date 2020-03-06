package com.grvtech.cdis.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.grvtech.cdis.model.Cdisvalue;

public interface ICdisvalueDao extends JpaRepository<Cdisvalue, Long> {

	@Query(value = "select * from ncdis.cdisvalue where idpatient = :idpatient order by datevalue desc", nativeQuery = true)
	List<Cdisvalue> getPatientValues(int idpatient);

	@Query(value = "select * from ncdis.cdisvalue where idpatient = :idpatient and iddata= :iddata order by datevalue desc", nativeQuery = true)
	List<Cdisvalue> getPatientDataValues(int idpatient, int iddata);

}
