var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
var rimraf = require('rimraf');
var path = require('path');

/* GET home page. */
router.get('/group_index', function(req, res, next){
	res.render('group_index', {});
});

router.get('/getgroupdata', function(req, res, next) {
	if(req.query.id == 1)
		res.json({
			temp: '管理员',
			name: '交托帮',
			image: 'dist/img/default6.png',
			bg: 'dist/img/default_group_bg.jpg',
			numberofmembers: '15',
			description: '几何设计、交通组织设计、交通设施、水泥混凝土路面的板块划分、竖向设计及排水设计等',
			genre: ['资讯', '日记', '视频'],
			topic: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程'],
			followed: 1,
			isMember: 1,
			dataMenu: [
				{
					name: '群组信息',
					action: '$().createEditGroupModal({'+
													'authority: 1,'+
													'temp: \'普通成员\','+
													'name: \'交托帮\','+
													'image: \'dist/img/default6.png\','+
													'bg: \'dist/img/default_group_bg.jpg\','+
													'numberofmembers: \'15\','+
													'description: \'几何设计、交通组织设计、交通设施、水泥混凝土路面的板块划分、竖向设计及排水设计等\','+
													'genre: [\'资讯\', \'日记\', \'视频\'],'+
													'topic: [\'设计\', \'交叉口设计\', \'信号灯设计\', \'统计\', \'软件工程\']});'
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
			],
			navtop1: {
				title: '群组1111111111111',
				name: '张震宇',
				image: 'dist/img/avatar04.png',
			},
			navtop2:[
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
			],
			btnrightbot:[
				{
					title: '创建群组',
					icon: 'fa-user-plus',
					action: '$().createNewGroupModal()'
				},
				{
					title: '查看群文件',
					icon: 'fa-folder-open-o',
					action: '$(transCloudModal).transCloud({title: \'文件管理\', dirFull: \'/TransCloud/交托帮\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML})'
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
			]
		});
	else if(req.query.id == 2)
		res.json({
			temp: '普通游客',
			name: '交托帮',
			image: 'dist/img/default6.png',
			bg: 'dist/img/default_group_bg.jpg',
			numberofmembers: '15',
			description: '几何设计、交通组织设计、交通设施、水泥混凝土路面的板块划分、竖向设计及排水设计等',
			genre: ['资讯', '日记', '视频'],
			topic: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程'],
			followed: 0,
			isMember: 0,
			dataMenu: [],
			navtop1: {
				title: '群组',
				name: '张震宇',
				image: 'dist/img/avatar04.png',
			},
			navtop2:[
				{
					name: '群公告',
					action: ''
				},
				{
					 name: '群动态',
					 action: ''
				},
				{
					name: '关注者',
					action: ''
				}
			],
			btnrightbot:[
				{
					title: '创建群组',
					icon: 'fa-user-plus',
					action: '$().createNewGroupModal()'
				}
			]
		});
	else if(req.query.id == 3)
		res.json({
			temp: '普通成员',
			name: '交托帮',
			image: 'dist/img/default6.png',
			bg: 'dist/img/default_group_bg.jpg',
			numberofmembers: '15',
			description: '几何设计、交通组织设计、交通设施、水泥混凝土路面的板块划分、竖向设计及排水设计等',
			genre: ['资讯', '日记', '视频'],
			topic: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程'],
			followed: 1,
			isMember: 1,
			dataMenu: [
				{
					name: '群组信息',
					action: '$().createEditGroupModal({'+
													'authority: 0,'+
													'temp: \'普通成员\','+
													'name: \'交托帮\','+
													'image: \'dist/img/default6.png\','+
													'bg: \'dist/img/default_group_bg.jpg\','+
													'numberofmembers: \'15\','+
													'description: \'几何设计、交通组织设计、交通设施、水泥混凝土路面的板块划分、竖向设计及排水设计等\','+
													'genre: [\'资讯\', \'日记\', \'视频\'],'+
													'topic: [\'设计\', \'交叉口设计\', \'信号灯设计\', \'统计\', \'软件工程\']});'
				},{
					name: '退出群组',
					action: 'callAlert(\'退出群组\',\'done\', 0);;'
				}
			],
			navtop1: {
				title: '群组',
				name: '张震宇',
				image: 'dist/img/avatar04.png',
			},
			navtop2:[
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
			],
			btnrightbot:[
				{
					title: '创建群组',
					icon: 'fa-user-plus',
					action: '$().createNewGroupModal()'
				},{
					title: '查看群文件',
					icon: 'fa-folder-open-o',
					action: '$(transCloudModal).transCloud({title: \'文件管理\', dirFull: \'/TransCloud/交托帮\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML})'
				}
			]
		});
});

module.exports = router;
