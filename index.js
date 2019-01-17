let netsuiteToShopify = {
	//Name:
};

function filterByItemCodes(splitArr){
	let newArr = [];
	let splitItem;
	if(Object.keys(itemCodes).length === 0){
		return splitArr;
	}
	for(let i = 0;i < splitArr.length; i++){
		if(i === 0){
			newArr.push(splitArr[i])
		}

		if(itemCodes[splitArr[i][0] + "\r"]){
			newArr.push(splitArr[i]);
			continue;
		}
		splitItem = splitArr[i][0].split("-");
		if(splitItem[0].length <= 1){
			if(itemCodes[splitItem[1] + "\r"]){
				newArr.push(splitArr[i]);
				continue;
			}
		}
		else if(splitItem[0].length > 1){
			if(itemCodes[splitItem[0] + "\r"]){
				newArr.push(splitArr[i]);
				continue;
			}
		}
	}

	return newArr;
}

function formatString(fileString){	
	let fileArray = fileString.split(",");
	//console.log("in function: ", fileString);
	//console.log(fileArray[24].trim());
}

function removeForPurchase(splitArr){
	let newArr = [];
	for(let i = 0;i < splitArr.length; i++){
		if(splitArr[i][2] === "For Purchase" || splitArr[i][2] === "For Sale" || splitArr[i][2] === "For Resale" ){
			continue;
		}
		newArr.push(splitArr[i]);
	}
	return newArr;
}

function addBlank(splitArr){
	for(let i =0;i < splitArr.length; i++){
		if(splitArr[i].length === 7){
			splitArr[i].push("");
		}
	}
}

function splitArray(newlineArray){
	let returnArray = [];
	//this is the array of each item in the line
	let chunkArray = [];
	let chunkStr = "";
	let quoteFound = false;
	for(let k = 0; k < newlineArray.length; k++){
		chunkArray = [];
		chunkStr = "";
		quoteFound = false;
		for(let i = 0; i < newlineArray[k].length;i++){
			let character = newlineArray[k].charAt(i)
			if(character === '"'){
				quoteFound = true;
			}

			if(character === '"' && quoteFound){
				try{
					//this is finding a actual quote
					if(newlineArray[k].charAt(i+1) === '"'){
						chunkStr += character;
						continue;
					}
					//this should be the end when " is at the end of column
					else if(newlineArray[k].charAt(i-1) === '"' && newlineArray[k].charAt(i-2) === '"'  ){
						chunkArray.push(chunkStr);
						chunkStr = "";
						quoteFound = false;
						i++;
						continue;
					}
					//this will catch  quotes beside a inside comma
					else if(newlineArray[k].charAt(i+1) === "," && newlineArray[k].charAt(i -1) === '"'){
						chunkStr += character;
						continue;
					}
					//this should be the end quote
					else if(newlineArray[k].charAt(i+1) === ","){
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

			if(character === "," && !quoteFound || i === newlineArray[k].length - 1){
				chunkArray.push(chunkStr);
				chunkStr = "";
				continue;
			}

			chunkStr += character;
			//console.log(newlineArray.charAt(i));
		}

		returnArray.push(chunkArray);
	}
	console.log("done splitting");
	//console.log(returnArray);
	return returnArray;
}

function readFile(files, type) {

    var file = files[0];           
    var reader = new FileReader();
    reader.onload = function(event) {
    	if(type === "filter"){
    		let fileString = event.target.result; 
	    	let fileArrayByNewLines = fileString.split("\n");
	    	//just need to remember to put new line at the end of the array
	    	fileArrayByNewLines.pop();
	    	//console.log(fileArrayByNewLines); 
	 
	    	let commaSplitArray = splitArray(fileArrayByNewLines);
	    	addBlank(commaSplitArray);
	    	verifyLength(commaSplitArray);

	    	let removedSplitArray = removeForPurchase(commaSplitArray);
	    	verifyForPurchaseRemoved(removedSplitArray);
	    	console.log(removedSplitArray);

	    	let filteredByItemCodesArray = filterByItemCodes(removedSplitArray); 
	    	console.log(filteredByItemCodesArray);
    	}
    	else if(type === "submit"){
    		let fileString = event.target.result; 
	    	let fileArrayByNewLines = fileString.split("\n");
	    	//just need to remember to put new line at the end of the array
	    	fileArrayByNewLines.pop();
	    	console.log(fileArrayByNewLines); 
	 
	    	let commaSplitArray = splitArray(fileArrayByNewLines);
	    	addBlank(commaSplitArray);
	    	verifyLength(commaSplitArray);

	    	let removedSplitArray = removeForPurchase(commaSplitArray);
	    	verifyForPurchaseRemoved(removedSplitArray);
	    	console.log(removedSplitArray);

	    	formatString(fileString); 
    	}    
    }
    reader.readAsText(file)
    	
}

function submitClicked(){
	$("#jsSubmit").click(function(event){
		event.preventDefault();
		console.log("submit clicked");
		let csvFile = $('#inputFile').prop('files');
		//console.log(csvFile);
		readFile(csvFile,"submit");
	})
}

function filterClicked(){
	$("#jsFilter").click(function(event){
		event.preventDefault();
		//console.log("filter clicked", JSON.stringify(itemCodes));
		let csvFile = $('#inputFile').prop('files');
		//console.log(csvFile);
		readFile(csvFile,"filter");
	})
}

function initPage(){
	submitClicked();
	filterClicked();
}

$(initPage);