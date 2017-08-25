$.fn.transCloud_alpha = function(inputs){
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
	var html = $(
		'<div class="modal fade" id="' + $(this).attr('id') + '">\n' +
		'	<div class="modal-dialog" style="width: 50vw;">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
		'				<h4 class="modal-title">' + inputs.title + '</h4>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div class="dir" style="display: inline-block; line-height: 34px;"></div>\n' +
		'				<div class="form-group pull-right" style="width: 250px;">\n' +
		'					<div class="input-group">\n' +
		'						<input type="text" class="form-control" placeholder="搜索..." data-action="search" />\n' +
		'						<div class="input-group-addon" style="cursor: pointer;">\n' +
		'							<i class="fa fa-search"></i>\n' +
		'						</div>\n' +
		'					</div>\n' +
		'				</div>\n' +
		'				<div class="clearfix"></div>\n' +
		'				<div class="file-block">\n' +
		'				</div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a href="javascript:void(0)" data-dismiss="modal">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>\n'
	);
		
	//文件列表
	var fileBlock = $(html).find('.file-block');
	
	//CSS
	$(fileBlock).slimScroll({
			height: '60vh'
	});
	$(html).find('.modal-dialog').css({width: '50vw'});
	
	//处理当前路径
	var dirList = inputs.dir.split("/");
	//console.log(dirList);
	$.each(dirList, function(i,d){
		var temp = $('<span class="dir-item">' + d + '<i class="material-icons">keyboard_arrow_down</i></span>');
		$(html).find('.dir').append(temp);
	});
	
	//加载bot row 数据
	$.each(inputs.data, function(i, d){
		var item = inputs.createCard(d);
		if(d.type == 1){
			$(fileBlock).append(item);
		}else if(d.type == 2){
			$(fileBlock).prepend(item);
		}else{
			
		}
	}); 
	
	//Btn function
	//关闭后删除模态框 - Reset
	$(html).on('hidden.bs.modal', function(){
		$(this).remove();
	});
	
	
	//菜单效果
	$(fileBlock).on('contextmenu', function(ev){
		ev.preventDefault();
		
		//移除之前菜单
		$(fileBlock).find('.custom-menu').remove();
		
		//获取被点击对象
		var target = $(ev.target).closest('.file-card');
		
		//获取列菜单位置
		var position = {
			top: ev.pageY - $(fileBlock).offset().top + 'px',
			left: ev.pageX - $(fileBlock).offset().left + 'px'
		}
		
		
		var dir, type;
		if(target.length == 0){
			dir = inputs.dir;
			type = 3;
		}else if(target.length == 1){
			dir = $(target).attr('data-dir');
			type = $(target).attr('data-type');
		}else{
			
		}
		
		console.log(dir, type);
		
		//加载菜单
		$.ajax({
			url : '/gerfilemenu',
			data: {dir: dir, type: type},
			cache : false, 
			async : false,
			type : "GET",
			dataType : 'json',
			success : function (result){
				//获取当前操作菜单
				var menuHTML = createCustomMenu(result);
				//添加菜单
				$(fileBlock).append(menuHTML);
				//显示菜单
				$(menuHTML).finish().show(100).css(position);
			}
		});
	});
	
	/* 左键点击效果：
	1. 取消菜单 */
	$(fileBlock).on("click", function (e) {
		$(fileBlock).find('.custom-menu').hide();
	});
	
	/* 搜索效果 */
	$(html).find('[data-action="search"]').on('change', function(){
		var query = $(this).val();
		$.each($(fileBlock).find('> div'), function(i,t){
			var name = $(t).find('[data-type="name"]').text();
			if(!name.match(query)){
				$(t).addClass('hide');
			}else
				$(t).removeClass('hide');
		});
		//console.log("12313".match('123134'));
	});
	
	//submit
	/* $(singleRowHTML).find('.btn-submit').on('click', function(){
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
	}); */
	
	$(html).modal('show');
};
/* end! */

