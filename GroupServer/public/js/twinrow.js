/* # */
/* 双行模态框 */
var TwinRow = function(title){
	var obj = this;
	var twinRow = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog" style="width: 50vw;">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close btn-close" data-dismiss="modal">&times;</button>\n' +
		'				<h4 class="modal-title"></h4>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div style="display: inline-block; line-height: 34px;"></div>\n' +
		'				<div class="form-group pull-right" style="width: 250px;">\n' +
		'					<div class="input-group">\n' +
		'						<input type="text" class="form-control" placeholder="搜索..." data-action="searchtop"/>\n' +
		'						<div class="input-group-addon" style="cursor: pointer;">\n' +
		'							<i class="fa fa-search"></i>\n' +
		'						</div>\n' +
		'					</div>\n' +
		'				</div>\n' +
		'				<div class="clearfix"></div>\n' +
		'				<div class="row-top">\n' +
		'					<!-- 上排数据 -->\n' +
		'				</div>\n' +
		'				<div class="row divider" style="margin-top:10px; margin-bottom:10px; border-bottom: 1px solid #ddd;"></div>\n' +
		'				<div style="display: inline-block; line-height: 34px;"></div>\n' +
		'				<div class="form-group pull-right" style="width: 250px;">\n' +
		'					<div class="input-group">\n' +
		'						<input type="text" class="form-control" placeholder="搜索..." data-action="searchbot"/>\n' +
		'						<div class="input-group-addon" style="cursor: pointer;">\n' +
		'							<i class="fa fa-search"></i>\n' +
		'						</div>\n' +
		'					</div>\n' +
		'				</div>\n' +
		'				<div class="clearfix"></div>\n' +
		'				<div class="row-bot">\n' +
		'					<!-- 下排数据 -->\n' +
		'				</div>\n' +
		'				<div class="clearfix"></div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a href="javascript: void(0);" data-action="submit">确定</a>\n' +
		'				<a href="javascript: void(0);" data-dismiss="modal">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' + 
		'</div>'
	);
	
	/* 初始化 */
	(function(){
		//加载模态框标题
		twinRow.find('.modal-title').text(title);
		
		//加载slimscroll
		twinRow.find('.row-top').slimScroll({
			height: '20vh'
		});
		twinRow.find('.row-bot').slimScroll({
			height: '40vh'
		});
		
		twinRow.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		//顶端搜索
		twinRow.find('[data-action="searchtop"]').on('change', function(evt){
			var query = $(this).val();
			obj.searchTop(query);
		});
		
		// 加载第二行搜索
		twinRow.find('[data-action="searchbot"]').on('change', function(evt){
			var query = $(this).val();
			obj.searchBot(query);
		});
		
		twinRow.modal('show');
	})();
	
	
	/* 方法体 */
	// 1. 获取Modal
	this.getTwinRow= function(){
		return twinRow;
	};
	
	// 2. 清空第一行
	this.emptyTop = function(){
		twinRow.find('.row-top [allowremove]').remove();
	};
	
	// 3. 清空第二行
	this.emptyBot = function(){
		twinRow.find('.row-bot [allowremove]').remove();
	};
	
	// 4. 重加载第二行
	this.reloadTop = function(itemList){
		this.emptyTop();
		
		$.each(itemList, function(index, item){
			twinRow.find('.row-top').append(item);
		});
	};
	
	// 5. 重加载第二行
	this.reloadBot = function(itemList){
		this.emptyBot();
		
		$.each(itemList, function(index, item){
			twinRow.find('.row-bot').append(item);
		});
	};
	
	// 6. 重加载
	this.reload = function(listTop, listBOt){
		this.reloadTop(listTop);
		this.reloadBot(listBOt);
	};
	
	// 7. 第一行添加到表尾
	this.appendTop = function(item){
		twinRow.find('.row-top').append(item);
	};
	
	// 8. 第一行添加到表头
	this.prependTop = function(item){
		twinRow.find('.row-top').prepend(item);
	};
	
	// 9 第一行添加列表到表尾
	this.appendListTop = function(list){
		$.each(list, function(index, item){
			this.appendTop(item);
		});
	};
	
	// 10. 第二行添加到表尾
	this.appendBot = function(item){
		twinRow.find('.row-bot').append(item);
	};
	
	// 11. 第二行添加到表头
	this.prependBot = function(item){
		twinRow.find('.row-bot').prepend(item);
	};
	
	// 12 第二行添加列表到表尾
	this.appendListBot = function(list){
		$.each(list, function(index, item){
			this.appendBot(item);
		});
	};
	
	
	/* 13. 搜索第一行 */
	this.searchTop = function(query){
		$.each(twinRow.find('.row-top [allowsearch]'), function(index,item){
			var name = $(item).find('[data-name="name"]').text();
			if(!name.match(query)){
				$(item).addClass('hide');
			}else
				$(item).removeClass('hide');
		});
	};
	
	/* 13. 搜索第二行 */
	this.searchBot = function(query){
		$.each(twinRow.find('.row-bot [allowsearch]'), function(index,item){
			var name = $(item).find('[data-name="name"]').text();
			if(!name.match(query)){
				$(item).addClass('hide');
			}else
				$(item).removeClass('hide');
		});
	};
	
	/* 14. 移动到第一行 */
	this.moveToTop = function(item){
		item.find('.content-hover i').replaceWith('<i class="material-icons">add_circle_outline</i>');
		this.appendTop(item);
	};
	
	/* 15. 移动到第二行 */
	this.moveToBot = function(item){
		item.find('.content-hover i').replaceWith('<i class="material-icons">highlight_off</i>');
		this.appendBot(item);
	};
	
	/* 16. 获取数据 */
	this.getData = function(){
		var data = [];
		$.each(twinRow.find('.row-bot').find('[allowremove]'), function(index, item){
			data.push({
				id: $(item).attr('data-id'),
				name: $(item).find('[data-name="name"]').text()
			});
		});
		return data;
	};
};
/* ！双行模态框 */
/* # */


