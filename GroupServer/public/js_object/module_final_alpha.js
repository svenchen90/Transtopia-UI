/* 
1. Single-select
{	
	lid: String, //Local ID
	type: 'single-select',
	required: 0/1,
	question: String,
	tooltip: String,
	options: [Option],
	constraints: [Constraint]
}

2. Multi-select
{
	lid: String, //Local ID
	type: 'multi-select',
	required: 0/1,
	question: String,
	tooltip: String,
	min: Number(-1 means not required),
	max: Number(-1 means not required)
	options: [Option],
	constraints: [Constraint]
}
 */


var localIDGenerator = function () {
	return '_' + Math.random().toString(36).substr(2, 9);
};

var objIsEmpty = function(obj){
	return Object.keys(obj).length === 0 && obj.constructor === Object;
};

var TwinTables = function(context, data_top, data_bot, constr, toJson, callback){
	var $modal = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<h5 class="modal-title"></h5>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<table class="table">\n' +
		'					<thead>\n' +
		'						<!-- 标题 -->\n' +
		'					</thead>\n' +
		'					<tbody data-container="top">\n' +
		'						<tr class="active">\n' +
		'							<th style="text-align: center;" data-type="category"></th>\n' +
		'						</tr>\n' +
		'					</tbody >\n' +
		'					<tbody data-container="bot">\n' +
		'						<tr class="active">\n' +
		'							<th style="text-align: center;" data-type="category"></th>\n' +
		'						</tr>\n' +			
		'					</tbody>\n' +
		'				</table>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<button type="button" class="btn btn-primary" data-action="submit">确认</button>\n' +
		'				<button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	var loadContext = function(){
		$modal.find('.modal-title').text(context.title);
		
		$tr = $('<tr></tr>');
		$.each(context.thead, function(idx, item){
			$tr.append('<th>' + item + '</th>');
		});
		$tr.append('<th>操作</th>')
		$modal.find('thead').append($tr);
		
		$modal.find('tbody[data-container="top"] [data-type="category"]').text(context.top);
		$modal.find('tbody[data-container="bot"] [data-type="category"]').text(context.bot);
		$modal.find('tbody[data-container="top"] [data-type="category"]').attr('colspan', context.thead.length+1);
		$modal.find('tbody[data-container="bot"] [data-type="category"]').attr('colspan', context.thead.length+1);
		
	}
	
	var loadTop = function(){
		$.each(data_top, function(i, d){
			var $item = constr(d);
			$item.append('<td><a href="#" data-action="remove"><i class="fa fa-ban"></i></a></td>');
			$modal.find('tbody[data-container="top"]').append($item);
		});
	};
	
	var loadBot = function(){
		$.each(data_bot, function(i, d){
			var $item = constr(d);
			$item.append('<td><a href="#" data-action="add"><i class="fa fa-plus"></i></a></td>');
			$modal.find('tbody[data-container="bot"]').append($item);
		});
	};
	
	var initialize = function(){
		loadContext();
		loadTop();
		loadBot();
		checkEmpty();
		
		
		$modal.on('click', '[data-action]', function(){
			var type = $(this).attr('data-action');
			var $tr = $(this).closest('tr');
			
			if(type == 'remove'){
				$modal.find('tbody[data-container="bot"]').append($tr);
				$(this).replaceWith('<td><a href="#" data-action="add"><i class="fa fa-plus"></i></a></td>');
				checkEmpty();
			}else if(type == 'add'){
				$modal.find('tbody[data-container="top"]').append($tr);
				$(this).replaceWith('<td><a href="#" data-action="remove"><i class="fa fa-ban"></i></a></td>');
				checkEmpty();
			}else if(type == "submit"){
				var result = [];
				$modal.find('[data-container="top"] [data-type="tr"]').each(function(index, item){
					result.push(toJson($(item)));
				});
				
				callback(result);
				
				$modal.modal('hide');
			}else{
				console.lol('error');
			}
		});
		
		$modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		$modal.modal('show');
	};
	
	var checkEmpty = function(){
		var colspan = $modal.find('tbody[data-container="top"] [data-type="category"]').attr('colspan');
		
		if($modal.find('tbody[data-container="top"] tr').length == 1){
			$modal.find('tbody[data-container="top"]').append('<tr><td colspan="' + colspan + '" style="text-align: center;" data-type="empty-holder">暂无选项</td></tr>');
		}else{
			$modal.find('tbody[data-container="top"] [data-type="empty-holder"]').remove();
		}
		
		if($modal.find('tbody[data-container="bot"] tr').length == 1){
			$modal.find('tbody[data-container="bot"]').append('<tr><td colspan="' + colspan + '" style="text-align: center;" data-type="empty-holder">暂无选项</td></tr>');
		}else{
			$modal.find('tbody[data-container="bot"] [data-type="empty-holder"]').remove();
			
		}
	}
	
	initialize();
	
};

