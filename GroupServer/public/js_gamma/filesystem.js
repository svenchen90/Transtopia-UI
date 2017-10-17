const navLeft_FS = [
	{
		icon: '<i class="fa fa-cloud"></i>',
		name: '我的云盘',
		action: function(middleBlock, dirNav){
			dirNav.clear();
			dirNav.setBase({id: '1', name: '我的云盘'}, middleBlock.openFolder);
			middleBlock.openFolder(0);
		}
	},
	{
		icon: '<i class="fa fa-share-alt"></i>',
		name: '分享给我',
		action: function(middleBlock, dirNav){
			dirNav.clear();
			dirNav.setBase({id: '1', name: '分享给我'}, middleBlock.openFolder);
			middleBlock.openFolder(0);
		}
	},
	{
		icon: '<i class="fa fa-star"></i>',
		name: '星标',
		action: function(middleBlock, dirNav){
			
		}
	},
	{
		icon: '<i class="fa fa-trash"></i>',
		name: '回收站',
		action: function(middleBlock, dirNav){
			
		}
	},
	'divider',
	{
		icon: '<i class="fa fa-cloud-upload"></i>',
		name: '升级空间',
		action: function(middleBlock, dirNav){
			
		}
	}
];

// 左侧导航栏
var LeftBlock_FS = function(middleBlock, dirNav){
	var module = $(
		'<td class="left-block">\n' +
		'	<div class="content customized-scrollbar">\n' +
		'		<ul class="nav-list">\n' +
		'			<!-- 导航栏 -->\n' +
		'		</ul>\n' +
		'	</div>\n' +
		'</td>'
	);
	
	// 清空列表
	this.clear = function(){
		module.find('.nav-list:first').empty();
	};
	// 设置列表
	this.setNav = function(list){
		this.clear();
		
		var container = module.find('.nav-list:first');
		$.each(list, function(index, item){
			if(item == 'divider'){
				container.append('<li class="divider"></li>');
			}
			else{
				var nav = $('<li class="item noselect"><a href="javascript: void(0)">' + item.icon + item.name + '</a></li>');
				nav.click(function(ev){
					container.find('.item').removeClass('active');
					nav.addClass('active');
					
					item.action(middleBlock,dirNav);
				});
				container.append(nav);
			}
		});
	};
	
	// 获取组件
	this.getModule = function(){
		return module;
	};
	
	/* Toggle Btn */
	var toggleBtn = $(
		'<td style="background-color: rgba(0,0,0,.05);">\n' +
		'	<div class="content">\n' +
		'		<div data-toggle="left-block">\n' +
		'			<i class="fa fa-angle-double-left"></i>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</td>'
	);
	//初始化
	(function(){
		toggleBtn.find('[data-toggle="left-block"]').click(function(){
			module.toggle(200);
			$(this).find('i').toggleClass('fa-angle-double-left fa-angle-double-right');
		});
	})();
	
	// 获取缩放按钮
	this.getToggleBtn = function(){
		return toggleBtn;
	};
};

