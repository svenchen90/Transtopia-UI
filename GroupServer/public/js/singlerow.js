/* # */
/* 单行模态框 */
var SingleRow = function(title){
	 var singleRow = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog" style="width: 50vw;">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
		'				<h4 class="modal-title"></h4>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div style="display: inline-block; line-height: 34px;"></div>\n' +
		'				<div class="form-group pull-right" style="width: 250px;">\n' +
		'					<div class="input-group">\n' +
		'						<input type="text" class="form-control" placeholder="搜索..." data-action="search" />\n' +
		'						<div class="input-group-addon" style="cursor: pointer;">\n' +
		'							<i class="fa fa-search"></i>\n' +
		'						</div>\n' +
		'					</div>\n' +
		'				</div>\n' +
		'				<div class="clearfix"></div>\n' +
		'				<div class="row-single">\n' +
		'				</div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a href="javascript:void(0)" data-dismiss="modal">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>\n'
	);
	
	/* 初始化 */
	(function(){
		//加载标题
		singleRow.find('.modal-title').text(title);
		
		//加载slimscroll
		singleRow.find('.row-single').slimScroll({
				height: '60vh'
		});
		
		singleRow.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		singleRow.modal('show');
	})();
	
	
	/* 方法体 */
	// 1. 获取Modal
	this.getSingleRow = function(){
		return singleRow;
	};
	
	// 2. 重加载
	this.reload = function(itemList){
		//清空列表
		this.empty();
		
		//加载列表
		$.each(itemList, function(index, item){
			singleRow.find('.row-single').append(item);
		});
	};
	
	// 3. 添加到表尾
	this.append = function(item){
		singleRow.find('.row-single').append(item);
	};
	
	// 4. 添加到表头
	this.prepend = function(item){
		singleRow.find('.row-single').prepend(item);
	};
	
	// 5. 添加列表到表尾
	this.appendList = function(list){
		$.each(list, function(index, item){
			this.append(item);
		});
	};
	
	// 6. 添加列表到表头
	this.prependList = function(list){
		$.each(list, function(index, item){
			this.prepend(item);
		});
	};
	
	/* 7. 清空表单 */
	this.empty = function(){
		singleRow.find('.row-single [allowremove]').remove();
	};
	
	/* 8. 搜索 */
	this.search = function(query){
		$.each(singleRow.find('[allowsearch]'), function(index,item){
			var name = $(item).find('[data-target="name"]').text();
			if(!name.match(query)){
				$(item).addClass('hide');
			}else
				$(item).removeClass('hide');
		});
	};
};
/* ！单行模态框 */
/* # */


/* ## */
/* 黑名单组件 */
var groupBlackListController = function(id){
	// 加载黑名单URL
	// ###
	const loadURL = '/group/operation/get-blacklist/';
	const removeURL = '/group/operation/remove-user-blacklist/'
	
	var modal = new SingleRow('黑名单管理');
	
	// 卡片样式
	var UserCard = function(data){
		/* data: {id, name, image} */
		var card = $(
			'<div class="col-lg-2 col-md-3 col-sm-4" allowsearch allowremove>\n' +
			'	<div class="blacklist-card" style="background-color: ' + googleColorRandomPicker() + ' ;">\n'+
			'		<div class="card-body">\n'+
			'			<img data-target="image"/>\n' +
			'			<div data-target="name"></div>\n'+
			'			<div data-target="btns">\n'+
			'				<a data-action="remove"><i class="material-icons">replay</i><span>移出</span></a>\n'+
			'			</div>\n'+
			'		</div>\n' +
			'	</div>\n' +
			'</div>'
		);
		
		// 加载数据
		card.attr('data-id', data.id);
		card.find('[data-target="name"]').text(data.name);
		card.find('[data-target="image"]').attr('src', data.image);
		
		// 捆绑事件
		card.find('[data-action="remove"]').on('click', function(){
			$.ajax({
				url : URLPrefix + removeURL + id + '/' + data.id,
				data: {},
				cache : true, 
				async : true,
				type : "GET",
				dataType : 'json',
				success : function (result){
					if(result == 0){
						callAlert('移除失败!', '<i class="material-icons">clear</i>', function(){});
					}else{
						console.log(result)
						callAlert('移除成功!', '<i class="material-icons">done</i>', function(){
							reload();
						});
					}
				},
				error: function(err){
					callAlert('移除失败!', '<i class="material-icons">clear</i>', function(){});
				}
			});
		});
		
		return card;
	};
	
	//获取卡片列表
	var getCardList = function(list){
		var result = [];
		
		$.each(list, function(index, item){
			result.push(UserCard(item));
		});
		
		return result;
	};
	
	// 重载数据
	var reload = function(){
		$.ajax({
			url : URLPrefix + loadURL + id,
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
					var cardList = getCardList(result);
			
					// 加载数据
					modal.reload(cardList);
				}
			},
			error: function(err){
				callAlert('加载失败!', '<i class="material-icons">clear</i>', function(){});
			}
		});
	};
	
	
	/* 初始化 */
	(
		function(){
			//加载数据
			reload();
			
			//加载搜索功能
			modal.getSingleRow().find('[data-action="search"]').on('change', function(evt){
				var query = $(this).val();
				modal.search(query);			
			});
		}
	)();
};
/* ！黑名单组件 */

/* ## */