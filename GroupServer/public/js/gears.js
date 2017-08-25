//Google 随机取色器
var googleColorRandomPicker = function(){
	var color_list = ['rgb(55, 141, 59)', 'rgb(65, 65, 65)', 'rgb(29, 135, 228)', 'rgb(119, 143, 155)', 'rgb(91, 106, 191)', 'rgb(125, 86, 193)', 'rgb(248, 167, 36)', 
		'rgb(255, 111, 66)', 'rgb(235, 63, 121)', 'rgb(229, 57, 53)', 'rgb(140, 109, 98)'];
	var random = Math.floor(Math.random() * (color_list.length));
	//console.log(color_list[random]);
	return color_list[random];
};

//提示框
var callAlert = function(text, icon, callback){
	var html = $(
		'<div class="modal fade" id="modal-alert">\n' +
		'	<div class="modal-dialog" style="width: 150px; opacity: 0.6">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-body" style="padding: 0;  height: 150px; background-color: rgba(0,0,0,1);">\n' +
		'				<i class="material-icons" style="margin-left: 25px; font-size: 100px; color: rgba(255,255,255, 1)">' + icon + '</i>\n' +
		'				<p style="color: rgba(255,255,255, 1); font-size: 16px; text-align: center;">' + text + '</p>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	html.on('hidden.bs.modal', function(){
		$(this).remove();
	});
	
	html.modal('show');
	
	
	setTimeout(function(){
		html.modal('hide');
		callback();
	}, 1000);
};

//确认框
var callConfirm = function(title, text, actionConfirm, dataConfirm, actionCancel, dataCancel){
	$.confirm({
		title: title,
		content: text,
		buttons: {
			确定: function () {
				actionConfirm(dataConfirm);
				/* callAlert('操作完成', 'done'); */
			},
			取消: function () {
			}
		}
	});
};
