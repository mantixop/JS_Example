var row;
var col;
var array = [];

$("index.html").ready(function(){
  $("#go").click(function(){

    	generate();
  });
});

function generate(){
		row = $("#row").val();
    	col = $("#col").val();

    	$("div").empty();

    	if(!(col>0) || !(row>0)){
    		$("div").append("Wrong values");
    	}
    	else{
    		createInput(row, col);
    		$("div").append(
    						$("<br/>"),
    						$("<input/>",{type:'button', name:'submit', value: 'Submit'})
    						);
    		readCheck();
    	}
}

function gradient(startColor, endColor, steps){
	var start = {
                     'Hex'   : startColor,
                     'R'     : parseInt(startColor.slice(1,3), 16),
                     'G'     : parseInt(startColor.slice(3,5), 16),
                     'B'     : parseInt(startColor.slice(5,7), 16)
             }
             var end = {
                     'Hex'   : endColor,
                     'R'     : parseInt(endColor.slice(1,3), 16),
                     'G'     : parseInt(endColor.slice(3,5), 16),
                     'B'     : parseInt(endColor.slice(5,7), 16)
             }
             diffR = end['R'] - start['R'];
             diffG = end['G'] - start['G'];
             diffB = end['B'] - start['B'];

             stepsHex  = new Array();
             stepsR    = new Array();
             stepsG    = new Array();
             stepsB    = new Array();

             for(var i = 0; i <= steps; i++) {
                     stepsR[i] = start['R'] + ((diffR / steps) * i);
                     stepsG[i] = start['G'] + ((diffG / steps) * i);
                     stepsB[i] = start['B'] + ((diffB / steps) * i);
                     stepsHex[i] = '#' + Math.round(stepsR[i]).toString(16) + '' + Math.round(stepsG[i]).toString(16) + '' + Math.round(stepsB[i]).toString(16);
             }
             return stepsHex;
}

function readCheck(){
			$("[name='submit']").click(function(){
		  		var inputState = checkInput(row, col);
		  		
		  		if (inputState){
		  			$("[name='submit']").remove();
		  			$("#err").remove();
		  			$(".arr").attr("readonly", "readonly").css("background-color", "#FAEBD7");
		  			$("div").append(
	    						$("<input/>",{type:'button', name:'solve', value: 'Solve'})
	    						);

		  		}else{
		  			$("#err").remove();
		  			$("div").append("<p id = \"err\">Wrong values</p>");
		  		}


			  		$("[name='solve']").click(function(){
		    			getSolution();
			 		 });

		    });

}

				

function checkInput(rows, cols){
	for(var i = 0; i< rows; i++){
		array[i] = [];
	}


	for(var i = 0; i< rows; i++){
		for(var j = 0; j < cols; j++){
			if($.isNumeric($("#" + i + j).val())){
			array[i][j] = $("#" + i + j).val();
			}else{
				return false;
			}
			
		}
	}
	return true;
}

function createInput(rows, cols){
	for(var i = 0; i< rows; i++){
		for(var j = 0; j < cols; j++){
			$("div").append("<input type = \"text\" id = \""+i+j+"\" class = \"arr\" />");
		}
		$("div").append("<br>");
	}
}

function left(i,j,startColor){
	if(j==0){
		return 0 ;
	}else{

	var color = gradient("#FF6348", "#FAEBD7", j);
	for(var k = j; k>=0; k--){
		$("#"+ i + k).css("background-color", color[j-k]);
	}
}
}
function right(i,j,startColor){
	if(j==0){
		return 0 ;
	}else{

	var color = gradient("#FF6348", "#FAEBD7", col-j - 1);
	for(var k = j; k<col; k++){
		$("#"+ i + k).css("background-color", color[k-j]);
	}
}
}
function up(i,j,startColor){
	if(i==0){
		return 0 ;
	}else{

	var color = gradient("#FF6348", "#FAEBD7", i);
	for(var k = i; k>=0; k--){
		$("#"+ k + j).css("background-color", color[i-k]);
	}
}
}
function down(i,j,startColor){
	if(i==0){
		return 0 ;
	}else{

	var color = gradient("#FF6348", "#FAEBD7", row - i - 1);
	for(var k = i; k<row; k++){
		$("#"+ k + j).css("background-color", color[k-i]);
	}
}
}

function printGragient(result){
	var i = parseInt(result.slice(0,1), 10);
	var j = parseInt(result.slice(1,2), 10);
	console.log(i + " " + j);
	var startColor = "#FF6348";
	left(i,j,startColor);
	right(i,j,startColor);
	up(i,j,startColor);
	down(i,j,startColor);
	/*var color =  gradient("#FF6348" , "#FAEBD7", 5);
					for(var i = 0; i < col; i++){
						console.log(color[i]);
						$("#0"+i).css("background-color", color[i]);
						
					}*/

}

function getSolution(){
	var info = [];
	var dimens = [];
	dimens[0] = row;
	dimens[1] = col;
	info[0] = array;
	info[1] = dimens;
	$.ajax({
		type: 'POST',
		cache: false,
		url: 'solver.php',
		data: {"arr": JSON.stringify(info)},
		success:  function(result) {
			printGragient(result);
			console.log(result);
		}
	});
}