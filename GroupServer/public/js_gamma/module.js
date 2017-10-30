/* 
Beta版本: 模块
1. 顶端一级导航栏 - FirstNavTop
2. 顶端二级导航栏 - SecondNavTop
3. 主控栏 - MainBlock
4. 左侧折叠栏 - LeftCollapse
 */
/* 1. 顶端一级导航栏 */
var FirstNavTop = function(){
	var module = $(
		'<nav class="navbar noselect" style="margin-bottom:0; border-radius:0;border-bottom: none;">\n' +
		'	<div class="container-fluid">\n' +
		'		<!-- Brand and toggle get grouped for better mobile display -->\n' +
		'		<div class="navbar-header">\n' +
		'			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">\n' +
		'				<i class="fa fa-bars"></i>\n' +
		'			</button>\n' +
		'			<a data-type="brand" class="navbar-brand" href="javascript:void(0)" data-type="brand"></a>\n' +
		'		</div>\n' +
		'		<!-- Collect the nav links, forms, and other content for toggling -->\n' +
		'		<div class="collapse navbar-collapse" id="navbar-collapse-1">\n' +
		'			<ul class="nav navbar-nav" data-type="left-list">\n' +
		'				<!-- 左侧按钮列表 -->\n' +
		'			</ul>\n' +
		'			<form class="navbar-form navbar-left">\n' +
		'				<div class="form-group">\n' +
		'					<input type="text" class="form-control" placeholder="搜索" data-type="search">\n' +
		'				</div>\n' +
		'			</form>\n' +
		'			<ul class="nav navbar-nav navbar-right">\n' +
		'				<!-- 右侧按钮列表 -->\n' +
		'			</ul>\n' +
		'		</div>\n' +
		'	</div\n' +
		'</nav>'
	);

	// 1)设置商标
	this.setBrand = function(title, href){
		module.find('[data-type="brand"]').attr('href', href).text(title);
	};
	
	// 2)设置page标签
	this.appendPage = function(title){
		module.find('.navbar-header')
			.append('<span data-type="page" class="navbar-brand" href="javascript:void(0)" style="cursor: default;">' + title + '</span>');
	};
	
	// 3)设置collapse btn
	this.appendCollapseBtn = function(callback){
		var btn = $(
			'<a class="navbar-brand" href="javascript:void(0)" data-type="btn-collapse">\n' +
			'	<i class="fa fa-bars"></i>\n' +
			'</a>'
		);
		
		btn.unbind('click')
			.click(function(){
				$('.left-collapse').toggle(ANIMATION_TIME);
			});
			
		module.find('.navbar-header').append(btn);
	};
	
	// 4)添加Nav
	this.appendNav = function(nav){
		module.find('#navbar-collapse-1').append(nav);
	};
	
	// 5)设置Search
	this.setSearch = function(){
		
	};
	
	
	// 6)获取module
	this.getModule = function(){
		return module;
	};
	
	
	// 设置靠左list
	/* this.setLeftBtnList = function(leftList){
		var container = module.find('[data-type="left-list"]');
		
		$.each(leftList, function(index, item){
			if(item.sublist){
				var menu = getLinkMenu(item.name, item.sublist);
				container.append(menu);
			}else{
				var link = getLinkBtn(item.name, item.action);
				container.append(link);
			}
		});
	}; */
};

/* 2. 顶端二级导航栏 */
var SecondNavTop = function(){
	var module = $(
		'<nav class="navbar noselect" style="margin-bottom:0; border-radius:0;border-top: none;">\n' +
		'	<div class="container-fluid">\n' +
		'		<!-- Brand and toggle get grouped for better mobile display -->\n' +
		'		<div class="navbar-header">\n' +
		'			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-2">\n' +
		'			<i class="fa fa-bars"></i>\n' +
		'			</button>\n' +
		'		</div>\n' +
		'		<div class="collapse navbar-collapse" id="navbar-collapse-2" >\n' +
		'			<!-- 填充栏 -->\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</nav>'
	);
	
	// 1)设置导航
	this.appendNav = function(nav){
		module.find('#navbar-collapse-2').append(nav);
	};
	
	// 2)获取module
	this.getModule = function(){
		return module;
	};
};

