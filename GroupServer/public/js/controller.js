/* 
全局： 
	1. 加载置顶一级导航栏 - FirstNavTopController
	2. 加载置顶二级导航栏 - SecondNavTopController
	3. 加载左侧折叠式导航栏 - CollapseNavLeftController
	4. 加载左下角按钮组件 - RightBotBtnController
	10. 动态发布/修改控件 - PostController
Group：
	5. 左侧群组栏控件 - LeftModuleController
	6. 更新群组信息模态框组件 - UpdateGroupInfoController
	7. 修改群设置模态框组件 - UpdateGroupSettingController(groupID)
	8. 查看群设置模态框控件 - CheckGroupSettingController(groupID)
	9. 创建新群组模态框控件 - CreateGroupController()
 */

/* 常量 */
$.fn.modal.Constructor.DEFAULTS.backdrop = 'static';
const URLPrefix = 'http://127.0.0.1:3000';
const ImageURLPrefix = 'http://127.0.0.1:3000/';
 
 
/* 1. 加载置顶一级导航栏 */
var FirstNavTopController = function(target){
	var module = $(
		'<div class="module-nav-top-first">\n' +
		'	<div class="logo">\n' +
		'		<span class="logo-mini"><b>T</b></span>\n' +
		'		<span class="logo-lg"><a href="index.jsp"><b>Transtopia</b></a></span>\n' +
		'	</div>\n' +
		'	<nav class="navbar navbar-static-top nav-top-first">\n' +
		'		<!-- Sidebar toggle button-->\n' +
		'		<a id="btn-sidebar-toggle" href="#" class="sidebar-toggle">\n' +
		'			<span class="sr-only">Toggle navigation</span>\n' +
		'			<span class="icon-bar"></span>\n' +
		'			<span class="icon-bar"></span>\n' +
		'			<span class="icon-bar"></span>\n' +
		'		</a>\n' +
		'		<div class="collapse navbar-collapse pull-left" id="navbar-collapse">\n' +
		'			<ul class="nav navbar-nav">\n' +
		'				<li><a href="#" class="current-page" data-name="title"><!-- 名称 --></a></li>\n' +
		'			</ul>\n' +
		'			<form class="navbar-form navbar-left">\n' +
		'				<select id="input-search" type="text" class="form-control" data-placeholder="搜索..."></select>\n' +
		'			</form>\n' +
		'		</div>\n' +
		'		<div class="navbar-custom-menu">\n' +
		'			<ul class="nav navbar-nav">\n' +
		'				<li class="dropdown messages-menu search-menu">\n' +
		'					<a href="" class="dropdown-toggle" data-toggle="dropdown">\n' +
		'							<i class="fa fa-search"></i>\n' +
		'					</a>\n' +
		'					<ul class="dropdown-menu">\n' +
		'						<li>\n' +
		'								<input type="text" class="form-control" placeholder="搜索..." />\n' +
		'						</li>\n' +
		'					</ul>\n' +
		'				</li>\n' +
		'				<!-- Messages: style can be found in dropdown.less-->\n' +
		'				<li class="dropdown messages-menu">\n' +
		'					<a href="#">\n' +
		'							<i class="fa fa-envelope-o"></i>\n' +
		'							<span class="label label-success">4</span>\n' +
		'					</a>\n' +
		'				</li>\n' +
		'				<!-- Notifications: style can be found in dropdown.less -->\n' +
		'				<li class="dropdown notifications-menu">\n' +
		'					<a href="#" >\n' +
		'							<i class="fa fa-bell-o"></i>\n' +
		'							<span class="label label-warning">10</span>\n' +
		'					</a>\n' +
		'				</li>\n' +
		'				<!-- Tasks: style can be found in dropdown.less -->\n' +
		'				<li class="dropdown tasks-menu">\n' +
		'					<a href="#">\n' +
		'							<i class="fa fa-address-book-o"></i>\n' +
		'							<span class="label label-danger">9</span>\n' +
		'					</a>\n' +
		'				</li>\n' +
		'				<!-- User Account: style can be found in dropdown.less -->\n' +
		'				<li class="dropdown user user-menu">\n' +
		'					<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
		'						<img class="user-image" data-name="userimage" /><!-- 用户图片 -->\n' +
		'						<span class="hidden-xs" data-name="username"><!-- 用户名称 --></span>\n' +
		'					</a>\n' +
		'				</li>\n' +
		'				<!-- Control Sidebar Toggle Button -->\n' +
		'				<li>\n' +
		'					<a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>\n' +
		'				</li>\n' +
		'			</ul>\n' +
		'		</div>\n' +
		'	</nav>\n' +
		'</div>'
	);
	
	//初始化
	(function(){
		//展开左侧影藏导航栏
		module.find('.sidebar-toggle').on('click', function(e){
			$( ".sidebar-collapse" ).toggle("slow");
		});
	})();
	
	this.load = function(data){
		module.find('[data-name="title"]').text(data.title);
		module.find('[data-name="userimage"]').prop('src', data.image);
		module.find('[data-name="username"]').text(data.name);
		
		target.empty();
		target.append(module);
	};
	
};