var FormDesigner = function(data, submitCallback){
	var $modal = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog"  style="width:60vw;">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close" data-dismiss="modal">\n' +
		'					&times;\n' +
		'				</button>\n' +
		'				<h4 class="modal-title">\n' +
		'					<span data-type="formName" data-id></span>\n' +
		'				</h4>\n' +
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
		'								<li><a href="#" data-action="singleSelect"><i class="fa fa-check-circle-o"></i> 单项</a></li>\n' +
		'								<li><a href="#" data-action="multiSelect"><i class="fa fa-check-square-o"></i> 多项</a></li>\n' +
		'								<li><a href="#" data-action="singleDropdown"><i class="fa fa-align-justify"></i> 单项下拉框</a></li>\n' +
		'								<li><a href="#" data-action="multiDropdown"><i class="fa fa-list"></i> 多项下拉框</a></li>\n' +
		'								<li class="dropdown">\n' +
		'									<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
		'										<i class="fa fa-pencil"></i> 填空 <b class="caret"></b>\n' +
		'									</a>\n' +
		'									<ul class="dropdown-menu">\n' +
		'										<li><a href="#" data-action="input" data-subType="default"><i class="fa fa-pencil"></i> 填空</a></li>\n' +
		'										<li class="divider"></li>\n' +
		'										<li><a href="#" data-action="input" data-subType="number"><i class="fa fa-list-ol"></i> 整数</a></li>\n' +
		'										<li><a href="#" data-action="input" data-subType="date"><i class="fa fa-calendar"></i> 日期</a></li>\n' +
		'										<li><a href="#" data-action="input" data-subType="email"><i class="fa fa-envelope-o"></i> email</a></li>\n' +
		'										<li><a href="#" data-action="input" data-subType="phone"><i class="fa fa-phone"></i> phone</a></li>\n' +
		'									</ul>\n' +
		'								</li>\n' +
		'								<li><a href="#" data-action="file"><i class="fa fa-file-text-o"></i> 上传文件</a></li>\n' +
		'							</ul>\n' +
		'						</div>\n' +
		'						</div>\n' +
		'					</nav>\n' +
		'					<ul id="tab-bar" class="nav nav-tabs" style="margin: 0 50px 0 50px;">\n' +
		'						<!-- 标签列表 -->\n' +
		'						<a href="#" data-action="addTab" style="float: left;padding: 8px 15px; font-size: 19px;"><i class="fa fa-plus-square"></i></a>\n' +
		'					</ul>\n' +
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
		if(data == undefined || objIsEmpty(data)){
			load({
				lid: localIDGenerator(),
				name: '新的物品',
				tabs: []
			});
		}else{
			$modal.find('[data-type="formName"]')
				.attr('data-id', data.lid)
				.text(data.name);
			
			var t_id;
			$.each(data.tabs, function(index, t){
				t_id = addTab(t);
			});
			
			activeTab(t_id);
		}
	};
	
	var clear = function(){
		$modal.find('#tab-bar li').remove();
		$modal.find('#tab-content').empty();
	};
	
	var toJson = function(){
		var json = {
			lid : $modal.find('[data-type="formName"]').attr('data-id'),
			name: $modal.find('[data-type="formName"]').text(),
			tabs: []
		};
		
		$modal.find('.tab-pane').each(function(index, item){
			var id = $(item).attr('id');
			json.tabs.push(tabToJson(id));
		});
		
		return json
	};
	
	var addTab = function(data){
		if(data == undefined || objIsEmpty(data)){
			return addTab({
				lid: localIDGenerator(),
				name: '新的分页',
				questions:[]
			});
		}else{
			var $tab = $('<li><a href="#' + data.lid + '" data-toggle="tab"><span data-type="name">' + data.name + '</span><span data-action="deleteTab">&times</span></a></li>');
			var $pane = $('<div class="tab-pane fade" id="' + data.lid + '"></div>');
			$.each(data.questions, function(index, item){
				addQuestion(item, $pane);
			});
			
			$modal.find('#tab-bar [data-action="addTab"]').before($tab);
			$modal.find('#tab-content').append($pane);
			
			return data.lid;
		}
	};
	
	var deleteTabByID = function(id){
		$modal.find('#tab-bar [href="#' + id + '"]').closest('li').remove();
		$modal.find('#tab-content #' + id).remove();
	};
	
	var rerank = function($container){
		$container.find('.question-item').each(function(index, item){
			$(item).find('.title [name="index"]').text(index + 1);
		});
	};
	
	var tabToJson = function(id){
		var json = {
			lid: id,
			name: $modal.find('#tab-bar [href="#' + id + '"] [data-type="name"]').text(),
			questions: []
		};
		
		$modal.find('#' + id + ' .question-item').each(function(index, item){
			json.questions.push(questionToJson($(item)));
		});
		return json;
	};
	
	var activeTab = function(id){
		$modal.find('[href="#' + id + '"]').tab('show');
		$modal.find('#' + id).addClass('active in');
	};
	
	var addQuestion = function(data, $tab){
		var $question;
		if(data == undefined || objIsEmpty(data)){
			console.log('error');
		}else{
			$question = new QuestionDesigner().get$Question(data);
			$tab.append($question);
			rerank($tab);
		}
		
		return $question;
	};
	
	var questionToJson = function($question){
		return new QuestionDesigner().toJosn($question);
	};
	
	
	var initialize = function(){
		load(data);
		
		
		// 激活重命名form
		$modal.on('dblclick', 'span[data-type="formName"]', function(){
			var id = $(this).attr('data-id');
			var name = $(this).text();
			var $input = $('<input data-type="formName" value="' + name + '" data-id="' + id + '" placeholder="请输表单名称">');
			$(this).replaceWith($input);
			$input.focus();
		});
		
		// 完成form重命名
		$modal.on('focusout keydown', 'input[data-type="formName"]', function(){
			if(event.type == 'blur' || (event.type == 'keydown' && event.keyCode == '13')){
				var id = $(this).attr('data-id');
				var name = $(this).val();
				if(name != ''){
					var $a = $('<span data-type="formName" data-id="' + id + '">' + name + '</span>')
					$(this).replaceWith($a);
				}	
			}
		});
		
		// 添加删除 tab
		$modal.on('click', '#tab-bar [data-action]', function(){
			var actionType = $(this).attr('data-action')
			if(actionType == 'addTab'){
				var id = addTab();
				activeTab(id);
			}else if(actionType == 'deleteTab'){
				var id = $(this).closest('a').attr('href').substring(1);
				if(confirm('确认删除')){
					deleteTabByID(id);
				}
			}else{
				
			}
		});
		
		// 激活重命名tab
		$modal.on('dblclick', '#tab-bar li.active', function(){
			if($(this).find('a').length == 1){
				var id = $(this).find('a').attr('href').substring(1);
				var name = $(this).find('[data-type="name"]').text();
				var $input = $('<input value="' + name + '" data-id="' + id + '" placeholder="请输入分页名称" style="position: relative;display: block;margin: 10px 15px;">');
				$(this).html($input);
				$input.focus();
			}
		});
		
		// 完成tab重命名
		$modal.on('focusout keydown', '#tab-bar li input', function(){
			if(event.type == 'blur' || (event.type == 'keydown' && event.keyCode == '13')){
				var id = $(this).attr('data-id');
				var name = $(this).val();
				if(name != ''){
					var $a = $('<a href="#' + id + '" data-toggle="tab"><span data-type="name">' + name + '</span><span data-action="deleteTab">&times</span></a>')
					$(this).replaceWith($a);
				}else{
					alert('分页名称不能为空');
					$(this).val('分页名称');
				}
			}
		});
		
		// 新建问题栏事件
		$modal.on('click', '#tool-bar [data-action]', function(){
			var $container = $modal.find('.tab-pane.active');
			if($modal.find('.tab-pane.active').length != 0){
				var json = {
					type: $(this).attr('data-action')
				};
				if($(this).attr('data-subType')){
					json.subType = $(this).attr('data-subType');
				}
				var $q = addQuestion(json, $container);
				$q.find('.btn-list [data-action="activateEditor"]').trigger('click');
			}else{
				alert('请选择您要添加到分页');
			}
		});
		
		// 排序
		$modal.on('click', '.question-item .btn-list [data-action]', function(){
			rerank($modal.find('.tab-pane.active'));
		});
		
		//submit
		$modal.on('click', '[data-action="submit"]', function(){
			if(confirm('确认提交?')){
				submitCallback(toJson());
				$modal.modal('hide');
			}
		});
		
		$modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		$modal.modal('show');
	};
	
	initialize();
};

