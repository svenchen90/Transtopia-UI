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
			'	<span class="pull-right" style="margin-right:10px;"><a href="javascript:void(0)">修改</a></span>\n' +
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
			result.items.push($(item).attr('data-id'));
		});
		
		return result
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
var SelectBoxIndividual = function(){
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
						TwinRowSelectUser('修改标签', all, inTag, 
						function(users, modal){
							updateTag(name, users, modal);
						})
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
					callConfirm('新建标签', '您是否要创建一个新的标签？', 
						function(){
							singleLineInput('新建标签', '请输入标签名称', 
								function(name, modal2){
									createFriendTag(name, user)
										.then(function(data){
											selectBox.reloadTailUser([]);
											selectBox.appendNewTag({name: name, icon: '<i class="fa fa-tags"></i>', callback: modifyTag});
											modal2.modal('hide');
											modal.modal('hide');
										})
										.catch(function(reason){
											console.log(reason);
										});
								}
							);
						},
						function(){
							selectBox.reloadTailUser(user);
							modal.modal('hide');
						}
					);
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
				console.log(selectBox.getData());
				/*
				var data1 = {
					value: selected.value,
					tags: (selected.sublist == undefined ? [] : selected.sublist),
					items: (selected.tail == undefined ? [] : toStringArray(selected.tail, 'id'))
				};
				var data2 = selectBox.getData();
				var result = {};
				
				if(data2.value == data1.value){
					result.value = data2.value;
					result.tagAdd = getDifferenceSetBeta(data2.tags, data1.tags);
					result.tagDelete = getDifferenceSetBeta(data1.tags, data2.tags);
					result.itemAdd = getDifferenceSetBeta(data2.items, data1.items);
					result.itemDelete = getDifferenceSetBeta(data1.items, data2.items);
				}else{
					result.value = data2.value;
					result.tagAdd = data2.tags;
					result.tagDelete = [];
					result.itemAdd = data2.items;
					result.itemDelete = [];
				}
				
				updateAuthority(fid, result.value, result.tagAdd, result.tagDelete, result.itemAdd, result.itemDelete)
					.then(function(data){
						callAlert('修改成功！', '<i class="material-icons">done</i>', 
							function(){
								selectBox.getModule().modal('hide');
								callback();
							}
						);
					});
				*/
			});
		})
		.catch(function(reason){
			console.log(reason);
		});
};
SelectBoxIndividual();