/* SelectBox 组件 */
var SelectBoxComponent = function(){
	// 1. 选择框主体
	this.getSelectBox = function(title){
		var module = $(
			'<div class="modal fade select-box noselect">\n' +
			'	<div class="modal-dialog">\n' +
			'		<div class="modal-content">\n' +
			'			<div class="modal-header">\n' +
			'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
			'				<h5 class="modal-title">' + title + '</h5>\n' +
			'			</div>\n' +
			'			<div class="modal-body">\n' +
			'				<div class="form-group select-box-container">\n' +
			'				</div>\n' +
			'			</div>\n' +
			'			<div class="modal-footer">\n' +
			'				<a data-action="submit">提交</a>\n' +
			'				<a data-dismiss="modal">关闭</a>\n' +
			'			</div>\n' +
			'		</div>\n' +
			'	</div>\n' +
			'</div>'
		);
		return module;
	};
	
	// 2. 单选样式
	this.getRadio = function(data, icon){
		var module = $(
			'<label>\n' +
			'	<input type="radio" name="r1" data-value="' + data.value + '" data-type="radio">\n' +
			'	<span data-type="icon">' + icon + '</span>\n' +
			'	<span data-type="name">' + data.name + '</span>\n' +
			'	<!-- <span class="pull-right" style="margin-right: 20px;"><a href="javascript:void(0)">设置</a></span> -->\n' +
			'	<div class="clearfix"></div>\n' +
			'</label>'
		);
		return module;
	};
	
	// 3. 折叠框
	this.getCollapse = function(data, icon){
		var module = $(
			'<div>\n' +
			'	<label>\n' +
			'		<input type="radio" name="r1" data-value="' + data.value + '" data-type="collapse">\n' +
			'		<span>' + icon + '</span>\n' +
			'		<span>' + data.name + '</span>\n' +
			'		<!-- <span class="pull-right" style="margin-right: 20px;"><a href="javascript:void(0)">设置</a></span> -->\n' +
			'		<div class="clearfix"></div>\n' +
			'	</label>\n' +
			'	<div class="collapse">\n' +
			'	<!-- 复选框 -->\n' +
			'	</div>\n' +
			'</div>'
		);
		return module;
	};
	
	// 4. 复选框-折叠框
	this.getMulti_Collapse = function(data, icon, checked){
		var module = $(
			'<label data-type="tag">\n' +
			'	<input type="checkbox" name="c1"  data-value="' + data.name + '" ' + (checked ? 'checked' : '') + '>\n' +
			'	<span>' + icon + '</span>\n' +
			'	<span data-name>' + data.name + '</span>\n' +
			'	<span class="pull-right" style="margin-right:10px;"><a href="javascript:void(0)">查看</a></span>\n' +
			'	<div class="clearfix"></div>\n' +
			'</label>\n'
		);
		return module;
	};
	
	// 5. 点击框-折叠框
	this.getSimple_Collapse = function(text, icon){
		var module = $(
			'<label data-type="tail" style="line-height: 30px !important;">\n' +
			'	<span>' + icon + '</span>\n' +
			'	<span>' + text + '</span>\n' +
			'	<span class="pull-right" style="margin-right:10px;"><a href="javascript:void(0)">选取</a></span>\n' +
			'	<div class="clearfix"></div>\n' +
			'	<span data-container="item"></span>\n' +
			'</label>\n'
		);
		return module;
	};
};