var QuestionDesigner = function(){
	this.get$Question = function(data){
		return jsonToQuestion(data);
	};
	
	this.toJosn = function($question){
		return questionToJson($question);
	}
	
	var questionToJson = function($question){
		var result = {};
		
		var questionType = $question.attr('data-type');
		if(['singleSelect', 'multiSelect', 'singleDropdown', 'multiDropdown', 'input', 'file'].includes(questionType)){
			result.type = questionType;
			result.lid = $question.attr('data-id');
			result.title = $question.find('.editor textarea[name="title"]').val();
			result.required = $question.find('.editor [name="required"]').is(':checked') ? 1 : 0;
			result.tooltip = $question.find('[type="checkbox"][name="tooltip"]').is(':checked') ?  $question.find('[type="text"][name="tooltip"]').val() : '';
			result.constraints = getConstraintData($question);
			
			if(['singleSelect', 'multiSelect', 'singleDropdown', 'multiDropdown'].includes(questionType)){
				result.options = [];
				$.each($question.find('.optionList tbody tr'), function(index, item){
					result.options.push($optionToJson($(item)));
				});
			}
			
			if(['multiSelect','multiDropdown'].includes(questionType)){
				result.min = $question.find('[name="range"] [name="min"]').val();
				result.max = $question.find('[name="range"] [name="max"]').val();
				result.min = result.min == '' ?  undefined : result.min;
				result.max = result.max == '' ?  undefined : result.max;
			}
			
			if(['input'].includes(questionType)){
				result.subType = $question.find('select[name="subType"] option:selected').val();
			}
			
			if(['file'].includes(questionType)){
				result.allowedType = [];
				$question.find('[data-type="typeList"] [name="allowedType"]:checked').each(function(index, item){
					result.allowedType.push($(item).attr('data-type'));
				});
			}
			
		}else{
			
		}

		return result;
	};

	var jsonToQuestion = function(data){
		var $question;
		
		switch(data.type){
			case 'singleSelect':
			case 'multiSelect':
			case 'singleDropdown':
			case 'multiDropdown':
				$question = get$Choice(data);
				break;
			case 'input':
				$question = get$Input(data);
				break;
			case 'file':
				$question = get$File(data);
				break;
			default:
				console.log('error');
		}
		
		// Event
		// 加载问题工具栏事件
		$question.on('click', '.btn-list [data-action]', function(){
			var actionType = $(this).attr('data-action');
			var $container = $question.closest('.tab-pane');
			
			switch(actionType){
				case 'activateEditor':
					$question.closest('.tab-pane').find('.question-item.active [data-action=confirmEdit]').trigger('click');
					$question.find('[data-action="activateEditor"]').replaceWith('<div class="btn btn-success btn-sm" data-action="confirmEdit"><i class="fa fa-check"></i> 完成</div>');
					// update constraints (sufficent)
					update$Constraint($question);
					$question.addClass('active');
					break;
				case 'confirmEdit':
					$question.find('[data-action="confirmEdit"]').replaceWith('<div class="btn btn-primary btn-sm" data-action="activateEditor"><i class="fa fa-tag"></i> 编辑</div>');
					
					// update question
					var data = questionToJson($question);
					data.index = $question.find('.title [name="index"]').text();
					$question.replaceWith(jsonToQuestion(data));
					$question.removeClass('active');
					break;
				case 'copy':
					var copyData = questionToJson($question);
					copyData.lid = localIDGenerator();
					copyData.constraints = [];
					var $copy = jsonToQuestion(copyData);
					
					// ? initializeConstraint($copy, copyData, []); ?
					
					$question.after($copy);
					break;
				case 'delete':
					$question.remove();
					break;
				case 'moveUp':
					$question.prev().before($question);
					break;
				case 'moveDown':
					$question.next().after($question);
					break;
				case 'moveTop':
					$question.closest('.tab-pane').prepend($question);
					break;
				case 'moveBot':
					$question.closest('.tab-pane').append($question);
					break;
				
				default:
					console.log('error');
			}
			// 排序
			/* rerankQuestion($container); */
		});
		
		// eidtor
		$question.on('click', 'input[type="checkbox"]', function(){
			var type = $(this).attr('name');
			switch(type){
				case 'required':
					break;
				case 'tooltip':
					if($(this).is(':checked')){
						$question.find('input[type="text"][name="tooltip"]')
							.css('display', 'inline');
					}else{
						$question.find('input[type="text"][name="tooltip"]')
							.css('display', 'none');
					}
					break;
				case 'constraint':
					if($(this).is(':checked')){
						$question.find('a[data-action="addConstraint"]')
							.css('display', 'inline');
						$question.find('.constraintList').css('display', 'block');
						modifyConstraint($question);
					}else{
						$question.find('a[data-action="addConstraint"]')
							.css('display', 'none');
						$question.find('.constraintList').css('display', 'none');
					}
					break;
				case 'isDefault':
					if(['singleSelect', 'singleDropdown'].includes($question.attr('data-type'))){
						$question.find('[name="isDefault"]').not($(this)).prop('checked', false);
					}
					break;
				default:
					break;
			}
		});
		
		// constraints
		$question.on('click', '[data-action="constraint-delete"]', function(){
			if($question.find('tr[name="constraint"]').length > 1){
				$(this).closest('tr[name="constraint"]').remove();
			}else{
				$(this).closest('tr[name="constraint"]').remove();
				alert('已移除所有关联逻辑');
				$question.find('input[type="checkbox"][name="constraint"]').trigger('click');
			}
		});
		
		$question.on('click', '[data-action="constraint-edit"], [data-action="addConstraint"]', function(){
			modifyConstraint($question);
		});
		
		// options
		$question.on('click', 'tr[name="editorOption"] [data-action]', function(){
			var $o = $(this).closest('tr[name="editorOption"]');
			var actionType = $(this).attr('data-action');
			switch(actionType){
				case 'editor-create':
					$o.after(get$option());
					break;
				case 'editor-delete':
					if($question.find('tr[name="editorOption"]').length > 1){
						$o.remove();
					}else if($question.find('tr[name="editorOption"]').length == 1){
						alert('选项不能为空');
					}else{
						console.log('error');
					}
					break;
				case 'editor-moveup':
					$o.prev().before($o);
					break;
				case 'editor-movedown':
					$o.next().after($o);
					break;
				default:
					break;
			}
			
			if(actionType == 'editor-create' || actionType == 'editor-delete'){
				var max = $question.find('tr[name="editorOption"]').length;
				$question.find('[name="range"] [name="min"], [name="range"] [name="max"]').prop('max', max);
				$question.find('[name="range"] [name="min"]').trigger('click');
			}
		});	
		
		return $question;
	};

	// 'singleSelect', 'multiSelect', 'singleDropdown', 'multiDropdown'
	// {lid, type, title, required, tooltip, options:[], constraints: []}
	var get$Choice = function(data){	
		if(data.lid == undefined){
			return get$Choice({
				lid: localIDGenerator(),
				type: data.type,
				required: 0,
				title: '新的文本选择',
				tooltip: '',
				options: [{
					lid: localIDGenerator(),
					name: '选项1',
					isDefault: 0,
					value: 1
				},{
					lid: localIDGenerator(),
					name: '选项2',
					isDefault: 0,
					value: 2
				}]
			});
		}else{
			var $question = $(
				'<div class="question-item" data-type>\n' +
				'	<div class="title">\n' +
				'		<span name="index"></span>. \n' +
				'		<span name="question"></span>\n' +
				'		<span name="tooltip" style="cursor: pointer;" title=""><i class="fa fa-info-circle"></i></span>\n' +
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
				'		<div name="range">\n' +
				'			<label>至少选</label>\n' +
				'			<input type="number" name="min" style="width: 50px;">\n' +
				'			<label>项, </label>\n' +
				'			<label>至多选</label>\n' +
				'			<input type="number" name="max" style="width: 50px;">\n' +
				'			<label>项</label>\n' +
				'		</div>\n' +
				'	</div>\n' +
				'</div>'
			);
			
			// 1. Question Body
			$question.find('.title [name="index"]').text(data.index ? data.index : '');
			$question.attr('data-id', data.lid);
			$question.attr('data-type', data.type);
			
			// load question;
			$question.find('.title [name=question]').text(data.title);
			
			// load tooltip
			var msgs = [];
			if(data.required == 1)
				msgs.push('必填');
			if(data.tooltip != '')
				msgs.push(data.tooltip);
			if(data.min != undefined)
				msgs.push('至少选择' + data.min + '项');
			if(data.max != undefined)
				msgs.push('至多选择' + data.max + '项');
			
			if(msgs.length != 0){
				$question.find('.title [name="tooltip"]')
					.css('display', 'inline')
					.attr('title', msgs);
			}else{
				$question.find('.title [name="tooltip"]')
					.css('display', 'none');
			}
			
			// load options
			$question.find('.answer').empty();	
			switch(data.type){
				case 'singleSelect':
					$.each(data.options, function(index, item){
						var $item = $(
							'<div class="option" data-id="' + item.lid + '">\n' +
							'	<i class="fa ' + (item.isDefault == 0 ? 'fa-circle-o' : 'fa-check-circle-o')  + '"></i> <span name="radioName">' + item.name + '</span>\n' +
							'</div>'
						);
						$question.find('.answer').append($item);
					});
					break;
				case 'multiSelect':	
					$.each(data.options, function(index, item){
						var $item = $(
							'<div class="option" data-id="' + item.lid + '">\n' +
							'	<i class="fa ' + (item.isDefault == 0 ? 'fa-square-o' : 'fa-check-square-o')  + '"></i> <span name="radioName">' + item.name + '</span>\n' +
							'</div>'
						);
						$question.find('.answer').append($item);
					});
					break;
				case 'singleDropdown':
					$select = $('<select style="width: 200px; margin: 5px 0 10px 0;" multiple disabled></select>');
					
					$.each(data.options, function(index, item){
						var $item = $('<option class="option" data-id="' + item.lid + '" value="' + item.value + '" ' + (item.isDefault ? 'selected' : '') + '>' + item.name +'</option>');
						
						$select.append($item);
					});
					
					$question.find('.answer').append($select);
					break;
				case 'multiDropdown':
					$select = $('<select style="width: 200px; margin: 5px 0 10px 0;" multiple disabled></select>');
					
					$.each(data.options, function(index, item){
						var $item = $('<option class="option" data-id="' + item.lid + '" value="' + item.value + '" ' + (item.isDefault ? 'selected' : '') + '>' + item.name +'</option>');
						
						$select.append($item);
					});
					
					$question.find('.answer').append($select);
					break;
				default:
					break;
			};
			
			// 2. Question Editor
			// load question
			$question.find('.editor textarea[name="title"]').text(data.title);
			// load required
			$question.find('.editor [name="required"]').prop('checked', data.required);
			// load tooltip
			if(data.tooltip == ''){
				$question.find('[type="checkbox"][name="tooltip"]').prop('checked', 0);
				$question.find('[type="text"][name="tooltip"]').css('display', 'none');
			}else{
				$question.find('[type="checkbox"][name="tooltip"]').prop('checked', 1);
				$question.find('[type="text"][name="tooltip"]')
					.css('display', 'inline')
					.val(data.tooltip);
			}
			// load options
			$question.find('.optionList tbody').empty();		
			$.each(data.options, function(index, item){
				$question.find('.optionList tbody').append(get$option(item));
			});
			
			// load range
			if(['multiSelect', 'multiDropdown'].includes(data.type)){
				$question.find('[name="range"] [name="min"]')
					.val(data.min)
					.prop('min', 0)
					.prop('max', data.options.length);
				$question.find('[name="range"] [name="max"]')
					.val(data.max)
					.prop('min', 0)
					.prop('max', data.options.length);
			}else{
				$question.find('[name="range"]').css('display', 'none');
			}
			
			// range
			$question.on('change', '[name="range"] [name="min"], [name="range"] [name="max"]', function(){
				var max = $question.find('tr[name="editorOption"]').length;
				var min_v = $question.find('[name="range"] [name="min"]').val();
				var max_v = $question.find('[name="range"] [name="max"]').val();
				if(min_v > max)
					$question.find('[name="range"] [name="min"]').val(max);
				if(max_v > max)
					$question.find('[name="range"] [name="max"]').val(max);
				
				if(min_v>max_v){
					$question.find('[name="range"] [name="max"]').val(min_v);
				}
			});
			
			
			// insufficient Constraint
			if(data.constraints == undefined || data.constraints.length == 0){
				$question.find('[data-action="addConstraint"]')
					.css('display', 'none');
				$question.find('.constraintList')
					.css('display', 'none');
			}else{
				$question.find('[type=checkbox][name="constraint"]').prop('checked', true);	
				$.each(data.constraints, function(i, c){
					$question.find('.constraintList').append(get$constraint(c));
				});
			}
			return $question;
		}
	};
	
	// 'input'
	// {lid, type, title, required, tooltip, subType: [number, date, email, phone], constraints: []}
	var get$Input = function(data){
		if(data.lid == undefined){
			return get$Input({
				lid: localIDGenerator(),
				type: data.type,
				required: 0,
				title: '新的文本填空',
				tooltip: '',
				subType: data.subType ? data.subType : 'default'
			});
		}else{
			var $question = $(
				'<div class="question-item" data-type>\n' +
				'	<div class="title">\n' +
				'		<span name="index"></span>. \n' +
				'		<span name="question"></span>\n' +
				'		<span name="tooltip" style="cursor: pointer;" title=""><i class="fa fa-info-circle"></i></span>\n' +
				'	</div>\n' +
				'	<div class="answer">\n' +
				'  <div class="clearfix"></div>\n' +
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
				'				<label>验证</label>\n' +
				'				<select name="subType">\n' +
				'					<option value="default">无</option>\n' +
				'					<option value="number">整数</option>\n' +
				'					<option value="date">日期</option>\n' +
				'					<option value="email">邮箱</option>\n' +
				'					<option value="phone">电话</option>\n' +
				'				</select>\n' +
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
				'	</div>\n' +
				'</div>'
			);
			
			// 1. Question Body
			$question.find('.title [name="index"]').text(data.index ? data.index : '');
			$question.attr('data-id', data.lid);
			$question.attr('data-type', data.type);
			
			// load question;
			$question.find('.title [name=question]').text(data.title);
			
			// load tooltip
			var msgs = [];
			if(data.required == 1)
				msgs.push('必填');
			if(data.tooltip != '')
				msgs.push(data.tooltip);
			
			if(msgs.length != 0){
				$question.find('.title [name="tooltip"]')
					.css('display', 'inline')
					.attr('title', msgs);
			}else{
				$question.find('.title [name="tooltip"]')
					.css('display', 'none');
			}
			
			// ### load field
			switch(data.subType){
				case 'default': 
					$question.find('.answer').prepend('<textarea class="col-md-4" placeholder="请按照提示输入..." rows=1 style="background-color: white;resize: none; margin: 10px 0 10px" disabled></textarea>');
					break;
				case 'number': 
					$question.find('.answer').prepend('<input type="number" placeholder="请输入整数" style="width: 200px;">');
					break;
				case 'date': 
					$question.find('.answer').prepend(
						'<div class="input-group date" style="margin: 5px 0 5px;">\n' +
						'	<div class="input-group-addon">\n' +
						'		<i class="fa fa-calendar"></i>\n' +
						'	</div>\n' +
						'	<input type="text" class="form-control" placeholder="请输入日期..." id="datepicker" style="width: 200px;">\n' +
						'</div>'
					);
					
					$.fn.datepicker.dates['zh-CN'] = {
						days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
						daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
						daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
						months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
						monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
						today: "今日",
						format: "yyyy年mm月dd日",
						weekStart: 1
					};
			
				 $question.find('#datepicker').datepicker({
						language: 'zh-CN'
					});
					
					break;
				case 'email': 
					$question.find('.answer').prepend(
						'<div class="input-group date" style="margin: 5px 0 5px;">\n' +
						'	<div class="input-group-addon">\n' +
						'		<i class="fa fa-envelope-o"></i>\n' +
						'	</div>\n' +
						'	<input type="text" class="form-control" placeholder="请输入Email..." id="email" style="width: 200px;">\n' +
						'</div>'
					);
					break;
				case 'phone':
					$question.find('.answer').prepend(
						'<div class="input-group date" style="margin: 5px 0 5px;">\n' +
						'	<div class="input-group-addon">\n' +
						'		<i class="fa fa-phone"></i>\n' +
						'	</div>\n' +
						'	<input type="text" class="form-control" placeholder="请输入手机号..." id="email" style="width: 200px;">\n' +
						'</div>'
					);
					break;
				default:
					break;
			}
			
			
			// 2. Question Editor
			// load question
			$question.find('.editor textarea[name="title"]').text(data.title);
			// load required
			$question.find('.editor [name="required"]').prop('checked', data.required);
			// load tooltip
			if(data.tooltip == ''){
				$question.find('[type="checkbox"][name="tooltip"]').prop('checked', 0);
				$question.find('[type="text"][name="tooltip"]').css('display', 'none');
			}else{
				$question.find('[type="checkbox"][name="tooltip"]').prop('checked', 1);
				$question.find('[type="text"][name="tooltip"]')
					.css('display', 'inline')
					.val(data.tooltip);
			}
			
			// subtype
			$question.find('select[name="subType"] option[value="' + data.subType + '"]').prop('selected', true);
			
			
			// insufficient Constraint
			if(data.constraints == undefined || data.constraints.length == 0){
				$question.find('[data-action="addConstraint"]')
					.css('display', 'none');
				$question.find('.constraintList')
					.css('display', 'none');
			}else{
				$question.find('[type=checkbox][name="constraint"]').prop('checked', true);	
				$.each(data.constraints, function(i, c){
					$question.find('.constraintList').append(get$constraint(c));
				});
			}
			return $question;
		}
	};
	
	// 'file'
	// {lid, type, title, required, tooltip, allowedType: ['text', 'video', 'audio', 'image'], constraints: []}
	var get$File = function(data){
		if(data.lid == undefined){
			return get$File({
				lid: localIDGenerator(),
				type: data.type,
				required: 0,
				title: '新的文件上传',
				tooltip: '',
				allowedType: ['text', 'video', 'audio', 'image']
			});
		}else{
			var $question = $(
				'<div class="question-item" data-type>\n' +
				'	<div class="title">\n' +
				'		<span name="index"></span>. \n' +
				'		<span name="question"></span>\n' +
				'		<span name="tooltip" style="cursor: pointer;" title=""><i class="fa fa-info-circle"></i></span>\n' +
				'	</div>\n' +
				'	<div class="answer">\n' +
				' 	<div class="input-group" style="width: 50%; margin-top: 10px;margin-bottom: 10px;">\n' +
				'			<input type="text" class="form-control" style="background-color: white;" disabled>\n' +
				'			<span class="input-group-addon"><i class="fa fa-upload"></i> 上传文件</span>\n' +
				'		</div>\n' +
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
				'				<div data-type="allowedType">\n' +
				'					<label>文件类型：</label> <input type="checkbox" name="allowedType" data-type="all"> <label>全部</label>\n' +
				'						<div data-type="typeList">\n' +
				'							<input type="checkbox" name="allowedType" data-type="text"> <label>文本</label>\n' +
				'							<input type="checkbox" name="allowedType" data-type="video"> <label>视频</label>\n' +
				'							<input type="checkbox" name="allowedType" data-type="audio"> <label>音频</label>\n' +
				'							<input type="checkbox" name="allowedType" data-type="image"> <label>图片</label>\n' +
				'						</div>\n' +
				'				</div>\n' +
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
				'	</div>\n' +
				'</div>'
			);
			
			// 1. Question Body
			$question.find('.title [name="index"]').text(data.index ? data.index : '');
			$question.attr('data-id', data.lid);
			$question.attr('data-type', data.type);
			
			// load question;
			$question.find('.title [name=question]').text(data.title);
			
			// load tooltip
			var msgs = [];
			if(data.required == 1)
				msgs.push('必填');
			if(data.tooltip != '')
				msgs.push(data.tooltip);
			
			if(msgs.length != 0){
				$question.find('.title [name="tooltip"]')
					.css('display', 'inline')
					.attr('title', msgs);
			}else{
				$question.find('.title [name="tooltip"]')
					.css('display', 'none');
			}
			
			// 2. Question Editor
			// load question
			$question.find('.editor textarea[name="title"]').text(data.title);
			// load required
			$question.find('.editor [name="required"]').prop('checked', data.required);
			// load tooltip
			if(data.tooltip == ''){
				$question.find('[type="checkbox"][name="tooltip"]').prop('checked', 0);
				$question.find('[type="text"][name="tooltip"]').css('display', 'none');
			}else{
				$question.find('[type="checkbox"][name="tooltip"]').prop('checked', 1);
				$question.find('[type="text"][name="tooltip"]')
					.css('display', 'inline')
					.val(data.tooltip);
			}
			
			// allowedType
			$.each(data.allowedType, function(index, item){
				$question.find('[data-type="typeList"] [name="allowedType"][data-type="' + item + '"]').prop('checked', true);
			});
			if($question.find('[data-type="typeList"] [name="allowedType"]:not(:checked)').length == 0)
				$question.find('[data-type="allowedType"] [name="allowedType"][data-type="all"]').prop('checked', true);
			
			$question.on('click', '[data-type="allowedType"] [name="allowedType"][data-type="all"]', function(){
				$question.find('[data-type="typeList"] [name="allowedType"]').prop('checked', $(this).is(':checked'));
			});
			
			$question.on('click', '[data-type="typeList"] [name="allowedType"]', function(){
				if($(this).is(':checked')){
					if($question.find('[data-type="typeList"] [name="allowedType"]:not(:checked)').length == 0)
						$question.find('[data-type="allowedType"] [name="allowedType"][data-type="all"]').prop('checked', true);
				}else{
					$question.find('[data-type="allowedType"] [name="allowedType"][data-type="all"]').prop('checked', false);
				}
			});
			
			// insufficient Constraint
			if(data.constraints == undefined || data.constraints.length == 0){
				$question.find('[data-action="addConstraint"]')
					.css('display', 'none');
				$question.find('.constraintList')
					.css('display', 'none');
			}else{
				$question.find('[type=checkbox][name="constraint"]').prop('checked', true);	
				$.each(data.constraints, function(i, c){
					$question.find('.constraintList').append(get$constraint(c));
				});
			}
			return $question;
		}
	};
	
	
	/* var update$question = function($question){
		var data = questionToJson($question);
		$question.replaceWith(jsonToQuestion(data));
	}; */

	var update$Constraint = function($question){
		var sufficeConstraintData = function(index, ins_data, question_data){
			try{
				var data = {
					index: index,
					title: question_data.title,
					lid: ins_data.lid,
					type: ins_data.type,
					options: []
				};
				
				$.each(ins_data.options, function(i, o){
					var item = findItemByLID(question_data.options, o.lid);
					if(!objIsEmpty(item)){
						data.options.push({
							index: item.i,
							lid: item.q.lid,
							name: item.q.name
						});
					}
				});
				return data;
			}catch(e){
				console.log(e);
				return {}
			}
		};
		
		var ins_constraints = getConstraintData($question);
		$question.find('.constraintList tbody').empty();
		$.each(ins_constraints, function(i, c){
			var $q = $question.prevAll('[data-id=' + c.lid + ']');
			var q_data = questionToJson($q);
			var q_index = $question.closest('.tab-pane').find('.question-item').index($q);	
			
			if(!objIsEmpty(q_data)){
				var suf_constraint = sufficeConstraintData(q_index, c, q_data);
				if(!objIsEmpty(suf_constraint))
					$question.find('.constraintList tbody').append(get$constraint(suf_constraint));
			}
		});
	};

	var update$ConstraintWithJson = function($question, json){
		$question.find('.constraintList tbody').empty();

		$.each(json, function(i, c){
			$question.find('.constraintList').append(get$constraint(c));
		});
		
		update$Constraint($question);
	};

	var get$constraint = function(data){
		/* data: {
			index,
			title,
			lid,
			options:[{
				index:
				lid: 
				name:
			}]
			type: 0->不选中触发， 1->选中触发
		}; */
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
		
		var validate = function(){
			if(data != undefined)
				return true;
			else
				return false;
		}

		var load = function(data){
			$constraint.find('[name="question"]')
				.text((data.index!=undefined ? '# ' + (data.index+1) + '. ' : '' ) +  (data.title ? data.title : data.lid))
				.attr('data-id', data.lid);
			
			$.each(data.options, function(index, item){
				//
				$constraint.find('[name="options"]').append(
					'<span data-id="' + item.lid + '" data-toggle="tooltip" data-placement="right" data-html=true title="' + (item.name ? item.name : item.lid) + '" style="cursor: pointer; color: #3c8dbc;" >\n' +
					'	[选项' + (item.index!=undefined ?  item.index+1 : '') + ']\n' +
					'</span>'
				);
			});
			
			$constraint.find('[name="type"]')
				.attr('data-value', data.type)
				.text( data.type ? '选中显示' : '不选中显示' );
		};
		
		if(validate())
			load(data);
		else
			console.log('error')
		
		return $constraint
	};

	var getConstraintData = function($question){
		var result = [];
		if($question.find('[type="checkbox"][name="constraint"]').is(':checked'))
			$question.find('tr[name="constraint"]').each(function(index, item){
				var json = {};
				json.lid = $(item).find('td [name="question"]').attr('data-id');
				json.type = $(item).find('td[name="type"]').attr('data-value');
				json.options = [];
				$(item).find('td[name="options"] span').each(function(index2, item2){
					json.options.push({lid: $(item2).attr('data-id')});
				});
				
				result.push(json);
			});
		
		return result;
	};

	var modifyConstraint = function($question){
		var constr = getConstraintData($question);
		var prev_q = getPrevQuestionData($question, ['singleSelect', 'multiSelect', 'singleDropdown', 'multiDropdown']);
		
		var selected_q = [];
		var unselected_q = [];
		$.each(constr, function(i1, c){
			$.each(prev_q, function(i2, q){
				if(c.lid == q.lid){
					q.q_type = q.type;
					q.type = c.type;
					$.each(q.options, function(i3, o){
						if(c.options.find(function(ele){ return ele.lid == o.lid})){
							o.isSelect = 1;
						}else
							o.isSelect = 0;
					});
					selected_q.push(q);
					prev_q.splice(i2, 1, {});
				}
			});
		});
		
		$.each(prev_q, function(i, q){
			if(!objIsEmpty(q)){
				q.q_type = q.type;
				unselected_q.push(q);
			}
				
		});
		
		/* console.log(selected_q);
		console.log(unselected_q); */
		
		var callback = function(json){
			update$ConstraintWithJson($question, json);
		};
		
		TwinTables(CONSTRAINT_CONTEXT, selected_q, unselected_q, getConstraintTr, constraintTrToJson, callback);
	};

	var getPrevQuestionData = function($question, typeList){
		var $prevs;
		if(typeList == undefined){
			$prevs = $question.prevAll();
		}else{
			var l = [];
			$.each(typeList, function(index, item){
				l.push('.question-item[data-type="' + item + '"]')
			});
			var query = l.toString();
			$prevs = $question.prevAll(query);
		}
		
		var result = [];
		$prevs.each(function(index, item){
			var json = questionToJson($(item));
			json.index = $(item).find('.title [name="index"]').text();
			result.push(json);
		});
		return result;
	};

	var get$option = function(data){
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
		
		var validate = function(data){
			return data != undefined;
		};
		
		var load = function(data){
			$option.attr('data-id', data.lid);
			$option.find('[name="name"]').val(data.name);
			$option.find('[name="isDefault"]').prop('checked', data.isDefault);
			$option.find('[name="value"]').val(data.value);
		};
		
		if(validate(data))
			load(data);
		else
			load({
				lid: localIDGenerator(),
				name: '新的选项',
				value: '0',
				isDefault: 0
			});
		
		return $option;
	};

	var $optionToJson = function($option){
		var json = {};
		
		json.lid = $option.attr('data-id');
		json.name = $option.find('[name="name"]').val();
		json.isDefault = $option.find('[name="isDefault"]').is(':checked') ? 1 : 0;
		json.value = $option.find('[name="value"]').val();
		
		return json;
	};

	var findItemByLID = function(list, lid){
		var result = {};
		$.each(list, function(index, item){
			if(item.lid == lid){
				result.i = index;
				result.q = item;
				return;
			}
		});
		return result;
	};

	var find$ItemByLID = function($container, lid){
		console.log(2)
	};

	var getConstraintTr = function(data){
		var map = {
			'singleSelect': '单选题',
			'multiSelect': '多选题',
			'singleDropdown': '单选下拉',
			'multiDropdown': '多选下拉'
		};

		var $tr = $('<tr data-type="tr"></tr>');
		$tr.append('<td>' + data.index + '. </td>');
		$tr.append('<td data-type="question" data-id="' + data.lid + '"> [' + map[data.q_type] + '] ' + data.title + '</td>');
		$ops = $('<td data-type="options"></td>');
		$.each(data.options, function(index, o){
			$ops.append(
				'<div>\n' +
				'	<input type="checkbox" name="option" data-id ="' + o.lid + '"' + (o.isSelect ? ' checked' : '') + '>\n' +
				'	<label>' + index + '. ' + o.name + '</label>\n' +
				'</div>'
			);
		});
		$tr.append($ops);
		
		$select = $(
			'<td>\n' +
			'	<select data-type="type">\n' +
			'	  <option value="0">选中不显示</option>\n' +
			' 	 <option value="1">选中显示</option>\n' +
			'	</select>\n' +
			'</td>'
		);
		
		$select.find('option').each(function(index, item){
			if($(item).val() == data.type)
				$(item).prop('selected', 1);
		});
		
		$tr.append($select);
		
		return $tr;
	};

	var constraintTrToJson = function($tr){
		var json = {};
		json.lid = $tr.find('[data-type="question"]').attr('data-id');
		json.type = $tr.find('[data-type="type"]').val();
		json.options = [];
		$tr.find('[name="option"]:checked').each(function(index, item){
			json.options.push({lid: $(item).attr('data-id')});
		});
		if(json.options.length == 0){
			alert('至少选择一项');
			return {};
		}
		return json;
	};

	const CONSTRAINT_CONTEXT = {
		title: '关联项编辑',
		thead: [
			'#',
			'题目',
			'选项',
			'关联类别'
		],
		top: '已关联项',
		bot: '可关联项'
	};

};