/* 2. 加载置顶二级导航栏 */
var SecondNavTopController = function(target){
	var module = $(
		'<nav class="navbar navbar-static-top nav-top-second">\n' +
		'	<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse">\n' +
		'		<i class="fa fa-list"></i>\n' +
		'	</button>\n' +
		'	<div class="container">\n' +
		'		<div class="collapse navbar-collapse" id="example-navbar-collapse">\n' +
		'			<ul class="nav navbar-nav">\n' +	
		'			</ul>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</nav>'
	);
	
	//通用加载方式
	this.load = function(data){
		$.each(data, function(index, item){
			if(item.sublist == undefined){
				var temp = $('<li><a href="javascript: void(0);">' + item.name + '</a></li>');
				$(temp).on('click', function(){
					item.action();
				});
				module.find('ul:first').append(temp);
			}else{
				//仅支持单级菜单
				var temp = $(
				'<li class="dropdown">\n' + 
				'	<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
				'		' + item.name +' \n' +
				'		<b class="caret"></b>\n' +
				'	</a>\n' +
				'	<ul class="dropdown-menu">\n' +
				'	</ul>\n' +
				'</li>'
				);
				//加载菜单选项
				$.each(item.sublist, function(i, sub){
					var temp2 = $('<li><a href="javascript: void(0);">' + sub.name + '</a></li>');
					$(temp2).on('click', function(){
						sub.action();
					});
					$(temp).find('.dropdown-menu:eq(0)').append(temp2);
				});

				module.find('ul:first').append(temp);
			}
		});
		
		target.empty();
		target.append(module);
	};
	
	
	// 群组过滤器
	this.getDataGroupSecondNavTop = function(authority, id){
		var data = [];
		if(authority.includes(22)){
			//加载群组公告
			data.push({
				name: '群公告',
				action: ''
			});
		}
		//加载群动态
		data.push({
			name: '群动态',
			action: ''
		});
			
		//加载群成员
		if(authority.includes(6) || authority.includes(7)){
			var temp = {
				name: '群成员',
				sublist: []
			};
			//群成员列表
			if(authority.includes(6)){
				temp.sublist.push({
					name: '成员列表',
					action: ''
				});
			}
			//成员申请列表
			if(authority.includes(7)){
				temp.sublist.push({
					name: '新成员申请列表',
					action: ''
				});
			}
			
			data.push(temp);
		}
			
		if(authority.includes(11)){
			//加载群组公告
			data.push({
				name: '关注者',
				action: ''
			});
		}
		
		if(authority.includes(24)){
			//加载群组任务
			data.push({
				name: '群任务',
				action: ''
			});
		}
		
		if(authority.includes(25)){
			//加载群组提问
			data.push({
				name: '群提问',
				action: ''
			});
		}
		return data;
	};
};


/* 3. 加载左侧折叠式导航栏 */
var CollapseNavLeftController = function(target){
	var module = $(
		'<aside class="sidebar-collapse">\n' +
		'	<ul class="sidebar-menu">\n' +
		'		<div class="brand">\n' +
		'			<a href="#" class="title">Transtopia</a>\n' +
		'			<a href="#" class="btn-hide pull-right"><i class="material-icons">chevron_left</i></a>\n' +
		'		</div>\n' +
		'		<li class="item"><a href="javascript:void(0);"><i class="fa fa-list-ol"></i><span>发现</span></a></li>\n' +
		'		<li class="item"><a href="javascript:void(0);"><i class="fa fa-commenting-o"></i><span>消息</span></a></li>\n' +
		'		<li class="item"><a href="javascript:void(0);"><i class="fa fa-fire"></i><span>社群</span></a></li>\n' +  
		'		<li class="item"><a href="javascript:void(0);"><i class="fa fa-star"></i><span>人脉</span></a></li>\n' +
		'		<li class="item"><a href="javascript:void(0);"><i class="fa fa-user-o"></i><span>个人</span></a></li>\n' +
		'		<li class="divider"></li>\n' +
		'		<li class="item"><a href="javascript:void(0);"><i class="fa fa-gear"></i><span>设置</span></a></li>\n' +
		'		<li class="item"><a href="javascript:void(0);"><i class="fa fa-exclamation-triangle"></i><span>反馈</span></a></li>\n' +
		'		<li class="item"><a href="javascript:void(0);"><i class="fa fa-question-circle"></i><span>帮助</span></a></li>\n' +
		'	</ul>\n' +
		'	<div class="bottom">\n' +
		'		<p>©2017 Transtopia</p>\n' +
		'		<p><a href="#" class="underline">使用交托帮前必读</a> - <a href="#" class="underline">意见反馈</a></p>\n' +
		'		<p>京ICP证030173号  京公网安备11000002000001号</p>\n' +
		'	</div>\n' +
		'</aside>'
	);
	
	//初始化
	(function(){
		// 影藏折叠菜单
		module.find('.btn-hide').on('click', function(e){
			$('.sidebar-collapse').hide("slow");
		});
	})();

	
	this.load = function(){
		target.empty();
		target.append(module);
		
	}
};

/* 4. 加载左下角按钮组件 */
var RightBotBtnController = function(target){
	var btnHTML = $('<a class="btn btn-success btn-lg switch-rightbot btn-rightbot"><i class="fa fa-plus"></i></a>');
	var blockHTML = $('<div class="block-rightbot"></div>');
	
	//初始化
	(function(){
		//根按钮点击事件
		$(btnHTML).on('click', function(){
			$(this).find('i').toggleClass('fa-plus').toggleClass('fa-minus');
			$(blockHTML).toggle(200);
		});
		
		
	})();
	
	//通用加载
	this.load = function(data){
		$.each(data, function(index, item){
			var temp = $(
				'<div>\n' +
				'	<span>' + item.name + '</span>\n' +
				'	<a href="javascript:void(0);" class="btn btn-success btn-lg btn-rightbot"><i class="fa ' + item.icon + '"></i></a>\n' +
				'</div>'
			);
			$(temp).on('click', function(){
					item.action();
			});
			$(blockHTML).append(temp);
		});
		 
		target.empty();
		target.append(btnHTML);
		target.append(blockHTML);
	};
	
	
	this.getDataGroupRightBotBtn = function(authority, id){
		var data = [];
		
		//创建群组
		data.push({
			name: '创建群组',
			icon: 'fa-user-plus',
			action: function(){
				var CGController = new CreateGroupController();
			}
		});
		
		//查看群文件
		data.push({
			name: '查看群文件',
			icon: 'fa-folder-open-o',
			action: function(){
				$(transCloudModal).transCloud({title: '文件管理', dirFull: '/TransCloud/交托帮', dirRoot: '/TransCloud', dataRequest: '/getFileFolder', createCard: createFileCardHTML})
			}
		});
		
		if(authority.includes(16)){
			//发起群组动态
			data.push({
				name: '发布群组动态',
				icon: 'fa-send-o',
				action: function(){
					var PController = new PostController();
					PController.groupNewPost(id)
				}
			});
		}
		
		if(authority.includes(19)){
			//创建群组任务
			data.push({
				name: '创建群组任务',
				icon: 'fa-tasks',
				action: ''
			});
		}
		
		if(authority.includes(20)){
			//发起群组提问
			data.push({
				name: '发起群组提问',
				icon: 'fa-question',
				action: ''
			});
		}
		
		return data;
	};
	
};


