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
		'						<input type="text" class="form-control" placeholder="搜索...(区分大小写)" data-action="search" />\n' +
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
		
		singleRow.on('click', function(){
			$('body').find('.custom-menu').remove();
		});
		
		singleRow.on('hidden.bs.modal', function(){
			$('body').find('.custom-menu').remove();
			$(this).remove();
		});
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
	
	this.hide = function(){
		singleRow.modal('hide');
	};
	
	/* 9. 显示模态框  */
	this.show = function(){
		singleRow.modal('show');
	};
};
/* ！单行模态框 */


/* # */
/* 单行模态框 */
var SingleRowID = function(title, id){
	 var singleRow = $(
		'<div class="modal fade" id="'+id+'">\n' +
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
		'						<input type="text" class="form-control" placeholder="搜索...(区分大小写)" data-action="search" />\n' +
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
		
		singleRow.on('click', function(){
			$('body').find('.custom-menu').remove();
		});
		
		singleRow.on('hidden.bs.modal', function(){
			$('body').find('.custom-menu').remove();
			$(this).remove();
		});
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
	
	this.hide = function(){
		singleRow.modal('hide');
	};
	
	/* 9. 显示模态框  */
	this.show = function(){
		singleRow.modal('show');
	};
};
/* ！单行模态框 */