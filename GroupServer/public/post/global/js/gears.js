/*
插件：


1. Google 随机取色器 - googleColorRandomPicker()
2. 提示框 - messageAlert(text, flag, callback)
3. 确认框 - callConfirm(title, text, actionConfirm, dataConfirm, actionCancel, dataCancel)
4. 创建新的菜单（最多二级） - createMenu(data)
5. 上传图片 - UpdateImage(id, requestURL, callback)
6. 给卡片添加popup - bindHoverTo(data, target)
7. 小输入框 - singleLineInput = function(title, placeholder, callback)
8. 重写时间 - formatDatetime(datetime)
9. 自定义右键菜单
10. getValueListOfObjects 
*/


/* 1. Google 随机取色器 */ 
var googleColorRandomPicker = function(){
	var color_list = ['rgb(55, 141, 59)', 'rgb(65, 65, 65)', 'rgb(29, 135, 228)', 'rgb(119, 143, 155)', 'rgb(91, 106, 191)', 'rgb(125, 86, 193)', 'rgb(248, 167, 36)', 
		'rgb(255, 111, 66)', 'rgb(235, 63, 121)', 'rgb(229, 57, 53)', 'rgb(140, 109, 98)'];
	var random = Math.floor(Math.random() * (color_list.length));
	//console.log(color_list[random]);
	return color_list[random];
};
var callAlert=function(s1, s2, s3)
{
	
}

var ajaxGetAction=function(url, data, errfunction, execution)
{
	$.ajax({
		url : url,
		data :data,
		type : "GET",
		dataType : 'json',
		success : function(instance) {
			if (instance == 0) {
				errfunction();
			} else {
				execution(instance);
			}
		},
		error : function(err) {
			messageAlert("获取数据失败， 请重新尝试","clear", function(){});
		}
	});
}

var ajaxPostAction=function(url, data, execution)
{
	$.ajax({
		url : url,
		data :data,
		type : "POST",
		dataType : 'json',
		success : function(instance) {
			if (instance == 0) {
				messageAlert("获取数据失败， 请重新尝试","clear", function(){});
			} else {
				//callAlert("操作成功","done", function(){});
				execution(instance);
			}
		},
		error : function(err) {
			messageAlert("获取数据失败， 请重新尝试","clear", function(){});
		}
	});
}

var loadingPageShow=function(flag)
{
	if(flag)
	{
		$("#overlay_page").show();
	}
	else
	{
		$("#overlay_page").hide();
	}
}

/* 2. 提示框 */
var messageAlert = function(text, flag, callback){
	 var dialogInstance2 = new BootstrapDialog();
     dialogInstance2.setMessage(text);
     if(flag=="done")
     {
    	 dialogInstance2.setTitle('成功');
    	 dialogInstance2.setType(BootstrapDialog.TYPE_SUCCESS);
     }
     else if(flag=="warning")
     {
    	 dialogInstance2.setTitle('警告');
    	 dialogInstance2.setType(BootstrapDialog.TYPE_WARNING);
     }
     else if(flag=="clear"||flag=="error")
     {
    	 dialogInstance2.setTitle('失败');
    	 dialogInstance2.setType(BootstrapDialog.TYPE_DANGER);
     }
     dialogInstance2.setSize(BootstrapDialog.SIZE_SMALL);
     dialogInstance2.setCssClass("message_dialog_title");
    // BootstrapDialog.SIZE_NORMAL
     dialogInstance2.open();
	
	setTimeout(function(){
		dialogInstance2.close()
		callback();
	}, 1500);
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
var createMenu = function(data, option){
	if(data == null || data == undefined){
		console.log('data is null or undefined');
	}else if(data.length == 0){
		return '';
	}else{
		//Menu 框架
		var menu = $(
			'<div class="dropdown">\n' +
			'	<a href="#"  data-toggle="dropdown" style="color: rgba(255,255,255,1); margin-left: 20px;"><i class="material-icons" style="color:black;">more_vert</i></a>\n' +
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

		
		var left=menu.offset().left;
		var top=menu.offset().top;
		if(option==1)
		{
			menu.on('hidden.bs.dropdown', function () {
				  $('.self-menu').append(menu.css({
				    position:"relative", left:left, top:top
				  }).detach());
				});
			menu.on('show.bs.dropdown', function () {
				  $('body').append(menu.css({
				    position:'absolute',
				    left:menu.offset().left, 
				    top:menu.offset().top
				  }).detach());
				});
		}
		else
		{			
			menu.on('hidden.bs.dropdown', function(){
			$(this).find('.dropdown-submenu ul').hide();

		    });
		}
		

		
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
		uploadUrl: requestURL+'/'+id,
		allowedFileExtensions: ['jpg', 'png','JPEG', 'JPG', 'PNG'],
		maxFileCount: 1,
	});
	
	//上传完成后方法
	html.find('input').on('fileuploaded', function(event, data, previewId, index) {
		/* var form = data.form, files = data.files, extra = data.extra,
				response = data.response, reader = data.reader;
		console.log('File uploaded triggered'); */
		if(data.response == 0){
			messageAlert('图片上传出现错误！', 'error', function(){});
		}else{
			messageAlert('图片更新成功！', 'done', function(){
				html.modal('hide');
				callback(data.response.src);
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
			modal.modal('hide');
		});
		
		
		modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		modal.modal('show');
	})();
};

/*8. 重写时间*/
var formatDatetime = function (datetime) {
    datetime = datetime.split(" ");
    var eles = datetime[0].split("_");
    return eles[0] + "年" + eles[1] + "月" + eles[2] + "号 " + eles[3]+":"+eles[4]+":"+eles[5];
};

/* 9. 自定义右键菜单 */
//自定义右键菜单
var customizeRightClickMenu = function(data){
	console.log(data);
	//清楚之前的菜单
	$('body').find('.custom-menu').remove();
	
	if(Array.isArray(data) && data.length == 0){
		return;
	}else{
		//Menu 框架
		var html = $(
			'<div class="dropdown custom-menu">\n' +
			'	<ul class="dropdown-menu">\n' +
			'	</ul>\n' +
			'</div>'
		);
		
		//加载menu item
		$.each(data, function(index, item){
			if(item.sublist == undefined){
				//无子菜单
				var itemHTML = $('<li><a href="javascript:void(0);">' + item.name + '</a></li>');
				$(html).find('> ul').append(itemHTML);
				$(itemHTML).on('click', function(){
					item.action();
					$(html).remove();
				});
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
					var itemHTML = $('<li><a href="javascript:void(0);" onClick="' + sub.action + '">' + sub.name + '</a></li>');
					$(temp).find('> .dropdown-menu').append(itemHTML);
					$(itemHTML).on('click', function(){
						sub.action();
						$(html).remove();
					});
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
			//$(this).find('.dropdown-submenu ul').hide();
			$(this).remove();
		});
		
		$(html).find('> .dropdown-menu').dropdown('toggle');
		return html;
	}
};

// 10. getValueListOfObjects
var getValueListOfObjects = function(list, key){
	var result = [];
	
	$.each(list, function(index, item){
		result.push(item[key]);
	});
	
	return result;
};