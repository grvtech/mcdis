package com.grvtech.cdis.model;

import java.util.HashMap;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

/*
{
	"uuidsession":"aaaaabbbb33333",
	"uuidevent":"addu",
	"state":"enc",
	"status":"success",
	"elements":[
	            "aaaaasdaedaecsecsecse",
	            "asdasdasdasdasdasdasdasd"
	]  
}


an event 

	anonymous events = everybody can do that
	event = login
		
	event = subscribe

	not anonymous 
	event  = search 
		controler resuests ......
		 
	event = view clical data vcd
			add clinical data
			edit clinical data
			delete clinical data
	
	event = view patient record
			add patient record
			edit patient record
			delete patient record
			
	event = view search patient
	
	
	authentification of event for user done on dis 
	only authentification of organisation should be done on core
	
*/

public class MessageResponse {
	private UUID uuidsession; // clear|enc
	private String status; // success|error
	private String action;
	private ObjectNode elements; // on error is empty

	public MessageResponse() {
		super();
		this.action = "gol";
	}

	public MessageResponse(boolean status, MessageRequest mr, HashMap<String, Object> map) {
		super();
		ObjectMapper mapper = new ObjectMapper();
		this.action = mr.getAction();
		this.uuidsession = mr.getUuidsession();
		if (status) {
			this.status = "success";
		} else {
			this.status = "error";
		}

		this.elements = mapper.createObjectNode();
		Set<String> fieldNames = map.keySet();

		for (String fieldName : fieldNames) {
			try {
				System.out.println("response field name : " + fieldName);
				System.out.println("response field  : " + map.get(fieldName));
				JsonNode node = mapper.valueToTree(map.get(fieldName));
				this.elements.set(fieldName, node);
			} catch (Exception e) {

				e.printStackTrace();
				this.status = "error";
				break;
			}
		}

	}

	/**
	 * @return the uuidsession
	 */
	public UUID getUuidsession() {
		return uuidsession;
	}

	/**
	 * @param uuidsession
	 *            the uuidsession to set
	 */
	public void setUuidsession(UUID uuidsession) {
		this.uuidsession = uuidsession;
	}

	/**
	 * @return the action
	 */
	public String getAction() {
		return action;
	}

	/**
	 * @param action
	 *            the action to set
	 */
	public void setAction(String action) {
		this.action = action;
	}

	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}
	/**
	 * @param status
	 *            the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * @return the elements
	 */
	public ObjectNode getElements() {
		return elements;
	}
	/**
	 * @param elements
	 *            the elements to set
	 */
	public void setElements(ObjectNode elements) {
		this.elements = elements;
	}

	public void setElements(HashMap<String, String> elements) {
		ObjectMapper mapper = new ObjectMapper();
		this.elements = mapper.createObjectNode();
		Set<String> fieldNames = elements.keySet();
		for (String fieldName : fieldNames) {
			try {
				this.elements.put(fieldName, elements.get(fieldName));
			} catch (Exception e) {
				e.printStackTrace();
				this.status = "error";
				break;
			}
		}
	}

}
