var todo = require('./models/todo');

module.exports = {
	configure:function(app,passport){
		app.get('/',function(req,res){
			require('connect-ensure-login').ensureLoggedIn();
			console.log("here");
			todo.get(res);
		});
		app.post('/add',function(req,res){

			var task = req.body.task_data;

			todo.add(task,res);
		});
		app.get('/delete/:id',function(req,res){

			var id = req.params.id;

			//console.log(id);
			todo.delete(id,res);

		});
		app.post('/update',function(req,res){
			var update_data = req.body.task_data;
			var update_id = req.body.postid;

			todo.update(update_data,update_id,res);

		});

		//---------------
		app.get('/login',
		  function(req, res){
		    res.render('login');
		  });
		app.post('/login', 
		  passport.authenticate('local', { failureRedirect: '/login' }),
		  function(req, res) {
		    res.redirect('/');
		  });
		  
		app.get('/logout',
		  function(req, res){
		    req.logout();
		    res.redirect('/',{ user: req.user });
		  });

		app.get('/profile',
		  require('connect-ensure-login').ensureLoggedIn(),
		  function(req, res){
		    res.render('profile', { user: req.user });
		});

	}
}