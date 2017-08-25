/* 
jQuery
1. 加载左侧信息栏 - loadGroupInfo;
 */

(
	function($){
		/* 1. 加载左侧信息栏 */
		$.fn.loadGroupInfo = function(data){
			var html = $(
				'<div>\n' +
				'	<div class="menu-top">\n' +
				'		<!-- <a href="#" class="pull-right" style="color: rgba(255,255,255,1);"><i class="material-icons">share</i></a> -->\n' +
				'		<span class="menu pull-right"></span>\n' +
				'	</div>\n' +
				'	<div class="img-background">\n' +
				'		<img src="' + data.bg_image + '" />\n' +
				'	</div>\n' +
				'	<div class="main-content">\n' +
				'		<div class="img-block">\n' +
				'			<img class="img-circle" src="' + data.image + '" />\n' +
				'		</div>\n' +
				'		<div class="sign-block">\n' +
				'			<span>共' + data.innerGroupNumber + '位成员</span> - \n' +
				'			<span>' + data.introduction + '</span>\n' +
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
			
			
			//加载菜单
			$(html).find('.menu-top .menu').createMenu(data.dataMenu);
			
			//添加群组类别
			if(data.category.length == 0)
				$(html).find('.detail:eq(0) p').append('暂无');
			else{
				$.each(data.category, function(i, g){
					$(html).find('.detail:eq(0) p').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
				});
			}
			//添加群组话题
			if(data.tags.length == 0)
				$(html).find('.detail:eq(1) p').append('暂无');
			else{
				$.each(data.tags, function(i, t){
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
		};
	}
)(jQuery);

var createNewGroupModal = function(){
	var html = $(
		'<div class="modal fade">\n' +
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

