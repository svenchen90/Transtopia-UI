/**
 * 
 */

// user group
var getGenericCard=function(data)
{
	
}

var getItemCard=function(data)
{
	
}

var getGenericCard = function(data, type){
	var content ='<div class="col-lg-2" id="card_'+data.id+'">\n' + 
	'	<div class="card-user" style="background-color: '+googleColorRandomPicker()+'">\n' +
	'		<div class="card-user-header" style="background: url(\'' + ImageURLPrefix + data.bg_image + '\') no-repeat center center;">\n' +
	'			<div class="clearfix"></div>\n' +
	'			<div class="image_area" style="text-align: center;margin-top:25px;">\n' +
	'				<img src="' + ImageURLPrefix + data.image + '" class="img-circle" data-action="go_instance_page">\n' +
	'			</div>\n' +
	'		</div>\n' +
	'		<div class="card-user-body" style="height: 50px;">\n' +
	'			<div class="name"  data-action="go_instance_page" >' + data.name + '</div>\n';
	content+='		</div>\n' +
	'	</div>\n' +
	'</div>';
var card = $(content);

card.find('[data-action="go_instance_page"]').on('click', function(e){
	if(type=="user")
	{
		window.location.href=URLPrefix+"/user/"+data.uid+"/home";
	}
	else if(type=="group")
	{
		window.location.href=URLPrefix+"/group/"+data.id+"/home";
	}
	else if(type=="item")
	{
		window.location.href=URLPrefix+"/item/"+data.id+"/home";
	}
	else if(type=="project")
	{
		window.location.href=URLPrefix+"/project/"+data.id+"/home";
	}
});

return card;
};


var getRequestCard = function(data, URL_ACCEPT, URL_DENY){
	/* data: {id, name, image} */
	if(data.appy_type==1)
	{
		type_name="邀请的成员"
	}
	else
	{
		type_name="申请的成员"
	}
	var card = $(
		'<div class="col-lg-2 col-md-3 col-sm-4" id="card_'+data.id+'" allowsearch allowremove>\n' +
		'	<div class="apply-card" style="background-color: ' + googleColorRandomPicker() + ' ;">\n'+
		'		<div class="card-body" data-toggle="apply-note">\n'+
		'			<img data-target="image" data-action="go_instance_page">\n' +
		'			<div data-target="name"  data-action="go_instance_page"></div>\n'+
		'			<div data-target="type-name" style="padding-top:5px;"></div>\n'+
		'			<div data-target="btns" style="padding-top:40px; padding-bottom:20px;">\n'+
		'				<a data-action="approve" style="margin-right:10px;"><i class="material-icons"></i><span>接受</span></a>\n'+
		'				<a data-action="deny"><i class="material-icons"></i><span>拒绝</span></a>\n'+
		'			</div>\n'+
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	// 加载数据
	card.attr('data-id', data.id);
	card.find('[data-target="name"]').text(data.name);
	card.find('[data-target="image"]').attr('src', ImageURLPrefix + data.image);
	card.find('[data-toggle="apply-note"]').attr("title", data.apply_note);
	//hover over to popup
	card.find('[data-toggle="apply-note"]').tooltip();
	
	// 接受
	card.find('[data-action="approve"]').on('click', function(){
		$.ajax({
			url : URL_ACCEPT,
			data:{id:data.id},
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 0){
					 messageAlert('添加失败!', 'clear', function(){
						//$("#card_"+data.id).remove();
					});
				}else{
					messageAlert('添加成功!', 'done', function(){
						//obj.ajaxReload();
						$("#card_"+data.id).remove();
					});
				}
			},
			error: function(err){
				callAlert('添加失败!', '<i class="material-icons">clear</i>', function(){});
			}
		});
	});
	
	
	// 拒绝
	card.find('[data-action="deny"]').on('click', function(){
		$.ajax({
			url : URL_DENY,
			data:{id:data.id},
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 0){
					messageAlert('处理失败，请重新尝试!', 'clear', function(){});
				}else{
					messageAlert('已拒绝!', 'done', function(){
						//obj.ajaxReload();
						$("#card_"+data.id).remove();
					});
				}
			},
			error: function(err){
				callAlert('操作失败!', '<i class="material-icons">clear</i>', function(){});
			}
		});
	});
	
	card.find('[data-action="go_instance_page"]').on('click', function(e){
		window.location.href=URLPrefix+"/user/"+data.uid+"/home";
	});
	
	return card;
};