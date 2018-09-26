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
// 16. @@@@
var delay = function(fun, time){
	setTimeout(fun, time);
};
// !16. @@@@

var answerAapter = function(json_question, answer){
/* {
	'key_tab':{
		'question_key': 
			single/input : value, 
			multiline: array; 
			table(not nested): {'row_key': // value(like above)}; 
			table(nested): {'row_key': {'col_key': // value}}
			file: singleFile: name, multFile: list of name 
			rank: //自行定义,
			text: html
	}
} */
	
	var singleSelect_Adapter = function(json_question, answer){
		var key = json_question.key;
		var value = 'not defined';
		if(answer.options.length != 0){
			json_question.options.forEach(function(item, index){
				if(item.lid == answer.options[0])
					value = item.value;
			});
		}
		var json = {}
		json[key] = value;

		return json;
	};
	
	var multiSelect_Adapter = function(json_question, answer){
		var key = json_question.key;
		var value = [];
		if(answer.options.length != 0){
			for(var i in json_question.options){
				for(var j in answer.options){
					if(json_question.options[i].lid ==  answer.options[j]){
						value.push(json_question.options[i].value);
					}
				}
			}
		}
		var json = {}
		json[key] = value;
		return json;
	};
	
	var input_Adapter = function(json_question, answer){
		var key = json_question.key;
		var json = {}
		json[key] = answer.value;
		return json;
	};
	
	var rank_Adapter = function(json_question, answer){
		var key = answer.key;
		var json = {}
		json[key] = answer.rank.map(function(item, index){
			return json_question.options[parseInt(item)-1].name;
		});
		return json;
	};
	
	var table_singleselect_Adapter = function(json_question, answer){
		var key = answer.key;
		var json = {}
		
		var values = {}
		json_question.row.forEach(function(item, index){
			var row_key = item.name;
			var temp = {}
			var value = 'not defined';
			if(answer.table_option[index].length != 0){
				json_question.options.forEach(function(item2, index2){
					if(item2.lid == answer.table_option[index][0])
						value = item2.value;
				});
			}
			temp[row_key] = value;
			$.extend(values, temp);
		});
		
		json[key] = values;
		
		return json;
	};
	
	var table_multiselect_Adapter = function(json_question, answer){
		var key = answer.key;
		var json = {}
		
		var values = {}
		json_question.row.forEach(function(item, index){
			var row_key = item.name;
			var temp = {}
			var value = [];
			if(answer.table_option[index].length != 0){
				json_question.options.forEach(function(item2, index2){
					if(answer.table_option[index].includes(item2.lid))
						value.push(item2.value);
				});
			}
			temp[row_key] = value;
			$.extend(values, temp);
		});
		
		json[key] = values;
		
		return json;
	};
	
	var table_singledropdown_Adapter = function(json_question, answer){
		var key = answer.key;
		var json = {}
		
		var values = {}
		json_question.row.forEach(function(item, index){
			var row_key = item.name;
			var temp = {}
			var value = 'not defined';
			if(answer.table_option[index].length != 0){
				json_question.options.forEach(function(item2, index2){
					if(item2.lid == answer.table_option[index])
						value = item2.value;
				});
			}
			temp[row_key] = value;
			$.extend(values, temp);
		});
		
		json[key] = values;
		
		return json;
	};
	
	var table_input_Adapter = function(json_question, answer){
		var key = answer.key;
		var json = {}
		
		var values = {}
		json_question.row.forEach(function(item, index){
			var row_key = item.name;
			var temp = {}

			temp[row_key] = answer.table_input[index];
			$.extend(values, temp);
		});
		
		json[key] = values;
		
		return json;
	};
	
	var table_nested_Adapter = function(json_question, answer){
		var key = answer.key;
		
		var table_json = {}
		var table_values = {}
		for(var i=0; i<answer.table.length; i++){
			var row_key = json_question.row[i].name;
			var row_json = {};
			var values = {}
			for(var j=0; j<answer.table[0].length; j++){
				var question_type = json_question.col[j].type;
				var col_answer = {}
				if(question_type == "singleSelect" || question_type == "multiSelect" ||
					question_type == "singleDropdown" || question_type == "multiDropdown"){
					col_answer['options'] = answer.table[i][j]
				}else if(question_type == "input"){
					col_answer['value'] = answer.table[i][j]
				}else{
					
				}
				
				var current_td = adpterMap[question_type](json_question.col[j], col_answer)
				$.extend(values, current_td);
			}
			row_json[row_key] = values;
			$.extend(table_values, row_json);
		}
		table_json[key] = table_values;
		return table_json;
	};
	
	
	var tag_Adapter = function(json_question, answer){
		var key = json_question.key;
		var json = {}
		json[key] = answer.tags;
		return json;
	};
	/* 5. #@#@= */
	var tagButton_Adapter = function(json_question, answer){
		var key = json_question.key;
		var json = {}
		json[key] = answer.tags.map(function(item, index){
			return item.value;
		});
		return json;
	};
	
	var colorPicker_Adapter = function(json_question, answer){
		var key = json_question.key;
		var json = {}
		json[key] = answer.color;
		return json;
	};
	
	var counter_Adapter = function(json_question, answer){
		var key = answer.key;
		var json = {}
		json[key] = {
			start_time: answer.start_time,
			count_time: answer.count_time,
			counter: $.extend({}, answer.counter)
		}
		return json;
	};
	
	/* 5. #@#@= */
	var adpterMap = {
	'singleSelect': singleSelect_Adapter,
	'multiSelect': multiSelect_Adapter,
	'singleDropdown': singleSelect_Adapter,
	'multiDropdown': multiSelect_Adapter,
	'input': input_Adapter,
	// 'file': 
	// 'text': 
	'rating': singleSelect_Adapter,
	'slide': input_Adapter,
	'ranking': rank_Adapter,
	'table_singleselect': table_singleselect_Adapter,
	'table_multiselect': table_multiselect_Adapter,
	'table_input': table_input_Adapter,
	'table_singledropdown': table_singledropdown_Adapter,
	'table_rating': table_singleselect_Adapter,
	'table_nested': table_nested_Adapter,
	'tag':tag_Adapter,
	/* 4. #@#@ */
	'tagButton':tagButton_Adapter,
	'colorPicker': colorPicker_Adapter,
	/* 4. #@#@ */
	/* 4. ^^^^ */
	'counter': counter_Adapter,
	/* !4. ^^^^ */
	};

	var json = {};
	json_question.tabs.forEach(function(item, index){
		var t_key = item.key;
		var json_q = item.questions;
		var json_a = answer.tabs[index].questions;
		var result = {};
		json_a.forEach(function(current_a, i){
			var temp_index = -1;
			var current_q;
			for(var x in json_q){
				if(json_q[x].lid == current_a.lid){
					current_q = json_q[x];
					break;
				}
			}
			$.extend(result, adpterMap[current_q.type](current_q, current_a));
		});
		current_tab_json = {};
		current_tab_json[t_key] = result;
		$.extend(json, current_tab_json);
	});
	var result = {};
	result[json_question.lid] = json;
	return result;
};

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
		
		$tab.find('.question:not(.puretext)').each(function(index, item){
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
						
			
			/* 5. ^^^^ */
			var counter_ongoing = $modal.find('[data-status="start"], [data-status="pause"]').length;
			if(err_required_id.length > 0)
				callAlert('请按照要求填写!');
			else if(counter_ongoing > 0){
				callAlert('请完成计数后再提交!');
			}else{
				var answer = toJson()
				console.log(toJson());
				console.log(answerAapter(data ,answer));
				submitCallback(answer);
			}
			/* ! 5. ^^^^ */
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
		'			<!-- [<span q-type style="color: #3c8dbc;"></span>]-->\n' +
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
			'question-lid': json.lid,
			// 3. @@@@
			'question-key': json.key
			// ! 3. @@@@
		});
		
		$question.find('[question-main] [question-index]').text(json.index);
		// 1.3 title
		$question.find('[question-main] [question-title]').text(json.title);
		$question.find('[question-main] [q-type]').text(QUESTION_DEFAULT_JSON_MAP[json.type].text);
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
	/* 1. ***** */
	var $input = $(
		'<div class="input-group" style="margin: 5px 0 5px;">\n' +
		'	<div class="input-group-addon">\n' +
		'		<i class="fa ' + INPUT_SUBTYPE[sub_type].icon + '"></i>\n' +
		'	</div>\n' +
		'	<input value="' + json.default_input + '" type="' + INPUT_SUBTYPE[sub_type].textType + '" class="form-control"  placeholder="' + INPUT_SUBTYPE[sub_type].placeholder + '" style="max-width: 300px;">\n' +
		'</div>'
	);
	/* 1. ***** */
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
		'	<input type="range" min="' + json.min + '" max="' + json.max + '" value="' +  (parseInt(json.min) + parseInt(json.max))/2 + '" id="slider_bar" data-show-value="true">\n' +
		'	当前值：  <span data-type="current-value">' + (parseInt(json.min) + parseInt(json.max))/2 + '</span>\n' +
		'</div>\n'
	);
	
	$input.on('change', '[type="range"]',  function(e){
		console.log(this.value);
		$input.find('[data-type="current-value"]').text(this.value);
	});
	
	
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

