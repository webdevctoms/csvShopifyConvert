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