/* 5. 左侧群组栏控件 */
var LeftModuleController = function(target){
	var module = $(
		'<div class="module-left">\n' +
		'	<div class="menu-top">\n' +
		'		<!-- <a href="#" class="pull-right" style="color: rgba(255,255,255,1);"><i class="material-icons">share</i></a> -->\n' +
		'		<span class="menu pull-right"></span>\n' +
		'	</div>\n' +
		'	<div class="img-background">\n' +
		'		<img data-name="bg_image" />\n' +
		'	</div>\n' +
		'	<div class="main-content">\n' +
		'		<div class="img-block">\n' +
		'			<img class="img-circle" data-name="image" />\n' +
		'		</div>\n' +
		'		<div class="sign-block">\n' +
		'			<span data-name="membercount"></span> - \n' +
		'			<span data-name="introduction"></span>\n' +
		'		</div>\n' +
		'		<div class="name" data-name="name"></div>\n' +
		'		<div class="detail">\n' +
		'			<span><i class="fa fa-pencil"></i> 群组类别</span>\n' +
		'			<p data-name="category"></p>\n' +
		'		</div>\n' +
		'		<div class="detail">\n' +
		'			<span><i class="fa fa-tags"></i> 群组话题</span>\n' +
		'			<p data-name="tag"></p>\n' +
		'		</div>	\n' +
		'		<div class="search-block">\n' +
		'			<i class="fa fa-search"> </i>\n' +
		'			<input type="text" placeholder="搜索..." />\n' +
		'		</div>\n' +
		'		<div class="detail btn-block">\n' +
		'		</div>\n' +
		'		<div class="clearfix"></div>\n' + 
		'		<div class="form-group">\n' +
		'			<div style="text-align: center;"><img name="qr_image" data-name="qr" style="height: 180px;"/></div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	
	//加载信息
	this.load = function(data){
		//加载顶端菜单
		this.addMenu(data.roleinfo, data.id);
		
		module.find('[data-name="bg_image"]').prop('src', data.bg_image);
		module.find('[data-name="image"]').prop('src', data.image);
		module.find('[data-name="membercount"]').text('共' + data.innerGroupNumber + '位成员');
		module.find('[data-name="introduction"]').text(data.introduction);
		module.find('[data-name="name"]').text(data.name);
		
		// 加载群组类别
		this.loadCategory(data.category);
		
		// 加载群组兴趣
		this.loadTag(data.tags);
		
		/* 加载按钮 */
		this.loadBtnGroup(data.role, data.isMember, data.followed);

		//加载QR
		module.find('[data-name="qr"]').prop('src', 'dist/img/Qr-code-ver-10.png');
		
		target.empty();
		target.append(module);
	};
	
	//加载群组类别
	this.loadCategory = function(list){
		module.find('[data-name="category"]').empty();
		if(list.length == 0)
			module.find('[data-name="category"]').append('暂无');
		else
			$.each(list, function(i, g){
				module.find('[data-name="category"]').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
			});
	};
	
	//加载群组兴趣
	this.loadTag = function(list){
		module.find('[data-name="tag"]').empty();
		if(list.length == 0)
			module.find('[data-name="tag"]').append('暂无');
		else
			$.each(list, function(i, t){
				module.find('[data-name="tag"]').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + t + '</span>');
			});
	};
	
	//加载按钮组
	this.loadBtnGroup = function(role, isMember, followed){
		module.find('.btn-block').empty();
		
		
		// 关注 / 取关
		if(isMember == 1){
			//成员不予许取关
		}else if(followed == 0){
			var btn = newBtn('关注群组', 'check_box');
			
			module.find('.btn-block').append(btn);
		}else if(followed == 1){
			var btn = newBtn('取消关注', 'indeterminate_check_box');
			
			module.find('.btn-block').append(btn);
		}else{
			console.log('待完成');
		}
		
		// 申请加入 / 退群 
		if(role == 1){
			//超级管理员不予许退出
		}else if(isMember == 0){
			var btn = newBtn('申请加入', 'group_add');
			
			module.find('.btn-block').append(btn);
		}else if(isMember == 1){
			var btn = newBtn('退出群组', 'not_interested');
			
			module.find('.btn-block').append(btn);
		}else{
			console.log('待完成');
		}
		
		
		
	};
	
	this.addMenu = function(authority, id){
		var data = getDataGroupMenu(authority, id);
		var menu = createMenu(data);
		module.find('.menu-top .menu').append(menu);
	}
	
	// 新建按钮方法
	var newBtn = function(name, icon){
		return $(
			'<a href="javascript:void(0);" class="pull-right" title="' + name + '">\n' +
			'	<i class="material-icons" style="font-size: 40px; color: #00a65a; padding-left: 15px;">' + icon + '</i>\n' +
			'</a>'
		);
	};
	
	//获取菜单信息
	var getDataGroupMenu = function(authority, id){
		var data = [];
		
		if(authority.includes(2)){
			//修改群信息
			data.push({
				name: '群组信息',
				action: function(){
					var UGIController = new UpdateGroupInfoController(id);
					UGIController.ajaxLoad();
				}
			});
		}
		
		if(authority.includes(3)){
			//查看群设置
			data.push({
				name: '查看设置',
				action: function(){
					var CGSController = new CheckGroupSettingController(id);
					CGSController.ajaxLoad();
				}
			});
		}
		
		if(authority.includes(4)){
			//修改群设置
			data.push({
				name: '修改设置',
				action: function(){
					var UGSController = new UpdateGroupSettingController(id);
					UGSController.ajaxLoad();
				}
			});
		}
		
		//成员管理
		if(authority.includes(7) || authority.includes(8) || authority.includes(9)){
			var temp = {
				name: '成员管理',
				sublist: []
			};
			//新成员申请
			if(authority.includes(7)){
				temp.sublist.push({
					name: '新成员申请',
					action: ''
				});
			}
			
			if(authority.includes(8)){
				//成员列表
				temp.sublist.push({
					name: '成员列表',
					action: ''
				});
				//自定义列表
				temp.sublist.push({
					name: '自定义列表',
					action: ''
				});
			}
			
			if(authority.includes(9)){
				//成员列表
				temp.sublist.push({
					name: '管理员列表',
					action: ''
				});
			}
			
			data.push(temp);
		}
		
		if(authority.includes(12)){
			//黑名单
			data.push({
				name: '黑名单',
				action: function(){
					groupBlackListController(id);
				}
			});
		}
		
		if(authority.includes(18)){
			//产品与服务
			data.push({
				name: '产品与服务',
				action: ''
			});
		}
		
		if(authority.includes(21)){
			//注销群组
			data.push({
				name: '解散群组',
				action: ''
			});
		}
		
		return data;
	};
};