var tab1 = {
	lid: localIDGenerator(),
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
			required: 1,
			title: 'AAAAA',
			tooltip: '123123123',
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
				},{
					lid: '_ezj0vd2hh',
					type: 0,
					options: [
						{
							lid: '_66vb3qv0q'
						},
						{
							lid: '_aeso5n1kq'
						},
					],
				},
			]
		}
	] 
};

var tab2 = {
	lid: localIDGenerator(),
	name: '标签1',
	questions: [
		{
			lid: '_nzjs9whbt',
			type: 'multiSelect',
			required: 0,
			title: '请输入问题',
			tooltip: '',
			min: 0,
			max: 7,
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
			type: 'multiSelect',
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
			type: 'multiSelect',
			required: 1,
			title: 'AAAAA',
			tooltip: '123123123',
			options: [
				{
					lid: "_is6frrvyt",
					name: 'AAAAA',
					value: 0,
					isDefault: 1
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
				},{
					lid: '_ezj0vd2hh',
					type: 0,
					options: [
						{
							lid: '_66vb3qv0q'
						},
						{
							lid: '_aeso5n1kq'
						},
					],
				},
			]
		}
	] 
};

var tab3 = {
	lid: localIDGenerator(),
	name: '标签1',
	questions: [
		{
			lid: '_nzjs9whbt',
			type: 'singleDropdown',
			required: 0,
			title: '请输入问题',
			tooltip: '',
			min: 0,
			max: 7,
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
			type: 'singleDropdown',
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
			type: 'singleDropdown',
			required: 1,
			title: 'AAAAA',
			tooltip: '123123123',
			options: [
				{
					lid: "_is6frrvyt",
					name: 'AAAAA',
					value: 0,
					isDefault: 1
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
				},{
					lid: '_ezj0vd2hh',
					type: 0,
					options: [
						{
							lid: '_66vb3qv0q'
						},
						{
							lid: '_aeso5n1kq'
						},
					],
				},
			]
		}
	] 
};

