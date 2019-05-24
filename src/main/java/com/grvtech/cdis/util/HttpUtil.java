package com.grvtech.cdis.util;

import java.io.BufferedReader;
import java.io.IOException;

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
			if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {      
				ip = request.getHeader("Proxy-Client-IP");      
			 }      
			if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {      
				ip = request.getHeader("WL-Proxy-Client-IP");      
			}      
			if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {      
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
			result = ((ObjectNode)result).put("ip", ip);
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

}
