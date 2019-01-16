

function formatString(fileString){	
	let fileArray = fileString.split(",");
	console.log("in function: ", fileString);
	console.log(fileArray[24].trim());
}

function readFile(files) {
    //var files = evt.target.files;
    //console.log(files);
    var file = files[0];           
    var reader = new FileReader();
    reader.onload = function(event) {
    	//console.log(event.target.result);
    	let fileString = event.target.result; 
    	let fileArrayByNewLines = fileString.split("\n");
    	fileArrayByNewLines.pop();
    	console.log(fileArrayByNewLines); 
    	console.log(fileArrayByNewLines[5021].split(","));   
    	formatString(fileString);     
    }
    reader.readAsText(file)
}

function submitClicked(){
	$("#jsSubmit").click(function(event){
		event.preventDefault();
		console.log("submit clicked");
		let csvFile = $('#inputFile').prop('files');
		//console.log(csvFile);
		readFile(csvFile);
	})
}

function initPage(){
	submitClicked();
}

$(initPage);