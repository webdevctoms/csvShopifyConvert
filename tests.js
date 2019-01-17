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
		if(splitArr[i][2] === "For Purchase"){
			console.log("found for purchase index: ",i);
			linesFound.push(splitArr[i]);
		}
	}
	console.log("For purchase test done");
	if(linesFound.length === 0){
		console.log("All data correct");
	}
}