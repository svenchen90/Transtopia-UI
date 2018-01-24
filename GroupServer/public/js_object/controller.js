/* 
全局： 
	1. 置顶一级导航栏控件 - FirstNavTopController
	2. 置顶二级导航栏控件 - SecondNavTopController
	3. 左侧折叠式导航栏控件 - CollapseNavLeftController
	4. 左下角按钮控件 - RightBotBtnController
	5. 左侧信息控件 - LeftModuleController
	10. 动态控件 - PostController
	11. 主展示区空间 - MainBlockController
Group：
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
	var obj = this;
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
		'				<!-- 在此添加 -->\n' + 
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
	
	this.load = function(title, user){
		module.find('[data-name="title"]').text(title);
		
		if(user == null || user == undefined || user == 0){
			/* 1. 用户未登录 或者 错误 */
			var content = $(
				'<li>\n' +
				'	<a href="#" data-toggle="control-sidebar"><i class="fa fa-check-square-o"></i> 登录</a>\n' +
				'</li>\n' +
				'<li>\n' +
				'	<a href="#" data-toggle="control-sidebar"><i class="fa fa-plus-square-o"></i> 注册</a>\n' +
				'</li>'
			);
			
			module.find('.navbar-custom-menu .navbar-nav').prepend(content);
		}else{
			/* 2. 用户登录后 */
			var content = $(
				'<li class="dropdown notifications-menu">\n' +
				'	<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
				'		<i class="fa fa-bell-o"></i>\n' +
				'		<span class="label label-warning">10</span>\n' +
				'	</a>\n' +
				'	<ul class="dropdown-menu">\n' +
				'	</ul>\n' +
				'</li>\n' +
				'<!-- User Account: style can be found in dropdown.less -->\n' +
				'<li class="dropdown user user-menu">\n' +
				'	<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
				'	<img class="user-image" data-name="userimage" /><!-- 用户图片 -->\n' +
				'	<span class="hidden-xs" data-name="username"><!-- 用户名称 --></span>\n' +
				'	</a>\n' +
				'</li>'
			);
			
			content.find('[data-name="userimage"]').prop('src', ImageURLPrefix + user.image);
			content.find('[data-name="username"]').text(user.name);
			
			module.find('.navbar-custom-menu .navbar-nav').prepend(content);
		}
		
		target.empty();
		target.append(module);
	};
	
	this.ajaxLoad = function(title){
		getCurrentUser()
			.then(function(result){
				obj.load(title, result);
			})
			.catch(function(exception){
				console.log(exception);
			});
	};
};


