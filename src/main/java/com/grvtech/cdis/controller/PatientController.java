package com.grvtech.cdis.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.grvtech.cdis.dao.IPatientCustomDao;
import com.grvtech.cdis.model.MessageRequest;
import com.grvtech.cdis.model.MessageResponse;
import com.grvtech.cdis.model.Patient;
import com.grvtech.cdis.model.PatientHcp;
import com.grvtech.cdis.model.SearchPatient;
import com.grvtech.cdis.model.Value;
import com.grvtech.cdis.service.IPatientService;
import com.grvtech.cdis.service.ISessionService;
import com.grvtech.cdis.util.HttpUtil;

@RestController
public class PatientController {

	@Autowired
	IPatientCustomDao pcdao;
	
	@Autowired
	IPatientService pservice;
	
	@Autowired
	ISessionService sessionservice;

	@RequestMapping(value = {"/service/data/searchPatient"}, method = RequestMethod.POST)
	public ResponseEntity<MessageResponse> searchPatient(final HttpServletRequest request) {
		JsonNode req = HttpUtil.getJSONFromPost(request);
		MessageRequest mreq = new MessageRequest(req);
		HashMap<String, Object> map = new HashMap<>();
		String criteria = mreq.getElements().get("criteria").asText();
		String value = mreq.getElements().get("term").asText();
		List<SearchPatient> sp = pcdao.searchPatient(criteria, value);
		map.put("search", sp);
		MessageResponse mres = new MessageResponse(true, mreq, map);
		return new ResponseEntity<MessageResponse>(mres, HttpStatus.OK);
	}

	
	@RequestMapping(value = {"/service/data/getPatientRecord"}, method = RequestMethod.POST)
	public ResponseEntity<MessageResponse> getPatientRecord(final HttpServletRequest request) {

		JsonNode req = HttpUtil.getJSONFromPost(request);
		MessageRequest mreq = new MessageRequest(req);
		HashMap<String, Object> map = new HashMap<>();
		System.out.println("req : " + req.get("ip").asText());
		System.out.println("req : " + req.get("elements"));
		String sid = req.get("uuidsession").asText();
		String ramq = mreq.getElements().get("ramq").asText();

		Patient p = pservice.getPatientByRamq(ramq);
		
		//List<SearchPatient> sp = pcdao.searchPatient(criteria, value);
		map.put("patient", p);

		MessageResponse mres = new MessageResponse(true, mreq, map);
		return new ResponseEntity<MessageResponse>(mres, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = {"/service/data/getPatient"}, method = RequestMethod.POST)
	public ResponseEntity<MessageResponse> getPatient(final HttpServletRequest request) {

		JsonNode req = HttpUtil.getJSONFromPost(request);
		MessageRequest mreq = new MessageRequest(req);
		HashMap<String, Object> map = new HashMap<>();
		String sid = req.get("uuidsession").asText();
		MessageResponse mres = new MessageResponse(false, mreq, map);
		
		if(sessionservice.isValid(sid)) {
			String ramq = mreq.getElements().get("ramq").asText();
			
			Patient p = pservice.getPatientByRamq(ramq);
			//List<SearchPatient> sp = pcdao.searchPatient(criteria, value);
			map.put("patient", p);
			ArrayList<Value> values = pservice.getPatientDataHistory(p.getIdpatient());
			PatientHcp hcp = pservice.getPatientHcp(p.getIdpatient());
			map.put("values", values);
			map.put("hcp", hcp);
			mres = new MessageResponse(true, mreq, map);

		}else {
			map.put("message", "Session not valid");
			mres = new MessageResponse(false, mreq, map);
		}
		return new ResponseEntity<MessageResponse>(mres, HttpStatus.OK);
	}
}
