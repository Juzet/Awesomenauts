<?php
	require_once(__DIR__ . "/../model/config.php");

	$array = array{
		'exp' => '',
		'exp1' => '',
		'exp2' => '',
		'exp3' => '',
		'exp4' => '',
	};

// this is also sanitizing the password and username entities 
	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
// the session is connecting to the query and stating that the salt will select the password form the users wntity when username is equal to password 
	$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE BINARY username = '$username'");
// this is making sure the query checks these variable before logging in
	if($query->num_rows == 1) {
// variable $ray is going to get an array 
		$row = $query->fetch_array();
// the statement encypting the words for the password
		if($row["password"] === crypt($password, $row["salt"] )) {
// if the if statement is true then the login is successful and authenticated
			$_SESSION["authenticated"] = true;
			$array["exp"] = $row["exp"];
			$array["exp1"] = $row["exp1"];
			$array["exp2"] = $row["exp2"];
			$array["exp3"] = $row["exp3"];
			$array["exp4"] = $row["exp4"];
			
			$_SESSION["name"] = $username;
//whole array as one 
			echo json_encode($array);
		}
// if the if statement is wrong the code will pop up invalid user and password
		else {
			echo "Invalid username and password";
		}
	}
	else {
			echo "Invalid username and password";
		}