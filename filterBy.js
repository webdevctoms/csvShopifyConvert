let itemCodes = {

};

function assignItemCodes(itemCodesArray){
	for(let i = 0;i < itemCodesArray.length;i++){
		itemCodes[itemCodesArray[i]] = itemCodesArray[i];
	}
}

function removeBlanks(newLineArray){
	let newArray = [];
	for(let i = 0;i < newLineArray.length; i++){
		//console.log(newLineArray[i].length);
		if(newLineArray[i].length === 1 || newLineArray[i].length === 0){
			continue;
		}
		newArray.push(newLineArray[i]);
	}
	return newArray;
}

function readFileItemCodes(files) {

    var file = files[0];           
    var reader = new FileReader();
    reader.onload = function(event) {
    	let fileString = event.target.result; 
    	let fileArrayByNewLines = fileString.split("\n");
    	let blankRemovedArray = removeBlanks(fileArrayByNewLines);
		console.log(blankRemovedArray);
		assignItemCodes(blankRemovedArray);
		console.log(itemCodes);
		checkItemCodesLength(itemCodes);
    }
    reader.readAsText(file)
}

function csvSelected(){
	$("#itemCodes").change(function(event){
		let csvFile = $('#itemCodes').prop('files');
		console.log(csvFile);
		readFileItemCodes(csvFile);
	});
}

function initPage(){
	csvSelected();
}

$(initPage);