// ####
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
			'	<td class="row-name">' + item.text + '</td>\n' +
			'</tr>'
		);
		
		$table.find('tbody').append($tr);
	});
	
	$container.append($table);
	return $question;
};
// ####
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

/* 1. &&&&& */
var getTable_Input = function(json) {
	var $question = getTable(json);
	var $table = $question.find('[question-answer] table');
		
	$table.find('thead').append('<tr></tr>');
	var $h_tr = $table.find('thead tr').last();
	$h_tr.append('<td></td>');
	
	$.each(json.row, function(index1, item){
		var $b_tr = $table.find('tbody tr:nth-child(' +  (index1 + 1) + ')');
		console.log(item);
		var $input = $(
			'<div class="input-group" style="margin: 5px 0 5px;">\n' +
			'	<div class="input-group-addon">\n' +
			'		<i class="fa ' + INPUT_SUBTYPE[item.sub_type].icon + '"></i>\n' +
			'	</div>\n' +
			'	<input value="' + item.default_input + '" type="' + INPUT_SUBTYPE[item.sub_type].textType + '" class="form-control"  placeholder="' + INPUT_SUBTYPE[item.sub_type].placeholder + '" style="max-width: 300px;">\n' +
			'</div>'
		);
		
		// var $input = $(
		// '<div class="input-group" style="margin: 5px 0 5px;">\n' +
		// '	<div class="input-group-addon">\n' +
		// '		<i class="fa fa-keyboard-o"></i>\n' +
		// '	</div>\n' +
		// '	<input type="text" value="' + item.default_input + '" class="form-control" placeholder="请输入..">\n' +
		// '</div>'
		// )
		$b_tr.append($input);
	});		
	
	return $question;
};
/* 1. &&&&& */
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

