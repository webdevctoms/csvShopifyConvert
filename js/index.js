const netsuiteToShopify = {
	"1":1,
	"5":3,
	"0":16,
	"1":18,
	"4":29,
	"7":35,
	"1":37,
	"6":39
};
let handleArray = [];
//use this to see if split item code is variant and of what
//with cry stuff might be best to just use description but need to remove ,
let variantOptions = {
	Color:{
		BK:"Black",
		BM:"Black Matte",
		MC:"Multicam",
		RG:"Ranger Green",
		CB:"Coyote Brown",
		OR:"Orange",
		GR:"Grey",
		GY:"Grey",
		TN:"Tan",
		WHT:"White",
		MG:"Matte Grey",
		OD:"Olive Drab",
		SD:"Sand",
		RD:"Red",
		Black:"Black",
		Grey:"Grey",
		Olive:"Olive",
		Sand:"Sand",
		BL:"Blue",
		BZO:"Blaze Orange",
		RGC:"Crye Ranger Green",
		MCC:"Crye Multicam",
		BKC:"Crye Black",
		RTX:"RealTree Xtra",
		MAR:"Crye Multicam Arid",
		MBK:"Crye Multicam Black",
		MTR:"Crye Multicam Tropic",
		KH:"Crye Khaki 400",
		CP:"CADPAT",
		AOR:"AOR 1",
		AOR1:"AOR 1",
		"RD/SLV":"Red/Silver",
		"SLV/RD":"Silver/Red",
		FG:"Foliage Green",
		"CB/FG":"Coyote Brown/Foliage Green",
		"FG/CB":"Foliage Green/Coyote Brown",
		NVC:"Crye Navy",
		GYC:"Crye Grey",


	},
	Size:{
		XS:"X-Small",
		SM: "Small",
		MD:"Medium",
		LG:"Large",
		XL:"Extra Large",
		"2X":"2X-Large",
		"3X":"3X-Large",
		"2XL":"2X-Large",
		"3XL":"4X-Large",
		"4XL":"5X-Large",
		"5XL":"3X-Large",
		"2XS":"2X-Small",
		"3XS":"3X-Small",
		"4XS":"4X-Small",
		"L/XL":"Large/X-Large",
		"SM/MED":"Small/Medium"

	},
	"Waist Size":{
		"28":"28",
		"30":"30",
		"32":"32",
		"34":"34",
		"36":"36",
		"38":"38",
		"40":"40",
		"42":"42",
		"44":"44",
		"46":"46"
	},
	Length:{
		S:"Short",
		R:"Regular",
		L:"Long",
		XL: "X-Long"
	},
	Mount:{
		BM:"Belt Mount",
		MM:"MOLLE Mount"
	},
	"Hat Size":{
		"6 3/4":"6 3/4",
		"7":"7",
		"7 1/2":"7 1/2",
		"7 1/4":"7 1/4",
		"7 1/8":"7 1/8",
		"7 3/4":"7 3/4"
	},
	"Helmet Size":{
		LRG:"Large",
		MED:"Medium",
		XLG:"X-Large"
	},
	//this is for 51010
	"Set-Splint Size":{
		"0":'3" x 12"',
		"1":'4" x 15"',
		"2":'4" x 30"',
		"3":'5" x 30"'
	}
};

//when grabbing info just skip these
let skipType = {
	DMM:"DMM",
	P:"P",
	"P (OTC case as ordered from CustomFab. Nylon kit part)":"P (OTC case as ordered from CustomFab. Nylon kit part)"
};
//these are the columns that will possibly be added to in the shopify csv out of the possible 42
const shopifyFields = [0,1,10,11,12,13,14,15,16,17,26,28,29,35,37];
let shopifyDataArray = [];
//let netSuiteDataObjectArray = [];
//first thing in shopify converted array will be from handle array
//for variants will need to look through object and compare that with split item code value then use key name for option name, maybe better to flip key vals for object if it goes to slow then just have to check the keys in one object
//to get options need to split item code loop through them and loop through keys of variants then see if that variant[key][item] exists and that item code === the last one item code that didnt have a -
//will need to capture each single item code and then compare t0 item code that can be split
//also need a crye check to add C to MC,BK, RG,GY,NV
function convertCSV(filteredArr){

	for(let i = 0;i < filteredArr.length;i++){
		for(let k = 0; k < 42;k++){

		}
	}

}

function preBuildShopifyArray(filteredArr){
	shopifyDataArray.push(templateHeadings);
}

//functions used to fix item code inconsitencies
function fixItemSubString(item,index){
	let splitItem = item.split("");
	splitItem.splice(index,0,"-");
	return splitItem.join("");
}

