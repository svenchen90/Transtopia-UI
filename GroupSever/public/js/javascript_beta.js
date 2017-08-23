/*
 There are 2 main frame for this application. (so far)
 1. w/o left info block
 2. w left info block
	components: nav-top-st, nav-top-nd, nav-left-foldable, block-left, block-right, btngroup-leftbot
*/




/* Here is the function of frame #2 */


/* End */


/* Test */
(
	function($){
		$.fn.test = function(abc){
			console.log(abc);
		};
	}
)(jQuery);

$('.modal').test(111);
/* End */
/*
User: {
	authority: 0 or 1
	name:
	image:
	bg:
	gender: 0 or 1;
	sign: //签名
	title: []
	genre: []
	topic: []
	
}
*/
var loadUserBlock = function(data) {
	$('.block-left .name').text(data.name);
	$('.block-left .img-block img').attr('src', data.image);
	$('.block-left .img-background img').attr('src', data.bg);
	
	if(data.gender == 0)
		$('.block-left .sign-block').append('<span style="color: #0070E0;"><i class="fa fa-mars"></i></span>');
	else if(data.gender == 1)
		$('.block-left .sign-block').append('<span style="color: #e04141;"><i class="fa fa-venus"></i></span>');
	else if(data.gender === undefined)
		$('.block-left .sign-block').append('<span>未公开</span>');
	else{

	}
	$('.block-left .sign-block').append(' - ');
	$('.block-left .sign-block').append('<span>' + data.sign + '</span>');
	
	
	if(data.title.length == 0)
		$('.block-left .detail:eq(0) p').append('暂无');
	else{
		$.each(data.title, function(i, t){
			$('.block-left .detail:eq(0) p').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + t + '</span>');
		});
	}
	
	if(data.genre.length == 0)
		$('.block-left .detail:eq(1) p').append('暂无');
	else{
		$.each(data.genre, function(i, g){
			$('.block-left .detail:eq(1) p').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
		});
	}
	
	if(data.topic.length == 0)
		$('.block-left .detail:eq(2) p').append('暂无');
	else{
		$.each(data.topic, function(i, t){
			$('.block-left .detail:eq(2) p').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + t + '</span>');
		});
	}
	
	//是不是用户本人, 1是， 0 不是
	if(data.authority == 1) {
		$('.memu-top div:eq(0) > ul').append('<li><a href="#modal-preference" data-toggle="modal">显示样式</a></li>');
		$('.memu-top div:eq(0) > ul').append('<li><a href="#modal-message" data-toggle="modal">消息</a></li>');
		$('.memu-top div:eq(0) > ul').append(
		'<li class="dropdown-submenu">\n' +
		'	<a class="subtoggle" href="#">隐私 <span class="fa fa-caret-right"></span></a>\n' +
		'	<ul class="dropdown-menu">\n' +
		'		<li><a href="#modal-privacy" data-toggle="modal">基本设置</a></li>\n' +
		'		<li><a href="javascript:void(0);" onClick="initModalListBlock(\'黑名单管理\', data_user);">黑名单管理</a></li>\n' +
		'		<li><a href="javascript:void(0);" onClick="initModalListBlock(\'动态屏蔽者名单\', data_user);">动态屏蔽者名单</a></li>\n' +
		'	</ul>\n' +
		'</li>'
		);
		$('.memu-top div:eq(0) > ul').append('<li class="divider"></li>');
		$('.memu-top div:eq(0) > ul').append(
		'<li class="dropdown-submenu">\n' +
		'	<a class="subtoggle" href="#">个人设置 <span class="fa fa-caret-right"></span></a>\n' +
		'	<ul class="dropdown-menu">\n' +
		'		<li><a href="#modal-profile" data-toggle="modal">基本设置</a></li>\n' +
		'		<li><a href="javascript:void(0);" onClick="initModalTag(\'头衔\', \'face\', data_title_1, data_title_2, \'action1\', \'action2\');">头衔管理</a></li>\n' +
		'		<li><a href="javascript:void(0);" onClick="initModalTag(\'兴趣类别\', \'face\', data_title_1, data_title_2, \'action1\', \'action2\');">兴趣类型管理</a></li>\n' +
		'		<li><a href="javascript:void(0);" onClick="initModalTag(\'兴趣话题\', \'face\', data_title_1, data_title_2, \'action1\', \'action2\');">话题管理</a></li>\n' +
		'	</ul>\n' +
		'</li>'
		);
		$('.memu-top div:eq(0) > ul').append('<li class="divider"></li>');
		$('.memu-top div:eq(0) > ul').append('<li><a href="#">账户与安全</a></li>');
		$('.memu-top div:eq(0) > ul').append('<li><a href="#">费用中心</a></li>');
		
		
	}else if(data.authority == 0){
		
	}
	
	$('.memu-top').on('click', function(e){
		$(this).find('.dropdown-submenu ul').hide();
	});
	
	$('.dropdown-submenu a.subtoggle').on("click", function(e){
		//console.log(1);
		$('.dropdown-submenu ul').hide();
		$(this).next('ul').toggle();
		e.stopPropagation();
		e.preventDefault();
	});
};

