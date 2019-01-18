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

function checkItemCodesLength(itemCodesObject){
	let counter = 0;
	for(let key in itemCodesObject){
		counter++;
	}
	console.log("the length of the item code object is: ", counter);
}

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