/* 3. 主控栏 */
var MainBlock = function(){
	var module = $(
		'<table class="main-block noselect">\n' +
		'	<tbody>\n' +
		'		<tr>\n' +
		'			<!-- 主控区域内容 -->\n' +
		'		</tr>\n' +
		'	</tbody>\n' +
		'</table>'
	);
	
	// 1)添加模块
	this.add = function(block){
		module.find('tbody tr').append(block);
	};
	
	// 2)清空模块
	this.clear = function(){
		module.find('tbody tr').empty();
	};
	
	// 3)获取module
	this.getModule = function(){
		return module;
	};
};

/* 4. 左侧折叠栏 */
const LEFT_COLLAPSE = [
	{
		icon: '<i class="fa fa-list-ol"></i>',
		name: '动态',
		href: '#'
	},
	{
		icon: '<i class="fa fa-fire"></i>',
		name: '社群',
		href: '#'
	},
	{
		icon: '<i class="fa fa-users"></i>',
		name: '人脉',
		href: '#'
	},
	{
		icon: '<i class="fa fa-user-circle"></i>',
		name: '个人',
		href: '#'
	},
	{
		icon: '<i class="fa fa-commenting-o"></i>',
		name: '消息',
		href: '#'
	},
	'divider',
	{
		icon: '<i class="fa fa-gear"></i>',
		name: '设置',
		href: '#'
	},
	{
		icon: '<i class="fa fa-exclamation-triangle"></i>',
		name: '反馈',
		href: '#'
	},
	{
		icon: '<i class="fa fa-question-circle"></i>',
		name: '帮助',
		href: '#'
	}
];
var LeftCollapse = function(){
	var module = $(
		'<div class="left-collapse customized-scrollbar">\n' +
		'	<div class="brand">\n' +
		'		<span class="title noselect"><a href="javascript:void(0)" style="text-decoration:none;color: rgba(0,0,0,.5);">Transtopia</a></span>\n' +
		'		<span data-toggle="left-collapse" class="pull-right"><i class="fa fa-arrow-left"></i></span>\n' +
		'	</div>\n' +
		'	<ul class="nav-list noselect" style="min-height: calc(100vh - 75px - 43px);">\n' +
		'		<!-- 导航按钮 -->\n' +
		'	</ul>	\n' +
		'	<div class="about-trans noselect" style="padding: 0 15px 15px 15px;color: rgba(0,0,0,0.3); font-weight: 600;">\n' +
		'		<p style=" margin:0;">©2017 Transtopia • Privacy </p>\n' +
		'		<p style="margin:0;">Policy • Terms of Service </p>\n' +
		'		<p style="margin:0;">Region • Brands </p>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	// 1)设置标题
	this.setBrand = function(title, href){
		module.find('.brand .title a').attr('href', href).text(title);
	};
	
	// 2)设置nav list
	this.setNav = function(navList){
		var container = module.find('.nav-list').empty();
		
		$.each(navList, function(index, nav){
			if(nav == 'divider')
				container.append('<li class="divider"></li>');
			else{
				var link = $('<li class="item"><a href="javascript:void(0)">' + nav.icon + nav.name + '</a></li>\n');
				link.click(function(){
					window.location.href = nav.href;
				});
				container.append(link)
			}
		});
	};
	
	// 3)获取module
	this.getModule = function(){
		return module;
	};
	
	// 默认加载
	(function(){
		// 加载Toggle 按钮
		module.find('[data-toggle="left-collapse"]').click(function(){
			module.toggle(200);
		});
	})();
};

/* 辅助方法 */
/* A.获取 menu link */
var getLinkMenu = function(name, sublink){
	var menu = $(
		'<li class="dropdown">\n' +
		'	<a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown">' + name + '<span class="caret"></span></a>\n' +
		'	<ul class="dropdown-menu">\n' +
		'		<!-- 二级子菜单 -->\n' +
		'	</ul>\n' +
		'</li>'
	);
	var dropMenu = menu.find('.dropdown-menu');
	$.each(sublink, function(index, subitem){
		if(subitem == 'divider'){
			dropMenu.append('<li class="divider"></li>\n');
		}else{
			var link = getLinkBtn(subitem.name, subitem.action);
			
			dropMenu.append(link);
		}
	});
	return menu;
};

/* B.获取btn link */
var getLinkBtn = function(name, action){
	var link = $('<li><a href="javascript: void(0)">' + name + '</a></li>\n');
	link.click(function(ev){
		action(ev);
	});
	return link;
};

