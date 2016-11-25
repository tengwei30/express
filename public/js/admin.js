$(function(){
	$('.del').click(function(ev){
		var target = $(ev.target);
		var id = target.data('id');
		var tr = $('.item-id-'+id); //拿到表格中的一行
		// console.log(id);
		$.ajax({
			type:'DELETE',
			url:'/admin/list?id='+id
		})
		.done(function(results){
			if(results.success === 1){
				if(tr.length > 0){
					tr.remove();
				}
			}
		})
		//done 是成功执行 立即执行  always 不论成功不成功都执行
	})
})