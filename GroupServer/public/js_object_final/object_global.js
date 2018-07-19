var localIDGenerator = function () {
	return '_' + Math.random().toString(36).substr(2, 9);
};

var extendData = function(data){
	data.tabs.forEach(function(tab){
		var index = 1;
		tab.questions.forEach(function(q){
			q.index = index;
			index ++;
			if(q.options != undefined){
				var sub_index = 1;
				q.options.forEach(function(o){
					o.index = sub_index;
					sub_index ++;
				});
			}
		})
	});
	
	data.tabs.forEach(function(tab){
		tab.questions.forEach(function(q){
			if(q.constraints != undefined){
				q.constraints.forEach(function(c){
					var full_q = tab.questions.find(function(f){
						return f.lid == c.lid;
					});
					c.index = full_q.index;
					c.title = full_q.title;
					
					c.options.forEach(function(co){                                                                                                                                                                                                                                                                                                                                                                 
						var full_o = full_q.options.find(function(fo){
							return fo.lid == co.lid;
						});
						co.index = full_o.index;
						co.name = full_o.name;
					});
					
					//console.log(c.lid, full_q);
				});
			}
		})
	});
	
	
	
	return data;
};

var objIsEmpty = function(obj){
	return Object.keys(obj).length === 0 && obj.constructor === Object;
};

var TwinTables = function(context, data_top, data_bot, constr, toJson, callback){
	var $modal = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<h5 class="modal-title"></h5>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<table class="table">\n' +
		'					<thead>\n' +
		'						<!-- 标题 -->\n' +
		'					</thead>\n' +
		'					<tbody data-container="top">\n' +
		'						<tr class="active">\n' +
		'							<th style="text-align: center;" data-type="category"></th>\n' +
		'						</tr>\n' +
		'					</tbody >\n' +
		'					<tbody data-container="bot">\n' +
		'						<tr class="active">\n' +
		'							<th style="text-align: center;" data-type="category"></th>\n' +
		'						</tr>\n' +			
		'					</tbody>\n' +
		'				</table>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<button type="button" class="btn btn-primary" data-action="submit">确认</button>\n' +
		'				<button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	var loadContext = function(){
		$modal.find('.modal-title').text(context.title);
		
		$tr = $('<tr></tr>');
		$.each(context.thead, function(idx, item){
			$tr.append('<th>' + item + '</th>');
		});
		$tr.append('<th>操作</th>')
		$modal.find('thead').append($tr);
		
		$modal.find('tbody[data-container="top"] [data-type="category"]').text(context.top);
		$modal.find('tbody[data-container="bot"] [data-type="category"]').text(context.bot);
		$modal.find('tbody[data-container="top"] [data-type="category"]').attr('colspan', context.thead.length+1);
		$modal.find('tbody[data-container="bot"] [data-type="category"]').attr('colspan', context.thead.length+1);
		
	}
	
	var loadTop = function(){
		$.each(data_top, function(i, d){
			var $item = constr(d);
			$item.append('<td><a href="#" data-action="remove"><i class="fa fa-ban"></i></a></td>');
			$modal.find('tbody[data-container="top"]').append($item);
		});
	};
	
	var loadBot = function(){
		$.each(data_bot, function(i, d){
			var $item = constr(d);
			$item.append('<td><a href="#" data-action="add"><i class="fa fa-plus"></i></a></td>');
			$modal.find('tbody[data-container="bot"]').append($item);
		});
	};
	
	var initialize = function(){
		loadContext();
		loadTop();
		loadBot();
		checkEmpty();
		
		
		$modal.on('click', '[data-action]', function(){
			var type = $(this).attr('data-action');
			var $tr = $(this).closest('tr');
			
			if(type == 'remove'){
				$modal.find('tbody[data-container="bot"]').append($tr);
				$(this).replaceWith('<td><a href="#" data-action="add"><i class="fa fa-plus"></i></a></td>');
				checkEmpty();
			}else if(type == 'add'){
				$modal.find('tbody[data-container="top"]').append($tr);
				$(this).replaceWith('<td><a href="#" data-action="remove"><i class="fa fa-ban"></i></a></td>');
				checkEmpty();
			}else if(type == "submit"){
				var result = [];
				$modal.find('[data-container="top"] [data-type="tr"]').each(function(index, item){
					var data = toJson($(item));
					if(!objIsEmpty(data))
						result.push(data);
				});
				
				callback(result);
				
				$modal.modal('hide');
			}else{
				console.lol('error');
			}
		});
		
		$modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		$modal.modal('show');
	};
	
	var checkEmpty = function(){
		var colspan = $modal.find('tbody[data-container="top"] [data-type="category"]').attr('colspan');
		
		if($modal.find('tbody[data-container="top"] tr').length == 1){
			$modal.find('tbody[data-container="top"]').append('<tr><td colspan="' + colspan + '" style="text-align: center;" data-type="empty-holder">暂无选项</td></tr>');
		}else{
			$modal.find('tbody[data-container="top"] [data-type="empty-holder"]').remove();
		}
		
		if($modal.find('tbody[data-container="bot"] tr').length == 1){
			$modal.find('tbody[data-container="bot"]').append('<tr><td colspan="' + colspan + '" style="text-align: center;" data-type="empty-holder">暂无选项</td></tr>');
		}else{
			$modal.find('tbody[data-container="bot"] [data-type="empty-holder"]').remove();
			
		}
	}
	
	initialize();
	
};

var callAlert = function(msg){
	alert(msg);
};

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

var countDown = function(deadline, callback1, callback2){
	var x = setInterval(function() {
		// Get todays date and time
		var now = new Date().getTime();
		
		// Find the distance between now an the count down date
		var distance = deadline - now;
		
		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		
		// Output the result in an element with id="demo"
		c = days + "天 " + hours + "小时 " + minutes + "分 " + seconds + "秒 ";
		
		callback1(c);
		
		// If the count down is over, write some text 
		if (distance < 0) {
			clearInterval(x);
			callback2();
		}
	}, 1000);
};
