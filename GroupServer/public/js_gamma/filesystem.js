/* 常量 */
const FILE_LOAD_LIMIT = 20;

/* 1. 左侧导航栏 */
// A. 左侧导航栏-个人
const NAV_LEFT_FS_INDIVIDUAL = [
	{
		icon: '<i class="fa fa-cloud"></i>',
		name: '我的云盘',
		action: function(middleBlock, dirNav){
			/* dirNav.clear();
			dirNav.setBase({id: '1', name: '我的云盘'}, middleBlock.openFolder);
			middleBlock.openFolder(0); */
		}
	},
	{
		icon: '<i class="fa fa-share-alt"></i>',
		name: '分享给我',
		action: function(middleBlock, dirNav){
			/* dirNav.clear();
			dirNav.setBase({id: '1', name: '分享给我'}, middleBlock.openFolder);
			middleBlock.openFolder(0); */
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
// B. 左侧导航栏-群组
const NAV_LEFT_FS_GROUP = [
	{
		icon: '<i class="fa fa-cloud"></i>',
		name: '群组云盘',
		action: function(middleBlock, dirNav){
			/* dirNav.clear();
			dirNav.setBase({id: '1', name: '我的云盘'}, middleBlock.openFolder);
			middleBlock.openFolder(0); */
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
var LeftBlock_FS = function(controller){
	/* 主体模块 */
	var module = $(
		'<td class="left-block">\n' +
		'	<div class="content customized-scrollbar">\n' +
		'		<ul class="nav-list">\n' +
		'			<!-- 导航栏 -->\n' +
		'		</ul>\n' +
		'	</div>\n' +
		'</td>'
	);
	
	// 1.1. 设置列表
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
					
					item.action(controller);
				});
				container.append(nav);
			}
		});
	};
	
	// 1.2. 清空列表
	this.clear = function(){
		module.find('.nav-list:first').empty();
	};
	
	// 1.3. 获取组件
	this.getModule = function(){
		return module;
	};
	
	/* 伸缩按钮 */
	var toggleBtn = $(
		'<td style="background-color: rgba(0,0,0,.05);">\n' +
		'	<div class="content">\n' +
		'		<div data-toggle="left-block">\n' +
		'			<i class="fa fa-angle-double-left"></i>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</td>'
	);
	
	// 2.1. 获取缩放按钮
	this.getToggleBtn = function(){
		return toggleBtn;
	};
	
	//初始化
	(function(){
		toggleBtn.find('[data-toggle="left-block"]').click(function(){
			module.toggle(200);
			$(this).find('i').toggleClass('fa-angle-double-left fa-angle-double-right');
		});
	})();
};
/* ！左侧导航栏 */