/* 1. @@@@ */
var TableTd = function(){
	var get$Td_SingleSelect = function(json) {
		var $container = get$Td_MultiSelect(json);
		
		$container.on('click', '[type="checkbox"]' ,function(e){
			var name = $(this).attr('name');
			$container.find('[name="' + name + '"]').not($(this)).prop('checked', false);
		});
		
		return $container;
	};
	
	var get$Td_MultiSelect = function(json) {
		var $container = $('<td question-type="' + json.type + '"></td>');
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
		
		if(json.type == 'multiSelect'){
			$container.on('click', 'input', function(){
				var number = $container.find('input:not(:disabled):checked').length;
				var err = [];
				if(json.min != undefined && json.min > number)
					err.push('至少选择' + json.min + '项');
				if(json.max != undefined && json.max < number)
					err.push('至多选择' + json.max + '项');
				
				$question.find('[extends-error]').text(err.join(' || '));
			});
		}
		
		return $container;
	};
	
	var get$Td_SingleDropdown = function(json) {
		var $container = $('<td question-type="' + json.type + '"></td>');
	
		$select = $('<select style="width: 200px; margin: 5px 0 10px 0;"></select>');
		$select.append($('<option class="option default" disabled selected>请选择...</option>'));
		$.each(json.options, function(index, item){
			var $item = $('<option class="option" data-id="' + item.lid + '" value="' + item.value + '" ' + (item.isDefault ? 'selected' : '') + '>' + item.name +'</option>');
			
			$select.append($item);
		});
		$container.append($select);
		
		return $container; 
	};
	
	var get$Td_MultiDropdown = function(json) {
		var $container = $('<td question-type="' + json.type + '"></td>');
	
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
		
		return $container;
	};
	
	/* 2. &&&&& */
	var get$Td_Input = function(json, $question) {
		var $container = $('<td question-type="' + json.type + '"></td>');
		var sub_type = json.sub_type;
		
		var $input = $(
			'<div class="input-group" style="margin: 5px 0 5px;">\n' +
			'	<div class="input-group-addon">\n' +
			'		<i class="fa ' + INPUT_SUBTYPE[sub_type].icon + '"></i>\n' +
			'	</div>\n' +
			'	<input value="' + json.default_input + '" type="' + INPUT_SUBTYPE[sub_type].textType + '" class="form-control"  placeholder="' + INPUT_SUBTYPE[sub_type].placeholder + '" style="max-width: 300px;">\n' +
			'</div>'
		);

		$container.append($input);

		$input.on('keyup', 'input', function(){
			var value = this.value
			delay(function(){
				var err = INPUT_SUBTYPE[sub_type].validation(value)
				//var err = inputValidation(value,json.sub_type);
				console.log(err)
				$question.find('[extends-error]').text(err);
			}, 500);
		});
		return $container
	};
	/* 2. &&&&& */
	var map_td = {
		'singleSelect': get$Td_SingleSelect,
		'singleDropdown': get$Td_SingleDropdown,
		'multiSelect': get$Td_MultiSelect,
		'multiDropdown': get$Td_MultiDropdown,
		'input': get$Td_Input
	};
	
	this.get$Td = function(json, $question) {
		// console.log(map[json.type])
		return map_td[json.type](json, $question)
	};

	var getJson_SingleSelect = function($td) {
		var json = [];
		$td.find('input:checked').each(function(index, item){
			json.push($(item).closest('.option').attr('data-id'));
		});
		return json;
	};
	
	var getJson_MultiSelect = function($td) {
		return getJson_SingleSelect($td);
	};
	
	var getJson_SingleDropdown = function($td) {
		var json = []
		$td.find('option:not(:disabled):selected').each(function(index, item){
			json.push($(item).attr('data-id'));
		});
		return json;
	};
	
	var getJson_MultiDropdown = function($td) {
		return getJson_SingleDropdown($td);
	};
	
	var getJson_Input = function($td) {
		return $td.find('input').val();
	};
	
	var map_json = {
		'singleSelect': getJson_SingleSelect,
		'singleDropdown': getJson_SingleDropdown,
		'multiSelect': getJson_MultiSelect,
		'multiDropdown': getJson_MultiDropdown,
		'input': getJson_Input
	};
	
	this.getJson = function($td) {
		var type = $td.attr('question-type')
		return map_json[type]($td)
	};
};

