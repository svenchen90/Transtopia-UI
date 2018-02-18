/* 其它 */
// 1. Local unique ID generator
var localIDGenerator = function () {
	return '_' + Math.random().toString(36).substr(2, 9);
};


/*
	#
	Form (Designer) 
*/
/* 
form: {
	id: String, // Universial ID
	name: String,
	tags: [Tab],
	constraints: [constraint]
}
*/

var tab1 = {
	lid: '_oohbd6kqt',
	name: '标签1',
	questions: [
		{
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
		},
		{
			lid: '_ezj0vd2hh',
			type: 'singleSelect',
			required: 0,
			title: '11111111',
			tooltip: '',
			options: [
				{
					lid: "_66vb3qv0q",
					name: '111111',
					value: 0,
					isDefault: 0
				},
				{
					lid: "_aeso5n1kq",
					name: '222222',
					value: 0,
					isDefault: 0
				}
			]
		},
		{
			lid: '_ch4hd4jpm',
			type: 'singleSelect',
			required: 0,
			title: 'AAAAA',
			tooltip: '',
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
		}
	] 
};


var form1 = {
	lid: localIDGenerator(),
	name: '新的表单',
	tabs: [
		tab1,
		{
			lid: localIDGenerator(),
			name: '标签2',
			questions: []
		}
	]
}



var FormDesigner = function(data){
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
		'						<!-- 标签列表 -->\n' +
		'						<a href="#" data-action="addTab" style="float: left;padding: 8px 15px; font-size: 19px;"><i class="fa fa-plus-square"></i></a>\n' +
		'				</ul>\n' +
		'					<div id="tab-content" class="customized-scrollbar tab-content" style="height: 60vh; overflow-y: auto;">\n' +
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
	
	var load = function(data){
		console.log(data);
		$modal.attr('data-id', data.lid);
		$modal.find('[name="formName"]').text(data.name);
		$.each(data.tabs, function(index, item){
			var tab = TabDesigner(item);
			
			$modal.find('[data-action="addTab"]').before(tab.tab);
			$modal.find('#tab-content').append(tab.content);
			
			tab.content
				.sortable({
					handle: ".title",
					placeholder: "question-placeholder",
					update: function( event, ui ) {
						renumbering($(this));
					}
				})
				.disableSelection();
		});
	};
	
	if(data != undefined)
		load(data);
	
	
	// A. 激活修改名称
	$modal.find('#tab-bar').on('click', 'li.active a', function(){
		var tabName = $(this).text();
		var href = $(this).attr('href');
		var $input = $('<input class="tab-rename" value="' + tabName + '" data-href="' + href + '"/>');
		$(this).replaceWith($input);
		$input.focus();
	});
	
	// B. 完成修改名称
	$modal.find('#tab-bar')
		.on('focusout', 'input', function(){
			$(this).closest('li')
				.empty()
				.append('<a href="' + $(this).attr('data-href') + '" data-toggle="tab">' + ($(this).val() == '' ? '标签' : $(this).val() ) + '</a>\n');
		})
		.on('keydown', 'input', function(event){
				if(event.keyCode == '13'){
					$(this).focusout();
				}
		});
	
	
	// C. 添加新的tab
	$modal.find('#tab-bar').on('click', '[data-action="addTab"]', function(){
		var id = localIDGenerator();
		
		var $newTab = $('<li><a href="#' + id + '" data-toggle="tab">新建标签</a></li>');
		$(this).before($newTab);
		
		var $newContent = $(
			'<div class="tab-pane fade" id="' + id + '">\n' +
			'</div>\n'
		);
		$modal.find('#tab-content').append($newContent);
		
		$newContent
			.sortable({
				handle: ".title",
				placeholder: "question-placeholder",
				update: function( event, ui ) {
					renumbering($newContent);
				}
			})
			.disableSelection();
		
		$newTab.find('a').tab('show');
		$newTab.find('a').click();
		
	});
	
	return $modal;
};


