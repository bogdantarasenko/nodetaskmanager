var connection = require('../connection');

function Todo(){
	this.get = function(res){
		connection.acquire(function(err,con){
			con.query('select * from todo',function(err,result){
				con.release();
				//res.send(result);
				
				res.render('index',{data:result});
				console.log(result)
			});
		});
	}
	this.add = function(task,res){
		
		connection.acquire(function(err,con){

			con.query('insert into todo (task,done) VALUES ("'+task+'","0")',function(err,result){
				con.release();
				
				res.send({redirect: '/'});
				
				//console.log(result);
			});

		});
	}

	this.delete = function(id,res){

		connection.acquire(function(err,con){

			con.query('delete from todo where id = ?',[id],function(err,result){
				con.release();

				console.log(err);

				res.redirect('/');

			});

		});
	}

	this.update = function(update_data,update_id,res){

		connection.acquire(function(err,con){

			con.query('update todo set task ="'+update_data+'" where id ='+update_id,function(err,result){

				con.release();

				res.send({redirect: '/'});
			});

		});

	}

}

module.exports = new Todo();