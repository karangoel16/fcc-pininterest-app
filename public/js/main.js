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
			var d='#likes'+id;
			console.log($(d).val());
		},
	});
}