var getTable_Nested = function(json) {
	var t = new TableTd();
	var $question = getQuestion(json);
	var $container = $question.find('[question-answer]').empty();
	
	var $table = $(
		'<table answer-table>\n' +
		'	<thead>\n' +
		'	</thead>\n' +
		'	<tbody>\n' +
		'	</tbody>\n' +
		'</table>\n'
	)
	$question.find('[question-answer]').append($table);
	
	$table.find('thead').append('<tr></tr>');
	var $h_tr = $table.find('thead tr').last();
	$h_tr.append('<td></td>');
	
	$.each(json.row, function(index, item){
		var $tr = $(
			'<tr>\n' +
			'	<td class="row-name">' + item.text + '<!--(<span style="color: red;">' + item.name + '</span>)-->' + '</td>\n' +
			'</tr>'
		);
		$table.find('tbody').append($tr);
	});
	
	
	$.each(json.row, function(index1){
		var $b_tr = $table.find('tbody tr:nth-child(' +  (index1 + 1) + ')');
		$.each(json.col, function(index, item){
			if(index1 == 0)
				$h_tr.append('<th>[<span style="color: red;">' + QUESTION_DEFAULT_JSON_MAP[item.type].text + '</span>]' + item.title  
					+	(item.required == 1 ? '[<span style="color: red;">必填</span>]' : '' ) + '<!--(<span style="color: red;">' 
					+ item.key + '</span>)--></th>');
			var $answer = t.get$Td(item, $question);

			// $b_tr.append(111);
			$b_tr.append($answer);
		});
	});
	
	
	
	/* var rows = json.row;
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
			'	<td class="row-name">' + item.text + '</td>\n' +
			'</tr>'
		);
		
		$table.find('tbody').append($tr);
	});
	
	$container.append($table); */
	return $question;
};
/* ! 1. @@@@ */
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
/* 1. #@#@ */
var TagButton_Display = function(){
	var obj = this;
	this.get$Question = function(json){
		var $question = getQuestion(json);
		var $container = $question.find('[question-answer]').empty();
		
		var $current_index, $tagContainer, $tagOptions;
		var activeIndex = function($new_index){
			$current_index = $new_index;
			$tagContainer.find('.tag-index').removeClass('active');
			$new_index.addClass('active');
		};
		
		var addButton = function(json){
			var $btn = jsonTo$Button(json);
			var $new_index = getTagIndex()
			$current_index.after($btn);
			$btn.after($new_index);
			activeIndex($new_index);
		};
		
		var deleteButton = function($btn){
			activeIndex($btn.prev());
			$btn.next().remove();
			
			$btn.remove();
		};
		
		$container.append(
			'<ul data-type="tag-container"></ul>\n' +
			'<div data-type="tag-options" style="margin-top: 15px;">\n' +
			'	<i class="fa fa-tasks"></i> 可选项: \n' +
			'</div>\n'
		);
		
		$tagContainer = $container.find('[data-type="tag-container"]');
		$tagOptions = $container.find('[data-type="tag-options"]');
		// load tagContainer & tagOptions
		$current_index = getTagIndex();
		$tagContainer.append($current_index);
		activeIndex($current_index);
		json.options.forEach(function(item, index){
			if(item.isDefault == 1){
				addButton(item);
			};
			$tagOptions.append(jsonTo$Button(item, false));
		});

		$tagContainer.on('click', '.tag-index', function(e){
			activeIndex($(this))
		});
		
		$tagContainer.on('click', '[data-action="delete"]', function(e){

			var error_msg = validation($question, json, 'deletion')
			if(error_msg == ''){
				var $btn = $(this).closest('li');
				deleteButton($btn);
			}else{
				callAlert(error_msg)
			}
		});
		
		$tagOptions.on('click', 'li', function(e){
			var error_msg = validation($question, json, 'addition')
			if(error_msg == ''){
				var temp_json = $buttonToJson($(this));
				addButton(temp_json);
			}else{
				callAlert(error_msg)
			}

		});
		
		$tagContainer.sortable({
			stop: function(ev, ui) {
				$tagContainer.find('.tag-index').remove();
				$tagContainer.prepend(getTagIndex());
				$tagContainer.find('li').each(function(index,item){
					var $i = getTagIndex();
					$(item).after($i);
					$current_index = $i;
					activeIndex($current_index)
				});
			}
		});
		
		return $question;
	};
	
	this.getJson = function($question){
		var json = getResult_Question($question)
		
		json.tags = []
		$question.find('[data-type="tag-container"] li').each(function(index, item){
			json.tags.push($buttonToJson($(this)));
		});

		return json;	
	};
	
	var validation = function($question, json, actionType){
		var length = new TagButton_Display().getJson($question).tags.length;
		
		if(actionType == 'deletion' && json.min != undefined && json.min != '' && length <= json.min)
			return '标签数量大于等于' + json.min;
		
		if(actionType == 'addition' && json.max != undefined && json.max != '' && length >= json.max)
			return '标签数量小于等于' + json.max;
		
		return ''
	};
	
	var jsonTo$Button = function(json, deletion=true){
		return $(
			'<li>\n' +
			'	<span data-value="' + json.value + '" data-lid="' + json.lid + '">' + json.name + '</span> \n'+
			'	' + (deletion ? '<i class="fa fa-times" data-action="delete"></i>' : '') + '\n' +
			'</li>\n'
		);
	};
	
	var $buttonToJson = function($btn){
		return {
			lid: $btn.find('[data-value]').attr('data-lid'),
			name: $btn.find('[data-value]').text(),
			value: $btn.find('[data-value]').attr('data-value'),
		};
	};
	
	var getTagIndex = function(){
		return $(
			'<span class="tag-index">\n' +
			'	<span class="cursor blink_me"><i class="fa fa-i-cursor"></i></span>\n' +
			'</span>\n'
		);
	};
	
};

