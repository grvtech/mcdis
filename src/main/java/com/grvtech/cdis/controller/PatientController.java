package com.grvtech.cdis.controller;

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
import com.grvtech.cdis.model.SearchPatient;
import com.grvtech.cdis.util.HttpUtil;

@RestController
public class PatientController {

	@Autowired
	IPatientCustomDao pcdao;

	@RequestMapping(value = {"/service/data/searchPatient"}, method = RequestMethod.GET)
	public ResponseEntity<MessageResponse> searchPatient(final HttpServletRequest request) {

		JsonNode req = HttpUtil.getJSONFromGet(request);
		// ObjectMapper mapper = new ObjectMapper();
		// System.out.println("Json node after httputil : " +
		// mapper.writeValueAsString(req));

		MessageRequest mreq = new MessageRequest(req);
		HashMap<String, Object> map = new HashMap<>();
		System.out.println("req : " + req.get("ip").asText());
		System.out.println("req : " + req.get("elements"));
		String criteria = req.get("elements").get("criteria").asText();
		String value = req.get("elements").get("term").asText();

		List<SearchPatient> sp = pcdao.searchPatient(criteria, value);
		map.put("search", sp);

		MessageResponse mres = new MessageResponse(true, mreq, map);
		return new ResponseEntity<MessageResponse>(mres, HttpStatus.OK);
	}

}
