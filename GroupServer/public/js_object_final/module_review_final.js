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

var FormReview = function(data, data_answer, submitCallback){
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
		'				<button type="button" class="btn btn-default" data-dismiss="modal">关闭\n' +
		'				</button>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	// var data = extendData(data);
	
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
				var temp_id = addTab(t, data_answer.tabs[index]);
				if(t_id == undefined)
					t_id = temp_id
			});

			activeTab(t_id);
		}else{
			console.log('invalid data');
		}
	};
		
	var addTab = function(data, data_answer){
		var $tab = $('<li><a href="#' + data.lid + '" data-toggle="tab"><span data-type="name">' + data.name + '</span></a></li>');
		var $pane = $('<div class="tab-pane fade" id="' + data.lid + '"></div>');
		$.each(data.questions, function(index, item){
			addQuestion(item, data_answer.questions[index], $pane);
		});
		
		$modal.find('#tab-bar').append($tab);
		$modal.find('#tab-content').append($pane);
		
		return data.lid;
	};
		
	var addQuestion = function(data, data_answer, $tab){
		$question = jsonTo$question_review(data, data_answer);
		$tab.append($question);
		rerank($tab);
		
		return $question;
	};
	
	var activeTab = function(id){
		$modal.find('[href="#' + id + '"]').tab('show');
		$modal.find('#' + id).addClass('active in');
	};
	
	(function(){
		load(data);
		/* 3. ^^^^ */
		$modal.on('hidden.bs.modal', function(e){
			$(this).remove();
		});
		/* ! 3. ^^^^ */
		$modal.modal('show');
	})();
};

var jsonTo$question_review = function(json, data_answer){
	var type = json.type
	return QUESTION_REVIEW_MAP[type](json, data_answer);
};

var $questionResultToJson = function($question){
	var type = $question.attr('question-type');
	return QUESTION_RESULT_MAP[type]($question);
};

var getQuestion_review = function(json){
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
			
	}else{
		console.log('data invalid');
	}
	return $question;
};

