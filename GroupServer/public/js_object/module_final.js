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
	lid: '_oohbd6kqt',
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

var questionToJson = function($question){
	var questionType = $question.attr('data-type');
	var result = {};
	
	switch(questionType){
		case 'singleSelect':
			result.type = 'singleSelect';
			result.lid = $question.attr('data-id');
			result.title = $question.find('.editor textarea[name="title"]').val();
			result.required = $question.find('.editor [name="required"]').is(':checked') ? 1 : 0;
			result.tooltip = $question.find('[type="checkbox"][name="tooltip"]').is(':checked') ?  $question.find('[type="text"][name="tooltip"]').val() : '';
			
			result.options = [];
			$.each($question.find('.optionList tbody tr'), function(index, item){
				result.options.push($optionToJson($(item)));
			});
			
			result.constraints = getConstraintData($question);
			break;
		case 'multiSelect':
			break;
		default:
			console.log('error');
			break;
	}
	
	return result;
};

var jsonToQuestion = function(data){
	var $question;
	
	switch(data.type){
		case 'singleSelect':
			$question = get$SingleSelect(data);
			break;
		case 'multiSelect':
			$question = get$MultiSelect(data);
			break;
		default:
			console.log('error');
	}
	
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
	 
	
	//$question = get$constraint()
	
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
				var ins_constraints = getConstraintData($question);
				$question.find('.constraintList tbody').empty();
				$.each(ins_constraints, function(i, c){
					// var $q = $question.closest('.tab-pane').find('.question-item[data-id=' + c.lid + ']');
					var $q = $question.prevAll('[data-id=' + c.lid + ']');
					var q_data = questionToJson($q);
					var q_index = $question.closest('.tab-pane').find('.question-item').index($q);	
					
					var suf_constraint = sufficeConstraintData(q_index, c, q_data);
					if(!objIsEmpty(suf_constraint))
						$question.find('.constraintList tbody').append(get$constraint(suf_constraint));
				});
				
				$question.addClass('active');
				break;
			case 'confirmEdit':
				$question.find('[data-action="confirmEdit"]').replaceWith('<div class="btn btn-primary btn-sm" data-action="activateEditor"><i class="fa fa-tag"></i> 编辑</div>');
				update$question($question);
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
		rerankQuestion($container);
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
			// ? alert ?
		}
	});
	
	$question.on('click', '[data-action="constraint-edit"], [data-action="addConstraint"]', function(){
		// ? ?
		console.log(1);
	});
	
	// options
	$question.on('click', 'tr[name="editorOption"] [data-action]', function(){
		var $o = $(this).closest('tr[name="editorOption"]');
		switch($(this).attr('data-action')){
			case 'editor-create':
				$o.after(get$option());
				break;
			case 'editor-delete':
				if($question.find('tr[name="editorOption"]').length > 1){
					$o.remove();
				}else{
					// ?alert?
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
		console.log();
	});	
	
	return $question;
};
// Load constraint
/* var initializeConstraint = function($question, data, list){
	var validateConstraint = function(){
		return true;
	};
	
	if(validateConstraint()){
		if(data.constraints == undefined || data.constraints.length == 0){
			$question.find('[data-action="addConstraint"]')
				.css('display', 'none');
			$question.find('.constraintList')
				.css('display', 'none');
		}else{
			$question.find('[type=checkbox][name="constraint"]').prop('checked', true);	
			$.each(data.constraints, function(i, c){
				var item = findItemByLID(list, c.lid);
				
				var c_data = sufficeConstraintData(item.i, c, item.q);
				
				$question.find('.constraintList').append(get$constraint(c_data));
			});
		}
	}else{
		console.log('error');
	}
}; */

var get$SingleSelect = function(data){
	var isValidate = function(){
		return true;
	};
	var $question;
	
	if(isValidate()){
		$question = $(
			'<div class="question-item" data-type="singleSelect">\n' +
			'	<div class="title">\n' +
			'		<span name="index"></span>\n' +
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
			'	</div>\n' +
			'</div>'
		);
		
		// 1. Question Body
		$question.attr('data-id', data.lid);
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
		
	}else{
		console.log('error');
	}
	
	return $question;
};

var get$MultiSelect = function(data){
	var isValidate = function(){
		return true;
	};
	var $question;
	
	if(isValidate()){
		$question = $(
			'<div class="question-item" data-type="multiSelect">\n' +
			'	<div class="title">\n' +
			'		<span name="index"></span>\n' +
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
		$question.attr('data-id', data.lid);
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
		
		// load options
		$question.find('.answer').empty();		
		$.each(data.options, function(index, item){
			var $item = $(
				'<div class="option" data-id="' + item.lid + '">\n' +
				'	<i class="fa ' + (item.isDefault == 0 ? 'fa-square-o' : 'fa-check-square-o')  + '"></i> <span name="radioName">' + item.name + '</span>\n' +
				'</div>'
			);
			$question.find('.answer').append($item);
		});
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
		
		$question.find('[name="range"] [name="min"]').val(data.min);
		$question.find('[name="range"] [name="max"]').val(data.max);
		
	}else{
		console.log('error');
	}
	
	return $question;
};

var update$question = function($question){
	var questionType = $question.attr('data-type');
	
	switch(questionType){
		case 'singleSelect':
			var data = questionToJson($question);
			
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
					.css('display', 'block')
					.attr({'title': msgs})
			}else{
				$question.find('.title [name="tooltip"]')
					.css('display', 'none');
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
			break;
		default:
			break;
	}
	
};

var rerankQuestion = function($container){
	$container.find('.question-item').each(function(index, item){
		$(item).find('.title [name="index"]').text(index + 1 +'. ' );
	});
};

var sufficeConstraintData = function(index, ins_data, question_data){
	
	var validate = function(){
		return !objIsEmpty(question_data)
	};
	
	var data = {};
	if(validate()){
		data = {
			index: index,
			title: question_data.title,
			lid: ins_data.lid,
			type: ins_data.type,
			options: []
		};
		
		$.each(ins_data.options, function(i, o){
			var item = findItemByLID(question_data.options, o.lid);
			data.options.push({
				index: item.i,
				lid: item.q.lid,
				name: item.q.name
			});
		});
	}
	
	return data;
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


/* jsonToQuestion(
	{
		index: 2,
		questions: tab1.questions
	}
); */

//console.log(tab1.questions);
//console.log(findItemByLID(tab1.questions[1].options, "_66vb3qv0q"));
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
$modal.modal('show');

var $q = jsonToQuestion(tab2.questions[0]);
//initializeConstraint($q, tab1.questions[0], tab1.questions);

$modal.find('#123').append($q);

var $q = jsonToQuestion(tab2.questions[1]);
//initializeConstraint($q, tab1.questions[1], tab1.questions);

$modal.find('#123').append($q);

var $q = jsonToQuestion(tab2.questions[2]);
//initializeConstraint($q, tab1.questions[2], tab1.questions);

$modal.find('#123').append($q);