/* SelectBox 主题函数 */
var SelectBox = function(title, radios, selected){
	var obj = this;
	var SBComponent = new SelectBoxComponent();
	// 主框
	var selectBox = SBComponent.getSelectBox(title);
	
	// 1) 添加单选
	this.appendRadio = function(data, callback1, callback2){
		var container = selectBox.find('.select-box-container');
		var radio = SBComponent.getRadio(data, data.icon);
		container.append(radio);
		return radio;
	};
	
	// 2) 添加折叠框
	this.appendCollapse = function(data){
		var container = selectBox.find('.select-box-container');
		var collapse = SBComponent.getCollapse(data, data.icon);

		var subContainer = collapse.find('.collapse');
		$.each(data.sublist, function(index, item){
			var checkBox = SBComponent.getMulti_Collapse(item, item.icon);
			checkBox.find('a').click(function(){
				var name = checkBox.find('[type="checkbox"]').attr('data-value');
				item.callback(name);
			});
			
			subContainer.append(checkBox);
			
		});
		
		var simpleLabel = SBComponent.getSimple_Collapse(data.tail.text, data.tail.icon);
		simpleLabel.find('a').click(function(){
			var list = [];
			$.each(simpleLabel.find(' [data-container="item"] [data-type="item"]'), function(index, item){
				list.push(
					{
						id: $(item).attr('data-id'),
						name: $(item).text()
					}
				);
			});
			data.tail.callback(list);
		});
		subContainer.append(simpleLabel);
		
		container.append(collapse);
		return collapse;
	};
	
	// 3) collapse 点击效果
	this.rebindCollapse = function(){
		selectBox.find('input[type="radio"]')
			.unbind('click')
			.click(function(ev){
				var all = selectBox.find('.collapse');
				var target = $(this).closest('label').next('.collapse');
				all.not(target).collapse('hide');
				target.collapse('show');
			});
	};
	
	// 4) 加载selected
	this.loadSelected = function(){
		var target = selectBox.find('.select-box-container input[type="radio"][data-value="' + selected.value + '"]');
		target.prop('checked', 1);
		if(target.attr('data-type') == 'radio'){
			selectBox.find('.collapse').removeClass('in');
		}else if(target.attr('data-type') == 'collapse'){
			var collapse = target.closest('label').next('.collapse');
			collapse.addClass('in');
			
			$.each(selected.sublist, function(index, item){
				collapse.find('[data-type="tag"] input[data-value="' + item + '"]').prop('checked', 1);;
			});
			
			var container = collapse.find('[data-type="tail"] [data-container="item"]');
			$.each(selected.tail, function(index, item){
				container.append('<span data-type="item" data-id="' + item.id + '" style="padding-left: 10px;">' + item.name + '</span>\n');
			});
			
		}else{
			console.log('....');
		}
	};
	
	// 5) 添加尾部用户
	this.reloadTailUser = function(users){
		var container = selectBox.find('.collapse.in [data-type="tail"] [data-container="item"]').empty();
		$.each(users, function(index, item){
			container.append('<span data-type="item" data-id="' + item.id + '" style="padding-left: 10px;">' + item.name + '</span>\n');
		});
	};
	
	// 6) 添加新标签
	this.appendNewTag = function(data){
		var container = selectBox.find('.collapse.in [data-type="tail"]');
		var checkBox = SBComponent.getMulti_Collapse(data, data.icon, true);
		checkBox.find('a').click(function(){
			var name = checkBox.find('[type="checkbox"]').attr('data-value');
			data.callback(name);
		});
		container.before(checkBox);
	};
	
	
	// 7) 获取数据
	this.getData = function(){
		var selected = selectBox.find('[type="radio"]:checked');
		var collapse = selected.closest('label').next('.collapse');
		
		var result = {
			value: selected.attr('data-value'),
			tags: [],
			items: []
		};
		
		$.each(collapse.find(':checked'), function(index, item){
			result.tags.push($(item).attr('data-value'));
		});
		
		$.each(collapse.find('[data-type="tail"] [data-container="item"] [data-type="item"]'), function(index, item){
			result.items.push({id: $(item).attr('data-id')});
		});
		
		return result;
	};
	
	// 8) 获取selectBox DOM
	this.getModule = function(){
		return selectBox;
	};
	
	
	
	
	// 初始化
	(function(){
		$.each(radios, function(index, item){
			if(item.type == 'radio'){
				obj.appendRadio(item);
			}else if(item.type == 'collapse'){
				obj.appendCollapse(item);
			}else{
				console.log('error');
			}
		});
		
		obj.loadSelected();
		obj.rebindCollapse();
		
		selectBox.modal('show');
		selectBox.on('hidden.bs.modal', function(){
			$(this).remove();
		});
	})();
};

