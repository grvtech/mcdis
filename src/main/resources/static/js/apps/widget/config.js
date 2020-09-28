export default
{
	"abcgraphs":{
			"title":"ABC GRAPHS",
			"style":"default",
			"actions":[{"label":"Print ABC Graphs","action":"printwidget"}],
			"elements":[
				{"name":"hba1c","type":"graph","style":"default","limit":"62899200‬","menu":[{"label":"Data table","icon":"fas fa-table","action":"switchToTable","role":"1"},{"label":"History graph","icon":"fas fa-history","action":"popHistoryGraph","role":"1"},{"label":"Add new data","icon":"fas fa-history","action":"popHistoryGraph","role":"2"},{"label":"Print graph","icon":"fas fa-print","action":"printHistoryGraph","role":"1"}]},
				{"name":"ldl","type":"graph", "style":"default","limit":"62899200‬","menu":[{"label":"Data table","icon":"fas fa-table","action":"switchToTable","role":"1"},{"label":"History graph","icon":"fas fa-history","action":"popHistoryGraph","role":"1"},{"label":"Add new data","icon":"fas fa-history","action":"popHistoryGraph","role":"2"},{"label":"Print graph","icon":"fas fa-print","action":"printHistoryGraph","role":"1"}]},
				{"name":"acratio_or_pcrg","type":"graph", "style":"default","condition":"last","limit":"62899200‬","menu":[{"label":"Data table","icon":"fas fa-table","action":"switchToTable","role":"1"},{"label":"History graph","icon":"fas fa-history","action":"popHistoryGraph","role":"1"},{"label":"Add new data","icon":"fas fa-history","action":"popHistoryGraph","role":"2"},{"label":"Print graph","icon":"fas fa-print","action":"printHistoryGraph","role":"1"}]},
				{"name":"egfr","type":"graph", "style":"default","limit":"62899200‬","menu":[{"label":"Data table","icon":"fas fa-table","action":"switchToTable","role":"1"},{"label":"History graph","icon":"fas fa-history","action":"popHistoryGraph","role":"1"},{"label":"Add new data","icon":"fas fa-history","action":"popHistoryGraph","role":"2"},{"label":"Print graph","icon":"fas fa-print","action":"printHistoryGraph","role":"1"}]}
				]
	},
	"patientrecord":{
		"title":"Patient Record",
		"style":"default",
		"actions":[{"label":"Print Record","action":"printwidget"}],
		"elements":[{"name":"patientrecord","type":"table","style":"default","menu":[{"label":"Edit patient","icon":"fas fa-table","action":"editPatient","role":"1"}]}],
	},
	"bp":{
		"title":"Blood Pressure",
		"style":"default",
		"actions":[{"label":"Print Record","action":"printwidget"}],
		"elements":[
			{"name":"sbp_and_dbp","separator":"&#47;","type":"table","style":"default","menu":[{"label":"Data table","icon":"fas fa-table","action":"switchToTable","role":"1"},{"label":"History graph","icon":"fas fa-history","action":"popHistoryGraph","role":"1"},{"label":"Add new data","icon":"fas fa-history","action":"popHistoryGraph","role":"2"},{"label":"Print graph","icon":"fas fa-print","action":"printHistoryGraph","role":"1"}]}
			]
	},
	"notes":{"title":"Patient Notes","style":"default","actions":[{"label":"Print Record","action":"printwidget"}]},
	"patientstats":{"title":"Patient Stats","style":"default","actions":[{"label":"Print Record","action":"printwidget"}]},
	"hcp":{"title":"Health care workers","style":"default","actions":[{"label":"Print Record","action":"printwidget"}]},
	"doc":{
		"title":"Documents",
		"style":"default",
		"actions":[
			{"label":"Print Record","action":"printwidget"}
			]
	},
	"diabethistory":{
		"title":"Diabetes diagnose",
		"style":"default",
		"actions":[{"label":"Print Record","action":"printwidget"}],
		"elements":[
			{"name":"diabethistory","type":"table","style":"default","menu":[]}
		]
	}
}