<?php
$result = "";

if(isset($_POST["arr"])){
	$data = json_decode($_POST["arr"]);
	$array = $data[0];
	$row = $data[1][0];
	$col = $data[1][1];

	findSaddle($array, $row, $col);

	$checked = checkValues($array, $row, $col);
	if($checked){
		findSaddle($array, $row, $col);
	}else
	echo $result;

}

function checkValues($data, $row, $col){
	for($i = 0; $i<$row; $i++){
		for($j = 0; $j<$col; $j++){
			if(!(is_numeric($data))){
				$result = "Wrong values";
				return false;
			}
		}
	}
	return true;
}

function findSaddle($array, $row, $col){
	$min = array();
	$minCoord = array();
	for($i = 0; $i<$row; $i++){
		$min[$i] = $array[$i][0];
		$minCoord[$i][0] = $i;
		$minCoord[$i][1] = 0;
		for($j = 0; $j<$col; $j++){
			if($array[$i][$j] < $min[$i]){
				$min[$i] = $array[$i][$j];
				$minCoord[$i][0] = $i;
				$minCoord[$i][1] = $j;
			}
		}
	}

		$max = array();
		$maxCoord = array();

	for($i = 0; $i<$col; $i++){
	$max[$i] = $array[0][$i];
	$maxCoord[$i][0] = 0;
	$maxCoord[$i][1] = $i;
	for($j = 0; $j<$row; $j++){
		if($array[$j][$i] > $max[$i]){
			$max[$i] = $array[$j][$i];
			$maxCoord[$i][0] = $j;
			$maxCoord[$i][1] = $i;
		}
	}
}

	for($i = 0; $i<$row; $i++){
		for($j = 0; $j<$col; $j++){
			if($min[$i] == $max[$j] && $minCoord[$i][0] == $maxCoord[$j][0] && $minCoord[$i][1] == $maxCoord[$j][1]){
				echo "".$i.$j;
			}
			
		}
	}

}


 ?>