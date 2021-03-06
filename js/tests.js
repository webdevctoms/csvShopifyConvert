//verify the length of the array, now only correctly verifies the csv set up now
//could be modified to use headings to determine the number of columns
function verifyLength(splitArr){
	let linesFound = []
	for(let i = 0;i < splitArr.length;i++){
		if(splitArr[i].length != 8){
			console.log("found short array, index: ",i);
			linesFound.push(splitArr[i]);
		}
	}
	console.log("length test done");
	if(linesFound.length === 0){
		console.log("All data correct");
	}
}
//verify for puschased for sale and for resale items removed
function verifyForPurchaseRemoved(splitArr){
	let linesFound = [];
	for(let i = 0;i < splitArr.length;i++){
		if(splitArr[i][2] === "For Purchase" || splitArr[i][2] === "For Sale" || splitArr[i][2] === "For Resale"){
			console.log("found for purchase index: ",i);
			linesFound.push(splitArr[i]);
		}
	}
	console.log("For purchase test done");
	if(linesFound.length === 0){
		console.log("All data correct");
	}
}
//just checking the length of the items code object
function checkItemCodesLength(itemCodesObject){
	let counter = 0;
	for(let key in itemCodesObject){
		counter++;
	}
	console.log("the length of the item code object is: ", counter);
}
//verify that the handles are actually handles
function verifyHandles(handles){
	const legalChars = /^[a-z-0-9©®™\u2122\u00ae]*$/;
	let testHandle = false;
	let failedHandles = [];
	let trailingHandles = [];
	for(let i = 0;i < handles.length;i++){
		testHandle = legalChars.test(handles[i]);
		if(!testHandle){
			//console.log("Handle incorrect index: ",i);
			//console.log("handle: ",handles[i]);
			failedHandles.push(handles[i]);
		}
		if(handles[i].charAt(handles[i].length - 1) === "-"){
			//console.log("Handle incorrect index: ",i);
			//console.log("handle: ",handles[i]);
			trailingHandles.push(i);
		}
	}
	if(failedHandles.length > 0 || trailingHandles.length > 0){
		console.log("Handle test Failed: ", failedHandles,trailingHandles);
	}
	else{
		console.log("handle test passed");
	}	

	return trailingHandles;
}

function verifyArrayLengths(arr1,arr2){
	console.log("Testing array lengths");
	if(arr1.length === arr2.length) console.log("Test passed both arrays same length");
	
	else console.log("Test failed both arrays not same length");
}

function checkForNewLine(arr){
	const newlines = /\n|\r\n/;
	console.log("testing for new lines");
	for(let i = 0;i < arr.length;i++){
		for(let k =0;k<arr[i].length;k++){
			if(newlines.test(arr[i][k])){
				console.log("newline found: ",i,k);
			}
		}
	}
}