// 通讯录导入
var SelectBoxIndividual = function(callback){
	getFriendTags()
		.then(function(data){
			var tags = data;
			var radios = [
				{
					type: 'radio',
					value: 1,
					name: '全部好友',
					icon: '<i class="fa fa-gear"></i>'
				},
				{
					type: 'collapse',
					value: 2,
					name: '部分可见',
					icon: '<i class="fa fa-gear"></i>'
				}
			];
			// A) 加载标签修改页面
			var modifyTag = function(name){
				Promise
					.all([getFriends(), getFriendInTag(name)])
					.then(function(data){
						var all = data[0];
						var inTag = data[1];
						
						var SR = new SingleRow('标签列表 - ' + name);
						SR.appendList(inTag, SingleUserCard);
						SR.show();

						/*TwinRowSelectUser('修改标签', all, inTag, 
						function(users, modal){
							updateTag(name, users, modal);
						})*/
					})
					.catch(function(reason){
						console.log(reason);
					});
			};
			// B) 更新标签
			var updateTag = function(name, user, modal){
				updateFriendTag(name, user)
					.then(function(data){
						callAlert('修改成功！', '<i class="material-icons">done</i>', 
							function(){
								modal.modal('hide');
							}
						);
					})
					.catch(function(reason){
						console.log(reason)
					});
			};
			// C) 加载tail点击事件
			var selectUser = function(users){
				getFriends()
					.then(function(data){
						TwinRowSelectUser('选择要分享的好友', data, users, submitSelectUser);
					})
					.catch(function(reason){
						console.log(reason);
					});
			};
			// D) 提交选择表单
			var submitSelectUser = function(user, modal){
				if(user.length == 0){
					selectBox.reloadTailUser(user);
					modal.modal('hide');
				}else{
//					callConfirm('新建标签', '您是否要创建一个新的标签？', 
//						function(){
//							singleLineInput('新建标签', '请输入标签名称', 
//								function(name, modal2){
//									createFriendTag(name, user)
//										.then(function(data){
//											selectBox.reloadTailUser([]);
//											selectBox.appendNewTag({name: name, icon: '<i class="fa fa-tags"></i>', callback: modifyTag});
//											modal2.modal('hide');
//											modal.modal('hide');
//										})
//										.catch(function(reason){
//											console.log(reason);
//										});
//								}
//							);
//						},
//						function(){
//							selectBox.reloadTailUser(user);
//							modal.modal('hide');
//						}
//					);
					selectBox.reloadTailUser(user);
					modal.modal('hide');
				}
			};
			
			// 加载标签
			radios[1].sublist = [];
			$.each(tags, function(index, tag){
				radios[1].sublist.push(
					{
						name: tag.name,
						icon: '<i class="fa fa-tags"></i>',
						callback: modifyTag
					}
				);
			});
			
			radios[1].tail = {
				text: '从好友名单中选取',
				icon: '<i class="fa fa-plus-square-o" style="color: green;"></i>',
				callback: selectUser
			};
			
			var selectBox = new SelectBox('个人文件分享', radios, {value: 1});
			
			selectBox.getModule().find('[data-action="submit"]').click(function(){
				var data = selectBox.getData();
				if(data.value == 1){
					getFriends()
						.then(function(result){
							callback(result);
							selectBox.getModule().modal('hide');
						})
						.catch(function(reason){
							console.log('error');
						});
				}else if(data.value == 2){
					var list = [];
					$.each(data.tags, function(index, tag){
						list.push(getFriendInTag(tag));
					});
					var length = list.length;
					
					Promise
						.all(list)
						.then(function(result){
							result.push(data.items);
							var users = combineSet(result);
							callback(users);
							selectBox.getModule().modal('hide');
						})
						.catch(function(reason){
							console.log('error');
						});
				}else{
					console.log('error');
				}
			});
		})
		.catch(function(reason){
			console.log(reason);
		});
};
const DATATABLE_ZH = {
	"sProcessing":   "处理中...",
	"sLengthMenu":   "显示 _MENU_ 项结果",
	"sZeroRecords":  "没有匹配结果",
	"sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
	"sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
	"sInfoFiltered": "(由 _MAX_ 项结果过滤)",
	"sInfoPostFix":  "",
	"sSearch":       "搜索:",
	"sUrl":          "",
	"sEmptyTable":     "表中数据为空",
	"sLoadingRecords": "载入中...",
	"sInfoThousands":  ",",
	"oPaginate": {
			"sFirst":    "首页",
			"sPrevious": "上页",
			"sNext":     "下页",
			"sLast":     "末页"
	},
	"oAria": {
			"sSortAscending":  ": 以升序排列此列",
			"sSortDescending": ": 以降序排列此列"
	}
};

