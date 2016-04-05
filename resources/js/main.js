$(function(){
	$('#send').on('click',function(){
		var formdata = $('#task').val();
		if(formdata.length === 0){
			alert("input somethinh in the field");
		}else{
			$.ajax({
				url:'/add',
				method:'POST',
				data:'task_data='+formdata,
				success: function(data) {
						//console.log(data);
	                    window.location = data.redirect
					}
			});
		}
		//console.log(formdata.length);
	})
	$('button[name="update"]').on('click',function(){
		var postid = $(this).siblings('div[name="postid"]').text();
		var updatetask = $(this).siblings('textarea[name="updatetask"]').val();

		//console.log(postid.text());
		$.ajax({
				url:'/update',
				method:'POST',
				data:'task_data='+updatetask+"&postid="+postid,
				success: function(data) {
						//console.log(data);
	                    window.location = data.redirect
					}
			});
	})
	
	
});