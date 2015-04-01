<?php
// requiring the config file 
	require_once(__DIR__ . "/../model/config.php");
// this is unsetting the authentication
	unset($_SESSION["authenticated"]);
// this is destroying the session variable 
	session_destroy();
// making the header path go to the index
	header("Location: " . $path . "index.php");