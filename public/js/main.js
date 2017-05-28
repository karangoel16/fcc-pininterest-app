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