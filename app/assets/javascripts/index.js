$(document).foundation();
$(document).ready(function(){
	makeHair();
});

function makeHair(){
	var charge= document.getElementById("saiyanCharge");
	if(charge){
		setTimeout(function(){
			$("#saiyanCharge").hide(2000, function(){
				$(this).remove();
				$("#hair").show(0, function(){
				});
			});
		}, 5000);
	}
}