var SharedWithBoxIndividual = function(fid){
	var modal = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-body">\n' +
		'				<div class="main-content">\n' +
		'					<div class="modal-header" style="padding: 0 0 15px 0;">\n' +
		'						<button type="button" class="close" data-dismiss="modal">×</button>\n' +
		'						<h4 class="modal-title">分享设置</h4>\n' +
		'					</div>\n' +
		'					<div class="form-group">\n' +
		'						<label><i class="fa fa-gear"></i> 自定义设置</label>\n' +
		'						<label class="switch pull-right">\n' +
		'							<input name="switch" type="checkbox">\n' +
		'							<div class="slider round"></div>\n' +
		'						</label>\n' +
		'					</div>\n' +
		'					<div class="box">\n' +
		'						<div class="box-header">\n' +
		'							<span class="box-title" style="font-size: 18px;"><i class="fa fa-users"></i> 成员名单</span>\n' +
		'							<span class="box-title pull-right" >\n' +
		'								<a href="javascript: void(0);" style="padding-right: 5px;"  data-action="import"><i class="fa fa-plus"></i></a>\n' +
		'								<a href="javascript: void(0);" data-action="delete"><i class="fa fa-trash"></i></a>\n' +
		'							</span>\n' +
		'						</div>\n' +
		'						<div class="box-body">\n' +
		'							<table id="dataTable" class="table table-bordered">\n' +
		'								<thead>\n' +
		'									<tr>\n' +
		'										<th style="width: 30px;"><input type="checkbox" name="selectall"></th>\n' +
		'										<th>用户</th>\n' +
		'										<th style="width: 150px;">权限</th>\n' +
		'									</tr>\n' +
		'								</thead>\n' +
		'								<tbody>\n' +
		'									<!-- 添加内容 -->\n' +
		'								</tbody>\n' +
		'							</table>\n' +
		'						</div>\n' +
		'					</div>\n' +
		'				</div>\n' +
		'			</div>\n' +
		'			<!-- <div class="modal-footer">\n' +
		'				<a href="javascript: void(0);" data-action="submit">确定</a>\n' +
		'				<a href="javascript: void(0);" data-dismiss="modal">关闭</a>\n' +
		'			</div>\n -->' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	var obj = this;
	var init = [];
	
	var table = modal.find("#dataTable").DataTable({
		"language": DATATABLE_ZH
	});
	
	// 1. 添加单个用户
	this.add = function(user, selected, selectable){
		if(!isInArray(user, this.getData())){
			// 初始化
			selected = (selected == undefined ? false : selected);
			selectable = (selectable == undefined ? true :selectable);
			user.hasAuthority = (user.hasAuthority == undefined ? 0 : user.hasAuthority);
			
			if(user.uimage == undefined || user.uname == undefined){
				findUserByID(user.id)
					.then(function(result){
						user = result;
						// 列
						var col0 = '<input type="checkbox" data-id="' + user.id + '" ' + (selectable == false ? 'disabled' : '') + ' ' + (selected == true ? 'checked' : '') + '>';
						var col1 = '<img src="' +ImageURLPrefix+ user.uimage + '" style="height:30px; width:30px; border-radius: 50%; border: 0.08em solid rgba(0,0,0,0.3);">\n' +
												'<span style="padding-left: 10px;">' + user.uname + '</span>';
						var col2 = '<a class="' + (selectable == 0 ? 'unselectedable' : '') + '" href="javascript: void(0);" data-authority="' + user.hasAuthority + '">' + ( user.hasAuthority == 0 ? '<i class="fa fa-eye"></i> 可读' : '<i class="fa fa-pencil"></i> 可读写') + '</a>\n' +
												'<select style="display: none;">\n' +
												'	<option value="0">可读</option>\n' +
												'	<option value="1">可读写</option>\n' +
												'</select>'
						
						table.row.add([
							col0, col1, col2
						]).draw( false );
					}).catch(function(reason){
						console.log(reason);
					});
			}else{
				// 列
				var col0 = '<input type="checkbox" data-id="' + user.id + '" ' + (selectable == false ? 'disabled' : '') + ' ' + (selected == true ? 'checked' : '') + '>';
				var col1 = '<img src="' +ImageURLPrefix+ user.uimage + '" style="height:30px; width:30px; border-radius: 50%; border: 0.08em solid rgba(0,0,0,0.3);">\n' +
										'<span style="padding-left: 10px;">' + user.uname + '</span>';
				var col2;
				if(user.isOwner>0)
				{
					col2 = '<a class="' + (selectable == 0 ? 'unselectedable' : '') + '" href="javascript: void(0);" data-authority="' + user.hasAuthority + '" >' + ('<i class="fa fa-pencil"></i> 创建者') + '</a>\n' ;
				}
				else
				{
					col2 = '<a class="' + (user.can_edit == 0 ? 'unselectedable' : '') + '" href="javascript: void(0);" data-authority="' + user.hasAuthority + '">' + ( user.hasAuthority == 0 ? '<i class="fa fa-eye"></i> 可读' : '<i class="fa fa-pencil"></i> 可读写') + '</a>\n' +
					'<select style="display: none;" >\n' +
					'	<option value="0">可读</option>\n' +
					'	<option value="1">可读写</option>\n' +
					'</select>';
				}
				
				table.row.add([
					col0, col1, col2
				]).draw( false );
			}
		}
	};
	
	// 2. 添加多个用户
	this.addList = function(users){
//		$.each(users, function(index, user){
//			obj.add(user, selected, selectable);
//		});
		modal.find('#dataTable tbody').find('[role="row"]').remove();
		$.each(users, function(index, item){
			if(item.can_remove == 0){
				obj.add(item, false, false);
			}else{
				obj.add(item, false, true);
			}
			
		});
	};
	
	// 3. 获取data
	this.getData = function(){
		var result = [];
		table.data().each( function (d) {
			result.push({
				id: $(d[0]).attr('data-id'),
				authority: $(d[2]).attr('data-authority')
			});
		});
		return result;
	};
	
	// 4. 删除选择用户
	this.deleteSelected = function(){
		var rows = table
			.rows('.selected')
			.remove()
			.draw();
	};
	
	(function(){
		
		
		// A. 初始化数据(###此处需要定义)
		/*
		getSharedList(fid)
			.then(function(result){
				
				$.each(result, function(index, item){
					if(item.can_remove == 0){
						obj.add(item, false, false);
					}else{
						obj.add(item, false, true);
					}
					
				});
				init = result;
			})
			.catch(function(reason){
				console.log(reason);
			});
		*/
		// B. 单选
		modal.find('#dataTable tbody').on( 'click', 'input', function (ev) {
			$(this).closest('tr').toggleClass('selected');
		});
		
		// C. 点击开启选项框
		modal.find('#dataTable tbody').on( 'click', '[data-authority]:not(.unselectedable)', function (ev) {
			$(this).hide();
			$(this).next('select').find('option[value="' + $(this).attr('data-authority') +'"]').prop('selected', true);
			$(this).next('select')
				.show()
				.focus();
		});
		
		// D. 改变选项框
		modal.find('#dataTable tbody').on( 'change', 'select', function (ev) {
			var cell = table.cell($(this).closest('td'));
			var userID = $(this).closest('tr').find('td input').attr('data-id');
			var value = this.value;

			updateSharedWithAuthority(userID, fid, value)
				.then(function(result){
					if(value == 0){
						cell.data(
							'<a href="javascript: void(0);" data-authority="0"><i class="fa fa-eye"></i> 可读</a>\n' +
							'<select style="display: none;">\n' +
							'	<option value="0" selected>可读</option>\n' +
							'	<option value="1">可读写</option>\n' +
							'</select>'
						).draw();
					}else if(value == 1){
						cell.data(
							'<a href="javascript: void(0);" data-authority="1"><i class="fa fa-pencil"></i> 可读写</a>\n' +
							'<select style="display: none;">\n' +
							'	<option value="0">可读</option>\n' +
							'	<option value="1" selected>可读写</option>\n' +
							'</select>'
						).draw();
					}else{
						console.log('error');
					}
				}).catch(function(reason){
					console.log(reason);
				});
		});
		
		// E. 选项框 focusout
		modal.find('#dataTable tbody').on( 'focusout', 'select', function (ev) {
			$(this).hide();
			$(this).prev('[data-authority]').show();
		});
		
		// F. 全选
		modal.find('#dataTable thead').on( 'click', '[name="selectall"]', function (ev) {
			var selectedRow = modal.find('#dataTable tbody tr input:not([disabled])');
			if(this.checked){
				selectedRow.prop('checked', true);
				selectedRow.closest('tr').addClass('selected');
			}else{
				selectedRow.prop('checked', false);
				selectedRow.closest('tr').removeClass('selected');
			}
		});

		// G. 删除
		modal.find('[data-action="delete"]').click(function(ev){
			var rows = table.rows('.selected').data();
			var list = [];
			$.each(rows, function(index, row){
				list.push($(row[0]).attr('data-id'));
			});
			
			deleteFromShareList(fid, list)
				.then(function(result){
					obj.deleteSelected();
				}).catch(function(reason){
					console.log(reason);
				});
		});
		
		// H. 导入
		modal.find('[data-action="import"]').click(function(ev){
			SelectBoxIndividual(
				function(users){
					var list = [];
					$.each(users, function(index, user){
						list.push({
							uid: user.id,
							hasAuthority: 0
						});
					});
					
					addUserToSharedWith(fid,list)
						.then(function(result){
							obj.addList(result);
						}).catch(function(reason){
							console.log(reason);
						})
					
				}
			);
		});
		
		modal.modal('show');
	})();
};

// 求合集
var combineSet = function(listOfArray){
	var result = [];
	$.each(listOfArray, function(index, list){
		$.each(list, function(idx, i){
			if(!isInArray(i, result))
				result.push(i);
		});
	});
	return result;
};
// item是否在list里（id）
var isInArray = function(item, list){
	var flag = false;
	$.each(list, function(idx, i){
		if(i.id == item.id){
			flag = true;
			return true;
		}
	});
	return flag;
};





SharedWithBoxIndividual(1);