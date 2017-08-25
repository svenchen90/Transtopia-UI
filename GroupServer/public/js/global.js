/* 
jQuery
1. 加载置顶一级导航栏 - loadFirstNavTop;
2. 加载置顶二级导航栏 - loadSecondNavTop;
3. 加载左侧折叠式导航栏 - loadCollapseNavLeft;
4. 加载左下角按钮组件 - createRightBotBlock;
 */
/* 
Javascript
J1. twinRowModal - twinRowModal
J2. 创建兴趣类别选项卡 - createCatagoriesCardHTML
J3. 创建modal-card - createModalCardHTML
 */
(
	function($){
		/* 1. 加载置顶一级导航栏 */
		$.fn.loadFirstNavTop = function(data){
			// 清除已有内容
			$(this).empty();
			
			var firstNavTop = $(
				'<!-- 标题栏 -->\n' +
				'<div class="logo">\n' +
				'	<span class="logo-mini"><b>T</b></span>\n' +
				'	<span class="logo-lg"><a href="index.jsp"><b>Transtopia</b></a></span>\n' +
				'</div>\n' +
				'<nav class="navbar navbar-static-top nav-top-first">\n' +
				'	<!-- Sidebar toggle button-->\n' +
				'	<a id="btn-sidebar-toggle" href="#" class="sidebar-toggle">\n' +
				'		<span class="sr-only">Toggle navigation</span>\n' +
				'		<span class="icon-bar"></span>\n' +
				'		<span class="icon-bar"></span>\n' +
				'		<span class="icon-bar"></span>\n' +
				'	</a>\n' +
				'	<div class="collapse navbar-collapse pull-left" id="navbar-collapse">\n' +
				'		<ul class="nav navbar-nav">\n' +
				'			<li><a href="#" class="current-page">' + data.title + '</a></li>\n' +
				'		</ul>\n' +
				'		<form class="navbar-form navbar-left">\n' +
				'			<select id="input-search" type="text" class="form-control" data-placeholder="搜索..."></select>\n' +
				'		</form>\n' +
				'	</div>\n' +
				'	<div class="navbar-custom-menu">\n' +
				'		<ul class="nav navbar-nav">\n' +
				'			<li class="dropdown messages-menu search-menu">\n' +
				'				<a href="" class="dropdown-toggle" data-toggle="dropdown">\n' +
				'						<i class="fa fa-search"></i>\n' +
				'				</a>\n' +
				'				<ul class="dropdown-menu">\n' +
				'					<li>\n' +
				'							<input type="text" class="form-control" placeholder="搜索..." />\n' +
				'					</li>\n' +
				'				</ul>\n' +
				'			</li>\n' +
				'			<!-- Messages: style can be found in dropdown.less-->\n' +
				'			<li class="dropdown messages-menu">\n' +
				'				<a href="#">\n' +
				'						<i class="fa fa-envelope-o"></i>\n' +
				'						<span class="label label-success">4</span>\n' +
				'				</a>\n' +
				'			</li>\n' +
				'			<!-- Notifications: style can be found in dropdown.less -->\n' +
				'			<li class="dropdown notifications-menu">\n' +
				'				<a href="#" >\n' +
				'						<i class="fa fa-bell-o"></i>\n' +
				'						<span class="label label-warning">10</span>\n' +
				'				</a>\n' +
				'			</li>\n' +
				'			<!-- Tasks: style can be found in dropdown.less -->\n' +
				'			<li class="dropdown tasks-menu">\n' +
				'				<a href="#">\n' +
				'						<i class="fa fa-address-book-o"></i>\n' +
				'						<span class="label label-danger">9</span>\n' +
				'				</a>\n' +
				'			</li>\n' +
				'			<!-- User Account: style can be found in dropdown.less -->\n' +
				'			<li class="dropdown user user-menu">\n' +
				'				<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
				'					<img class="user-image" src="' + data.face_image + '" />\n' +
				'					<span class="hidden-xs">' + data.name + '</span>\n' +
				'				</a>\n' +
				'			</li>\n' +
				'			<!-- Control Sidebar Toggle Button -->\n' +
				'			<li>\n' +
				'				<a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>\n' +
				'			</li>\n' +
				'		</ul>\n' +
				'	</div>\n' +
				'</nav>'
			);
			
			//展开左侧影藏导航栏
			$(firstNavTop).find('.sidebar-toggle').on('click', function(e){
				$( ".sidebar-collapse" ).toggle("slow");
			});

			$(this).append(firstNavTop);
		};
		
		/* 2. 加载置顶二级导航栏 */
		$.fn.loadSecondNavTop = function(data){
			// 清楚已有内容
			$(this).empty();
			
			var secondNavTop = $(
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
			
			$.each(data, function(index, item){
				if(item.sublist == undefined){
					var temp = $('<li><a href="javascript: void(0);">' + item.name + '</a></li>');
					$(temp).on('click', function(){
						item.action();
					});
					$(secondNavTop).find('ul:first').append(temp);
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

					$(secondNavTop).find('ul:first').append(temp);
				}
			});
			
			$(this).append(secondNavTop);
		};
		
		/* 3. 加载左侧折叠式导航栏 */
		$.fn.loadCollapseNavLeft = function(data){
			// 清楚已有内容
			$(this).empty();
			
			var leftNav = $(
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
			
			// 影藏折叠菜单
			$(leftNav).find('.btn-hide').on('click', function(e){
				$('.sidebar-collapse').hide("slow");
			});
			
			$(this).append(leftNav);
		};
		
		/* 4. 加载左下角按钮组件 */
		$.fn.createRightBotBlock = function(data){
			// 清楚已有内容
			$(this).empty();
			
			var btnHTML = $('<a class="btn btn-success btn-lg switch-rightbot btn-rightbot"><i class="fa fa-plus"></i></a>');
			var blockHTML = $('<div class="block-rightbot"></div>');
			
			$(btnHTML).on('click', function(){
				$(this).find('i').toggleClass('fa-plus').toggleClass('fa-minus');
				$(blockHTML).toggle(200);
			});
			
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
			

			$(this).append(btnHTML);
			$(this).append(blockHTML);
		};
		
		/* 5. 创建新的菜单（最多二级） */
		$.fn.createMenu = function(data){
			if(data.length == 0){
				
			}else{
				//Menu 框架
				var html = $(
					'<div class="dropdown">\n' +
					'	<a href="#"  data-toggle="dropdown" style="color: rgba(255,255,255,1); margin-left: 20px;"><i class="material-icons">more_vert</i></a>\n' +
					'	<ul class="dropdown-menu">\n' +
					'	</ul>\n' +
					'</div>'
				);
				
				//加载menu item
				$.each(data, function(index, item){
					if(item.sublist == undefined){
						//无子菜单
						var itemHTML = $('<li><a href="javascript:void(0);">' + item.name + '</a></li>');
						$(itemHTML).on('click', function(){
							item.action();
						})
						$(html).find('> ul').append(itemHTML);
					}else{
						//子菜单， 仅支持二级菜单
						var temp = $(
						'<li class="dropdown-submenu">\n' +
						'	<a class="subtoggle" href="#">' + item.name + ' <span class="fa fa-caret-right"></span></a>\n' +
						'	<ul class="dropdown-menu">\n' +
						'	</ul>\n' +
						'</li>'
						);
						//子菜单item
						$.each(item.sublist, function(i, sub){
							var itemHTML = $('<li><a href="javascript:void(0);">' + sub.name + '</a></li>');
							$(itemHTML).on('click', function(){
								item.action();
							})
							$(temp).find('> .dropdown-menu').append(itemHTML);
						});
						
						//关闭其他子菜单
						$(temp).on("click", function(e){
							$(html).find('.dropdown-submenu ul').hide();
							$(this).find('> ul').toggle();
							e.stopPropagation();
							e.preventDefault();
						});

						$(html).find('> ul').append(temp);
					}
				});
				
				
				//关闭主菜单时,自动关闭子菜单
				$(html).on('hidden.bs.dropdown', function(){
					$(this).find('.dropdown-submenu ul').hide();
				});
				
				$(this).append(html);
			}
		};
		
	}
)(jQuery);

/* J1. twinRowModal */
var twinRowModal = function(inputs){
	/*
		input schema 
		{
			title:
			dataTop:
			dataBot:
			test:
			actionSubmit:
			
		}
	*/
	var twinRowHTML = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close btn-close" data-dismiss="modal">&times;</button>\n' +
		'				<h4 class="modal-title">' + inputs.title + '</h4>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div style="display: inline-block; line-height: 34px;"></div>\n' +
		'				<div class="form-group pull-right" style="width: 250px;">\n' +
		'					<div class="input-group">\n' +
		'						<input type="text" class="form-control" placeholder="搜索..." data-action="search"/>\n' +
		'						<div class="input-group-addon" style="cursor: pointer;">\n' +
		'							<i class="fa fa-search"></i>\n' +
		'						</div>\n' +
		'					</div>\n' +
		'				</div>\n' +
		'				<div class="clearfix"></div>\n' +
		'				<div class="row-top">\n' +
		'					<!-- 上排数据 -->\n' +
		'				</div>\n' +
		'				<div class=="divider" style="margin-top:10px; margin-bottom:10px; border-bottom: 1px solid #ddd;"></div>\n' +
		'				<div class="row-bot">\n' +
		'					<!-- 下排数据 -->\n' +
		'				</div>\n' +
		'				<div class="clearfix"></div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a href="javascript: void(0);" class="btn-submit">确定</a>\n' +
		'				<a href="javascript: void(0);" data-dismiss="modal">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' + 
		'</div>\n');
		
		//console.log($(this).attr('id'));
	
	//component
	var rowTop = $(twinRowHTML).find('.row-top');
	var rowBot = $(twinRowHTML).find('.row-bot');
	
	// CSS
	$(rowTop).slimScroll({
			height: '20vh'
	});
	
	$(rowBot).slimScroll({
			height: '40vh'
	});
	
	$(twinRowHTML).find('.modal-dialog').css({width: '50vw'});
	
	
	//加载function card
	inputs.funcCardInput2['rowTop'] = rowTop;
	inputs.funcCardInput2['rowBot'] = rowBot;
	$(rowTop).append(inputs.funcCard2(inputs.funcCardInput2));
	
	//加载top row 数据
	$.each(inputs.dataTop, function(i, d){
		//console.log(i);
		//console.log(d);
		d['rowTop'] = rowTop;
		d['rowBot'] = rowBot;
		var item = inputs.funcCard1(d);
		$(rowTop).append(item);
	});
	
	
	
	//加载bot row 数据
	$.each(inputs.dataBot, function(i, d){
		//console.log(i);
		//console.log(d);
		d['rowTop'] = rowTop;
		d['rowBot'] = rowBot;
		d['iconHover1'] = 'highlight_off';
		var item = inputs.funcCard1(d);
		$(rowBot).append(item);
	});
	
	//Btn function
	
	//submit
	$(twinRowHTML).find('.btn-submit').on('click', function(){
		var list =  [];
		$(rowBot).find('[data-type="name"]').each(function(i){
			list.push($(this).text());
		});
		
		inputs.actionSubmit(list);
		$(twinRowHTML).modal('hide');
	});
	
	//搜索
	$(twinRowHTML).find('[data-action="search"]').on('change', function(){
		var query = $(this).val();
			$.each($(rowTop).find('> div'), function(i,t){
				var name = $(t).find('[data-type="name"]').text();
				if(!name.match(query)){
					$(t).addClass('hide');
				}else
					$(t).removeClass('hide');
			});
		//console.log("12313".match('123134'));
	});
	
	//关闭后删除模态框 - Reset
	$(twinRowHTML).on('hidden.bs.modal', function(){
		$(this).remove();
	});
	
	$(twinRowHTML).modal('show');
};

/* J2. 创建兴趣类别选项卡 */
var createCatagoriesCardHTML = function(data){
	var html = $(
		'<div class="col-lg-2 col-md-3 col-sm-4">\n' +
		'	<div class="modal-card" style="background-color: ' + googleColorRandomPicker() + ';">\n'+
		'		<div class="card-body">\n'+
		'			<div class="content-default">\n'+
		'				<i class="material-icons">grade</i>\n'+
		'				<div data-type="name">' + data.name + '</div>\n'+		
		'			</div>\n'+
		'			<div class="content-hover">\n'+
		'				<i class="material-icons">' + (data.iconHover1 ? data.iconHover1 : 'add_circle_outline') + '</i>\n'+
		'				<div></div>\n'+
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);

	//Switch between top row and bot row
	$(html).on('click', function(){
		var signal = $(html).closest(data.rowTop).length;
		
		if(signal == 0){
			$(html).find('.content-hover i').text(data.iconHover1 ? data.iconHover1 : 'add_circle_outline');
			$(data.rowTop).append(html);
		}else if(signal == 1){
			$(html).find('.content-hover i').text(data.iconHover1 ? data.iconHover1 : 'highlight_off');
			$(data.rowBot).append(html);
		}else{
			//Error
		}
	});

	return html
};

/* J3. 创建modal-card */
var createAddCardHTML = function(data){
	/*
		data: {
			name: ,
			cardIcon: ,
			title: ,
			action: ,
			
		}
	*/
	var html = $(
		'<div class="col-lg-2 col-md-3 col-sm-4">\n' +
		'	<div class="modal-card" style="background-color: rgba(255,255,255,1);">\n'+
		'		<div class="card-body" style="color: rgba(0,0,0,0.5)">\n'+
		'			<div>\n'+
		'				<i class="material-icons">' + 'add_circle_outline' + '</i>\n'+
		'				<div>' + data.name + '</div>\n'+		
		'			</div>\n'+
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);

	$(html).on('click', function(){
		var html2 = $(
		'<div class="modal fade" id="modal-function1">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close btn-close" data-dismiss="modal">&times;</button>\n' +
		'				<h4 class="modal-title">' + data.title + '</h4>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div class="form-group">\n' +
		'					<input type="text" class="form-control" placeholder="' + data.placeholder +' " />\n' +
		'				</div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a href="javascript: void(0);" class="btn-submit">确定</a>\n' +
		'				<a href="javascript: void(0);" data-dismiss="modal">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' + 
		'</div>\n');
		
		$(html2).find('.btn-submit').on('click', function(){
			$.ajax({
				url : data.action,
				data:{name: $(html2).find('input').val()},
				cache : false, 
				async : false,
				type : "GET",
				dataType : 'json',
				success : function (result){
					if(result == 1){
						$(data.rowTop).append(createModalCardHTML({
							name: $(html2).find('input').val(),
							rowTop: data.rowTop,
							rowBot: data.rowBot
						}));
						$(html2).modal('hide');
					}else{
						//error
					}
				}
			});
		});
		
		$(html2).modal('show');

		//reset
		$(html2).on('hidden.bs.modal', function(){
			$(this).remove();
		});
	});

	return html
};
