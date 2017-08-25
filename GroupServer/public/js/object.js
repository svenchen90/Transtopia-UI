$.fn.modal.Constructor.DEFAULTS.backdrop = 'static';
/* 
1. 修改群组基本信息 UpdateGroupInfo(groupID)
2. 修改群设置 - UpdateGroupSetting(groupID)
 */
 
/* 1. 修改群组基本信息 */
var UpdateGroupInfo = function(groupID){
	var obj = this;
	var modal = $(
		'<div class="modal fade" id="modal-group-edit">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-body">\n' +
		'				<div class="menu-top">\n' +
		'					<span class="close pull-left" data-dismiss="modal">&times;</span>\n' +
		'					<span>修改群组信息</span>\n' +
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
		'						<p><i class="fa fa-user-o"></i> 群组名称</p>\n' +
		'						<input class="form-control input-lg" name="name" />\n' +
		'					</div>\n' +
		'					<div class="form-group">\n' +
		'						<p><i class="fa fa-pencil-square"></i> 群组简介</p>\n' +
		'						<textarea class="form-control input-lg" name="introduction" ></textarea>\n' +
		'					</div>\n' +
		'					<div class="form-group">\n' +
		'						<p><i class="fa fa-pencil"></i> 兴趣类别 <span class="pull-right"><a href="#" data-action="editGenres">修改</a></span></p>\n' +
		'						<div name="category" style="margin-top:10px;">\n' +
		'						</div>\n' +
		'					</div>\n' +
		'					<div class="form-group">\n' +
		'						<p><i class="fa fa-tags"></i> 兴趣话题 <span class="pull-right"><a href="#" data-action="editTopic">修改</a></span></p>\n' +
		'						<div name="tag" style="margin-top:10px;">\n' +		
		'						</div>\n' +
		'					</div>\n' +	
		'					<div class="form-group">\n' +
		'						<p><i class="fa fa-qrcode"></i> 二维码</p>\n' +
		'						<div style="text-align: center;"><img name="qr_image" style="height: 200px;"/></div>\n' +
		'					</div>\n' +
		'				</div>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
		);
	
	//加载数据
	var loadData = function(data){
		modal.find('[data-target="bg_image"]').prop('src', data.bg_image);
		modal.find('[data-target="image"]').prop('src', data.image);
		modal.find('[name="name"]').prop('value', data.name);
		modal.find('[name="introduction"]').text(data.introduction);
		//### 二维码
		modal.find('[name="qr_image"]').prop('src', '/dist/img/Qr-code-ver-10.png');
		// 

		//加载群组类别
		$.each(data.category, function(i, g){
			modal.find('[name="category"]').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
		});
		
		//加载群组兴趣
		$.each(data.tags, function(i, t){
			modal.find('[name="tag"]').append('<span class="label" style="margin-right: 5px; background-color: ' + googleColorRandomPicker() + ';">' + t + '</span>');
		});
	};
	
	//获取数据
	var getData = function(){
		var data = {
			name: modal.find('[name="name"]').prop('value'),
			introduction: modal.find('[name="introduction"]').text()
		};
		
		var category = [];
		$.each(modal.find('[name="category"] > span'), function(index, item){
			category.push($(item).text());
		});
		data.category = category;
		
		var tags = [];
		$.each(modal.find('[name="tag"] > span'), function(index, item){
			tags.push($(item).text());
		});
		data.tags = tags;
		
		return data;
	};
	
	
	//初始化
	$.ajax({
		url : '/group/get-instance/' + groupID,
		data: {},
		cache : true, 
		async : true,
		type : "GET",
		dataType : 'json',
		success : function (data){
			if(data == 0){
				//error message
				callAlert('加载失败！', 'clear', function(){});
			}else{
				loadData(data);
				
				//加载slimscroll
				modal.find('[name="introduction"]').slimScroll({
					width: '100%',
					height: '68px' 
				});
				
				//submit
				modal.find('[data-action="submit"]').on('click', function(){
					$.ajax({
						url : '/group/update-instance/' + groupID,
						data: getData(),
						cache : true, 
						async : true,
						type : "GET",
						dataType : 'json',
						success : function (data){
							if(data == 0){
								//error message
								callAlert('错误！', 'clear', function(){});
							}else{
								callAlert('修改成功！', 'done', function(){
									modal.modal('hide');
									//###刷新页面
								});
							}
						},
						error: function(err){
							callAlert('错误！', 'clear', function(){});
						}
					});
				});
				
				
				//关闭模态框时，自动删除
				modal.on('hidden.bs.modal', function(){
					$(this).remove();
				});
				
				//显示模态框
				modal.modal('show');
			}
		},
		error: function(err){
			callAlert('加载失败！', 'clear', function(){});
		}
	});
	
	
	
	
	/* 
	//修改类别
	$(html).find('[data-action="editGenres"]').on('click',function(){
		$.ajax({
			url : '/getgroupgenres',
			data: {id: data.id},
			cache : false, 
			async : false,
			type : "GET",
			dataType : 'json',
			success : function (result){
				$().twinRowModal({
					title: '管理群组类别',
					dataTop: result.avaliable,
					dataBot: result.current,
					funcCard1: createModalCardHTML,
					funcCard2: createModalFunctionCardHTML1,
					funcCardInput2: {
						title: '新增类别',
						cardTitle: '新增类别',
						action: '/test123'
					},
					actionSubmit: '/test456'
				});
				
				// if(result == 1){
					// $(twinRowHTML).modal('hide');
					// callAlert('修改成功','done');
				// }else{
					// callAlert('错误','highlight_off');
				// }
			}
		});
	});
	
	//修改兴趣
	$(html).find('[data-action="editTopic"]').on('click',function(){
		$.ajax({
			url : '/getgrouptopic',
			data: {id: data.id},
			cache : false, 
			async : false,
			type : "GET",
			dataType : 'json',
			success : function (result){
				$().twinRowModal({
					title: '管理群组话题',
					dataTop: result.avaliable,
					dataBot: result.current,
					funcCard1: createModalCardHTML,
					funcCard2: createModalFunctionCardHTML1,
					funcCardInput2: {
						title: '新增话题',
						cardTitle: '新增话题',
						action: '/test123'
					},
					actionSubmit: '/test456'
				});
				
				// if(result == 1){
					// $(twinRowHTML).modal('hide');
					// callAlert('修改成功','done');
				// }else{
					// callAlert('错误','highlight_off');
				// }
			}
		});
	});
	 */
	
	
};

