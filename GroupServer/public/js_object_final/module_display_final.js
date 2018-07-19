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

var FormDisplay = function(data, submitCallback){
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
		'					<ul id="tab-bar" class="nav nav-tabs" style="margin: 0 50px 0 50px;">\n' +
		'						<!-- 标签列表 -->\n' +
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
	
	var data = extendData(data);
	
	var validate = function(data){
		return true;
	};
	
	var load = function(data){
		if(validate(data)){
			$modal.find('[data-type="formName"]')
				.attr('data-id', localIDGenerator())
				.attr('template-id', data.lid)
				.text(data.name);
			var t_id;
			$.each(data.tabs, function(index, t){
				var temp_id = addTab(t);
				if(t_id == undefined)
					t_id = temp_id
			});

			activeTab(t_id);
		}else{
			console.log('invalid data');
		}
	};
	
	var toJson = function(){
		var json = {
			lid: $modal.find('[data-type="formName"]').attr('data-id'),
			tid: $modal.find('[data-type="formName"]').attr('template-id'),
			tabs: []
		};
		
		 $modal.find('#tab-content .tab-pane').each(function(index, tab){
			json.tabs.push(tabToJson($(tab)));
		 });
		
		return json;
	};
	
	var addTab = function(data){
		var $tab = $('<li><a href="#' + data.lid + '" data-toggle="tab"><span data-type="name">' + data.name + '</span></a></li>');
		var $pane = $('<div class="tab-pane fade" id="' + data.lid + '"></div>');
		$.each(data.questions, function(index, item){
			addQuestion(item, $pane);
		});
		
		$modal.find('#tab-bar').append($tab);
		$modal.find('#tab-content').append($pane);
		
		return data.lid;
	};
	
	var tabToJson = function($tab){
		var json = {
			lid: $tab.attr('id'),
			questions: []
		};
		
		$tab.find('.question').each(function(index, item){
			json.questions.push($questionResultToJson($(item)));
		});
		
		return json;
	};
	
	var addQuestion = function(data, $tab){
		$question = jsonTo$question_display(data);
		$tab.append($question);
		rerank($tab);
		
		return $question;
	};
	
	var activeTab = function(id){
		$modal.find('[href="#' + id + '"]').tab('show');
		$modal.find('#' + id).addClass('active in');
	};
	
	var initializeConstraint = function(){
		var q_list = [];
		for(var i in  data.tabs){
			q_list = q_list.concat(data.tabs[i].questions);
		}
		c_list = q_list.filter(function(el){
			return el.constraints != undefined && el.constraints.length > 0;
		});
		
		// ? check existence
		// console.log(c_list);
		
		var QC_map = {};
		var CQ_map = {};
		
		for(var i in c_list){
			QC_map[c_list[i].lid] = c_list[i].constraints.map(function(el){
				el.options = el.options.map(function(o){
					return o.lid
				});
				return el;
			});
			
			for(var j in c_list[i].constraints){
				for(var k in c_list[i].constraints[j].options){
					var o_lid = c_list[i].constraints[j].options[k];
					if(o_lid in CQ_map){
						CQ_map[o_lid] = CQ_map[o_lid].concat([c_list[i].lid])
					}else{
						CQ_map[o_lid] = [c_list[i].lid];
					}
				}
			}
		}
		
		//console.log(QC_map);
		//console.log(CQ_map);
		for(var key in QC_map){
			checkConstraint(key, QC_map[key])
		}
		checkConstraint
		
		
		$modal.on('change', '[question-answer] input, [question-answer] select', function(e){
			var o_ids = [];
			if($(this).is('select')){
				$(this).find('option:not(.default)').map(function(index, item){
					o_ids.push($(item).attr('data-id'));
				});
			}else{
				o_ids.push($(this).closest('.option').attr('data-id'));
			}
			
			o_ids.map(function(o_id){
				if(o_id in CQ_map)
					CQ_map[o_id].map(function(q_id){
						checkConstraint(q_id, QC_map[q_id]);
					});
			});
			
			
		});
	};
	
	var checkConstraint = function(q_id, constraints){
		var flag = true;
		constraints.map(function(item){
			var sub_flag = false;
			item.options.map(function(o_id){
				if($modal.find('[data-id="' + o_id  + '"]').is('option'))
					sub_flag = sub_flag || $modal.find('[data-id="' + o_id  + '"]').is(':selected');
				else
					sub_flag = sub_flag || $modal.find('[data-id="' + o_id  + '"] input').is(':checked');
			});
			
			if(item.type == 0)
				sub_flag = !sub_flag;
			
			flag = flag && sub_flag;
		});
		
		toggleQuestion(q_id, flag);
	};
	
	var toggleQuestion = function(q_id, flag){
		var $question = $modal.find('[question-lid="' + q_id + '"]');
		if(flag){
			$question.removeClass('disable');
			$question.find('[question-answer] input, [question-answer] select').attr('disabled', false);
		}else{
			$question.addClass('disable');
			$question.find('[question-answer] input, [question-answer] select').attr('disabled', true);
		}
	};
	
	(function(){
		load(data);
		
		//####
		$modal.on('click', '[data-action="submit"]', function(){
			var json = toJson();
			var err_required_id = [];
			json.tabs.map(function(el){
				el.questions.map(function(q){
					if(q.required == 1 && (q.options != undefined && q.options.length == 0 || q.value != undefined && q.value == '')){
						err_required_id.push(q.lid);
						$modal.find('[question-lid="' + q.lid + '"] [basic-error]').text('*必选');
					}else{
						$modal.find('[question-lid="' + q.lid + '"] [basic-error]').text('');
					}
				});
			});
			
			if(err_required_id.length > 0)
				callAlert('请按照要求填写!');
			else{
				// console.log(toJson());
				submitCallback((toJson()));
			}
		});
		
		initializeConstraint()
		
		$modal.modal('show');
	})();
};

