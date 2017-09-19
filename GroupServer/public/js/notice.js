const URL_GET_ALL_NOTICE = URLPrefix + '/get-notice';
const URL_ADD_NOTICE = URLPrefix + '/add-notice';
const URL_DELETE_NOTICE = URLPrefix + '/delete-notice';
const URL_EDIT_NOTICE = URLPrefix + '/edit-notice';
const URL_RENDER_TO_INDIVIDUAL = URLPrefix;
const URL_GET_CURRENT_USER_AUTHORITY_OF_GROUP  = URLPrefix + '/group/get-authority-for-current-user/';

var NoticeDisplayController = function(){
	var target = $('#main-block');
	var obj = this;
	
	// 主显示框
	var module = $(
		'<div class="main-block">\n' +
		'	<section class="content-header">\n' +
		'		<h1>\n' +
		'			群组\n' +
		'			<small>公告</small>\n' +
		'		</h1>\n' +
		'		<ol class="breadcrumb">\n' +
		'			<li><a href="#"><i class="fa fa-dashboard"></i> 群组</a></li>\n' +
		'			<li><a href="#">公告</a></li>\n' +
		'		</ol>\n' +
		'	</section>\n' +
		'	<section class="content">\n' +
		'		<div class="row">\n' +
		'			<div class="col-md-12">\n' +
		'				<ul class="timeline" data-content="notice">\n' +
		'				</ul>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</section>\n' +
		'</div>'
	);
	
	this.clearTarget = function(){
		target.empty();
	};
	
	this.appendToTarget = function(){
		this.clearTarget();
		target.append(module);
		target.find('.main-block').slimScroll({
			height: 'calc(100vh - 100px)' 
		});
	};
	
	// 清空
	this.clear = function(){
		module.find('[data-content="notice"]').empty();
	};
	
	// 加载
	this.load = function(data, gid){
		this.clear();
		
		if(!Array.isArray(data)){
			callAlert('加载失败', '<i class="material-icons">error_outline</i>', function(){});
		}else if(data.length == 0){
			var item = $(
				'<li>\n' +
				'	<div class="timeline-item">\n' +
				'		<div class="timeline-body" style="text-align: center;color: rgba(0,0,0,0.3)">\n' +
				'			<i class="fa fa-exclamation-triangle"></i> 暂无公告\n' +
				'		</div>\n' +
				'	</div>\n' +
				'</li>'
			);
			
			module.find('[data-content="notice"]').append(item);
			module.find('[data-content="notice"]').append('<li><i class="fa fa-clock-o bg-gray"></i></li>');
		}else{
			$.each(data, function(index, item){
				module.find('[data-content="notice"]').prepend(getSingleNotice(item, gid));
			});
			module.find('[data-content="notice"]').append('<li><i class="fa fa-clock-o bg-gray"></i></li>');
		}
		
		$.ajax({
			url : URL_GET_CURRENT_USER_AUTHORITY_OF_GROUP + gid,
			type : "GET",
			dataType : 'json',
			success : function (authorities){
				if(authorities.includes(23))
					module.find('[data-content="notice"]').prepend(getNewNotice(gid));
			},
			error: function(err){
				console.log(err);
			}
		});
			
		this.appendToTarget();
	};
	
	var getNewNotice = function(gid){
		var addNotice = $(
			'<li class="time-label">\n' +
			'	<span class="bg-green" style="cursor: pointer;">\n' +
			'		<i class="fa fa-plus"></i> 发布公告\n' +
			'	</span>\n' +
			'</li>'
		);
		
		addNotice.click(function(){
			var NEController = new NoticeEditController();
			NEController.add(gid);
		});
		
		return addNotice;
	};
	
	
	
	var getSingleNotice = function(data, gid){
		var item = $(
			'<li>\n' +
			'	<img class="img-circle" data-name="image" src="' + data.uimage + '" style="width: 30px;\n' +
			'		height: 30px;font-size: 15px;line-height: 30px;position: absolute;background: #d2d6de;\n' +
			'		border-radius: 50%;text-align: center;left: 18px;top: 0;">\n' +
			'	<div class="timeline-item">\n' +
			'		<span class="time" data-content="menu">	\n' +
			'			<i class="fa fa-clock-o"></i> ' + formatDatetime(data.datetime) + '\n' +
			'		</span>\n' +
			'		<h3 class="timeline-header"><a href="' + URL_RENDER_TO_INDIVIDUAL + data.uid + '">' + data.uname + '</a></h3>\n' +
			'		<div class="timeline-body">\n' +
			'			' + data.content + '\n' +
			'		</div>\n' +
			'	</div>\n' +
			'</li>'
		);
		
		item.find('[data-content="menu"]').append(getMenu(data,gid));
		
		return item;
	};
	
	var getMenu = function(data,gid){
		var menu = $(
			'<div class="dropdown" style="display: inline-block;">\n' +
			'	<a href="#" data-toggle="dropdown" style="color: #999;margin-left: 20px;" aria-expanded="true"><i class="fa fa-ellipsis-v"></i></a>\n' +
			'	<ul class="dropdown-menu dropdown-menu-right">\n' +
			'	</ul>\n' +
			'</div>'
		);
		
		var menuData = [
			{
				name: '修改',
				action: function(){
					var NEController = new NoticeEditController();
					NEController.modify(data, gid);
				}
			},
			{
				name: '删除',
				action: function(){
					var NEController = new NoticeEditController();
					NEController.delete(data.id, gid);
				}
			}
		];
		
		if(data.hasAuthority == 1){
			console.log(11);
			$.each(menuData, function(index, item){
				var temp = $('<li><a href="javascript:void(0);">' + item.name + '</a></li>');
				temp.click(function(){
					item.action();
				});
				
				menu.find('> ul').append(temp);
			});
			return menu;
		}else
			return '';
	};
	
	
	this.ajaxLoad = function(gid){
		$.ajax({
			url : URL_GET_ALL_NOTICE + '/' + gid,
			type : "GET",
			dataType : 'json',
			success : function (notices){
				obj.load(notices, gid);
			},
			error: function(err){
				console.log(err);
			}
		});
	};
};

