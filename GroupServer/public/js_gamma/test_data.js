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

var dataNav = [
	$(
		'<ul class="nav navbar-nav" data-type="left-list">\n' +
		'	<li><a href="javascript: void(0)">测试1</a></li>\n' +
		'	<li class="dropdown">\n' +
		'		<a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown">测试2<span class="caret"></span></a>\n' +
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
	),
	$(
		'<ul class="nav navbar-nav navbar-right" data-type="left-list">\n' +
		'	<li><a href="javascript: void(0)">测试1</a></li>\n' +
		'	<li class="dropdown">\n' +
		'		<a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown">测试2<span class="caret"></span></a>\n' +
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
	)
];


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