/* 6. 更新群组信息模态框组件 */
var UpdateGroupInfoController = function(groupID){
	var modal = $(
		'<div class="modal fade" id="modal-group-edit">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-body">\n' +
		'				<div class="menu-top">\n' +
		'					<span class="close pull-left" data-dismiss="modal">&times;</span>\n' +
		'					<span>修改群组信息</span>\n' +
		'					<span class="pull-right" data-action="submit">完成</span>\n' +
		'					<div class="clearfix"></div>\n' +
		'				</div>\n' +
		'				<div class="background-img">\n' +
		'					<img data-target="bg_image" />\n' +
		'				</div>\n' +
		'				<div class="background-edit">\n' +
		'					<a class="pull-right"><i class="fa fa-camera"></i></a>\n' +					
		'					<div class="clearfix"></div>\n' +
		'				</div>\n' +
		'				<div class="img-edit">\n' +
		'					<img class="img-circle" data-target="image" />\n' +
		'				</div>\n' +
		'				<div class="main-content">\n' +
		'					<div class="form-group">\n' +
		'						<p><i class="fa fa-user-o"></i> 群组名称</p>\n' +
		'						<input class="form-control input-lg" name="name" />\n' +
		'					</div>\n' +
		'					<div class="form-group">\n' +
		'						<p><i class="fa fa-pencil-square"></i> 群组简介</p>\n' +
		'						<textarea class="form-control input-lg" name="introduction" ></textarea>\n' +
		'					</div>\n' +
		'					<div class="form-group">\n' +
		'						<p><i class="fa fa-pencil"></i> 兴趣类别 <span class="pull-right"><a href="#" data-action="editcategory">修改</a></span></p>\n' +
		'						<div name="category" style="margin-top:10px;">\n' +
		'						</div>\n' +
		'					</div>\n' +
		'					<div class="form-group">\n' +
		'						<p><i class="fa fa-tags"></i> 兴趣话题 <span class="pull-right"><a href="#" data-action="edittag">修改</a></span></p>\n' +
		'						<div name="tag" style="margin-top:10px;">\n' +		
		'						</div>\n' +
		'					</div>\n' +	
		'				</div>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
		);
	
	
	var obj = this
	this.ajaxLoad = function(){
		$.ajax({
			url : URLPrefix + '/group/get-instance/' + groupID,
			data: {},
			cache : true, 
			async : true,
			type : "GET",
			dataType : 'json',
			success : function (data){
				if(data == 0){
					//error message
					callAlert('加载失败！', '<i class="material-icons">clear</i>', function(){});
				}else{
					obj.load(data);
				}
			},
			error: function(err){
				callAlert('加载失败！', '<i class="material-icons">clear</i>', function(){});
			}
		});
	};
	
	//加载数据
	this.load = function(data){
		modal.find('[data-target="bg_image"]').prop('src', ImageURLPrefix + data.bg_image);
		modal.find('[data-target="image"]').prop('src', ImageURLPrefix + data.image);
		modal.find('[name="name"]').prop('value', data.name);
		modal.find('[name="introduction"]').text(data.introduction);
		
		// 加载群组类别
		loadCategory(data.category);
		
		//加载群组兴趣
		loadTag(data.tags);
	};
	
	// 加载群组类别
	var loadCategory = function(list){
		modal.find('[name="category"]').empty();
		
		if(list.length == 0)
			modal.find('[name="category"]').append('<span style="color: rgba(0,0,0,0.54); margin-left: 15px;">暂无</span>');
		else
			$.each(list, function(i, g){
				modal.find('[name="category"]').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
			});
	};
	
	// 加载群组兴趣
	var loadTag = function(list){
		modal.find('[name="tag"]').empty();
		
		if(list.length == 0)
			modal.find('[name="tag"]').append('<span style="color: rgba(0,0,0,0.54); margin-left: 15px;">暂无</span>');
		else
			$.each(list, function(i, t){
				modal.find('[name="tag"]').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + t + '</span>');
			});
	};
	
	//获取数据
	this.getData = function(){
		var data = {
			name: modal.find('[name="name"]').prop('value'),
			introduction: modal.find('[name="introduction"]').text()
		};
		
		data.category = getCategory();;
		
		data.tags = getTag();
		
		return data;
	};
	
	var getCategory = function(){
		var category = [];
		$.each(modal.find('[name="category"] .label'), function(index, item){
			category.push($(item).text());
		});
		return category;
	}
	
	var getTag = function(){
		var tags = [];
		$.each(modal.find('[name="tag"] .label'), function(index, item){
			tags.push($(item).text());
		});
		return tags;
	};
	
	//更新群头像
	var updateGroupImage = function(src){
		modal.find('[data-target="image"]').prop('src', ImageURLPrefix + src);
	};
	
	//更新群头像
	var updateGroupBGImage = function(src){
		modal.find('[data-target="bg_image"]').prop('src', ImageURLPrefix + src);
	};
	

	//初始化
	(function(){
		//加载slimscroll
		modal.find('[name="introduction"]').slimScroll({
			width: '100%',
			height: '68px' 
		});
		
		//submit
		modal.find('[data-action="submit"]').on('click', function(){
			$.ajax({
				url : URLPrefix + '/group/chen-operation/25/' + groupID,
				data: obj.getData(),
				cache : true, 
				async : true,
				type : "GET",
				dataType : 'json',
				success : function (data){
					if(data == 0){
						//error message
						callAlert('错误！', '<i class="material-icons">clear</i>', function(){});
					}else{
						callAlert('修改成功！', '<i class="material-icons">done</i>', function(){
							modal.modal('hide');
							//###刷新页面
						});
					}
				},
				error: function(err){
					callAlert('错误！', '<i class="material-icons">clear</i>', function(){});
				}
			});
		});
		
		//更新图片
		modal.find('[data-target="image"]').on('click', function(){
			updateImage(groupID, '/uploadfile_beta', updateGroupImage);
		});
		
		//更新背景图片
		modal.find('.background-edit > a').on('click', function(){
			updateImage(groupID, '/uploadfile_beta', updateGroupBGImage);
		});
		
		//修改群组种类
		modal.find('[data-action="editcategory"]').on('click', function(){
			var MController = new multiController('群组类别', '<i class="material-icons">loyalty</i>');
			MController.load(getCategory(), '/group/operation/get-all-category/', '/group/operation/add-category/', function(data){
				loadCategory(data);
			});
		});
		
		//修改群组种类
		modal.find('[data-action="edittag"]').on('click', function(){
			var MController = new multiController('群组兴趣', '<i class="material-icons">loyalty</i>');
			MController.load(getTag(), '/group/operation/get-all-tag/', '/group/operation/add-tag/', function(data){
				loadTag(data);
			});
		});
		
		//关闭模态框时，自动删除
		modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
			
		modal.modal('show');
	})();
	
};

