var localIDGenerator = function () {
	return '_' + Math.random().toString(36).substr(2, 9);
};

var temp2 = {
	lid: '_nzjs9whbt',
	type: 'singleSelect',
	required: 0,
	title: '请输入问题',
	tooltip: '',
	options: [
		{
			lid: "_4wl6caiet",
			name: '选项1',
			value: 0,
			isDefault: 0
		},
		{
			lid: "_5ndw0aln9",
			name: '选项2',
			value: 0,
			isDefault: 0
		}
	]
};

var ObjectDesigner = function(){
	var $modal = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog"  style="width:60vw;">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close" data-dismiss="modal">\n' +
		'					&times;\n' +
		'				</button>\n' +
		'				<h4 class="modal-title">\n' +
		'					模板编辑\n' +
		'				</h4>\n' +
		'				<span name="formName"></span>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div class="form-designer">\n' +
		'					<!-- 工具栏 -->\n' +
		'					<nav class="navbar navbar-default">\n' +
		'						<div class="container-fluid">\n' +
		'						<div class="navbar-header">\n' +
		'							<button type="button" class="navbar-toggle" data-toggle="collapse"\n' +
		'									data-target="#tool-bar">\n' +
		'								<span class="sr-only">切换导航</span>\n' +
		'								<span class="icon-bar"></span>\n' +
		'								<span class="icon-bar"></span>\n' +
		'								<span class="icon-bar"></span>\n' +
		'							</button>\n' +
		'							<span class="navbar-brand"><i class="fa fa-chain"></i></span>\n' +
		'						</div>\n' +
		'						<div class="collapse navbar-collapse" id="tool-bar">\n' +
		'							<ul class="nav navbar-nav" data-container="toolbar">\n' +
		'								<li><a href="#" data-action="createSingleSelect"><i class="fa fa-check-circle-o"></i> 单项</a></li>\n' +
		'								<li><a href="#" data-action="createMultiSelect"><i class="fa fa-check-square-o"></i> 多项</a></li>\n' +
		'								<li><a href="#" data-action="createInput"><i class="fa fa-pencil"></i> 填空</a></li>\n' +
		'								<li><a href="#" data-action="createSingleDropdown"><i class="fa fa-align-justify"></i> 单项下拉框</a></li>\n' +
		'								<li><a href="#" data-action="createMultDropdown"><i class="fa fa-list"></i> 多项下拉框</a></li>\n' +
		'								<li><a href="#" data-action="createFile"><i class="fa fa-file-text-o"></i> 上传文件</a></li>\n' +
		'								<li class="dropdown">\n' +
		'									<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
		'										其它 <b class="caret"></b>\n' +
		'									</a>\n' +
		'									<ul class="dropdown-menu">\n' +
		'										<li><a href="#">其它</a></li>\n' +
		'										<li class="divider"></li>\n' +
		'										<li><a href="#">其它</a></li>\n' +
		'									</ul>\n' +
		'								</li>\n' +
		'							</ul>\n' +
		'						</div>\n' +
		'						</div>\n' +
		'					</nav>\n' +
		'					<ul id="tab-bar" class="nav nav-tabs" style="margin: 0 50px 0 50px;">\n' +
		'						<li><a href="#123" data-toggle="tab">新建标签</a></li>\n' +
		'						<!-- 标签列表 -->\n' +
		'						<a href="#" data-action="addTab" style="float: left;padding: 8px 15px; font-size: 19px;"><i class="fa fa-plus-square"></i></a>\n' +
		'					</ul>\n' +
		'					<div id="tab-content" class="customized-scrollbar tab-content" style="height: 60vh; overflow-y: auto;">\n' +
		'						<div class="tab-pane fade active in" id="123"></div>\n' +
		'						<!-- 标签分页 -->\n' +
		'					</div>\n' +
		'				</div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<button type="button" class="btn btn-primary" data-action="submit">\n' +
		'					提交\n' +
		'				</button>\n' +
		'				<button type="button" class="btn btn-default" data-dismiss="modal">关闭\n' +
		'				</button>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	var addTab = function(data){
		
	};
	
	var addSingleSelect = function(data, $content){
		var $question = $(
			'<div class="question-item" data-type="singleSelect">\n' +
			'	<div class="title">\n' +
			'		<span name="index"></span>\n' +
			'		<span name="question"></span>\n' +
			'		<span name="tooltip" style="cursor: pointer;" data-toggle="tooltip" data-placement="right" data-html=true title=""><i class="fa fa-info-circle"></i></span>\n' +
			'	</div>\n' +
			'	<div class="answer">\n' +
			'	</div>\n' +
			'	<div class="btn-list" data-type="function-bar" style="text-align: right;">\n' +
			'		<div class="btn btn-primary btn-sm" data-action="activateEditor"><i class="fa fa-tag"></i> 编辑</div>\n' +
			'		<div class="btn btn-default btn-sm" data-action="copy"><i class="fa fa-copy"></i> 复制</div>\n' +
			'		<div class="btn btn-default btn-sm" data-action="delete"><i class="fa fa-trash"></i> 删除</div>\n' +
			'		<div class="btn btn-default btn-sm" data-action="moveUp"><i class="fa fa-angle-up"></i> 上移</div>\n' +
			'		<div class="btn btn-default btn-sm" data-action="moveDown"><i class="fa fa-angle-down"></i> 下移</div>\n' +
			'		<div class="btn btn-default btn-sm" data-action="moveTop"><i class="fa fa-angle-double-up"></i> 最前</div>\n' +
			'		<div class="btn btn-default btn-sm" data-action="moveBot"><i class="fa fa-angle-double-down"></i> 最后</div>\n' +
			'	</div>\n' +
			'	<div class="editor">\n' +
			'		<div class="row">\n' +
			'			<div class="col-sm-6">\n' +
			'				<label>请输入问题</label>\n' +
			'				<textarea name="title" placeholder="请输入问题标题..." rows=4 style="width: 100%;"></textarea>\n' +
			'			</div>\n' +
			'			<div class="col-sm-6">\n' +
			'				<div>\n' +
			'					<input type="checkbox" name="required">\n' +
			'					<label>必选</label>\n' +
			'				</div>\n' +
			'				<div>\n' +
			'					<input type="checkbox" name="tooltip">\n' +
			'					<label>提示</label>\n' +
			'					<input type="text" name="tooltip" placeholder="请输入提示">\n' +
			'				</div>\n' +
			'				<div>\n' +
			'					<input type="checkbox" name="constraint">\n' +
			'					<label>关联逻辑</label>\n' +
			'					<a href="#" data-action="addConstraint"><i class="fa fa-plus"></i></a>\n' +
			'				</div>\n' +
			'				<table class="table table-hover constraintList">\n' +
			'					<thead>\n' +
			'						<tr>\n' +
			'							<th>关联题目</th>\n' +
			'							<th>关联选项</th>\n' +
			'							<th>关联类型</th>\n' +
			'							<th>操作</th>\n' +
			'						</tr>\n' +
			'					</thead>\n' +
			'					<tbody>\n' +
			'					</tbody>\n' +
			'				</table>\n' +
			'			</div>\n' +
			'		</div>\n' +
			'		<table class="table table-hover optionList">\n' +
			'			<!-- <caption>选项设置</caption> -->\n' +
			'			<thead>\n' +
			'				<tr>\n' +
			'					<th>选项文字</th>\n' +
			'					<th>默认</th>\n' +
			'					<th>数值</th>\n' +
			'					<th>操作</th>\n' +
			'				</tr>\n' +
			'			</thead>\n' +
			'			<tbody>\n' +
			'			</tbody>\n' +
			'		</table>\n' +
			'	</div>\n' +
			'</div>'
		);
		
		// 加载题干
		$question.attr('data-id', data.lid);
		// load question;
		$question.find('.title [name=question]').text(data.title);
		
		// load tooltip
		var msg =  (data.required == 1 ? '<div>必填</div>' : '') + (data.tooltip != '' ? '<div>' + data.tooltip + '</div>' : '');
		if(msg != ''){
			$question.find('.title [name="tooltip"]')
				.css('visibility', 'visible')
				.attr('title', msg);
		}else{
			$question.find('.title [name="tooltip"]')
				.css('visibility', 'hidden');
		}
		
		// load options
		$question.find('.answer').empty();		
		$.each(data.options, function(index, item){
			var $item = $(
				'<div class="option" data-id="' + item.lid + '">\n' +
				'	<i class="fa ' + (item.isDefault == 0 ? 'fa-circle-o' : 'fa-check-circle-o')  + '"></i> <span name="radioName">' + item.name + '</span>\n' +
				'</div>'
			);
			$question.find('.answer').append($item);
		});
	
		// 加载编辑栏
		// load question
		$question.find('.editor textarea[name="title"]').val(data.title);
		// load required
		$question.find('.editor [name="required"]').prop('checked', data.required);
		// load tooltip
		console.log(data.tooltip);
		if(data.tooltip == ''){
			$question.find('[type="checkbox"][name="tooltip"]').prop('checked', 0);
			$question.find('[type="text"][name="tooltip"]').css('visibility', 'hidden');
		}else{
			$question.find('[type="checkbox"][name="tooltip"]').prop('checked', 1);
			$question.find('[type="text"][name="tooltip"]')
				.css('visibility', 'visible')
				.val(data.tooltip);
		}
		// load options
		$question.find('.optionList tbody').empty();		
		$.each(data.options, function(index, item){
			var newOption = new OptionDesigner(item);
			$question.find('.optionList tbody').append(newOption.getDocument());
		});
		
		
		$content.append($question);
	};
	

	
	
	addSingleSelect(temp1 ,$modal.find('#123'));
	addSingleSelect(temp2 ,$modal.find('#123'));
	
	// 工具栏事件
	$modal.on('click', '#tool-bar [data-action]', function(){
		console.log($(this).attr('data-action'));
	});
	
	// 标签栏事件
	// 1)添加标签
	$modal.on('click', '#tab-bar [data-action="addTab"]', function(){
		/* var newTabID = localIDGenerator();
		$newTab = $('<li><a href="#' + newTabID + '" data-toggle="tab">新建标签</a></li>');
		$newContent = $('<div class="tab-pane fade" id="' + newTabID + '"></div>\n'); */
		
	});
	
	// 2)修改标签名称
	$modal.on('click', '#tab-bar [data-toggle="tab"]', function(){

	});
	
	// 3)修改标签完毕
	
	// 4）删除标签
	
	
	// 问题工具栏事件
	$modal.on('click', '[data-type="function-bar"] [data-action]', function(){
		var action = $(this).attr('data-action');
		var $question = $(this).closest('.question-item');
		var $tab = $question.closest('.tab-pane');
		
		if(action == 'activateEditor'){
			activateQuestion($question);
		}else if(action == 'confrimEdit'){
			confirmActivation($question);
		}else if(action == 'copy'){
			
		}else if(action == 'delete'){
			$question.remove();
			renumbering($tab);
		}else if(action == 'moveUp'){
			$question.prev().before($question);
			renumbering($tab);
		}else if(action == 'moveDown'){
			$question.next().after($question);
			renumbering($tab);
		}else if(action == 'moveTop'){
			$question.closest('.tab-pane').prepend($question);
			renumbering($tab);
		}else if(action == 'moveBot'){
			$question.closest('.tab-pane').append($question);
			renumbering($tab);
		}else{
			
		}
	});
	
	
	// modal清除
	$modal.on('hidden.bs.modal', function(){
		$(this).remove();
	});
	
	$modal.modal('show');
	
};