var loadNavTop = function(data) {
	//第一行
	$('.nav-top-first #navbar-collapse .current-page').text('个人');
	$('.nav-top-first .navbar-custom-menu .user-menu > a > span').text(data.name);
	$('.nav-top-first .navbar-custom-menu .user-menu > a > img').attr('src', data.image);
	
	//第二行
	if(data.authority == 1){
		$('.nav-top-second ul:first').append('<li><a href="/individual_posts">动态</a></li>');
		$('.nav-top-second ul:first').append('<li><a href="/individual_collection">收藏备注</a></li>');
		$('.nav-top-second ul:first').append('<li><a href="/individual_friends">好友</a></li>');
		$('.nav-top-second ul:first').append('<li><a href="/individual_followingindividual">我关注的</a></li>');
		$('.nav-top-second ul:first').append('<li><a href="/individual_followed">关注我的</a></li>');
		$('.nav-top-second ul:first').append('<li><a href="/individual_followinggroups">关注社群</a></li>');
		$('.nav-top-second ul:first').append('<li><a href="/individual_tags">标签管理</a></li>');
	}else if(data.authority == 0){
		$('.nav-top-second ul:first').append('<li><a href="/individual_posts">动态</a></li>');
		$('.nav-top-second ul:first').append('<li><a href="/individual_friends">TA的好友</a></li>');
		$('.nav-top-second ul:first').append('<li><a href="/individual_followingindividual">TA的关注</a></li>');
		$('.nav-top-second ul:first').append('<li><a href="/individual_followed">关注TA的</a></li>');
		$('.nav-top-second ul:first').append('<li><a href="/individual_followinggroups">关注社群</a></li>');
	}else {
		
	}
};

var loadTagListTo = function(data, target, authority) {
	$.each(data,function(i, d){
		var card = $(
		'<div class="col-lg-3">\n'+
		'	<div class="card-tag" style="background-color: ' + googleColorRandomPicker() + ';">\n'+
		'		<div class="dropdown pull-right">\n'+
		'			<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n'+
		'				<i class="fa fa-gear"></i>\n'+
		'			</a>\n'+
		'			<ul class="dropdown-menu">\n'+
		'			</ul>\n'+
		'		</div>\n'+
		'		<div class="card-body">\n'+
		'			<a href="' + d.url + '"><i class="material-icons">' + d.icon + '</i></a>\n'+
		'			<span>' + d.count + '</span>\n'+
		'			<div>' + d.name + '</div>\n'+
		'		</div>\n'+
		'	</div>\n'+
		'</div>'
		);
		
		if(authority == 1){
			card.find('.dropdown-menu').append(
				'<li><a href="#">查看</a></li>\n'+
				'<li><a href="#">修改标签</a></li>\n'+
				'<li><a href="#">删除标签</a></li>'
			);
		}else if(authority == 0){
			card.find('.dropdown-menu').append('<li><a href="#">查看</a></li>');
		}else {
			
		}
		$(target).append(card);
	});
};

