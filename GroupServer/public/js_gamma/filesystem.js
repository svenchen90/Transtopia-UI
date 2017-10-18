/* 左侧导航栏 */
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
/* ！左侧导航栏 */

/* 中部展示框 */
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
	
	// A) 初始化排序模块
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
	
	// B) 初始化右键菜单模块
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
	
	// C) 初始化左键点击
	var initActive = function(){
		module.click(function(ev){
			module.find('.active').removeClass('active');
			$(ev.target).closest('.folder, .file').toggleClass('active');
		});
	};
	
	// D) 文件和文件夹点击样式 id, type , 'copy', c_id
	var decoration = function(id, type ,className, c_id){
		var allSet = "active copy cut";
		if(c_id)
			module.find('[data-id="' + c_id + '"]').removeClass(allSet);
		module.find('[data-id="' + id + '"].' + (type == 1 ? 'file' : 'folder')).addClass(className);
	};
	
	// E) 清空复制剪切板
	var clearCopyCut = function(){
		c_id = undefined;
		c_type = undefined;
		c_action = undefined;
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
	
	// 1) 加载文件夹
	this.openFolder = function(id){
		getAllInFolder(id)
			.then(function(result){
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
			})
			.catch(function(reason){
				console.log(reason);
			});
	};
	
	// 2) 刷新
	this.refresh = function(){
		this.openFolder(currentDir);
	};
	
	// 3) 获取路径
	this.getCurrentDir = function(){
		return currentDir;
	};
	
	// 4) 打开文件
	this.openFile = function(src){
		window.open(src, '_blank');
	};
	
	// 5) 复制
	this.copy = function(id, type){
		decoration(id, type , 'copy', c_id);
		c_id = id;
		c_type = type;
		c_atcion = 1;
	};
	
	// 6) 剪切
	this.cut = function(id, type){
		decoration(id, type , 'cut', c_id);
		c_id = id;
		c_type = type;
		c_atcion = 2;
	};
	
	// 7) 粘贴
	this.paste = function(target){
		id = c_id;
		idTarget = target.find('.folder').attr('data-id');
		type = c_type;
		
		if(c_atcion == 1){
			if(type == 1){
				this.copyFileTo(id, idTarget);
			}else{
				this.copyFolderTo(id, idTarget);
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
	
	// 8) 复制文件
	this.copyFileTo = function(id, idTarget){
		copyFileTo_Proxy(id, idTarget)
			.then(function(result){
				obj.refresh();
				callAlert('复制成功！', '<i class="material-icons">done</i>', function(){});
			})
			.catch(function(reason){
				console.log(reason);
				callAlert(reason, '<i class="material-icons">error_outline</i>', function(){});
			});
	};
	
	// 9) 复制文件夹
	this.copyFolderTo = function(id, idTarget){
		copyFolderTo_Proxy(id, idTarget)
			.then(function(result){
				obj.refresh();
				callAlert('复制成功！', '<i class="material-icons">done</i>', function(){});
			})
			.catch(function(reason){
				console.log(reason);
				callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
			});
	};
	
	// 10) 移动文件
	this.moveFileTo = function(id, idTarget){
		callConfirm('文件移动', '您确定要移动该文件？', 
			function(){
				moveFileTo_Proxy(id, idTarget)
					.then(function(result){
						obj.refresh();
						callAlert('移动成功！', '<i class="material-icons">done</i>', function(){});
					})
					.catch(function(reason){
						callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
					});
			}, 
			function(){
				
			}
		);
	};
	
	// 11) 移动文件夹
	this.moveFolderTo = function(id, idTarget){
		callConfirm('文件夹移动', '您确定要移动该文件夹？', 
			function(){
				moveFolderTo_Proxy(id, idTarget)
					.then(function(result){
						obj.refresh();
						callAlert('移动成功！', '<i class="material-icons">done</i>', function(){});
					})
					.catch(function(reason){
						callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
					});
			}, 
			function(){
				
			}
		);
	};
	
	// 12) 删除文件
	this.deleteFile = function(id){
		callConfirm('删除文件', '您确定删除该文件？', 
			function(){
				deleteFile_Proxy(id)
					.then(function(result){
						obj.refresh();
						callAlert('删除成功！', '<i class="material-icons">done</i>', function(){});
					})
					.catch(function(reason){
						callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
					});
			}, 
			function(){
				
			}
		);
	};
	
	// 13) 删除文件夹
	this.deleteFolder = function(id){
		callConfirm('删除文件', '您确定删除该文件？', 
			function(){
				deleteFolder_Proxy(id)
					.then(function(result){
						obj.refresh();
						callAlert('删除成功！', '<i class="material-icons">done</i>', function(){});
					})
					.catch(function(reason){
						callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
					});
			}, 
			function(){
				
			}
		);
	};
	
	// 14) 重命名文件
	this.renameFile = function(id){
		singleLineInput('文件重命名', '请输入新的文件名称', function(input, modal){
			// Validate
			renameFile_Proxy(id, input)
				.then(function(result){
					callAlert('修改成功！', '<i class="material-icons">done</i>', 
						function(){
							obj.refresh();
							modal.modal('hide');
						}
					);
				})
				.catch(function(reason){
					callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
				});
		})
	};
	
	// 15) 重命名文件
	this.renameFolder = function(id){
		singleLineInput('文件夹重命名', '请输入新的文件夹名称', function(input, modal){
			// Validate
			renameFolder_Proxy(id, input)
				.then(function(result){
					callAlert('修改成功！', '<i class="material-icons">done</i>', 
						function(){
							obj.refresh();
							modal.modal('hide');
						}
					);
				})
				.catch(function(reason){
					callAlert('错误！', '<i class="material-icons">error_outline</i>', function(){});
				});
		})
	};
	
	// 16) 可粘贴
	this.ableToPaste = function(){
		return c_id != undefined;
	};
	
	// 18) 获取C_id
	this.getC_ID = function(){
		return c_id;
	};
	
	// 18) 获取组件
	this.getModule = function(){
		return module;
	};
};
/* ！中部展示框 */


/* 文件（夹）模块 */
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
/* ！文件（夹）模块 */

/* 组件 */
/* 1）文件夹 */
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
			
			if(data.hasAuthority > 0){
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
					if(data.hasAuthority > 0){
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
					if(data.hasAuthority > 0){
						$(event.target).find('.folder').addClass('able');
					}else{
						$(event.target).find('.folder').addClass('disabled');
					}
				},
				out: function( event, ui ) {
					if(data.hasAuthority > 0){
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

/* 2）文件 */
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
			
			if(data.hasAuthority > 0){
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

/* 3）导航路径 */
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
/* ！组件 */

/* 右侧信息栏 */
var RightBlock_FS = function(){
	var module = $(
		'<td class="right-block">\n' +
		'	<div class="content customized-scrollbar" style="padding: 15px;">\n' +
		'		<!-- 内容 -->\n' +
		'		<span><i class="fa fa-folder"></i></span>\n' +
		'		<span>asfasfasfasfasfaasfasfasfasfasfaasfasfasfasfasfaasfasfasfasfasfaasfasfasfasfasfa</span>\n' +
		'		<span class="pull-right">&times</span>\n' +
		'		<div class="clearfix"></div>\n' +
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
/* ！右侧信息栏 */

/* 文件右键菜单 */
/* 组件样式 */
var Menu = function(x, y, hasAuthority, folderMenuSet, target, controller){
	var menu = $(
		'<ul class="dropdown-menu customize-menu" style="position: absolute; top: ' + y + 'px; left: ' + x + 'px;">\n' +
		'	<!-- 二级子菜单 -->\n' +
		'</ul>\n'
	);
	
	$.each(folderMenuSet, function(index, item){	
		if(hasAuthority >= item.authority){
			if(item.name == '粘贴'){
				if(!controller.ableToPaste())
					return true;
				else if( $.type(target) != "number"  && target.find('.file, .folder').attr('data-id') == controller.getC_ID()) 
					return true;
			}
			var l = $('<li><a href="javascript: void(0)">' + item.icon + item.name + '</a></li>\n');
			l.click(function(){
				item.action(target, controller);
			});
			menu.append(l);
		}
	});
	return menu;
};

// 1）文件夹菜单
const FOLDER_MENU_SET = [
	{
		icon: '<i class="fa fa-folder-open-o"></i>',
		name: '打开',
		authority: 0,
		action: function(target, controller){
			controller.openFolder(target.find('.folder').attr('data-id'));
		}
	},
	{
		icon: '<i class="fa fa-download"></i>',
		authority: 1,
		name: '打包下载',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-files-o"></i>',
		name: '复制',
		authority: 1,
		action: function(target, controller){
			controller.copy(target.find('.folder').attr('data-id'),2);
		}
	},
	{
		icon: '<i class="fa fa-scissors"></i>',
		name: '剪切',
		authority: 1,
		action: function(target, controller){
			controller.cut(target.find('.folder').attr('data-id'),2);
		}
	},
	{
		icon: '<i class="fa fa-clipboard"></i>',
		name: '粘贴',
		authority: 1,
		action: function(target, controller){
			controller.paste(target);
		}
	},
	{
		icon: '<i class="fa fa-eraser"></i>',
		name: '重命名',
		authority: 1,
		action: function(target, controller){
			controller.renameFolder(target.find('.folder').attr('data-id'));
		}
	},
	{
		icon: '<i class="fa fa-trash-o"></i>',
		name: '删除',
		authority: 1,
		action: function(target, controller){
			controller.deleteFolder(target.find('.folder').attr('data-id'));
		}
	},
	{
		icon: '<i class="fa fa-link"></i>',
		name: '链接',
		authority: 2,
		action: function(){
			LinkBox();
		}
	},
	{
		icon: '<i class="fa fa-share-alt"></i>',
		name: '分享',
		authority: 2,
		action: function(target, controller){
			var id = target.find('.folder').attr('data-id');
			var type = target.find('.folder').attr('data-set');
			if(type == 1){
				//私人
				SelectBox_Individual(id,2, 
					function(){
						controller.refresh();
					},
					getVisibilityList,
					updateFileFolderVisibility
				);
			}else if(type == 2){
				//群组
				SelectBox_Group(id,2,
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
		authority: 2,
		action: function(target, controller){
			var id = target.find('.folder').attr('data-id');
			var type = target.find('.folder').attr('data-set');
			if(type == 1){
				//私人
				SelectBox_Individual(id,2, 
					function(){
						controller.refresh();
					},
					getEditableList,
					updateFileFolderEditable
				);
			}else if(type == 2){
				//群组
				SelectBox_Group(id,2,
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
var FolderMenu = function(ev, id, controller){
	getFolderAuthority(id)
		.then(function(data){
			var target = $(ev.target).closest('[data-type="folder"]');
			var menu = Menu(ev.pageX, ev.pageY, data, FOLDER_MENU_SET, target, controller);
			$('body').append(menu);
			menu.show(ANIMATION_TIME);
		})
		.catch(function(reason){
			console.log(reason);
		});
};

// 2）文件菜单
const FILE_MENU_SET = [
	{
		icon: '<i class="fa fa-folder-open-o"></i>',
		name: '打开',
		authority: 0,
		action: function(target, controller){
			controller.openFile(target.find('.file').attr('data-src'));
		}
	},
	{
		icon: '<i class="fa fa-download"></i>',
		name: '下载',
		authority: 1,
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
		authority: 1,
		action: function(target, controller){
			controller.copy(target.find('.file').attr('data-id'),1);
		}
	},
	{
		icon: '<i class="fa fa-scissors"></i>',
		name: '剪切',
		authority: 1,
		action: function(target, controller){
			controller.cut(target.find('.file').attr('data-id'),1);
		}
	},
	{
		icon: '<i class="fa fa-eraser"></i>',
		name: '重命名',
		authority: 1,
		action: function(target, controller){
			controller.renameFile(target.find('.file').attr('data-id'));
		}
	},
	{
		icon: '<i class="fa fa-trash-o"></i>',
		name: '删除',
		authority: 1,
		action: function(target, controller){
			controller.deleteFile(target.find('.file').attr('data-id'));
		}
	},
	{
		icon: '<i class="fa fa-link"></i>',
		name: '链接',
		authority: 2,
		action: function(){
			LinkBox();
		}
	},
	{
		icon: '<i class="fa fa-share-alt"></i>',
		name: '分享',
		authority: 2,
		action: function(target, controller){
			var id = target.find('.file').attr('data-id');
			var type = target.find('.file').attr('data-set');
			if(type == 1){
				//私人
				SelectBox_Individual(id,1, 
					function(){
						controller.refresh();
					},
					getVisibilityList,
					updateFileFolderVisibility
				);
			}else if(type == 2){
				//群组
				SelectBox_Group(id,1,
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
		authority: 2,
		action: function(target, controller){
			var id = target.find('.file').attr('data-id');
			var type = target.find('.file').attr('data-set');
			if(type == 1){
				//私人
				SelectBox_Individual(id,1, 
					function(){
						controller.refresh();
					},
					getEditableList,
					updateFileFolderEditable
				);
			}else if(type == 2){
				//群组
				SelectBox_Group(id,1,
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
var FileMenu = function(ev, id, controller){
	getFileAuthority(id)
		.then(function(data){
			var target = $(ev.target).closest('[data-type="file"]');
			var menu = Menu(ev.pageX, ev.pageY, data, FILE_MENU_SET, target, controller);
			$('body').append(menu);
			menu.show(ANIMATION_TIME);
		})
		.catch(function(reason){
			console.log(reason);
		});
};

// 3）面板菜单
const	Panel_MENU_SET = [
	{
		icon: '<i class="fa fa-upload"></i>',
		name: '上传文件',
		authority: 1,
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-plus"></i>',
		name: '新建文件夹',
		authority: 1,
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-refresh"></i>',
		name: '刷新',
		authority: 0,
		action: function(fid, controller){
			controller.refresh();
		}
	},
	{
		icon: '<i class="fa fa-clipboard"></i>',
		name: '粘贴',
		authority: 1,
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-link"></i>',
		name: '链接',
		authority: 2,
		action: function(){
			LinkBox();
		}
	}
];
var PanelMenu = function(ev, id, controller){
	getFolderAuthority(id)
		.then(function(data){
			var menu = Menu(ev.pageX, ev.pageY, data, Panel_MENU_SET, id, controller);
			$('body').append(menu);
			menu.show(ANIMATION_TIME);
		})
		.catch(function(reason){
			console.log(reason);
		});
};
/* !文件右键菜单 */

// 私人权限
var SelectBox_Individual = function(fid, type, callback, getAuthority, updateAuthority){
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
			var updateTag = function(name, user, modal){
				updateFriendTag(name, user)
					.then(function(data){
						callAlert('修改成功！', '<i class="material-icons">done</i>', 
							function(){
								modal.modal('hide');
							}
						);
					})
					.catch(function(reason){
						console.log(reason)
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
									createFriendTag(name, user)
										.then(function(data){
											selectBox.reloadTailUser([]);
											selectBox.appendNewTag({name: name, icon: '<i class="fa fa-tags"></i>', callback: modifyTag});
											modal2.modal('hide');
											modal.modal('hide');
										})
										.catch(function(reason){
											console.log(reason);
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
						callAlert('修改成功！', '<i class="material-icons">done</i>', 
							function(){
								selectBox.getModule().modal('hide');
								callback();
							}
						);
					});
			});
		}).catch(function(reason){
			console.log(reason);
		});
};

// 群组权限
var SelectBox_Group = function(fid, type, callback, getAuthority, updateAuthority){
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

// 链接框
var LinkBox = function(){
	var modal = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close btn-close" data-dismiss="modal">&times;</button>\n' +
		'				<h4 class="modal-title">' + '分享链接给' + '</h4>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div class="form-group">\n' +
		'					<label><i class="fa fa-link"></i> 链接开关</label>\n' +
		'					<label class="switch pull-right">\n' +
		'						<input name="switch" type="checkbox">\n' +
		'						<div class="slider round"></div>\n' +
		'					</label>\n' +
		'				</div>\n' +
		'				<div class="details" style="display: none;">\n' +
		'					<div class="form-group">\n' +
		'						<label><i class="fa fa-copy"></i> 链接</label>\n' +
		'						<input type="text" name="link" class="form-control" value="' + 'http://127.0.0.1:3000/cloud_index' +'" disabled/>\n' +
		'					</div>\n' +
		'					<div class="form-group">\n' +
		'						<label><i class="fa fa-users"></i> 分享链接给</label>\n' +
		'						<select class="form-control shared-with" style="width: 100%;"></select>\n' +
		'					</div>\n' +
		'					<div class="form-group">\n' +
		'						<label><i class="fa fa-eye"></i> 密码</label>\n' +
		'						<label class="switch pull-right">\n' +
		'							<input name="switch-password" type="checkbox">\n' +
		'							<div class="slider round"></div>\n' +
		'						</label>\n' +
		'						<input type="password" name="password" class="form-control" placeholder="请输入密码" style="display: none;"/>\n' +
		'					</div>\n' +
		'				</div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a href="javascript: void(0);" data-action="submit">确定</a>\n' +
		'				<a href="javascript: void(0);" data-dismiss="modal">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' + 
		'</div>'
	);
	
	//初始化
	(function(){
		modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		modal.find('.shared-with').select2({
			placeholder: "请选择您要分享的用户",
			multiple: true,
			language: 'zh-CN',
			tags: true
		});
		
		modal.find('[name="switch"]').change(function(){
			if($(this).is(':checked')){
				modal.find('.details').show(ANIMATION_TIME);
			}else{
				modal.find('.details').hide(ANIMATION_TIME);
			}
		});
		
		modal.find('[name="switch-password"]').change(function(){
			if($(this).is(':checked')){
				modal.find('[name="password"]').show(ANIMATION_TIME);
			}else{
				modal.find('[name="password"]').hide(ANIMATION_TIME);
			}
		});
		
		modal.modal('show');
	})();
};