var OptionDesigner = function(data){
	var $option = $(
		'<tr name="editorOption" id="">\n' +
		'	<td><input type="text" placeholder="请输入选项..." name="name"></td>\n' +
		'	<td><input type="checkbox" name="isDefault"></td>\n' +
		'	<td><input type="number" name="value" style="width: 50px;"></td>\n' +
		'	<td>\n' +
		'		<a class="btn btn-primary btn-xs" data-action="editor-create"><i class="fa fa-plus"></i></a>\n' +
		'		<a class="btn btn-primary btn-xs" data-action="editor-delete"><i class="fa fa-trash"></i></a>\n' +
		'		<a class="btn btn-primary btn-xs" data-action="editor-moveup"><i class="fa fa-arrow-up"></i></a>\n' +
		'		<a class="btn btn-primary btn-xs" data-action="editor-movedown"><i class="fa fa-arrow-down"></i></a>\n' +
		'	</td>\n' +
		'</tr>'
	);
	
	var thisOption = this;
	
	this.load = function(data){
		$option.attr('data-id', data.lid);
		$option.find('[name="name"]').val(data.name);
		$option.find('[name="isDefault"]').prop('checked', data.isDefault);
		$option.find('[name="value"]').val(data.value);
	};
	
	this.getDocument = function(){
		return $option;
	};
	
	(function(){
		var temp;
		if(data == undefined){
			temp = {
				lid: localIDGenerator(),
				name: '新的选项',
				value: '',
				isDefault: 0
			};
		}else{
			temp = data;
		}
		thisOption.load(temp);
	})();
};

