package com.grvtech.cdis.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class CdisController {
	@RequestMapping(value = {"/", "/index.html"}, method = RequestMethod.GET)
	public ModelAndView index() {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("index");
		return modelAndView;
	}

	@RequestMapping(value = {"/search.html"}, method = RequestMethod.GET)
	public ModelAndView search() {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("search");
		return modelAndView;
	}
}
