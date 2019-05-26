package com.grvtech.cdis.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grvtech.cdis.model.Patient;

public interface IPatientDao extends JpaRepository<Patient, Long>, IPatientCustomDao {

}
