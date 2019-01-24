const netsuiteToShopify = {
	//Title
	"1":1,
	//Vendor
	"3":5,
	//variant sku/itemcode
	"16":0,
	//MetaFields Global Tag
	"18":1,
	//Variant Price
	"29":4,
	//Image Source
	"35":7,
	//Image Alt Text
	"37":1,
	//weight grams
	"23":6
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
		NT:"Natural",
		Black:"Black",
		Grey:"Grey",
		Olive:"Olive",
		Sand:"Sand",
		BL:"Blue",
		BZO:"Blaze Orange",
		//Need to modify these ones when converting data
		RGC:"Crye Ranger Green",
		MCC:"Crye Multicam",
		BKC:"Crye Black",
		NVC:"Crye Navy",
		GYC:"Crye Grey",
		CBC:"Crye Coyote Brown",
		//**************************************
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
		Bk:"Crye Black"
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
		XLL: "X-Long"
	},
	Mount:{
		BTM:"Belt Mount",
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
		"5":'5" x 30"'
	},
	"Collar Color":{
		CL:"Clear",
		MIL:"Military OD"
	},
	"NPA Sizes":{
		"20N":"20 FR",
		"22N":"22 FR",
		"24N":"24 FR",
		"26N":"26 FR",
		"28N":"28 FR",
		"30N":"30 FR",
		"32N":"32 FR",
		"34N":"34 FR"
	},
	"Needle Gauge":{
		"10":"10 G x 3.25 inch",
		"14":"14 G x 3.25 inch"
	},
	"Screw Length":{
		"10CM":"10 CM",
		"13CM":"13 CM",
		"16CM": "16 CM",
		"19CM": "19 CM",
		"22CM": "22 CM"
	},
	"Foam Option":{
		"PC1":"Precut Foam Option 1",
		"PC2":"Precut Foam Option 2",
		"UC": "Uncut Foam"
	},
	"Rope Sizes 6mm X":{
		"6/30":"x 30 m",
		"6/46":"x 46 m",
		"6/60": "x 60 m",
		"6/76":"x 76 m",
		"6/110":"x 110 m",
	}
};

//when grabbing info just skip these
const skipType = {
	DMM:"DMM",
	P:"P",
	"P (OTC case as ordered from CustomFab. Nylon kit part)":"P (OTC case as ordered from CustomFab. Nylon kit part)",
	WEB:"WEB"
};


const variantNameIndexes = [10,12,14];
const variantValueIndexes = [11,13,15];
let shopifyDataArray = [];
//first thing in shopify converted array will be from handle array
//for variants will need to look through object and compare that with split item code value then use key name for option name, maybe better to flip key vals for object if it goes to slow then just have to check the keys in one object
//to get options need to split item code loop through them and loop through keys of variants then see if that variant[key][item] exists and that item code === the last one item code that didnt have a -
//will need to capture each single item code and then compare t0 item code that can be split
//also need a crye check to add C to MC,BK, RG,GY,NV
function convertArrayToCSV(arr){
	
	let lineArray = [];
	arr.forEach(function(rowArr,index){
		let row = rowArr.join(",");
		lineArray.push(index == 0 ? "data:text/csv;charset=utf-8," + row:row);	
		//lineArray.push(row);
	});
	let csvContent = lineArray.join("\n");
	let encodedUri = encodeURI(csvContent);
	console.log(csvContent);
	return encodedUri
}

function checkVariant(splitCode){
	let variantData = {
		optionName:[],
		optionValue:[]
	}

	for(let key in variantOptions){
		for(let i = 1; i < splitCode.length;i++){
			//found a actual variant option
			if(variantOptions[key][splitCode[i]]){
				variantData.optionName.push(key);
				variantData.optionValue.push(variantOptions[key][splitCode[i]]);
			}
		}	
	}

	return variantData;
}

