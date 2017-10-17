/* 1. 提示框 */
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

/* 2. 输入框 */
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
			callback(input, modal);
		});
		
		
		modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		modal.modal('show');
	})();
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

/* 4. Random Color */
var googleColorRandomPicker = function(){
	var color_list = ['rgb(55, 141, 59)', 'rgb(65, 65, 65)', 'rgb(29, 135, 228)', 'rgb(119, 143, 155)', 'rgb(91, 106, 191)', 'rgb(125, 86, 193)', 'rgb(248, 167, 36)', 
		'rgb(255, 111, 66)', 'rgb(235, 63, 121)', 'rgb(229, 57, 53)', 'rgb(140, 109, 98)'];
	var random = Math.floor(Math.random() * (color_list.length));
	//console.log(color_list[random]);
	return color_list[random];
};

/* 5.1  求差集 list1 - list2 */
var getDifferenceSet = function(list1, list2, key){
	var set = [];
	$.each(list1, function(index1, item1){
		var flag = true;
		$.each(list2, function(index2, item2){
			if(item1[key] == item2[key]){
				flag = false;
				return false;
			}
		});
		if(flag){
			set.push(item1);
		}
	});
	return set;
};

/* 5.2 */
var getDifferenceSetBeta = function(list1, list2){
	var set = [];
	$.each(list1, function(index1, item1){
		var flag = true;
		$.each(list2, function(index2, item2){
			if(item1 == item2){
				flag = false;
				return false;
			}
		});
		if(flag){
			set.push(item1);
		}
	});
	return set;
};



/* 6. object array to string array */
var toStringArray = function(list, key){
	var result = [];
	$.each(list, function(index, item){
		result.push(item[key]);
	});
	
	return result;
};
