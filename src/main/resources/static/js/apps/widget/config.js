export default
{
	"abcgraphs":{
			"title":"ABC GRAPHS",
			"style":"default",
			"actions":[{"label":"Print ABC Graphs","action":"printwidget"}],
			"elements":[
				{"name":"hba1c","type":"graph","style":"default"},
				{"name":"ldl","type":"graph", "style":"default"},
				{"name":"acratio_or_pcgr","type":"graph", "style":"default","condition":"last"},
				{"name":"egfr","type":"graph", "style":"default"}
				]
	},
	"patientrecord":{
		"title":"Patient Record",
		"style":"default",
		"actions":[{"label":"Print Record","action":"printwidget"}],
		"elements":[{"name":"patientrecord","type":"table","style":"default"}]
	},
	"bp":{
		"title":"Blood Pressure",
		"style":"default",
		"actions":[{"label":"Print Record","action":"printwidget"}],
		"elements":[
			{"name":"sbp_and_dbp","type":"table","style":"default"}
			]
	},
	"notes":{"title":"Patient Notes","style":"default","actions":[{"label":"Print Record","action":"printwidget"}]},
	"patientstats":{"title":"Patient Stats","style":"default","actions":[{"label":"Print Record","action":"printwidget"}]},
	"hcp":{"title":"Health care workers","style":"default","actions":[{"label":"Print Record","action":"printwidget"}]},
	"doc":{"title":"Documents","style":"default","actions":[{"label":"Print Record","action":"printwidget"}]},
	"diabethistory":{"title":"Diabetes diagnose","style":"default","actions":[{"label":"Print Record","action":"printwidget"}],"elements":[
		{"name":"diabethistory","type":"table","style":"default"}
	]}
}