function isCrye(description,splitItem){
	const cryeColors = {
		RG:"RGC",
		MC:"MCC",
		BK:"BKC",
		NV:"NVC",
		GY:"GYC",
		CB:"CBC"		
	};
	const cryeLength = {
		XL:"XLL"		
	};
	const cryePattern = /Crye|crye|CRYE/;
	const foundCrye = cryePattern.test(description);
	if(foundCrye){
		//console.log(splitItem);
		if(cryeColors[splitItem[1]]){
			splitItem[1] = cryeColors[splitItem[1]];
			
		}
		if(cryeLength[splitItem[3]]){
			splitItem[3] = cryeLength[splitItem[3]];
		}
	}
}

function isNaso(description,splitItem){
	const nasoLength = {
		"20":"20N",
		"22":"22N",
		"24":"24N",
		"26":"26N",
		"28":"28N",
		"30":"30N",
		"32":"32N",
		"34":"34N"		
	};
	const nasoePattern = /Nasopharyngeal|nasopharyngeal/;
	const foundNaso = nasoePattern.test(description);
	if(foundNaso){
		
		if(nasoLength[splitItem[1]]){
			splitItem[1] = nasoLength[splitItem[1]];
			
		}
	}
}

/*
function findVariants(splitCode){
	let variantArr = [];

	splitCode.forEach(function(item){
		for(let key in variantOptions){

			if(variantOptions[key][item]){
				variantArr.push(variantOptions[key][item]);
			}
		}		
	});

	return variantArr;
}
*/
function convertCSV(filteredArr){
	//the handle which applies to variants
	let prevItemCode = "";
	let foundVariant = false;
	let preItemCodeIndex;
	//will hold the variant names ie color size etc
	let currentVariants = {};
	let cryeColorUpdated = false;
	let variantsUpdated = false;
	let variantValuesUpdated = false;
	let nasoUpdated = true;
	//i = netsuite filtered row
	//k = shopify new data row
	for(let i = 1;i < filteredArr.length;i++){
		let splitItemCode = filteredArr[i][0].split("-");
		let currentItemCode;
		if(!parseInt(splitItemCode[0])){
			currentItemCode = splitItemCode[1];
		}
		else{
			currentItemCode = splitItemCode[0]
		}
		//found a possible parent item code and then assign it
		if(splitItemCode.length === 1){
			prevItemCode = currentItemCode;
			foundVariant = false;
			variantsUpdated = false;
			cryeColorUpdated = false;
			variantValuesUpdated = false;
			nasoUpdated = false;
			preItemCodeIndex = i;
			currentVariants = {};
		}
		//no longer with same parent item code assign new possible parent item code
		else if(currentItemCode != prevItemCode){
			prevItemCode = currentItemCode;
			foundVariant = false;
			preItemCodeIndex = i;
			variantsUpdated = false;
			cryeColorUpdated = false;
			variantValuesUpdated = false;
			nasoUpdated = false;
			currentVariants = {};
		}
		//found a possible variant
		else if(splitItemCode.length > 1){
			foundVariant = true;
			cryeColorUpdated = false;
			variantValuesUpdated = false;
			nasoUpdated = false;
		}
		for(let k = 0; k < shopifyDataArray[i].length;k++){
			if(k === 0){
				shopifyDataArray[i][k] = handleArray[i];
				continue;			
			}
			if(netsuiteToShopify[k]){
				shopifyDataArray[i][k] = filteredArr[i][netsuiteToShopify[k]];
			}
			if(k === 16){
				shopifyDataArray[i][k] = filteredArr[i][0];
			}
			if(k === 26){
				shopifyDataArray[i][k] = "continue";
				continue;
			}
			if(k === 28){
				shopifyDataArray[i][k] = "manual";
				continue;
			}
			if(k === 36 && shopifyDataArray[i][35] != ""){
				shopifyDataArray[i][k] = "1";
				continue;
			}
			if(foundVariant){
				if(!cryeColorUpdated){
					isCrye(filteredArr[i][5],splitItemCode);
					//console.log("modified crye color: ", splitItemCode);
					cryeColorUpdated = true;
				}

				if(!nasoUpdated){
					isNaso(filteredArr[i][3],splitItemCode);
					//console.log("modified crye color: ", splitItemCode);
					nasoUpdated = true;
				}
				let variantData = checkVariant(splitItemCode);
				//update the parent of the variant option with the option names
				//can't have sku and price for parent
				if(variantData.optionName.length && !variantsUpdated){
					//assign all variant names
					variantData.optionName.forEach(function(name){
						if(!currentVariants[name]){
							currentVariants[name] = name;
						}
					});
					let optionNameIndex = 0;
					for(let variantName in currentVariants){
						shopifyDataArray[preItemCodeIndex][variantNameIndexes[optionNameIndex]] = variantName;
						optionNameIndex++;
					}
					shopifyDataArray[preItemCodeIndex][16] = "";
					shopifyDataArray[preItemCodeIndex][29] = "";
					variantsUpdated = true;

				}
				

				if(!variantValuesUpdated){
					//let variantArray = findVariants(splitItemCode);
					//console.log(variantArray);
					let variantValIndex = 0;
					variantData.optionValue.forEach(function(varaintVal){
						shopifyDataArray[i][variantValueIndexes[variantValIndex]] = varaintVal;
						variantValIndex++;
					});
					shopifyDataArray[i][1] = "";
					variantValuesUpdated = true;
				}
				
			}
		}
	}

	console.log("final shopify data: ",shopifyDataArray);
}