// 中部展示框
 var MiddleBlock_FS = function(dirNav){
	var module = $(
		'<td class="middle-block">\n' +
		'	<div class="content customized-scrollbar">\n' +
		'		<!-- 填充内容 -->\n' +
		'	</div>\n' +
		'</td>'
	);
	var obj = this;
	var currentDir;
	
	var sortBy;
	var ascending;
	
	var c_id; 
	var c_type; // 1. file; 2 folder;
	var c_atcion; // 1.copy; 2. cut;
	
	var folderBlock = new FileFolderBlock(new Folder(), this);
	var fileBlock =	new FileFolderBlock(new File(), this);
	
	// 初始化排序模块
	var initSortBy = function(menu){
		var component = $(
			'<span class="pull-right">\n' +
			'	<span class="dropdown">\n' +
			'		<a data-name="sort-by" href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" style="margin-right: 10px;color: rgba(0,0,0,.54); font-weight: 600; text-decoration: none;">{Dropdown}</a>\n' +
			'		<ul data-name="sort-by-menu" class="dropdown-menu dropdown-menu-right">\n' +
			'			<!-- Sort By -->\n' +
			'		</ul>\n' +
			'	</span>\n' +
			'	<span data-name="ascending"><i class="fa fa-arrow-up"></i></span>\n' +
			'</span>'
		);
		
		
		var container = component.find('[data-name="sort-by-menu"]');
		var sort = component.find('[data-name="sort-by"]');
		var ascend = component.find('[data-name="ascending"]');
		
		//初始化
		sort.text(menu[0].name);
		sortBy = menu[0].value;
		ascending = 1;
		
		$.each(menu, function(index, item){
			if(item == 'divider')
				container.append('<li class="divider"></li>');
			else{

				var l = $('<li><a href="javascript: void(0)">' + item.name + '</a></li>');
			
				l.click(function(){
					sortBy = item.value;
					sort.text(item.name);
				});
				
				container.append(l);
			}
		});
		
		ascend.click(function(){
			$(this).find('i').toggleClass('fa-arrow-down fa-arrow-up');
			ascending = (ascending+1)%2;
		});
		
		folderBlock.getModule().find('.title').append(component);
	};
	
	// 初始化右键菜单模块
	var initMenu = function(){
		module.contextmenu(function(ev){
			ev.preventDefault();
			ev.stopPropagation();
			$('.customize-menu').remove();
			module.find('.active').removeClass('active');
			$(ev.target).closest('.folder, .file').toggleClass('active');
			
			if($(ev.target).closest('.folder')[0]){
				var id = $(ev.target).closest('.folder').attr('data-id');
				FolderMenu(ev, id, obj);
			}else if($(ev.target).closest('.file')[0]){
				var id = $(ev.target).closest('.file').attr('data-id');
				FileMenu(ev, id, obj);
			}else {
				PanelMenu(ev, currentDir, obj);
			}
		});
		
		$('body').on('click contextmenu',function(ev){
			$('.customize-menu').remove();
		});
		$(window).on('resize ', function(ev){
			$('.customize-menu').remove();
		});
		
	};
	
	// 初始化左键点击
	var initActive = function(){
		module.click(function(ev){
			module.find('.active').removeClass('active');
			$(ev.target).closest('.folder, .file').toggleClass('active');
		});
	};
	
	// 初始化
	(function(){
		initSortBy(SORTBYMENU);
		initMenu();
		initActive();
		
		folderBlock.setTitle('文件夹');
		module.find('.content:first').append(folderBlock.getModule());
		
		fileBlock.setTitle('文件');
		module.find('.content:first').append(fileBlock.getModule());
	})();
	
	// 加载文件夹
	this.openFolder = function(id){
		$.ajax({
			url : GET_ALL_IN_FOLDER,
			data: {
				id: id
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				// 加载文件夹
				folderBlock.clear();
				folderBlock.addList(result.folder);
				//加载文件
				fileBlock.clear();
				fileBlock.addList(result.file);
				// 加载路径
				dirNav.setDir(result.dir, obj.openFolder);
				// 加载当前文件夹
				currentDir = id;
			},
			error: function(err){
				console.log(err);
			}
		});
	};
	
	//刷新
	this.refresh = function(){
		this.openFolder(currentDir);
	};
	
	//获取路径
	this.getCurrentDir = function(){
		return currentDir;
	};
	
	this.openFile = function(id){
		console.log(id);
		window.open("js_gamma/module.js", '_blank');
	};
	
	// 复制
	this.copy = function(id, type){
		decoration(id, type , 'copy', c_id);
		c_id = id;
		c_type = type;
		c_atcion = 1;
	};
	
	// 剪切
	this.cut = function(id, type){
		decoration(id, type , 'cut', c_id);
		c_id = id;
		c_type = type;
		c_atcion = 2;
	};
	
	// 粘贴
	this.paste = function(target){
		id = c_id;
		idTarget = target.find('.folder').attr('data-id');
		type = c_type;
		
		if(c_atcion == 1){
			if(type == 1){
				this.copyFileTO(id, idTarget);
			}else{
				this.copyFolderTO(id, idTarget);
			}
		}else if(c_atcion == 2){
			if(type == 1){
				this.moveFileTo(id, idTarget);
			}else{
				this.moveFolderTo(id, idTarget);
			}
		}else{
			console.log('error');
		}
		clearCopyCut();
	};
	
	// 复制文件
	this.copyFileTO = function(id, idTarget){
		$.ajax({
			url : COPY_FILE_TO,
			data: {
				id: id,
				idTarget: idTarget
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 1){
					obj.openFolder(currentDir);
					callAlert('复制成功！', '<i class="material-icons">done</i>', function(){});
				}else{
					callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
				}
			},
			error: function(err){
				callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
			}
		});
	};
	
	// 复制文件夹
	this.copyFolderTO = function(id, idTarget){
		$.ajax({
			url : COPY_FOLDER_TO,
			data: {
				id: id,
				idTarget: idTarget
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 1){
					obj.openFolder(currentDir);
					callAlert('复制成功！', '<i class="material-icons">done</i>', function(){});
				}else{
					callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
				}
			},
			error: function(err){
				callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
			}
		});
	};
	
	// 移动文件
	this.moveFileTo = function(id, idTarget){
		callConfirm('文件移动', '您确定要移动该文件？', 
			function(){
				$.ajax({
					url : MOVE_FILE_TO,
					data: {
						id: id,
						idTarget: idTarget
					},
					type : "GET",
					dataType : 'json',
					success : function (result){
						if(result == 1){
							obj.openFolder(currentDir);

							callAlert('移动成功！', '<i class="material-icons">done</i>', function(){});
						}else{
							callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
						}
					},
					error: function(err){
						callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
					}
				});
			}, 
			function(){
				
			}
		);
	};
	
	// 移动文件夹
	this.moveFolderTo = function(id, idTarget){
		callConfirm('文件夹移动', '您确定要移动该文件夹？', 
			function(){
				$.ajax({
					url : MOVE_FOLDER_TO,
					data: {
						id: id,
						idTarget: idTarget
					},
					type : "GET",
					dataType : 'json',
					success : function (result){
						if(result == 1){
							obj.openFolder(currentDir);
							callAlert('移动成功！', '<i class="material-icons">done</i>', function(){});
						}else{
							callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
						}
					},
					error: function(err){
						callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
					}
				});
			}, 
			function(){
				
			}
		);
	};
	
	// 删除文件
	this.deleteFile = function(id){
		callConfirm('删除文件', '您确定删除该文件？', 
			function(){
				$.ajax({
					url : DELETE_FILE,
					data: {
						id: id
					},
					type : "GET",
					dataType : 'json',
					success : function (result){
						if(result == 1){
							obj.openFolder(currentDir);
							callAlert('删除成功！', '<i class="material-icons">done</i>', function(){});
						}else{
							callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
						}
					},
					error: function(err){
						callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
					}
				});
			}, 
			function(){
				
			}
		);
	};
	
	// 删除文件夹
	this.deleteFolder = function(id){
		callConfirm('删除文件', '您确定删除该文件？', 
			function(){
				$.ajax({
					url : DELETE_FOLDER,
					data: {
						id: id
					},
					type : "GET",
					dataType : 'json',
					success : function (result){
						if(result == 1){
							obj.openFolder(currentDir);
							callAlert('删除成功！', '<i class="material-icons">done</i>', function(){});
						}else{
							callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
						}
					},
					error: function(err){
						callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
					}
				});
			}, 
			function(){
				
			}
		);
	};
	
	// 重命名文件
	this.renameFile = function(id){
		singleLineInput('文件重命名', '请输入新的文件名称', function(input){
			// Validate
			$.ajax({
				url : RENAME_FILE,
				data: {
					id: id,
					name: input
				},
				type : "GET",
				dataType : 'json',
				success : function (result){
					if(result == 1){
						obj.openFolder(currentDir);
						
						callAlert('操作成功！', '<i class="material-icons">done</i>', function(){});
					}else{
						callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
					}
				},
				error: function(err){
					callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
				}
			});
		})
	};
	
	// 重命名文件
	this.renameFolder = function(id){
		singleLineInput('文件夹重命名', '请输入新的文件夹名称', function(input){
			// Validate
			$.ajax({
				url : RENAME_FOLDER,
				data: {
					id: id,
					name: input
				},
				type : "GET",
				dataType : 'json',
				success : function (result){
					if(result == 1){
						obj.openFolder(currentDir);
						callAlert('操作成功！', '<i class="material-icons">done</i>', function(){});
					}else{
						callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
					}
				},
				error: function(err){
					callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
				}
			});
		})
	};
	
	
	// 文件和文件夹点击样式 id, type , 'copy', c_id
	var decoration = function(id, type ,className, c_id /* target, previousTarget ,className */){
		var allSet = "active copy cut";
		if(c_id)
			module.find('[data-id="' + c_id + '"]').removeClass(allSet);
		module.find('[data-id="' + id + '"].' + (type == 1 ? 'file' : 'folder')).addClass(className);
	};
	
	var clearCopyCut = function(){
		c_id = 'undefined';
		c_type = 'undefined';
		c_action = 'undefined';
	};
	
	// 获取组件
	this.getModule = function(){
		return module;
	};
};