/* 20170821 */
//1. 创建TransCloud模块，并加载数据 
var transCloud = function(inputs){
	/* 
	插件：
	1.slimScroll
	 */
	/* 
	inputs机构:
	{
		title: 模态框标题
		dirFull: 完整路径
		dirRoot: 当前绝对路径
		searchAction: 搜索方法
		data: [文件数据]
		loadAction:加载页面信息
		右键点击效果
	}
	 */
	
	var html = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog" style="width: 50vw;">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
		'				<h4 class="modal-title">' + inputs.title + '</h4>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div class="dir" style="display: inline-block; line-height: 34px;"></div>\n' +
		'				<div class="form-group pull-right" style="width: 250px;">\n' +
		'					<div class="input-group">\n' +
		'						<input type="text" class="form-control" placeholder="搜索..." data-action="search" />\n' +
		'						<div class="input-group-addon" style="cursor: pointer;">\n' +
		'							<i class="fa fa-search"></i>\n' +
		'						</div>\n' +
		'					</div>\n' +
		'				</div>\n' +
		'				<div class="clearfix"></div>\n' +
		'				<div class="file-block">\n' +
		'				</div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a href="javascript:void(0)" data-dismiss="modal">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>\n'
	);
		
	//文件列表
	var fileBlock = $(html).find('.file-block');
	
	//CSS
	$(html).find('.file-block').slimScroll({
		height: '60vh'
	});
	$(html).find('.modal-dialog').css({width: '50vw'});
	
	//加载文件列表
	transCloudReload(html, {dirFull: inputs.dirFull, dirRoot: inputs.dirRoot, dataRequest: inputs.dataRequest, createCard: createFileCardHTML});
	
	//Btn function
	//关闭后删除模态框 - Reset
	$(html).on('hidden.bs.modal', function(){
		$(this).remove();
	});
	
	
	//菜单效果
	$(fileBlock).on('contextmenu', function(ev){
		ev.preventDefault();
		
		//获取被点击对象
		var target = $(ev.target).closest('.file-card');
		var dir, type;
		
		if(target.length == 0){
			//点击对象为面板
			dir = inputs.dirFull;
			type = 3;
		}else if(target.length == 1){
			//点击对象为文件||文件夹
			dir = $(target).attr('data-dir');
			type = $(target).attr('data-type');
		}else{
			
		}
		
		//加载菜单
		$.ajax({
			url : '/gerfilemenu',
			data: {dir: dir, type: type},
			cache : false, 
			async : false,
			type : "GET",
			dataType : 'json',
			success : function (result){
				//获取当前操作菜单
				var menuHTML = customizeRightClickMenu(result);
				//添加菜单
				$('body').append(menuHTML);
				//显示菜单
				$(menuHTML).css({position: 'absolute', top: ev.pageY, left: ev.pageX, 'z-index': 2000});
			}
		});
	});
	
	/* 左键点击效果：
	1. 取消菜单 */
	$(fileBlock).on("click", function (e) {
		$('body').find('.custom-menu').hide();
	});
	
	/* 搜索效果 */
	$(html).find('[data-action="search"]').on('change', function(){
		var query = $(this).val();
		$.each($(fileBlock).find('> div'), function(i,t){
			var name = $(t).find('[data-type="name"]').text();
			if(!name.match(query)){
				$(t).addClass('hide');
			}else
				$(t).removeClass('hide');
		});
		//console.log("12313".match('123134'));
	});
	
	//submit
	/* $(singleRowHTML).find('.btn-submit').on('click', function(){
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
	}); */
	
	$(html).modal('show');
};
/* end! */


