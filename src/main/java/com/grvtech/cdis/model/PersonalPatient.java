package com.grvtech.cdis.model;

import java.util.Date;

public class PersonalPatient {

		private String firstname;
		private String lastname;
		private String ramq;
		private String community;
		private int chart;
		private int idpatient;
		private Date nextvisit;
		
		
		public PersonalPatient(String firstname, String lastname, String ramq,String community, int chart, int idpatient, Date nextvisit) {
			super();
			this.firstname = firstname;
			this.lastname = lastname;
			this.ramq = ramq;
			this.community = community;
			this.chart = chart;
			this.idpatient=idpatient;
			this.nextvisit = nextvisit;
		}

		public PersonalPatient() {}

		public int getIdpatient() {
			return idpatient;
		}



		public void setIdpatient(int idpatient) {
			this.idpatient = idpatient;
		}



		public String getFirstname() {
			return firstname;
		}



		public void setFirstname(String firstname) {
			this.firstname = firstname;
		}



		public String getLastname() {
			return lastname;
		}



		public void setLastname(String lastname) {
			this.lastname = lastname;
		}



		public String getRamq() {
			return ramq;
		}



		public void setRamq(String ramq) {
			this.ramq = ramq;
		}



		public String getCommunity() {
			return community;
		}



		public void setCommunity(String community) {
			this.community = community;
		}



		public int getChart() {
			return chart;
		}



		public void setChart(int chart) {
			this.chart = chart;
		}
		
		
		public Date getNextvisit() {
			return nextvisit;
		}


		public void setNextvisit(Date nextvisit) {
			this.nextvisit = nextvisit;
		}
		
	
}