/* ## */
/* 种类、兴趣、title 修改框 */
var multiController = function(title, iconStyle){
	var modal = new TwinRow(title + '管理');
	
	/* 卡片样式 */
	var Card = function(data){
		/* 
			data: {
				id: '',
				name: '',
				icon: '',
				iconHover: '' //add_circle_outline, highlight_off
				loc: // 'top' / 'bot'
			}
		 */
		var card = $(
			'<div class="col-lg-2 col-md-3 col-sm-4" allowsearch allowremove>\n' +
			'	<div class="multi-card" style="background-color: ' + googleColorRandomPicker() + ';">\n'+
			'		<div class="card-body">\n'+
			'			<div class="content-default">\n'+
			'				<div data-name="name"></div>\n'+		
			'			</div>\n'+
			'			<div class="content-hover">\n'+
			'				<div></div>\n'+
			'			</div>\n' +
			'		</div>\n' +
			'	</div>\n' +
			'</div>'
		);
		
		var loc = data.loc;
		
		//加载数据
		if(data.id)
			card.attr('data-id', data.id);
		else
			card.attr('data-id', data.name);
		
		if(data.icon)
			card.find('.content-default').prepend(data.icon);
		else
			card.find('.content-default').prepend('<i class="material-icons">face</i>');
		
		card.find('.content-default [data-name="name"]').text(data.name);
		card.find('.content-hover').prepend(data.iconHover);
		
		/* 绑定点击事件 */
		card.on('click', function(){
			if(loc == 'top'){
				loc = 'bot';
				modal.moveToBot(card);
			}else if(loc == 'bot'){
				loc = 'top';
				modal.moveToTop(card);
			}else{
				console.log('错误');
			}
		});
		
		return card;
	};
	
	/* 新增卡片样式 */
	var NewCard = function(title, addURL){
		var card = $(
			'<div class="col-lg-2 col-md-3 col-sm-4" allowsearch>\n' +
			'	<div class="create-card" style="background-color: rgba(255,255,255,1);">\n'+
			'		<div class="card-body" style="color: rgba(0,0,0,0.5)">\n'+
			'			<div>\n'+
			'				<i class="material-icons">add_circle_outline</i>\n'+
			'				<div data-name="note"></div>\n'+		
			'			</div>\n'+
			'		</div>\n' +
			'	</div>\n' +
			'</div>'
		);
		
		//加载卡片名称
		card.find('[data-name="note"]').text('新增' + title);
		
		var CreateModal = function(title, addURL){
			var createModal = $(
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
			
			//加载模态框数据
			createModal.find('.modal-title').text('新增' + title);
			createModal.find('input').prop('placeholder', '请输入新增' + title);
			
			//提交操作 addURL
			createModal.find('[data-action="submit"]').on('click', function(){
				$.ajax({
					url : URLPrefix + addURL + createModal.find('input').val(),
					data: {},
					cache : true, 
					async : true,
					type : "GET",
					dataType : 'json',
					success : function (result){
						if(result == 0){
							callAlert('添加失败!', '<i class="material-icons">clear</i>', function(){});
						}else{
							callAlert('添加成功!', '<i class="material-icons">done</i>', function(){
								createModal.modal('hide');
								var data = {
									name: createModal.find('input').val(),
									icon: iconStyle,
									iconHover: '<i class="material-icons">highlight_off</i>',
									loc: 'bot'
								};
								modal.prependBot(Card(data));
							});
						}
					},
					error: function(err){
						callAlert('添加失败!', '<i class="material-icons">clear</i>', function(){});
					}
				});
			});
			
			createModal.on('hidden.bs.modal', function(){
				$(this).remove();
			});
			
			createModal.modal('show');
		};
		

		card.on('click', function(){
			CreateModal(title, addURL);
		});

		return card;
	};
	
	
	//获取第一行列表
	var getCardListTop = function(list){
		var result = [];
		
		$.each(list, function(index, item){
			var data = {
				name: item,
				icon: iconStyle,
				iconHover: '<i class="material-icons">add_circle_outline</i>',
				loc: 'top'
			};
			
			result.push(Card(data));
		});
		
		return result;
	};
	
	//获取第二行列表
	var getCardListBot = function(list){
		var result = [];
		
		$.each(list, function(index, item){
			var data = {
				name: item,
				icon: iconStyle,
				iconHover: '<i class="material-icons">highlight_off</i>',
				loc: 'bot'
			};
			result.push(Card(data));
		});
		
		return result;
	};
	/* ajax重载第一行 */
	 this.ajaxReloadTop = function (loadFullURL){
		 $.ajax({
			url : URLPrefix + loadFullURL,
			data: {},
			cache : true, 
			async : true,
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 0){
					callAlert('加载失败!', '<i class="material-icons">clear</i>', function(){});
				}else{
					// 获取列表
					var cardList = getCardListTop(result);
					// 加载数据
					modal.reloadTop(cardList);
				}
			},
			error: function(err){
				callAlert('加载失败!', '<i class="material-icons">clear</i>', function(){});
			}
		});
	};
	
	/* 重载第一行 */
	this.reloadTop = function(data){
		var cardList = getCardListTop(data);
		modal.reloadTop(cardList);
	};
	
	/* ajax重载第二行 */
	this.ajaxReloadBot = function(id, loadMineURL){
		$.ajax({
			url : URLPrefix + loadMineURL + id,
			data: {},
			cache : true, 
			async : true,
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 0){
					callAlert('加载失败!', '<i class="material-icons">clear</i>', function(){});
				}else{
					// 获取列表
					var cardList = getCardListBot(result);
			
					// 加载数据
					modal.reloadBot(cardList);
				}
			},
			error: function(err){
				callAlert('加载失败!', '<i class="material-icons">clear</i>', function(){});
			}
		});
	};
	
	/* 重载第二行 */
	this.reloadBot = function(data){
		var cardList = getCardListBot(data);
		modal.reloadBot(cardList);
	};
	
	//重载modal方法
	modal.getData = function(){
		var data = [];
		$.each(this.getTwinRow().find('.row-bot').find('[allowremove]'), function(index, item){
			data.push($(item).find('[data-name="name"]').text());
		});
		return data;
	};
	
	// 重载数据
	this.load = function(list, loadFullURL, addURL, callback){
		// 加载添加功能卡
		modal.appendTop(NewCard(title, addURL));
		
		// 加载数据
		this.ajaxReloadTop(loadFullURL);
		this.reloadBot(list);
		
		// Submit
		modal.getTwinRow().find('[data-action="submit"]').on('click', function(){
			callAlert('修改成功!', '<i class="material-icons">done</i>', function(){
				modal.getTwinRow().modal('hide');
				callback(modal.getData());
			});
		});
	};
	
	
	
	
	// ajax重载数据
	this.ajaxLoad = function(id, loadMineURL, loadFullURL, addURL, submitURL, callback){
		// 加载添加功能卡
		modal.appendTop(NewCard(title, addURL));
		
		// 加载数据
		this.ajaxReloadTop(loadFullURL);
		this.ajaxReloadBot(id, loadMineURL);
		
		// Submit
		modal.getTwinRow().find('[data-action="submit"]').on('click', function(){
			var d = modal.getData();
			$.ajax({
				url : URLPrefix + submitURL + id,
				data: {data: d},
				cache : true, 
				async : true,
				type : "GET",
				dataType : 'json',
				success : function (result){
					if(result == 0){
						callAlert('修改失败!', '<i class="material-icons">clear</i>', function(){});
					}else{
						callAlert('修改成功!', '<i class="material-icons">done</i>', function(){
							modal.getTwinRow().modal('hide');
							callback(d);
						});
						
					}
				},
				error: function(err){
					callAlert('修改失败!', '<i class="material-icons">clear</i>', function(){});
				}
			});

		});
	};
	
	
	
	
	/* 初始化 */
	(function(){
			// 加载第一行搜索
			modal.getTwinRow().find('[data-action="searchtop"]').on('change', function(evt){
				var query = $(this).val();
				modal.searchTop(query);
			});
			
			// 加载第二行搜索
			modal.getTwinRow().find('[data-action="searchbot"]').on('change', function(evt){
				var query = $(this).val();
				modal.searchBot(query);
			});
		}
	)();
};
/* ## */