//build shopify array before using it to split up some of the work
function preBuildShopifyArray(filteredArr){
	shopifyDataArray.push(templateHeadings);
	for(let i = 1; i < filteredArr.length;i++){
		let shopifyRow = [];
		for(let k = 0; k < 42;k++){
			shopifyRow.push("");
		}
		shopifyDataArray.push(shopifyRow);
	}
}

function removeExtraQuote(splitArr){
	for(let i = 0;i < splitArr.length;i++){
		for(let k = 0;k < splitArr[i].length;k++){
			let foundStartQuote = false;
			let splitString = splitArr[i][k].split("");
			if(splitString[0] === '"' && splitString[splitString.length - 1] === '"' && splitString[splitString.length - 2] === '"'){
				splitString.pop();
				let quoteFixString = splitString.join("");
				splitArr[i][k] = quoteFixString;
			}
		}
	}
}

function fixQuotes(splitArr){

	for(let i = 0;i < splitArr.length;i++){
		for(let k = 0;k < splitArr[i].length;k++){
			let splitString = splitArr[i][k].split("");
			if(splitString[0] === '"' && splitString[splitString.length - 1] !== '"'){
				splitString.push('"');
				let quoteFixString = splitString.join("");
				splitArr[i][k] = quoteFixString;
			}
		}
	}
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
			//console.log("Found 2 digit match index: ",i);
			let splitItemCode = splitArr[i][0].split("-");
			//console.log(fixItemSubString(splitItemCode[splitItemCode.length - 1],2));
			splitItemCode[splitItemCode.length - 1] = fixItemSubString(splitItemCode[splitItemCode.length - 1],2);
			//console.log(splitItemCode.join("-"));
			splitArr[i][0] = splitItemCode.join("-");

		}
		else if(oneDigitPattern.test(splitArr[i][0])){
			//console.log("Found 1 digit match index: ",i);
			let splitItemCode = splitArr[i][0].split("-");
			//console.log(fixItemSubString(splitItemCode[splitItemCode.length - 1],3));
			splitItemCode[splitItemCode.length - 1] = fixItemSubString(splitItemCode[splitItemCode.length - 1],3);
			//console.log(splitItemCode.join("-"));
			splitArr[i][0] = splitItemCode.join("-");
		}
		else if(threeLetterPattern.test(splitArr[i][0])){
			//console.log("Found 3 letter match index: ",i);
			let splitItemCode = splitArr[i][0].split("-");
			//console.log(fixItemSubString(splitItemCode[splitItemCode.length - 1],2));
			splitItemCode[splitItemCode.length - 1] = fixItemSubString(splitItemCode[splitItemCode.length - 1],2);
			//console.log(splitItemCode.join("-"));
			splitArr[i][0] = splitItemCode.join("-");
		}
	}
}
//Used to actually convert item name to handle
function convertToHandle(productName){
	let handleName = productName.replace(/\s|\(|\)|,|\"|\'|%|\+|&|\/|\\|\.|\:|\*|\–/g,"-");
	handleName = handleName.replace(/(™|®|©|&trade;|&reg;|&copy;|&#8482;|&#174;|&#169;|\u00ae|\u00a9|\u2122)/g, "");
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

function convertToGrams(splitArr){
	for(let i = 1;i < splitArr.length;i++){

		splitArr[i][6] = !isNaN((parseFloat(splitArr[i][6]) * 1000).toString()) ? (parseFloat(splitArr[i][6]) * 1000).toString() : ""; 		
	}
}

function formatImageStrings(splitArr){
	for(let i = 1;i < splitArr.length;i++){
		if(splitArr[i][7] != ""){
			splitArr[i][7] = 'http://ctoms.ca' + splitArr[i][7];
		}
	}
}

//create an array of handles to be used in Shopify CSV
function createHandleArray(splitArr){
	//hold the single item code to detect variants
	let prevItemCode = "";
	let handleStr = "";
	for(let i = 0; i < splitArr.length; i++){
		
		let splitItemCode = splitArr[i][0].split("-");
		if(!parseInt(splitItemCode[0])){
			currentItemCode = splitItemCode[1];
		}
		else{
			currentItemCode = splitItemCode[0]
		}
		//console.log(splitItemCode);
		if(splitItemCode.length === 1){
			prevItemCode = currentItemCode;
			handleStr = convertToHandle(splitArr[i][1]);
		}
		//found non variant
		else if(currentItemCode != prevItemCode){
			prevItemCode = currentItemCode;
			handleStr = convertToHandle(splitArr[i][1]);
		}

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
		//console.log(chunkArray);
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
	    	console.log(commaSplitArray);
	    	verifyLength(commaSplitArray);

	    	let removedSplitArray = removeForPurchase(commaSplitArray);
	    	verifyForPurchaseRemoved(removedSplitArray);
	    	//console.log(removedSplitArray);

	    	let filteredByItemCodesArray = filterByItemCodes(removedSplitArray); 
	    	
	    	fixCryeItemCodes(filteredByItemCodesArray);
	    	let removedSkipArray = removeSkipBy(skipType,filteredByItemCodesArray);

	    	console.log(removedSkipArray);
	    	let trailHandles = createHandleArray(removedSkipArray);
	    	if(trailHandles.length > 0){
	    		//console.log(trailHandles);
	    		for(let i = 0; i < trailHandles.length;i++){
	    			//console.log("trail handle item:",handleArray[trailHandles[i]])
	    			handleArray[trailHandles[i]] = convertToHandle(handleArray[trailHandles[i]]);
	    		}
	    		verifyHandles(handleArray);
	    		console.log(handleArray);
	    	}
	    	preBuildShopifyArray(removedSkipArray);
	    	//console.log(shopifyDataArray);
	    	verifyArrayLengths(removedSkipArray,shopifyDataArray);
	    	formatImageStrings(removedSkipArray);
	    	convertToGrams(removedSkipArray);
	    	convertCSV(removedSkipArray);
	    	fixQuotes(shopifyDataArray);
	    	removeExtraQuote(shopifyDataArray);
	    	let shopifyCSV = convertArrayToCSV(shopifyDataArray);
	    	checkForNewLine(shopifyDataArray);  	
	    	let downloadLink = document.getElementById("downloadLink");
	    	downloadLink.classList.remove("hide");
	    	downloadLink.setAttribute("href",shopifyCSV);
	    	downloadLink.setAttribute("download", "shopify_data.csv");
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