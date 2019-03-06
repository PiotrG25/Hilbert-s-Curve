var tab = [];
$(function(){
	
	var stopien = $("#stopien");
	var dlugosc = $("#dlugosc");
	var submit = $("#submit");
	
	
	var matrixArea = $("#matrixArea");
	var matrix = $("<table></table>");
	matrixArea.append(matrix);
	
	
	submit.click(function(){
		
		var stopienValue = parseInt(stopien.val());
		var dlugoscValue = parseInt(dlugosc.val());
		tab = [];
		
		matrix.css({"display": "none"});
		matrix = $("<table></table>");
		matrixArea.append(matrix);
		
		var length = lengthOfStopien(stopienValue, dlugoscValue);
		
		for(var i = 0; i < length; i++){
			var tr = $("<tr></tr>");
			tab[i] = [];
			
			for(var j = 0; j < length; j++){
				var td = $("<td></td>");
				tab[i][j] = td;
				td.css({'width': '1px', 'height': '1px', 'background-color': 'lime'});
				tr.append(td);
			}
			matrix.append(tr);
		}
		
		draw(stopienValue, dlugoscValue, 0, 0, 0);
	});
});

function draw(st, dl, top, left, alpha){
	
	var toPoint1 = lengthOfStopien(st - 1, dl) - 1;
	var toPoint2 = lengthOfStopien(st - 1, dl) + dl - 2;
	var toPoint3 = 2 * lengthOfStopien(st - 1, dl) + dl - 3;
	
	if(alpha % 4 == 0){

		if(st == 1){
			line(left, top + dl - 1, left, top);
			line(left, top, left + dl - 1, top);
			line(left + dl - 1, top, left + dl - 1, top + dl - 1);
		}else{
			draw(st - 1, dl, top, left, 0);
			draw(st - 1, dl, top, left + lengthOfStopien(st - 1, dl) + dl - 2, 0);
			draw(st - 1, dl, top + lengthOfStopien(st - 1, dl) + dl - 2, left, 3);
			draw(st - 1, dl, top + lengthOfStopien(st - 1, dl) + dl - 2, left + lengthOfStopien(st - 1, dl) + dl - 2, 1);
			
			line(left + toPoint1, top + toPoint1, left + toPoint2, top + toPoint1);
			line(left, top + toPoint1, left, top + toPoint2);
			line(left + toPoint3, top + toPoint1, left + toPoint3, top + toPoint2);
		}
	}else if(alpha % 4 == 1){

		if(st == 1){
			line(left + dl - 1, top + dl - 1, left, top + dl - 1);
			line(left, top + dl - 1, left, top);
			line(left, top, left + dl - 1, top);
		}else{
			draw(st - 1, dl, top, left, 1);
			draw(st - 1, dl, top, left + lengthOfStopien(st - 1, dl) + dl - 2, 2);
			draw(st - 1, dl, top + lengthOfStopien(st - 1, dl) + dl - 2, left, 1);
			draw(st - 1, dl, top + lengthOfStopien(st - 1, dl) + dl - 2, left + lengthOfStopien(st - 1, dl) + dl - 2, 0);
			
			line(left + toPoint1, top, left + toPoint2, top);
			line(left + toPoint1, top + toPoint1, left + toPoint1, top + toPoint2);
			line(left + toPoint1, top + toPoint3, left + toPoint2, top + toPoint3);
		}
	}else if(alpha % 4 == 2){
		
		if(st == 1){
			line(left + dl - 1, top, left + dl - 1, top + dl - 1);
			line(left + dl - 1, top + dl - 1, left, top + dl - 1);
			line(left, top + dl - 1, left, top);
		}else{
			draw(st - 1, dl, top, left, 3);
			draw(st - 1, dl, top, left + lengthOfStopien(st - 1, dl) + dl - 2, 1);
			draw(st - 1, dl, top + lengthOfStopien(st - 1, dl) + dl - 2, left, 2);
			draw(st - 1, dl, top + lengthOfStopien(st - 1, dl) + dl - 2, left + lengthOfStopien(st - 1, dl) + dl - 2, 2);
			
			line(left, top + toPoint1, left, top + toPoint2);
			line(left + toPoint1, top + toPoint2, left + toPoint2, top + toPoint2);
			line(left + toPoint3, top + toPoint1, left + toPoint3, top + toPoint2);
		}
	}else if(alpha % 4 == 3){
		
		if(st == 1){
			line(left, top, left + dl - 1, top);
			line(left + dl - 1, top, left + dl - 1, top + dl - 1);
			line(left + dl - 1, top + dl - 1, left, top + dl - 1);
		}else{
			draw(st - 1, dl, top, left, 2);
			draw(st - 1, dl, top, left + lengthOfStopien(st - 1, dl) + dl - 2, 3);
			draw(st - 1, dl, top + lengthOfStopien(st - 1, dl) + dl - 2, left, 0);
			draw(st - 1, dl, top + lengthOfStopien(st - 1, dl) + dl - 2, left + lengthOfStopien(st - 1, dl) + dl - 2, 3);
			
			line(left + toPoint1, top, left + toPoint2, top);
			line(left + toPoint2, top + toPoint1, left + toPoint2, top + toPoint2);
			line(left + toPoint1, top + toPoint3, left + toPoint2, top + toPoint3);
		}
	}
}

function line(x1, y1, x2, y2){
	if(min(x1, x2) == max(x1, x2)){//w linii pionowej
		var i = min(y1, y2);
		for(; i <= max(y1, y2); i++){
			tab[i][x1].css({"background-color": "black"});
		}
	}else{// w linii poziomej
		var i = min(x1, x2);
		for(; i <= max(x1, x2); i++){
			tab[y1][i].css({"background-color": "black"});
		}
	}
}

function min(a, b){
	if(a < b){
		return a;
	}
	return b;
}

function max(a, b){
	if(a > b){
		return a;
	}
	return b;
}

function lengthOfStopien(st, dl){
	if(st == 0){
		return 0;
	}
	
	if(st == 1){
		return dl;
	}else{
		return (2 * lengthOfStopien(st - 1, dl) + dl - 2);
	}
}