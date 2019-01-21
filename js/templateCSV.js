//this file is used to construct the new CSV headings and the structure of the CSV

let templateHeadings = [];

function readFileTemplate(files) {

    var file = files[0];           
    var reader = new FileReader();
    reader.onload = function(event) {
    	let fileString = event.target.result; 
    	let fileArrayByNewLines = fileString.split("\n");
 		templateHeadings = fileArrayByNewLines[0].split(",");
		console.log(templateHeadings);
    }
    reader.readAsText(file)
}

function templateSelected(){
	$("#templateCSV").change(function(event){
		templateHeadings = [];
		let csvFile = $('#templateCSV').prop('files');
		//console.log("changed template");
		readFileTemplate(csvFile);
	});
}

function initPage(){
	templateSelected();
}

$(initPage);