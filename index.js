

function formatString(fileString){	
	let fileArray = fileString.split(",");
	//console.log("in function: ", fileString);
	//console.log(fileArray[24].trim());
}

function splitArray(newlineArray){
	let returnArray = [];

	let chunkArray = [];
	let chunkStr = "";
	let quoteFound = false;
	let secondQuoteFound = false;
	for(let i = 0; i < newlineArray.length;i++){
		let character = newlineArray.charAt(i)
		if(character === '"'){
			quoteFound = true;
		}

		if(character === '"' && quoteFound){
			try{
				//this is finding a actual quote
				if(newlineArray.charAt(i+1) === '"'){
					chunkStr += character;
					continue;
				}
				else if(newlineArray.charAt(i+1) === "," && newlineArray.charAt(i -1) === '"'){
					chunkStr += character;
					continue;
				}
				//this should be the end quote
				else if(newlineArray.charAt(i+1) === ","){
					chunkArray.push(chunkStr);
					chunkStr = "";
					quoteFound = false;
					i++;
					continue;
				}

			}
			catch(err){
				console.log(err);
			}
		}

		if(character === "," && !quoteFound){
			chunkArray.push(chunkStr);
			chunkStr = "";
			continue;
		}

		chunkStr += character;
		//console.log(newlineArray.charAt(i));
	}

	returnArray.push(chunkArray);
	console.log(returnArray);
	return returnArray;
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
    	//console.log(fileArrayByNewLines[5021].split(","));   
    	splitArray(fileArrayByNewLines[5021]);
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