const SORTBYMENU = [
	{
		name: '名称',
		value: 0
	},
	'divider',
	{
		name: '创建时间',
		value: 1
	},
	{
		name: '修改时间',
		value: 2
	}
];

// 文件夹 和 文件模块
var FileFolderBlock = function(modal, controller){
	var module = $(
		'<div class="file-folder-block">\n' +
		'	<!-- 标题 -->\n' +
		'	<div class="title" style="margin-bottom: 15px; line-height: 40px;">\n' +
		'		<span data-name="title" style="color: rgba(0,0,0,.54); font-weight: 600;"></span>\n' +
		'	</div>\n' +
		'	<div class="clearfix"></div>\n' +
		'	<!--  文件夹 -->\n' +
		'	<div class="file-folder-content row">\n' +
		'		<!-- 文件夹内容 -->\n' +
		'	</div>\n' +
		'	<!-- <p style="text-align:center;"><span class="btn loadmore">加载更多...</span></p> -->\n' +
		'</div>'
	);
	var obj = this;
	var data = [];
	var modal = modal;
	var activeIdx;
	//var sortBy = 0,
	//	ascending = 1;
	
	//var dirs = [];
	
	// 设置标题栏
	this.setTitle = function(title){
		module.find('[data-name="title"]').text(title);
	};
	
	// 添加单个
	this.add = function(d){
		var f = modal.generator(d, data.length, controller);
		var fObj = $.extend({}, d, {target: f});
		data.push(fObj);
		module.find('.file-folder-content').append(f);		
	};
	
	// 添加列表
	this.addList = function(list){
		// 减少jquery查询次数
		if(!Array.isArray(list)){
			console.log('error', list);
		}else if(list.length == 0){
			console.log(list);
		}else{
			$.each(list, function(index, file){
				obj.add(file);
			});
		}
	};
	
	// 删除单个
	this.remove = function(index){
		var fObj = data[index];
		fObj.target.remove();
		delete data[index];
	};
	
	
	// remove文件夹列表
	this.removeList = function(idList){
		$.each(idList, function(index, fid){
			obj.remove(fid);
		});
	};
	
	// Search
	this.search = function(query){
		console.log(query);
	};
	
	// 设置active
	this.active = function(index){
		if(activeIdx){
			data[activeIdx].target.find('.folder, .file').removeClass('active');
		}else{
			
		}
		
		data[index].target.find('.folder, .file').addClass('active');
		activeIdx = index;
	};
	
	// 清空
	this.clear = function(){
		data = [];
		module.find('.file-folder-content').empty();
	};
	
	//获取模块
	this.getModule = function(){
		return module;
	};
};