/* 2. 加载置顶二级导航栏 */
var SecondNavTopController = function(target, mainblock){
	var obj = this;
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
		if(!Array.isArray(data)){
			console.log(data, 'list is not array');
		}else if(data.length == 0){
			console.log('length == 0 ')
		}else{
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
		}
	};
	
	
	// 为物品页面加载
	this.ajaxLoadForObject = function(objectID){
		//创建者: 10动态，20版本，30定价&折扣，40使用者，50使用申请，60关注着，70用TA的App，80用户评价
		//使用者: 动态，版本，定价&折扣，使用者，关注着，用TA的App，用户评价
		//关注者: 动态，版本，定价&折扣，使用者，关注着，用TA的App，用户评价
		//陌生人: 动态，定价&折扣，用户评价
		var authoriyMap = {
			1: [10,20,30,40,50,60,70,80],
			2: [10,20,30,40,60,70,80],
			3: [10,20,30,40,60,70,80],
			4: [10,30,80]
		};
		
		getRoleForObject(objectID)
			.then(function(result){
				var listOfAuthoriy = authoriyMap[result];
				var data = obj.getObjectData(listOfAuthoriy, objectID);
				obj.load(data);
			})
			.catch(function(exception){
				console.log(exception);
			});
	};
	
	// 物品过滤器
	this.getObjectData = function(authority, id){
		var data = [];
		
		// 10. 加载群动态
		if(authority.includes(10)){
			data.push({
				name: '动态',
				action: function(){
					mainblock.ajaxLoadObjectPost(555);
				}
			});
		}

		// 20. 版本
		if(authority.includes(20)){
			data.push({
				name: '版本',
				action: function(){
					mainblock.loadVersion([{name: '版本 1'},{name: '版本 2'},{name: '版本 3'}]);
				}
			});
		}
		
		// 30. 定价&折扣
		if(authority.includes(30)){
			data.push({
				name: '定价&折扣',
				action: function(){
					console.log(1);
				}
			});
		}
		
		// 40. 使用者
		if(authority.includes(40)){
			data.push({
				name: '使用者',
				action: function(){
					console.log(1);
				}
			});
		}
		
		// 50. 使用申请
		if(authority.includes(50)){
			data.push({
				name: '使用申请',
				action: function(){
					console.log(1);
				}
			});
		}
		
		// 60. 关注者
		if(authority.includes(60)){
			data.push({
				name: '关注着',
				action: function(){
					console.log(1);
				}
			});
		}
		
		// 70. 用TA的App
		if(authority.includes(70)){
			data.push({
				name: '用TA的App',
				action: function(){
					console.log(1);
				}
			});
		}
		
		// 80. 用户评价
		if(authority.includes(80)){
			data.push({
				name: '用户评价',
				action: function(){
					console.log(1);
				}
			});
		}
		
		if(data.length == 0){
			console.log('error');
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
		'			<a href="javascript:void(0);" class="btn-hide pull-right"><i class="material-icons">chevron_left</i></a>\n' +
		'		</div>\n' +
		'		<!-- 加载列表 -->\n' +
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

	//通用加载
	this.load = function(data){
		//清空
		module.find('.sidbar-menu li').remove();
		
		//加载列表
		$.each(data, function(index, item){
			if(item == "divider"){
				module.find('.sidebar-menu').append('<li class="divider"></li>');
			}else{
				module.find('.sidebar-menu').append('<li class="item"><a href="' + item.url + '">' + item.icon + '<span>' + item.name + '</span></a></li>');
			}
			
		});
		
		target.empty();
		target.append(module);
	};
	
	
	//默认加载
	this.defaultLoad = function(){
		this.load(getDefaultData());
	};
	
	//默认数据
	var getDefaultData = function(){
		return [
			{
				name: '发现',
				icon: '<i class="fa fa-list-ol"></i>',
				href: '#'
			},
			{
				name: '消息',
				icon: '<i class="fa fa-commenting-o"></i>',
				href: '#'
			},
			{
				name: '社群',
				icon: '<i class="fa fa-fire"></i>',
				href: '#'
			},
			{
				name: '个人',
				icon: '<i class="fa fa-star"></i>',
				href: '#'
			},
			{
				name: '人脉',
				icon: '<i class="fa fa-user-o"></i>',
				href: '#'
			},
			'divider',
			{
				name: '设置',
				icon: '<i class="fa fa-gear"></i>',
				href: '#'
			},
			{
				name: '反馈',
				icon: '<i class="fa fa-exclamation-triangle"></i>',
				href: '#'
			},
			{
				name: '帮助',
				icon: '<i class="fa fa-question-circle"></i>',
				href: '#'
			}
		];
	};
	
};

/* 4. 加载左下角按钮组件 */
var RightBotBtnController = function(target){
	var obj = this;
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
	
	// 物品右下按钮加载
	this.ajaxLoadForObject = function(objectID){
		$.ajax({
			url : URLPrefix + '/object/get-authority-for-current-user/' + objectID,
			cache : true, 
			async : true,
			type : "GET",
			dataType : 'json',
			success : function(listOfAuthoriy){
				if(!Array.isArray(listOfAuthoriy) || listOfAuthoriy === '0'){
					console.log(listOfAuthoriy, 'listOfAuthoriy is not array');
				}else{
					var data = obj.getObjectDataRightBotBtn(listOfAuthoriy, objectID);
					obj.load(data);
				}	
			},
			error: function(err){
				console.log(err);
			}
		});
	};
	
	this.getObjectDataRightBotBtn = function(authority, id){
		var data = [];
		
		if(authority.includes(10)){
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
		
		return data;
	};
};


/* 5. 左侧群组栏控件 */
var LeftModuleController = function(target){
	var obj = this;
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
		'		</div>\n' +
		'		<div class="name" data-name="name"></div>\n' +
		'		<div class="detail">\n' +
		'			<span><i class="fa fa-pencil"></i> 物品类别</span>\n' +
		'			<p data-name="category"></p>\n' +
		'		</div>\n' +
		'		<div class="detail">\n' +
		'			<span><i class="fa fa-tags"></i> 物品话题</span>\n' +
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
	
	//加载菜单
	this.loadMenu = function(list){
		module.find('.menu-top .menu').empty();
		
		/* 来自gear.js */
		var menu = createMenu(list);
		module.find('.menu-top .menu').append(menu);
	}
	
	//加载群组类别
	this.loadCategory = function(list){
		module.find('[data-name="category"]').empty();
		
		if(!Array.isArray(list)){
			console.log(list, 'list is not array');
		}else if(list.length == 0)
			module.find('[data-name="category"]').append('暂无');
		else
			$.each(list, function(i, g){
				module.find('[data-name="category"]').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
			});
	};
	
	//加载群组兴趣
	this.loadTag = function(list){
		module.find('[data-name="tag"]').empty();
		
		if(!Array.isArray(list)){
			console.log(list, 'list is not array');
		}else if(list.length == 0)
			module.find('[data-name="tag"]').append('暂无');
		else
			$.each(list, function(i, t){
				module.find('[data-name="tag"]').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + t + '</span>');
			});
	};
	
	//加载按钮组
	this.loadBtn = function(list){
		/* 
		list: {
			name:
			icon:
			callback:
		}
		 */

		module.find('.btn-block').empty();
		
		$.each(list, function(index, item){
			var btn = $(
				'<a href="javascript:void(0);" class="pull-right" title="' + item.name + '">' + item.icon +'</a>'
			);
			btn.find('i').css({'font-size': '40px', 'color': '#00a65a', 'padding-left': '15px'});
			
			btn.on('click', function(){
				item.callback();
			});
			
			module.find('.btn-block').append(btn);
		});
	};
	
	
	
	//ajax加载群组信息
	this.ajaxLoadForObject = function(objectID){
		$.ajax({
			url : URLPrefix + '/object/get-by-id/' + objectID,
			cache : true, 
			async : true,
			type : "GET",
			dataType : 'json',
			success : function(object){
				if(object == null || object == undefined || object == 0){
					//error
					console.log(object);
				}else{
					//加载顶端菜单
					var dataMenu = getObjectDataMenu(object.roleinfo, object.id);
					obj.loadMenu(dataMenu);
					
					//加载基本信息
					module.find('[data-name="bg_image"]').prop('src', ImageURLPrefix + object.bg_image);
					module.find('[data-name="image"]').prop('src', ImageURLPrefix + object.image);
					module.find('.sign-block').html(
						'<span data-name="membercount">使用者' + object.innerGroupNumber + '人</span> - \n' +
						'<span data-name="membercount">关注者' + object.subscriptNumber + '人</span> - \n' +
						'<span data-name="introduction">' + object.introduction + '</span>'
					);
					module.find('[data-name="name"]').text(object.name);
					
					// 加载类别
					obj.loadCategory(object.category);
					
					// 加载兴趣
					obj.loadTag(object.tags);
					
					/* 加载按钮 */
					var dataBtn = getObjectDataBtn(object.isOwner, object.isMember, object.isFollower, object.id);
					obj.loadBtn(dataBtn);
					
					//加载QR
					module.find('[data-name="qr"]').prop('src', 'http://www.appcoda.com/wp-content/uploads/2013/12/qrcode.jpg');
					
					target.empty();
					target.append(module);
				}	
			},
			error: function(err){
				console.log(err);
			}
		});
	};
	
	//群组菜单信息
	var getObjectDataMenu = function(authority, id){
		var data = [];
		
		// ###
		if(authority.includes(1)){
			//修改群信息
			data.push({
				name: '物品信息',
				action: function(){
					var UGIController = new UpdateGroupInfoController(id);
					UGIController.ajaxLoad();
				}
			});
		}
		
		if(authority.includes(2)){
			//查看群设置
			data.push({
				name: '查看设置',
				action: function(){
					var CGSController = new CheckGroupSettingController(id);
					CGSController.ajaxLoad();
				}
			});
		}
		
		if(authority.includes(3)){
			//修改群设置
			data.push({
				name: '安全设置',
				action: function(){
					var UGSController = new UpdateGroupSettingController(id);
					UGSController.ajaxLoad();
				}
			});
		}
		
		if(authority.includes(5)){
			//黑名单
			data.push({
				name: '权限管理',
				action: function(){
					objectAuthorityListController(id);
				}
			});
		}
		
		
		if(authority.includes(5)){
			//黑名单
			data.push({
				name: '黑名单',
				action: function(){
					groupBlackListController(id);
				}
			});
		}objectAuthorityListController

		if(authority.includes(6)){
			//注销群组
			data.push({
				name: '物品下架',
				action: function(){
					callConfirm('确认下架', '您确认要下架该物品吗？', 
						function(){}, 
						function(){});
				}
			});
		}
		
		return data;
	};
	
	//群组按钮信息
	var getObjectDataBtn = function(isOwner, isMember, isFollower, objectID){
		/* 
		约束
			owner不可以取消关注
			member不可以取消关注
		 */
		const data = [{
			name: '申请使用',
			icon: '<i class="material-icons">add_shopping_cart</i>',
			callback: function(){
				singleLineInput('申请使用', '请输入申请请求(不多于50字)', function(message){
					$.ajax({
						url : URLPrefix + '???????' + objectID + '/' + message,
						cache : true, 
						async : true,
						type : "GET",
						dataType : 'json',
						success : function (result){
							if(result == 1){
								callAlert('已发送！', '<i class="material-icons">done</i>', function(){
									window.location.reload(true);
								});
							}else{
								callAlert('错误！', '<i class="material-icons">clear</i>', function(){});
							}
						},
						error: function(err){
							callAlert('错误！', '<i class="material-icons">clear</i>', function(){});
						}
					});
				});
				
				
				
			}
		},{
			name: '终止使用',
			icon: '<i class="material-icons">not_interested</i>',
			callback: function(){
				callConfirm('确认框', '您确认要终止使用？', 
					function(){
						$.ajax({
							url : URLPrefix + '???????' + objectID,
							cache : true, 
							async : true,
							type : "GET",
							dataType : 'json',
							success : function (result){
								if(result == 1){
									callAlert('终止使用！', '<i class="material-icons">done</i>', function(){
										window.location.reload(true);
									});
								}else{
									callAlert('错误！', '<i class="material-icons">clear</i>', function(){});
								}
							},
							error: function(err){
								callAlert('错误！', '<i class="material-icons">clear</i>', function(){});
							}
						});
					},
					function(){
						console.log(1);
					}
				);
			}
		},{
			name: '关注物品',
			icon: '<i class="material-icons">check_box</i>',
			callback: function(){
				$.ajax({
					url : URLPrefix + '???????' + objectID,
					cache : true, 
					async : true,
					type : "GET",
					dataType : 'json',
					success : function (result){
						if(result == 1){
							callAlert('关注成功！', '<i class="material-icons">done</i>', function(){
								window.location.reload(true);
							});
						}else{
							callAlert('错误！', '<i class="material-icons">clear</i>', function(){});
						}
					},
					error: function(err){
						callAlert('错误！', '<i class="material-icons">clear</i>', function(){});
					}
				});
			}
		},{
			name: '取消关注',
			icon: '<i class="material-icons">indeterminate_check_box</i>',
			callback: function(){
				$.ajax({
					url : URLPrefix + '???????' + objectID,
					cache : true, 
					async : true,
					type : "GET",
					dataType : 'json',
					success : function (result){
						if(result == 1){
							callAlert('已取消关注！', '<i class="material-icons">done</i>', function(){
								window.location.reload(true);
							});
						}else{
							callAlert('错误！', '<i class="material-icons">clear</i>', function(){});
						}
					},
					error: function(err){
						callAlert('错误！', '<i class="material-icons">clear</i>', function(){});
					}
				});
			}
		}];
		
		//逻辑判断
		if(isOwner == 1){
			return [];
		}else if(isMember == 1){
			return [data[1]];
		}else if(isFollower == 1){
			return [data[0], data[3]];
		}else{
			return [data[0], data[2]];
		};
	};
};

/* 6. 更新群组信息模态框组件 */
var UpdateGroupInfoController = function(groupID){
	var obj = this;
	var modal = $(
		'<div class="modal fade" id="modal-group-edit">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-body">\n' +
		'				<div class="menu-top">\n' +
		'					<span class="close pull-left" data-dismiss="modal">&times;</span>\n' +
		'					<span>修改物品信息</span>\n' +
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
		'						<p><i class="fa fa-user-o"></i> 物品名称</p>\n' +
		'						<input class="form-control input-lg" name="name" />\n' +
		'					</div>\n' +
		'					<div class="form-group">\n' +
		'						<p><i class="fa fa-pencil-square"></i> 物品简介</p>\n' +
		'						<textarea class="form-control input-lg" name="introduction" ></textarea>\n' +
		'					</div>\n' +
		'					<div class="form-group">\n' +
		'						<p><i class="fa fa-pencil"></i> 物品类别 <span class="pull-right"><a href="#" data-action="editcategory">修改</a></span></p>\n' +
		'						<div name="category" style="margin-top:10px;">\n' +
		'						</div>\n' +
		'					</div>\n' +
		'					<div class="form-group">\n' +
		'						<p><i class="fa fa-tags"></i> 话题类别 <span class="pull-right"><a href="#" data-action="edittag">修改</a></span></p>\n' +
		'						<div name="tag" style="margin-top:10px;">\n' +		
		'						</div>\n' +
		'					</div>\n' +	
		'				</div>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	// 加载群组类别
	this.loadCategory = function(list){
		modal.find('[name="category"]').empty();
		if(!Array.isArray(list)){
			console.log(list, 'list is not array');
		}else if(list.length == 0)
			modal.find('[name="category"]').append('<span style="color: rgba(0,0,0,0.54); margin-left: 15px;">暂无</span>');
		else
			$.each(list, function(i, g){
				modal.find('[name="category"]').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
			});
	};
	
	// 加载群组兴趣
	this.loadTag = function(list){
		modal.find('[name="tag"]').empty();
		
		if(!Array.isArray(list)){
			console.log(list, 'list is not array');
		}else if(list.length == 0)
			modal.find('[name="tag"]').append('<span style="color: rgba(0,0,0,0.54); margin-left: 15px;">暂无</span>');
		else
			$.each(list, function(i, t){
				modal.find('[name="tag"]').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + t + '</span>');
			});
	};
	
	//加载数据
	this.load = function(data){
		modal.find('[data-target="bg_image"]').prop('src', ImageURLPrefix + data.bg_image);
		modal.find('[data-target="image"]').prop('src', ImageURLPrefix + data.image);
		modal.find('[name="name"]').prop('value', data.name);
		modal.find('[name="introduction"]').text(data.introduction);
		
		// 加载群组类别
		this.loadCategory(data.category);
		
		//加载群组兴趣
		this.loadTag(data.tags);
	};
	
	//获取群组类别数据
	var getCategory = function(){
		var category = [];
		$.each(modal.find('[name="category"] .label'), function(index, item){
			category.push($(item).text());
		});
		return category;
	}
	
	//获取群组兴趣数据
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
	
	//更新群背景图
	var updateGroupBGImage = function(src){
		modal.find('[data-target="bg_image"]').prop('src', ImageURLPrefix + src);
	};
	
	
	//获取数据
	this.getData = function(){
		var data = {
			name: modal.find('[name="name"]').prop('value'),
			introduction: modal.find('[name="introduction"]').text(),
			gid: groupID
		};
		
		data.category = getCategory();;
		
		data.tags = getTag();
		
		return data;
	};
	

	//ajax加载
	this.ajaxLoad = function(){
		$.ajax({
			url : URLPrefix + '/object/get-by-id/' + groupID,
			cache : true, 
			async : true,
			type : "GET",
			dataType : 'json',
			success : function (group){
				if(group == null || group == undefined || group == 0){
					// error message
					// callAlert('加载失败！', '<i class="material-icons">clear</i>', function(){});
					console.log('group is 0 or null or undefined');
				}else{
					obj.load(group);
					modal.modal('show');
				}
			},
			error: function(err){
				callAlert('加载失败！', '<i class="material-icons">clear</i>', function(){});
			}
		});
	};
	
	
	//初始化
	(function(){
		//加载slimscroll
		modal.find('[name="introduction"]').slimScroll({
			width: '100%',
			height: '68px' 
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
				obj.loadCategory(data);
			});
		});
		
		//修改群组兴趣
		modal.find('[data-action="edittag"]').on('click', function(){
			var MController = new multiController('群组兴趣', '<i class="material-icons">mode_edit</i>');
			MController.load(getTag(), '/group/operation/get-all-tag/', '/group/operation/add-tag/', function(data){
				obj.loadTag(data);
			});
		});
		
		
		
		//submit
		modal.find('[data-action="submit"]').on('click', function(){
			$.ajax({
				url : URLPrefix + '/group/operation/update-basic-info/',
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
							window.location.reload(true);
							// modal.modal('hide');
						});
					}
				},
				error: function(err){
					callAlert('错误！', '<i class="material-icons">clear</i>', function(){});
				}
			});
		});
		

		//关闭模态框时，自动删除
		modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
	})();
	
};