var ColorPicker_Display = function(json){
	this.get$Question = function(json){
		var $question = getQuestion(json);
		var $container = $question.find('[question-answer]').empty();
		
		$container.append(
			'<div class="input-group" style="margin: 5px 0 5px;">\n' +
			'	<div class="input-group-addon">\n' +
			'		<i class="fa fa-paint-brush"></i> \n' +
			'	</div>\n' +
			'	<input class="form-control" value="' + json.default_color + '" type="color" name="color" style="width: 80px;">\n' +
			'</div>\n'
		);
		
		return $question;
	};
	
	this.getJson = function($question){
		var json = getResult_Question($question)
		
		json.color = $question.find('[name="color"]').val();

		return json;	
	};

};

/* 3. ^^^^ */
var Counter_Display = function(){
	this.get$Question = function(data){
		var count = 0
		var timer;
		var start_time = '';
		
		var $question = getQuestion(data);
		var $container = $question.find('[question-answer]').empty();
		
		var $block = $(
			'<div class="counter-container" count-time start-time data-status="initial">\n' +
			'	<div class="head">\n' +
			'		<a class="btn btn-success btn-lg" data-action="start">开始</a>\n' +
			'		<a class="btn btn-default btn-lg" data-action="pause">暂停</a>\n' +
			'		<a class="btn btn-danger btn-lg" data-action="stop">完成</a>\n' +
			'		<a class="btn btn-warning btn-lg" data-action="reset">重置</a>\n' +
			'		<div class="pull-right" class="display: inline-block;">\n' +
			'			<div current-time style="font-size: 24px;"></div>\n' +
			'			<div timer-counter>倒计时: <span></span></div>\n' +
			'		</div>\n' +
			'	</div>\n' +
			'	<div class="row body">\n' +
			'	</div>\n' +
			'</div>\n'
		);
		
		if(data.timeLimit == '')
			$block.find('[timer-counter]').css('display', 'none');
		else
			$block.find('[timer-counter] span').text(secToTime(data.timeLimit - count));
		if(data.onSite == 0){
			// $block.find('[current-time]').css('display', 'none');
			$block.find('[data-action="pause"]').css('display', 'none');
		}else
			$block.find('[current-time]')
				.text('') /* toHHMMSS(new Date()) */
				.css('display', 'block');
		
		data.subjects.forEach(function(item, index){
			var $card = $(
				'<div class="col-sm-2" count-subject data-key="' + item.key + '" data-container="">\n' +
				'	<div class="main-card" data-action="plus">\n' +
				'		<div class="line-1">' + item.name + '</div>\n' +
				'		<div class="line-2"><i class="fa fa-plus-square-o"></i></div>\n' +
				'		<div class="line-3"> <span data-number>0</span> ' + data.unit + '</div>\n' +
				'	</div>\n' +
				'	<div class="sub-card" data-action="minus">\n' +
				'		<i class="fa fa-minus-square-o"></i> \n' +
				'	</div>\n' +
				'</div>\n'
			);
			$block.find('.body').append($card);
		});
		
		var setToInital = function(){
			$block.attr('data-status', 'initial');
			clearInterval(timer);
			$block.find('[data-container]').each(function(index, item){
				$(item).attr('data-container', '');
				$(item).find('[data-number]').text(0);
			});
			start_time = '';
			$block.attr('start-time', start_time);
			count = 0;
			$block.attr('count-time', count);
			updateCurrentTime(start_time, count);
			updateCounter(data.timeLimit, count);
			
			$block.find('[data-action="start"]').removeClass('disabled');
			$block.find('[data-action="pause"], [data-action="stop"], [data-action="reset"]').addClass('disabled');
			$block.find('[data-container]').addClass('disabled');
		};
		
		var updateCurrentTime = function(start_time, count){
			if(start_time  != ''){
				var start_sec = timeToSec(start_time);
				$block.find('[current-time]').text(secToTime(start_sec + count));
			}else{
				$block.find('[current-time]').text('');
			}
		};
		
		var updateCounter = function(limit, count){
			if(limit != '')
				$block.find('[timer-counter] span').text(secToTime(limit - count));
		};
		
		var setToStart = function(){
			var callback = function(){
				$block.attr('start-time', start_time);
				$block.attr('data-status', 'start');
				timer = setInterval(function() {
					count += 1;
					updateCurrentTime(start_time, count);
					updateCounter(data.timeLimit, count);
					$block.attr('count-time', count);
					
					if(data.timeLimit <= count)
						setToStop();
					
				}, 1000);
				
				$block.find('[data-action="start"]').addClass('disabled');
				$block.find('[data-action="pause"], [data-action="stop"], [data-action="reset"]').removeClass('disabled');
				$block.find('[data-container]').toggleClass('disabled');
			};
			if(data.onSite == 1 || start_time != ''){
				start_time = toHHMMSS(new Date())
				callback();
			}else{
				singleLineInput('起始时间', toHHMMSS(new Date()), '请输入起始时间', function(input){
					start_time = input;
					console.log(start_time);
					callback();
				}, validation=function(value){return '';},
				'time');
			}
		};
		
		var setToPause = function(){
			$block.attr('data-status', 'pause');
			clearInterval(timer);
			$block.find('[data-action="start"], [data-action="pause"]').toggleClass('disabled');
			$block.find('[data-container]').addClass('disabled');
		};
		
		var setToStop = function(){
			$block.attr('data-status', 'stop');
			clearInterval(timer);
			
			$block.find('[data-action="start"], [data-action="pause"],[data-action="stop"]').addClass('disabled');
			$block.find('[data-container]').addClass('disabled');
		};
		
		var addOne = function($dataContainer){
			var num = parseInt($dataContainer.find('[data-number]').text());
			num += 1;
			$dataContainer.find('[data-number]').text(num);
			var s = $dataContainer.attr('data-container');
			if(s != '')
				s += ',' + count;
			else
				s = count;
			$dataContainer.attr('data-container', s);
		};
		
		var minusOne = function($dataContainer){
			var num = parseInt($dataContainer.find('[data-number]').text());
			if(num > 0){
				num -= 1;
				$dataContainer.find('[data-number]').text(num);
				var s = $dataContainer.attr('data-container');
				var index = s.lastIndexOf(",");
				s = s.substring(0, index);
				$dataContainer.attr('data-container', s);
			}	
		};
		
		
		setToInital();
		$block.on('click', '[data-action]', function(e){
			var actionType = $(this).attr('data-action');
			// var currentStatus = $block.attr('data-status');
			// console.log(actionType, currentStatus);
			switch(actionType){
					case 'start':
						setToStart();
						break;
					case 'pause':
						setToPause();
						break;
					case 'stop':
						setToStop();
						break;
					case 'reset':
						setToInital();
						break;
					case 'plus':
						var $dataContainer = $(this).closest('[data-container]');
						addOne($dataContainer);
						break;
					case 'minus':
						var $dataContainer = $(this).closest('[data-container]');
						minusOne($dataContainer);
						break;
					default:
						break;
				}
		});
		
		
		$container.append($block);
		
		return $question;
	};
	
	this.getJson = function($question){
		var json = getResult_Question($question)
		
		json.start_time = $question.find('.counter-container').attr('start-time');
		json.count_time = $question.find('.counter-container').attr('count-time');
		json.counter = {};
		
		$question.find('[count-subject]').each(function(index, item){
			var key = $(item).attr('data-key');
			if($(item).attr('data-container') == '')
				json.counter[key] = [];
			else
				json.counter[key] = $(item).attr('data-container').split(',');
		});

		return json;	
	};
};
/* ! 3. ^^^^ */