// 文件夹控制器
var Folder = function(){
	var obj = this;
	
	// 验证数据
	var validate = function(data){
		return true;
	};
	
	// 生成器
	this.generator = function(data, index, controller){
		if(validate(data)){
			var folder = $(
				'<div class="col-lg-2 col-md-4 col-sm-6" data-type="folder">\n' +
				'	<div class="folder noselect" title="' + data.name + '" data-index="' + index + '" data-id="' + data.id + '" data-set="' + data.type + '">\n' +
				'		<span class="icon"><i class="fa fa-folder"></i></span>\n' +
				'		<span class="name">' + data.name + '</span>\n' +
				'	</div>\n' +
				'</div>'
			);
			
			if(data.authority.includes(4)){
				folder.draggable({
					zIndex: 2500,
					revert: true,
					opacity: 0.6
				});
			}
			
			folder.droppable({
				drop: function( event, ui ) {
					/* 
						ui.draggable : drag对象
						event.target : drop对象
					*/
					var idDrag = $(ui.draggable).closest('[data-type="file"], [data-type="folder"]').find('.file, .folder').attr('data-id');
					var idDrop = $(event.target).find('.file, .folder').attr('data-id');
					if(data.authority.includes(5)){
						if($(ui.draggable).closest('[data-type="file"]').attr('data-type') == 'file'){
							controller.moveFileTo(idDrag, idDrop);
						}else{
							controller.moveFolderTo(idDrag, idDrop);
						}
					}else{
						callAlert('暂无权限！', '<i class="material-icons">error_outline</i>', function(){});
					}
					$(event.target).find('.folder').removeClass('disabled able');
				},
				over: function( event, ui ) {
					if(data.authority.includes(5)){
						$(event.target).find('.folder').addClass('able');
					}else{
						$(event.target).find('.folder').addClass('disabled');
					}
				},
				out: function( event, ui ) {
					if(data.authority.includes(5)){
						$(event.target).find('.folder').removeClass('able');
					}else{
						$(event.target).find('.folder').removeClass('disabled');
					}
				}
			});
			
			return folder;
		}else{
			console.log('error', data);
		}
	};
	
	// 搜索匹配
	this.match = function(data, query){
		return true;
	};
};

