var fun = function(){
	console.log('Test, Test!');
};

var dataBrand = {
	name: 'UTopia',
	href: 'http://127.0.0.1:3000/cloud_index'
};

var dataNavLink = [
	{
		name: '测试1',
		action: fun
	},
	{
		name: '测试2',
		sublist: [
			{
				name: '子菜单',
				action: fun
			},
			{
				name: '子菜单',
				action: fun
			},
			'divider',
			{
				name: '子菜单',
				action: fun
			},
			{
				name: '子菜单',
				action: fun
			}
		]
	}
];


var dataNav1 = $(
	'<ul class="nav navbar-nav  navbar-right" data-type="left-list">\n' +
	'	<li class="dropdown">\n' +
	'		<a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown">\n' +
	'			<i class="fa fa-bell-o"></i> <span style="position: absolute;top: 9px;right: 7px;text-align: center;font-size: 9px;padding: 2px 3px;line-height: .9; background-color: #f39c12; color: rgba(255,255,255,0.8)">3</span>\n' +
	'		</a>\n' +
	'		<ul class="dropdown-menu">\n' +
	'			<!-- 二级子菜单 -->\n' +
	'			<li><a href="javascript: void(0)">这是一条消息</a></li>\n' +
	'			<li class="divider"></li>\n' +
	'			<li><a href="javascript: void(0)">这是一条消息</a></li>\n' +
	'			<li><a href="javascript: void(0)">这是一条消息</a></li>\n' +
	'		</ul>\n' +
	'	</li>\n' +
	'	<li class="dropdown">\n' +
	'		<a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown">\n' +
	'			<i class="fa fa-th"></i>\n' +
	'		</a>\n' +
	'		<div id="google-style-menu" class="dropdown-menu" style="padding-bottom: 0;">\n' +
	'			<ul class="content">\n' +
	'				<li>\n' +
	'					<a href="javascript:void(0);">\n' +
	'						<span class="icon" style="background-position:0 -69px;"></span>\n' +
	'						<span class="text">个人账户</span>\n' +
	'					</a>\n' +
	'				</li>\n' +
	'				<li>\n' +
	'					<a href="javascript:void(0);">\n' +
	'						<span class="icon" style="background-position:0 -1449px"></span>\n' +
	'						<span class="text">云盘</span>\n' +
	'					</a>\n' +
	'				</li>\n' +
		'				<li>\n' +
	'					<a href="javascript:void(0);">\n' +
	'						<span class="icon" style="background-position:0 -1035px"></span>\n' +
	'						<span class="text">动态</span>\n' +
	'					</a>\n' +
	'				</li>\n' +
	'				<li>\n' +
	'					<a href="javascript:void(0);">\n' +
	'						<span class="icon" style="background-position:0 0"></span>\n' +
	'						<span class="text">工作区</span>\n' +
	'					</a>\n' +
	'				</li>\n' +
	'				<li>\n' +
	'					<a href="javascript:void(0);">\n' +
	'						<span class="icon" style="background-position:0 -1518px"></span>\n' +
	'						<span class="text">装备库</span>\n' +
	'					</a>\n' +
	'				</li>\n' +
	'			</ul>\n' +
	'			<div style="text-align: center; background-color: rgba(0,0,0,0.05); padding-top: 10px;padding-bottom: 10px;"><a href="javascript: void(0);" style="text-decoration: none;">更多</a></div>\n' +
	'		</div>\n' +
	'	</li>\n' +
	'	<li class="dropdown">\n' +
	'		<a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" style="padding:5px;">\n' +
	'			<img src="http://127.0.0.1:3000/dist/img/avatar.png" style="height:40px; border-radius: 50%; border: 0.08em solid rgba(0,0,0,0.3);padding: 3px;">\n' +
	'			</span>\n' +
	'		</a>\n' +
	'		<ul class="dropdown-menu">\n' +
	'			<!-- 二级子菜单 -->\n' +
	'			<li><a href="javascript: void(0)"><i class="fa fa-gear"></i> <span>功能1</span></a></li>\n' +
	'			<li><a href="javascript: void(0)"><i class="fa fa-gear"></i> <span>功能2</span></a></li>\n' +
	'			<li><a href="javascript: void(0)"><i class="fa fa-gear"></i> <span>功能3</span></a></li>\n' +
	'			<li class="divider"></li>\n' +
	'			<li><a href="javascript: void(0)"><i class="fa fa-sign-out"></i> <span>退出</span></a></li>\n' +
	'		</ul>\n' +
	'	</li>\n' +
	'</ul>'
);

