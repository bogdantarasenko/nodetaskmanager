var mysql = require("mysql");

function Connection(){
	this.pool = null;

	this.init = function(){
		this.pool = mysql.createPool({
			host:'85.10.205.173',
			user:'bogdan',
			password:'ffa740',
			database:'bogdan'
		});
	}

	this.acquire = function(callback){
		this.pool.getConnection(function(err,connection){
			console.log(err);
			callback(err,connection);
		});
	}
}

module.exports = new Connection();