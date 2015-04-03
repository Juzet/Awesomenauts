<?php
// with this class you remove repitition within the create-db.php page
// a class is object information that allows you to access the information at any time 
class Database {
	private $connection;
	private $host;
	private $username;
	private $password;
	private $database;
	public  $error;


// This is making the class suitable for any initialization that the object may call before it is used
// the constructor is executed after the objects are initialized, the purpose is to put the object in a solid state
	public function __construct($host, $username, $password, $database) {
		$this->host = $host;
		$this->username= $username;
		$this->password= $password;
		$this->database= $database;
// the this variable is connnecting to a new mysqli variable that stores password username and host
		$this->connection = new mysqli($host, $username, $password);
// if the this connection gets an error then the connection error will pop up
		if ($this->connection->connect_error) {
			die("<p>Error:" . $this->connection->connect_error . "</p>");
		}
// making a new varibale exist and storing the this connection database in it
	   $exists = $this->connection->select_db($database);
// if the variable exists is true then the query will create a database
		if(!$exists) {
			$query = $this->connection->query("CREATE DATABASE $database");
// if the query variable is true then the echo will pop up
			if($query)  {
				echo "<p>Successfully created database:". $database ."</p>";
			}
// if the query varibale is false then the echo will pop up  
			 else {
				echo "<p>Database already exists</p>";
			}

		}
	 }
// isset is determining if the set variable is set and is not NULL
// isset will return false if the variable has been set to NULL
// a function is a name given to a block of code that can be executed at any time 
	public function openConnection() {
		$this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

		if ($this->connection->connect_error) {
			die("<p>Error:" . $this->connection->connect_error . "</p>");
		}
	  }
	
	public function closeConnection(){
		if(isset ($this->connection)){
			$this->connection->close();
		}
	}
	// 
// the query function is allowing  is allowing there to be an open connection
// if the query is true then there will be a pop up using the this variable
	public function query($string) {
		$this->openConnection();

		$query = $this->connection->query($string);

		if (!$query) {
			$this->error = $this->connection->error;
		}
// this is closing the connection and turning back to the query
		$this->closeConnection();
		
		return $query;
	}

}

