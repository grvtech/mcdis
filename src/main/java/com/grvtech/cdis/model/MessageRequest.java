package com.grvtech.cdis.model;

import java.util.Base64;
import java.util.Iterator;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Component
public class MessageRequest {
	private UUID uuidsession;
	private String action; // for logging and tracing
	private ObjectNode elements;
	private String state;
	private String ip;
	

	public MessageRequest(JsonNode jn) {

		// if
		// (this.uuidsession.toString().equals("00000000-0000-0000-0000-000000000000"))
		// {

		// System.out.println(jn.asText());
		try {
			ObjectMapper mapper = new ObjectMapper();
			System.out.println("json elements  in message request :" + mapper.writeValueAsString(jn));
			this.action = jn.get("action").asText();
			this.uuidsession = UUID.fromString(jn.get("uuidsession").asText());
			this.state = jn.get("state").asText();
			this.ip = jn.get("ip").asText();
			JsonNode elems = jn.get("elements");
			this.elements = mapper.createObjectNode();
			Iterator<String> fieldNames = elems.fieldNames();

			while (fieldNames.hasNext()) {
				String fieldName = fieldNames.next();
				if(this.state.equals("enc")) {
					byte[] decodedBytes = Base64.getDecoder().decode(elems.get(fieldName).asText());
					System.out.println("-------------------------------");
					System.out.println("decode  : "+new String(decodedBytes));
					System.out.println("-------------------------------");
					this.elements.put(fieldName, new String(decodedBytes));
				}else {
					this.elements.set(fieldName, elems.get(fieldName));
				}
			}
		} catch (Exception e) {
		}

	}

	public MessageRequest() {
		super();
		this.action = "gol";
	}

	public MessageRequest(String uuidsession, String action, ObjectNode elements) {
		super();
		this.uuidsession = UUID.fromString(uuidsession);
		this.action = action;
		this.elements = elements;
	}

	public boolean isEmpty() {
		boolean result = false;
		if (this.action.equals("gol"))
			result = true;
		return result;
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

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

}