/* 7. 修改群设置模态框组件 */
var UpdateGroupSettingController = function(groupID){
	var modal = $(
		'<div class="modal fade">\n' + 
		'	<div class="modal-dialog">\n' + 
		'		<div class="modal-content">\n' + 
		'			<div class="modal-header">\n' + 
		'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' + 
		'				<h4 class="modal-title">群组隐私设置</h4>\n' + 
		'			</div>\n' + 
		'			<div class="modal-body">\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">新成员加入时需要验证</div>\n' + 
		'					<div class="col-xs-2">\n' + 
		'						<label class="switch">\n' + 
		'							<input name="allow_new_member_validation" type="checkbox">\n' + 
		'							<div class="slider round"></div>\n' + 
		'						</label>\n' + 
		'					</div>\n' + 
		'				</div>\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">接收新成员加入</div>\n' + 
		'					<div class="col-xs-2">\n' + 
		'						<label class="switch">\n' + 
		'							<input name="allow_new_member_in" type="checkbox">\n' + 
		'							<div class="slider round"></div>\n' + 
		'						</label>\n' + 
		'					</div>\n' + 
		'				</div>\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">允许群被关注</div>\n' + 
		'					<div class="col-xs-2">\n' + 
		'						<label class="switch">\n' + 
		'							<input name="allow_new_following" type="checkbox">\n' + 
		'							<div class="slider round"></div>\n' + 
		'						</label>\n' + 
		'					</div>\n' + 
		'				</div>\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">允许群组名片被分享</div>\n' + 
		'					<div class="col-xs-2">\n' + 
		'						<label class="switch">\n' + 
		'							<input name="allow_group_share" type="checkbox">\n' + 
		'							<div class="slider round"></div>\n' + 
		'						</label>\n' + 
		'					</div>\n' + 
		'				</div>\n' +
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">只允许关注者分享动态</div>\n' + 
		'					<div class="col-xs-2">\n' + 
		'						<label class="switch">\n' + 
		'							<input name="allow_post_share_following" type="checkbox">\n' + 
		'							<div class="slider round"></div>\n' + 
		'						</label>\n' + 
		'					</div>\n' + 
		'				</div>\n' + 
		'			</div>\n' + 
		'			<div class="modal-footer">\n' + 
		'				<a data-dismiss="modal">关闭</a>\n' + 
		'			</div>\n' + 
		'		</div>\n' + 
		'	</div>\n' + 
		'</div>'
	);
	
	var obj = this;
	this.ajaxLoad = function(){
		$.ajax({
			url : URLPrefix + '/group/get-instance/' + groupID,
			data: {},
			cache : true, 
			async : true,
			type : "GET",
			dataType : 'json',
			success : function (data){
				if(data == 0){
					//error message
				}else{
					//加载数据
					obj.load(data);
				}
			}
		});
	};
	
	//加载数据
	this.load = function(data){
		modal.find('[name="allow_new_member_validation"]').prop('checked', data.allow_new_member_validation);
		modal.find('[name="allow_new_member_in"]').prop('checked', data.allow_new_member_in);
		modal.find('[name="allow_new_following"]').prop('checked', data.allow_new_following);
		modal.find('[name="allow_group_share"]').prop('checked', data.allow_group_share);
		modal.find('[name="allow_post_share_following"]').prop('checked', data.allow_post_share_following);
	};
	
	//获取表单数据
	this.getFormData = function(){
		var formData = {
			allow_new_member_validation: modal.find('[name="allow_new_member_validation"]').is(':checked') ? 1 : 0, //新成员加入时需要验证
			allow_new_member_in: modal.find('[name="allow_new_member_in"]').is(':checked') ? 1 : 0, //接收新成员加入
			allow_new_following: modal.find('[name="allow_new_following"]').is(':checked') ? 1 : 0, //允许群被关注
			allow_group_share: modal.find('[name="allow_group_share"]').is(':checked') ? 1 : 0, //允许群组名片被分享
			allow_post_share_following: modal.find('[name="allow_post_share_following"]').is(':checked') ? 1 : 0, // 只允许关注者分享动态
		};
		return formData;
	};
	
	//初始化
	(function(){
		//提交表单事件
		modal.find('[type="checkbox"]').on('change', function(){
			var optionMap = {
				allow_group_share: 0,
				allow_new_following: 1,
				allow_new_member_validation: 2,
				allow_post_share_following: 3,
				allow_new_member_in: 4,
				allow_post_notice: 5,
				status: 6
			};	
			
			var value = $(this).prop('checked') ? 1 : 0;
			var option = optionMap[$(this).prop('name')];
			var target = this;

			
			$.ajax({
				url : URLPrefix + '/group/chen-operation/26/' + groupID + '/' + option + '/' + value,
				cache : true, 
				async : true,
				type : "GET",
				dataType : 'json',
				success : function (result){
					if(result == 0){
						//error message
						callAlert('错误！', '<i class="material-icons">clear</i>', function(){
							$(target).prop('checked', (value + 1)%2);
						});
						
					}else{
						callAlert('修改成功！', '<i class="material-icons">done</i>', function(){});
					}
				},
				error: function(err){
					callAlert('错误！', '<i class="material-icons">clear</i>', function(){
						$(target).prop('checked', (value + 1)%2);
					});
				}
			});
		});
		
		//关闭时清楚模块
		modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		//显示模态框
		modal.modal('show');
	})();
};

