/* 13. 创建用户modal-card样式 */
var createUserCard = function(data, actions){
	//加载基本信息
	var card = $(
		'<div class="col-lg-3 col-md-6">\n'+
		'	<div class="card-user" style="background-color: ' + googleColorRandomPicker() + ';">\n' +
		'		<div class="card-user-header" style="background: url(\'' + data.bg + '\') no-repeat center center;">\n' +
		'			<div class="dropdown pull-right">\n' +
		'				<a href="#" class="dropdown-" data-toggle="dropdown">\n' +
		'					<i class="fa fa-gear"></i>\n' +
		'				</a>\n' +
		'				<ul class="dropdown-menu">\n' +
		'				</ul>\n' +
		'			</div>\n' +
		'			<div class="clearfix">\n' +
		'			</div>\n' +
		'			<div style="text-align: center; margin-top: 10px;">\n' +
		'				<img src="' + data.image + '" class="img-circle" />\n' +
		'			</div>\n' +
		'		</div>\n' +
		'		<div class="card-user-body">\n' +
		'			<div class="name">' + data.name + '</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);

	//加载共同好友
	if(data.commonFriends.length != 0) {
		var commonFriends = $(
			'<div class="list" >\n' +
			'	<span>' + data.commonFriends.length + ' 位共同好友</span>\n' +
			'</div>'
		);
		bindHoverTo(data.commonFriends, commonFriends.find('span'));
		card.find('.card-user-body').append(commonFriends);
	}
		
	//加载共同兴趣类别
	if(data.commonGenres.length != 0){
		var commonGenres = $(
			'<div class="list">\n' +
			'	<span>' + data.commonGenres.length + ' 个共同兴趣类别</span>\n' +
			'</div>'
		);
		bindHoverTo(data.commonGenres, commonGenres.find('span'));
		card.find('.card-user-body').append(commonGenres);
	}
		
	//加载共同好友
	if(data.commonTopics.length != 0){
		var commonTopics = $(
			'<div class="list">\n' +
			'	<span>' + data.commonTopics.length + ' 个共同兴趣话题</span>\n' +
			'</div>'
		);
		bindHoverTo(data.commonTopics, commonTopics.find('span'));
		card.find('.card-user-body').append(commonTopics);
	}
	
	$.each(actions, function(index, item){
		var itemMenu = $('<li><a href="javascript:void(0)">' + item.name + '</a></li>');
		$(itemMenu).on('click', function(){
			$.ajax({
					url : item.action,
					data: {id: data.id},
					cache : false, 
					async : false,
					type : "GET",
					dataType : 'json',
					success : function (result){
						if(result == 1){
							$(card).remove();
							callAlert('操作完成','done');
						}else{
							//error
							callAlert('错误','highlight_off');
						}
					}
				});
			
			console.log();
		});
		card.find('.dropdown-menu').append(itemMenu); 
	});
	
	//更具不同用户权限加载不同菜单
	if(actions == 1) {
		card.find('.dropdown-menu').append(
			'				<li><a href="#">查看</a></li>\n' +
			'				<li class="divider"></li>\n' +
			'				<li><a href="javascript:void(0);">加为好友</a></li>\n' +
			'				<li><a href="javascript:void(0);">删除好友</a></li>\n' +
			'				<li class="divider"></li>\n' +
			'				<li><a href="javascript:void(0);">添加关注</a></li>\n' +
			'				<li><a href="javascript:void(0);">取消关注</a></li>\n' +
			'				<li class="divider"></li>\n' +
			'				<li><a href="javascript:void(0);">移出该标签组</a></li>\n'
		);
		
	}else if(actions == 2) {
		card.find('.dropdown-menu').append(
			'<li><a href="javascript:void(0);" onClick="callConfirm(\'确定要移除黑名单吗？\');">从黑名单中移除</a></li>'
		);
	}else if(actions == 3){
		card.find('.dropdown-menu').append(
			'<li><a href="javascript:void(0);" onClick="callConfirm(\'确定要通过申请吗？\');">通过申请</a></li>'
		);
		card.find('.dropdown-menu').append(
			'<li><a href="javascript:void(0);" onClick="callConfirm(\'确定要拒绝申请吗？\');">拒绝申请</a></li>'
		);
	}else {
		
	}
	return card;
};

