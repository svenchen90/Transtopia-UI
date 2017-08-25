/* 
	1. 加载左侧群组信息栏 - loadGroupInfo
	2. 创建新的菜单（最多二级）- createMenu
	3. 加载顶端一级导航栏 - loadFirstNavTop
	4. 加载顶端二级导航栏 - loadSecondNavTop
	5. 创建右下角按钮组 - createRightBotBlock
	6. 新建群组 - createNewGroupModal
	7. TwinRow模态框 - twinRowModal 
	8. 创建modal-card - createModalCardHTML (JS)
	9. 创建function-card - createModalFunctionCardHTML1
	11. 创建修改群组信息模态框 - createEditGroupModal
	12. singleRow模态框 - singleRowModal
	13. 创建用户modal-card样式 - createUserCard
	14. 给用户卡片添加popup - bindHover
*/
(
	function($){
		/* 1. 加载左侧群组信息栏 */
		/* $.fn.loadGroupInfo = function(data){
			var html = $(
				'<div>\n' +
				'	<div class="menu-top">\n' +
				'		<!-- <a href="#" class="pull-right" style="color: rgba(255,255,255,1);"><i class="material-icons">share</i></a> -->\n' +
				'	</div>\n' +
				'	<div class="img-background">\n' +
				'		<img src="' + data.bg + '" />\n' +
				'	</div>\n' +
				'	<div class="main-content">\n' +
				'		<div class="img-block">\n' +
				'			<img class="img-circle" src="' + data.image + '" />\n' +
				'		</div>\n' +
				'		<div class="sign-block">\n' +
				'			<span>共' + data.numberofmembers + '位成员</span> - \n' +
				'			<span>' + data.description + '</span>\n' +
				'		</div>\n' +
				'		<div class="name">' + data.name + '</div>\n' +
				'		<div class="detail">\n' +
				'			<span><i class="fa fa-pencil"></i> 群组类别</span>\n' +
				'			<p></p>\n' +
				'		</div>\n' +
				'		<div class="detail">\n' +
				'			<span><i class="fa fa-tags"></i> 群组话题</span>\n' +
				'			<p></p>\n' +
				'		</div>	\n' +
				'		<div class="search-block">\n' +
				'			<i class="fa fa-search"> </i>\n' +
				'			<input type="text" placeholder="搜索..." />\n' +
				'		</div>\n' +
				'		<div class="detail btn-block">\n' +
				'		</div>	\n' +
				'	</div>	\n' +
				'</div>'
			);
			
			//console.log(data.dataMenu);
			//加载菜单
			$(html).find('.menu-top').createMenu(data.dataMenu);
			
			//添加群组类别
			if(data.genre.length == 0)
				$(html).find('.detail:eq(0) p').append('暂无');
			else{
				$.each(data.genre, function(i, g){
					$(html).find('.detail:eq(0) p').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
				});
			}
			//添加群组话题
			if(data.topic.length == 0)
				$(html).find('.detail:eq(1) p').append('暂无');
			else{
				$.each(data.topic, function(i, t){
					$(html).find('.detail:eq(1) p').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + t + '</span>');
				});
			}
			
			//添加右下按钮
			var btnList = [
				{
					icon: 'check_box',
					name: '关注群组',
					action: '/test123'
				},{
					icon: 'indeterminate_check_box',
					name: '取消关注',
					action: '/test123'
				},{
					icon: 'group_add',
					name: '申请加入',
					action: '/test123'
				}
			];
			
			$.each(btnList, function(index, item){
				if(data.followed == 1 && index == 0)
					return true;
				if(data.followed == 0 && index == 1)
					return true;
				if(data.isMember == 1 && index == 2)
					return true;
				
				var btnHTML = $(
					'<a href="javascript:void(0);" class="pull-right" title="' + item.name + '">\n' +
					'	<i class="material-icons" style="font-size: 40px; color: #00a65a; padding-left: 15px;">' + item.icon + '</i>\n' +
					'</a>'
				);
				
				$(btnHTML).on('click', function(){
					$.ajax({
						url : item.action,
						data: {gid: data.id},
						cache : false, 
						async : false,
						type : "GET",
						dataType : 'json',
						success : function (result){
							if(result == 1){
								callAlert('操作成功','done', 0);
							}else{
								//error
								callAlert('错误','highlight_off');
							}
						}
					});
				});
				
				$(html).find('.btn-block').append(btnHTML);
			});
			
			$(this).append(html);
		}; */
		
		
		
		
		
		/* 3. 加载顶端一级导航栏 */
		/* $.fn.loadFirstNavTop = function(data){
			$(this).find('#navbar-collapse .current-page').text(data.title);
			$(this).find('.navbar-custom-menu .user-menu > a > span').text(data.name);
			$(this).find('.navbar-custom-menu .user-menu > a > img').attr('src', data.image);
		}; */
		
		/* 4. 加载顶端二级导航栏 */
/* 		$.fn.loadSecondNavTop = function(data){
			var target = $(this);
			
			$.each(data, function(index, item){
				if(item.sublist == undefined){
					var temp = $('<li><a href="/' + item.href + '">' + item.name + '</a></li>');
					$(target).find('ul:first').append(temp);
				}else{
					//仅支持单级菜单
					var temp = $(
					'<li class="dropdown">\n' + 
					'	<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
					'		' + item.name +' \n' +
					'		<b class="caret"></b>\n' +
					'	</a>\n' +
					'	<ul class="dropdown-menu">\n' +
					'	</ul>\n' +
					'</li>'
					);
					//加载菜单选项
					$.each(item.sublist, function(i, sub){
						var temp2 = $('<li><a href="/' + sub.href + '">' + sub.name + '</a></li>');
						$(temp).find('.dropdown-menu:eq(0)').append(temp2);
					});

					$(target).find('ul:first').append(temp);
				}
			});
		}; */
		
		/* 5. 创建右下角按钮组 */
/* 		$.fn.createRightBotBlock = function(data){
			var blockHTML = $('<div class="block-rightbot"></div>');
			var btnHTML = $('<a class="btn btn-success btn-lg switch-rightbot btn-rightbot"><i class="fa fa-plus"></i></a>');
			$.each(data, function(index, item){
				//console.log(item);
				var temp = $(
					'<div>\n' +
					'	<span>' + item.title + '</span>\n' +
					'	<a href="javascript:void(0);" onClick="' + item.action + '" class="btn btn-success btn-lg btn-rightbot"><i class="fa ' + item.icon + '"></i></a>\n' +
					'</div>'
				);
				$(blockHTML).append(temp);
			});
			
			$(btnHTML).on('click', function(){
				$(this).find('i').toggleClass('fa-plus').toggleClass('fa-minus');
				$(blockHTML).toggle(200);
			});
			
			$(this).append(blockHTML);
			$(this).append(btnHTML);
		}; */
		
		/* 6. 新建群组 */
		$.fn.createNewGroupModal = function(data){
			var html = $(
				'<div class="modal fade" id="' + $(this).attr('id') + '">\n' +
				'	<div class="modal-dialog">\n' +
				'		<div class="modal-content">\n' +
				'			<div class="modal-body">\n' +
				'				<div class="main-content">\n' +
				'					<div class="modal-header">\n' +
				'						<button type="button" class="close" data-dismiss="modal">×</button>\n' +
				'						<h4 class="modal-title">新建群组</h4>\n' +
				'					</div>\n' +
				'					<div style="margin: 15px;">\n' +
				'						<div class="form-group">\n' +
				'							<input class="form-control input-lg" style="border-top: none;border-left: none;border-right: none;" placeholder="请输入群名称" />\n' +
				'							<div class="err-msg" data-target="name" style="color: rgba(255,0,0,0.8);font-size: 12px;font-weight: 400;margin-top:5px;padding-left: 15px;display: none;">\n' +
				'							</div>\n' +
				'						</div>\n' +
				'						<div class="row">\n' +
				'							<div class="col-xs-10 menu-label" style="padding-left: 30px;">成员申请验证</div>\n' +
				'							<div class="col-xs-2">\n' +
				'								<label class="switch">\n' +
				'									<input type="checkbox" checked>\n' +
				'									<div class="slider round"></div>\n' +
				'								</label>\n' +
				'							</div>\n' +
				'						</div>\n' +
				'						<div style="color: rgba(0,0,0,0.54);font-size: 12px;font-weight: 400;padding-left: 15px;">新成员加入时需要验证</div>\n' +
				'					</div>\n' +
				'				</div>\n' +
				'				<div class="modal-footer">\n' +
				'					<a style="font-weight: 600;color: rgba(0,0,0,0.54); float: left; margin-left: 15px;">更多选项</a>\n' +
				'					<a data-dismiss="modal" style="font-weight: 600;color: rgba(0,0,0,0.54);">关闭</a>\n' +
				'					<a class="btn-submit" href="#" style="font-weight: 600;">确认</a>\n' +
				'				</div>\n' +
				'			</div>\n' +
				'		</div>\n' +
				'	</div>\n' +
				'</div>'
			);
				
			
				
			$(html).find('.btn-submit').on('click', function(){
				//获取数据
				var data = {
					name: $(html).find('input:eq(0)').val(),
					askToJoin: $(html).find('input[type=\'checkbox\']').is(':checked')
				};
				var limit = 1;
				
				//validation
				if(data.name == ""){
					$(html).find('.err-msg[data-target="name"]').text('群组名不能为空');
					$(html).find('.err-msg[data-target="name"]').show();
				}else if(data.name.length > 20){
					$(html).find('.err-msg[data-target="name"]').text('群组名不得超过20个字');
					$(html).find('.err-msg[data-target="name"]').show();
				}else{
					$(html).find('.err-msg[data-target="name"]').hide();				
					$.ajax({
						url : '/createGroup',
						data: data,
						cache : false, 
						async : false,
						type : "GET",
						dataType : 'json',
						success : function (result){
							console.log(result.id);
							if(result.id){
								callAlert('群组创建成功', 'done', '/group_index/' + result.id);
							}else{
								//error
								callAlert('错误', 'error_outline');
							}
						}
					});
				}
			});
			
			//关闭后自动清除
			$(html).on('hidden.bs.modal', function(){
				$(this).remove();
			});
			
			$(html).modal('show');
		};
		
		/* 7. TwinRow模态框 */
		$.fn.twinRowModal = function(inputs){
			/*
				input schema 
				{
					title:
					dataTop:
					dataBot:
					test:
					actionSubmit:
					
				}
			*/
			var twinRowHTML = $(
				'<div class="modal fade">\n' +
				'	<div class="modal-dialog">\n' +
				'		<div class="modal-content">\n' +
				'			<div class="modal-header">\n' +
				'				<button type="button" class="close btn-close" data-dismiss="modal">&times;</button>\n' +
				'				<h4 class="modal-title">' + inputs.title + '</h4>\n' +
				'			</div>\n' +
				'			<div class="modal-body">\n' +
				'				<div style="display: inline-block; line-height: 34px;"></div>\n' +
				'				<div class="form-group pull-right" style="width: 250px;">\n' +
				'					<div class="input-group">\n' +
				'						<input type="text" class="form-control" placeholder="搜索..." data-action="search"/>\n' +
				'						<div class="input-group-addon" style="cursor: pointer;">\n' +
				'							<i class="fa fa-search"></i>\n' +
				'						</div>\n' +
				'					</div>\n' +
				'				</div>\n' +
				'				<div class="clearfix"></div>\n' +
				'				<div class="row-top">\n' +
				'					<!-- 上排数据 -->\n' +
				'				</div>\n' +
				'				<div class=="divider" style="margin-top:10px; margin-bottom:10px; border-bottom: 1px solid #ddd;"></div>\n' +
				'				<div class="row-bot">\n' +
				'					<!-- 下排数据 -->\n' +
				'				</div>\n' +
				'				<div class="clearfix"></div>\n' +
				'			</div>\n' +
				'			<div class="modal-footer">\n' +
				'				<a href="javascript: void(0);" class="btn-submit">确定</a>\n' +
				'				<a href="javascript: void(0);" data-dismiss="modal">关闭</a>\n' +
				'			</div>\n' +
				'		</div>\n' +
				'	</div>\n' + 
				'</div>\n');
				
				//console.log($(this).attr('id'));
			
			//component
			var rowTop = $(twinRowHTML).find('.row-top');
			var rowBot = $(twinRowHTML).find('.row-bot');
			
			// CSS
			$(rowTop).slimScroll({
					height: '20vh'
			});
			
			$(rowBot).slimScroll({
					height: '40vh'
			});
			
			$(twinRowHTML).find('.modal-dialog').css({width: '50vw'});
			
			
			//加载function card
			inputs.funcCardInput2['rowTop'] = rowTop;
			inputs.funcCardInput2['rowBot'] = rowBot;
			$(rowTop).append(inputs.funcCard2(inputs.funcCardInput2));
			
			//加载top row 数据
			$.each(inputs.dataTop, function(i, d){
				//console.log(i);
				//console.log(d);
				d['rowTop'] = rowTop;
				d['rowBot'] = rowBot;
				var item = inputs.funcCard1(d);
				$(rowTop).append(item);
			});
			
			
			
			//加载bot row 数据
			$.each(inputs.dataBot, function(i, d){
				//console.log(i);
				//console.log(d);
				d['rowTop'] = rowTop;
				d['rowBot'] = rowBot;
				d['iconHover1'] = 'highlight_off';
				var item = inputs.funcCard1(d);
				$(rowBot).append(item);
			});
			
			//Btn function
			//关闭后删除模态框 - Reset
			$(twinRowHTML).on('hidden.bs.modal', function(){
				$(this).remove();
			});
			
			//submit
			$(twinRowHTML).find('.btn-submit').on('click', function(){
				var list =  [];
				$(rowBot).find('[data-type="name"]').each(function(i){
					list.push($(this).text());
				});
				
				$.ajax({
					url : inputs.actionSubmit,
					data: {list: list},
					cache : false, 
					async : false,
					type : "GET",
					dataType : 'json',
					success : function (result){
						if(result == 1){
							$(twinRowHTML).modal('hide');
							callAlert('修改成功','done', 0);
						}else{
							//error
							callAlert('错误','highlight_off');
						}
					}
				});

			});
			
			//搜索
			$(twinRowHTML).find('[data-action="search"]').on('change', function(){
				var query = $(this).val();
					$.each($(rowTop).find('> div'), function(i,t){
						var name = $(t).find('[data-type="name"]').text();
						if(!name.match(query)){
							$(t).addClass('hide');
						}else
							$(t).removeClass('hide');
					});
				//console.log("12313".match('123134'));
			});
			
			$(twinRowHTML).modal('show');
		};
		
		/* 11. 创建修改群组信息模态框 */
		
		
		/* 12. singleRow模态框 */
		$.fn.singleRowModal = function(inputs){
			/*
				input schema 
				{
					title:
					dataTop:
					dataBot:
					test:
					actionSubmit:
					
				}
			*/
			var singleRowHTML = $(
				'<div class="modal fade" id="' + $(this).attr('id') + '">\n' +
				'	<div class="modal-dialog" style="width: 50vw;">\n' +
				'		<div class="modal-content">\n' +
				'			<div class="modal-header">\n' +
				'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
				'				<h4 class="modal-title">' + inputs.title + '</h4>\n' +
				'			</div>\n' +
				'			<div class="modal-body">\n' +
				'				<div style="display: inline-block; line-height: 34px;"></div>\n' +
				'				<div class="form-group pull-right" style="width: 250px;">\n' +
				'					<div class="input-group">\n' +
				'						<input type="text" class="form-control" placeholder="搜索..." />\n' +
				'						<div class="input-group-addon" style="cursor: pointer;">\n' +
				'							<i class="fa fa-search"></i>\n' +
				'						</div>\n' +
				'					</div>\n' +
				'				</div>\n' +
				'				<div class="clearfix"></div>\n' +
				'				<div class="row-single">\n' +
				'				</div>\n' +
				'			</div>\n' +
				'			<div class="modal-footer">\n' +
				'				<a href="javascript:void(0)" data-dismiss="modal">关闭</a>\n' +
				'			</div>\n' +
				'		</div>\n' +
				'	</div>\n' +
				'</div>\n'
			);
				
				//console.log($(this).attr('id'));
			
			//component
			var rowSingle = $(singleRowHTML).find('.row-single');
			var replaced = $(this);
			// CSS
			$(rowSingle).slimScroll({
					height: '60vh'
			});
			
			$(singleRowHTML).find('.modal-dialog').css({width: '50vw'});
			
			
			//加载function card
			//inputs.funcCardInput['rowTop'] = rowTop;
			//inputs.funcCardInput['rowBot'] = rowBot;
			//$(rowTop).append(inputs.funcCard(inputs.funcCardInput));
			
			//加载bot row 数据
			$.each(inputs.data, function(i, d){
				d['rowTop'] = rowSingle;
				var item = inputs.funcCard1(d, inputs.actionMenu);
				$(rowSingle).append(item);
			});
			
			//Btn function
			//关闭后删除模态框 - Reset
			$(singleRowHTML).on('hidden.bs.modal', function(){
				$(this).remove();
			});
			
			//submit
			$(singleRowHTML).find('.btn-submit').on('click', function(){
				var list =  [];
				$(rowBot).find('[data-type="name"]').each(function(i){
					list.push($(this).text());
				});
				
				$.ajax({
					url : inputs.actionSubmit,
					data: {list: list},
					cache : false, 
					async : false,
					type : "GET",
					dataType : 'json',
					success : function (result){
						if(result == 1){
							$(twinRowHTML).modal('hide');
							callAlert('修改成功','done');
						}else{
							//error
							callAlert('错误','highlight_off');
						}
					}
				});
			});
			
			$(singleRowHTML).modal('show');
		};
			
	}
)(jQuery);