var NoticeEditController = function(){
	var modal = $(
		'<div class="modal fade" id="testtest">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
		'				<h5 class="modal-title">编辑公告</h5>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div class="form-group">\n' +
		'					<textarea name="text" class="form-control" rows="4" placeholder="请输入..." style="resize: none;"></textarea>\n' +
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
	
	(function(){
		modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
	})();
	
	this.add = function(gid){
		modal.modal('show');
		modal.find('[data-action="submit"]').click(function(){
			var text = modal.find('[name="text"]').val();
			
			$.ajax({
				url : URL_ADD_NOTICE,
				data: {
					gid: gid,
					content: text
				},
				type : "GET",
				dataType : 'json',
				success : function (result){
					if(result == 1){
						var NDContoller = new NoticeDisplayController();
						NDContoller.ajaxLoad(gid);
						modal.modal('hide');
					}else{
						console.log('error');
					}
				},
				error: function(err){
					console.log(err);
				}
			});
		});
	};
	
	this.delete = function(id, gid){
		$.ajax({
				url : URL_DELETE_NOTICE,
				data: {
					id: id
				},
				type : "GET",
				dataType : 'json',
				success : function (result){
					if(result == 1){
						var NDContoller = new NoticeDisplayController();
						NDContoller.ajaxLoad(gid);
						modal.modal('hide');
					}else{
						console.log('error');
					}
				},
				error: function(err){
					console.log(err);
				}
			});
	};
	
	
	this.modify = function(data, gid){
		modal.modal('show');
		modal.find('[name="text"]').val(data.content);
		modal.find('[data-action="submit"]').click(function(){
			var text = modal.find('[name="text"]').val();
			$.ajax({
				url : URL_EDIT_NOTICE,
				data: {
					id: data.id,
					content: text
				},
				type : "GET",
				dataType : 'json',
				success : function (result){
					if(result == 1){
						var NDContoller = new NoticeDisplayController();
						NDContoller.ajaxLoad(gid);
						modal.modal('hide');
					}else{
						console.log('error');
					}
				},
				error: function(err){
					console.log(err);
				}
			});
		});
	};
};