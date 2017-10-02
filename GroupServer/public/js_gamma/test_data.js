var fun = function(){
	console.log('Test, Test!');
};

var dataBrand = {
	name: 'Transtopia云盘',
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
	'		<a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" style="padding:5px;">\n' +
	'			<img src="http://127.0.0.1:3000/dist/img/avatar.png" style="height:40px; border-radius: 50%; border: 0.08em solid rgba(0,0,0,0.3);">\n' +
	'			<span>张震宇</span><span class="caret"></span>\n' +
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
	'	<li><a href="javascript: void(0)"><i class="fa fa-info-circle" style="font-size: 20px;"></i></a></li>\n' +
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
		icon: '<i class="fa fa-gear"></i>',
		name: '其它',
		action: fun
	},
	'divider',
	{
		icon: '<i class="fa fa-gear"></i>',
		name: '其它',
		action: fun
	},
	{
		icon: '<i class="fa fa-gear"></i>',
		name: '其它',
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