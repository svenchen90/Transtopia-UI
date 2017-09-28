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
	
	// 清空
	this.clear = function(){
		module.find('.content:first').empty();
	};
	
	// 添加
	this.append = function(block){
		module.find('.content:first').append(block);
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
var FileFolderBlock = function(){
	var module = $(
		'<div class="file-folder-block">\n' +
		'	<!-- 标题 -->\n' +
		'	<div class="title" style="margin-bottom: 15px; line-height: 40px;">\n' +
		'		<span data-name="title" style="color: rgba(0,0,0,.54); font-weight: 600;">文件夹</span>\n' +
		'		<span class="pull-right">\n' +
		'			<span class="dropdown">\n' +
		'				<a data-name="sort-by" href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" style="margin-right: 10px;color: rgba(0,0,0,.54); font-weight: 600; text-decoration: none;">{Dropdown}</a>\n' +
		'				<ul data-name="sort-by-menu" class="dropdown-menu dropdown-menu-right">\n' +
		'					<!-- Sort By -->\n' +
		'				</ul>\n' +
		'			</span>\n' +
		'			<span data-name="ascending"><i class="fa fa-arrow-up"></i></span>\n' +
		'		</span>\n' +
		'	</div>\n' +
		'	<!--  文件夹 -->\n' +
		'	<div class="file-folder-content row">\n' +
		'		<!-- 文件夹内容 -->\n' +
		'	</div>\n' +
		'	<p style="text-align:center;"><span class="btn loadmore">加载更多...</span></p>\n' +
		'</div>'
	);
	
	var sortBy = 0,
		ascending = 1;
	
	// 设置标题栏
	this.setTitle = function(title){
		module.find('[data-name="title"] [data-name="title"]').text(title);
	};
	
	// 设置排序filter
	this.setSortBy = function(menu){
		var container = module.find('[data-name="sort-by-menu"]');
		var sort = module.find('[data-name="sort-by"]');
		var ascend = module.find('[data-name="ascending"]');
		
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
		
		//初始化
		sort.text(menu[0].name);
		sortBy = menu[0].value;
		ascending = 1;
	};
	
	// 清空文件列表
	this.clear = function(){
		module.find('.file-folder-content').empty();
	};
	
	// 加载数据 不清空数据
	this.loadFileFolder = function(list){
		var container = module.find('.file-folder-content');
		
		$.each(list, function(index, item){
			container.append(item);
		});
	};
	
	//获取模块
	this.getModule = function(){
		return module;
	};
};

// 文件夹控制器
var FolderController = function(){
	var obj = this;
	var data = [];
	
	
	// 获取一个文件夹
	this.getFolder = function(data){
		var folder = $(
			'<div class="col-lg-2 col-md-4 col-sm-6" folder>\n' +
			'	<div class="folder noselect" title="' + data.name + '">\n' +
			'		<span class="icon"><i class="fa fa-folder"></i></span>\n' +
			'		<span class="name">' + data.name + '</span>\n' +
			'	</div>\n' +
			'</div>'
		);
		return folder;
	};
	
	this.getFolderList = function(list){
		var result = [];
		$.each(list, function(index, item){
			result.push(obj.getFolder(item));
		});
		return result;
	};
};

var FileController = function(){
	var obj = this;
	var data = [];
	
	
	// 获取一个文件夹
	this.getFile = function(data){
		var file = $(
			'<div class="col-lg-2 col-md-4 col-sm-6" file>\n' +
			'	<div class="file noselect">\n' +
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
	};
	
	var getIcon = function(name){
		return '<i class="fa fa-file-excel-o"></i>';
	};
	
	this.getFileList = function(list){
		var result = [];
		$.each(list, function(index, item){
			result.push(obj.getFile(item));
		});
		return result;
	};
};

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