/* 7. 修改群设置模态框组件 */
var UpdateGroupSettingController = function(groupID){
	var obj = this;
	var modal = $(
		'<div class="modal fade">\n' + 
		'	<div class="modal-dialog">\n' + 
		'		<div class="modal-content">\n' + 
		'			<div class="modal-header">\n' + 
		'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' + 
		'				<h4 class="modal-title">安全设置</h4>\n' + 
		'			</div>\n' + 
		'			<div class="modal-body">\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">是否接受新订单或使用申请</div>\n' + 
		'					<div class="col-xs-2">\n' + 
		'						<label class="switch">\n' + 
		'							<input name="allow_new_member_validation" type="checkbox">\n' + 
		'							<div class="slider round"></div>\n' + 
		'						</label>\n' + 
		'					</div>\n' + 
		'				</div>\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">是否允许被关注</div>\n' + 
		'					<div class="col-xs-2">\n' + 
		'						<label class="switch">\n' + 
		'							<input name="allow_new_member_in" type="checkbox">\n' + 
		'							<div class="slider round"></div>\n' + 
		'						</label>\n' + 
		'					</div>\n' + 
		'				</div>\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">是否允许物品名片被分享</div>\n' + 
		'					<div class="col-xs-2">\n' + 
		'						<label class="switch">\n' + 
		'							<input name="allow_new_following" type="checkbox">\n' + 
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
	
	//ajax加载
	this.ajaxLoad = function(){
		$.ajax({
			url : URLPrefix + '/group/operation/get-group-settings/' + groupID,
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
							
					//显示模态框
					modal.modal('show');
				}
			}
		});
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
				url : URLPrefix + '/group/operation/update-group-settings/' + groupID + '/' + option + '/' + value,
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
			window.location.reload(true);
		});
	})();
};

