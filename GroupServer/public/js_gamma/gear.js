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

/* 2. 提示框 */
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