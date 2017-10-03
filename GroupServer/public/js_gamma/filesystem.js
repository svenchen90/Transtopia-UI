// 左侧导航栏
var LeftBlock_FS = function(){
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
			if(item == 'divider')
				container.append('<li class="divider"></li>');
			else{
				var nav = $('<li class="item noselect"><a href="javascript: void(0)">' + item.icon + item.name + '</a></li>');
				nav.click(function(ev){
					item.action(ev);
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
 var MiddleBlock_FS = function(){
	var module = $(
		'<td class="middle-block">\n' +
		'	<div class="content customized-scrollbar">\n' +
		'		<!-- 填充内容 -->\n' +
		'	</div>\n' +
		'</td>'
	);
	var obj = this;
	var currentDir,sortBy,ascending;
	var folderBlock = new FileFolderBlock(new Folder());
	var fileBlock = new FileFolderBlock(new File());
	
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

			if($(ev.target).closest('.folder')[0]){
				var id = $(ev.target).closest('.folder').attr('data-id');
				$.ajax({
					url : GET_AUTHORITY_FOLDER,
					data: {
						id: id
					},
					type : "GET",
					dataType : 'json',
					success : function (result){
						var menu = Menu(ev.pageX, ev.pageY,result,folderMenuSet);
						$('body').append(menu);
						menu.show(300);
					},
					error: function(err){
						console.log(err);
					}
				});
			}else if($(ev.target).closest('.file')[0]){
				var id = $(ev.target).closest('.folder').attr('data-id');
				$.ajax({
					url : GET_AUTHORITY_FILE,
					data: {
						id: id
					},
					type : "GET",
					dataType : 'json',
					success : function (result){
						var menu = Menu(ev.pageX, ev.pageY,result,fileMenuSet);
						$('body').append(menu);
						menu.show(300);
					},
					error: function(err){
						console.log(err);
					}
				});
			}else {
				console.log(3);
			}
		});
		
		$('body').on(' contextmenu',function(ev){
			$('.customize-menu').remove();
		});
		$(window).on('resize click', function(ev){
			$('.customize-menu').remove();
		});
		
	};
	// 右键点击事件
	/* folder.find('.folder').contextmenu(function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		

		var id = $(this).attr('data-id');
		$.ajax({
			url : GET_AUTHORITY_FOLDER,
			data: {
				id: id
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				var menu = Menu(ev.pageX, ev.pageY,result,folderMenuSet);
				$('body').append(menu);
				menu.show(300);
			},
			error: function(err){
				console.log(err);
			}
		});
		
		
	});
	
	 */
	
	
	
	// 初始化
	(function(){
		initSortBy(SORTBYMENU);
		initMenu();
		
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
				folderBlock.addList(result.folder);
				fileBlock.addList(result.file);
			},
			error: function(err){
				console.log(err);
			}
		});
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
var FileFolderBlock = function(modal){
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
	//var sortBy = 0,
	//	ascending = 1;
	
	//var dirs = [];
	
	// 设置标题栏
	this.setTitle = function(title){
		module.find('[data-name="title"]').text(title);
	};
	
	
	// 添加单个
	this.add = function(d){
		var f = modal.generator(d, data.length);
		var fObj = $.extend({}, d, {target: f});
		data.push(fObj);
		module.find('.file-folder-content').append(f)		
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
	this.generator = function(data, index){
		if(validate(data)){
			var folder = $(
				'<div class="col-lg-2 col-md-4 col-sm-6" data-type="folder">\n' +
				'	<div class="folder noselect" title="' + data.name + '" data-index="' + index + '" data-id="' + data.id + '">\n' +
				'		<span class="icon"><i class="fa fa-folder"></i></span>\n' +
				'		<span class="name">' + data.name + '</span>\n' +
				'	</div>\n' +
				'</div>'
			);
			
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
	this.generator = function(data, index){
		if(validate(data)){
			var file = $(
				'<div class="col-lg-2 col-md-4 col-sm-6" data-type="file">\n' +
				'	<div class="file noselect" title="' + data.name + '" data-index="' + index + '" data-id="' + data.id + '">\n' +
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

// 右侧信息栏
var RightBlock_FS = function(){
	var module = $(
		'<td class="right-block">\n' +
		'	<div class="content customized-scrollbar">\n' +
		'		<!-- 内容 -->\n' +
		'	</div>\n' +
		'</td>'
	);
	
	// 获取module
	this.getModule = function(){
		return module;
	};
};

const folderMenuSet = [
	{
		icon: '<i class="fa fa-folder-open-o"></i>',
		name: '打开',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-files-o"></i>',
		name: '复制',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-scissors"></i>',
		name: '剪切',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-clipboard"></i>',
		name: '粘贴',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-eraser"></i>',
		name: '重命名',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-trash-o"></i>',
		name: '删除',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-link"></i>',
		name: '链接',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-eye"></i>',
		name: '观看权限',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-key"></i>',
		name: '修改权限',
		action: function(){
			
		}
	}
];

const fileMenuSet = [
	{
		icon: '<i class="fa fa-folder-open-o"></i>',
		name: '打开',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-files-o"></i>',
		name: '复制',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-scissors"></i>',
		name: '剪切',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-eraser"></i>',
		name: '重命名',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-trash-o"></i>',
		name: '删除',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-link"></i>',
		name: '链接',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-eye"></i>',
		name: '观看权限',
		action: function(){
			
		}
	},
	{
		icon: '<i class="fa fa-key"></i>',
		name: '修改权限',
		action: function(){
			
		}
	}
];

// 右键菜单
var Menu = function(x, y, list, folderMenuSet){
	var menu = $(
		'<ul class="dropdown-menu customize-menu" style="position: absolute; top: ' + y + 'px; left: ' + x + 'px;">\n' +
		'	<!-- 二级子菜单 -->\n' +
		'</ul>\n'
	);
	
	if(!Array.isArray(list) || list.length == 0)
		return '';
	else{
		$.each(list, function(index, i){
			var item = folderMenuSet[i];
			var l = $('<li><a href="javascript: void(0)">' + item.icon + item.name + '</a></li>\n');
			l.click(function(){
				item.action();
			})
			menu.append(l);
		});	
		return menu;
	}
};
