/* 双行模态框 */
var TwinRow = function(title){
	var twinRow = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog" style="width: 50vw;">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close btn-close" data-dismiss="modal">&times;</button>\n' +
		'				<h4 class="modal-title"></h4>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div style="display: inline-block; line-height: 34px; font-size:20px;padding-left:15px;" class="top-title"></div>\n' +
		'				<div class="form-group pull-right" style="width: 250px;">\n' +
		'					<div class="input-group">\n' +
		'						<input type="text" class="form-control" placeholder="搜索...(区分大小写)" data-action="searchtop"/>\n' +
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
		'				<div style="display: inline-block; line-height: 34px;font-size:20px;padding-left:15px;" class="bottom-title"></div>\n' +
		'				<div class="form-group pull-right" style="width: 250px;">\n' +
		'					<div class="input-group">\n' +
		'						<input type="text" class="form-control" placeholder="搜索...(区分大小写)" data-action="searchbot"/>\n' +
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
	var obj = this;
	
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
		
		// 关闭时自动清空
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
	})();
	
	
	/* 方法体 */
	// 1. 获取Modal
	this.getTwinRow= function(){
		return twinRow;
	};
	
	// 1) 修改顶端标题
	this.changeTopTitle=function(title)
	{
		twinRow.find('.top-title').empty();
		twinRow.find('.top-title').html(title);
	}
	// 2) 修改顶端标题
	this.changeBottomTitle=function(title)
	{
		twinRow.find('.bottom-title').empty();
		twinRow.find('.bottom-title').html(title);
	}
	
	
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
		item.find('.content-hover i').replaceWith('<i class="material-icons">add_circle_outline</i>');
		twinRow.find('.row-top').append(item);
	};
	
	// 8. 第一行添加到表头
	this.prependTop = function(item){
		item.find('.content-hover i').replaceWith('<i class="material-icons">add_circle_outline</i>');
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
		item.find('.content-hover i').replaceWith('<i class="material-icons">highlight_off</i>');
		twinRow.find('.row-bot').append(item);
	};
	
	// 11. 第二行添加到表头
	this.prependBot = function(item){
		item.find('.content-hover i').replaceWith('<i class="material-icons">highlight_off</i>');
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
	
	/* 14. 搜索第二行 */
	this.searchBot = function(query){
		$.each(twinRow.find('.row-bot [allowsearch]'), function(index,item){
			var name = $(item).find('[data-name="name"]').text();
			if(!name.match(query)){
				$(item).addClass('hide');
			}else
				$(item).removeClass('hide');
		});
	};
	
	/* 15. 移动到第一行 */
	this.moveToTop = function(item){
		item.find('.content-hover i').replaceWith('<i class="material-icons">add_circle_outline</i>');
		this.appendTop(item);
	};
	
	/* 16. 移动到第二行 */
	this.moveToBot = function(item){
		item.find('.content-hover i').replaceWith('<i class="material-icons">highlight_off</i>');
		this.appendBot(item);
	};
	
	/* 17. 获取数据 */
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
/* 用户卡片 */
var UserCard = function(data, stick){
	var module = $(
		'<div class="col-lg-2 col-md-3 col-sm-4" allowsearch ' + (stick == undefined ? 'allowremove' : '') + ' data-id="' + data.id + '">\n' +
		'	<div class="multi-card" style="background-color: ' + googleColorRandomPicker() + ';">\n' +
		'		<div class="card-body">\n' +
		'			<div class="content-default"><i class="material-icons">face</i>\n' +
		'				<div data-name="name">' + data.name + '</div>\n' +
		'			</div>\n' +
		'			<div class="content-hover">' + (stick == undefined ? '<i></i>' : '') + '\n' +
		'				<div></div>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>\n'
	);
	return module;
};
/* ！用户卡片 */

var TwinRowSelectUser = function(title, allUser, selectedUser, callback){
	var twinRow = new TwinRow(title);
	var topUser = getDifferenceSet(allUser, selectedUser, 'id');
	var botUser = selectedUser;
	
	$.each(topUser, function(index, item){
		twinRow.appendTop(UserCard(item));
	});
	
	$.each(botUser, function(index, item){
		twinRow.appendBot(UserCard(item));
	});
	
	twinRow.getTwinRow().click(function(ev){
		
		var target = ev.target.closest('[allowremove]');
		if(target){
			if($(target).closest('.row-top').length > 0){
				// 上层框
				twinRow.moveToBot($(target));
			}else{
				// 下层框
				twinRow.moveToTop($(target));
			}
		}
		

		if($(ev.target).is('[data-action="submit"]')){
			callback(twinRow.getData(), twinRow.getTwinRow());
		}
	});
	
	twinRow.getTwinRow().modal('show');
};