/* ! 1. #@#@ */
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
	/* 2. @@@@ */
	'table_nested': getTable_Nested,
	/* ! 2. @@@@ */
	'tag': getTag,
	/* 2. #@#@ */
	'tagButton': new TagButton_Display().get$Question,
	'colorPicker': new ColorPicker_Display().get$Question,
	/* 2. #@#@ */
	/* 1. ^^^^ */
	'counter': new Counter_Display().get$Question,
	/* ! 1. ^^^^ */
};

// Result
/* 4. @@@@ */
var getResult_Question = function($question){
	var json = {
		lid: $question.attr('question-lid'),
		required: $question.attr('question-required'),
		key: $question.attr('question-key')
	};
	
	if($question.hasClass('disable')){
		json.disable = 1;
	}else
		json.disable = 0;
	return json
};
/* ! 4. @@@@ */

var getResult_SingleSelect = function($question){
	/* 5. @@@@ */
	var json = getResult_Question($question)
	/* ! 5. @@@@ */
	json.options = []
	
	$question.find('[question-answer] input:checked').each(function(index, item){
		json.options.push($(item).closest('.option').attr('data-id'));
	});

	return json;
};

var getResult_SingleDropdown = function($question){
	/* 6. @@@@ */
	var json = getResult_Question($question)
	/* ! 6. @@@@ */
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
	/* 7. @@@@ */
	var json = getResult_Question($question)
	/* ! 7. @@@@ */
	json.value = $question.find('input').val();
	return json;
};

