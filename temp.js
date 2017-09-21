var SharePostController = function(){
	var modal = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
		'				<h5 class="modal-title">\n' +
		'					<img data-name="image" style="width: 50px;height: 50px; padding: 2px; border: 2px solid #d2d6de;border-radius: 50%;"/>\n' +
		'					<b class="fa fa-caret-right" style="font-size: 16px; margin-left:5px;"></b>\n' +
		'					<a href="javascript:void(0);" data-action="sharedwith"><i class="fa fa-globe"></i></a>\n' +
		'					<span data-target="sharewith" data-value=""></span>\n' +
		'				</h5>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<textarea data-newcomment placeholder="请输入转发评论..." rows=3 style="width: 100%; resize: none;"></textarea>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a data-action="submit">提交</a>\n' +
		'				<a data-dismiss="modal">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	var sharedWith = {
		role: '',
		authority: '',
		authority_ids: [],
		authority_tags: []
	};
	
	var setSharedWith = function(role, authority, authority_tags, authority_ids){
		sharedWith.role = role;
		sharedWith.authority = authority;
		sharedWith.authority_tags = authority_tags;
		sharedWith.authority_ids = authority_ids;
		
		displaySharedWith();
	};
	
	var getShareWith = function(){
		return sharedWith;
	};
	
	
	var displaySharedWith = function(){
		var target = modal.find('[data-target="sharewith"]');
		if(sharedWith.role == 1){
			var textMap = [
				'',
				'公开',
				'朋友圈',
				'自定义',
				'自定义',
				'私有'
			];
			target.text(textMap[sharedWith.authority]);
			// something else
		}else if(sharedWith.role == 2){
			var textMap = [
				'',
				'公开',
				'仅群成员可见'
			];
			target.text(textMap[sharedWith.authority]);
		}else{
			console.log('error');
		}
	};
	
	
	//分享新动态
	this.createSharePost = function(pid){
		//加载用户信息
		$.ajax({
			url : URL_GET_CURRENT_USER,
			type : "GET",
			dataType : 'json',
			success : function (user){
				if(user == 0){
					callAlert('加载失败！', '<i class="material-icons">error_outline</i>', function(){});
				}else{
					modal.find('[data-name="image"]').prop('src', ImageURLPrefix + user.image);

					// 初始化群组分享范围
					setSharedWith(1, 1, [], []);
					modal.find('[data-action="sharedwith"]').on('click', function(){
						var dataShareWith = getShareWith();
						var SWModal = new SharedWithModal(user.id);
						SWModal.ajaxLoadForIndividual(dataShareWith.authority, dataShareWith.authority_tags, dataShareWith.authority_ids, function(data, modal){
							setSharedWith(1, data.type, data.selectedTag, data.selectedUser);
							modal.modal('hide');
						});
					});

				}
			},
			error: function(err){
				callAlert('加载失败！', '<i class="material-icons">error_outline</i>', function(){});
			}
		});
		
		//submit
		modal.find('[data-action="submit"]').click(function(){
			var sharedWith = getShareWith();
			var content = modal.find('textarea').val();
			$.ajax({
				url : URL_SHARE_POST,
				data: {
					role: sharedWith.role,
					type: 2,
					authority: sharedWith.authority,
					authority_tags: JSON.stringify(sharedWith.authority_tags),
					authority_ids:  JSON.stringify(sharedWith.authority_ids),
					content: content,
					sharepid: pid
				},
				type : "GET",
				dataType : 'json',
				success : function (result){
					if(result == 0){
						callAlert('错误 ！', '<i class="material-icons">clear</i>', function(){});
					}else{
						callAlert('成功！', '<i class="material-icons">done</i>', function(){
							location.reload();
						});
					}
				},
				error: function(err){
					console.log(err);
				}
			});
		});
		
		modal.modal('show');
	};

	// 修改分享动态
	this.modifySharePost = function(pid){
		//加载post
		$.ajax({
			url : URL_GET_POST + pid,
			type : "GET",
			dataType : 'json',
			success : function (post){
				if(user == 0){
					callAlert('加载失败！', '<i class="material-icons">error_outline</i>', function(){});
				}else{
					if(post.role == 1){
						// 用户分享
						modal.find('[data-name="image"]').prop('src', ImageURLPrefix + post.uimage);
						setSharedWith(post.role, post.authority, post.authority_tags, post.authority_ids);
						modal.find('[data-action="sharedwith"]').on('click', function(){
							var dataShareWith = getShareWith();
							var SWModal = new SharedWithModal(user.id);
							SWModal.ajaxLoadForIndividual(dataShareWith.authority, dataShareWith.authority_tags, dataShareWith.authority_ids, function(data, modal){
								setSharedWith(1, data.type, data.selectedTag, data.selectedUser);
								modal.modal('hide');
							});
						});
					}else if(post.role == 2){
						//群组分享
						console.log('群组分享借口')
					}else{
						console.log('error');
					}
				}
			},
			error: function(err){
				callAlert('加载失败！', '<i class="material-icons">error_outline</i>', function(){});
			}
		});
		
		//submit
		modal.find('[data-action="submit"]').click(function(){
			var sharedWith = getShareWith();
			var content = modal.find('textarea').val();
			$.ajax({
				url : URL_UPDATE_POST,
				data: {
					pid: pid,
					role: sharedWith.role,
					authority: sharedWith.authority,
					authority_tags: JSON.stringify(sharedWith.authority_tags),
					authority_ids:  JSON.stringify(sharedWith.authority_ids),
					content: content
				},
				type : "GET",
				dataType : 'json',
				success : function (result){
					if(result == 0){
						callAlert('错误 ！', '<i class="material-icons">clear</i>', function(){});
					}else{
						callAlert('成功！', '<i class="material-icons">done</i>', function(){
							location.reload();
						});
					}
				},
				error: function(err){
					console.log(err);
				}
			});
		});
		
		modal.modal('show');
	};
	

	(function(){
		modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
	})();
};