var dataNav2 = $(
	'<ul class="nav navbar-nav" data-type="left-list">\n' +
	'	<li><a href="javascript: void(0)"><span>根目录</span> <i class="fa fa-angle-right"></i></a></li>\n' +
	'	<li><a href="javascript: void(0)"><span>文件夹1</span> <i class="fa fa-angle-right"></i></a></li>\n' +
	'	<li><a href="javascript: void(0)"><span>文件夹2</span> <i class="fa fa-angle-right"></i></a></li>\n' +
	'	<li><a href="javascript: void(0)"><span>文件夹3</span> <span class="caret"></span></a></li>\n' +
	'</ul>'
);

var dataNav3 = $(
	'<ul class="nav navbar-nav navbar-right" data-type="left-list">\n' +
	'	<li data-ation="toggle"><a href="javascript: void(0)"><i class="fa fa-info-circle" style="font-size: 20px;"></i></a></li>\n' +
	'	<li data-ation="view-toggle"><a href="javascript: void(0)"><i class="fa fa-th" style="font-size: 20px;"></i></a></li>\n' +
	'	<li class="dropdown">\n' +
	'		<a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-gear" style="font-size: 20px;"></i></a>\n' +
	'		<ul class="dropdown-menu">\n' +
	'			<!-- 二级子菜单 -->\n' +
	'			<li><a href="javascript: void(0)">子菜单</a></li>\n' +
	'			<li><a href="javascript: void(0)">子菜单</a></li>\n' +
	'			<li class="divider"></li>\n' +
	'			<li><a href="javascript: void(0)">子菜单</a></li>\n' +
	'			<li><a href="javascript: void(0)">子菜单</a></li>\n' +
	'		</ul>\n' +
	'	</li>\n' +
	'</ul>'
);

var dataMainBlockContent = $(
	'<td>\n' +
	'	<div class="content">\n' +
	'		asdfsdfasfasdfasfs\n' +
	'	</div>\n' +
	'</td>'
);

var dataLeftCollapseNav = [
	{
		icon: '<i class="fa fa-gear"></i>',
		name: '测试测试',
		action: fun
	},
	{
		icon: '<i class="fa fa-gear"></i>',
		name: '测试测试',
		action: fun
	},
	{
		icon: '<i class="fa fa-gear"></i>',
		name: '测试测试',
		action: fun
	},
	'divider',
	{
		icon: '<i class="fa fa-gear"></i>',
		name: '测试测试',
		action: fun
	},
	{
		icon: '<i class="fa fa-gear"></i>',
		name: '测试测试',
		action: fun
	}
];

var dataLeftBlockNav = [
	{
		icon: '<i class="fa fa-cloud"></i>',
		name: '我的云盘',
		action: fun
	},
	{
		icon: '<i class="fa fa-share-alt"></i>',
		name: '分享给我',
		action: fun
	},
	{
		icon: '<i class="fa fa-star"></i>',
		name: '星标',
		action: fun
	},
	'divider',
	{
		icon: '<i class="fa fa-trash"></i>',
		name: '回收站',
		action: fun
	},
	'divider',
	{
		icon: '<i class="fa fa-cloud-upload"></i>',
		name: '升级空间',
		action: fun
	}
];

var dataListOfFolder = [
	{
		id: '1',
		name: '测试文件夹'
	},
	{
		id: '2',
		name: '测试文件夹'
	},
	{
		id: '3',
		name: '测试文件夹'
	},
	{
		id: '4',
		name: '测试文件夹'
	},
	{
		id: '5',
		name: '测试文件夹'
	},
	{
		id: '6',
		name: '测试文件夹'
	}
];

var dataListOfFile = [
	{
		id: '1',
		name: '测试文件',
		src: 'http://127.0.0.1:3000/dist/img/New Text Document.txt'
	},
	{
		id: '2',
		name: '测试文件',
		src: 'http://127.0.0.1:3000/dist/img/extofgong_chen.pdf'
	},
	{
		id: '3',
		name: '测试文件',
		src: 'http://127.0.0.1:3000/dist/img/photo1.png'
	},
	{
		id: '4',
		name: '测试文件',
		src: 'http://127.0.0.1:3000/dist/img/controller.js'
	},
];

var dataMenu = [
	{
		name: '1231',
		action: function(data){
			console.log(data);
		}
	},
	{
		name: '1231',
		action: function(data){
			console.log(data);
		}
	},
	{
		name: '1231',
		action: function(data){
			console.log(data);
		}
	}
];