var data_group_navtop_1st = {
	title: '群组',
	name: '张震宇',
	image: 'dist/img/avatar04.png',
};
var data_userlist_2 = [
	{
		id: 1,
		name: '刘明',
		image: 'dist/img/avatar04.png',
		bg: 'dist/img/default_group_bg.jpg',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonFriends: ['江方怡', '王钊'],
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	},{
		id: 1,
		name: '付强',
		image: 'dist/img/avatar04.png',
		bg: 'dist/img/default_group_bg.jpg',
		gender: 1,
		sign: '成長要學會獨處　雖然有一點孤獨',
		commonFriends: ['江方怡', '王钊'],
		commonGenres: ['资讯', '日记', '视频'],
		commonTopics: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']
	}
];
		
var data_group_navtop_2nd = [
	{
		name: '群公告',
		action: ''
	},
	{
		 name: '群动态',
		 action: ''
	},
	{
		name: '群成员',
		sublist: [
			{
				name: '成员列表',
				action: ''
			},
			{
				name: '群加入申请',
				action: ''
			}
		]
	},
	{
		name: '关注群用户',
		action: ''
	},
	{
		name: '群问题',
		action: ''
	},
	{
		name: '群任务',
		action: ''
	}
];

var data_group_menutop = [
	{
		name: '群组信息',
		action: '$().createEditGroupModal(data_group);'
	},{
		name: '设置',
		action: '$(\'#modal-group-privacy\').modal(\'show\');'
	},{
		name: '成员管理',
		sublist: [
			{
				name: '新成员申请',
				action: 'initModalListBlock(\'新成员申请\', data_userlist_1, 3);'
			},{
				name: '成员列表',
				action: 'initModalTag(\'成员\', \'face\', data_userlist_1, data_userlist_2, \'action1\', \'action2\');'
			},
			{
				name: '身份设定',
				action: 'alert(1)'
			},
			{
				name: '成员设定',
				action: 'alert(2)'
			}
		]
	},{
		name: '黑名单',
		action: 
		'$().singleRowModal({' +
		'	title: \'测试窗口\',' +
		'	data: data_userlist_2,' +
		'	funcCard1: createUserCard,' +
		'	actionMenu: [' +
		'		{' +
		'			name: \'移出黑名单\',' +
		'			action: \'/test123\'' +
		'		}' +
		'	],' +
		'	funcCard2: createModalFunctionCardHTML1,' +
		'	funcCardInput2: {' +
		'		title: \'新增头衔\',' +
		'		cardTitle: \'添加头衔\',' +
		'		action: \'/test123\'' +
		'	},' +
		'});'
	},{
		name: '产品与服务',
		action: '$(\'#modal-test\').modal(\'show\');'
	},{
		name: '账号与安全',
		action: ''
	},{
		name: '定位',
		action: 'alert(1);'
	},{
		name: '投诉',
		action: 'alert(1);'
	},{
		name: '费用',
		action: 'alert(1);'
	},{
		name: '删除并退出',
		action: 'alert(1);'
	}
];

var data_group = {
	authority: 0,
	name: '交托帮',
	image: 'dist/img/default6.png',
	bg: 'dist/img/default_group_bg.jpg',
	numberofmembers: '15',
	description: '几何设计、交通组织设计、交通设施、水泥混凝土路面的板块划分、竖向设计及排水设计等',
	genre: ['资讯', '日记', '视频'],
	topic: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程'],
	followed: 0,
	isMember: 0,
	dataMenu: data_group_menutop
};



var data_group_btn_rightbot = [
	{
		title: '创建群组',
		icon: 'fa-user-plus',
		action: '$().createNewGroupModal()'
	},
	{
		title: '创建群任务',
		icon: 'fa-tasks',
		action: ''
	},
	{
		title: '发布群动态',
		icon: 'fa-pencil',
		action: ''
	},
];

var data_files = [
	{
		type: 2,
		dir: "/交托帮/文件夹1",
		name: '文件夹1',
		icon: 'folder_open',
		bgcolor: "rgb(119, 143, 155)"
	},{
		type: 2,
		dir: "/交托帮/文件夹2",
		name: '文件夹2',
		icon: 'folder_open',
		bgcolor: "rgb(119, 143, 155)"
	},{
		type: 1,
		dir: "/交托帮/文件1.md",
		name: '文件1.txt',
		bgcolor: "rgb(29, 135, 228)"
	},{
		type: 1,
		dir: "/交托帮/文件2.md",
		name: '文件2.txt',
		bgcolor: "rgb(29, 135, 228)"
	},{
		type: 1,
		dir: "/交托帮/文件3.md",
		name: '文件3.txt',
		bgcolor: "rgb(29, 135, 228)"
	}
];