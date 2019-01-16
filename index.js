function submitClicked(){
	$("#jsSubmit").click(function(event){
		event.preventDefault();
		console.log("submit clicked");
		let csvFile = $('#inputFile').prop('files');
		console.log(csvFile);
	})
}

function initPage(){
	submitClicked();
}

$(initPage);