var File = function(){
	var obj = this;
	
	// 获取文件Icon
	var getIcon = function(name){
		return '<i class="fa fa-file-excel-o"></i>';
	};
	
	// 验证数据
	var validate = function(data){
		return true;
	};
	
	// 生成器
	this.generator = function(data, index, controller){
		if(validate(data)){
			var file = $(
				'<div class="col-lg-2 col-md-4 col-sm-6" data-type="file">\n' +
				'	<div class="file noselect" title="' + data.name + '" data-index="' + index + '" data-id="' + data.id + '" data-set="' + data.type + '" data-src="' + data.src + '">\n' +
				'		<div class="top">\n' +
				'			<iframe id="frame" src="' + data.src + '" width="100%" scrolling="no" frameborder="0">\n' +
				'			</iframe>\n' +
				'		</div>\n' +
				'		<div class="bot">\n' +
				'			<span class="icon">' + getIcon(data.name) + '</span>\n' +
				'			<span class="name">' + data.name + '</span>\n' +
				'		</div>\n' +
				'	</div>\n' +
				'</div>'
			);
			
			if(data.authority.includes(4)){
				file.find('.bot').draggable({
					opacity: 0.6,
					zIndex: 2500,
					revert: true
				});
			}
			
			return file;
		}else{
			console.log('error', data);
		}
	};
	
	// 搜索匹配
	this.match = function(data, query){
		return true;
	}
};

var DirNav = function(){
	var nav = $(
		'<ul class="nav navbar-nav" data-type="left-list">\n' +
		'</ul>'
	);
	
	// 设置根目录
	this.setBase = function(base, callback){
		nav.find('.nav-base').remove();
		var link = $('<li class="nav-base"><a href="javascript: void(0)"><span>' + base.name + '</span> <i class="fa fa-angle-down"></i></a></li>\n');
		link.click(function(ev){
			callback(base.id);
		});
		nav.append(link);
	};
	
	// 设置路径
	this.setDir = function(list, callback){
		nav.find('.nav-dir').remove();
		$.each(list, function(index, item){
			var link = $('<li class="nav-dir"><a href="javascript: void(0)"><span>' + item.name + '</span> <i class="fa fa-angle-down"></i></a></li>\n');
			link.click(function(ev){
				callback(item.id);
			});
			nav.append(link);
		});
	};
	
	this.clear = function(){
		nav.find('li').remove();
	};
	
	// 获取模组
	this.getModule = function(){
		return nav;
	};
	
};

// 右侧信息栏
var RightBlock_FS = function(){
	var module = $(
		'<td class="right-block">\n' +
		'	<div class="content customized-scrollbar">\n' +
		'		<!-- 内容 -->\n' +
		'	</div>\n' +
		'</td>'
	);
	
	// toggle
	this.toggle = function(){
		module.toggle(ANIMATION_TIME);
	};
	
	(function(){
		module.css('display', 'none');
	})()
	
	// 获取module
	this.getModule = function(){
		return module;
	};
};

const FOLDER_MENU_SET = [
	{
		icon: '<i class="fa fa-folder-open-o"></i>',
		name: '打开',
		action: function(target, controller){
			controller.openFolder(target.find('.folder').attr('data-id'));
		}
	},
	{
		icon: '<i class="fa fa-download"></i>',
		name: '打包下载',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-files-o"></i>',
		name: '复制',
		action: function(target, controller){
			controller.copy(target.find('.folder').attr('data-id'),2);
		}
	},
	{
		icon: '<i class="fa fa-scissors"></i>',
		name: '剪切',
		action: function(target, controller){
			controller.cut(target.find('.folder').attr('data-id'),2);
		}
	},
	{
		icon: '<i class="fa fa-clipboard"></i>',
		name: '粘贴',
		action: function(target, controller){
			controller.paste(target);
		}
	},
	{
		icon: '<i class="fa fa-eraser"></i>',
		name: '重命名',
		action: function(target, controller){
			controller.renameFolder(target.find('.folder').attr('data-id'));
		}
	},
	{
		icon: '<i class="fa fa-trash-o"></i>',
		name: '删除',
		action: function(target, controller){
			controller.deleteFolder(target.find('.folder').attr('data-id'));
		}
	},
	{
		icon: '<i class="fa fa-link"></i>',
		name: '链接',
		action: function(){
			LinkBox();
		}
	},
	{
		icon: '<i class="fa fa-share-alt"></i>',
		name: '分享',
		action: function(target, controller){
			var id = target.find('.folder').attr('data-id');
			var type = target.find('.folder').attr('data-set');
			if(type == 1){
				//私人
				SelectBox_VisibilityIndividual(id,2, 
					function(){
						controller.refresh();
					},
					getVisibilityList,
					updateFileFolderVisibility
				);
			}else if(type == 2){
				//群组
				SelectBox_VisibilityGroup(id,2,
					function(){
						controller.refresh();
					},
					getVisibilityList,
					updateFileFolderVisibility
				);
			}
		}
	},
	{
		icon: '<i class="fa fa-key"></i>',
		name: '修改权限',
		action: function(target, controller){
			var id = target.find('.folder').attr('data-id');
			var type = target.find('.folder').attr('data-set');
			if(type == 1){
				//私人
				SelectBox_VisibilityIndividual(id,2, 
					function(){
						controller.refresh();
					},
					getEditableList,
					updateFileFolderEditable
				);
			}else if(type == 2){
				//群组
				SelectBox_VisibilityGroup(id,2,
					function(){
						controller.refresh();
					},
					getEditableList,
					updateFileFolderEditable
				);
			}
		}
	}
];