var getResult_File = function($question){
	/* 8. @@@@ */
	var json = getResult_Question($question)
	/* ! 8. @@@@ */
	
	// ???
	//json.value = $question.find('[question-answer] [type="text"]').val();

	return json;
};

var getResult_Rating = function($question){
	/* 9. @@@@ */
	var json = getResult_Question($question)
	/* ! 9. @@@@ */
	json.options = []
	
	$question.find('[question-answer] input:checked').each(function(index, item){
		json.options.push($(item).closest('.option').attr('data-id'));
	});

	return json;
};

var getResult_Slide = function($question){
	/* 10. @@@@ */
	var json = getResult_Question($question)
	/* ! 10. @@@@ */
	
	json.value = $question.find('[type="range"]').val();

	return json;
};

var getResult_Ranking = function($question){
	/* 11. @@@@ */
	var json = getResult_Question($question)
	/* ! 11. @@@@ */
	
	json.rank =[];
	
	$question.find('.ranking-box').each(function(index, opt){
		var r = $(opt).text();
		json.rank.push(r);
	});
	
	
	return json;
};

var getResult_Table_SingleSelect = function($question) {
	/* 12. @@@@ */
	var json = getResult_Question($question)
	/* ! 12. @@@@ */
	
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
	/* 13. @@@@ */
	var json = getResult_Question($question)
	/* ! 13. @@@@ */
	
	json.table_input =[];
	
	$question.find('[tr-option] input').each(function(index, input){
		json.table_input.push($(input).val());
	});
	
	return json;
};