var FormDisplay_mobile = function(data, submitCallback, $container = $('body')){
	var $modal = $(
		'<div class="modal-content mobile-form">\n' +
		'	<div class="modal-header navbar-fixed-top" style="background-color: #007bff; color: #fff;">\n' +
		'		<h4 class="modal-title">\n' +
		'			<span data-type="formName" data-id></span>\n' +
		'		</h4>\n' +
		'	</div>\n' +
		'	<div class="modal-body">\n' +
		'		<div class="form-designer">\n' +
		'			<ul id="tab-bar" class="nav nav-tabs">\n' +
		'				<!-- 标签列表 -->\n' +
		'			</ul>\n' +
		'			<div id="tab-content" class="customized-scrollbar tab-content" style="margin: 0; height: calc(100vh - 225px); overflow-y: auto;">\n' +
		'				<!-- 标签分页 -->\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'	<div class="modal-footer">\n' +
		'		<button type="button" class="btn btn-primary" data-action="submit">\n' +
		'			提交\n' +
		'		</button>\n' +
		'		<button type="button" class="btn btn-default" data-dismiss="modal">关闭\n' +
		'		</button>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	var data = extendData(data);
	
	var validate = function(data){
		return true;
	};
	
	var load = function(data){
		if(validate(data)){
			$modal.find('[data-type="formName"]')
				.attr('data-id', localIDGenerator())
				.attr('template-id', data.lid)
				.text(data.name);
			var t_id;
			$.each(data.tabs, function(index, t){
				var temp_id = addTab(t);
				if(t_id == undefined)
					t_id = temp_id
			});

			activeTab(t_id);
		}else{
			console.log('invalid data');
		}
	};
	
	var toJson = function(){
		var json = {
			lid: $modal.find('[data-type="formName"]').attr('data-id'),
			tid: $modal.find('[data-type="formName"]').attr('template-id'),
			tabs: []
		};
		
		 $modal.find('#tab-content .tab-pane').each(function(index, tab){
			json.tabs.push(tabToJson($(tab)));
		 });
		
		return json;
	};
	
	var addTab = function(data){
		var $tab = $('<li><a href="#' + data.lid + '" data-toggle="tab"><span data-type="name">' + data.name + '</span></a></li>');
		var $pane = $('<div class="tab-pane fade" id="' + data.lid + '"></div>');
		$.each(data.questions, function(index, item){
			addQuestion(item, $pane);
		});
		
		$modal.find('#tab-bar').append($tab);
		$modal.find('#tab-content').append($pane);
		
		return data.lid;
	};
	
	var tabToJson = function($tab){
		var json = {
			lid: $tab.attr('id'),
			questions: []
		};
		
		$tab.find('.question').each(function(index, item){
			json.questions.push($questionResultToJson($(item)));
		});
		
		return json;
	};
	
	var addQuestion = function(data, $tab){
		$question = jsonTo$question_display(data);
		$tab.append($question);
		rerank($tab);
		
		return $question;
	};
	
	var activeTab = function(id){
		$modal.find('[href="#' + id + '"]').tab('show');
		$modal.find('#' + id).addClass('active in');
	};
	
	var initializeConstraint = function(){
		var q_list = [];
		for(var i in  data.tabs){
			q_list = q_list.concat(data.tabs[i].questions);
		}
		c_list = q_list.filter(function(el){
			return el.constraints != undefined && el.constraints.length > 0;
		});
		
		// ? check existence
		// console.log(c_list);
		
		var QC_map = {};
		var CQ_map = {};
		
		for(var i in c_list){
			QC_map[c_list[i].lid] = c_list[i].constraints.map(function(el){
				el.options = el.options.map(function(o){
					return o.lid
				});
				return el;
			});
			
			for(var j in c_list[i].constraints){
				for(var k in c_list[i].constraints[j].options){
					var o_lid = c_list[i].constraints[j].options[k];
					if(o_lid in CQ_map){
						CQ_map[o_lid] = CQ_map[o_lid].concat([c_list[i].lid])
					}else{
						CQ_map[o_lid] = [c_list[i].lid];
					}
				}
			}
		}
		
		//console.log(QC_map);
		//console.log(CQ_map);
		for(var key in QC_map){
			checkConstraint(key, QC_map[key])
		}
		checkConstraint
		
		
		$modal.on('change', '[question-answer] input, [question-answer] select', function(e){
			var o_ids = [];
			if($(this).is('select')){
				$(this).find('option:not(.default)').map(function(index, item){
					o_ids.push($(item).attr('data-id'));
				});
			}else{
				o_ids.push($(this).closest('.option').attr('data-id'));
			}
			
			o_ids.map(function(o_id){
				if(o_id in CQ_map)
					CQ_map[o_id].map(function(q_id){
						checkConstraint(q_id, QC_map[q_id]);
					});
			});
			
			
		});
	};
	
	var checkConstraint = function(q_id, constraints){
		var flag = true;
		constraints.map(function(item){
			var sub_flag = false;
			item.options.map(function(o_id){
				if($modal.find('[data-id="' + o_id  + '"]').is('option'))
					sub_flag = sub_flag || $modal.find('[data-id="' + o_id  + '"]').is(':selected');
				else
					sub_flag = sub_flag || $modal.find('[data-id="' + o_id  + '"] input').is(':checked');
			});
			
			if(item.type == 0)
				sub_flag = !sub_flag;
			
			flag = flag && sub_flag;
		});
		
		toggleQuestion(q_id, flag);
	};
	
	var toggleQuestion = function(q_id, flag){
		var $question = $modal.find('[question-lid="' + q_id + '"]');
		if(flag){
			$question.removeClass('disable');
			$question.find('[question-answer] input, [question-answer] select').attr('disabled', false);
		}else{
			$question.addClass('disable');
			$question.find('[question-answer] input, [question-answer] select').attr('disabled', true);
		}
	};
	
	(function(){
		load(data);
		
		//####
		$modal.on('click', '[data-action="submit"]', function(){
			var json = toJson();
			var err_required_id = [];
			json.tabs.map(function(el){
				el.questions.map(function(q){
					if(q.required == 1 && (q.options != undefined && q.options.length == 0 || q.value != undefined && q.value == '')){
						err_required_id.push(q.lid);
						$modal.find('[question-lid="' + q.lid + '"] [basic-error]').text('*必选');
					}else{
						$modal.find('[question-lid="' + q.lid + '"] [basic-error]').text('');
					}
				});
			});
			
			if(err_required_id.length > 0)
				callAlert('请按照要求填写!');
			else{
				// console.log(toJson());
				submitCallback((toJson()));
			}
		});
		
		initializeConstraint()
		
		
		$container.append($modal);
		// $modal.modal('show');
	})();
	
	return $modal;
};

var fillFormDetails = function(data, $form){
	$form.find('.modal-header').append(
	'<h6 class="modal-details">\n' +
	'	<span data-type="formAuthor">发布者： <a href="javascript:void(0);" style="color: rgba(255,255,255)">' + data.author.name + '</a></span>\n' +
	'	<span class="pull-right">距离结束剩余： <span data-type="formCountDown"></span></span>\n' +
	'</h6>'
	);
	$form.find('.form-designer').css({
		'padding-top' : $('.mobile-form .modal-header').outerHeight() + 'px'
	});
	
	countDown(
		data.deadline, 
		function(counter){
			$form.find('[data-type="formCountDown"]').html(counter);
		},
		function(){
			//##
		},
	);
	
	$form.find('.modal-header .modal-title').append(
		'<span class="pull-right">' + (data.commission == 0 ? '无偿' : ('佣金: $' + data.commission) ) + '</span>'
	);
	
};

var FormDisplay_mobile_beta = function(data, callback){
	var $form = FormDisplay_mobile(data.json, callback);
	fillFormDetails(data.info, $form);
};

var jsonTo$question_display = function(json){
	var type = json.type
	return QUESTION_DISPLAY_MAP[type](json);
};

var $questionResultToJson = function($question){
	var type = $question.attr('question-type');
	return QUESTION_RESULT_MAP[type]($question);
};

var getQuestion = function(json){
	var $question = $(
		'<div class="question" question-type question-lid>\n' +
		'	<div question-main>\n' +
		'		<div>\n' +
		'			<span question-index></span>.\n' +
		'			<span question-title></span>\n' +
		'			<span question-tooltip><i class="fa fa-info-circle"></i></span>\n' +
		'			<span question-error-message style="color: rgba(255,0,0,0.6 );"><span basic-error><span><span extends-error><span></span>\n' +
		'		</div>\n' +
		'		<div question-answer></div>\n' +
		'	</div>\n' +
		'	<div question-constraint>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	var validate = function(json){
		return true;
	}
	
	if(validate(json)){
		$question.attr({
			'question-type': json.type,
			'question-lid': json.lid
		});
		
		$question.find('[question-main] [question-index]').text(json.index);
		// 1.3 title
		$question.find('[question-main] [question-title]').text(json.title);
		// 1.4 tooltip
		var msg = [];
		if(json.required == 1){
			msg.push('必填');
			$question.attr('question-required', 1);
		}else
			$question.attr('question-required', 0);
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
		
		
		if(json.constraints != undefined){
			var $div = $question.find('[question-constraint]').empty();
			$div.append();
			var tooltip_msg = [];
			var c = json.constraints.map(function(item){
				var msg = '<span>第' + item.index + '题的</span>';
				var tooltip_msg_sub = [];
				msg += item.options.map(function(o){
					tooltip_msg_sub.push(' [选项' + o.index + '] ');
					return '<span style="color: #3c8dbc;"> [选项' + o.index + '] </span>'
				}).join(',');
				
				tooltip_msg.push('第' + item.index + '题的' + tooltip_msg_sub.join('或者') + (item.type==1 ? '选中':'不选中'));
				return msg;
			}).join('；')
			if(c != '')
				c = '<span head>依赖于</span>' + c;
			$div.append(c);
			$div.attr('title', tooltip_msg.join(', 并且')).css('cursor', 'pointer');
		}
	}else{
		console.log('data invalid');
	}
	return $question;
};

var getSingleSelect = function(json){
	var $question = getQuestion(json);

	var $container = $question.find('[question-answer]').empty();
	$.each(json.options, function(index, item){
		var $option = $(
		'<div class="option customized-checkbox" data-id="' + item.lid + '">\n' +
		'	<input type="checkbox" name="' + json.lid + '"' + (item.isDefault == 1 ? ' checked' : '' )  + ' value="' + item.value + '">\n' + 
		'	<span class="checkmark"></span>\n' +
		'	<span name="radioName">' + item.name + '</span>\n' +
		'</div>'
		);
		
		$option
			.css({
				'cursor': 'pointer'
			})
			.on('click', function(){
				$option.find('input').click();
			});
		$container.append($option);
	});
		
	$container.on('click', '[type="checkbox"]' ,function(e){
		var name = $(this).attr('name');
		$container.find('[name="' + name + '"]').not($(this)).prop('checked', false);
	});
	
	return $question;
};

var getMultiSelect = function(json){	
	var $question = getQuestion(json);
	
	var $container = $question.find('[question-answer]').empty();
	$.each(json.options, function(index, item){
		var $option = $(
		'<div class="option customized-checkbox" data-id="' + item.lid + '">\n' +
		'	<input type="checkbox" name="' + json.lid + '"' + (item.isDefault == 1 ? ' checked' : '' )  + ' value="' + item.value + '">\n' + 
		'	<span class="checkmark"></span>\n' +
		'	<span name="radioName">' + item.name + '</span>\n' +
		'</div>'
		)
		$container.append($option);
		
		$option
			.css({
				'cursor': 'pointer'
			})
			.on('click', function(){
				$option.find('input').click();
			});
	});
	
	$container.on('change', '[type="checkbox"]', function(){
		var number = $container.find('[type="checkbox"]:checked').length;
		var err = [];
		if(json.min != undefined && json.min > number)
			err.push('至少选择' + json.min + '项');
		if(json.max != undefined && json.max < number)
			err.push('至多选择' + json.max + '项');
		
		$question.find('[extends-error]').text(err.join(' || '));
	});
	
	
	return $question;
};

var getSingleDropdown = function(json){
	var $question = getQuestion(json);
	
	var $container = $question.find('[question-answer]').empty();
	
	$select = $('<select style="width: 200px; margin: 5px 0 10px 0;"></select>');
	$select.append($('<option class="option default" disabled selected>请选择...</option>'));
	$.each(json.options, function(index, item){
		var $item = $('<option class="option" data-id="' + item.lid + '" value="' + item.value + '" ' + (item.isDefault ? 'selected' : '') + '>' + item.name +'</option>');
		
		$select.append($item);
	});
	$container.append($select);
	
	return $question;
};

var getMultiDropdown = function(json){
	var $question = getQuestion(json);
	
	var $container = $question.find('[question-answer]').empty();
	
	$select = $('<select style="width: 200px; margin: 5px 0 10px 0;" multiple></select>');
	$.each(json.options, function(index, item){
		var $item = $('<option class="option" data-id="' + item.lid + '" value="' + item.value + '" ' + (item.isDefault ? 'selected' : '') + '>' + item.name +'</option>');
		
		$select.append($item);
	});
	$container.append($select);
	
	
	$container.on('change', 'select', function(){
		var number = $container.find('option:not(:disabled):selected').length;
		var err = [];
		if(json.min != undefined && json.min > number)
			err.push('至少选择' + json.min + '项');
		if(json.max != undefined && json.max < number)
			err.push('至多选择' + json.max + '项');
		
		$question.find('[extends-error]').text(err.join(' || '));
	});
	
	return $question;
	
}
/* 
var inputValidation = function(value, type){
	var map = {
		email: validateEmail,
		phone: validatePhone,
		date: validateDate,
		number: validateNumber
	};
	return map[type](value);
};
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(re.test(String(email).toLowerCase()))
		return '';
	else
		return '请输入正确的email地址！'
}

function validatePhone(phone) {
	var re = /^1[358][0-9]{9}$/;
	if(re.test(phone))
		return '';
	else
		return '请输入10位有效电话号码！'
}

function validateDate(date) {
	return '';
}

function validateNumber(numer) {
	var re = /^\d*$/;
	if(re.test(String(numer).toLowerCase()))
		return '';
	else
		return '请输入数字！'
}
 */
var getInput = function(json){
	var $question = getQuestion(json);
	
	var $container = $question.find('[question-answer]').empty();
	var sub_type = json.sub_type;
	/* var textMap = {
		"default": {
			"icon": 'fa-keyboard-o',
			'placeholder': '请输入..'
		},
		"number": {
			"icon": 'fa-sort-numeric-asc',
			'placeholder': '请输入数字..'
		},
		"time": {
			"icon": 'fa-clock-o',
			'placeholder': '请输入时间..'
		},
		"date": {
			"icon": 'fa-calendar',
			'placeholder': '请输入日期..'
		},
		"datetime": {
			"icon": 'fa-calendar-check-o',
			'placeholder': '请输入日期和时间..'
		},
		"email": {
			"icon": 'fa-envelope-o',
			'placeholder': '请输入Email..'
		},
		"phone": {
			"icon": 'fa-phone',
			'placeholder': '请输入电话..'
		}
	}; */
	var $input = $(
		'<div class="input-group" style="margin: 5px 0 5px;">\n' +
		'	<div class="input-group-addon">\n' +
		'		<i class="fa ' + INPUT_SUBTYPE[sub_type].icon + '"></i>\n' +
		'	</div>\n' +
		'	<input type="' + INPUT_SUBTYPE[sub_type].textType + '" class="form-control"  placeholder="' + INPUT_SUBTYPE[sub_type].placeholder + '" style="max-width: 300px;">\n' +
		'</div>'
	);

	$container.append($input);

	$input.on('keyup', 'input', function(){
		var value = this.value
		delay(function(){
			var err = INPUT_SUBTYPE[sub_type].validation(value)
			//var err = inputValidation(value,json.sub_type);
			$question.find('[extends-error]').text(err);
		}, 500);
	});
	
	
	return $question;
};

//const IMAGE_EXTENTION = ["ANI", "BMP", "CAL", "EPS", "FAX", "GIF", "IMG", "JBG", "JPE", "JPEG", "JPG", "MAC", "PBM", "PCD", "PCX", "PCT", "PGM", "PNG", "PPM", "PSD", "RAS", "TGA", "TIFF", "WMF"];
//'webm, mkv, flv, vob, ogv, ogg, drc, gif, gifv, mng, avi, mov, qt, wmv, yuv, rm, rmvb, asf, amv, mp4, m4p';

var getFile = function(json){
	var $question = getQuestion(json);
	
	var $container = $question.find('[question-answer]').empty();
	$container.append('<input type="file" name="filesupload"></input>')
	
	
	var opt = {
		language: "zh",
		theme: "explorer",
		uploadUrl: '/uploadfile_beta/123' /* + id */,
		//allowedFileTypes: ['image'],
		// allowedFileExtensions: IMAGE_EXTENTION,
		maxFileCount: 1,
		//showCaption: true,
		//showPreview: true
		//showRemove: true
		//showUpload: true
		//showCancel: true ?
		showClose: false,
		maxFileSize: 0,
		layoutTemplates: {
			actions: '<div class="file-actions">\n' +
				'    <div class="file-footer-buttons">\n' +
				'        {delete}' +
				'    </div>\n' +
				'    {drag}\n' +
				'    <div class="file-upload-indicator" title="{indicatorTitle}">{indicator}</div>\n' +
				'    <div class="clearfix"></div>\n' +
				'</div>',
			actionDelete: '<button type="button" class="kv-file-remove {removeClass}" title="{removeTitle}"{dataUrl}{dataKey}>{removeIcon}</button>\n',
		}
	}
	if(json.allowedType && json.allowedType.length > 0 ){
		opt.allowedFileExtensions = json.allowedType;
	}
	if(json.file_max_num){
		opt.maxFileCount = json.file_max_num;
	}
	
	if(json.file_max_size){
		opt.maxFileSize = json.file_max_size;
	}

	
	$container.find('[name="filesupload"]').fileinput(opt);
	
	
	return $question;
}

var getText = function(json){
	var $question = $(
		'<div class="question puretext" question-type question-lid>\n' +
		'	<div question-main style="margin: 20px;padding: 10px; background-color: rgba(0,0,0,0.07); border:none;">\n' +
		'		<div question-answer></div>\n' +
		'	</div>\n' +
		'</div>'
	);
	

	$question.attr({
		'question-type': json.type,
		'question-lid': json.lid
	});
	
	var $container = $question.find('[question-answer]').empty();
	json.text.split("\n").forEach(function(line){
		$container.append('<div>' + line + '</div>');
	});

	return $question;
}

var getRating = function(json){
	var $question = getQuestion(json);
	
	var $container = $question.find('[question-answer]').empty();
	$.each(json.options, function(index, item){
		var $option = $(
		'<span class="option customized-checkbox" data-id="' + item.lid + '" style="display: inline-block;">\n' +
		'	<input type="checkbox" name="' + json.lid + '"' + (item.isDefault == 1 ? ' checked' : '' )  + ' value="' + item.value + '">\n' + 
		'	<span class="checkmark" style="border-radius: 50%;"></span>\n' +
		'	<span name="radioName" style="display: none;">' + item.name + '</span>\n' +
		'	<span name="radioValue">' + item.value + '</span>\n' +
		'</span>'
		);
		
		$option
			.css({
				'cursor': 'pointer'
			})
			.on('click', function(){
				$option.find('input').click();
			});
		$container.append($option);
		
		
		if(index == 0){
			$container.append('<span class="head">' + item.name + '</span>');
		}
		$container.append($option);
		
		if(index == json.options.length-1){
			$container.append('<span class="tail">' + item.name + '</span>');
		}
		
	});
		
	$container.on('click', '[type="checkbox"]' ,function(e){
		var name = $(this).attr('name');
		$container.find('[name="' + name + '"]').not($(this)).prop('checked', false);
	});
	
	return $question;
};

var getSlide  = function(json){
	var $question = getQuestion(json);
	
	var $container = $question.find('[question-answer]').empty();
	var $input = $(
		'<div class="slide-block">\n' +
		'	<div>\n' +
		'		<span class="head">' + json.min_text + '(' + json.min + ')</span>\n' +
		'		<span class="pull-right tail">' + json.max_text + '(' + json.max + ')</span>\n' +
		'	</div>\n' +
		'	<input type="range" min="' + json.min + '" max="' + json.max + '" value="' +  (parseInt(json.min) + parseInt(json.max))/2 + '" id="slider_bar">\n' +
		'</div>\n'
	);
	$container.append($input);
	return $question;
};

var getRanking = function(json) {
	var $question = getQuestion(json);
	
	var $container = $question.find('[question-answer]').empty();
	
	$.each(json.options, function(index, item){
		var $option = $(
		'<div class="option ranking-option clearfix" data-id="' + item.lid + '">\n' +
		'	<div class="ranking-box"></div>\n' +
		'	<span name="radioName">' + item.name + '</span>\n' +
		'</div>'
		);
		$container.append($option);
	});
	
	$question.on('click', '.ranking-option', function(e){
		var current_rank = parseInt($(this).find('.ranking-box').text());
		if(current_rank){
			$(this).removeClass('active');
			$(this).find('.ranking-box').empty();
			
			$(this).siblings().each(function(index, opt){
				var opt_rank = parseInt($(opt).find('.ranking-box').text());
				if(current_rank < opt_rank){
					$(opt).find('.ranking-box').text(opt_rank-1);
				}
			});
			
		}else{
			$(this).addClass('active');
			var rank = 0;
			$(this).siblings().each(function(index, opt){
				var opt_rank = parseInt($(opt).find('.ranking-box').text());
				if(opt_rank)
					rank = Math.max(rank, opt_rank);
			});
			$(this).find('.ranking-box').text(rank+1);
		}
	});
	
	
	return $question;
};

var getTable = function(json) {
	var $question = getQuestion(json);
	var $container = $question.find('[question-answer]').empty();
	
	var rows = json.row;
	var $table = $(
		'<table answer-table>\n' +
		'	<thead>\n' +
		'	</thead>\n' +
		'	<tbody>\n' +
		'	</tbody>\n' +
		'</table>\n'
	);
	$.each(rows, function(index, item){
		var $tr = $(
			'<tr tr-option>\n' +
			'	<td class="row-name">' + item + '</td>\n' +
			'</tr>'
		);
		
		$table.find('tbody').append($tr);
	});
	
	$container.append($table);
	return $question;
};

var getTable_SingleSelect = function(json) {
	var $question = getTable(json);
	
	var options = json.options;
	var $table = $question.find('[question-answer] table');
	
	$table.find('thead').append('<tr></tr>');
	var $h_tr = $table.find('thead tr').last().css({'height': '30px'});
	$h_tr.append('<td></td>');
	
	$.each(json.row, function(index1){
		var $b_tr = $table.find('tbody tr:nth-child(' +  (index1 + 1) + ')');
		$.each(options, function(index, item){
			if(index1 == 0)
				$h_tr.append('<th style="text-align: left;">' + item.name + '</th>');
			
			var $option = $(
			'<td class="option customized-checkbox" data-id="' + item.lid + '" style="display: table-cell;">\n' +
			'	<input type="checkbox" name="' + json.lid + '"' + (item.isDefault == 1 ? ' checked' : '' )  + ' value="' + item.value + '">\n' + 
			'	<span class="checkmark" style="border-radius: 50%;"></span>\n' +
			'</td>\n'
			)
			
			$option.on('click', function(e){
				var checked = $(this).find('input').prop('checked');
				$(this).find('input').prop('checked', !checked);
				
				if(!checked){
					$(this).siblings().find('input').prop('checked', false);
				}
				
			});
			
			$b_tr.append($option).css({'height': '25px'});
		});
	});
	
	
	return $question;
};

var getTable_MultiSelect = function(json) {
	var $question = getTable_SingleSelect(json);
	
	$question.find('.checkmark').css({'border-radius': '0'});
	$question.find('td.option')
		.off('click')
		.on('click', function(e){
			var checked = $(this).find('input').prop('checked');
			$(this).find('input').prop('checked', !checked);
		});
	
	
	return $question;
};

var getTable_Input = function(json) {
	var $question = getTable(json);
	var $table = $question.find('[question-answer] table');
		
	$table.find('thead').append('<tr></tr>');
	var $h_tr = $table.find('thead tr').last();
	$h_tr.append('<td></td>');
	
	$.each(json.row, function(index1){
		var $b_tr = $table.find('tbody tr:nth-child(' +  (index1 + 1) + ')');
		var $input = $(
		'<div class="input-group" style="margin: 5px 0 5px;">\n' +
		'	<div class="input-group-addon">\n' +
		'		<i class="fa fa-keyboard-o"></i>\n' +
		'	</div>\n' +
		'	<input type="text" class="form-control" placeholder="请输入..">\n' +
		'</div>'
		)
		$b_tr.append($input);
	});		
	
	return $question;
};

var getTable_SingleDropdown = function(json) {
	var $question = getTable(json);
	
	var options = json.options;
	var $table = $question.find('[question-answer] table');
	
	$.each(json.row, function(index1){
		var $b_tr = $table.find('tbody tr:nth-child(' +  (index1 + 1) + ')');
		var $select = $('<td style="text-align:left;"><select style="width: 200px; margin: 5px 0 10px 0;"></select></td>');
		$.each(options, function(index, item){
			var $item = $('<option class="option" data-id="' + item.lid + '" value="' + item.value + '" ' + (item.isDefault ? 'selected' : '') + '>' + item.name +'</option>');
			
			$select.find('select').append($item);
		});
		$b_tr.append($select);
	});
	return $question;
};

var getTable_Rating = function(json) {
	var $question = getTable(json);
	
	var options = json.options;
	var $table = $question.find('[question-answer] table');
	
	$table.find('thead').append('<tr></tr>');
	var $h_tr = $table.find('thead tr').last().css({'height': '30px'});
	$h_tr.append('<td></td>');
	
	$table.find('tbody').prepend('<tr class="value-row"></tr>');
	var $b_tr_value = $table.find('tbody tr:nth-child(1)');
	$b_tr_value.append('<td>分值</td>');
	
	$.each(json.row, function(index1){
		var $b_tr = $table.find('tbody tr:nth-child(' +  (index1 + 2) + ')');
		$.each(options, function(index, item){
			if(index1 == 0){
				$h_tr.append('<th style="text-align: left;">' + item.name + '</th>');
				$b_tr_value.append('<td style="text-align: left; padding-left: 15px;">' + item.value + '</td>');
			}
				
			
			var $option = $(
			'<td class="option customized-checkbox" data-id="' + item.lid + '" style="display: table-cell;">\n' +
			'	<input type="checkbox" name="' + json.lid + '"' + (item.isDefault == 1 ? ' checked' : '' )  + ' value="' + item.value + '">\n' + 
			'	<span class="checkmark" style="border-radius: 50%;"></span>\n' +
			'</td>\n'
			)
			
			$option.on('click', function(e){
				var checked = $(this).find('input').prop('checked');
				$(this).find('input').prop('checked', !checked);
				
				if(!checked){
					$(this).siblings().find('input').prop('checked', false);
				}
				
			});
			
			$b_tr.append($option).css({'height': '25px'});
		});
	});
	
	
	return $question;
};

var getTag = function(json){
	var $question = getQuestion(json);
	
	var $container = $question.find('[question-answer]').empty();
	$container.append('<select name="tags" class="form-control" style="width: 500px;"></select>')
	$container.find('[name="tags"]').select2({
		tags: true,
		multiple: true,
		language: 'zh-CN',
		theme: "bootstrap",
		maximumSelectionLength: json.tag_max,
		maximumInputLength: json.tag_text_max
	});
	return $question;
	
	
	/*  */
};

const QUESTION_DISPLAY_MAP = {
	'singleSelect': getSingleSelect,
	'singleDropdown': getSingleDropdown,
	'multiSelect': getMultiSelect,
	'multiDropdown': getMultiDropdown,
	'input': getInput,
	'file': getFile,
	'text': getText,
	'rating': getRating,
	'slide': getSlide,
	'ranking': getRanking,
	'table_singleselect': getTable_SingleSelect,
	'table_multiselect': getTable_MultiSelect,
	'table_input': getTable_Input,
	'table_singledropdown': getTable_SingleDropdown,
	'table_rating': getTable_Rating,
	'tag': getTag
};

// Result
1var getResult_SingleSelect = function($question){
	var json = {
		lid: $question.attr('question-lid'),
		required: $question.attr('question-required')
	};
	
	if($question.hasClass('disable')){
		json.disable = 1;
	}else
		json.disable = 0;
	json.options = []
	
	$question.find('[question-answer] input:checked').each(function(index, item){
		json.options.push($(item).closest('.option').attr('data-id'));
	});

	return json;
};

var getResult_SingleDropdown = function($question){
	var json = {
		lid: $question.attr('question-lid'),
		required: $question.attr('question-required')
	};
	
	if($question.hasClass('disable')){
		json.disable = 1;
	}else
		json.disable = 0;
	json.options = []
	
	$question.find('[question-answer] option:not(:disabled):selected').each(function(index, item){
		json.options.push($(item).attr('data-id'));
	});

	return json;
};

var getResult_MultiSelect = function($question){
	return getResult_SingleSelect($question)
};

var getResult_MultiDropdown = function($question){
	return getResult_SingleDropdown($question);
};

var getResult_Input = function($question){
	var json = {
		lid: $question.attr('question-lid'),
		required: $question.attr('question-required')
	};
	
	if($question.hasClass('disable')){
		json.disable = 1;
	}else
		json.disable = 0;

	json.value = $question.find('input').val();
	return json;
};

var getResult_File = function($question){
	var json = {
		lid: $question.attr('question-lid'),
		required: $question.attr('question-required')
	};
	
	if($question.hasClass('disable')){
		json.disable = 1;
	}else
		json.disable = 0;

	// ???
	//json.value = $question.find('[question-answer] [type="text"]').val();

	return json;
};

var getResult_Rating = function($question){
	var json = {
		lid: $question.attr('question-lid'),
		required: $question.attr('question-required')
	};
	
	if($question.hasClass('disable')){
		json.disable = 1;
	}else
		json.disable = 0;
	json.options = []
	
	$question.find('[question-answer] input:checked').each(function(index, item){
		json.options.push($(item).closest('.option').attr('data-id'));
	});

	return json;
};

var getResult_Slide = function($question){
	var json = {
		lid: $question.attr('question-lid'),
		required: $question.attr('question-required')
	};
	
	if($question.hasClass('disable')){
		json.disable = 1;
	}else
		json.disable = 0;
	
	json.value = $question.find('[type="range"]').val();

	return json;
};

var getResult_Ranking = function($question){
	var json = {
		lid: $question.attr('question-lid'),
		required: $question.attr('question-required')
	};
	
	if($question.hasClass('disable')){
		json.disable = 1;
	}else
		json.disable = 0;
	
	json.rank =[];
	
	$question.find('.ranking-box').each(function(index, opt){
		var r = $(opt).text();
		json.rank.push(r);
	});
	
	
	return json;
};

var getResult_Table_SingleSelect = function($question) {
	var json = {
		lid: $question.attr('question-lid'),
		required: $question.attr('question-required')
	};
	
	if($question.hasClass('disable')){
		json.disable = 1;
	}else
		json.disable = 0;
	
	json.table_option =[];
	
	
	
	$question.find('[tr-option]').each(function(index, tr){
		var opt_ids = [];
		$(tr).find('input:checked').each(function(index2, opt){
			opt_ids.push($(opt).closest('td').attr('data-id'));
		});
		json.table_option.push(opt_ids);
	});
	
	
	return json;
};

var getResult_Table_MultiSelect = function($question) {
	var json = getResult_Table_SingleSelect($question);
	return json;
};

var getResult_Table_Input = function($question) {
	var json = {
		lid: $question.attr('question-lid'),
		required: $question.attr('question-required')
	};
	
	if($question.hasClass('disable')){
		json.disable = 1;
	}else
		json.disable = 0;
	
	json.table_input =[];
	
	$question.find('[tr-option] input').each(function(index, input){
		json.table_input.push($(input).val());
	});
	
	return json;
};

var getResult_Table_SingleDropdown = function($question) {
	var json = {
		lid: $question.attr('question-lid'),
		required: $question.attr('question-required')
	};
	
	if($question.hasClass('disable')){
		json.disable = 1;
	}else
		json.disable = 0;
	
	json.table_option =[];
	
	$question.find('[tr-option] select option:selected').each(function(index, input){
		json.table_option.push($(this).attr('data-id'));
	});
	
	return json;
};

var getResult_Table_Rating = function($question) {
	return getResult_Table_SingleSelect($question)
};

var getResult_Tag = function($question){
	var json = {
		lid: $question.attr('question-lid'),
		required: $question.attr('question-required')
	};
	
	if($question.hasClass('disable')){
		json.disable = 1;
	}else
		json.disable = 0;
	
	json.tags = $question.find('[name="tags"]').val()

	return json;
};

const QUESTION_RESULT_MAP = {
	'singleSelect': getResult_SingleSelect,
	'singleDropdown': getResult_SingleDropdown,
	'multiSelect': getResult_MultiSelect,
	'multiDropdown': getResult_MultiDropdown,
	'input': getResult_Input,
	'file': getResult_File,
	'rating': getResult_Rating,
	'slide': getResult_Slide,
	'ranking': getResult_Ranking,
	'table_singleselect': getResult_Table_SingleSelect,
	'table_multiselect': getResult_Table_MultiSelect,
	'table_input': getResult_Table_Input,
	'table_singledropdown': getResult_Table_SingleDropdown,
	'table_rating': getResult_Table_Rating,
	'tag': getResult_Tag
};