var activateQuestion = function($question){
	$question.find('[data-action="activateEditor"]').replaceWith('<div class="btn btn-success btn-sm" data-action="confrimEdit"><i class="fa fa-check"></i> 完成</div>');
	$question.addClass('active');
	
	$question.closest('.tab-pane').find('.question-item.active').not($question).each(function(index, item){
		confirmActivation($(item));
	});
};

var confirmActivation = function($question){
	// confirm
	var type = $question.attr('data-type');

	if(type == 'singleSelect'){
		console.log(getJsonQuestion($question));
	}else if(type == 'multiSelect'){
		
	}else if(type == 'input'){
		
	}else if(type == 'singleDropdown'){
		
	}else if(type == 'multiDropdown'){
		
	}else if(type == 'file'){
		
	}else{
		
	}
	
	// inactivate
	$question.find('[data-action="confrimEdit"]').replaceWith('<div class="btn btn-primary btn-sm" data-action="activateEditor"><i class="fa fa-tag"></i> 编辑</div>');
	$question.removeClass('active');
};

var temp1 = {
	lid: '_ch4hd4jpm',
	type: 'singleSelect',
	required: 0,
	title: 'AAAAA',
	tooltip: '13131',
	options: [
		{
			lid: "_is6frrvyt",
			name: 'AAAAA',
			value: 0,
			isDefault: 0
		},
		{
			lid: "_s01fk5bat",
			name: 'BBBBB',
			value: 0,
			isDefault: 0
		}
	],
	constraints: [
		{
			lid: '_nzjs9whbt',
			type: 1,
			options: [
				{
					lid: '_4wl6caiet'
				},
				{
					lid: '_5ndw0aln9'
				},
			],
		}
	]
};


var getJsonQuestion = function($question){
	var type = $question.attr('data-type');
	var json = {};
	if(type == 'singleSelect'){
		json.type = 'singleSelect';
		json.lid = $question.attr('data-id');
		json.required = $question.find('.editor [name="required"]').is(':checked') ? 1 : 0;
		json.title = 	$question.find('.editor textarea[name="title"]').val();
		json.tooltip = $question.find('[type="checkbox"][name="tooltip"]').is(':checked') ? $question.find('[type="text"][name="tooltip"]').val() : '';
		
	}else if(type == 'multiSelect'){
		
	}else if(type == 'input'){
		
	}else if(type == 'singleDropdown'){
		
	}else if(type == 'multiDropdown'){
		
	}else if(type == 'file'){
		
	}else{
		
	}
	
	return json;
};
	


var renumbering = function($container){
	$container.find('.question-item').each(function(index, item){
		$(item).find('[name="index"]').text(++index);
	});
};

ObjectDesigner();