/* 
	##
	Tab
*/
/* 
tab: {
	lid: String, // Local ID
	name: String,
	list: [Question];
}
 */
var TabDesigner = function(data){
	var $tabTitle = $('<li><a href="" data-toggle="tab"></a></li>');
	var $tabContent = $('<div class="tab-pane fade" id=""></div>');
	
	var validate = function(data){
		return true;
	};
	
	
	var load = function(data){
		if(validate(data)){
			lid = data.lid;
			$tabTitle.find('a')
				.attr('href', '#' + lid)
				.html(data.name);
			$tabContent.attr('id', lid);
			
			// load questions
			$.each(data.questions, function(index, item){
				var $question = SingleSelect(item);
				$question.find('.title [name="index"]').text(++index);
				$tabContent.append($question);
				
				
				// load constraints
				if(item.constraints == undefined || item.constraints.length == 0){
					$question.find('[data-action="addConstraint"]')
						.css('visibility', 'hidden');
					$question.find('.constraintList')
						.css('visibility', 'hidden');
				}else{
					$question.find('[type=checkbox][name="constraint"]').prop('checked', true);	
					$.each(item.constraints, function(i, c){
						var $constrain = Constraint(c, data.questions);
						$question.find('.constraintList tbody').append($constrain);
					});					
				}
			});
		}else{
			console.log('error');
		}
	}
	if(data!=undefined)
		load(data);
	else
		load({
			lid: localIDGenerator(),
			name: '新的标签',
			questions:[]
		})
		
	return {
		tab: $tabTitle,
		content: $tabContent
	};
};