const FILE_MENU_SET = [
	{
		icon: '<i class="fa fa-folder-open-o"></i>',
		name: '打开',
		action: function(target, controller){
			controller.openFile(target.find('.file').attr('data-id'));
		}
	},
	{
		icon: '<i class="fa fa-download"></i>',
		name: '下载',
		action: function(target, controller){
			function downloadFile(url, name){
					var link = document.createElement("a");
					link.download = name;
					link.href = url;
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					delete link;
			}
			
			downloadFile(target.find('.file').attr('data-src'), target.find('.file').attr('title'));
			//window.location.href = 'js_gamma/module.js';
			//window.location='js_gamma/module.js';
			//download('js_gamma/module.js');
			//window.location.href = 'js_gamma/module.js';
			//window.open('js_gamma/module.js');
			//$.fileDownload('js_gamma/module.js');
			/* $.fileDownload('js_gamma/module.js')
				.done(function () { alert('File download a success!'); })
				.fail(function () { alert('File download failed!'); }); */
		}
	},
	{
		icon: '<i class="fa fa-files-o"></i>',
		name: '复制',
		action: function(target, controller){
			controller.copy(target.find('.file').attr('data-id'),1);
		}
	},
	{
		icon: '<i class="fa fa-scissors"></i>',
		name: '剪切',
		action: function(target, controller){
			controller.cut(target.find('.file').attr('data-id'),1);
		}
	},
	{
		icon: '<i class="fa fa-eraser"></i>',
		name: '重命名',
		action: function(target, controller){
			controller.renameFile(target.find('.file').attr('data-id'));
		}
	},
	{
		icon: '<i class="fa fa-trash-o"></i>',
		name: '删除',
		action: function(target, controller){
			controller.deleteFile(target.find('.file').attr('data-id'));
		}
	},
	{
		icon: '<i class="fa fa-link"></i>',
		name: '链接',
		action: function(){
			LinkBox();
		}
	},
	{
		icon: '<i class="fa fa-share-alt"></i>',
		name: '分享',
		action: function(target, controller){
			var id = target.find('.file').attr('data-id');
			var type = target.find('.file').attr('data-set');
			if(type == 1){
				//私人
				SelectBox_VisibilityIndividual(id,1, 
					function(){
						controller.refresh();
					},
					getVisibilityList,
					updateFileFolderVisibility
				);
			}else if(type == 2){
				//群组
				SelectBox_VisibilityGroup(id,1,
					function(){
						controller.refresh();
					},
					getVisibilityList,
					updateFileFolderVisibility
				);
			}
		}
	},
	{
		icon: '<i class="fa fa-key"></i>',
		name: '修改权限',
		action: function(target, controller){
			var id = target.find('.file').attr('data-id');
			var type = target.find('.file').attr('data-set');
			if(type == 1){
				//私人
				SelectBox_VisibilityIndividual(id,1, 
					function(){
						controller.refresh();
					},
					getEditableList,
					updateFileFolderEditable
				);
			}else if(type == 2){
				//群组
				SelectBox_VisibilityGroup(id,1,
					function(){
						controller.refresh();
					},
					getEditableList,
					updateFileFolderEditable
				);
			}
		}
	}
];


const	Panel_MENU_SET = [
	{
		icon: '<i class="fa fa-upload"></i>',
		name: '上传文件',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-plus"></i>',
		name: '新建文件夹',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-refresh"></i>',
		name: '刷新',
		action: function(fid, controller){
			controller.refresh();
		}
	},
	{
		icon: '<i class="fa fa-clipboard"></i>',
		name: '粘贴',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-link"></i>',
		name: '链接',
		action: function(){
			LinkBox();
		}
	}
];