/* 8. 创建modal-card */
var createModalCardHTML = function(data){
	/* 
		data: {
			id: ,
			name: ,
			size: ,
			iconDefault: ,
			iconHover1: ,
			iconHover2: ,
			msg: ,
			bgcolor: ,
			rowTop: 
		}

		to do list:
		1. what if id and name is null
	*/
	//样式

	var html = $(
		'<div class="col-lg-2 col-md-3 col-sm-4">\n' +
		'	<div class="modal-card" style="background-color: ' + (data.bgcolor ? data.bgcolor : googleColorRandomPicker()) + ';" data-id="' + data.id + '">\n'+
		'		<div class="card-body">\n'+
		'			<div class="content-default">\n'+
		'				<i class="material-icons">' + (data.iconDefault ? data.iconDefault : 'face') + '</i>\n'+
		'				<div data-type="name">' + data.name + '</div>\n'+		
		'			</div>\n'+
		'			<div class="content-hover">\n'+
		'				<i class="material-icons">' + (data.iconHover1 ? data.iconHover1 : 'add_circle_outline') + '</i>\n'+
		'				<div>' + (data.msg ? data.msg : '') + '</div>\n'+
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);

	//Switch between top row and bot row
	$(html).on('click', function(){
		var signal = $(html).closest(data.rowTop).length;
		
		if(signal == 0){
			$(html).find('.content-hover i').text(data.iconHover1 ? data.iconHover1 : 'add_circle_outline');
			$(data.rowTop).append(html);
		}else if(signal == 1){
			$(html).find('.content-hover i').text(data.iconHover1 ? data.iconHover1 : 'highlight_off');
			$(data.rowBot).append(html);
		}else{
			//Error
		}
	});

	return html
};

