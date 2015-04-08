<?php
// we are getting access to the data in the folder model file config
	require_once(__DIR__ . "/../model/config.php");

// sanitizing the email so that it will delete unknown charaters in the email 
//	$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
// sanitizing by string so any invalid characters will automatically be deleted using a string
	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
// sanitizing the passowrd so any invalid characters will automatically be deleted using a string 
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);



// salt makes the hashed encrypted password unique id it's the same password they won't have the same has
	$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";
// hashing the passowrds so that they could be encryted
	$hashedPassword = crypt($password, $salt);
// inserting into the users table and then we want to set the email, username, and password 
// this is setting all these variables to certain assignments
	$query = $_SESSION["connection"]->query("INSERT INTO users SET "
		. "username = '$username',"
		. "password = '$hashedPassword',"
		. "salt = '$salt', "
		. "exp = 0, "
		. "exp1 = 0, "
		. "exp2 = 0, "
		. "exp3 = 0, "
		. "exp4 = 0");

	$_SESSION["name"] = $username;
 // this is going to be the echo that pops up when the code is correct
	if($query) {
		echo "true";
	}
// this is going to be the code popping up if the code is incorrect
	else {
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}
?>