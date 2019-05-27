package com.grvtech.cdis.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.grvtech.cdis.model.Patient;

@Repository
public interface IPatientDao extends JpaRepository<Patient, Long> {

}