/* 2. 加载数据 */
/* 插件需要 jQuery UI  */
var transCloudReload = function(target, inputs){
	/* 
	inputs 结构：
	{
		dirFull:
		dirRoot:
		dataRequest: 获取文件列表数据URL
		createCard: function， 创建文件HTML样式
	}
	 */
	$.ajax({
		url : inputs.dataRequest,
		data: {dir: inputs.dirFull},
		cache : false, 
		async : false,
		type : "GET",
		dataType : 'json',
		success : function (result){
			/* 
			target: 数据加载对象
			result 结构：
			[{
				type: 1： 文件， 2： 文件夹
				name: 名称
				dir: 路径，此为文件的主键
				icon: 图标
				bgColor: 文件背景色
			}]
			 */
			 
			/* 0.清楚原有数据 */
			$(target).find('.dir').empty();
			$(target).find('.file-block').empty();
			 
			/* 1. 加载dir */
			//获取路径列表
			var listDir = getAvaliablePath(inputs.dirRoot, inputs.dirFull);
			//加载路径
			$.each(listDir, function(index, item){
				//路径html样式
				/* 
				To do list
				1. 加载点击效果
				 */
				var dirStyle = $('<span class="dir-item" data-dir="' + item[1] + '">' + item[0] + '<i class="material-icons">keyboard_arrow_down</i></span>');
				$(target).find('.dir').append(dirStyle);
				
				$(dirStyle).on('click', function(){
					transCloudReload(target, {dirFull: item[1], dirRoot: inputs.dirRoot, dataRequest: inputs.dataRequest, createCard: inputs.createCard});
				});
				
				
			});
			
			/* 2.加载文件 */
			$.each(result, function(index, data){
				//创建文件样式
				var createCard = inputs.createCard ? inputs.createCard: createFileCardHTML;
				var item = createCard(data);
				
				if(data.type == 1){
					$(target).find('.file-block').append(item);
				}else if(data.type == 2){
					$(target).find('.file-block').prepend(item);
				}else{
					
				}
				
				
				/* 添加拖拽效果 */
				$(item).draggable({
					zIndex: 2500,
					revert: true
				});
				
				if(data.type == 2)
					$(item).droppable({
						drop: function( event, ui ) {
							/* 
								ui.draggable : drag对象
								event.target : drop对象
							*/
							var dirDrag = $(ui.draggable).find('[data-dir]').attr('data-dir');
							var dirDrop = $(event.target).find('[data-dir]').attr('data-dir');
							/* 
								To do:
								1. 与后台链接 
							*/
							callConfirm('确认框', '您确定要移动该文件？', function(){
								$(ui.draggable).remove();
							});
						}
					});
				
				$(item).on('click',function(ev){
					if(data.type == 1){
						window.location.href = data.dir;
					}else if(data.type == 2){
						//console.log(data.dir);
						transCloudReload(target, {dirFull: data.dir, dirRoot: inputs.dirRoot, dataRequest: inputs.dataRequest, createCard: inputs.createCard});
					}
					
				});
					/* 
					To do list
					1. 加载点击效果
				 */
				
			});
			/* end of success */
		}
	});
	
};

/* 3. 创建文件夹 */
var createFolder = function(dir){
	/* dir: 当前文件夹的路径 */
	
	var html = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-body">\n' +
		'				<div class="main-content">\n' +
		'					<div class="modal-header">\n' +
		'						<button type="button" class="close" data-dismiss="modal">×</button>\n' +
		'						<h4 class="modal-title">新建文件夹</h4>\n' +
		'					</div>\n' +
		'					<div style="margin: 15px;">\n' +
		'						<div class="form-group">\n' +
		'							<input class="form-control input-lg" style="border-top: none;border-left: none;border-right: none;" placeholder="请输入群名称" />\n' +
		'							<div class="err-msg" data-target="name" style="color: rgba(255,0,0,0.8);font-size: 12px;font-weight: 400;margin-top:5px;padding-left: 15px;display: none;">\n' +
		'							</div>\n' +
		'						</div>\n' +
		'					</div>\n' +
		'				</div>\n' +
		'				<div class="modal-footer">\n' +
		'					<a data-dismiss="modal" style="font-weight: 600;color: rgba(0,0,0,0.54);">关闭</a>\n' +
		'					<a class="btn-submit" href="#" style="font-weight: 600;">确认</a>\n' +
		'				</div>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	//关闭时自动销毁模态框
	$(html).on('hidden.bs.modal', function(){
		$(this).remove();
	})
	
	$(html).find('.btn-submit').on('click', function(){
		var name = $(html).find('input').val();
		
		if(name == ''){
			$(html).find('.err-msg').text('文件名称不能为空');
		}else{
			$.ajax({
				url : '/createFolder',
				data: {dir: dir, name: name},
				cache : false, 
				async : false,
				type : "GET",
				dataType : 'json',
				success : function (result){
					if(result == 1){
						//console.log(result);
						
					}else if(result == 0){
						//error
					}else{
						//error
					}
				}
			}); 
		}
	});
	
	$(html).modal('show');
	
	
};