/* 9. 创建function-card  */
var createModalFunctionCardHTML1 = function(data){
	/*
		data: {
			cardTitle: ,
			cardIcon: ,
			title: ,
			action: ,
			
		}
	*/
	var html = $(
		'<div class="col-lg-2 col-md-3 col-sm-4">\n' +
		'	<div class="modal-card" style="background-color: rgba(255,255,255,1);">\n'+
		'		<div class="card-body" style="color: rgba(0,0,0,0.5)">\n'+
		'			<div>\n'+
		'				<i class="material-icons">' + 'add_circle_outline' + '</i>\n'+
		'				<div>' + data.cardTitle + '</div>\n'+		
		'			</div>\n'+
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);

	$(html).on('click', function(){
		var html2 = $(
		'<div class="modal fade" id="modal-function1">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close btn-close" data-dismiss="modal">&times;</button>\n' +
		'				<h4 class="modal-title">' + data.title + '</h4>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div class="form-group">\n' +
		'					<input type="text" class="form-control" placeholder="请输入新增头衔名称" />\n' +
		'				</div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a href="javascript: void(0);" class="btn-submit">确定</a>\n' +
		'				<a href="javascript: void(0);" data-dismiss="modal">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' + 
		'</div>\n');
		
		$(html2).find('.btn-submit').on('click', function(){
			$.ajax({
				url : data.action,
				data:{name: $(html2).find('input').val()},
				cache : false, 
				async : false,
				type : "GET",
				dataType : 'json',
				success : function (result){
					if(result == 1){
						$(data.rowTop).append(createModalCardHTML({
							name: $(html2).find('input').val(),
							rowTop: data.rowTop,
							rowBot: data.rowBot
						}));
						$(html2).modal('hide');
					}else{
						//error
					}
				}
			});
		});
		
		$(html2).modal('show');

		//reset
		$(html2).on('hidden.bs.modal', function(){
			$(this).remove();
		});
	});

	return html
};

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

//给用胡卡片添加popup
var bindHoverTo = function(data, target) {
	var content = '';
	$.each(data, function(i,d){
		content += '<a href="#"><span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + d + '</span></a>\n';
	});
	
	target.attr('data-container', 'body');
	target.attr('data-toggle', 'popover');
	target.attr('data-content', '<h4 style="line-height: 30px;">' + content + '</h4>');

	target.popover({html : true, trigger: 'hover'});
};