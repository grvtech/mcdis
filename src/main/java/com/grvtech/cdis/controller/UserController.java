package com.grvtech.cdis.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.grvtech.cdis.model.MessageRequest;
import com.grvtech.cdis.model.MessageResponse;
import com.grvtech.cdis.model.User;
import com.grvtech.cdis.service.IUserService;
import com.grvtech.cdis.util.HttpUtil;

@RestController
public class UserController {

	@Autowired
	IUserService userservice;

	@RequestMapping(value = "/user/guid/{iduser}", method = RequestMethod.GET)
	public ResponseEntity<MessageResponse> getUserById(@PathVariable("iduser") long iduser) {

		return null;
	}

	@RequestMapping(value = "/user/authenticate", method = RequestMethod.POST)
	public ResponseEntity<MessageResponse> authenticateUser(final HttpServletRequest request) {
		JsonNode req = HttpUtil.getJSONFromPost(request);
		MessageRequest mreq = new MessageRequest(req);
		HashMap<String, Object> map = new HashMap<>();
		User u = userservice.getUserById(1);
		if (u.isEmpty()) {
			map.put("message", "Wrong username or password");
			MessageResponse mres = new MessageResponse(false, mreq, map);
			return new ResponseEntity<MessageResponse>(mres, HttpStatus.OK);
		} else {
			map.put("user", u);
			MessageResponse mres = new MessageResponse(true, mreq, map);
			return new ResponseEntity<MessageResponse>(mres, HttpStatus.OK);
		}

	}

}