/*
var loadCollectionTagList = function(data, authority) {
	$.each(data,function(i, d){
		if(authority == 1){
			$('.content-wrapper .tag-wall').append(
				'<div class="card-tag" style="background-color: ' + googleColorRandomPicker() + ';">\n'+
				'	<div class="dropdown pull-right">\n'+
				'		<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n'+
				'			<i class="fa fa-gear"></i>\n'+
				'		</a>\n'+
				'		<ul class="dropdown-menu">\n'+
				'			<li><a href="#">查看</a></li>\n'+
				'			<li><a href="#">修改备注</a></li>\n'+
				'			<li><a href="#">删除备注</a></li>\n'+
				'		</ul>\n'+
				'	</div>\n'+
				'	<div class="card-body">\n'+
				'		<a href="/individual_collection_tag_posts"><i class="material-icons">mode_edit</i></a>\n'+
				'		<span>' + d.count + '</span>\n'+
				'		<div>' + d.name + '</div>\n'+
				'	</div>\n'+
				'</div>'
			);
		}else if(authority == 0){
			
		}else {
			
		}
	});
};

var loadUserCardTo = function(data, targetBlock, authority) {
	$.each(data,function(i, d){
		if(authority == 1){
			var txt1 = "",
			txt2 ="",
			txt3 ="";
			
			if(d.title.length == 0)
				txt1 = "暂无";
			else{
				$.each(d.title, function(i, t){
					txt1 += '<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + t + '</span>\n';
				});
			}
			
			if(d.genre.length == 0)
				txt2 = "暂无";
			else{
				$.each(d.genre, function(i, g){
					txt2 += '<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>\n';
				});
			}
			
			if(d.topic.length == 0)
				txt3 = "暂无";
			else{
				$.each(d.topic, function(i, t){
					txt3 += '<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + t + '</span>\n';
				});
			}
			
			$(targetBlock).append(
			'<div class="card-user" style="background-color: ' + googleColorRandomPicker() + ';">\n' +
			'	<div class="card-user-header" style="background: url(\'' + d.bg + '\') no-repeat center center;">\n' +
			'		<div class="dropdown pull-right">\n' +
			'			<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
			'				<i class="fa fa-gear"></i>\n' +
			'			</a>\n' +
			'			<ul class="dropdown-menu">\n' +
			'				<li><a href="#">查看</a></li>\n' +
			'				<li class="divider"></li>\n' +
			'				<li><a href="javascript:void(0);">加为好友</a></li>\n' +
			'				<li><a href="javascript:void(0);">删除好友</a></li>\n' +
			'				<li class="divider"></li>\n' +
			'				<li><a href="javascript:void(0);">添加关注</a></li>\n' +
			'				<li><a href="javascript:void(0);">取消关注</a></li>\n' +
			'				<li class="divider"></li>\n' +
			'				<li><a href="javascript:void(0);">移出该标签组</a></li>\n' +
			'			</ul>\n' +
			'		</div>\n' +
			'	</div>\n' +
			'	<div class="card-user-body">\n' +
			'		<div class="bg">\n' +
			'			<img src="' + d.image + '" class="img-circle" />\n' +
			'		</div>\n' +
			'		<div class="name">' + d.name + '</div>\n' +
			'		<div class="list">\n' +
			'			<span style="color:rgba(255,255,255,0.8);" title="兴趣类别"><i class="fa fa-list-ul"></i></span>\n' +
			'			<span style="margin: 0 0 10px;">' + txt1 + '</span>\n' +
			'		</div>\n' +
			'		<div class="list">\n' +
			'			<span style="color:rgba(255,255,255,0.8);" title="兴趣话题"><i class="fa fa-tag"></i></span>\n' +
			'			<span style="margin: 0 0 10px;">' + txt2 + '</span>	\n' +
			'		</div>\n' +
			'		<div class="list">\n' +
			'			<span style="color:rgba(255,255,255,0.8);" title="备注"><i class="fa fa-pencil"></i></span>\n' +
			'			<span style="margin: 0 0 10px;">' + txt3 + '</span>	\n' +
			'		</div>\n' +
			'	</div>\n' +
			'</div>'
			);
		}else if(authority == 0){
			
		}else {
			
		}
	});
};
*/