// 右键菜单
var Menu = function(x, y, list, folderMenuSet, target, controller){
	var menu = $(
		'<ul class="dropdown-menu customize-menu" style="position: absolute; top: ' + y + 'px; left: ' + x + 'px;">\n' +
		'	<!-- 二级子菜单 -->\n' +
		'</ul>\n'
	);
	
	if(!Array.isArray(list) || list.length == 0)
		return '';
	else{
		$.each(list, function(index, i){
			if(i < folderMenuSet.length){
				var item = folderMenuSet[i];
				var l = $('<li><a href="javascript: void(0)">' + item.icon + item.name + '</a></li>\n');
				l.click(function(){
					item.action(target, controller);
				})
				menu.append(l);
			}
		});	
		return menu;
	}
};

// 文件夹菜单
var FolderMenu = function(ev, id, controller){
	$.ajax({
		url : GET_AUTHORITY_FOLDER,
		data: {
			id: id
		},
		type : "GET",
		dataType : 'json',
		success : function (result){
			var target = $(ev.target).closest('[data-type="folder"]');
			var menu = Menu(ev.pageX, ev.pageY,result,FOLDER_MENU_SET, target, controller);
			$('body').append(menu);
			menu.show(300);
		},
		error: function(err){
			console.log(err);
		}
	});
};

// 文件菜单
var FileMenu = function(ev, id, controller){
	$.ajax({
		url : GET_AUTHORITY_FILE,
		data: {
			id: id
		},
		type : "GET",
		dataType : 'json',
		success : function (result){
			var target = $(ev.target).closest('[data-type="file"]');
			var menu = Menu(ev.pageX, ev.pageY,result,FILE_MENU_SET, target, controller);
			$('body').append(menu);
			menu.show(300);
		},
		error: function(err){
			console.log(err);
		}
	});
};

// 面板菜单
var PanelMenu = function(ev, id, controller){
	$.ajax({
		url : GET_AUTHORITY_FOLDER,
		data: {
			id: id
		},
		type : "GET",
		dataType : 'json',
		success : function (result){
			// 移除其他菜单
			$('.customize-menu').remove();
			var menu = Menu(ev.pageX, ev.pageY,result,Panel_MENU_SET, controller.getCurrentDir(), controller);
			$('body').append(menu);
			menu.show(300);
		},
		error: function(err){
			console.log(err);
		}
	});
};


// 私人权限
var SelectBox_VisibilityIndividual = function(fid, type, callback, getAuthority, updateAuthority){
	Promise
		.all([getFriendTags(), getAuthority(fid, type)])
		.then(function(data){
			var tags = data[0];
			var selected = data[1];
			var radios = [
				{
					type: 'radio',
					value: 1,
					name: '公开',
					icon: '<i class="fa fa-gear"></i>'
				},
				{
					type: 'radio',
					value: 2,
					name: '朋友圈',
					icon: '<i class="fa fa-gear"></i>'
				},
				{
					type: 'collapse',
					value: 3,
					name: '部分可见',
					icon: '<i class="fa fa-gear"></i>'
				},
				{
					type: 'radio',
					value: 4,
					name: '仅自己可见',
					icon: '<i class="fa fa-gear"></i>'
				}
			];
			
			// 加载tag
			var modifyTag = function(name){
				Promise
					.all([getFriends(), getFriendInTag(name)])
					.then(function(data){
						var all = data[0];
						var inTag = data[1];
						TwinRowSelectUser('修改标签', all, inTag, 
						function(users, modal){
							updateTag(name, users, modal);
						})
					})
					.catch(function(reason){
						console.log(reason);
					});
			};
			var updateTag = function(name, users, modal){
				$.ajax({
					url : UPDATE_FRIEND_TAG,
					data: {
						name: name,
						user: users
					},
					type : "GET",
					dataType : 'json',
					success : function (result){
						// result {value, sublist, tail}
						if(result == 0){
							reject('请求失败1');
						}else{
							selectBox.reloadTailUser([]);
							selectBox.appendNewTag({name: name, icon: '<i class="fa fa-tags"></i>', callback: modifyTag});
							callAlert('修改成功！', '<i class="material-icons">done</i>', function(){modal.modal('hide');});
						}
					},
					error: function(err){
						console.log('请求失败2');
					}
				});
			};
			radios[2].sublist = [];
			$.each(tags, function(index, tag){
				radios[2].sublist.push(
					{
						name: tag.name,
						icon: '<i class="fa fa-tags"></i>',
						callback: modifyTag
					}
				);
			});
			
			//加载tail
			var selectUser = function(users){
				getFriends()
					.then(function(data){
						TwinRowSelectUser('选择要分享的好友', data, users, submitSelectUser);
					})
					.catch(function(reason){
						console.log(reason);
					});
			};
			var submitSelectUser = function(user, modal){
				if(user.length == 0){
					selectBox.reloadTailUser(user);
					modal.modal('hide');
				}else{
					callConfirm('新建标签', '您是否要创建一个新的标签？', 
						function(){
							singleLineInput('新建标签', '请输入标签名称', 
								function(name, modal2){
									//console.log(user);
									//console.log(name);
									$.ajax({
										url : CREATE_FRIEND_TAG,
										data: {
											name: name,
											user: user
										},
										type : "GET",
										dataType : 'json',
										success : function (result){
											// result {value, sublist, tail}
											if(result == 0){
												reject('请求失败1');
											}else{
												selectBox.reloadTailUser([]);
												selectBox.appendNewTag({name: name, icon: '<i class="fa fa-tags"></i>', callback: modifyTag});
												modal2.modal('hide');
												modal.modal('hide');
											}
										},
										error: function(err){
											console.log('请求失败2');
										}
									});
								}
							);
						},
						function(){
							selectBox.reloadTailUser(user);
							modal.modal('hide');
						}
					);
				}
			};
			
			radios[2].tail = {
				text: '从好友名单中选取',
				icon: '<i class="fa fa-plus-square-o" style="color: green;"></i>',
				callback: selectUser
			};
			
			var selectBox = new SelectBox('个人文件分享', radios, selected);
			
			selectBox.getModule().find('[data-action="submit"]').click(function(){
				var data1 = {
					value: selected.value,
					tags: (selected.sublist == undefined ? [] : selected.sublist),
					items: (selected.tail == undefined ? [] : toStringArray(selected.tail, 'id'))
				};
				var data2 = selectBox.getData();
				var result = {};
				
				if(data2.value == data1.value){
					result.value = data2.value;
					result.tagAdd = getDifferenceSetBeta(data2.tags, data1.tags);
					result.tagDelete = getDifferenceSetBeta(data1.tags, data2.tags);
					result.itemAdd = getDifferenceSetBeta(data2.items, data1.items);
					result.itemDelete = getDifferenceSetBeta(data1.items, data2.items);
				}else{
					result.value = data2.value;
					result.tagAdd = data2.tags;
					result.tagDelete = [];
					result.itemAdd = data2.items;
					result.itemDelete = [];
				}
				
				updateAuthority(fid, result.value, result.tagAdd, result.tagDelete, result.itemAdd, result.itemDelete)
					.then(function(data){
						selectBox.getModule().modal('hide');
						callback();
					});
			});
		}).catch(function(reason){
			console.log(reason);
		});
};