/* 8. 查看群设置模态框控件 */
var CheckGroupSettingController = function(groupID){
	var obj = this;
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
		'					<div class="col-xs-10 menu-label">是否接受新订单或使用申请</div>\n' + 
		'					<div class="col-xs-2" name="allow_new_member_validation">\n' + 
		'					</div>\n' + 
		'				</div>\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">是否允许被关注</div>\n' + 
		'					<div class="col-xs-2" name="allow_new_member_in">\n' + 
		'					</div>\n' + 
		'				</div>\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">是否允许物品名片被分享</div>\n' + 
		'					<div class="col-xs-2" name="allow_new_following">\n' + 
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
	
	//ajax加载
	this.ajaxLoad = function(){
		$.ajax({
			url : URLPrefix + '/object/get-by-id/' + groupID,
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
					
					modal.modal('show');
				}
			}
		});
	};
	
	//初始化
	(function(){
		//关闭时清楚模块
		modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
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
			allow_new_member_validation: html.find('input[type=\'checkbox\']').is(':checked')
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
					url : URLPrefix + '/group/operation/create-group/',
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
								//html.modal('hide');
								window.location.replace(URLPrefix + '/user/group/' + result.gid);
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
	var obj = this;
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
	
	// 加载category数据
	var loadCategory = function(list){
		modal.find('[data-value="catagories"]').empty();
		
		if(!Array.isArray(list)){
			console.log('not a list');
		}else if(list.length == 0){
			modal.find('[data-value="catagories"]').append('<span style="color: rgba(0,0,0,0.54); margin-left: 15px;">暂无</span>');
		}else{
			$.each(list, function(i, g){
				modal.find('[data-value="catagories"]').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
			});
		}
	};
	
	// 获取category数据
	var getCategory = function(){
		var category = [];
		$.each(modal.find('[data-value="catagories"] .label'), function(index, item){
			category.push($(item).text());
		});
		return category;
	};
	
	// 加载Tag数据
	var loadTag = function(list){
		modal.find('[data-value="tags"]').empty();
		
		if(!Array.isArray(list)){
			console.log('not a list');
		}else if(list.length == 0){
			modal.find('[data-value="tags"]').append('<span style="color: rgba(0,0,0,0.54); margin-left: 15px;">暂无</span>');
		}else{
			$.each(list, function(i, g){
				modal.find('[data-value="tags"]').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
			});
		}
	};
	
	// 获取tag数据
	var getTag = function(){
		var tags = [];
		$.each(modal.find('[data-value="tags"] .label'), function(index, item){
			tags.push($(item).text());
		});
		return tags;
	};
	

	// 群组新动态
	this.groupNewPost = function(gid){
		//加载图片
		$.ajax({
			url : URLPrefix + '/group/operation/get-instance/' + gid,
			cache : true, 
			async : true,
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 0){
					callAlert('加载失败！', '<i class="material-icons">error_outline</i>', function(){});
				}else{
					modal.find('[data-name="image"]').prop('src', ImageURLPrefix + result.image);
				}
			},
			error: function(err){
				callAlert('加载失败！', '<i class="material-icons">error_outline</i>', function(){});
			}
		});
		
		
		// 分享动态初始值
		modal.find('[data-target="sharewith"]').text('公开');
		modal.find('[data-target="sharewith"]').attr('data-value', '1');
		// 初始化群组分享范围
		modal.find('[data-action="sharedwith"]').on('click', function(){
			var currentValue = modal.find('[data-target="sharewith"]').attr('data-value');
			shareWithForGroup(currentValue);
		});
		
		//确定提交
		modal.find('[data-action="submit"]').on('click', function(){
			//获取数据
			var cata = getCategory();
			var tags = getTag();
			
			//编辑器内容
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
				title: modal.find('[name="title"]').val(),
				content: content.html(),
				category: cata,
				tags: tags,
				authority: modal.find('[data-target="sharewith"]').attr('data-value'),
				allowshare: (modal.find('[type="checkbox"]').is(':checked') ? 1 : 0),
				images: JSON.stringify(images),
				lat: '0',
				lng: '0'
			};
			
			$.ajax({
				url : URLPrefix + '/group/operation/add-group-post/',
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
		
		modal.modal('show');
	};
	
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
		'            <input type="radio" name="r1" class="minimal" value="2"> 仅使用者可见\n' +
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
			console.log(value);
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
					modal.find('[data-target="sharewith"]').html('仅使用者可见');
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
	
	//初始化
	(function(){
		//加载编辑器
		modal.find('.editor-block').append(editor);
		
		//加载兴趣类别
		modal.find('[data-target="catagories"]').on('click', function(){
			var MController = new multiController('动态类别', '<i class="material-icons">loyalty</i>');
			MController.load(getCategory(), '/group/operation/get-all-category/', '/group/operation/add-category/', function(data){
				loadCategory(data);
			});
			
		});
		
		//加载兴趣话题
		$(modal).find('[data-target="tags"]').on('click', function(){
			var MController = new multiController('兴趣类别', '<i class="material-icons">loyalty</i>');
			MController.load(getTag(), '/group/operation/get-all-tag/', '/group/operation/add-tag/', function(data){
					loadTag(data);
				});
		});
		
		modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
	})();
};


/* 11. 主展示区空间  */
var MainBlockController = function(target){
	var obj = this;
	var mainBlcok = $(
		'<div class="main-block">\n' +
		'	<section class="content-header">\n' +
		'		<h1>\n' +
		'			<span data-name="title"></span>\n' +
		'			<small></small>\n' +
		'		</h1>\n' +
		'		<ol class="breadcrumb">\n' +
		'			<li><a href="#"><i class="fa fa-dashboard"></i> 物品</a></li>\n' +
		'			<li class="active current-page">动态</li>\n' +
		'		</ol>\n' +
		'	</section>\n' +
		'	<div class="main-content">\n' +
		'	</div>\n' +
		'</div>'
	);
	
	//加载标题栏
	this.loadHeader = function(title){
		mainBlcok.find('.content-header [data-name="title"]').text(title);
	};
	
	this.loadPost = function(list){
		mainBlcok.find('.main-content').empty();
		mainBlcok.find('.main-content').append(
		'			<div class="col-lg-4" data-col>\n' +
		'			</div>\n' +
		'			<div class="col-lg-4" data-col>\n' +
		'			</div>\n' +
		'			<div class="col-lg-4" data-col></div>'
		);
		
		mainBlcok.find('.breadcrumb .current-page').text('动态');
		var listOfCol = [];
		var heightOfCOl = [];
		$.each(mainBlcok.find('.main-content [data-col]'), function(index, item){
			listOfCol.push($(item));
			heightOfCOl.push(0);
		});
		
		$.each(list, function(index, post){
			var indexOfCol = findSmallestIndex(heightOfCOl);
			listOfCol[indexOfCol].append(Post(post));
			heightOfCOl[indexOfCol] = listOfCol[indexOfCol].height();
		});
	};
	

	this.ajaxLoadObjectPost = function(objectID){
		getPostForObject(objectID)
			.then(function(result){
				obj.loadPost(result);
			})
			.catch(function(exception){
				console.log(exception);
			});
	};
	
	
	var findSmallestIndex = function(array){
		if(!Array.isArray(array) || array.length == 0){
			return -1;
		}else{
			var index = 0;
			var value = array[0];
			for(i=1; i<array.length; i++){
				if(array[i] < value){
					value = array[i];
					index = i;
				}
			};
			return index;
		}
	};
	
	var Post = function(data){
		var post = $(
			'<div class="post">\n' +
			'	<div class="user-block">\n' +
			'		<img class="img-circle img-bordered-sm" data-name="userimage">\n' +
			'				<span class="username">\n' +
			'					<a href="#" data-name="username"></a>\n' +
			'					<a href="#" class="pull-right btn-box-tool"><i class="material-icons">more_vert</i></a>\n' +
			'				</span>\n' +
			'		<span class="description" data-name="posttime"></span>\n' +
			'	</div>\n' +
			'	<div data-name="title">\n' +
			'		<a href="#" data-name="posttile"></a>\n' +
			'	</div>\n' +
			'	<div data-name="content">\n' +
			'		<div class="row">\n' +
			'			<img  class="img-responsive" data-name="postimage">\n' +
			'		</div>\n' +
			'	</div>\n' +
			'	<div data-name="category" style="margin-top: 10px;"><i class="fa fa-tasks margin-r-5" title="动态类别"></i></div>\n' +
			'	<div data-name="tag"><i class="fa fa-tags margin-r-5" title="动态话题"></i></div>\n' +
			'	<div class="row divider"></div>\n' +
			'	<ul class="list-inline">\n' +
			'		<li class="pull-right">\n' +
			'			<a href="#" class="link-black text-sm"><i class="fa fa-comments-o margin-r-5"></i> 评论(0)</a></li>\n' +
			'	</ul>\n' +
			' <div class="clearfix"></div>\n' + 
			'</div>'
		);

		
		//初始化
		(function(){
			//发布者信息
			post.find('[data-name="userimage"]').attr('src', ImageURLPrefix + data.gimage);
			post.find('[data-name="username"]').text(data.gname);
			
			// 标题
			post.find('[data-name="posttime"]').text(data.datetime);
			// 标题
			post.find('[data-name="posttile"]').text(data.title);
			
			// 内容
			if($(data.content).find('img').length > 0){
				var src = $($(data.content).find('img')[0]).attr('src');
				post.find('[data-name="postimage"]').attr('src', src);
			}else{
				post.find('.content').prepend(data.content);
			}
			
			//加载category数据
			if(!Array.isArray(data.category) || data.category.length == 0){
				post.find('[data-name="category"]').append('暂无');
			}else{
				$.each(data.category, function(i, g){
					post.find('[data-name="category"]').append('<span class="label" style="margin-left: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
				});
			}
			
			//加载tag			
			if(!Array.isArray(data.tags) || data.tags.length == 0){
				post.find('[data-name="tag"]').append('暂无');
			}else{
				$.each(data.tags, function(i, g){
					post.find('[data-name="tag"]').append('<span class="label" style="margin-left: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
				});
			}
			
			
			
			/* 底端菜单栏 */
			//是否允许被分享
			if(data.allowShare == 1)
				post.find('.list-inline').append('<li><a href="#" class="link-black text-sm" title="转发"><i class="fa fa-share margin-r-5"></i></a></li>');
			
			//点赞
			post.find('.list-inline').append('<li><a href="#" class="link-black text-sm" title="点赞"><i class="fa fa-thumbs-o-up margin-r-5"></i></a></li>');
			
			//备注
			post.find('.list-inline').append('<li><a href="#" class="link-black text-sm" title="备注"><i class="fa fa-pencil margin-r-5"></i></a></li>');
			
			//附件 
			post.find('.list-inline').append('<li><a href="#" class="link-black text-sm" title="附件"><i class="fa fa-file margin-r-5"></i></a></li>');
			
		})();
		

		return post;
	};
	
	
	var VersionCard = function(data){
		var card = $(
			'<div class="col-lg-2 col-md-3 col-sm-4" allowsearch allowremove>\n' +
			'	<div class="blacklist-card version-card" style="background-color: ' + googleColorRandomPicker() + ' ;">\n'+
			'		<div class="card-body">\n'+
			'			<div class="menu pull-right">\n'+
			'			<div class="dropdown" style="margin-top: 10px;margin-bottom: 30px;">\n'+
			'				<a href="#" data-toggle="dropdown" style="color: rgba(255,255,255,1); margin-right: 15px;" aria-expanded="true"><i class="fa fa-gear"></i></a>\n'+
			'				<ul class="dropdown-menu">\n'+
			'				<li><a href="javascript:void(0);" data-action="edit">编辑</a></li>\n'+
			'				<li><a href="javascript:void(0);" data-action="view">查看</a></li>\n'+
			'				<li><a href="javascript:void(0);" data-action="disable">发布版本</a></li>\n'+
			'				</ul>\n'+
			'			</div>\n'+
			'			</div>\n'+
			'			<div class="clearfix"></div>\n'+
			'			<div data-target="name" style="margin-top: 25px;margin-bottom: 25px;"></div>\n'+
			'			<div data-target="btns">\n'+
			'			</div>\n'+
			'		</div>\n' +
			'	</div>\n' +
			'</div>'
		);
		
		// 加载数据
		card.attr('data-id', data.id);
		card.find('[data-target="name"]').text(data.name);
			
		card.find('[data-action="edit"]').on('click',function(){
			getVersion(data.id)
				.then(function(result){
					initObjectEditor(result.data);
				})
				.catch(function(exception){
					console.log(exception);
				});
		});
		
		card.find('[data-action="view"]').on('click',function(){
			getVersion(data.id)
				.then(function(result){
					initObjectForm(result.data);
				})
				.catch(function(exception){
					console.log(exception);
				});
		});
		
		card.find('[data-action="disable"]').on('click',function(){
			callConfirm('确认发布', '您确认要发布该物品吗？', 
				function(){}, 
				function(){}
			);
		});
		
		return card;
	};
	
	this.loadVersion = function(list){
		mainBlcok.find('.main-content').empty();
		
		var initCard = $(
			'<div class="col-lg-2 col-md-3 col-sm-4" allowsearch allowremove>\n' +
			'	<div class="blacklist-card version-card" style="background-color: white">\n'+
			'		<div class="card-body">\n'+
			'			<div class="clearfix"></div>\n'+
			'			<div data-target="name" style="color: rgba(0,0,0,.6);margin-top: 25px;margin-bottom: 25px;cursor: pointer;"><i class="material-icons" style="font-size: 55px;">add_circle_outline</i></div>\n'+
			'			<div data-target="name" style="color: rgba(0,0,0,.6);margin-top: 10px;margin-bottom: 25px;">创建版本</div>\n'+
			'		</div>\n' +
			'	</div>\n' +
			'</div>'
		);
		
		mainBlcok.find('.main-content').append(initCard);
		
		initCard.on('click', function(){
			$('#templateEditor').modal('show');
		});
		
		$.each(list, function(index, ver){
			mainBlcok.find('.main-content').append(VersionCard(ver));

		});
	};
	
	
	//初始化
	(function(){
		mainBlcok.find('.main-content').slimScroll({
			height: 'calc(100vh - 140px)' 
		});
		
		target.append(mainBlcok);
	})();
};