/* 8. 查看群设置模态框控件 */
var CheckGroupSettingController = function(groupID){
	var modal = $(
		'<div class="modal fade">\n' + 
		'	<div class="modal-dialog">\n' + 
		'		<div class="modal-content">\n' + 
		'			<div class="modal-header">\n' + 
		'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' + 
		'				<h4 class="modal-title">群组设置</h4>\n' + 
		'			</div>\n' + 
		'			<div class="modal-body">\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">新成员加入时需要验证</div>\n' + 
		'					<div class="col-xs-2" name="allow_new_member_validation">\n' + 
		'					</div>\n' + 
		'				</div>\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">接收新成员加入</div>\n' + 
		'					<div class="col-xs-2" name="allow_new_member_in">\n' + 
		'					</div>\n' + 
		'				</div>\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">允许群被关注</div>\n' + 
		'					<div class="col-xs-2" name="allow_new_following">\n' + 
		'					</div>\n' + 
		'				</div>\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">允许群组名片被分享</div>\n' + 
		'					<div class="col-xs-2" name="allow_group_share">\n' + 
		'					</div>\n' + 
		'				</div>\n' +
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">只允许关注者分享动态</div>\n' + 
		'					<div class="col-xs-2" name="allow_post_share_following">\n' + 
		'					</div>\n' + 
		'				</div>\n' + 
		'			</div>\n' + 
		'			<div class="modal-footer">\n' + 
		'				<a data-dismiss="modal">关闭</a>\n' + 
		'			</div>\n' + 
		'		</div>\n' + 
		'	</div>\n' + 
		'</div>'
	);
	
	var obj = this;
	this.ajaxLoad = function(){
		$.ajax({
			url : URLPrefix + '/group/get-instance/' + groupID,
			data: {},
			cache : true, 
			async : true,
			type : "GET",
			dataType : 'json',
			success : function (data){
				if(data == 0){
					//error message
				}else{
					//加载数据
					obj.load(data);
					

				}
			}
		});
	};
	
	
	//加载数据
	this.load = function(data){
		var doneStyle = '<i class="material-icons" style="font-weight: bold;color: rgba(0,255,0,.5);">done</i>';
		var clearStyle = '<i class="material-icons" style="font-weight: bold;color: rgba(255,0,0,.5);">clear</i>';

		modal.find('[name="allow_new_member_validation"]').append(data.allow_new_member_validation ? doneStyle : clearStyle);
		modal.find('[name="allow_new_member_in"]').append(data.allow_new_member_in ? doneStyle : clearStyle);
		modal.find('[name="allow_new_following"]').append(data.allow_new_following ? doneStyle : clearStyle);
		modal.find('[name="allow_group_share"]').append(data.allow_group_share ? doneStyle : clearStyle);
		modal.find('[name="allow_post_share_following"]').append(data.allow_post_share_following ? doneStyle : clearStyle);
	};
	
	//初始化
	(function(){
		//关闭时清楚模块
		modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		//显示模态框
		modal.modal('show');
	})();
};


