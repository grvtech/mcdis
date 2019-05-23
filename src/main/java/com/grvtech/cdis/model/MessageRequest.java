package com.grvtech.cdis.model;

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

	public MessageRequest(JsonNode jn) {

		// if
		// (this.uuidsession.toString().equals("00000000-0000-0000-0000-000000000000"))
		// {

		System.out.println(jn.asText());

		ObjectMapper mapper = new ObjectMapper();
		this.action = jn.get("action").asText();
		this.uuidsession = UUID.fromString(jn.get("uuidsession").asText());

		JsonNode elems = jn.get("elements");
		this.elements = mapper.createObjectNode();
		Iterator<String> fieldNames = elems.fieldNames();

		while (fieldNames.hasNext()) {
			String fieldName = fieldNames.next();
			elems.get(fieldName).asText();

			// System.out.println(" crypto key : " + cryptoKey + " decript:
			// " + CryptoUtil.decrypt(cryptoKey,
			// elems.get(fieldName).asText()) + " value : " +
			// elems.get(fieldName).asText());
			// this.elements.put(fieldName, CryptoUtil.decrypt(cryptoKey,
			// elems.get(fieldName).asText()));
			this.elements.set(fieldName, elems.get(fieldName));
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

}
