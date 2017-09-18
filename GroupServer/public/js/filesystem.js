var FileSystemController = function(id, container){
	var obj = this;
	var currentPageID;
	var currentAuthority;
	var copyID;
	var cutID;
	var fsAgent;
	
	var filePannel = $(
		'<div class="file-pannel">\n' +
		'	<div class="dir" style="display: inline-block; line-height: 34px;"></div>\n' +
		'	<div class="form-group pull-right" style="width: 250px;">\n' +
		'		<div class="input-group">\n' +
		'			<input type="text" class="form-control" placeholder="搜索..." data-action="search" />\n' +
		'			<div class="input-group-addon" style="cursor: pointer;">\n' +
		'				<i class="fa fa-search"></i>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'	<div class="clearfix"></div>\n' +
		'	<div class="file-block">\n' +
		'	</div>\n' +
		'</div>'
	);
	
	
	// 初始化
	this.initForGroup = function(){
		const URL_USER_GROUP_AUTHORITY = '/group/get-authority-for-current-user/';
		
		this.clean();
		
		this.load(0);
		
		var getMenuDate = function(type, authorityList, targetID){
			var result = [];
			
			if(type == 1){
				// 打开文件
				result.push({
					name: '打开',
					action: function(){
						this.load(targetID);
					}
				});
				
				if(authorityList.includes(102) && authorityList.includes(103)){
					// 新建文件夹
					result.push({
						name: '新建文件夹',
						action: function(){
							this.newFolder(targetID);
						}
					});
					
					// 上传文件
					result.push({
						name: '上传文件',
						action: function(){
							this.uploadGroupFile(targetID);
						}
					});
					
					// 复制
					result.push({
						name: '复制',
						action: function(){
							this.copy(targetID);
						}
					});
					
					// 剪切
					result.push({
						name: '剪切',
						action: function(){
							this.cut(targetID);
						}
					});
					
					//粘贴
					if(cutID || copyID){
						result.push({
							name: '粘贴',
							action: function(){
								this.paste(targetID);
							}
						});
					}
					
					// 修改权限
					result.push({
						name: '修改权限',
						action: function(){
							
						}
					});
					
					// 查看属性
					result.push({
						name: '查看属性',
						action: function(){
							
						}
					});
					
				}
			}else if(type == 2){
				// 打开文件
				result.push({
					name: '打开',
					action: function(){
						this.openFile(targetID);
					}
				});
				
				if(authorityList.includes(102) && authorityList.includes(103)){
					// 复制
					result.push({
						name: '复制',
						action: function(){
							this.copy(targetID);
						}
					});
					
					// 剪切
					result.push({
						name: '剪切',
						action: function(){
							this.cut(targetID);
						}
					});
					
					// 修改权限
					result.push({
						name: '修改权限',
						action: function(){
							
						}
					});
					
					// 查看属性
					result.push({
						name: '查看属性',
						action: function(){
							
						}
					});
				}
			}else if(type == 3){
				// 刷新
				result.push({
					name: '刷新',
					action: function(){
						this.refresh();
					}
				});
				
				if(authorityList.includes(102) && authorityList.includes(103)){
					// 新建文件夹
					result.push({
						name: '新建文件夹',
						action: function(){
							this.newFolder(targetID);
						}
					});
					
					// 上传文件
					result.push({
						name: '上传文件',
						action: function(){
							this.uploadGroupFile(targetID);
						}
					});
					
					//粘贴
					if(cutID || copyID){
						result.push({
							name: '粘贴',
							action: function(){
								this.paste(targetID);
							}
						});
					}
					
					// 修改权限
					result.push({
						name: '修改权限',
						action: function(){
							
						}
					});
					
					// 查看属性
					result.push({
						name: '查看属性',
						action: function(){
							
						}
					});
				}
			}else{

			}
			
			return result;
		};
		
		//菜单效果
		filePannel.find('.file-block').on('contextmenu', function(ev){
			ev.preventDefault();
			
			//获取被点击对象
			var target = $(ev.target).closest('leftclickable');
			var targetID, type;
			if(target.length == 0){
				//点击对象为面板
				targetID = currentPageID;
				type = 3;
			}else if(target.length == 1){
				//点击对象为文件||文件夹
				targetID = $(target).attr('data-id');
				type = $(target).attr('data-type');
			}else{
				
			}
			
			//加载菜单
			$.ajax({
				url : URLPrefix + URL_USER_GROUP_AUTHORITY + id,
				cache : true, 
				async : true,
				type : "GET",
				dataType : 'json',
				success : function (result){
					if(result == 0){
						console.log('error');
					}else{
						var menuData = getMenuDate(type, result, targetID);
						var menuHTML = customizeRightClickMenu(result);
						$('body').append(menuHTML);
						//显示菜单
						$(menuHTML).css({position: 'absolute', top: ev.pageY, left: ev.pageX, 'z-index': 2000});
					}
				},
				error: function(err){
					console.log(err);
				}
			});
		});
		
		container.append(filePannel);
	};
	
	// 清空
	this.clean = function(){
		container.empty();
	};
	
	// 复制
	this.copy = function(fid){
		cutID = undefined;
		copyID = fid;
	}
	
	// 剪切
	this.cut = function(fid){
		copyID = undefined;
		cutID = fid;
	};
	
	// 粘贴
	this.paste = function(targetID){
		if(copyID){
			
		}else if(cutID){
			this.fsAgent.move(id, cutID, targetID, 
			function(result){
				callAlert('移动成功！', 'done', obj.refresh);
			},
			function(){
				console.log('error - > FileSystemController -> paste')
			});
		}else{
			console.log('error');
		}
	};
	
	// 新建文件夹
	this.newFolder = function(targetID){
		/* 
			inputs 结构:
			{
				dirFull: 
				dirRoot: 
				dataRequest: 
				createCard: 
			}
		 */
		var html = $(
			'<div class="modal fade">\n' +
			'	<div class="modal-dialog">\n' +
			'		<div class="modal-content">\n' +
			'			<div class="modal-body">\n' +
			'				<div class="main-content">\n' +
			'					<div class="modal-header">\n' +
			'						<button type="button" class="close" data-dismiss="modal">×</button>\n' +
			'						<h4 class="modal-title">新建文件夹</h4>\n' +
			'					</div>\n' +
			'					<div style="margin: 15px;">\n' +
			'						<div class="form-group">\n' +
			'							<input class="form-control input-lg" data-type="name" style="border-top: none;border-left: none;border-right: none;" placeholder="文件夹名称" />\n' +
			'							<div class="err-msg" data-target="name" style="color: rgba(255,0,0,0.8);font-size: 12px;font-weight: 400;margin-top:5px;padding-left: 15px;display: none;">\n' +
			'							</div>\n' +
			'						</div>\n' +
			'						<div class="form-group">\n' +
			'							<input class="form-control input-lg" data-type="authority" style="border-top: none;border-left: none;border-right: none;" placeholder="权限" />\n' +
			'							<div class="err-msg" data-target="authority" style="color: rgba(255,0,0,0.8);font-size: 12px;font-weight: 400;margin-top:5px;padding-left: 15px;display: none;">\n' +
			'							</div>\n' +
			'						</div>\n' +
			'					</div>\n' +
			'				</div>\n' +
			'				<div class="modal-footer">\n' +
			'					<a data-dismiss="modal" style="font-weight: 600;color: rgba(0,0,0,0.54);">关闭</a>\n' +
			'					<a class="btn-submit" href="#" style="font-weight: 600;">确认</a>\n' +
			'				</div>\n' +
			'			</div>\n' +
			'		</div>\n' +
			'	</div>\n' +
			'</div>'
		);
		

		
		$(html).find('.btn-submit').on('click', function(){
			var name = $(html).find('[data-type="name"]').val();
			var authority = $(html).find('[data-type="authority"]').val();
			
			if(name == ''){
				$(html).find('.err-msg').text('文件名称不能为空');
			}else{
				this.sfAgent.createFolder(id, targetID, authority, 
				function(result){
					callAlert('创建成功！','done', function(){
						$(html).modal('hide');
						obj.load(targetID);
					});
					
				}, 
				function(){
						console.log('error');
				})
			}
		});
		
		//关闭时自动销毁模态框
		$(html).on('hidden.bs.modal', function(){
			$(this).remove();
		})
		
		$(html).modal('show');
	};
	
	// 上传文件
	this.uploadGroupFile = function(targetID){
		// 第一步选择权限范围
		var sharedWithModal = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
		'				<h5 class="modal-title">请选择文件访问权限</h5>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div class="form-group">\n' +
		'          <label style="display: block; padding-left: 15px;">\n' +
		'            <input type="radio" data-type="authority" name="r1" class="minimal" value="1" checked>公开\n' +
		'          </label>\n' +
		'          <label style="display: block; padding-left: 15px;">\n' +
		'            <input type="radio" data-type="authority" name="r1" class="minimal" value="2"> 仅群组可见\n' +
		'          </label>\n' +
		'          <label style="display: block; padding-left: 15px;">\n' +
		'            <input type="radio" data-type="authority" name="r1" class="minimal" value="3"> 付费可见\n' +
		'          </label>\n' +
		'        </div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a data-action="submit">提交</a>\n' +
		'				<a data-dismiss="modal">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
		);
		
		// 第二步，上传文件
		sharedWithModal.find('[data-action="submit]').click(function(){
			var authority = sharedWithModal.find('[data-type="authority"]:checked').prop('value');
			sharedWithModal.modal('hide');
			
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
				uploadUrl: URLPrefix + '/group/operation/create-folder-file/' + 2 + '/' + id + '/' + targetID + '/' + authority,
				//allowedFileExtensions: ['jpg', 'png'],
				maxFileCount: 1,
			});
			
			//上传完成后方法
			html.find('input').on('fileuploaded', function(event, data, previewId, index) {
				/* var form = data.form, files = data.files, extra = data.extra,
						response = data.response, reader = data.reader;
				console.log('File uploaded triggered'); */
				if(data.response == 0 || data.response == 1){
					callAlert('错误！', '<i class="material-icons">clear</i>', function(){});
				}else{
					callAlert('更新成功！', '<i class="material-icons">done</i>', function(){
						html.modal('hide');
						obj.load(targetID);
					});
				}
			});
			
			html.on('hidden.bs.modal', function(){
				$(this).remove();
			});
			
			html.modal('show');
		});
		
		
		
		
		sharedWithModal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		sharedWithModal.modal('show');	
	};
	
	
	// 加载
	this.load = function(folderID){
		this.fsAgent.getAllOf(id, folderID,
			function(result){
				loadData(result.dirList, result.fileList);
				currentPageID = folderID;
				currentAuthority = result.authority;
			},
			function(result){
				console.log('error - > FileSystemController -> load')
			}
		)
	};
	
	// 刷新当前页面
	this.refresh = function(){
		this.load(currentPageID);
	};
	
	
	// 添加文件
	this.appendFile = function(data){
		console.log('to do list');
	};
	
	// 加载文件
	var loadData = function(dirList, fileList){
		/* 加载路径 */
		filePannel.find('.dir').empty();
		$.each(dirList, function(index, dir){
			var dirStyle = $('<span class="dir-item" data-id="' + dir.id + '">' + dir.name + '<i class="material-icons">keyboard_arrow_down</i></span>');
			filePannel.find('.dir').append(dirStyle);
			
			dirStyle.click(function(evt){
				obj.load(dir.id);
			});
		});
		
		/* 加载文件 */
		filePannel.find('.file-block').empty();
		$.each(fileList, function(index, file){
			var fileStyle = createFileCard(file);
			
			/* 加载样式到pannel */
			if(file.type == 1){
				// 文件夹
				filePannel.find('.file-block').prepend(fileStyle);
			}else if(file.type == 2){
				// 文件
				filePannel.find('.file-block').append(fileStyle);
			}else{
				console.log('error - >', file)
			}
			
			/* 添加拖拽效果 */
			fileStyle.draggable({
				zIndex: 2500,
				revert: true
			});
			if(file.type == 1){
				fileStyle.droppable({
					drop: function( event, ui ) {
						/* 
							ui.draggable : drag对象
							event.target : drop对象
						*/
						var idDrag = $(ui.draggable).attr('data-id');
						var idDrop = $(event.target).attr('data-id');

						fsAgent.move(id, idDrag, idDrop, 
							function(result){
								callAlert('移动成功！', 'done', obj.refresh);
							}, 
							function(result){
								callAlert('移动失败！', 'done', obj.refresh);
							}
						);
					},
					over: function( event, ui ) {
						console.log(1111);
					}
				});
			}
			
			/* 左键点击效果 */
			if(file.type == 1){
				// 文件夹
				fileStyle.click(function(evt){
					obj.load(file.fid);
				});
			}else if(file.type == 2){
				// 文件
				fileStyle.click(function(evt){
					openFile(file.url);
				});
			}
		});
	};
	
	var openFile = function(url){
		window.open(url);
	};
	
	// 自定义右键菜单
	var customizeRightClickMenu = function(data){
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
			$.each(data.list, function(index, item){
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
	
	// 简单搜索
	var simpleSearch = function(query){
		$.each(filePannel.find(['allowsearch']), function(index, item){
			var name = $(item).find('[data-type="name"]').text();
			if(!name.match(query)){
				$(item).addClass('hide');
			}else
				$(item).removeClass('hide');
		});
	};
	
	// 创建文件卡片样式
	var createFileCard = function(data){
		/* 
			data = {
				uid: user id,
				uname: user name;
				uimage: user image
				parentid: parent of this file or folder's id
				fid: this folder/file id,
				## gid: group id,
				datetime---file created time.
				name: file/folder name
				f_path: file_path;
				authority: 1--public ,2--memebrs only, 3--members only and price paid
				type: 1--folder, 2--file,
				size: int--byte
			}
		*/
		
		/* ### 1 icon 2 样式区分authority */
		var card = $(
			'<div class="col-lg-2 col-md-3 col-sm-4" allowsearch leftclickable>\n' +
			'	<div class="file-card" style="background-color: gray;">\n'+
			'		<div class="card-body">\n'+
			'			<div class="content-default">\n'+
			'				<i class="material-icons">insert_drive_file</i>\n'+
			'				<div data-type="name" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"></div>\n'+		
			'			</div>\n'+
			'		</div>\n' +
			'	</div>\n' +
			'</div>'
		);
		
		card.attr({
				'data-id': data.fid,
				'data-type': data.type,
				'data-authority': data.authority,
			});
			
		card.find('[data-type="name"]').text(data.name);
		
		if(data.type == 1){
			// 文件夹
			
		}else if(data.type == 2){
			// 文件
			
		}else{
			console.log('创建文件卡片失败');
			return;
		}
		
		return card;
	};
};


var GroupFileSystemAgent = function(){
	// /group/operation/get-group-files/{gid}/{folder_id}
	const URL_GET_FOLDER = '/group/operation/get-group-files/';
	
	// /group/operation/create-folder-file/{option}/{groupid}/{folderid}/{authority}
	const URL_CREATE_FILE_FOLDER = '/group/operation/create-folder-file/';
	
	// /group/operation/delete-file-folder/{groupid}/{fid}
	const URL_DELETE_FILE_FOLDER = '/group/operation/delete-file-folder/';
	
	// /group/operation/move-file-folder/{groupid}/{fid}/{targetid}
	const URL_MOVE_FILE_FOLDER = '/group/operation/move-file-folder/';
	
	// /group/operation/copy-file-folder/{groupid}/{fid}/{targetid}
	const URL_COPY_FILE_FOLDER = '/group/operation/copy-file-folder/';
	
	// /group/operation/rename-file-folder/{groupid}/{fid}/{name}
	const ULR_RENAME_FILE_FOLDER = '/group/operation/rename-file-folder/';
	
	// /group/operation/change-authority-file-folder/{groupid}/{fid}/{authority}/{forall}
	const ULR_UPDATE_AUTHORITY = '/group/operation/change-authority-file-folder/';

	// 获取文件夹下，所有文件和子文件夹
	this.getAllOf = function(gid, fid, callback1, callback2){
		$.ajax({
			url : URLPrefix + URL_GET_FOLDER + gid + '/' + fid,
			cache : false, 
			async : false,
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(Array.isArray(result)){
					callback1(result);
				}else{
					callback2(result);
				}
			},
			error: function(err){
				console.log(err);
			}
		});
	};
	
	//上传文件????
	
	//创建文件夹
	this.createFolder = function(gid, targetID, authority, callback1, callback2){
		$.ajax({
			url : URLPrefix + URL_CREATE_FILE_FOLDER + 1 + '/' + gid + '/' + targetID + '/' + authority,
			cache : false, 
			async : false,
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 2){
					callback1(result);
				}else if(result == 0 || result == 1){
					callback2(result);
				}else{
					console.log('创建文件夹， 未知错误');
				}
			},
			error: function(err){
				console.log(err);
			}
		});
	};
	
	// 删除文件，文件夹
	this.delete = function(gid, fid, callback1, callback2){
		$.ajax({
			url : URLPrefix + URL_DELETE_FILE_FOLDER + gid + '/' + fid,
			cache : false, 
			async : false,
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 1){
					callback1(result);
				}else if(result == 0){
					callback2(result);
				}else{
					console.log('删除文件， 未知错误');
				}
			},
			error: function(err){
				console.log(err);
			}
		});
	};
	
	//移动文件、文件夹
	this.move = function(gid, fid, targetID, callback1, callback2){
		$.ajax({
			url : URLPrefix + URL_MOVE_FILE_FOLDER + gid + '/' + fid + '/' + targetID,
			cache : false, 
			async : false,
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 1){
					callback1(result);
				}else if(result == 0){
					callback2(result);
				}else{
					console.log('移动文件， 未知错误');
				}
			},
			error: function(err){
				console.log(err);
			}
		});
	};
	
	// 复制文件、文件夹
	this.copy = function(gid, fid, targetID, callback1, callback2){
		$.ajax({
			url : URLPrefix + URL_COPY_FILE_FOLDER + gid + '/' + fid + '/' + targetID,
			cache : false, 
			async : false,
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 1){
					callback1(result);
				}else if(result == 0){
					callback2(result);
				}else{
					console.log('复制文件， 未知错误');
				}
			},
			error: function(err){
				console.log(err);
			}
		});
	};
	
	// 重命名文件、文件夹
	this.rename = function(gid, fid, name, callback1, callback2){
		$.ajax({
			url : URLPrefix + ULR_RENAME_FILE_FOLDER + gid + '/' + fid + '/' + name,
			cache : false, 
			async : false,
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 1){
					callback1(result);
				}else if(result == 0){
					callback2(result);
				}else{
					console.log('文件更名， 未知错误');
				}
			},
			error: function(err){
				console.log(err);
			}
		});
	};
	
	
	// 更新文件、文件夹权限
	this.updateAuthority = function(gid, fid, authority, forall, callback1, callback2){
		$.ajax({
			url : URLPrefix + ULR_UPDATE_AUTHORITY + gid + '/' + fid + '/' + authority + '/' + forall,
			cache : false, 
			async : false,
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 1){
					callback1(result);
				}else if(result == 0){
					callback2(result);
				}else{
					console.log('更新权限， 未知错误');
				}
			},
			error: function(err){
				console.log(err);
			}
		});
	};	
};