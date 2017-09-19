/*
插件：
1. Google 随机取色器 - googleColorRandomPicker()
2. 提示框 - callAlert(text, icon, callback)
3. 确认框 - callConfirm(title, text, actionConfirm, dataConfirm, actionCancel, dataCancel)
4. 创建新的菜单（最多二级） - createMenu(data)
5. 上传图片 - UpdateImage(id, requestURL, callback)
6. 给卡片添加popup - bindHoverTo(data, target)
7. 小输入框 - singleLineInput = function(title, placeholder, callback)
*/

/* 1. Google 随机取色器 */ 
var googleColorRandomPicker = function(){
	var color_list = ['rgb(55, 141, 59)', 'rgb(65, 65, 65)', 'rgb(29, 135, 228)', 'rgb(119, 143, 155)', 'rgb(91, 106, 191)', 'rgb(125, 86, 193)', 'rgb(248, 167, 36)', 
		'rgb(255, 111, 66)', 'rgb(235, 63, 121)', 'rgb(229, 57, 53)', 'rgb(140, 109, 98)'];
	var random = Math.floor(Math.random() * (color_list.length));
	//console.log(color_list[random]);
	return color_list[random];
};

/* 2. 提示框 */
var callAlert = function(text, icon, callback){
	var html = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog" style="width: 150px; opacity: 0.6">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-body" style="padding: 0;  height: 150px; background-color: rgba(0,0,0,1);">\n' +
		'				<p style="color: rgba(255,255,255, 1); font-size: 16px; text-align: center;">' + text + '</p>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	//加载图标
	var icon = $(icon).css({
		'margin-left': '25px',
		'font-size': '100px',
		'color': 'rgba(255,255,255, 1)'
	});
	html.find('.modal-body').prepend(icon);
	
	
	html.on('hidden.bs.modal', function(){
		$(this).remove();
	});
	
	html.modal('show');
	
	setTimeout(function(){
		html.modal('hide');
		callback();
	}, 1000);
};

/* 3. 确认框 */
var callConfirm = function(title, text, actionConfirm, actionCancel){
	$.confirm({
		title: title,
		content: text,
		buttons: {
			确定: function () {
				actionConfirm();
				/* callAlert('操作完成', 'done'); */
			},
			取消: function () {
				actionCancel();
			}
		}
	});
};


/* 4. 创建新的菜单（最多二级） */
var createMenu = function(data){
	if(data == null || data == undefined){
		console.log('data is null or undefined');
	}else if(data.length == 0){
		return '';
	}else{
		//Menu 框架
		var menu = $(
			'<div class="dropdown">\n' +
			'	<a href="#"  data-toggle="dropdown" style="color: rgba(255,255,255,1); margin-left: 20px;"><i class="material-icons">more_vert</i></a>\n' +
			'	<ul class="dropdown-menu">\n' +
			'	</ul>\n' +
			'</div>'
		);
		
		//加载menu item
		$.each(data, function(index, d){
			if(d.sublist == undefined){
				//无子菜单
				var item = $('<li><a href="javascript:void(0);">' + d.name + '</a></li>');
				item.on('click', function(){
					d.action();
				})
				
				menu.find('> ul').append(item);
			}else{
				//子菜单， 仅支持二级菜单
				var item = $(
				'<li class="dropdown-submenu">\n' +
				'	<a class="subtoggle" href="#">' + d.name + ' <span class="fa fa-caret-right"></span></a>\n' +
				'	<ul class="dropdown-menu">\n' +
				'	</ul>\n' +
				'</li>'
				);
				
				//子菜单item
				$.each(d.sublist, function(i, sub){
					var subitem = $('<li><a href="javascript:void(0);">' + sub.name + '</a></li>');
					subitem.on('click', function(){
						sub.action();
					})
					item.find('> .dropdown-menu').append(subitem);
				});
				
				//关闭其他子菜单
				item.on("click", function(e){
					menu.find('.dropdown-submenu ul').hide();
					$(this).find('> ul').toggle();
					e.stopPropagation();
					e.preventDefault();
				});

				menu.find('> ul').append(item);
			}
		});
		
		//关闭主菜单时,自动关闭子菜单
		menu.on('hidden.bs.dropdown', function(){
			$(this).find('.dropdown-submenu ul').hide();
		});
		
		return menu;
	}
};

/* 5. 上传图片 */
var updateImage = function(id, requestURL, callback){
	var html = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-body">\n' +
		'				<div class="main-content">\n' +
		'					<div class="modal-header">\n' +
		'						<button type="button" class="close" data-dismiss="modal">×</button>\n' +
		'						<h4 class="modal-title">上传文件</h4>\n' +
		'					</div>\n' +
		'					<div style="margin: 15px;">\n' +
		'					<input name="filesupload" type="file" multiple class="file-loading" accept="image">\n' +
		'					</div>\n' +
		'				</div>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	//加载bootstrap-fileinput插件
	html.find('input').fileinput({
		language: "zh",
		theme: "explorer",
		uploadUrl: URLPrefix + requestURL + '/' + id,
		allowedFileExtensions: ['jpg', 'png'],
		maxFileCount: 1,
	});
	
	//上传完成后方法
	html.find('input').on('fileuploaded', function(event, data, previewId, index) {
		/* var form = data.form, files = data.files, extra = data.extra,
				response = data.response, reader = data.reader;
		console.log('File uploaded triggered'); */
		if(data.response == 0){
			callAlert('错误！', '<i class="material-icons">clear</i>', function(){});
		}else{
			callAlert('更新成功！', '<i class="material-icons">done</i>', function(){
				html.modal('hide');
				callback(data.response)
			});
		}
	});
	
	html.on('hidden.bs.modal', function(){
		$(this).remove();
	});
	
	html.modal('show');
};


/* 6. 给卡片添加popup */
var bindHoverTo = function(data, target) {
	var content = '';
	$.each(data, function(i,d){
		content += '<a href="#"><span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + d + '</span></a>\n';
	});
	
	target.attr('data-container', 'body');
	target.attr('data-toggle', 'popover');
	target.attr('data-content', '<h4 style="line-height: 30px;">' + content + '</h4>');

	target.popover({html : true, trigger: 'hover'});
};

/* 7. 小输入框 */
var singleLineInput = function(title, placeholder, callback){
	var modal = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close btn-close" data-dismiss="modal">&times;</button>\n' +
		'				<h4 class="modal-title"></h4>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div class="form-group">\n' +
		'					<input type="text" class="form-control" />\n' +
		'				</div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a href="javascript: void(0);" data-action="submit">确定</a>\n' +
		'				<a href="javascript: void(0);" data-dismiss="modal">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' + 
		'</div>'
	);
	
	//初始化
	(function(){
		modal.find('.modal-title').text(title);
		modal.find('input').attr('placeholder', placeholder);
		
		//submit
		modal.find('[data-action="submit"]').on('click', function(){
			//获取数据
			var input = modal.find('input').val();
			callback(input);
		});
		
		
		modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		modal.modal('show');
	})();
};

var formatDatetime = function (datetime) {
    datetime = datetime.split(" ");
    var eles = datetime[0].split("_");
    return eles[0] + "年" + eles[1] + "月" + eles[2] + "号 " + eles[3]+":"+eles[4]+":"+eles[5];
};