var createUserCard = function(data, authority){
	//加载基本信息
	var card = $(
		'<div class="col-lg-3">\n'+
		'	<div class="card-user" style="background-color: ' + googleColorRandomPicker() + ';">\n' +
		'		<div class="card-user-header" style="background: url(\'' + data.bg + '\') no-repeat center center;">\n' +
		'			<div class="dropdown pull-right">\n' +
		'				<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
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

	//更具不同用户权限加载不同菜单
	if(authority == 1) {
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
		
	}else if(authority == 2) {
		card.find('.dropdown-menu').append(
			'<li><a href="javascript:void(0);" onClick="callConfirm(\'确定要移除黑名单吗？\');">从黑名单中移除</a></li>'
		);
	}else if(authority == 3){
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

var createGroupCard = function(data, authority){
	//加载基本信息
	var card = $(
		'<div class="col-lg-3">\n'+
		' <div class="card-group" style="background-color: ' + googleColorRandomPicker() + ';">\n' +
		' 	<div class="card-group-header" style="background: url(\'' + data.bg + '\') no-repeat center center;">\n' +
		' 		<div class="dropdown pull-right">\n' +
		' 			<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
		' 				<i class="fa fa-gear"></i>\n' +
		' 			</a>\n' +
		' 			<ul class="dropdown-menu">\n' +
		' 			</ul>\n' +
		' 		</div>\n' +
		' 	</div>\n' +
		' 	<div class="card-group-body">\n' +
		' 		<div class="bg">\n' +
		' 			<img src="' + data.image + '" class="img-circle" />\n' +
		' 		</div>\n' +
		' 		<div class="name">' + data.name + '</div>\n' +
		' 	</div>\n' +
		' </div>\n' +
		'</div>'
	);

	//加载共同兴趣类别
	if(data.commonGenres.length != 0){
		var commonGenres = $(
			'<div class="list">\n' +
			'	<span>' + data.commonGenres.length + ' 个共同兴趣类别</span>\n' +
			'</div>'
		);
		bindHoverTo(data.commonGenres, commonGenres.find('span'));
		card.find('.card-group-body').append(commonGenres);
	}
		
	//加载共同好友
	if(data.commonTopics.length != 0){
		var commonTopics = $(
			'<div class="list">\n' +
			'	<span>' + data.commonTopics.length + ' 个共同兴趣话题</span>\n' +
			'</div>'
		);
		bindHoverTo(data.commonTopics, commonTopics.find('span'));
		card.find('.card-group-body').append(commonTopics);
	}

	//更具不同用户权限加载不同菜单
	if(authority == 1) {
		card.find('.dropdown-menu').append(
			'<li><a href="#">查看</a></li>\n' +
			'<li><a href="javascript:void(0);">社群管理</a></li>\n' +
			'<li><a href="javascript:void(0);">加入社群</a></li>\n' +
			'<li><a href="javascript:void(0);">退出社群</a></li>\n' +
			'<li class="divider"></li>\n' +
			'<li><a href="javascript:void(0);">关注社群</a></li>\n' +
			'<li><a href="javascript:void(0);">取消关注</a></li>'
		);
		
	}else if(authority == 0) {
		
	}else {
		
	}

	return card;
};

var bindHoverTo = function(data, target) {
	var content = '';
	$.each(data, function(i,d){
		content += '<a href="#"><span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + d + '</span></a>\n';
	});
	
	target.attr('data-container', 'body');
	target.attr('data-toggle', 'popover');
	target.attr('data-content', '<h4 style="line-height: 30px;">' + content + '</h4>');

	target.popover({html : true, trigger: 'hover'});
}

var loadUserCardTo = function(data, targetBlock, authority) {
	$.each(data,function(i, d){
		$(targetBlock).append(createUserCard(d, authority));
	});
};

var loadGroupCardTo = function(data, targetBlock, authority) {
	$.each(data,function(i, d){
		$(targetBlock).append(createGroupCard(d,authority));
	});
};

var loadUserListModal = function(whole, selected){
	$.each(whole, function(i, user){
		$('#modal-list .list-left').append(
		'<li data-id="' + user.id + '" >\n' +
		'	<a href="javascript:void(0);">\n' +
		'		<img src="' + user.image + '" />\n' +
		'		<span name="name">' + user.name + '</span>\n' +
		'		<span class="pull-right">\n' +
		'			<input type="checkbox" class="flat-red" />\n' +
		'		</span>\n' +
		'	</a>\n' +
		'</li>'
		);
	});
	$('input[type="checkbox"].flat-red').iCheck({
      checkboxClass: 'icheckbox_flat-green',
      radioClass: 'iradio_flat-green'
    });
	$(".list-left").slimScroll({
			height: '400px'
	});
	$(".list-left li").on('click', function(e){
		var target = $(this).find('input');
		var id = $(this).attr('data-id');
		
		if($(target)[0].checked == true) {
			$(target).iCheck('uncheck');
				
			$('.list-right li[data-id=' + id + ']').remove();
			
		}else {
			$(target).iCheck('check');
			var img = $(this).find('img').attr('src');
			var name = $(this).find('[name="name"]').text();
			var item = 	$('<li class="" data-id="' + id + '">\n' +
									'	<a href="javascript:void(0);" class="post_nav_tab" >\n' +
									'		<img src="' + img + '" class="" style="width: 40px; height: 40px;" />\n' +
									'		<span style="font-weight: 500; color: rgba(0,0,0,0.8); display: inline-block;">' + name + '</span>\n' +
									'		<span class="pull-right" style="margin-top: 10px;margin-right: 5px; color: rgba(0,0,0,0.23)">\n' +
									'			<i class="material-icons">highlight_off</i>\n' +
									'		</span>\n' +
									'	</a>\n' +
									'</li>');
			
			$('.list-right').append(item);
			item.on('click', function(e){
				listRightUncheck($(this));
			});
		}
	});
	
	
	
	$.each(selected, function(i, user){
		$('#modal-list .list-right').append(
		'<li data-id="' + user.id + '">\n' +
		'	<a href="javascript:void(0);">\n' +
		'		<img src="' + user.image +'" />\n' +
		'		<span name="name">' + user.name + '</span>\n' +
		'		<span class="pull-right">\n' +
		'			<i class="material-icons">highlight_off</i>\n' +
		'		</span>\n' +
		'	</a>\n' +
		'</li>'
		);
		
		$('#modal-list .list-left li[data-id="' + user.id + '"] input').iCheck('check');
	});
	
	$(".list-right li").on('click', function(e){
		listRightUncheck($(this));
	});
	
	var listRightUncheck = function(item) {
		var id = $(item).attr('data-id');
		$('.list-left li[data-id=' + id + ']').iCheck('uncheck');
		$(item).remove();
		//console.log(item);
	};
	
	$(".list-right").slimScroll({
			height: '400px'
	});
	
	$('#modal-list').modal('show');
};

var initCreateTag = function(title){
	//初始化 新建项目模态框
	$("#modal-createTag .modal-title").text('新建' + title);
	$("#modal-createTag input").attr('placeholder', '请输入新'+ title);	
	$("#modal-createTag input").val('');	
	
	$('#modal-createTag a[name="submit"]').unbind('click');
	//创建新标签方法
	$('#modal-createTag a[name="submit"]').on('click', function(){
		//example
		/*
			$.get(action_createtag, {text: text}, function(data){
				
				......
			});
		*/
		var text = $('#modal-createTag input').val();
		if(text != ""){
			createNewTag(text,'#modal-tag .top-block', '#modal-tag .bottom-block');
			$('#modal-createTag').modal('hide');
		}else{
		
		}
	});
	
	$('#modal-createTag').modal('show');
}

var initModalTag = function(title, icon, data1, data2, action_createtag, action_createtag){
	$('#modal-tag .modal-title').text(title + "管理");
	$('#modal-tag .top-block').empty();
	$('#modal-tag .modal-card').remove();
	//初始化 创建新标签
	var createTag = $(
		'<div class="col-lg-3">\n' +
		'	<div class="create-tag">\n' +
		'		<div class="tag-body">\n' +
		'			<a href="#" style="color: rgba(0,0,0,0.54);cursor: pointer;"><i class="material-icons" style="font-size: 48px;">add_circle_outline</i></a>\n' +
		'			<div style="color: rgba(0,0,0,0.54);cursor: pointer;">' + '新的' + title + '</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	$('#modal-tag .top-block').append(createTag);
	createTag.on('click', function(){
		action_createtag(title);
	});
	
	
	//加载标签
	loadModalTagTo(data1, '#modal-tag .top-block', data2, '#modal-tag .bottom-block', icon);
	
	$('#modal-tag a[name="submit"]').unbind('click');
	$('#modal-tag a[name="submit"]').on('click', function(){
		//example
			/*
				$.get(action_updatetag, {text: text}, function(data){
					
					......
				});
			*/
			$('#modal-tag').modal('hide');
	});
	
	$('#modal-tag .bottom-block').slimScroll({
		height: '460px'
	});
	
	$('#modal-tag .top-block').slimScroll({
	});
	
	$('#modal-tag').modal('show');
};


var loadModalTagTo = function(data1, target1, data2, target2, icon){
	$.each(data1, function(i, d){
		var item = $(
			'<div class="col-lg-3">\n' +
			'	<div class="modal-card" style="background-color: ' + googleColorRandomPicker() + ';" data-id="' + d.id + '">\n'+
			'		<div class="card-body">\n'+
			'			<a href="#"><i class="material-icons">' + icon + '</i></a>\n'+
			'			<div>' + d.name + '</div>\n'+
			'		</div>\n'+
			'		<div class="check"><i class="material-icons" style="font-size: 60px; color: rgba(255,255,255, 1)">highlight_off</i></div>\n' +
			'	</div>\n'+
			'</div>'
		);
		$(target1).append(item);
		loadModalTagBind(item, target1, target2)
	});
	
	$.each(data2, function(i, d){
		var item = $(
			'<div class="col-lg-3">\n' +
			'	<div class="modal-card" style="background-color: ' + googleColorRandomPicker() + ';"  data-id="' + d.id + '">\n'+
			'		<div class="card-body">\n'+
			'			<a href="#"><i class="material-icons">' + icon + '</i></a>\n'+
			'			<div>' + d.name + '</div>\n'+
			'		</div>\n'+
			'		<div class="check"><i class="material-icons" style="font-size: 60px; color: rgba(255,255,255, 1)">done</i></div>\n' +
			'	</div>\n'+
			'</div>'
		);
		$(target2).append(item);
		loadModalTagBind(item, target1, target2)
	});
};

var createNewTag = function(text, target1, target2) {
	var item = $(
		'<div class="modal-card" style="background-color: ' + googleColorRandomPicker() + ';">\n'+
		'	<div class="card-body">\n'+
		'		<a href="#"><i class="material-icons">face</i></a>\n'+
		'		<div>' + text + '</div>\n'+
		'	</div>\n'+
		'	<div class="check"><i class="material-icons" style="font-size: 60px; color: rgba(255,255,255, 1)">highlight_off</i></div>\n' +
		'</div>'
	);
	$(target1).append(item);
	loadModalTagBind(item, target1, target2);
};


var loadModalTagBind = function(item, target1, target2){
	item.on('click', function(){
		if(item.closest(target1).length != 0){
			console.log(1);
			$(target2).append(item);
			item.find('.check i').text('done');
		}else if(item.closest(target2).length != 0){
			console.log(2);
			$(target1).append(item);
			item.find('.check i').text('highlight_off');
		}
	});
};


var callAlert = function(text, icon){
	$('#modal-alert i').text(icon);
	$('#modal-alert p').text(text);
	$('#modal-alert').modal('show');
	setTimeout(function(){
		$('#modal-alert').modal('hide');
	}, 1500);
};

var callConfirm = function(text){
	$.confirm({
		title: '',
		content: text,
		buttons: {
			确定: function () {
				callAlert('操作完成', 'done');
			},
			取消: function () {
				//callAlert('提示框', 'clear');
			}
		}
	});
};


var initModalListBlock = function(title, data, authority){
	$('#modal-listBlock .modal-title').text(title);
	$('#modal-listBlock .list-block').empty();
	loadUserCardTo(data, '#modal-listBlock .list-block', authority);
	
	$('#modal-listBlock .list-block').slimScroll({
		height: '600px'
	});
	
	$('#modal-listBlock').modal('show');
};





var googleColorRandomPicker = function(){
	var color_list = ['rgb(55, 141, 59)', 'rgb(65, 65, 65)', 'rgb(29, 135, 228)', 'rgb(119, 143, 155)', 'rgb(91, 106, 191)', 'rgb(125, 86, 193)', 'rgb(248, 167, 36)', 
		'rgb(255, 111, 66)', 'rgb(235, 63, 121)', 'rgb(229, 57, 53)', 'rgb(140, 109, 98)'];
	var random = Math.floor(Math.random() * (color_list.length));
	//console.log(color_list[random]);
	return color_list[random];
};

var modal_index = 1500;
$('.modal').on('show.bs.modal', function(){
	$(this).css('z-index', modal_index++);
});



var loadModalPost = function(poster, poster_list, title, content, shares , genres, tags, attachs ){
	//加载当前用户信息
	loadPoster_ModalPost(poster	);
	//加载发布者列表
	$('#modal-post .modal-title > .dropdown .dropdown-menu').append(
		'<li class="divider"></li>\n' +
		'<li class="dropdown-header">群组</li>'
	);
	$.each(poster_list, function(i, p){
		var item = $(
			'<li>\n' +
			'	<a href="javascript:void(0);"><img src="' + p.img + '" class="img-circle img-bordered-sm" style="width: 25px; height: 25px;" /> <span style="margin-left: 10px;	font-size: 18px;">' + p.name + '</span></a>\n' +
			'</li>'
		);
		if(p.type == 1){
			$('#modal-post .modal-title > .dropdown .dropdown-menu .divider').before(item);
		}else if(p.type == 2){
			$('#modal-post .modal-title > .dropdown .dropdown-menu .dropdown-header').after(item);
		}else{
			
		}
		item.on('click', function(){
			loadPoster_ModalPost(p);
		});
	});
	
	//加载分享列表
	
	//加载标题
	$('#modal-post #moment-title').val(title);
	
	//记载动态内容
	$('#modal-post #editor').html(content);
	
	//加载兴趣类别
	$.each(genres, function(i, g){
		var item = $(
			'<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + '; cursor: pointer;">' + g.name + ' </span>'
		);
		$('#modal-post #moment-genre p').append(item);
		
		item.on('click', function(){
			//alert(g.name + '-' + g.id);
		});
	});
	
	//记载兴趣话题
	$.each(tags, function(i, t){
		var item = $(
			'<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + '; cursor: pointer;">' + t.name + ' </span>'
		);
		$('#modal-post #moment-tag p').append(item);
		
		item.on('click', function(){
			//alert(t.name + '-' + t.id);
		});
	});
	
	//加载附件内容
	$.each(attachs, function(i, a){
		var item = $(
			'<p>\n' +
			'	<span class="label" style="margin-right: 5px; background-color: rgb(119, 143, 155);cursor: pointer;"><i class="fa fa-file-o"></i> ' + a.name + '</span>\n' +
			'</p>'
		);
		$('#modal-post #moment-attach').append(item);
		
		item.on('click', function(){
			//alert(a.name + '-' + a.type);
		});
	});
	
	$('#modal-post').modal('show');		
}; 

var loadPoster_ModalPost = function(data){
	$('#modal-post .modal-title > .dropdown > a').attr('data-id', data.id);
	$('#modal-post .modal-title > .dropdown > a').attr('data-type', data.type);
	$('#modal-post .modal-title > .dropdown > a').attr('title', data.name);
	$('#modal-post .modal-title > .dropdown > a img').attr('src', data.img);
};

//loadModalPost();



var poster = {
	id: 1,
	name: '张震宇',
	img: 'dist/img/avatar04.png',
	type: 1
};

var poster_list = [{
	id: 1,
	name: '张震宇',
	img: 'dist/img/avatar04.png',
	type: 1
},{
	id: 1,
	name: '交托帮',
	img: 'dist/img/default6.png',
	type: 2
},{
	id: 1,
	name: 'AI',
	img: 'dist/img/default6.png',
	type: 2
}];
var shares = {};

var genres = [{
	id: 1,
	name: '资讯'
},{
	id: 2,
	name: '日记'
}];

var tags = [{
	id: 1,
	name: '交叉口设计'
},{
	id: 2,
	name: 'AI'
}];

var attachs = [{
	id: 1,
	name: '文件1',
	type: 'jpg'
},{
	id: 2,
	name: '文件2',
	type: 'doc'
}];

//loadModalPost(poster, poster_list, '这是我的标题', '<h1>afafdsaf</h1>', '', genres, tags, attachs);

var data_user = {
		authority: 1,
		name: '张震宇',
		image: 'dist/img/avatar04.png',
		bg: 'dist/img/default_group_bg.jpg',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		title: ['软件工程师', '教授'],
		genre: ['资讯', '日记', '视频'],
		topic: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	}
	
var data_userlist = [
	{
		id: 1,
		name: '张震宇',
		image: 'dist/img/avatar04.png',
		bg: 'dist/img/default_group_bg.jpg',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonFriends: ['江方怡', '王钊'],
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	},{
		id: 2,
		name: '张震宇',
		image: 'dist/img/avatar04.png',
		bg: 'dist/img/default_group_bg.jpg',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonFriends: ['江方怡', '王钊'],
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	},{
		id: 3,
		name: '张震宇',
		image: 'dist/img/avatar04.png',
		bg: 'dist/img/default_group_bg.jpg',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonFriends: ['江方怡', '王钊'],
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	},{
		id: 4,
		name: '张震宇',
		image: 'dist/img/avatar04.png',
		bg: 'dist/img/default_group_bg.jpg',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonFriends: ['江方怡', '王钊'],
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	},{
		id: 5,
		name: '张震宇',
		image: 'dist/img/avatar04.png',
		bg: 'dist/img/default_group_bg.jpg',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonFriends: ['江方怡', '王钊'],
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	},{
		id: 6,
		name: '张震宇',
		image: 'dist/img/avatar04.png',
		bg: 'dist/img/default_group_bg.jpg',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonFriends: ['江方怡', '王钊'],
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	},{
		id: 7,
		name: '张震宇',
		image: 'dist/img/avatar04.png',
		bg: 'dist/img/default_group_bg.jpg',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonFriends: ['江方怡', '王钊'],
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	},{
		id: 8,
		name: '张震宇',
		image: 'dist/img/avatar04.png',
		bg: 'dist/img/default_group_bg.jpg',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonFriends: ['江方怡', '王钊'],
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	},{
		id: 8,
		name: '张震宇',
		image: 'dist/img/avatar04.png',
		bg: 'dist/img/default_group_bg.jpg',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonFriends: ['江方怡', '王钊'],
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	},{
		id: 8,
		name: '张震宇',
		image: 'dist/img/avatar04.png',
		bg: 'dist/img/default_group_bg.jpg',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonFriends: ['江方怡', '王钊'],
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	}
]

var data_userlist_1 = [
	{
		id: 1,
		name: '张震宇',
		image: 'dist/img/avatar04.png',
		bg: 'dist/img/default_group_bg.jpg',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonFriends: ['江方怡', '王钊'],
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	}
];

var data_userlist_2 = [
	{
		id: 1,
		name: '刘明',
		image: 'dist/img/avatar04.png',
		bg: 'dist/img/default_group_bg.jpg',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonFriends: ['江方怡', '王钊'],
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	},{
		id: 1,
		name: '付强',
		image: 'dist/img/avatar04.png',
		bg: 'dist/img/default_group_bg.jpg',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonFriends: ['江方怡', '王钊'],
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	}
];

var data_grouplist = [
	{
		id: 1,
		name: '交托帮',
		image: 'dist/img/default6.png',
		bg: 'https://lh3.googleusercontent.com/Ujr4N4T3uZ3A9EO0hUsI7XKrnhNj_-yNja4-t8EQt6Q=w320-h180-p-rw',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	},
	{
		id: 1,
		name: '交托帮',
		image: 'dist/img/default6.png',
		bg: 'https://lh3.googleusercontent.com/Ujr4N4T3uZ3A9EO0hUsI7XKrnhNj_-yNja4-t8EQt6Q=w320-h180-p-rw',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	}
]

var data_collection = [
	{
		name: '全部',
		icon: 'dashboard',
		url: '#',
		count: 12
	}, {
		name: '动态',
		icon: 'chrome_reader_mode',
		url: '#',
		count: 1
	}, {
		name: '图片',
		icon: 'image',
		url: '#',
		count: 5
	}, {
		name: '文字',
		icon: 'text_format',
		url: '#',
		count: 4
	}, {
		name: '链接',
		icon: 'link',
		url: '#',
		count: 0
	}, {
		name: '语音',
		icon: 'settings_voice',
		url: '#',
		count: 1
	}, {
		name: '备注管理',
		icon: 'mode_edit',
		url: '/individual_collection_tags',
		count: 3
	}
];

var data_collection_tag = [
	{
		name: '交叉口设计',
		icon: 'mode_edit',
		url: '/individual_collection_tag_posts',
		count: 12
	}, {
		name: '道路规划',
		icon: 'mode_edit',
		url: '/individual_collection_tag_posts',
		count: 1
	}, {
		name: '计算机网络',
		icon: 'mode_edit',
		url: '/individual_collection_tag_posts',
		count: 5
	}, {
		name: '系统级设计',
		icon: 'mode_edit',
		url: '/individual_collection_tag_posts',
		count: 4
	}, {
		name: '软件工程',
		icon: 'mode_edit',
		url: '/individual_collection_tag_posts',
		count: 0
	}, {
		name: '城市规划',
		icon: 'mode_edit',
		url: '/individual_collection_tag_posts',
		count: 1
	}, {
		name: 'AI',
		icon: 'mode_edit',
		url: '/individual_collection_tag_posts',
		count: 3
	}, {
		name: '文学鉴赏',
		icon: 'mode_edit',
		url: '/individual_collection_tag_posts',
		count: 20
	}
];

var data_tag_0 = [
	{
		name: '交叉口设计',
		icon: 'mode_edit',
		url: '/individual_tag_home',
		count: 12
	}, {
		name: '道路规划',
		icon: 'mode_edit',
		url: '/individual_tag_home',
		count: 1
	}
];

var data_tag = [
	{
		name: '计算机网络',
		icon: 'mode_edit',
		url: '/individual_tag_home',
		count: 5
	}, {
		name: '系统级设计',
		icon: 'mode_edit',
		url: '/individual_tag_home',
		count: 4
	}, {
		name: '软件工程',
		icon: 'mode_edit',
		url: '/individual_tag_home',
		count: 0
	}, {
		name: '城市规划',
		icon: 'mode_edit',
		url: '/individual_tag_home',
		count: 1
	}, {
		name: 'AI',
		icon: 'mode_edit',
		url: '/individual_tag_home',
		count: 3
	}, {
		name: '文学鉴赏',
		icon: 'mode_edit',
		url: '/individual_tag_home',
		count: 20
	}
];

var data_title_1 = [
	{	id: 1,
		name: '软件工程师'
	}
];

var data_title_2 = [
	{	id: 2,
		name: '教授'
	},{	id: 3,
		name: 'TA'
	},{	id: 4,
		name: '自由作者'
	},{	id: 5,
		name: '编辑'
	},{	id: 6,
		name: '律师'
	},{	id: 7,
		name: '中学老师'
	},{	id: 8,
		name: '学生'
	},{	id: 9,
		name: '自由职业者'
	},{	id: 8,
		name: '学生'
	},{	id: 9,
		name: '自由职业者'
	},{	id: 8,
		name: '学生'
	},{	id: 9,
		name: '自由职业者'
	}
];

