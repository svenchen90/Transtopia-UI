/* Initial, load, destroy, search */


/* 
1. 文件管理
2. 创建file-card
3. 创建自定义菜单 - createCustomMenu
 */
/* 4. 获取可选目录 getAvaliablePath */
var getAvaliablePath = function(rootPath, fullPath){
	/* 
	To do list: 
	1.验证路径格式是否正确
	 */
	var listPath = fullPath.substring(rootPath.length).split('/');
	var result = [];
	var tempPath = rootPath;
	$.each(listPath, function(index, item){
		if(item == ""){
			/* 文件夹名字为空 */
		}else{
			tempPath += '/' + item;
			result.push([item, tempPath]);
		}
	});
	
	return result;
};

/* 2. 创建file-card */
var createFileCardHTML = function(data){
	/* 
		data: {
			dir:
			type:
			icon:
			name: 
		}
		to do list:
		1. what if id and name is null
	*/
	var html = $(
		'<div class="col-lg-2 col-md-3 col-sm-4">\n' +
		'	<div class="file-card" style="background-color: ' + (data.bgcolor ? data.bgcolor : googleColorRandomPicker()) + ';" data-dir="' + data.dir + '" data-type="' + data.type + '">\n'+
		'		<div class="card-body">\n'+
		'			<div class="content-default">\n'+
		'				<i class="material-icons">' + (data.icon ? data.icon : 'insert_drive_file') + '</i>\n'+
		'				<div data-type="name" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" title="' + data.name + '">' + data.name + '</div>\n'+		
		'			</div>\n'+
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	return html
};

var createFileCardHTML2 = function(data){
	/* 
		data: {
			dir:
			type:
			icon:
			name: 
		}
		to do list:
		1. what if id and name is null
	*/
	var html = $(
		'<div class="col-lg-3 col-md-4 col-sm-6">\n' +
		'	<div class="file-card" style="background-color: ' + (data.bgcolor ? data.bgcolor : googleColorRandomPicker()) + ';" data-dir="' + data.dir + '" data-type="' + data.type + '">\n'+
		'		<div class="card-body">\n'+
		'			<div class="content-default">\n'+
		'				<i class="material-icons">' + (data.icon ? data.icon : 'insert_drive_file') + '</i>\n'+
		'				<div data-type="name">' + data.name + '</div>\n'+		
		'			</div>\n'+
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	return html
};


var transCloudModal = $(
	'<div class="modal fade">\n' +
	'	<div class="modal-dialog" style="width: 50vw;">\n' +
	'		<div class="modal-content">\n' +
	'			<div class="modal-header">\n' +
	'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
	'				<h4 class="modal-title"></h4>\n' +
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
	'</div>'
);

var dirCopy = "";
var authority = 1;
(
	function($){
		$.fn.transCloud = function(inputs){
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
			
			var html = $(this);
				
			//文件列表
			var fileBlock = $(html).find('.file-block');
			
			//CSS
			$(html).find('.file-block').slimScroll({
				height: '60vh'
			});
			$(html).find('.modal-dialog').css({width: '50vw'});
			$(html).find('.modal-title').text(inputs.title);
			
			//加载文件列表
			$(html).reloadTransCloud({dirFull: inputs.dirFull, dirRoot: inputs.dirRoot, dataRequest: inputs.dataRequest, createCard: createFileCardHTML});
			
			//Btn function
			//关闭后删除模态框 - Reset
			$(html).on('hidden.bs.modal', function(){
				$('body').find('.custom-menu').hide();
				$(this).remove();
			});
			
			
			/* 左键点击效果：
			1. 取消菜单 */
			$(html).find('.modal-body').on("click", function (e) {
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
		
		$.fn.reloadTransCloud = function(inputs){
			/* 
			inputs 结构：
			{
				dirFull:
				dirRoot:
				dataRequest: 获取文件列表数据URL
				createCard: function， 创建文件HTML样式
			}
			 */
			var target = $(this);
			$.ajax({
				url : inputs.dataRequest,
				data: {dir: inputs.dirFull},
				cache : false, 
				async : false,
				type : "GET",
				dataType : 'json',
				success : function (result){
					/* 
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
						var dirStyle = $('<span class="dir-item" data-dir="' + item[1] + '">' + item[0] + '<i class="material-icons">keyboard_arrow_down</i></span>');
						$(target).find('.dir').append(dirStyle);
						
						$(dirStyle).on('click', function(){
							$(target).reloadTransCloud({dirFull: item[1], dirRoot: inputs.dirRoot, dataRequest: inputs.dataRequest, createCard: inputs.createCard});
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
			
									//$(ui.draggable).remove();
									console.log(dirDrag);
									console.log(dirDrop);
									//console.log($(ui.draggable).find('[data-type="name"]').text());
									callConfirm('移动文件', '您确定要移动该文件？', function(){
										$.ajax({
											url : '/movefile',
											data: {dirItem: dirDrag, dirTarget: dirDrop},
											cache : false, 
											async : false,
											type : "GET",
											dataType : 'json',
											success : function (result){
												$(target).reloadTransCloud(inputs);
												callAlert('文件移动成功！','done');
											}
										});
									});
								}
							});
						
						$(item).on('click',function(ev){
							if(data.type == 1){
								window.open(data.dir);
								//window.location.href = data.dir;
							}else if(data.type == 2){
								//console.log(data.dir);
								$(target).reloadTransCloud({dirFull: data.dir, dirRoot: inputs.dirRoot, dataRequest: inputs.dataRequest, createCard: inputs.createCard});
							}
							
						});
					});
					
					//菜单效果
					$(target).find('.file-block').unbind('contextmenu');
					$(target).find('.file-block').on('contextmenu', function(ev){
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
							data: {dir: dir, dirFolder: inputs.dirFull, type: type, dirCopy: dirCopy, authority: authority},
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
					/* end of success */
				}
			});
		};
		
		$.fn.resetTransCloud = function(){
			transCloudModal = $(
				'<div class="modal fade">\n' +
				'	<div class="modal-dialog" style="width: 50vw;">\n' +
				'		<div class="modal-content">\n' +
				'			<div class="modal-header">\n' +
				'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
				'				<h4 class="modal-title"></h4>\n' +
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
				'</div>'
			);
		};
		
		$.fn.createTransFolder = function(inputs){
			/* 
				inputs 结构:
				{
					dirFull: 
					dirRoot: 
					dataRequest: 
					createCard: 
				}
			 */
			var target = $(this);
			
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
						data: {dir: inputs.dirFull, name: name},
						cache : false, 
						async : false,
						type : "GET",
						dataType : 'json',
						success : function (result){
							//console.log(result);
							if(result == 1){
								//console.log(result);
								$(target).reloadTransCloud(inputs);
								$(html).modal('hide');
								callAlert('创建成功！','done');
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
		
		$.fn.uploadFile = function(inputs){
			var target = this;
			
			var html = $(
				'<div class="modal fade">\n' +
				'	<div class="modal-dialog">\n' +
				'		<div class="modal-content">\n' +
				'			<div class="modal-body">\n' +
				'				<div class="main-content">\n' +
				'					<div class="modal-header">\n' +
				'						<button type="button" class="close" data-dismiss="modal">×</button>\n' +
				'						<h4 class="modal-title">上传文件</h4>\n' +
				'					</div>\n' +
				'					<div style="margin: 15px;">\n' +
				'					<input name="filesupload" type="file" multiple class="file-loading" accept="image">\n' +
				'					</div>\n' +
				'				</div>\n' +
				'			</div>\n' +
				'		</div>\n' +
				'	</div>\n' +
				'</div>'
			);
			
			$(html).find('input').fileinput({
				language: "zh",
				theme: "explorer",
				uploadUrl: "/uploadfile",
				//allowedFileExtensions: ['jpg', 'png', 'gif'],
				overwriteInitial: false,
				uploadExtraData: {
					dir: inputs.dirFull
				}
			});
			
			$(html).find('input').on('fileuploaded', function(event, data, previewId, index) {
					/* var form = data.form, files = data.files, extra = data.extra,
							response = data.response, reader = data.reader;
					console.log('File uploaded triggered'); */
					$(target).reloadTransCloud(inputs);
					$(html).modal('hide');
					callAlert('添加成功！','done');
			});
			
			$(html).on('hidden.bs.modal', function(){
				$(this).remove();
			});
			
			$(html).modal('show');
		};
		
		$.fn.deleteFile = function(inputs){
			var target = this;
			callConfirm('删除文件', '您确定要删除该文件？', function(){
				$.ajax({
					url : '/deletefile',
					data: {dir: inputs.dirTarget},
					cache : false, 
					async : false,
					type : "GET",
					dataType : 'json',
					success : function (result){
						//console.log(result);
						if(result == 1){
							//console.log(result);
							//$(html).modal('hide');
							$(target).reloadTransCloud(inputs);
							
							callAlert('删除成功！','done');
						}else if(result == 0){
							//error
						}else{
							//error
						}
					}
				});
			});
		};
		
		
		$.fn.deleteFolder = function(inputs){
			var target = this;
			callConfirm('删除文件夹', '您确定要删除该文件夹？', function(){
				$.ajax({
					url : '/deletefolder',
					data: {dir: inputs.dirTarget},
					cache : false, 
					async : false,
					type : "GET",
					dataType : 'json',
					success : function (result){
						//console.log(result);
						if(result == 1){
							//console.log(result);
							//$(html).modal('hide');
							$(target).reloadTransCloud(inputs);
							
							callAlert('删除成功！','done');
						}else if(result == 0){
							//error
						}else{
							//error
						}
					}
				});
			});
		};
		
		$.fn.copyFile = function(inputs){
			dirCopy = inputs.dir;
			//console.log(dirCopy);
		};
		
		$.fn.pasteFile = function(inputs){
			var target = this;
			$.ajax({
				url : '/copyfile',
				data: {dirItem: dirCopy, dirTarget: inputs.dirTarget},
				cache : false, 
				async : false,
				type : "GET",
				dataType : 'json',
				success : function (result){
					//console.log(result);
					if(result == 1){
						dirCopy = '';
						$(target).reloadTransCloud({dirFull: inputs.dirTarget, dirRoot: inputs.dirRoot, dataRequest: inputs.dataRequest, createCard: inputs.createCard});
						callAlert('复制成功！','done');
					}else if(result == 0){
						//error
					}else{
						//error
					}
				}
			});
		};
		
	}
)(jQuery)




/* 4. 自定义右键菜单 */
var customizeRightClickMenu = function(data){
	//清楚之前的菜单
	$('body').find('.custom-menu').remove();
	if(data.length == 0){
				
	}else{
		//Menu 框架
		var html = $(
			'<div class="dropdown custom-menu">\n' +
			'	<ul class="dropdown-menu">\n' +
			'	</ul>\n' +
			'</div>'
		);
		
		//加载menu item
		$.each(data.list, function(index, item){
			if(item.sublist == undefined){
				//无子菜单
				var itemHTML = $('<li><a href="javascript:void(0);" onClick="' + item.action + '">' + item.name + '</a></li>');
				$(html).find('> ul').append(itemHTML);
				$(itemHTML).on('click', function(){
					$(html).remove();
				});
			}else{
				//子菜单， 仅支持二级菜单
				var temp = $(
				'<li class="dropdown-submenu">\n' +
				'	<a class="subtoggle" href="#">' + item.name + ' <span class="fa fa-caret-right"></span></a>\n' +
				'	<ul class="dropdown-menu">\n' +
				'	</ul>\n' +
				'</li>'
				);
				//子菜单item
				$.each(item.sublist, function(i, sub){
					var itemHTML = $('<li><a href="javascript:void(0);" onClick="' + sub.action + '">' + sub.name + '</a></li>');
					$(temp).find('> .dropdown-menu').append(itemHTML);
					$(itemHTML).on('click', function(){
						$(html).remove();
					});
				});
				
				//关闭其他子菜单
				$(temp).on("click", function(e){
					$(html).find('.dropdown-submenu ul').hide();
					$(this).find('> ul').toggle();
					e.stopPropagation();
					e.preventDefault();
				});

				$(html).find('> ul').append(temp);
			}
		});
		
		
		//关闭主菜单时,自动关闭子菜单
		$(html).on('hidden.bs.dropdown', function(){
			$(this).find('.dropdown-submenu ul').hide();
		});
		
		$(html).find('> .dropdown-menu').dropdown('toggle');
		return html;
	}
};



/* 3. 创建自定义菜单 - createCustomMenu */
var createCustomMenu = function(data){
	/* data: {
		id or dir: ,
		type: dir or file,
		list:[{
			name: 
			action: 
		}]
	} */
	
	var html = $(
		'<ul class="custom-menu">\n' +
		'</ul>'
	);
	
	$.each(data.list, function(i,d){
		$(html).append('<li onclick="' + d.action + '(' + data.dir + ',' + data.type +');">' + d.name + '</li>');
	});
	
	return html;
};



