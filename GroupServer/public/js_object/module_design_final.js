/*
form: {
	lid,
	name,
	tabs: [tab]
}

tab: {
	lid,
	name,
	questions: [{/question/}]
}

question: {
	lid,
	type,
	title,
	required,
	tooltip,
	constraints: [{constraint}]
}

singleSelect: {
	{question},
	options: [{option}]
}

multiSelect: {
	{question},
	options: [{option}],
	min,
	max,
}

singleDropdown: {
	{singleSelect}
}

multiDropdown: {
	{multiSelect},
	min,
	max,
}

input: {
	{question},
	sub_type
}

file: {
	{question},
	allowedType:[]
}
*/

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
	
	var tabToJson = function(id){
		var json = {
			lid: id,
			name: $modal.find('#tab-bar [href="#' + id + '"] [data-type="name"]').text(),
			questions: []
		};
		
		$modal.find('#' + id + ' .question').each(function(index, item){
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
			$question = jsonTo$question(data);
			$tab.append($question);
			rerank($tab);
		}
		
		return $question;
	};
	
	var questionToJson = function($question){
		return $questionToJson($question);
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
				callConfirm('确认删除', '您确定要删除此分页？', 
					function(){
						deleteTabByID(id);
					}, 
					function(){
						
					});
				
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
					callAlert('分页名称不能为空');
					$(this).val('分页名称');
				}
			}
		});
		
		// 新建问题栏事件
		$modal.on('click', '#tool-bar [data-action]', function(){
			var $container = $modal.find('.tab-pane.active');
			if($modal.find('.tab-pane.active').length != 0){
				var json = {
					lid: localIDGenerator(),
					type: $(this).attr('data-action'),
					allowedType: ['text', 'video', 'audio', 'image'],
					sub_type: 'default',
					required: 0,
					title: '请输入问题',
					tooltip: '',
					min: 0,
					max: 7,
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
				
				if($(this).attr('data-subType')){
					json.sub_type = $(this).attr('data-subType');
				}
				
				
				
				var $q = addQuestion(json, $container);
				$q.find('.btn-list [data-action="activateEditor"]').trigger('click');
			}else{
				callAlert('请选择您要添加到分页');
			}
			rerank($container);
		});
		
		// 排序
		/* $modal.on('click', '.question [question-btn] [question-action]', function(){
			rerank($modal.find('.tab-pane.active'));
		}); */
		
		//submit
		$modal.on('click', '[data-action="submit"]', function(){
			callConfirm('确认提交', '您确定提交此物品？', 
				function(){
					submitCallback(toJson());
					$modal.modal('hide');
				}, 
				function(){
					
				});
		});
		
		$modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		$modal.modal('show');
	};
	
	initialize();
};

var rerank = function($container){
	$container.find('.question').each(function(index, item){
		$(item).find('[question-main] [question-index]').text(index + 1);
	});
};

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
					var data = toJson($(item));
					if(!objIsEmpty(data))
						result.push(data);
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

var callAlert = function(msg){
	alert(msg);
};

var callConfirm = function(title, text, actionConfirm, actionCancel){
	$.confirm({
		title: title,
		content: text,
		buttons: {
			确定: function () {
				actionConfirm();
				/* callAlert('操作完成', 'done'); */
			},
			取消: function () {
				actionCancel();
			}
		}
	});
};

