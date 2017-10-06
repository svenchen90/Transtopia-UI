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