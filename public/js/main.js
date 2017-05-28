$( function() {
 $('.container').masonry({
	itemSelector: '.item',
	columnWidth: 180,
		});
});
function but(id){
	$.ajax({
		type:'POST',
		url:'/updatePost',
		data:{
			id:id
		},
		success:function(){
			var d=$('#likes'+id);
			$(d).html(parseInt($(d).text())+1);
		},
		error:function(err){
			console.log(err)
		}
	});
}

function del(id){
	var choice=confirm("Do you want to delete it");
	console.log(choice);
	if(choice)
	{
		$.ajax({
			type:"POST",
			url:"/deletePost",
			data:{
				id:id
			},
			success:function(){
				var d=$('#div'+id);
				d.css({"display":"none"});
			},
		});
	}
}