var getSingleSelect_review = function(json, answer){
	var $question = getQuestion_review(json);
	
	var $container = $question.find('[question-answer]').empty();
	$.each(json.options, function(index, item){
		var $option = $(
		'<div class="option customized-checkbox" data-id="' + item.lid + '">\n' +
		'	<input type="checkbox" name="' + json.lid + '"' + (answer.options.includes(item.lid) ? ' checked' : '' )  + ' value="' + item.value + '" disabled>\n' + 
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

var getMultiSelect_review = function(json, answer){	
	var $question = getQuestion_review(json);
	
	var $container = $question.find('[question-answer]').empty();
	$.each(json.options, function(index, item){
		var $option = $(
		'<div class="option customized-checkbox" data-id="' + item.lid + '">\n' +
		'	<input type="checkbox" name="' + json.lid + '"' + (answer.options.includes(item.lid) ? ' checked' : '' )  + ' value="' + item.value + '" disabled>\n' + 
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

var getSingleDropdown_review = function(json, answer){
	var $question = getQuestion_review(json);
	
	var $container = $question.find('[question-answer]').empty();
	
	$select = $('<select style="width: 200px; margin: 5px 0 10px 0;" disabled></select>');
	$select.append($('<option class="option default" disabled selected>请选择...</option>'));
	$.each(json.options, function(index, item){
		var $item = $('<option class="option" data-id="' + item.lid + '" value="' + item.value + '" ' + (answer.options.includes(item.lid) ? 'selected' : '') + '>' + item.name +'</option>');
		
		$select.append($item);
	});
	$container.append($select);
	
	return $question;
};

var getMultiDropdown_review = function(json, answer){
	var $question = getQuestion_review(json);
	
	var $container = $question.find('[question-answer]').empty();
	
	$select = $('<select style="width: 200px; margin: 5px 0 10px 0;" multiple disabled></select>');
	$.each(json.options, function(index, item){
		var $item = $('<option class="option" data-id="' + item.lid + '" value="' + item.value + '" ' + (answer.options.includes(item.lid) ? 'selected' : '') + '>' + item.name +'</option>');
		
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
var getInput_review = function(json, answer){
	var $question = getQuestion_review(json);
	
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
		'	<input  type="' + INPUT_SUBTYPE[sub_type].textType + '" class="form-control" placeholder="' + INPUT_SUBTYPE[sub_type].placeholder + '" value="' + answer.value + '" disabled style="max-width: 300px;">\n' +
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

var getFile_review = function(json){
	var $question = getQuestion_review(json);
	
	/* json.files = [{
		url:'dist/img/photo1.png',
		name: 'photo1.png'
	},{
		url:'dist/img/photo1.png',
		name: 'photo1.png'
	}] */
	
	json.files.forEach(function(item,index){
		$question.find('[question-answer]')
		.append('<div><span><i class="fa fa-file"></i> 文件 ' + (index+1) + ':</span><a href="' + item.url + '">' + item.name + '</a></div>\n');
	});
	
	return $question;
}

var getText_review = function(json){
	var $question = $(
		'<div class="question" question-type question-lid>\n' +
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

var getRating_review = function(json, answer){
	var $question = getQuestion_review(json);
	
	var $container = $question.find('[question-answer]').empty();
	$.each(json.options, function(index, item){
		var $option = $(
		'<span class="option customized-checkbox" data-id="' + item.lid + '" style="display: inline-block;">\n' +
		'	<input type="checkbox" name="' + json.lid + '"' + (item.isDefault == 1 ? ' checked' : '' )  + ' value="' + item.value + '" ' + (answer.options.includes(item.lid) ? 'checked': '') + ' disabled>\n' + 
		'	<span class="checkmark" style="border-radius: 50%;"></span>\n' +
		'	<span name="radioName" style="display: none;">' + item.name + '</span>\n' +
		'	<span name="radioValue">' + item.value + '</span>\n' +
		'</span>'
		);
		
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

var getSlide_review  = function(json, answer){
	var $question = getQuestion_review(json);
	
	var $container = $question.find('[question-answer]').empty();
	var $input = $(
		'<div class="slide-block">\n' +
		'	<div>\n' +
		'		<span class="head">' + json.min_text + '(' + json.min + ')</span>\n' +
		'		<span class="pull-right tail">' + json.max_text + '(' + json.max + ')</span>\n' +
		'	</div>\n' +
		'	<input type="range" min="' + json.min + '" max="' + json.max + '" value="' +  answer.value + '" id="slider_bar" disabled>\n' +
		'</div>\n'
	);
	$container.append($input);
	return $question;
};

var getRanking_review = function(json, answer) {
	var $question = getQuestion_review(json);
	
	var $container = $question.find('[question-answer]').empty();
	
	$.each(json.options, function(index, item){
		var r = answer.rank[index]
		var $option = $(
		'<div class="option ranking-option clearfix' + (r ? ' active' : '') + '" data-id="' + item.lid + '">\n' +
		'	<div class="ranking-box">' + r + '</div>\n' +
		'	<span name="radioName">' + item.name + '</span>\n' +
		'</div>'
		);
		$container.append($option);
	});

	return $question;
};
//###
var getTable_review = function(json) {
	var $question = getQuestion_review(json);
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
//###
var getTable_SingleSelect_review = function(json, answer) {
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
			'	<input type="checkbox" name="' + json.lid + '"' + (item.isDefault == 1 ? ' checked' : '' )  + ' value="' + item.value + '" ' + (answer.table_option[index1].includes(item.lid)  ? 'checked' : '') + '>\n' + 
			'	<span class="checkmark" style="border-radius: 50%;"></span>\n' +
			'</td>\n'
			)
			
			$b_tr.append($option).css({'height': '25px'});
		});
	});
	
	
	return $question;
};

var getTable_MultiSelect_review = function(json, answer) {
	var $question = getTable_SingleSelect_review(json, answer);
	
	$question.find('.checkmark').css({'border-radius': '0'});

	return $question;
};

var getTable_Input_review = function(json, answer) {
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
		'	<input type="text" class="form-control" placeholder="请输入.." value="' + answer.table_input[index1] + '" disabled>\n' +
		'</div>'
		)
		$b_tr.append($input);
	});		
	
	return $question;
};

var getTable_SingleDropdown_review = function(json, answer) {
	var $question = getTable(json);
	
	var options = json.options;
	var $table = $question.find('[question-answer] table');
	
	$.each(json.row, function(index1){
		var $b_tr = $table.find('tbody tr:nth-child(' +  (index1 + 1) + ')');
		var $select = $('<td style="text-align:left;"><select style="width: 200px; margin: 5px 0 10px 0;" disabled></select></td>');
		$.each(options, function(index, item){
			var $item = $('<option class="option" data-id="' + item.lid + '" value="' + item.value + '" ' + (item.isDefault ? 'selected' : '') + ' ' + (answer.table_option[index1] == item.lid  ? 'selected' : '') + '>' + item.name +'</option>');
			
			$select.find('select').append($item);
		});
		$b_tr.append($select);
	});
	return $question;
};

var getTable_Rating_review = function(json, answer) {
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
			'	<input type="checkbox" name="' + json.lid + '"' + (item.isDefault == 1 ? ' checked' : '' )  + ' value="' + item.value + '" ' + (answer.table_option[index1].includes(item.lid)  ? 'checked' : '') + '>\n' + 
			'	<span class="checkmark" style="border-radius: 50%;"></span>\n' +
			'</td>\n'
			)

			$b_tr.append($option).css({'height': '25px'});
		});
	});
	
	
	return $question;
};

// 2. @@@@
var loadTd = function($td, answer) {
	var loadSingleSelect = function($td, answer) {
		$td.find('.option').each(function(index, o){
			var id = $(o).attr('data-id');
			if(answer.includes(id)){
				$(o).find('input').prop('checked', 1);
			}
		});
	};
	var loadSingleDropdown = function($td, answer) {
		answer.forEach(function(item, index){
			$td.find('.option[data-id="' + item + '"]').prop('selected', true)
		});
	};
	var loadMultiSelect = function($td, answer) {
		loadSingleSelect($td, answer);
	};
	var loadMultiDropdown = function($td, answer) {
		loadSingleDropdown($td, answer);
	};
	var loadInput = function($td, answer) {
		$td.find('input').val(answer)
	};
	
	var map = {
		'singleSelect': loadSingleSelect,
		'singleDropdown': loadSingleDropdown,
		'multiSelect': loadMultiSelect,
		'multiDropdown': loadMultiDropdown,
		'input': loadInput
	};
	
	this.load = function($td, answer) {
		var type = $td.attr('question-type')
		map[type]($td, answer);
	};
};

var getTable_Nested_review = function(json, answer) {
	var $question = getTable_Nested(json);
	var l = new loadTd();
	$question.find('input, select').attr('disabled', 1);
	
	table = answer.table
	
	$question.find('[answer-table] tbody tr').each(function(index1, tr){
		$(tr).find('td').each(function(index2, td){
			
			if(index2 > 0){
				var type = $(td).attr('question-type')
				index2 -= 1
				// console.log(table[index1][index2], type)
				// console.log(table[index1][index2])
				l.load($(td), table[index1][index2])
			}
			
		});
	});
	
	
	return $question;
};

// ! 2. @@@@

var getTag_review = function(json, answer){
	var $question = getQuestion_review(json);
	
	var $container = $question.find('[question-answer]').empty();
	$container.addClass('clearfix');
	answer.tags.forEach(function(item){
		var $tag = $('<span style="">' + item + '</span>\n')
			.css({
				'color': '#555555',
				'background': '#fff',
				'border': '1px solid #ccc',
				'border-radius': '4px',
				'cursor': 'default',
				'float': 'left',
				'margin': '5px 0 0 6px',
				'padding': '0 6px'
			});
		$container.append($tag);
	});
	
	return $question;
};

/* #@#@ */
var getTagButton_review = function(json, answer){
	var $question = getQuestion_review(json);
	
	var $container = $question.find('[question-answer]').empty();
	$container.append(
		'<ul data-type="tag-container"></ul>\n'
	);
	answer.tags.forEach(function(item, index){
		$container.find('[data-type="tag-container"]').append(
			'<li>\n' +
			'	<span data-value="' + item.value + '" data-lid="' + item.lid + '">' + item.name + '</span> \n'+
			'</li>\n'
		);
	});
	
	
	return $question;
};
var getColorPicker_review = function(json, answer){
	var $question = getQuestion_review(json);
	
	var $container = $question.find('[question-answer]').empty();
	
	var $input = $(
		'<div class="input-group" style="margin: 5px 0 5px;">\n' +
		'	<div class="input-group-addon">\n' +
		'		<i class="fa fa-paint-brush"></i> \n' +
		'	</div>\n' +
		'	<input class="form-control" disabled value="' + answer.color + '" type="color" style="width: 80px;">\n' +
		'</div>\n'
	);
	
	$container.append($input);
	return $question;
};
/* #@#@ */

/* 2. ^^^^ */
var getCounter_review = function(json, answer){
	var $question = getQuestion_review(json);
	
	var $container = $question.find('[question-answer]').empty();
	
	var $brief = $(
		'<div>\n' +
		'	<div>\n' +
		'		<label>计数单位: </label>\n' +
		'		<span>' + json.unit + '</span>\n' +
		'	</div>\n' +
		'	<div>\n' +
		'		<label>是否为现场计数: </label>\n' +
		'		<span>' + (json.onSite == 1 ? ' 是' : '否') + '</span>\n' +
		'	</div>\n' +
		'	<div>\n' +
		'		<label>计数时长 (分钟): </label>\n' +
		'		<span>' + secToTime(answer.count_time) + '</span>\n' +
		'	</div>\n' +
		'	<div>\n' +
		'		<label>统计数据 </label> <a href="javascript:void(0);" data-action="details">详情</a>\n' +
		'	</div>\n' +
		'	<div overall-data></div>\n' +
		'</div>\n'
	);
	
	
	json.subjects.forEach(function(item, index){
		var $temp = $(
			'<div style="padding-left: 10px;">\n' +
			'	<label>' + item.name + ': </label>\n' +
			'	<span>' + answer.counter[item.key].length + '</span>\n' +
			'</div>\n'
		);
		$brief.find('[overall-data]').append($temp);
	});
	
	$container.append($brief);
	
	
	
	$question.on('click', '[data-action="details"]', function(e){
		var $detailModal = $(
			'<div class="modal">\n' +
			'	<div class="modal-dialog">\n' +
			'		<div class="modal-content">\n' +
			'			<div class="modal-header">\n' +
			'				<h5 class="modal-title">计数详情</h5>\n' +
			'			</div>\n' +
			'			<div class="modal-body">\n' +
			'				<table class="table">\n' +
			'					<thead>\n' +
			'						<!-- 标题 -->\n' +
			'					<tr><th>类别</th><th>时间</th></tr></thead>\n' +
			'					<tbody>\n' +
			'					</tbody>\n' +
			'				</table>\n' +
			'			</div>\n' +
			'			<div class="modal-footer">\n' +
			'				<button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>\n' +
			'			</div>\n' +
			'		</div>\n' +
			'	</div>\n' +
			'</div>\n'
		);
		
		json.subjects.forEach(function(item1, index1){
			if(answer.counter[item1.key].length > 0)
				answer.counter[item1.key].forEach(function(item2, index2){
					var start_sec = timeToSec(answer.start_time);
					var time = secToTime(start_sec + parseInt(item2));
					
					var $row = $('<tr><td>' + item1.name + '</td><td>' + time + '</td></tr>');
					$detailModal.find('tbody').append($row);
				});
			else{
				var $row = $('<tr><td></td><td>' + item1.name + '</td><td>暂无记录</td></tr>');
				$detailModal.find('tbody').append($row);
			}
				
		});
		
		$detailModal.modal('show');
		
		$detailModal.on('hidden.bs.modal', function(e){
			$(this).remove();
		});
	});
	
	
	

	return $question;
};
/* ! 2. ^^^^ */

const QUESTION_REVIEW_MAP = {
	'singleSelect': getSingleSelect_review,
	'singleDropdown': getSingleDropdown_review,
	'multiSelect': getMultiSelect_review,
	'multiDropdown': getMultiDropdown_review,
	'input': getInput_review,
	'file': getFile_review,
	'text': getText_review,
	'rating': getRating_review,
	'slide': getSlide_review,
	'ranking': getRanking_review,
	'table_singleselect': getTable_SingleSelect_review,
	'table_multiselect': getTable_MultiSelect_review,
	'table_input': getTable_Input_review,
	'table_singledropdown': getTable_SingleDropdown_review,
	'table_rating': getTable_Rating_review,
	// 1. @@@@
	'table_nested': getTable_Nested_review,
	// ! 1. @@@@
	'tag': getTag_review,
	/* 1. #@#@ */
	'tagButton': getTagButton_review,
	'colorPicker': getColorPicker_review,
	/* 1. #@#@ */
	/* 1. ^^^^ */
	'counter': getCounter_review,
	/* ! 1. ^^^^ */
};