var tab4 = {
	lid: localIDGenerator(),
	name: '标签1',
	questions: [
		{
			lid: '_nzjs9whbt',
			type: 'multiDropdown',
			required: 0,
			title: '请输入问题',
			tooltip: '',
			min: 0,
			max: 7,
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
			type: 'multiDropdown',
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
			type: 'multiDropdown',
			required: 1,
			title: 'AAAAA',
			tooltip: '123123123',
			options: [
				{
					lid: "_is6frrvyt",
					name: 'AAAAA',
					value: 0,
					isDefault: 1
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
				},{
					lid: '_ezj0vd2hh',
					type: 0,
					options: [
						{
							lid: '_66vb3qv0q'
						},
						{
							lid: '_aeso5n1kq'
						},
					],
				},
			]
		}
	] 
};

var tab5 = {
	lid: localIDGenerator(),
	name: '标签1',
	questions: [
		{
			lid: '_nzjs9whbt',
			type: 'multiDropdown',
			required: 0,
			title: '请输入问题',
			tooltip: '',
			min: 0,
			max: 7,
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
			type: 'multiDropdown',
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
			type: 'input',
			required: 1,
			title: 'AAAAA',
			tooltip: '123123123',
			subType: 'email',
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
				},{
					lid: '_ezj0vd2hh',
					type: 0,
					options: [
						{
							lid: '_66vb3qv0q'
						},
						{
							lid: '_aeso5n1kq'
						},
					],
				},
			]
		}
	] 
};

var tab6 = {
	lid: localIDGenerator(),
	name: '标签1',
	questions: [
		{
			lid: '_nzjs9whbt',
			type: 'multiDropdown',
			required: 0,
			title: '请输入问题',
			tooltip: '',
			min: 0,
			max: 7,
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
			type: 'multiDropdown',
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
			type: 'file',
			required: 1,
			title: 'AAAAA',
			tooltip: '123123123',
			allowedType: ['text', 'video', 'audio', 'image'],
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
				},{
					lid: '_ezj0vd2hh',
					type: 0,
					options: [
						{
							lid: '_66vb3qv0q'
						},
						{
							lid: '_aeso5n1kq'
						},
					],
				},
			]
		}
	] 
};


FormDesigner({
	lid: localIDGenerator(),
	name: '新的物品',
	tabs: [tab1, tab2, tab3, tab4, tab5, tab6]
}, function(a){console.log(a)});