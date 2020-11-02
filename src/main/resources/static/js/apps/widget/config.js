export default
{
	"abcgraphs":{
			"title":"ABC GRAPHS",
			"style":"default",
			"actions":[{"label":"Print ABC Graphs","action":"printwidget"}],
			"elements":[
				{"name":"hba1c","type":"graph","style":"default","limit":"62899200‬","menu":[]},
				{"name":"ldl","type":"graph", "style":"default","limit":"62899200‬","menu":[]},
				{"name":"acratio_or_pcrg","type":"graph", "style":"default","condition":"last","limit":"62899200‬","menu":[]},
				{"name":"egfr","type":"graph", "style":"default","limit":"62899200‬","menu":[]}
				]
	},
	"patientrecord":{
		"title":"Patient Record",
		"style":"default",
		"actions":[{"label":"Print Record","action":"printwidget"}],
		"elements":[{"name":"patientrecord","type":"table","style":"default","menu":[{"label":"Add patient","icon":"fas fa-user-plus","action":"addPatient","role":"1"},{"label":"Edit patient","icon":"fas fa-user-edit","action":"editPatient","role":"1"}]}],
	},
	"bp":{
		"title":"Blood Pressure",
		"style":"default",
		"actions":[{"label":"Print Record","action":"printwidget"}],
		"elements":[
			{"name":"sbp_and_dbp","type":"table","style":"default","menu":[{"label":"Add data","icon":"fas fa-plus","action":"addBp","role":"1"},{"label":"Edit data","icon":"fas fa-pencil-alt","action":"editBp","role":"1"},{"label":"delete data","icon":"fas fa-trash-alt","action":"deleteBp","role":"1"}]}
			]
	},
	"notes":{"title":"Patient Notes","style":"default","actions":[{"label":"Print Record","action":"printwidget"}],
		"elements":[{"name":"notes","type":"table","style":"default","menu":[]}]
	},
	"patientstats":{"title":"Patient Stats","style":"default","actions":[{"label":"Print Record","action":"printwidget"}]},
	"hcp":{"title":"Health care workers","style":"default","actions":[{"label":"Print Record","action":"printwidget"}],
		"elements":[
			{"name":"hcp","type":"table","style":"default","menu":[{"label":"Change Health care worker","icon":"fas fa-user-edit","action":"changeHcp","role":"1"}]}
			]
	},
	"doc":{
		"title":"Documents",
		"style":"default",
		"actions":[{"label":"Print Record","action":"printwidget"}],
		"elements":[{"name":"docs","type":"table","style":"default","menu":[]}]
	},
	"diabethistory":{
		"title":"Diabetes diagnose",
		"style":"default",
		"actions":[{"label":"Print Record","action":"printwidget"}],
		"elements":[
			{"name":"diabethistory","type":"table","style":"default","menu":[]}
		]
	},
	"patients":{
			"title":"Personal Patients",
			"style":"default",
			"actions":[{"label":"Print list","action":"printwidget"}],
			"elements":[
				{"name":"ppatients","separator":"","type":"table","style":"default","menu":[]}
			]	
	}

}