/* 2. 中部展示框 */
// A. 排序栏
// ####
const SORTBYMENU = [
	{
		name: '名称',
		value: 0
	},
	'divider',
	{
		name: '创建时间',
		value: 1
	}
];
// ####
var MiddleBlock_FS = function(controller){
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
	
	// ####
	// 1.1. 初始化排序模块
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
					
					if(sortBy == 0){
						folderBlock.sortByName(ascending);
						fileBlock.sortByName(ascending);
					}else if(sortBy == 1){
						folderBlock.sortByTime(ascending);
						fileBlock.sortByTime(ascending);
					}else{
						console.log('to do');
					}
				});
				
				container.append(l);
			}
		});
		
		ascend.click(function(){
			$(this).find('i').toggleClass('fa-arrow-down fa-arrow-up');
			ascending = -1 * ascending;
			
			if(sortBy == 0){
				folderBlock.sortByName(ascending);
				fileBlock.sortByName(ascending);
			}else if(sortBy == 1){
				folderBlock.sortByTime(ascending);
				fileBlock.sortByTime(ascending);
			}else{
				console.log('to do');
			}
		});
		
		folderBlock.getModule().find('.title').append(component);
	};
	// ####
	
	// 1.2. 初始化右键菜单模块
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
	
	// 1.3 初始化左键点击
	var initActive = function(){
		module.click(function(ev){
			module.find('.active').removeClass('active');
			$(ev.target).closest('.folder, .file').toggleClass('active');
		});
	};
	
	// 1.4. 文件和文件夹点击样式 id, type , 'copy', c_id
	var decoration = function(id, type ,className, c_id){
		var allSet = "active copy cut";
		if(c_id)
			module.find('[data-id="' + c_id + '"]').removeClass(allSet);
		module.find('[data-id="' + id + '"].' + (type == 1 ? 'file' : 'folder')).addClass(className);
	};
	
	// 1.5. 清空复制剪切板
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
	
	// ####
	// 按时间排序
	this.sortByTime = function(acs){
		var attName = 'initDate';
		var dataList = data;
		this.clear();
		
		dataList.sort(
			function(a,b){
				var flag = new Date(a[attName]).getTime() > new Date(b[attName]).getTime() ? 1 : -1;
				
				return acs * flag;
			}
		);
		
		this.addList(dataList);
	};
	
	// 按名字排序（含中文）
	this.sortByName = function(acs){
		var attName = 'name';
		var dataList = data;
		this.clear();
		
		dataList.sort(
			function(a,b){
				return acs * a[attName].localeCompare(b[attName], 'zh-CN');
			}
		);
		
		this.addList(dataList);
	};
	// ####
	
	
	
	
	
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
		var icon = '<i class="material-icons">folder</i>';
		if(data.isShare == 1){
			icon = '<i class="material-icons">folder_shared</i>';
		}

		if(validate(data)){
			var folder = $(
				'<div class="col-lg-2 col-md-4 col-sm-6" data-type="folder">\n' +
				'	<div class="folder noselect" title="' + data.name + '" data-index="' + index + '" data-id="' + data.id + '" data-set="' + data.type + '">\n' +
				'		<span class="icon">' + icon + '</span>\n' +
				'		<span class="name">' + data.name + '</span>\n' +
				'	</div>\n' +
				'</div>'
			);
			
			if(data.isPublic == 1){
				folder.find('.icon').css('color', '#4285f4');
			}
			
			
			
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
					
					console.log(event.ctrlKey);
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
		var extension = name.split('.').pop();
		var icon;
		
		switch(extension){
			case 'xlsx':
				icon = '<i class="fa fa-file-excel-o"></i>';
				break;
			case 'png':
				icon = '<i class="fa fa-file-image-o"></i>';
				break;
			case 'jpg':
				icon = '<i class="fa fa-file-image-o"></i>';
				break;
			case 'pdf':
				icon = '<i class="fa fa-file-pdf-o"></i>';
				break;
			case 'ppt':
				icon = '<i class="fa fa-file-ppt-o"></i>';
				break;
			case 'txt':
				icon = '<i class="fa fa-file-text-o"></i>';
				break;
			case 'zip':
				icon = '<i class="fa fa-file-archive-o"></i>';
				break;
			case 'docx':
				icon = '<i class="fa fa-file-word-o"></i>';
				break;
			default:
        icon = '<i class="fa fa-file-o"></i>';
		}
		
		return icon;
	};
	
	// 验证数据
	var validate = function(data){
		return true;
	};
	
	// 生成器
	this.generator = function(data, index, controller){
		if(validate(data)){
			var viewable = false;
			var extension = data.name.split('.').pop();
			if(extension == 'txt' || extension == 'pdf' || extension == 'png' || extension == 'jpg')
				viewable = true;
			
			var file = $(
				'<div class="col-lg-2 col-md-4 col-sm-6" data-type="file">\n' +
				'	<div class="file noselect" title="' + data.name + '" data-index="' + index + '" data-id="' + data.id + '" data-set="' + data.type + '" data-src="' + data.src + '">\n' +
				'		<div class="top">\n' +
				'			<iframe id="frame" ' + (viewable ? 'src="' + data.src + '"' : '"' ) + ' width="100%" scrolling="no" frameborder="0">\n' +
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

/* 3. 右侧信息栏 */
var RightBlock_FS = function(){
	var module = $(
		'<td class="right-block">\n' +
		'<div class="content customized-scrollbar" style="height: calc(100vh - 102px); overflow-y: auto;overflow-x: hidden;">\n' +
		'	<!-- 内容 -->\n' +
		'	<div class="title" style=" color: rgba(0,0,0, .5); padding: 15px 0 30px 15px;">\n' +
		'		<span style="display: inline-block; font-size: 22px; padding-right: 15px;  float: left;"><i class="fa fa-folder"></i></span>\n' +
		'		<span style="display: inline-block; font-size: 22px; width:180px; white-space: nowrap; overflow: hidden;text-overflow: ellipsis; ">文件1</span>\n' +
		'		<span class="pull-right" style="cursor: pointer;font-size: 16px; "><i class="fa fa-times"></i></span>\n' +
		'	</div>\n' +
		'	<div class="clearfix"></div>\n' +
		'	<ul id="myTab" class="nav nav-tabs" style="border-bottom: none; margin-bottom: 15px;">\n' +
		'		<li class="active">\n' +
		'			<a href="#content1" data-toggle="tab" style="width: 150px; text-align: center; border: none; color: rgba(0,0,0, .3);">文件详情</a>\n' +
		'		</li>\n' +
		'		<li><a href="#content2" data-toggle="tab" style="width: 150px; text-align: center;  border: none; color: rgba(0,0,0, .3);">文件日志</a></li>\n' +
		'	</ul>\n' +
		'	<div class="tab-content" style="/*width: 315px;*/">\n' +
		'		<div class="tab-pane fade in active" id="content1">\n' +
		'			<div class="" style="width: 320px;">\n' +
		'					<img class="img-responsive"  src="http://127.0.0.1:3000/dist/img/photo1.png">\n' +
		'				<!-- <div style="padding-top: 20px;padding-bottom: 20px;">\n' +
		'					<span style="display: inline-block; font-size: 20px; color: rgba(0,0,0,.6); width: 30px; margin-left: 15px; margin-right: 15px; border-radius: 50%; border: 2px solid rgba(0,0,0,.3); text-align: center;"><i class="fa fa-lock"></i></span>\n' +
		'					<span style="display: inline-block; font-size: 18px;">未分享</span>\n' +
		'				</div> -->\n' +
		'				<div class="row" style="padding-bottom: 10px;">\n' +
		'					<div class="col-xs-4">种类</div>\n' +
		'					<div class="col-xs-8">{种类}</div>\n' +
		'				</div>\n' +
		'				<div class="row" style="padding-bottom: 10px;">\n' +
		'					<div class="col-xs-4">位置</div>\n' +
		'					<div class="col-xs-8">{位置}</div>\n' +
		'				</div>\n' +
		'				<div class="row" style="padding-bottom: 10px;">\n' +
		'					<div class="col-xs-4">创建者</div>\n' +
		'					<div class="col-xs-8">{创建者}</div>\n' +
		'				</div>\n' +
		'				<div class="row" style="padding-bottom: 10px;">\n' +
		'					<div class="col-xs-4">创建时间</div>\n' +
		'					<div class="col-xs-8">{创建时间}</div>\n' +
		'				</div>\n' +
		'				<div>\n' +
		'					<span class="note" data-empty="1">添加备注</span>\n' +
		'					<span class="pull-right note-toggle" style="display: inline-block; cursor: pointer"><i class="fa fa-pencil"></i></span>\n' +
		'					<textarea class="note-textarea" rows="3" placeholder="请添加备注，按回车键确认" style="width: 100%; display: none; resize: none;" autofocus></textarea>\n' +
		'				</div>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'		<div class="tab-pane fade" id="content2">\n' +
		'			<p>{内容2}</p>\n' +
		'			<p>{内容2}</p>\n' +
		'			<p>{内容2}</p>\n' +
		'			<p>{内容2}</p>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>\n' +
		'</td>'
	);
	
	// toggle
	this.toggle = function(){
		module.toggle(ANIMATION_TIME);
	};
	
	(function(){
		module.css('display', 'none');
		
		/*
		$('.note-toggle').click(function(){
			var isEmpty = $('.note').attr('data-empty');
			if(isEmpty == 1){
				// do something
			}else{
				var text = $('.note').text();
				$('.note-textarea').val(text);
			}
			$('.note, .note-toggle').hide();
			$('.note-textarea').show();
		});
		
		$(".note-textarea").on('keydown', function (e) {
			if (e.keyCode == 13) {
				var text = $(this).val();
				if(text == ""){
					$('.note').text('添加备注');
					$('.note').attr('data-empty', 1);
				}else{
					$('.note').attr('data-empty', 0);
					$('.note').text(text);
				}
				$('.note, .note-toggle').show();
				$('.note-textarea').hide();
			}
		});
		*/
	})();
	
	// 获取module
	this.getModule = function(){
		return module;
	};
};
/* ！右侧信息栏 */

/* 文件右键菜单 */
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
				item.action(target, controller, x, y);
			});
			menu.append(l);
		}
	});
	
	return menu;
};
/* ### */
var menuOverflowFix = function(menu, ev){
	if( (ev.pageY + menu.height()) >  $(window).height() ){
		menu.css({top: ev.pageY-menu.height() + 'px'});
	}
	
	if( (ev.pageX + menu.width()) >  $(window).width() ){
		menu.css({left: ev.pageX-menu.width() + 'px'});
	}
};
/* ### */

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
		authority: 1,
		action: function(){
			LinkBox();
		}
	},
	{
		icon: '<i class="fa fa-share-alt"></i>',
		name: '分享',
		authority: 2,
		action: function(target, controller){
			/*
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
			*/
		}
	},
	{
		icon: '<i class="fa fa-globe"></i>',
		name: '公开',
		authority: 2,
		action: function(target, controller){

		}
	},
	/*{
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
	}*/
];
var FolderMenu = function(ev, id, controller){
	getFolderAuthority(id)
		.then(function(data){
			var target = $(ev.target).closest('[data-type="folder"]');
			var menu = Menu(ev.pageX, ev.pageY, data, FOLDER_MENU_SET, target, controller);
			$('body').append(menu);
			menuOverflowFix(menu, ev);
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
		authority: 1,
		action: function(){
			LinkBox();
		}
	},
	{
		icon: '<i class="fa fa-share-alt"></i>',
		name: '分享',
		authority: 2,
		action: function(target, controller){
			$('#test').modal('show');
			
			if(target.find('.file').attr('data-set') == 1)
				$('#cde').hide();
			else
				$('#cde').show();
			
			$('[data-adduser]').unbind('click');
			$('[data-adduser]').click(function(){
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
					var selectUser = function(users){
						getGroupMembers()
							.then(function(data){
								TwinRowSelectUser('选择要分享的群成员名单', data, users, 
								function(user, modal){
									//selectBox.reloadTailUser(user);
									modal.modal('hide');
								});
							})
							.catch(function(reason){
								console.log(reason);
							});
					};
					selectUser();
				}
			});

		}
	},
	{
		icon: '<i class="fa fa-globe"></i>',
		name: '公开',
		authority: 2,
		action: function(target, controller){

		}
	},
	{
		icon: '<i class="fa fa-cloud-upload"></i>',
		name: '保存到我的云盘',
		authority: 1,
		action: function(target, controller, x, y){
			var id = target.find('.file').attr('data-id');
			selectFolderBox(x, y, id);
			menuOverflowFix($('#selected-box'), {pageX: x, pageY: y});
		}
	},
	/*
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
	*/
];
var FileMenu = function(ev, id, controller){
	getFileAuthority(id)
		.then(function(data){
			var target = $(ev.target).closest('[data-type="file"]');
			var menu = Menu(ev.pageX, ev.pageY, data, FILE_MENU_SET, target, controller);
			$('body').append(menu);
			menuOverflowFix(menu, ev);
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
			updateFile();
		}
	},
	{
		icon: '<i class="fa fa-plus"></i>',
		name: '新建文件夹',
		authority: 1,
		action: function(){
			singleLineInput('新建文件夹', '请输入文件夹名称', function(input, modal){
				modal.modal('hide');
			});
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
		authority: 1,
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
			menuOverflowFix(menu, ev);	
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
				/* {
					type: 'radio',
					value: 1,
					name: '公开',
					icon: '<i class="fa fa-gear"></i>'
				}, */
				{
					type: 'radio',
					value: 2,
					name: '朋友圈',
					icon: '<i class="fa fa-gear"></i>'
				},
				{
					type: 'collapse',
					value: 2,
					name: '部分可见',
					icon: '<i class="fa fa-gear"></i>'
				}/* ,
				{
					type: 'radio',
					value: 4,
					name: '仅自己可见',
					icon: '<i class="fa fa-gear"></i>'
				} */
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
			
			radios[1].sublist = [];
			$.each(tags, function(index, tag){
				radios[1].sublist.push(
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
			
			radios[1].tail = {
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
		'				<div class="details" style="/* display: none; */">\n' +
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
			minimumInputLength: 3,
			ajax: {
				url: '/test_select',
				dataType: 'json',
				type: "GET",
				quietMillis: 50,
				data: function (term) {
					return term;
				},
				processResults: function (data) {
					return {
						results: $.map(data, function (item) {
							return {
									text: item.name,
									id: item.id
							}
						})
					};
				}
			}
			//tags: true
		});
		
		modal.find('[data-action="submit"]').click(function(ev){
			console.log(modal.find('.shared-with').find("option"));
			if(modal.find('.shared-with').find("option[value='" + 2 + "']").length == 0){
				var newOption = new Option('刘强', 2, true, true);
				modal.find('.shared-with').append(newOption).trigger('change');
			}else{
				modal.find('.shared-with').val([2]).trigger('change');
			};
			//console.log(modal.find('.shared-with').select2('data'));
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

var updateFile = function(id, callback){
	var html = $(
		'<div class="modal fade" data-modal="upload">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-body">\n' +
		'				<div class="main-content">\n' +
		'					<div class="modal-header">\n' +
		'						<button type="button" class="close" data-dismiss="modal"><i class="fa fa-close"></i></button>\n' +
		'						<button type="button" class="close minimize" style="margin-right: 5px;"><i class="fa fa-minus-square-o"></i></button>\n' +
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
	
	//加载bootstrap-fileinput插件
	html.find('input').fileinput({
		language: "zh",
		theme: "explorer",
		uploadUrl: '/uploadfile_beta/123' /* + id */,
		allowedFileTypes: ['image', 'html', 'text', 'video', 'audio', 'flash'],
		//allowedFileExtensions: ['jpg', 'png'],
		//maxFileCount: 1,
		//showCaption: true,
		//showPreview: true
		//showRemove: true
		//showUpload: true
		//showCancel: true ?
		//showClose: false
		layoutTemplates: {
			actions: '<div class="file-actions">\n' +
        '    <div class="file-footer-buttons">\n' +
        '        {delete}' +
        '    </div>\n' +
        '    {drag}\n' +
        '    <div class="file-upload-indicator" title="{indicatorTitle}">{indicator}</div>\n' +
        '    <div class="clearfix"></div>\n' +
        '</div>',
			actionDelete: '<button type="button" class="kv-file-remove {removeClass}" title="{removeTitle}"{dataUrl}{dataKey}>{removeIcon}</button>\n',
		}
	});
	
	//上传完成后方法
	html.find('input').on('filebatchuploadcomplete', function(event, data, previewId, index) {
		/* var form = data.form, files = data.files, extra = data.extra,
				response = data.response, reader = data.reader;
		console.log('File uploaded triggered'); */
		if(data.response == 0){
			callAlert('错误！', '<i class="material-icons">clear</i>', function(){});
		}else{
			callAlert('更新成功！', '<i class="material-icons">done</i>', function(){
				//html.modal('hide');
				//callback(data.response)
			});
		}
		
		// clearInterval(timer);
	});
	
	var sycProgress = function(){
		var percentige =  Math.floor(html.find('.kv-upload-progress .progress-bar').width() / html.find('.kv-upload-progress .progress').width()  * 100);
		
		$('#progressbar-leftbot .progress-bar').css({width: percentige + '%'}).text(percentige + '%');
		
	};
	
	var timer = setInterval(sycProgress, 2000);
	
	
	html.on('click', '.minimize', function(){
		var $modal = $(this).closest('.modal');
		//$modal.modal('hide');
		$modal.css('visibility', 'hidden');
		$('.modal-backdrop').css('visibility', 'hidden');
		
		$('#progressbar-leftbot').show(400);
	});
	
	$('#progressbar-leftbot .maximize').unbind('click').click(function(){
		$(this).closest('#progressbar-leftbot').hide(400);
		html.css('visibility', 'visible');
		$('.modal-backdrop').css('visibility', 'visible');
	});
	
	
	html.on('hidden.bs.modal', function(){
		$(this).remove();
		$('#progressbar-leftbot .progress-bar').css({width:  '0%'}).text('0%');
	});
	
	html.modal('show');
};


var selectFolderBox = function(x,y, fid){
	var $module = $(
		'<div id="selected-box">\n' +
		'	<div class="select-header">\n' +
		'		<span data-type="dir">目录名</span>\n' +
		'		<i class="fa fa-arrow-left select-back"></i>\n' +
		'	</div>\n' +
		'	<div class="select-body customized-scrollbar">\n' +
		'	</div>\n' +
		'	<div class="select-footer">\n' +
		'		<a class="btn btn-default pull-right" data-action="close">关闭</a>\n' +
		'		<a class="btn btn-primary pull-right" style="background-color: #4285f4; margin-right: 5px;" data-action="submit">保存</a>\n' +
		'		<div class="clearfix"></div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	var currentid, parentid, selectid;
	
	var setHeader = function(name){
		$module.find('.select-header [data-type="dir"]').text(name);
		if(currentid == 0){
			$module.find('.select-header .select-back').hide();
		}else{
			$module.find('.select-header .select-back').show();
		}
	};
	
	var setBody = function(list){
		$body = $module.find('.select-body');
		$body.empty();
		$.each(list, function(index, item){
			$body.append(
				'<div class="select-item">\n' +
				'	<i class="fa fa-folder" style="margin-right: 5px;"></i>\n' +
				'	<span data-type="name">' + item.name + '</span>\n' +
				'	<i class="fa fa-arrow-right pull-right select-forward" style="cursor: pointer;" data-id="' + item.id + '"></i>\n' +
				'</div>'
			);
		});
	};
	
	var setAll = function(id){
		getMyFolder(id)
			.then(function(result){
				currentid = id;
				selectid = currentid;
				parentid = result.pid;
				setHeader(result.name);
				setBody(result.list);
			}).catch(function(reason){
				console.log(reason);
			});
	};
	
	// 进入目录
	$module.on('click', '.select-forward', function(){
		var id = $(this).attr('data-id');
		setAll(id);
	});
	
	// 返回键
	$module.on('click', '.select-back', function(){
		setAll(parentid);
	});
	
	// 选取
	$module.on('click', '.select-item', function(){
		if($(this).hasClass('active')){
			$module.find('.select-item').removeClass('active');
			selectid = currentid;
		}else{
			$module.find('.select-item').removeClass('active');
			selectid = $(this).find('[data-id]').attr('data-id');
			$(this).addClass('active');
		}

	});
	
	// 关闭
	$module.on('click', '[data-action="close"]', function(){
		$module.remove();
	});
	
	// 提交
	$module.on('click', '[data-action="submit"]', function(){
		callAlert('保存成功', '<i class="material-icons">done</i>', function(){
			//console.log(fid, selectid);
			$module.remove();
		});
	});
	
	setAll(0);
	$('body').append($module.css({top: y, left: x}));
};


