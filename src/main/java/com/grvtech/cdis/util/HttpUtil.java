package com.grvtech.cdis.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class HttpUtil {

	public static JsonNode getJSONFromPost(HttpServletRequest request) {
		JsonNode result = null;
		BufferedReader reader;
		try {

			String ip = request.getHeader("x-forwarded-for");
			if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
				ip = request.getHeader("Proxy-Client-IP");
			}
			if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
				ip = request.getHeader("WL-Proxy-Client-IP");
			}
			if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
				ip = request.getRemoteAddr();
			}

			reader = request.getReader();
			StringBuilder sb = new StringBuilder();
			String line = reader.readLine();
			while (line != null) {
				System.out.println("line : " + line);
				sb.append(line);
				line = reader.readLine();

			}
			reader.close();

			System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
			System.out.println(sb.toString());
			System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

			ObjectMapper mapper = new ObjectMapper();
			JsonFactory factory = mapper.getFactory();
			JsonParser parser = factory.createParser(sb.toString());
			result = mapper.readTree(parser);
			result = ((ObjectNode) result).put("ip", ip);

		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	public static JsonNode getJSONFromGet(HttpServletRequest request) {
		JsonNode result = null;
		try {

			String ip = request.getHeader("x-forwarded-for");
			if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
				ip = request.getHeader("Proxy-Client-IP");
			}
			if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
				ip = request.getHeader("WL-Proxy-Client-IP");
			}
			if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
				ip = request.getRemoteAddr();
			}

			ObjectMapper mapper = new ObjectMapper();

			ObjectNode jNode = mapper.createObjectNode();
			ObjectNode jNodeElements = mapper.createObjectNode();
			jNode.put("ip", ip);

			List<String> names = Collections.list(request.getParameterNames());
			if (!names.contains("action")) {
				jNode.put("action", "gol");
			}
			if (!names.contains("uuidsession")) {
				jNode.put("uuidsession", "00000000-0000-0000-0000-000000000000");
			}
			for (String name : names) {
				System.out.println("attribute name :" + name);
				jNodeElements.put(name, request.getParameter(name).toString());
			}

			result = jNode;
			result = ((ObjectNode) result).set("elements", jNodeElements);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

}