var SingleSelect = function(data){
	var $question = $(
		'<div class="question-item" data-type="singleSelect">\n' +
		'	<div class="title">\n' +
		'		<span name="index"></span>\n' +
		'		<span name="question"></span>\n' +
		'		<span name="tooltip" style="cursor: pointer;" data-toggle="tooltip" data-placement="right" data-html=true title=""><i class="fa fa-info-circle"></i></span>\n' +
		'	</div>\n' +
		'	<div class="answer">\n' +
		'	</div>\n' +
		'	<div class="btn-list" style="text-align: right;">\n' +
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
	
	var thisFunction = arguments.callee;
	
	// 1) Load question
	var load = function(data){
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
	};
	
	// 2) Load editor
	var loadEditor = function(data){
		// load question
		$question.find('.editor textarea[name="title"]').text(data.title);
		// load required
		$question.find('.editor [name="required"]').prop('checked', data.required);
		// load tooltip
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
	};
	
	// 3) add Option
	var addOption = function(data, $item){
		var option = new OptionDesigner(data);
		if($item == undefined){
			$question.find('.optionList tbody').append(option.getDocument());
		}else{
			$item.after(option.getDocument());
		}
	};

	// 4. load constrain
	var loadConstrains = function(data){
		var prev_json = getPrevLink($question);
		
		$question.find('.constraintList tbody').empty();
		$.each(data, function(index, item){
			var $constaint = Constraint(item, prev_json);
			$question.find('.constraintList tbody').append($constaint);
		});
	};
	
	var schema;
	// Initialiaze Schema
	if(data == undefined){
		schema = {
			lid: localIDGenerator(),
			type: 'singleSelect',
			required: 0,
			title: '请输入问题',
			tooltip: '',
			options: [
				{
					lid: localIDGenerator(),
					name: '选项1',
					value: 0,
					isDefault: 0
				},
				{
					lid: localIDGenerator(),
					name: '选项2',
					value: 0,
					isDefault: 0
				}
			]
		};
		activateQuestion($question);
	}else{
		schema = data;
		inactivateQuestion($question);
	}
	load(schema);
	loadEditor(schema);
	
	$question.on('click', '[data-action="editor-create"]', function(){
		addOption(undefined, $(this).closest('[name="editorOption"]'));
	});
	
	$question.on('click', '[data-action="editor-delete"]', function(){
		if($question.find('[name="editorOption"]').length > 1)
			$(this).closest('[name="editorOption"]').remove();
		else{
			alert('选项不能为空');
		}
	});
	
	$question.on('click', '[data-action="editor-moveup"]', function(){
		var $current = $(this).closest('[name="editorOption"]');
		$current.prev().before($current);
	});
	
	$question.on('click', '[data-action="editor-movedown"]', function(){
		var $current = $(this).closest('[name="editorOption"]');
		$current.next().after($current);
	});
	
	$question.on('click', '[type="checkbox"][name="tooltip"]', function(){
		if($(this).is(':checked')){
			$question.find('[type="text"][name="tooltip"]').css('visibility', 'visible');
		}else{
			$question.find('[type="text"][name="tooltip"]').css('visibility', 'hidden');
		}
	});
	
	$question.on('click', '[name="isDefault"]', function(){
		if($(this).is(':checked')){
			$question.find('[name="isDefault"]').not($(this)).prop('checked', false);
		}
	});
	
	$question.on('click', '[data-action="activateEditor"]', function(){		
		activateQuestion($question);
	});
	
	$question.on('click', '[data-action="confrimEdit"]', function(){		
		var json = getJsonQuestion($question);
		load(json);
		
		inactivateQuestion($question)
	});
	
	$question.on('click', '[data-action="copy"]', function(){
		var json = getJsonQuestion($question);
		json.lid = localIDGenerator();
		$.each(json.options, function(index, o){
			o.lid = localIDGenerator();
		});
		var copy = thisFunction(json);
		$question.after(copy);
		
		renumbering($question.closest('.tab-pane'));
	});
	
	$question.on('click', '[data-action="delete"]', function(){
		var $container = $question.closest('.tab-pane');
		$question.remove();
		renumbering($container);
	});
	
	$question.on('click', '[data-action="moveUp"]', function(){
		$question.prev().before($question);

		renumbering($question.closest('.tab-pane'));
	});
	
	$question.on('click', '[data-action="moveDown"]', function(){
		$question.next().after($question);

		renumbering($question.closest('.tab-pane'));
	});
	
	$question.on('click', '[data-action="moveTop"]', function(){
		$question.closest('.tab-pane').prepend($question);

		renumbering($question.closest('.tab-pane'));
	});
	
	$question.on('click', '[data-action="moveBot"]', function(){
		$question.closest('.tab-pane').append($question);

		renumbering($question.closest('.tab-pane'));
	});
	
	$question.on('click', '[type="checkbox"][name="constraint"]', function(){
		if($(this).is(':checked')){
			$question.find('.constraintList')
				.css('visibility', 'visible');
				
			$question.find('[data-action="addConstraint"]')
				.css('visibility', 'visible');
				
		}else{
			$question.find('.constraintList')
				.css('visibility', 'hidden')
				.find('tbody').empty();
				
			$question.find('[data-action="addConstraint"]')
				.css('visibility', 'hidden');
		}
	});
	
	$question.on('click', '[data-action="addConstraint"]', function(){
		var prev_json = getPrevLink($question);
		var cur_json = getCurrentConstraint($question);
		addConstraintModal(cur_json, prev_json, loadConstrains);

	});
	
	$question.on('click', '[data-action="constraint-delete"]', function(){
		$(this).closest('tr').remove();
	});
	
	$question.on('click', '[data-action="constraint-edit"]', function(){
		var prev_json = getPrevLink($question);
		var cur_json = getCurrentConstraint($question);
		addConstraintModal(cur_json, prev_json, loadConstrains);
	});
	
	return $question;
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

var Constraint = function(json_constrain, json_questions){
	var $constraint = $(
		'<tr name="constraint">\n' +
		'	<td><span name="question" data-id=""></span></td>\n' +
		'	<td name="options"></td>\n' +
		'	<td name="type"></td>\n' +
		'	<td>\n' +
		'		<a class="btn btn-primary btn-xs" data-action="constraint-delete"><i class="fa fa-trash"></i></a>\n' +
		'		<a class="btn btn-primary btn-xs" data-action="constraint-edit"><i class="fa fa-pencil"></i></a>\n' +
		'	</td>\n' +
		'</tr>'
	);
	
	//console.log(json_questions);
	
	var json_question = json_questions.find(function(element) {
		//console.log(element.lid, json_constrain.lid)
		return element.lid == json_constrain.lid;
	});
	
	$constraint.find('[name="question"]')
		.attr('data-id', json_question.lid)
		.text('[' + json_question.title + ']');
	
	$.each(json_constrain.options, function(idx1, item1){
		var found = json_question.options.find(function(element) {
			//console.log(element.lid, item1.lid);
			return element.lid == item1.lid;
		});
		$constraint.find('[name="options"]').append(
			'<span name="option" data-id="' + found.lid + '">[' + found.name + ']</span>'
		);
	});
	
	if(json_constrain.type == 0)
		$constraint.find('[name="type"]')
			.attr('data-value', json_constrain.type)
			.text('选中则显示');
	else if(json_constrain.type == 1)
		$constraint.find('[name="type"]')
			.attr('data-value', json_constrain.type)
			.text('不选中则显示');
	else
		console.log('error');
	
	
	return $constraint;
};

var addConstraintModal = function(linked ,questions, callback){
	var $modal = $(
		'<div class="modal fade" id="templateEditor">\n' +
		'	<div class="modal-dialog"  style="width:30vw;">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close" data-dismiss="modal">\n' +
		'					&times;\n' +
		'				</button>\n' +
		'				<h4 class="modal-title">\n' +
		'					逻辑选择列表\n' +
		'				</h4>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<table class="table table-hover">\n' +
		'					<!-- <caption>选项设置</caption> -->\n' +
		'					<thead>\n' +
		'						<tr>\n' +
		'							<th>选择</th>\n' +
		'							<th>题目</th>\n' +
		'							<th>选项</th>\n' +
		'							<th>类别</th>\n' +
		'						</tr>\n' +
		'					</thead>\n' +
		'					<tbody name="constrainList">\n' +
		' 					<tr name="linked">\n' +
		'							<td colspan="4" style="text-align: center; background-color: rgba(0,0,0,0.3);">已关联</td>\n' +
		'						</tr>\n' +
		' 					<tr name="unlinked">\n' +
		'							<td colspan="4" style="text-align: center; background-color: rgba(0,0,0,0.3);">未关联</td>\n' +
		'						</tr>\n' +
		'					</tbody>\n' +
		'				</table>\n' +
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
	
	$.each(questions, function(index, question){
		var l = $(
			'<tr name="constraint">\n' +
			'	<td><input type="checkbox" name="select"></td>\n' +
			'	<td><span name="question" data-id="' + question.lid + '">' + question.title + '</span></td>\n' +
			'	<td name="options"></td>\n' +
			'	<td name="type">\n' +
			'		<select>\n' +
			'			<option value="1">选中显示</option>\n' +
			'			<option value="0">不选中显示</option>\n' +
			'		</select>\n' +
			'</td>\n' +
			'</tr>'
		);
		
		$.each(question.options, function(i, o){
			l.find('[ name="options"]').append(
				'<div><input type="checkbox" name="option" data-id="' + o.lid + '">' + o.name + '</div>\n'
			);
		});
		
		
		var found = linked.find(function(element) {
			return element.lid == question.lid;
		});
		
		if(found == undefined ){
			$modal.find('[name="unlinked"]').after(l);
		}else{
			l.find('[name="select"]').prop('checked', true);
			l.find('[name="type"] select').val(found.type);
			
			$.each(found.options, function(i, o){
				l.find('[data-id="' + o.lid + '"]').prop('checked', true);
			});
			
			$modal.find('[name="linked"]').after(l);
		}
	});
	
	$modal.find('[data-action="submit"]').on('click', function(){
		var result = [];
		$.each($('[name="select"]:checked'), function(index, item){
			var constrain = {};
			constrain.lid = $(item).closest('tr').find('[name="question"]').attr('data-id');
			
			constrain.options=[];
			$.each($(item).closest('tr').find('[name="options"] [name="option"]:checked'), function(i, o){
				constrain.options.push({lid: $(o).attr('data-id')});
			});
			
			constrain.type = $(item).closest('tr').find('[name="type"] select').val();
			
			result.push(constrain);
		});
		
		callback(result);
		$modal.modal('hide');
	});
	
	
	$modal.on('hidden.bs.modal', function(){
		$(this).remove();
	});
	
	$modal.modal('show');
};

var getPrevLink = function($question){
	var prev_json = [];
	$question.prevAll('.question-item').each(function(index, item){
		var type = $(item).attr('data-type');
		if(type == 'singleSelect' || type == 'multiSelect' || type == 'singleDropdown' || type == 'multiDropdown')
			prev_json.push(getJsonQuestion($(item)));
	});
	
	return prev_json;
};

var getCurrentConstraint = function($question){
	var cur_json = [];
	$question.find('.constraintList [name="constraint"]').each(function(index, item){
		var constraint = {};
		constraint.lid = $(item).find('[name="question"]').attr('data-id');
		constraint.type = $(item).find('[name="type"]').attr('data-value');
		constraint.options = []
		$(item).find('[name="option"]').each(function(idx, o){
			constraint.options.push({
				lid: $(o).attr('data-id')
			});
		});
		cur_json.push(constraint);
	});
	
	return cur_json;
}




var getJsonQuestion = function($question){
	var json = {};
	var type = $question.attr('data-type');
	var getJsonOptions = function($options){
		var json = []
		$options.each(function(index, item){
			var o = {};
			o.lid = $(item).attr('data-id');
			o.name = $(item).find('[name="name"]').val();
			o.isDefault = $(item).find('[name="isDefault"]').is(':checked') ? 1 : 0;
			o.value = $(item).find('[name="value"]').val();
			json.push(o);
		});
		return json;
	};
	
	var getJsonConstraints = function($constraints){
		var json = []
		$constraints.each(function(index, item){
			var constraint = {};
			constraint.lid = $(item).find('[name="question"]').attr('data-id');
			constraint.type = $(item).find('[name="type"]').attr('data-value');
			constraint.options = []
			$(item).find('[name="option"]').each(function(idx, o){
				constraint.options.push({
					lid: $(o).attr('data-id')
				});
			});
			json.push(constraint);
		});
		return json;
	};
	
	switch(type){
		case 'singleSelect':
			json.lid = $question.attr('data-id');
			json.type = type;
			json.required = $question.find('[name="required"]').is(':checked') ? 1 : 0;
			json.title = $question.find('[name="title"]').text();
			json.tooltip = $question.find('[type="checkbox"][name="tooltip"]').is(':checked') 
				? $question.find('[type="text"][name="tooltip"]').val() : '';
			json.options = getJsonOptions($question.find('[name="editorOption"]'));
			json.constraints = getJsonConstraints($question.find('[name="constraint"]'));
			
			break; 
		default:
			console.log('error');
	}
	
	return json
};

var renumbering = function($container){
	$container.find('.question-item').each(function(index, item){
		$(item).find('[name="index"]').text(++index);
	});
};

var activateQuestion = function($question){
	$question.find('[data-action="activateEditor"]').replaceWith('<div class="btn btn-success btn-sm" data-action="confrimEdit"><i class="fa fa-check"></i> 完成</div>');
	$question.addClass('active');
	
	$question.closest('.tab-pane').find('.question-item').not($question).each(function(index, item){
		inactivateQuestion($(item));
	});
};

var inactivateQuestion = function($question){
	$question.find('[data-action="confrimEdit"]').replaceWith('<div class="btn btn-primary btn-sm" data-action="activateEditor"><i class="fa fa-tag"></i> 编辑</div>');
	$question.removeClass('active');
};



var $modal = FormDesigner(form1);
$modal.modal('show');