function fixCryeItemCodes(splitArr){
	//2 digits will represent waist size and 2 letters length of pant
	//eg 28-xl or 28-l
	const twoDigitPattern = /\d{2}[a-zA-Z]{2}|\d{2}[a-zA-Z]{1}/;
	//these should be 2xl etc and the last digit should be length
	//eg 2xl-r
	const oneDigitPattern = /\d{1}[a-zA-Z]{3}/;
	//these should be XL plus length
	//eg xl-l
	const threeLetterPattern = /[XLRSMDG]{1}[XLRSMDG]{1}[XLRS]{1}/;
	for(let i = 0;i < splitArr.length;i++){

		if(twoDigitPattern.test(splitArr[i][0])){
			console.log("Found 2 digit match index: ",i);
			let splitItemCode = splitArr[i][0].split("-");
			//console.log(fixItemSubString(splitItemCode[splitItemCode.length - 1],2));
			splitItemCode[splitItemCode.length - 1] = fixItemSubString(splitItemCode[splitItemCode.length - 1],2);
			console.log(splitItemCode.join("-"));
			splitArr[i][0] = splitItemCode.join("-")

		}
		else if(oneDigitPattern.test(splitArr[i][0])){
			console.log("Found 1 digit match index: ",i);
			let splitItemCode = splitArr[i][0].split("-");
			//console.log(fixItemSubString(splitItemCode[splitItemCode.length - 1],3));
			splitItemCode[splitItemCode.length - 1] = fixItemSubString(splitItemCode[splitItemCode.length - 1],3);
			console.log(splitItemCode.join("-"));
			splitArr[i][0] = splitItemCode.join("-")
		}
		else if(threeLetterPattern.test(splitArr[i][0])){
			console.log("Found 3 letter match index: ",i);
			let splitItemCode = splitArr[i][0].split("-");
			//console.log(fixItemSubString(splitItemCode[splitItemCode.length - 1],2));
			splitItemCode[splitItemCode.length - 1] = fixItemSubString(splitItemCode[splitItemCode.length - 1],2);
			console.log(splitItemCode.join("-"));
			splitArr[i][0] = splitItemCode.join("-")
		}
	}
}
//Used to actually convert item name to handle
function convertToHandle(productName){
	let handleName = productName.replace(/\s|\(|\)|,|\"|\'|%|\+|&|\/|\\|\.|\:|\*|\–/g,"-");
	//need this to handle long dash
	handleName = handleName.replace(/\u2013|\u2014/g, "-");
	handleName = handleName.split("");
	let finalHandleName = [];

	for(let i =0;i < handleName.length; i++){
		//console.log(handleName[i]);
		if(i === 0 && handleName[i] === "-"){
			continue;
		}
		if(handleName[i] === "-" && handleName[i-1] === "-"){
			continue;
		}
		if(handleName[i] === "-" && i === handleName.length - 1){
			continue;
		}
		finalHandleName.push(handleName[i]);
	}
	finalHandleName = finalHandleName.join("");
	return finalHandleName.toLowerCase();
}
//create an array of handles to be used in Shopify CSV
function createHandleArray(splitArr){
	let handleStr = "";
	for(let i = 0; i < splitArr.length; i++){
		handleStr = convertToHandle(splitArr[i][1]);
		handleArray.push(handleStr);
	}
	let trailHandles = verifyHandles(handleArray);

	return trailHandles;
}
//filter by item codes uploaded in single column csv
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

function removeSkipBy(skipObject,splitArr){
	let newArr = [];
	for(let i = 0;i < splitArr.length; i++){
		let splitItemCode = splitArr[i][0].split("-");
		let foundSkip = false;
		for(let key in skipObject){
			if(splitItemCode.includes(skipObject[key])){
				foundSkip = true;
				break;
			}
		}
		if(foundSkip){
			continue;
		}
		newArr.push(splitArr[i]);
		
	}
	return newArr;
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
//add blank to end of each array for items without a image 
function addBlank(splitArr){
	for(let i =0;i < splitArr.length; i++){
		if(splitArr[i].length === 7){
			splitArr[i].push("");
		}
	}
}
//doesn't work with items starting with """
//custom split to account for commas and "
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
	    	//console.log(commaSplitArray);
	    	verifyLength(commaSplitArray);

	    	let removedSplitArray = removeForPurchase(commaSplitArray);
	    	verifyForPurchaseRemoved(removedSplitArray);
	    	//console.log(removedSplitArray);

	    	let filteredByItemCodesArray = filterByItemCodes(removedSplitArray); 
	    	let trailHandles = createHandleArray(filteredByItemCodesArray);
	    	if(trailHandles.length > 0){
	    		//console.log(trailHandles);
	    		for(let i = 0; i < trailHandles.length;i++){
	    			//console.log("trail handle item:",handleArray[trailHandles[i]])
	    			handleArray[trailHandles[i]] = convertToHandle(handleArray[trailHandles[i]]);
	    		}
	    		verifyHandles(handleArray);
	    		console.log(handleArray);
	    	}
	    	fixCryeItemCodes(filteredByItemCodesArray);
	    	let removedSkip = removeSkipBy(skipType,filteredByItemCodesArray);

	    	console.log(removedSkip);
    	}
    	else if(type === "submit"){
    		let fileString = event.target.result; 
	    	let fileArrayByNewLines = fileString.split("\n");
	    	//just need to remember to put new line at the end of the array
	    	fileArrayByNewLines.pop();
	 
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
	//console.log(netsuiteToShopify["Variant SKU"]);
	//console.log(convertToHandle("control-wrap-4-"));
	submitClicked();
	filterClicked();
}

$(initPage);