var Constraint = function(){
	var obj = this;
	
	// {/index/, /title/, lid, type: 0->不选中触发， 1->选中触发, options: [{/index/, lid, /name/}]}
	this.get$constraint = function(data){
		var $constraint = $(
			'<tr name="constraint">\n' +
			'	<td><span name="index"></span>. <span name="question" data-id=""></span></td>\n' +
			'	<td name="options"></td>\n' +
			'	<td name="type"></td>\n' +
			'	<td>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="constraint-delete"><i class="fa fa-trash"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" editor-constraint-modify><i class="fa fa-pencil"></i></a>\n' +
			'	</td>\n' +
			'</tr>'
		);
		
		//? validate
		// 1 load data
		// 1.1 load index
		$constraint.find('[name="index"]').text(data.index);
		// 1.2 load title & lid
		$constraint.find('[name="question"]')
			.attr('data-id', data.lid)
			.text(data.title);
		// 1.3  load options
		$.each(data.options, function(index, item){
			var $o = $(
				'<span data-id="' + item.lid + '" data-toggle="tooltip" data-placement="right" data-html=true title="' + (item.name ? item.name : item.lid) + '" style="cursor: pointer; color: #3c8dbc;" >\n' +
				'	[选项' + (item.index!=undefined ?  item.index : '') + ']\n' +
				'</span>'
			);
			$constraint.find('[name="options"]').append($o);
		});
		// 1.4  type
		$constraint.find('[name="type"]')
				.attr('data-value', data.type)
				.text( data.type == 1 ? '选中显示' : '不选中显示' );
		return $constraint
	};
	
	this.getJson = function($constraint){
		var json = {};
		json.lid = $constraint.find('td [name="question"]').attr('data-id');
		json.type = $constraint.find('td[name="type"]').attr('data-value');
		json.options = [];
		$constraint.find('td[name="options"] span').each(function(index2, item2){
			json.options.push({lid: $(item2).attr('data-id')});
		});
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
	var getConstraintTr = function(data){
		var map = {
			'singleSelect': '单选题',
			'multiSelect': '多选题',
			'singleDropdown': '单选下拉',
			'multiDropdown': '多选下拉'
		};

		var $tr = $('<tr data-type="tr"></tr>');
		$tr.append('<td><span data-index>' + data.index + '</span>. </td>');
		$tr.append('<td data-type="question" data-id="' + data.lid + '"> [' + map[data.q_type] + '] <span data-title>' + data.title + '<span></td>');
		$ops = $('<td data-type="options"></td>');
		$.each(data.options, function(index, o){
			$ops.append(
				'<div>\n' +
				'	<input type="checkbox" name="option" data-id ="' + o.lid + '"' + (o.isSelect == 1 ? ' checked' : '') + '>\n' +
				'	<label><span option-index>' + (index + 1) + '</span>. <span data-name>' + o.name + '</span></label>\n' +
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
		json.index = $tr.find('td:eq(0) [data-index]').text();
		json.lid = $tr.find('[data-type="question"]').attr('data-id');
		json.title = $tr.find('[data-type="question"] [data-title]').text();
		json.type = $tr.find('[data-type="type"]').val();
		json.options = [];
		$tr.find('[name="option"]:checked').each(function(index, item){
			json.options.push({
				lid: $(item).attr('data-id'),
				index: $(item).next().find('[option-index]').text(),
				name: $(item).next().find('[data-name]').text(),
			});
		});
		if(json.options.length == 0){
			alert('至少选择一项');
			return {};
		}
		return json;
	};
	this.showConstraintModal = function($question){
		var allData = $question.prevAll('[question-type]')
			.map(function(index, el){
				var data = $questionToJson($(el));
				data.index = index + 1;
				if(data.options)
					data.options = data.options.map(function(el,index){
						el.index = index + 1;
						return el;
					});
				return data
			})
			.filter(function(index, el){
				return QC_FILTER.includes(el.type);
			});
			
		var selectedData_draft = obj.getConstraintData($question);
		//console.log(selectedData_draft)
		
		var selectedData = [];
		var avaliableData = [];
		
		allData.each(function(index1, item1){
			var flag = false;
			selectedData_draft.each(function(index2, item2){
				if(item1.lid == item2.lid){
					flag = true;
					item1.q_type = item1.type;
					item1.type = item2.type;
					$.each(item1.options, function(i1, o1){
						o1.isSelect = 0
						console.log(o1);
						$.each(item2.options, function(i2, o2){
							if(o1.lid == o2.lid){
								o1.isSelect = 1
								return
							}
						});
					});
					return
				}
			});
			
			if(flag){
				console.log(item1)
				selectedData.push(item1);
			}else
				return avaliableData.push(item1);
		});
		
		TwinTables(CONSTRAINT_CONTEXT, selectedData, avaliableData, getConstraintTr, constraintTrToJson, function(result){
			new Question().loadConstraint(result, $question);
		});
	};
	
	this.getConstraintData = function($question){
		return $question.find('[editor-constraint] tr[name="constraint"]')
			.map(function(index, item){
				return obj.getJson($(item));
			});
	};
	
	this.getConstraintData_Sufficent = function($question){
		var length = $question.prevAll('[question-type]').length;
		var allData = $question.prevAll('[question-type]')
			.map(function(index, el){
				var data = $questionToJson($(el));
				data.index = length - index;
				if(data.options)
					data.options = data.options.map(function(el,index){
						el.index = index + 1;
						return el;
					});
				return data
			})
			.filter(function(index, el){
				return QC_FILTER.includes(el.type);
			});
		
		var selectedData_draft = obj.getConstraintData($question);
		//console.log(selectedData_draft)
		
		var selectedData = [];

		allData.each(function(index1, item1){
			var flag = false;
			selectedData_draft.each(function(index2, item2){
				if(item1.lid == item2.lid){
					flag = true;
					item1.q_type = item1.type;
					item1.type = item2.type;
					var newOption = []
					$.each(item1.options, function(i1, o1){
						o1.isSelect = 0
						
						$.each(item2.options, function(i2, o2){
							if(o1.lid == o2.lid){
								o1.isSelect = 1
								newOption.push(o1);
								return
							}
							
						});
					});
					item1.options = newOption;
					return
				}
			});
			
			if(flag)
				selectedData.push(item1);
		});
		
		return selectedData;
	};
};

var Option = function(){
	var obj = this;
	this.get$option = function(data){
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
		
		$option.attr('data-id', data.lid);
		$option.find('[name="name"]').val(data.name);
		$option.find('[name="isDefault"]').prop('checked', data.isDefault);
		$option.find('[name="value"]').val(data.value);
		
		$option.on('click', '[data-action]', function(){
			var actionType = $(this).attr('data-action');
			switch(actionType){
				case 'editor-create':
					$option.after(obj.get$option({
					lid: localIDGenerator(),
					name: '新的选项',
					value: '0',
					isDefault: 0
				}));
					break;
				case 'editor-delete':
					if($option.siblings().length == 0){
						callAlert('选项列表不能为空！');
					}else
						$option.remove();
					break;
				case 'editor-moveup':
					$option.prev().before($option);
					break;
				case 'editor-movedown':
					$option.next().after($option);
					break;
				default:
					console.log('error');
					break;
			}
		});
		
		return $option;
	};
	
	this.getJson = function($option){
		var json = {};
		json.lid = $option.attr('data-id');
		json.name = $option.find('[name="name"]').val();
		json.isDefault = $option.find('[name="isDefault"]').is(':checked') ? 1 : 0;
		json.value = $option.find('[name="value"]').val();
		
		return json;
	};
};

var Question = function(){
	var obj = this;
	var c = new Constraint();
	this.get$question = function(json){
		var $question = $(
			'<div class="question" question-type question-lid>\n' +
			'	<div question-main>\n' +
			'		<div>\n' +
			'			<span question-index></span>.\n' +
			'			<span question-title></span>\n' +
			'			<span question-tooltip><i class="fa fa-info-circle"></i></span>\n' +
			'		</div>\n' +
			'		<div question-answer></div>\n' +
			'	</div>\n' +
			'	<div style="text-align: right;" question-btn>\n' +
			'		<div class="btn btn-primary btn-sm" question-action="activateEditor"><i class="fa fa-tag"></i> 编辑</div>\n' +
			'		<div class="btn btn-default btn-sm" question-action="copy"><i class="fa fa-copy"></i> 复制</div>\n' +
			'		<div class="btn btn-default btn-sm" question-action="delete"><i class="fa fa-trash"></i> 删除</div>\n' +
			'		<div class="btn btn-default btn-sm" question-action="moveUp"><i class="fa fa-angle-up"></i> 上移</div>\n' +
			'		<div class="btn btn-default btn-sm" question-action="moveDown"><i class="fa fa-angle-down"></i> 下移</div>\n' +
			'		<div class="btn btn-default btn-sm" question-action="moveTop"><i class="fa fa-angle-double-up"></i> 最前</div>\n' +
			'		<div class="btn btn-default btn-sm" question-action="moveBot"><i class="fa fa-angle-double-down"></i> 最后</div>\n' +
			'	</div>\n' +
			'	<div question-constraint>\n' +
			'	</div>\n' +
			'	<div question-editor>\n' +
			'		<div class="row" editor-basic>\n' +
			'			<div class="col-md-6">\n' +
			'				<div editor-title>\n' +
			'					<label>请输入问题</label>\n' +
			'					<textarea placeholder="请输入问题标题..." rows=4 style="width: 100%;"></textarea>\n' +
			'				</div>\n' +
			'			</div>\n' +
			'			<div class="col-md-6" style="margin-top: 25px;">\n' +
			'				<div editor-required>\n' +
			'					<input type="checkbox">\n' +
			'					<label>必填</label>\n' +
			'				</div>\n' +
			'				<div editor-tooltip>\n' +
			'					<input type="checkbox">\n' +
			'					<label>提示</label>\n' +
			'					<input type="text" placeholder="请输入提示">\n' +
			'				</div>\n' +
			'			</div>\n' +
			'		</div>\n' +
			'		<div editor-constraint>\n' +
			'			<div>\n' +
			'				<input type="checkbox" editor-constraint-toggle>\n' +
			'				<label>关联逻辑</label>\n' +
			'				<a href="javascript:void(0);" editor-constraint-modify><i class="fa fa-pencil"></i> 修改</a>\n' +
			'			</div>\n' +
			'			<table class="table table-hover">\n' +
			'				<thead>\n' +
			'					<tr>\n' +
			'						<th>关联题目</th>\n' +
			'						<th>关联选项</th>\n' +
			'						<th>关联类型</th>\n' +
			'						<th>操作</th>\n' +
			'					</tr>\n' +
			'				</thead>\n' +
			'				<tbody>\n' +
			'				</tbody>\n' +
			'			</table>\n' +
			'		</div>\n' +
			'	</div>\n' +
			'</div>'
		);
		
		//? validation
		// 1 Main
		// 1.1 type & lid
		$question.attr({
			'question-type': json.type,
			'question-lid': json.lid
		});
		// 1.2 
		obj.loadMain(json, $question)
		new QUESTION_MAP[json.type]().loadAnswer(json, $question);
		
		// 2 Editor
		// 2.1 title
		$question.find('[question-editor] [editor-title] textarea').val(json.title);
		// 2.2 required
		var required = json.required != undefined && json.required == 1;
		$question.find('[question-editor] [editor-required] input').prop('checked', required);
		// 2.3 tooltip
		var $check = $question.find('[editor-tooltip] [type="checkbox"]');
		var $input = $question.find('[editor-tooltip] [type="text"]');
		if(json.tooltip == undefined || json.tooltip == ''){
			$check.prop('checked', false);
			$input.val('')
				.css({
					'visibility': 'hidden'
				});
		}else{
			$check.prop('checked', true);
			$input.val(json.tooltip)
				.css({
					'visibility': 'visible'
				});
		}
		
		// 3 event handler
		// 3.1 initialize list action
		$question.on('click', '[question-btn] [question-action]', function(){
			var actionType = $(this).attr('question-action');
			var $tab = $(this).closest('.tab-pane.active');
			switch(actionType){
				case 'activateEditor':
					$(this).replaceWith('<div class="btn btn-success btn-sm" question-action="confirmEdit"><i class="fa fa-check"></i> 完成</div>');
					$question.addClass('active');
					//? update constraint
					obj.updateConstraint($question);
					$question.siblings().find('[question-btn] [question-action="confirmEdit"]').click();
					break;
				case 'confirmEdit':
					$(this).replaceWith('<div class="btn btn-primary btn-sm" question-action="activateEditor"><i class="fa fa-tag"></i> 编辑</div>');
					$question.removeClass('active');
					var data = $questionToJson($question);
					obj.loadMain(data, $question)
					new QUESTION_MAP[json.type]().loadAnswer($questionToJson($question), $question);
					break;
				case 'copy':
					var data = $questionToJson($question);
					data.lid = localIDGenerator();
					var $copy = jsonTo$question(data);
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
					callAlert('question aciton error: ' + actionType);
			}
			rerank($tab);
		});
		
		// 3.2 tooltip toggle
		$question.on('click', '[editor-tooltip] [type="checkbox"]', function(){
			if($(this).is(':checked')){
				$(this).nextAll('[type="text"]')
					.css({
						'visibility': 'visible'
					})
					.focus();
			}else{
				$(this).nextAll('[type="text"]')
					.val('')
					.css({
						'visibility': 'hidden'
					});
			}
		});
		$question.on('focusout', '[editor-tooltip] [type="text"]', function(e){
			if($(this).val() == ''){
				callAlert('提示信息不能为空');
				$question.find('[editor-tooltip] [type="checkbox"]').prop('checked', false);
				$question.find('[editor-tooltip] [type="text"]').val('')
					.css({
						'visibility': 'hidden'
					});
			}
		});
		
		// 4 constraint
		var showConstraint = function(){
			$question.find('[editor-constraint-toggle]').prop('checked', true);
			$question.find('[editor-constraint] table').css({'display':'table'});
			$question.find('[editor-constraint-modify]').css({'visibility': 'visible'});
		};
		var hideConstraint = function(){
			$question.find('[editor-constraint-toggle]').prop('checked', false);
			$question.find('[editor-constraint] table').css({'display':'none'});
			$question.find('[editor-constraint-modify]').css({'visibility':'hidden'});
		};
		
		if(json.constraints != undefined && json.constraints.length > 0){
			showConstraint();
			obj.loadConstraint(json.constraints, $question);
		}else{
			hideConstraint();
		}
		$question.on('click', '[editor-constraint-toggle]', function(){
			if($(this).is(':checked')){
				showConstraint();
				c.showConstraintModal($question);
			}else{
				callConfirm('确认框', '您确认要清楚所有关联吗？', 
					function(){
						hideConstraint();
						$question.find('[editor-constraint] tbody').empty();
					}, 
					function(){
						showConstraint();
					}
				);
				
			}
		});
		$question.on('click', '[editor-constraint-modify]', function(){
			c.showConstraintModal($question);
		});
		$question.on('click', '[data-action="constraint-delete"]', function(){
			var $tr = $(this).closest('tr');
			if($tr.siblings().length == 0){
				$question.find('[editor-constraint-toggle]').click();
			}else{
				callConfirm('删除关联', '您确定要删除此关联项？', 
					function(){
						$tr.remove();
					}, 
					function(){
						
					});
			}
			
		})
		
		return $question;
	};
	
	this.getJson = function($question){
		var json = {};
		json.lid = $question.attr('question-lid');
		json.type = $question.attr('question-type');
		json.title = $question.find('[editor-title] textarea').val();
		json.required = $question.find('[editor-required] input').is(':checked') ? 1 : 0;
		json.tooltip = $question.find('[editor-tooltip] [type="text"]').val();
		json.constraints = c.getConstraintData($question);
		return json;
	}
	
	this.loadMain = function(json, $question){
		// 1.2 index
		$question.find('[question-main] [question-index]').text(json.index);
		// 1.3 title
		$question.find('[question-main] [question-title]').text(json.title);
		// 1.4 tooltip
		var msg = [];
		if(json.required == 1)
			msg.push('必填');
		if(json.tooltip != '')
			msg.push(json.tooltip);	
		
		if(msg.length != 0)
			$question.find('[question-main] [question-tooltip]')
				.attr({
					'title': msg.join(', ')
				})
				.css({
					'cursor': 'pointer',
					'visibility': 'visible'
				});
		else
			$question.find('[question-main] [question-tooltip]').css({
				'visibility': 'hidden'
			});
		// 1.5 answer
		//$question.find('[question-answer]').append(obj.get$answer(json));
	};
	
	this.loadConstraint = function(list, $question){
		var $container = $question.find('[editor-constraint] tbody').empty();
		$.each(list, function(index, item){
			var c = new Constraint();
			$container.prepend(c.get$constraint(item));
			
			
			
			/* var $span = $('<span>第' + item.index + '题的</span>');
			$div.find('[head]').after($span);
			
			$.each(item.options, function(i, o){
				$span.after('');
			}); */
		});
		var $div = $question.find('[question-constraint]').empty();
		$div.append('<span head>依赖于</span>');
		var c = list.map(function(item){
			var msg = '<span>第' + item.index + '题的</span>';
			msg += item.options.map(function(o){
				return '<span style="color: #3c8dbc;">[选项' + o.index + ']</span>'
			}).join(',');
			return msg;
		}).join(',')
		$div.find('[head]').after(c);
	};
	
	this.updateConstraint = function($question){
		this.loadConstraint(c.getConstraintData_Sufficent($question), $question);
	};
};

var SingleSelect = function(){
	var q = new Question();
	var o = new Option();
	var obj = this;
	
	this.get$question = function(json){
		var $question = q.get$question(json);
		
		// add options
		var $oContainer = $(
			'<div editor-option>\n' +
			'	<table class="table table-hover">\n' +
			'		<!-- <caption>选项设置</caption> -->\n' +
			'		<thead>\n' +
			'			<tr>\n' +
			'				<th>选项文字</th>\n' +
			'				<th>默认</th>\n' +
			'				<th>数值</th>\n' +
			'				<th>操作</th>\n' +
			'			</tr>\n' +
			'		</thead>\n' +
			'		<tbody>\n' +
			'		</tbody>\n' +
			'	</table>\n' +
			'</div>'
		);
		$question.find('[editor-constraint]').before($oContainer);	
		$.each(json.options, function(index, item){
			$oContainer.find('tbody').append(o.get$option(item));
		});
		
		$oContainer.on('click', '[name="isDefault"]', function(){
			var $sibling = $oContainer.find('[name="isDefault"]').not($(this));
			if($sibling.is(':checked')){
				callAlert('默认选项至多一项！');
				$sibling.prop('checked', false);
			}
		});
		
		return $question;
	};
	
	this.getJson = function($question){
		var json = q.getJson($question);
		json.options = [];
		$question.find('[editor-option] [name="editorOption"]').each(function(index, item){
			json.options.push(o.getJson($(item)));
		});
		
		return json;
	};
	
	this.loadAnswer = function(data, $question){
		var options = data.options;
		var $container = $question.find('[question-answer]').empty();
		$.each(options, function(index, item){
			var $option = $(
			'<div class="option" data-id="' + item.lid + '">\n' +
			'	<i class="fa ' + (item.isDefault == 0 ? 'fa-circle-o' : 'fa-check-circle-o')  + '"></i> <span name="radioName">' + item.name + '</span>\n' +
			'</div>'
			)
			$container.append($option);
		});
	};

};

var MultiSelect = function(){
	var s = new SingleSelect();
	var o = new Option();
	var obj = this;
	
	this.get$question = function(json){
		var $question = s.get$question(json);
		
		$question.find('[editor-option]')
			.off('click', '[name="isDefault"]')
			.append(
				'<div>\n' +
				'	<span>至少 <input type="text" name="min" value="' + (json.min == undefined ? '' : json.min) + '" style="width:50px;"> 项</span>\n' +
				'	<span>至多 <input type="text" name="max" value="' + (json.max == undefined ? '' : json.max) + '" style="width:50px;"> 项</span>\n' +
				'</div>'
			);
		
		$question.on('keyup', '[editor-option] input[name="min"], [editor-option] input[name="max"]', function(){
			var value = $(this).val();
			var limit = $question.find('[name="editorOption"]').length;
			var type = $(this).attr('name')
			if(value == ''){
				
			}else if(parseInt(value) == value && parseInt(value)>=0){
				var value = parseInt(value);
				if(value > limit){
					callAlert('输入超过选项数目！');
					$(this).val('');
				}else{
					if(type == 'max'){
						var min = $question.find('[editor-option] input[name="min"]').val();
						if(min != '' && min > value){
							callAlert('最大选项数必须大于等于最小选项数！');
							$(this).val('');
						}
					}else{
						var max = $question.find('[editor-option] input[name="max"]').val();
						if(max != '' && max < value){
							callAlert('最小选项数必须小于等于最大选项数！');
							$(this).val('');
						}
					}
				}
			}else{
				callAlert('请输入大于等于0的整数!');
				$(this).val('');
			}
		});
		
		return $question;
	};
	
	this.getJson = function($question){
		var json = s.getJson($question);
		
		json.min = $question.find('[editor-option] [name="min"]').val();
		json.max = $question.find('[editor-option] [name="max"]').val();
		
		return json;
	};
	
	
	this.loadAnswer = function(data, $question){
		var options = data.options;
		var $container = $question.find('[question-answer]').empty();
		$.each(options, function(index, item){
			var $option = $(
			'<div class="option" data-id="' + item.lid + '">\n' +
			'			<i class="fa ' + (item.isDefault == 0 ? 'fa-square-o' : 'fa-check-square-o')  + '"></i> <span name="radioName">' + item.name + '</span>\n' +
			'</div>'
			)
			$container.append($option);
		});
		
	};
};

var SingleDropdown = function(){
	SingleSelect.call(this);
	this.loadAnswer = function(data, $question){
		var options = data.options;
		var $container = $question.find('[question-answer]').empty();
		
		$select = $('<select style="width: 200px; margin: 5px 0 10px 0;" multiple disabled></select>');
		$.each(options, function(index, item){
			var $item = $('<option class="option" data-id="' + item.lid + '" value="' + item.value + '" ' + (item.isDefault ? 'selected' : '') + '>' + item.name +'</option>');
			
			$select.append($item);
		});
		$container.append($select);
	};
};

var MultiDropdown = function(){
	MultiSelect.call(this);
	this.loadAnswer = function(data, $question){
		var options = data.options;
		var $container = $question.find('[question-answer]').empty();
		
		$select = $('<select style="width: 200px; margin: 5px 0 10px 0;" multiple disabled></select>');
		$.each(options, function(index, item){
			var $item = $('<option class="option" data-id="' + item.lid + '" value="' + item.value + '" ' + (item.isDefault ? 'selected' : '') + '>' + item.name +'</option>');
			
			$select.append($item);
		});
		$container.append($select);
	};
};

var Input = function(){
	var q = new Question();
	var o = new Option();
	var obj = this;
	
	this.get$question = function(json){
		var $question = q.get$question(json);
		
		var $select = $(
			'<div editor-sub_type>\n' +
			'	<label>验证</label>\n' +
			'	<select name="sub_type">\n' +
			'		<option value="default">无</option>\n' +
			'		<option value="number">整数</option>\n' +
			'		<option value="date">日期</option>\n' +
			'		<option value="email">邮箱</option>\n' +
			'		<option value="phone">电话</option>\n' +
			'	</select>\n' +
			'<div>'
		);
		$question.find('[editor-tooltip]').after($select);
		$select.find('[value="' + json.sub_type + '"]').prop('selected', true);
		
		return $question;
	};
	
	this.getJson = function($question){
		var json = q.getJson($question);
		json.sub_type = $question.find('select[name="sub_type"] option:selected').val();
		
		return json;
	};
	
	this.loadAnswer = function(data, $question){
		var sub_type = data.sub_type;
		var $container = $question.find('[question-answer]').empty();
		var textMap = {
			"default": {
				"icon": 'fa-keyboard-o',
				'placeholder': '请输入..'
			},
			"number": {
				"icon": 'fa-sort-numeric-asc',
				'placeholder': '请输入数字..'
			},
			"date": {
				"icon": 'fa-calendar',
				'placeholder': '请输入日期..'
			},
			"email": {
				"icon": 'fa-envelope-o',
				'placeholder': '请输入Email..'
			},
			"phone": {
				"icon": 'fa-phone',
				'placeholder': '请输入电话..'
			},
		};
		var $input = $(
			'<div class="input-group" style="margin: 5px 0 5px;">\n' +
			'	<div class="input-group-addon">\n' +
			'		<i class="fa ' + textMap[sub_type].icon + '"></i>\n' +
			'	</div>\n' +
			'	<input type="text" class="form-control" placeholder="' + textMap[sub_type].placeholder + '">\n' +
			'</div>'
		);
		$container.append($input);
	};

};

var File = function(){
	var q = new Question();
	var o = new Option();
	var obj = this;
	
	this.get$question = function(json){
		var $question = q.get$question(json);
		
		var $allowedType = $(
			'<div data-type="allowedType">\n' +
			'	<label>文件类型：</label> <input type="checkbox" name="allowedType" data-type="all"> <label>全部</label>\n' +
			'		<div data-type="typeList">\n' +
			'			<input type="checkbox" name="allowedType" data-type="text"> <label>文本</label>\n' +
			'			<input type="checkbox" name="allowedType" data-type="video"> <label>视频</label>\n' +
			'			<input type="checkbox" name="allowedType" data-type="audio"> <label>音频</label>\n' +
			'			<input type="checkbox" name="allowedType" data-type="image"> <label>图片</label>\n' +
			'		</div>\n' +
			'</div>'
		);
		$question.find('[editor-tooltip]').after($allowedType);
		$.each(json.allowedType, function(index, item){
			$allowedType.find('[data-type="' + item + '"]').prop('checked', true);
			if($allowedType.find('[data-type="typeList"] input:not(:checked)').length == 0)
				$allowedType.find('[data-type="all"]').prop('checked', true);
		});
		
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
		
		
		
		return $question;
	};
	
	this.getJson = function($question){
		var json = q.getJson($question);
		json.allowedType = [];
		$question.find('[data-type="typeList"] input:checked').each(function(index, item){
			json.allowedType.push($(item).attr('data-type'));
		});
		
		return json;
	};
	
	this.loadAnswer = function(data, $question){
		var $container = $question.find('[question-answer]').empty();
		var $input = $(
			'<div class="input-group" style="margin: 5px 0 5px;">\n' +
			'	<div class="input-group-addon">\n' +
			'		<i class="fa fa-file"></i>\n' +
			'	</div>\n' +
			'	<input type="text" class="form-control">\n' +
			'</div>'
		);
		$container.append($input);
	};

};

const QC_FILTER = ['singleSelect', 'multiSelect', 'singleDropdown', 'multiDropdown'];
const QUESTION_MAP = {
	'singleSelect': SingleSelect,
	'singleDropdown': SingleDropdown,
	'multiSelect': MultiSelect,
	'multiDropdown': MultiDropdown,
	'input': Input,
	'file': File
};
var jsonTo$question = function(json){
	var type = json.type
	return new QUESTION_MAP[type]().get$question(json);
};

var $questionToJson = function($question){
	var type = $question.attr('question-type');
	return new QUESTION_MAP[type]().getJson($question);
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
			sub_type: 'email',
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
	questions: [	] 
};

FormDesigner({
	lid: localIDGenerator(),
	name: '新的物品',
	tabs: [tab1,tab2,tab3,tab4,tab5]
}, function(a){console.log(a)});