new UpdateGroupInfo(123);

var newObj = function(callback){
	callback();
};

var testCallBack = function(callback){
	$(modal).on('hidden.bs.modal', function(){
		$(this).remove();
	});
};


/* 2. 修改群设置 */
var GroupSetting = function(groupID){
	var modal = $(
		'<div class="modal fade">\n' + 
		'	<div class="modal-dialog">\n' + 
		'		<div class="modal-content">\n' + 
		'			<div class="modal-header">\n' + 
		'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' + 
		'				<h4 class="modal-title">群组隐私设置</h4>\n' + 
		'			</div>\n' + 
		'			<div class="modal-body">\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">新成员加入时需要验证</div>\n' + 
		'					<div class="col-xs-2">\n' + 
		'						<label class="switch">\n' + 
		'							<input name="allow_new_member_validation" type="checkbox">\n' + 
		'							<div class="slider round"></div>\n' + 
		'						</label>\n' + 
		'					</div>\n' + 
		'				</div>\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">接收新成员加入</div>\n' + 
		'					<div class="col-xs-2">\n' + 
		'						<label class="switch">\n' + 
		'							<input name="allow_new_member_in" type="checkbox">\n' + 
		'							<div class="slider round"></div>\n' + 
		'						</label>\n' + 
		'					</div>\n' + 
		'				</div>\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">允许群被关注</div>\n' + 
		'					<div class="col-xs-2">\n' + 
		'						<label class="switch">\n' + 
		'							<input name="allow_new_following" type="checkbox">\n' + 
		'							<div class="slider round"></div>\n' + 
		'						</label>\n' + 
		'					</div>\n' + 
		'				</div>\n' + 
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">允许群组名片被分享</div>\n' + 
		'					<div class="col-xs-2">\n' + 
		'						<label class="switch">\n' + 
		'							<input name="allow_group_share" type="checkbox">\n' + 
		'							<div class="slider round"></div>\n' + 
		'						</label>\n' + 
		'					</div>\n' + 
		'				</div>\n' +
		'				<div class="row">\n' + 
		'					<div class="col-xs-10 menu-label">只允许关注者分享动态</div>\n' + 
		'					<div class="col-xs-2">\n' + 
		'						<label class="switch">\n' + 
		'							<input name="allow_post_share_following" type="checkbox">\n' + 
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
	var loadData = function(data){
		modal.find('[name="allow_new_member_validation"]').prop('checked', data.allow_new_member_validation);
		modal.find('[name="allow_new_member_in"]').prop('checked', data.allow_new_member_in);
		modal.find('[name="allow_new_following"]').prop('checked', data.allow_new_following);
		modal.find('[name="allow_group_share"]').prop('checked', data.allow_group_share);
		modal.find('[name="allow_post_share_following"]').prop('checked', data.allow_post_share_following);
	};
	
	//获取表单数据
	var getFormData = function(){
		var formData = {
			allow_new_member_validation: modal.find('[name="allow_new_member_validation"]').is(':checked') ? 1 : 0, //新成员加入时需要验证
			allow_new_member_in: modal.find('[name="allow_new_member_in"]').is(':checked') ? 1 : 0, //接收新成员加入
			allow_new_following: modal.find('[name="allow_new_following"]').is(':checked') ? 1 : 0, //允许群被关注
			allow_group_share: modal.find('[name="allow_group_share"]').is(':checked') ? 1 : 0, //允许群组名片被分享
			allow_post_share_following: modal.find('[name="allow_post_share_following"]').is(':checked') ? 1 : 0, // 只允许关注者分享动态
		};
		return formData;
	};
	
	//初始化
	$.ajax({
		url : '/group/get-instance/' + groupID,
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
				loadData(data);
				
				//提交表单事件
				//### URL
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
						url : '/group/update-private/' + groupID + '/' + option + '/' + value,
						cache : true, 
						async : true,
						type : "GET",
						dataType : 'json',
						success : function (result){
							if(result == 0){
								//error message
								callAlert('错误！', 'clear', function(){
									$(target).prop('checked', (value + 1)%2);
								});
								
							}else{
								callAlert('修改成功！', 'done', function(){});
							}
						},
						error: function(err){
							callAlert('错误！', 'clear', function(){
								$(target).prop('checked', (value + 1)%2);
							});
						}
					});
				});
				
				/* 
				modal.find('[data-action="submit"]').on('click', function(){
					$.ajax({
						url : '/group/update-private/' + groupID,
						data: getFormData(),
						cache : true, 
						async : true,
						type : "GET",
						dataType : 'json',
						success : function (result){
							if(result == 0){
								//error message
							}else{
								callAlert('修改成功！', 'done', function(){
									modal.modal('hide');
								});
							}
						}
					});
				}); 
				*/
				
				//关闭时清楚模块
				modal.on('hidden.bs.modal', function(){
					$(this).remove();
				});
				
				//显示模态框
				modal.modal('show');
			}
		}
	});
};