/* 9. 创建新群组模态框控件 */
var CreateGroupController = function(){
	var html = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-body">\n' +
		'				<div class="main-content">\n' +
		'					<div class="modal-header">\n' +
		'						<button type="button" class="close" data-dismiss="modal">×</button>\n' +
		'						<h4 class="modal-title">新建群组</h4>\n' +
		'					</div>\n' +
		'					<div style="margin: 15px;">\n' +
		'						<div class="form-group">\n' +
		'							<input class="form-control input-lg" style="border-top: none;border-left: none;border-right: none;" placeholder="请输入群名称" />\n' +
		'							<div class="err-msg" data-target="name" style="color: rgba(255,0,0,0.8);font-size: 12px;font-weight: 400;margin-top:5px;padding-left: 15px;display: none;">\n' +
		'							</div>\n' +
		'						</div>\n' +
		'						<div class="row">\n' +
		'							<div class="col-xs-10 menu-label" style="padding-left: 30px;">成员申请验证</div>\n' +
		'							<div class="col-xs-2">\n' +
		'								<label class="switch">\n' +
		'									<input type="checkbox" checked>\n' +
		'									<div class="slider round"></div>\n' +
		'								</label>\n' +
		'							</div>\n' +
		'						</div>\n' +
		'						<div style="color: rgba(0,0,0,0.54);font-size: 12px;font-weight: 400;padding-left: 15px;">新成员加入时需要验证</div>\n' +
		'					</div>\n' +
		'				</div>\n' +
		'				<div class="modal-footer">\n' +
		'					<a style="font-weight: 600;color: rgba(0,0,0,0.54); float: left; margin-left: 15px;">更多选项</a>\n' +
		'					<a data-dismiss="modal" style="font-weight: 600;color: rgba(0,0,0,0.54);">关闭</a>\n' +
		'					<a class="btn-submit" href="#" style="font-weight: 600;">确认</a>\n' +
		'				</div>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	//获取数据
	var getData = function(){
		return {
			name: html.find('input:eq(0)').val(),
			askToJoin: html.find('input[type=\'checkbox\']').is(':checked')
		};
	};
	
	//验证表单
	var validation = function(data){
		if(data.name == ""){
			html.find('.err-msg[data-target="name"]').text('群组名不能为空');
			html.find('.err-msg[data-target="name"]').show();
			return false;
		}else if(data.name.length > 20){
			html.find('.err-msg[data-target="name"]').text('群组名不得超过20个字');
			html.find('.err-msg[data-target="name"]').show();
			return false;
		}else{
			html.find('.err-msg[data-target="name"]').hide();
			return true;
		}
	};
	
	
	//初始化
	(function(){
		$(html).find('.btn-submit').on('click', function(){
			//获取数据
			var data = getData();
			
			//验证
			if(validation(data)){
				//提交
				$.ajax({
					url : '/group/operation/create-group/',
					data: data,
					cache : false, 
					async : false,
					type : "GET",
					dataType : 'json',
					success : function (result){
						if(result == 0){
							callAlert('创建失败！', '<i class="material-icons">clear</i>', function(){});
						}else{
							callAlert('创建成功！', '<i class="material-icons">done</i>', function(){
								html.modal('hide');
								//result{gid: groupid, gname: groupname}
							});
						}
					},
					error: function(err){
						callAlert('创建失败！', '<i class="material-icons">clear</i>', function(){});
					}
				});
			}else{
				//表单验证未通过
			}
		});
		
		//关闭后自动清除
		html.on('hidden.bs.modal', function(){
			$(this).remove();
		});

		html.modal('show');
	})();
};

