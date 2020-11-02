package com.grvtech.cdis.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grvtech.cdis.dao.ICdisdata;
import com.grvtech.cdis.dao.ICdisvalueDao;
import com.grvtech.cdis.dao.IPatientCustomDao;
import com.grvtech.cdis.dao.IPatientDao;
import com.grvtech.cdis.model.Cdisdata;
import com.grvtech.cdis.model.DataLimits;
import com.grvtech.cdis.model.Patient;
import com.grvtech.cdis.model.PatientHcp;
import com.grvtech.cdis.model.Value;


@Service
public class PatientService implements IPatientService {

	@Autowired
	IPatientDao pdao;
	
	@Autowired
	IPatientCustomDao pcdao;
	
	@Autowired
	ICdisvalueDao cvdao;
	
	@Autowired
	ICdisdata cddao;
	
	@Override
	public Patient getPatientById(long id) {
		Patient result = new Patient();
		Optional<Patient> op = pdao.findById(id);
		if(op.isPresent()) result = op.get();
		return result;
	}
	
	

	@Override
	public Patient getPatientByRamq(String ramq) {
		return pdao.findByRamq(ramq);
	}

	@Override
	public Patient getPatientRecord(long id) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public ArrayList<Value> getPatientDiabetHistory(int id) {
		ArrayList<Value> result = new ArrayList<>();
		List<Value> l = cvdao.getPatientDataValues(id, 1);
		if(!l.isEmpty()) {
			result.addAll(l);
		}
		return result;
	}

	@Override
	public ArrayList<Value> getPatientDataHistory(int id) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
		Date d1 = new Date();
		System.out.println("--------------------------------------");
		System.out.println("before get patient data "+sdf.format(d1));
		System.out.println("--------------------------------------");
		ArrayList<Value> result = new ArrayList<>();
		List<Value> l = cvdao.getPatientValues(id);
		if(!l.isEmpty()) {
			result.addAll(l);
		}
		Date d2 = new Date();
		System.out.println("--------------------------------------");
		System.out.println("after get patient data "+sdf.format(d2));
		System.out.println("--------------------------------------");
		return result;	
	}

	@Override
	public Cdisdata getData(long id) {
		Cdisdata result = new Cdisdata();
		Optional<Cdisdata> op =  cddao.findById(id);
		if(op.isPresent()) {
			result = op.get();
		}
		return result;
	}

	@Override
	public DataLimits getDataLimits(long id) {
		// TODO Auto-generated method stub
		return null;
	}



	@Override
	public PatientHcp getPatientHcp(long idpatient) {
		return pcdao.getPatienthcp(idpatient);
	}

}
