package com.grvtech.cdis.controller;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.grvtech.cdis.model.MessageRequest;
import com.grvtech.cdis.model.MessageResponse;
import com.grvtech.cdis.model.Session;
import com.grvtech.cdis.model.User;
import com.grvtech.cdis.service.ISessionService;
import com.grvtech.cdis.service.IUserService;
import com.grvtech.cdis.util.HttpUtil;

@RestController
public class UserController {

	@Autowired
	IUserService userservice;

	@Autowired
	ISessionService sessionservice;

	@RequestMapping(value = "/user/guid/{iduser}", method = RequestMethod.GET)
	public ResponseEntity<MessageResponse> getUserById(@PathVariable("iduser") long iduser) {

		return null;
	}

	@RequestMapping(value = "/user/authenticate", method = RequestMethod.POST)
	public ResponseEntity<MessageResponse> authenticateUser(final HttpServletRequest request) throws JsonProcessingException {
		JsonNode req = HttpUtil.getJSONFromPost(request);
		MessageRequest mreq = new MessageRequest(req);
		HashMap<String, Object> map = new HashMap<>();
		// User u = userservice.getUserById(1);
		String user = req.get("elements").get("username").asText();
		String pass = req.get("elements").get("password").asText();
		String reswidth = req.get("elements").get("reswidth").asText();
		String resheight = req.get("elements").get("resheight").asText();
		String ip = req.get("ip").asText();

		User u = userservice.getUserByUsernamePassword(user, pass);
		if (u.isEmpty()) {
			map.put("message", "Wrong username or password");
			MessageResponse mres = new MessageResponse(false, mreq, map);
			return new ResponseEntity<MessageResponse>(mres, HttpStatus.OK);
		} else {
			// good user

			String combination = ip + u.getUsername() + (new Date()).toString();
			//String idsession = DigestUtils.md5DigestAsHex(combination.getBytes());
			String idsession = UUID.randomUUID().toString();

			System.out.println("ID Session : " + idsession);
			Calendar cal = Calendar.getInstance();
			cal.getTimeInMillis();
			Timestamp ts = new Timestamp(cal.getTimeInMillis());
			Session userSession = new Session(idsession, u.getIduser(), ip, ts, ts, Integer.parseInt(reswidth), Integer.parseInt(resheight), 1);
			if (sessionservice.addSession(userSession)) {
				map.put("user", u);
				MessageResponse mres = new MessageResponse(true, mreq, map);
				return new ResponseEntity<MessageResponse>(mres, HttpStatus.OK);
			} else {
				map.put("message", "Wrong username or password");
				MessageResponse mres = new MessageResponse(false, mreq, map);
				return new ResponseEntity<MessageResponse>(mres, HttpStatus.OK);
			}

		}

	}

	@RequestMapping(value = {"/service/data/getUserSession"}, method = RequestMethod.GET)
	public ResponseEntity<MessageResponse> getUserSession(final HttpServletRequest request) throws JsonProcessingException {

		JsonNode req = HttpUtil.getJSONFromGet(request);
		MessageRequest mreq = new MessageRequest(req);
		HashMap<String, Object> map = new HashMap<>();
		System.out.println("req : " + req.get("ip").asText());
		System.out.println("req : " + req.get("elements"));

		int iduser = Integer.parseInt(req.get("elements").get("iduser").asText());
		map.put("session", sessionservice.getSessionByIdUser(iduser));

		MessageResponse mres = new MessageResponse(true, mreq, map);
		return new ResponseEntity<MessageResponse>(mres, HttpStatus.OK);
	}

	@RequestMapping(value = {"/service/data/isValidSession"}, method = RequestMethod.GET)
	public ResponseEntity<MessageResponse> isValidSession(final HttpServletRequest request) throws JsonProcessingException {

		JsonNode req = HttpUtil.getJSONFromGet(request);
		MessageRequest mreq = new MessageRequest(req);
		HashMap<String, Object> map = new HashMap<>();
		System.out.println("req : " + req.get("ip").asText());
		System.out.println("req : " + req.get("elements"));
		String session = req.get("uuidsession").asText();
		//int iduser = Integer.parseInt(req.get("elements").get("iduser").asText());
		Session s = sessionservice.getSession(session);
		if(s.isValid()) {
			MessageResponse mres = new MessageResponse(true, mreq, map);
			return new ResponseEntity<MessageResponse>(mres, HttpStatus.OK);
		}else {
			MessageResponse mres = new MessageResponse(false, mreq, map);
			return new ResponseEntity<MessageResponse>(mres, HttpStatus.OK);
		}
	}
	
}