/* 10. 动态发布/修改控件 - PostController */
var PostController = function(){
	/* 
	data: {
		id:
	}
	 */
	var modal = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
		'				<h5 class="modal-title">\n' +
		'					<img data-name="image" style="width: 50px;height: 50px; padding: 2px; border: 2px solid #d2d6de;border-radius: 50%;"/>\n' +
		'					<b class="fa fa-caret-right" style="font-size: 16px; margin-left:5px;"></b>\n' +
		'					<a href="javascript:void(0);" data-action="sharedwith"><i class="fa fa-globe"></i></a>\n' +
		'					<span data-target="sharewith" data-value=""></span>\n' +
		'				</h5>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div class="form-group">\n' +
		'					<label>标题</label>\n' +
		'					<input name="title" class="form-control" placeholder="请输入标题">\n' +
		'				</div>\n' +
		'				<div class="editor-block" style="padding-bottom: 15px;"></div>\n' + 
		'				<div class="form-group">\n' +
		'						<label>允许被分享: </label>\n' +
		'						<label class="pull-right switch">\n' +
		'						<input name="allowshared" type="checkbox" checked>\n' +
		'							<div class="slider round"></div>\n' +
		'						</label>\n' +
		'				</div>\n' +
		'				<div class="form-group">\n' +
		'						<label>兴趣类别: </label>\n' +
		'						<a href="javascript:void(0);" class="pull-right" data-target="catagories"><i class="fa fa-plus-square"></i></a>\n' +
		'						<div class="clearfix"></div>\n' +
		'						<p data-value="catagories">\n' +
		'						</p>\n' +
		'				</div>\n' +
		'				<div class="form-group">\n' +
		'						<label>兴趣话题: </label>\n' +
		'						<a href="javascript:void(0);" class="pull-right" data-target="tags"><i class="fa fa-plus-square"></i></a>\n' +
		'						<div class="clearfix"></div>\n' +
		'						<p data-value="tags">\n' +
		'						</p>\n' +
		'				</div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a data-action="submit">提交</a>\n' +
		'				<a data-dismiss="modal">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	//初始化editor
	var editor = getEditor(); 
	
	
	// 获取category数据
	var getCategory = function(){
		var category = [];
		$.each(modal.find('[data-value="catagories"] .label'), function(index, item){
			category.push($(item).text());
		});
		return category;
	};
	
	// 加载category数据
	var loadCategory = function(list){
		modal.find('[data-value="catagories"]').empty();
		
		if(list.length == 0)
			modal.find('[data-value="catagories"]').append('<span style="color: rgba(0,0,0,0.54); margin-left: 15px;">暂无</span>');
		else
			$.each(list, function(i, g){
				modal.find('[data-value="catagories"]').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
			});
	};
	
	
	// 获取tag数据
	var getTag = function(){
		var tags = [];
		$.each(modal.find('[data-value="tags"] .label'), function(index, item){
			tags.push($(item).text());
		});
		return tags;
	};
	
	// 加载tag数据
	var loadTag = function(list){
		modal.find('[data-value="tags"]').empty();
		
		if(list.length == 0)
			modal.find('[data-value="tags"]').append('<span style="color: rgba(0,0,0,0.54); margin-left: 15px;">暂无</span>');
		else
			$.each(list, function(i, g){
				modal.find('[data-value="tags"]').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
			});
	};
	
	
	
	this.groupNewPost = function(gid){
		//加载图片
		$.ajax({
			url : URLPrefix + '/group/get-instance/' + gid,
			data: {},
			cache : true, 
			async : true,
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 0){
					callAlert('加载失败！', '<i class="material-icons">error_outline</i>', function(){});
				}else{
					modal.find('[data-name="image"]').prop('src', result.image);
				}
			},
			error: function(err){
				callAlert('加载失败！', '<i class="material-icons">error_outline</i>', function(){});
			}
		});
		
		//初始化群组分享范围
		modal.find('[data-action="sharedwith"]').on('click', function(){
			var currentValue = modal.find('[data-target="sharewith"]').attr('data-value');
			shareWithForGroup(currentValue);
		});
		
		//确定提交 ?????
		modal.find('[data-action="submit"]').on('click', function(){
			//获取数据
			var cata = getCategory();
			var tags = getTag();
			
			
			var content = $('<div>' + $(editor).find('#editor').html() + '</div>');
			// 处理图片
			var images = [];
			$.each(content.find('img'), function(index, item){
				
				if($(item).attr("src").startsWith("data:image")){
					images.push($(item).attr("src"));
					content.find('img:eq(' + index + ')').attr("src", gid + "_" + index + ".png");
				}
			});
			
			
			var post = {
				gid: gid,
				title: $(modal).find('[name="title"]').val(),
				content: content.html(),
				category: cata,
				tags: tags,
				authority: $(modal).find('[data-target="sharewith"]').attr('data-value'),
				allowshare: ($(modal).find('[type="checkbox"]').is(':checked') ? 1 : 0),
				images: JSON.stringify(images)
			};
			
			
			console.log(post);
			
			//获取geo
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position){
					post.lat = position.coords.latitude;
					post.lng = position.coords.longitude;
					
					$.ajax({
						url : URLPrefix + '/group/chen-operation/14',
						data: post,
						cache : true, 
						async : true,
						type : "POST",
						dataType : 'json',
						success : function (result){
							if(result == 0){
								callAlert('发布失败！', '<i class="material-icons">error_outline</i>', function(){});
							}else{
								callAlert('发布成功！', '<i class="material-icons">done</i>', function(){
									modal.modal('hide');
								});
							}
						},
						error: function(err){
							callAlert('发布失败！', '<i class="material-icons">error_outline</i>', function(){});
						}
					});
				});
			}else { 
				//错误提示
				console.log('无法获取路径！');
			}
		});
	};
	
	
	//初始化
	(function(){
		//加载编辑器
		modal.find('.editor-block').append(editor);
		
		//加载兴趣类别
		modal.find('[data-target="catagories"]').on('click', function(){
			//获取当前值
			var list = [];
			
			$.each(modal.find('[data-value="catagories"] .label'), function(index, item){
				list.push($(item).text());
			});
			
			var MController = new multiController('动态类别', '<i class="material-icons">loyalty</i>');
			MController.load(getCategory(), '/group/operation/get-all-category/', '/group/operation/add-category/', function(data){
				loadCategory(data);
			});
			
		});
		
		//加载兴趣话题
		$(modal).find('[data-target="tags"]').on('click', function(){
			//获取当前值
			var list = [];

			$.each($(modal).find('[data-value="tags"] > span'), function(index, item){
				list.push($(item).text());
			});
			
			var MController = new multiController('兴趣类别', '<i class="material-icons">loyalty</i>');
			MController.load(getTag(), '/group/operation/get-all-tag/', '/group/operation/add-tag/', function(data){
					loadTag(data);
				});
		});
		
		modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});

		modal.modal('show');
		
	})();
	
	
	
	
	/* 局部方法 */
	//初始化群组分享范围
	var shareWithForGroup = function(value){
		var sharedWithModal = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
		'				<h5 class="modal-title">请选择您想要分享的范围</h5>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div class="form-group">\n' +
		'          <label style="display: block; padding-left: 15px;">\n' +
		'            <input type="radio" name="r1" class="minimal" value="1">公开\n' +
		'          </label>\n' +
		'          <label style="display: block; padding-left: 15px;">\n' +
		'            <input type="radio" name="r1" class="minimal" value="2"> 仅群组可见\n' +
		'          </label>\n' +
		'        </div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a data-action="submit">提交</a>\n' +
		'				<a data-dismiss="modal">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
		);
		
		//初始化
		(function(){
			//赋值
			sharedWithModal.find('[type="radio"][value="' + value + '"]').prop('checked', 'checked');
			
			//提交表单
			sharedWithModal.find('[data-action="submit"]').on('click',function(){
				//获取被checked的按钮值
				var value = sharedWithModal.find('[type="radio"]:checked').val();
				modal.find('[data-target="sharewith"]').attr('data-value', value);
				if(value == 1){
					modal.find('[data-target="sharewith"]').html('公开');
					$(sharedWithModal).modal('hide');
				}else if(value == 2){
					modal.find('[data-target="sharewith"]').html('仅群组可见');
					$(sharedWithModal).modal('hide');
				}else{
					callAlert('请选择范围！', '<i class="material-icons">error_outline</i>', function(){});
				}
			});
			
			
			sharedWithModal.on('hidden.bs.modal', function(){
				$(this).remove();
			});
			
			sharedWithModal.modal('show');
		})();
	};
	
};