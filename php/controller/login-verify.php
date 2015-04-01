<?php
// requiring the information from the config file
	require_once(__DIR__ . "/../model/config.php");
// this is verifying the the the login 
	function authenticateUser() {
		if(!isset($_SESSION["authenticated"])) {
// / the isset is authenticating the user and setting the session to it
			return false;
		}
		else {
// if the session variable is false then the session will return false
			if($_SESSION["authenticated"] != true) {
				return false;
			}
			else {
				return true;
			}
		}
	}