// 18. @@@@
var getResult_Table_Nested = function($question) {
	var t = new TableTd();
	var json = getResult_Question($question)
	// console.log(json)
	json.table = []
	$question.find('[answer-table] tbody tr').each(function(index1, tr){
		var row = [];
		$(tr).find('td').each(function(index2, td){
			if(index2 > 0)
				row.push(t.getJson($(td)))
		});
		json.table.push(row)
	});
	return json;
}
// 18. @@@@
var getResult_Table_SingleDropdown = function($question) {
	/* 14. @@@@ */
	var json = getResult_Question($question)
	/* ! 14. @@@@ */
	
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
	/* 15. @@@@ */
	var json = getResult_Question($question)
	/* ! 15. @@@@ */
	
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
	// 17. @@@@
	'table_nested': getResult_Table_Nested,
	// !17. @@@@
	'table_singledropdown': getResult_Table_SingleDropdown,
	'table_rating': getResult_Table_Rating,
	'tag': getResult_Tag,
	/* 3. #@#@ */
	'tagButton': new TagButton_Display().getJson,
	'colorPicker': new ColorPicker_Display().getJson,
	/* !3. #@#@ */
	/* 2. ^^^^ */
	'counter': new Counter_Display().getJson,
	/* ! 2. ^^^^ */
};