// 群组权限
var SelectBox_VisibilityGroup = function(fid, type, callback, getAuthority, updateAuthority){
	Promise
		.all([getFriendTags(), getAuthority(fid, type)])
		.then(function(data){
			var tags = data[0];
			var selected = data[1];
			var radios = [
				{
					type: 'radio',
					value: 1,
					name: '公开',
					icon: '<i class="fa fa-gear"></i>'
				},
				{
					type: 'radio',
					value: 2,
					name: '群成员可见',
					icon: '<i class="fa fa-gear"></i>'
				},
				{
					type: 'collapse',
					value: 3,
					name: '部分成员可见',
					icon: '<i class="fa fa-gear"></i>'
				},
				{
					type: 'radio',
					value: 4,
					name: '仅群主可见',
					icon: '<i class="fa fa-gear"></i>'
				}
			];
			
			//加载tail
			var selectUser = function(users){
				getGroupMembers()
					.then(function(data){
						TwinRowSelectUser('选择要分享的好友', data, users, 
						function(user, modal){
							selectBox.reloadTailUser(user);
							modal.modal('hide');
						});
					})
					.catch(function(reason){
						console.log(reason);
					});
			};
			radios[2].tail = {
				text: '从群成员中选取',
				icon: '<i class="fa fa-plus-square-o" style="color: green;"></i>',
				callback: selectUser
			};
			
			var selectBox = new SelectBox('群文件分享', radios, selected);
			
			selectBox.getModule().find('[data-action="submit"]').click(function(){
				var data1 = {
					value: selected.value,
					items: (selected.tail == undefined ? [] : toStringArray(selected.tail, 'id'))
				};
				var data2 = selectBox.getData();
				var result = {};
				
				if(data2.value == data1.value){
					result.value = data2.value;
					result.itemAdd = getDifferenceSetBeta(data2.items, data1.items);
					result.itemDelete = getDifferenceSetBeta(data1.items, data2.items);
				}else{
					result.value = data2.value;
					result.itemAdd = data2.items;
					result.itemDelete = [];
				}
				
				updateAuthority(fid, result.value, [], [], result.itemAdd, result.itemDelete)
					.then(function(data){
						selectBox.getModule().modal('hide');
						callback();
					});
				
			});
			
		}).catch(function(reason){
			console.log(reason);
		});
};
