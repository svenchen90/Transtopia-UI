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

text: {
	lid: 
	text:
}

rating: {
	{singleSelect}
}

*/

/* config */
var getJson_QuestionDefault = function(){
	return {
		lid: localIDGenerator(),
		key: localIDGenerator(),
		required: 0,
		title: '请输入问题',
		tooltip: '请输入提示',
	};
};

var getJson_OptionsDefault = function(){
	return {
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
};

var getJson_TableDefault = function(type) {
	return $.extend(
		{
			type: type,
			options: [
				{
					lid: localIDGenerator(),
					name: '很不满意',
					value: 1,
					isDefault: 0
				},
				{
					lid: localIDGenerator(),
					name: '不满意',
					value: 2,
					isDefault: 0
				},
				{
					lid: localIDGenerator(),
					name: '一般',
					value: 3,
					isDefault: 0
				},
				{
					lid: localIDGenerator(),
					name: '满意',
					value: 4,
					isDefault: 0
				},
				{
					lid: localIDGenerator(),
					name: '满意',
					value: 5,
					isDefault: 0
				}
			],
			row: [
				{
					lid: localIDGenerator(),
					text: '标题行1',
					name: localIDGenerator()
				},
				{
					lid: localIDGenerator(),
					text: '标题行2',
					name: localIDGenerator()
				},
				{
					lid: localIDGenerator(),
					text: '标题行3',
					name: localIDGenerator()
				},
				
			]
		},
		getJson_QuestionDefault(),
	);
};

var getJson_TabDefault = function(){
	return {
		lid: localIDGenerator(),
		key: localIDGenerator(),
		name: '新的分页',
		questions:[]
	}
};

const QUESTION_DEFAULT_JSON_MAP = {
	// 单项
	'singleSelect': {
		text: '单项选择',
		getDefaultJson: function() {
			return $.extend(
				{
					type: 'singleSelect'
				},
				getJson_QuestionDefault(),
				getJson_OptionsDefault(),
			);
		},
	},
	// 多项
	'multiSelect': {
		text: '多项选择',
		getDefaultJson: function() {
			return $.extend(
				{
					type: 'multiSelect',
					min: 0,
					max: 2
				},
				getJson_QuestionDefault(),
				getJson_OptionsDefault(),
			);
		},
	},
	// 单项下拉框
	'singleDropdown': {
		text: '单项下拉框',
		getDefaultJson: function() {
			return $.extend(
				{
					type: 'singleDropdown'
				},
				getJson_QuestionDefault(),
				getJson_OptionsDefault(),
			);
		},
	},
	// 多项下拉框
	'multiDropdown': {
		text: '多项下拉框',
		getDefaultJson: function() {
			return $.extend(
				{
					type: 'multiDropdown',
					min: 0,
					max: 2
				},
				getJson_QuestionDefault(),
				getJson_OptionsDefault(),
			);
		},
	},
	// 填空
	'input': {
		text: '填空',
		getDefaultJson: function(extra_data) {
			return $.extend(
				{
					type: 'input',
					sub_type: (extra_data == undefined || extra_data.sub_type == undefined) ? 'default' : extra_data.sub_type,
					max: 20,
					min_num: 0,
					max_num: 20,
					/* 1. ***** */
					default_input: '默认值'
					/* 1. ***** */
				},
				getJson_QuestionDefault()
			);
		},
	},
	// 上传文件
	'file': {
		text: '文件上传',
		getDefaultJson: function() {
			return $.extend(
				{
					type: 'file',
					allowedType: ['text', 'video', 'audio', 'image']
				},
				getJson_QuestionDefault()
			);
		},
	},
	// 添加文本
	'text': {
		text: '文本',
		getDefaultJson: function() {
			return {
				lid: localIDGenerator(),
				type: 'text',
				text: '请输入文本'
			};
		},
	},
	// 评分
	'rating': {
		text: '评分',
		getDefaultJson: function() {
			return $.extend(
				{
					type: 'rating',
					options: [
						{
							lid: localIDGenerator(),
							name: '很不满意',
							value: 1,
							isDefault: 0
						},
						{
							lid: localIDGenerator(),
							name: '不满意',
							value: 2,
							isDefault: 0
						},
						{
							lid: localIDGenerator(),
							name: '一般',
							value: 3,
							isDefault: 0
						},
						{
							lid: localIDGenerator(),
							name: '满意',
							value: 4,
							isDefault: 0
						},
						{
							lid: localIDGenerator(),
							name: '满意',
							value: 5,
							isDefault: 0
						}
					]
				},
				getJson_QuestionDefault()
			);
			
		},		
	},
	// 滑动条
	'slide': {
		text: '滑动条',
		getDefaultJson: function() {
			return $.extend(
				{
					type: 'slide',
					max: 100,
					max_text: '满意',
					min: 1,
					min_text: '不满意'
				},
				getJson_QuestionDefault()
			);
		},
	},
	// 排序
	'ranking': {
		text: '排序',
		getDefaultJson: function() {
			return $.extend(
				{
					type: 'ranking'
				},
				getJson_QuestionDefault(),
				getJson_OptionsDefault(),
			);
		},
	},
	// 矩阵
	// 矩阵单选
	'table_singleselect': {
		text: '矩阵单选',
		getDefaultJson: function(){
			return getJson_TableDefault('table_singleselect');
		}
	},
	// 矩阵多选
	'table_multiselect': {
		text: '矩阵多选',
		getDefaultJson: function(){
			return getJson_TableDefault('table_multiselect');
		}
	},
	// 矩阵填空
	/* 2. &&&&& */
	'table_input': {
		text: '矩阵填空',
		getDefaultJson: function(){
			return {
				lid: localIDGenerator(),
				type: 'table_input',
				required: 0,
				title: '请输入问题',
				tooltip: '',
				key: localIDGenerator(),
				row: [
					{
						lid: localIDGenerator(),
						text: '标题行1',
						name: localIDGenerator(),
						default_input: '',
						sub_type: 'default'
					},
					{
						lid: localIDGenerator(),
						text: '标题行2',
						name: localIDGenerator(),
						default_input: '',
						sub_type: 'default'
					},
					{
						lid: localIDGenerator(),
						text: '标题行3',
						name: localIDGenerator(),
						default_input: '',
						sub_type: 'default'
					},
					
				]
			};
		}
	},
	/* 2. &&&&& */
	// 矩阵下拉
	'table_singledropdown': {
		text: '矩阵单项下拉',
		getDefaultJson: function(){
			return getJson_TableDefault('table_singledropdown');
		}
	},
	// 矩阵评分
	'table_rating': {
		text: '矩阵评分',
		getDefaultJson: function(){
			return getJson_TableDefault('table_rating');
		}
	},
	// 多列矩阵
	'table_nested': {
		text: '多列矩阵',
		getDefaultJson: function(){
			return $.extend(
				{
					type: 'table_nested',
					row: [
						{
							lid: localIDGenerator(),
							text: '标题行1',
							name: localIDGenerator()
						},
						{
							lid: localIDGenerator(),
							text: '标题行2',
							name: localIDGenerator()
						},
						{
							lid: localIDGenerator(),
							text: '标题行3',
							name: localIDGenerator()
						},
						
					],
					col: [
						QUESTION_DEFAULT_JSON_MAP['singleSelect'].getDefaultJson(),
						QUESTION_DEFAULT_JSON_MAP['multiSelect'].getDefaultJson(),
						QUESTION_DEFAULT_JSON_MAP['singleDropdown'].getDefaultJson(),
						QUESTION_DEFAULT_JSON_MAP['multiDropdown'].getDefaultJson(),
						QUESTION_DEFAULT_JSON_MAP['input'].getDefaultJson({sub_type: 'default'})
					]
				},
				getJson_QuestionDefault(),
				getJson_OptionsDefault(),
			);
		}
	},
	// 标签
	'tag': {
		text: '自定义标签',
		getDefaultJson: function(){
			return $.extend(
				{
					type: 'tag',
					tag_max: 10,
					tag_text_max: 20,
				},
				getJson_QuestionDefault()
			);
		}
	},
	/* 2. #@#@ */
	'tagButton': {
		text: '按钮标签',
		getDefaultJson: function(){
			return $.extend(
				{
					type: 'tagButton'
				},
				getJson_QuestionDefault(),
				getJson_OptionsDefault(),
			);
		}
	},
	'colorPicker': {
		text: '选色题',
		getDefaultJson: function(){
			return $.extend(
				{
					type: 'colorPicker',
					default_color: '#00a65a'
				},
				getJson_QuestionDefault(),
			);
		}
	},
	/* !2. #@#@ */
	/* 2. ^^^^ */
	'counter': {
		text: '选色题',
		getDefaultJson: function(){
			var json = $.extend(
				{
					type: 'counter',
					unit: '个',
					onSite: 0,
					timeLimit: 3600,
					subjects: [
						{
							lid: localIDGenerator(),
							name: '选项1',
							key: localIDGenerator()
						},
						{
							lid: localIDGenerator(),
							name: '选项2',
							key: localIDGenerator()
						}
					]
				},
				getJson_QuestionDefault(),
			);
			json.title = '计数器对象';
			return json;
		}
	}
	/* ! 2. ^^^^ */
};

const TAB_LIST = [
	{
		name: '单项',
		action_name: 'singleSelect',
		icon: 'fa-check-circle-o'
	},
	{
		name: '多项',
		action_name: 'multiSelect',
		icon: 'fa-check-square-o'
	},
	{
		name: '单项下拉框',
		action_name: 'singleDropdown',
		icon: 'fa-align-justify'
	},
	{
		name: '多项下拉框',
		action_name: 'multiDropdown',
		icon: 'fa-list'
	},
	{
		name: '填空',
		icon: 'fa-th',
		sub_list: [
			// module_static.js
		],
		addition: ['input-submenu']
	},
	{
		name: '上传文件',
		action_name: 'file',
		icon: 'fa-file-o'
	},
	{
		name: '添加文本',
		action_name: 'text',
		icon: 'fa-pencil'
	},
	{
		name: '评分',
		action_name: 'rating',
		icon: 'fa-star-o'
	},
	{
		name: '滑动条',
		action_name: 'slide',
		icon: 'fa-exchange'
	},
	{
		name: '排序',
		action_name: 'ranking',
		icon: 'fa-sort-numeric-asc'
	},
	{
		name: '矩阵',
		icon: 'fa-table',
		sub_list: [
			{
				name: '矩阵单选',
				action_name: 'table_singleselect',
				icon: 'fa-check-circle-o'
			},
			{
				name: '矩阵多选',
				action_name: 'table_multiselect',
				icon: 'fa-check-square-o'
			},
			{
				name: '矩阵填空',
				action_name: 'table_input',
				icon: 'fa-keyboard-o'
			},
			{
				name: '矩阵下拉',
				action_name: 'table_singledropdown',
				icon: 'fa-align-justify'
			},
			{
				name: '矩阵评分',
				action_name: 'table_rating',
				icon: 'fa-sort-numeric-asc'
			},
			{		
				name: '多列矩阵',
				action_name: 'table_nested',
				icon: 'fa-window-restore'
			},
		],
		addition: []
	},
	/* 1. #@#@ */
	{
		name: '标签',
		icon: 'fa-tags',
		sub_list: [{
			name: '自定义标签',
			action_name: 'tag',
			icon: 'fa-tag',
		},{
			name: '按钮标签',
			action_name: 'tagButton',
			icon: 'fa-tasks',
		}],
		addition: []
	},
	{
		name: '选色',
		action_name: 'colorPicker',
		icon: 'fa-paint-brush'
	},
	/* !1. #@#@ */
	/* 1. ^^^^ */
	{
		name: '计数器',
		action_name: 'counter',
		icon: 'fa-clock-o'
	},
	/* ! 1. ^^^^ */
];

const FORM_NAME_MODIFY = {
	title: '修改装备名称',
	placeholder: '请输入装备名称...',
	validation: function(value){
		if(value == ''){
			return '装备名称不能为空！';
		}else{
			return '';
		}
	}
};

const TAB_NAME_MODIFY = {
	title: '修改Tab名称',
	placeholder: '请输入Tab名称...',
	validation: function(value){
		if(value == ''){
			return 'Tab名称不能为空！';
		}else{
			return '';
		}
	}
};

const TAB_KEY_MODIFY = {
	title: '修改Tab ID',
	placeholder: '请输入ID...',
	validation: function(value){
		if(value == ''){
			return 'ID不能为空！';
		}else{
			return '';
		}
	}
};

var IDValidation = function(id){
	// character, _ or number, length: [5,12]
	var IDRegExp = /^[a-zA-Z0-9_]{5,12}$/;
	if(IDRegExp.test(id)){
		return '';
	}else{
		return 'ID格式： 英文字符， 数字， 下划线； 总长度5位到12位.';
	}
};

const FILE_TYPE_ALL = ["ANI", "BMP", "CAL", "EPS", "FAX", "GIF", "IMG", "JBG", "JPE", "JPEG", "JPG", "MAC", "PBM", "PCD", "PCX", "PCT", "PGM", "PNG", "PPM", "PSD", "RAS", "TGA", "TIFF", "WMF"];
/* ! config */

/* gear */
// 0. Delay
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();
// 1. 单行输入框
/* 6. ^^^^ */
var singleLineInput = function(title, default_value, placeholder, callback, validation=function(value){return '';}, type="text"){
	var modal = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close btn-close" data-dismiss="modal">&times;</button>\n' +
		'				<h4 class="modal-title"></h4>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div class="form-group">\n' +
		'					<input name="input" type="' + type + '" class="form-control" />\n' +
		'					<div name="error_msg" class="error"></div>\n' +
		'				</div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a href="javascript: void(0);" data-action="submit">确定</a>\n' +
		'				<a href="javascript: void(0);" data-dismiss="modal">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' + 
		'</div>'
	);
	
	var updateErr = function(error_msg){
		if(error_msg != ''){
			modal.find('.form-group').addClass('invalid');
			modal.find('[name="error_msg"]').html(error_msg);
		}else{
			modal.find('.form-group').removeClass('invalid');
			modal.find('[name="error_msg"]').html('');
		}
	};
	
	//初始化
	(function(){
		modal.find('.modal-title').text(title);
		modal.find('input')
			.attr('placeholder', placeholder)
			.val(default_value);
		
		//submit
		modal.on('click', '[data-action="submit"]:not(.disabled)', function(){
			// 获取数据
			var input = modal.find('input').val();
			// validation
			var error_msg = validation(input);
			updateErr(error_msg);
			if(error_msg == ''){
				callback(input);
				modal.modal('hide');
			}
		});
		
		modal.on('change', '[name="input"]', function(e){
			var input = $(this).val();
			// validation
			var error_msg = validation(input);
			updateErr(error_msg);
		});
		
		
		modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		modal.modal('show');
	})();
};
/* ! 6. ^^^^ */

// 2. check array has duplicate
var hasDuplicate = function(list){
	for(var i=0; i<list.length; i++){
		for(j=i+1; j<list.length; j++){
			if(list[i] == list[j])
				return true;
		}
	}
	return false;
};
/* 5. ^^^^ */
// 3. sec to time
var secToTime = function(sec){
	
	var s = sec % 60;
	var m = Math.floor(sec / 60)%60;
	var h = Math.floor(sec / 3600);
	
	if(s<10)
			s = '0' + String(s);
	
	if(m<10)
			m = '0' + String(m);
	
	if(h<10)
			h = '0' + String(h);
	
	return String(h) + ':' + String(m) + ':' + String(s);
};

var timeToSec = function(time){
	var list = time.split(':');
	var sec = 0;
	sec += parseInt(list[0])*3600;
	sec += parseInt(list[1])*60;
	sec += parseInt(list[2])*1;
	return sec;
};

var toHHMMSS = function(date){
	var AddZero = function(num) {
			return (num >= 0 && num < 10) ? "0" + num : num + "";
	};
	
	var strDateTime = [AddZero(date.getHours()), 
		AddZero(date.getMinutes()),
		AddZero(date.getSeconds())].join(":")
	
	return strDateTime;
}
console.log();
/* ! 5. ^^^^ */
/* !gear */


var FormDesigner = function(data, submitCallback){
	var $modal = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog"  style="width:1200px;">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<h4 class="modal-title">\n' +
		'					<span data-type="formName" data-id></span>\n' +
		'					<a href="javascript:void(0)" title="修改名称" data-action="modify-form-name"><i class="fa fa-pencil"></i></a>\n' +
		'					<button type="button" class="close" data-dismiss="modal">\n' +
		'						&times;\n' +
		'					</button>\n' +
		'					<!-- <span class="pull-right" style="margin-right : 10px; color: #3c8dbc; cursor: pointer;" title="导入模板" import-template>\n' +
		'						<i class="fa fa-database"></i>\n' +
		'					</span> -->\n' +
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
		'							<ul class="nav navbar-nav sortable" data-container="toolbar">\n' +
		'								<!-- 3. @@@@ 删除这个部分 --->\n' +
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
	
	var data = extendData(data);
	
	// 2. @@@@
	var loadToolBar = function(list) {
		var getSingleTag = function(data) {
			return $(
				'<li><a href="javascript:void(0);" data-action="' + data.action_name + '"><i class="fa ' + data.icon + '"></i> ' + data.name + '</a></li>\n'
			);
		};
		var getNestedTag = function(data) {
			var $tag = $(
				'<li class="dropdown">\n' +
				'	<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
				'		<i class="fa ' + data.icon + '"></i> ' + data.name + ' <b class="caret"></b>\n' +
				'	</a>\n' +
				'	<ul class="dropdown-menu">\n' +
				'		<!-- sub-list -->\n' +
				'	</ul>\n' +
				'</li>\n'
			);
			
			var $container = $tag.find('.dropdown-menu');
			data.addition.forEach(function(item, index){
				$container.attr(item, '');
			});
			
			data.sub_list.forEach(function(item, index){
				$container.append(getSingleTag(item));
			});
			
			return $tag;
		};
		
		var $container = $modal.find('[data-container="toolbar"]');
		TAB_LIST.forEach(function(item, index){
			var $tag;
			if(item.sub_list == undefined){
				$tag = getSingleTag(item);
			}else{
				$tag = getNestedTag(item);
			}
			$container.append($tag);
		});
	};
	loadToolBar(TAB_LIST);
	// !2. @@@@
	
	var load = function(data){
		if(data == undefined || objIsEmpty(data)){
			load({
				lid: localIDGenerator(),
				name: '新的物品',
				tabs: []
			});
		}else{
			clear();
			$modal.find('[data-type="formName"]')
				.attr('data-id', data.lid)
				.text(data.name);

			var t_id;
			if(data.tabs.length == 0)
				t_id = addTab();
			else 
				$.each(data.tabs, function(index, t){
					t_id = addTab(t);
				});
			
			activeTab(t_id);
		}
	};
	
	var clear = function(){
		$modal.find('[data-type="formName"]')
				.attr('data-id', '')
				.text('新的物品');
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
			return addTab(getJson_TabDefault());
		}else{
			var $tab = $(
			'<li>\n' +
			'	<a href="#' + data.lid + '" data-toggle="tab">\n' +
			'		<span data-type="name">' + data.name + '</span>\n' +
			'		[<span data-type="key" style="color: red;">' + data.key + '</span>]\n' +
			'		<span data-action="modify-tab" style="color: #3c8dbc; cursor: pointer;"><i class="fa fa-gear"></i></span>\n' +
			'	</a>\n' +
			'</li>\n'
			);
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
			key: $modal.find('#tab-bar [href="#' + id + '"] [data-type="key"]').text(),
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
			//rerank($tab);
		}
		
		return $question;
	};
	
	var questionToJson = function($question){
		return $questionToJson($question);
	};
	
	var getAllTabName = function(){
		var list = []
		$modal.find('#tab-bar > li [data-type="name"]').each(function(index, item){
			list.push($(item).text());
		});
		return list;
	};
	
	var getAllTabKey = function(){
		var list = []
		$modal.find('#tab-bar > li [data-type="key"]').each(function(index, item){
			list.push($(item).text());
		});
		return list;
	};
	
	var initialize = function(){
		load(data);
		
		//动态添加填空子选项
		var $container = $modal.find('#tool-bar [input-submenu]');
		for(var sub_type in INPUT_SUBTYPE){
			$container.append(
				'<li><a href="javascript:void(0);" data-action="input" data-subType="' + sub_type + '"><i class="fa ' + INPUT_SUBTYPE[sub_type].icon + '"></i> ' + INPUT_SUBTYPE[sub_type].name + '</a></li>'
			);
		}
		
		// 修改表单名称
		$modal.on('click', '[data-action="modify-form-name"]', function(e){
			var current_name = $modal.find('[data-type="formName"]').text();
			singleLineInput(FORM_NAME_MODIFY.title, current_name, 
				FORM_NAME_MODIFY.placeholder, 
				function(value){
					$modal.find('[data-type="formName"]').html(value);
				},
				FORM_NAME_MODIFY.validation);
		});
		
		// 添加 tab
		$modal.on('click', '#tab-bar [data-action]', function(){
			getAllTabName();
			var actionType = $(this).attr('data-action')
			if(actionType == 'addTab'){
				var new_tab = getJson_TabDefault();
				var list_tabs = getAllTabName();
				var name = new_tab.name;
				if(list_tabs.includes(name)){
					var index = 1;
					while(list_tabs.includes(name + '_' + index)){
						index += 1;
					}
					name += '_' + index;
				}

				new_tab.name = name
				var id = addTab(new_tab);
				activeTab(id);
			}else{
				
			}
		});
		
		// tab 栏右击事件
		$modal.on('click', '[data-action="modify-tab"]', function(ev){
			ev.preventDefault();
			ev.stopPropagation();
			$('.tab-menu').remove();
			
			var id = $(ev.target).closest('a').attr('href').substring(1);
			var $currentTab = $(ev.target).closest('li');
			var $pane = $modal.find('#' + id)
			
			var $menu = $(
				'<ul class="dropdown-menu tab-menu">\n' +
				'	<li><a href="javascript:void(0);" data-action="modify-name"><i class="fa fa-header"></i> 修改名称</a></li>\n' +
				'	<li><a href="javascript:void(0);" data-action="modify-key"><i class="fa fa-key"></i> 修改ID</a></li>\n' +
				'	<li><a href="javascript:void(0);" data-action="copy"><i class="fa fa-copy"></i> 复制</a></li>\n' +
				'	<li><a href="javascript:void(0);" data-action="delete"><i class="fa fa-trash"></i> 删除</a></li>\n' +
				'	<li><a href="javascript:void(0);" data-action="forward"><i class="fa fa-angle-left"></i> 左移</a></li>\n' +
				'	<li><a href="javascript:void(0);" data-action="backward"><i class="fa fa-angle-right"></i> 右移</a></li>\n' +
				'</ul>'
			);
			
			$menu.on('click', '[data-action]', function(ev){
				var actionType = $(this).attr('data-action');
				switch(actionType){
					case 'modify-name':
						var current_name = tabToJson(id).name;
						singleLineInput(TAB_NAME_MODIFY.title, current_name, 
							TAB_NAME_MODIFY.placeholder, 
							function(value){
								$modal.find('[href="#' + id + '"] [data-type="name"]').html(value);
							},
							function(new_name){
								if(new_name == ''){
									return 'Tab 名称不能为空！';
								}else{
									var list_name = getAllTabName();
									if(new_name != current_name && list_name.includes(new_name)){
										return 'Tab 名称已存在！';
									}else{
										return '';
									}
								}
							}
						);
						break;
					case 'modify-key':
						var current_key = tabToJson(id).key;
						singleLineInput(TAB_KEY_MODIFY.title, current_key, 
							TAB_KEY_MODIFY.placeholder, 
							function(value){
								$modal.find('[href="#' + id + '"] [data-type="key"]').html(value);
							},
							function(new_key){
								if(new_key == ''){
									return 'ID 名称不能为空！';
								}else{
									var list_key = getAllTabKey();
									if(new_key != current_key && list_key.includes(new_key)){
										return 'ID 名称已存在！';
									}else{
										return IDValidation(new_key);
									}
								}
							}
						);
						break;
					case 'forward':
						$currentTab.prev().before($currentTab);
						$pane.prev().before($pane);
						break;
					case 'backward':
						$currentTab.next().after($currentTab);
						$pane.next().after($pane);
						break;
					case 'copy':
						var copyData = tabToJson(id);
						copyData.lid = localIDGenerator();
						copyData.name += '_copy';
						copyData.key = localIDGenerator();
						extendData({tabs: [copyData]})
						addTab(copyData);
						break;
					case 'delete':
						callConfirm('确认删除', '您确定要删除此分页？', 
							function(){
								deleteTabByID(id);
							}, 
							function(){
								
							}
						);
						break;
					default:
						break;
				}
				$('.tab-menu').remove();
			});
			
			
			$menu.css({
				'position': 'absolute',
				'display': 'block',
				'z-index': 10000,
				'top': ev.pageY + 'px',
				'left': ev.pageX + 'px'
			});
			$('body').append($menu);
		});
		
		$modal.on('click', ':not(.tab-menu, [data-action="modify-tab"])', function(ev){
			$('.tab-menu').remove();
		});
		
		
		// 新建问题栏事件
		$modal.on('click', '#tool-bar [data-action]', function(){
			var $container = $modal.find('.tab-pane.active');
			if($modal.find('.tab-pane.active').length != 0){
				// 6. @@@@
				var type = $(this).attr('data-action');
				// console.log(type);
				var extra_data = {
					sub_type: $(this).attr('data-subType')
				};
				var json = QUESTION_DEFAULT_JSON_MAP[type].getDefaultJson(extra_data);
				// !6. @@@@
				
				var $q = addQuestion(json, $container);
				$q.find('.btn-list [data-action="activateEditor"]').trigger('click');
			}else{
				callAlert('请选择您要添加到分页');
			}
			rerank($container);
			$("#tab-content").animate({ scrollTop: $('#tab-content').prop("scrollHeight")}, 1000);
		});
		
		// #### submit
		$modal.on('click', '[data-action="submit"]', function(){
			callConfirm('确认提交', '您确定提交此物品？', 
				function(){
					submitCallback(toJson());
					/* console.log(toJson())
					FormDisplay(
						toJson(), 
						function(a){console.log(a)}
					); */
					
					$modal.modal('hide');
				}, 
				function(){
					
				}
			);
		});
		
		
		// ####
		$modal.on('click', '[import-template]', function(){
			//load({});
			//addTab(tab1)
			tab1.lid = localIDGenerator()
			var id = addTab(tab1)
			activeTab(id)
			
		});
		
		$modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		$modal.modal('show');
	};
	
	initialize();
};

var rerank = function($container){
	$container.find('.question:not(.puretext)').each(function(index, item){
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

var callAlert = function(msg, title="消息框"){
	var msg_formated = msg
	if(Array.isArray(msg)){
		msg_formated = msg.join('\n');
	}
	var $modal = $(
		'<div class="modal" tabindex="-1" role="dialog">\n' +
		'	<div class="modal-dialog" role="document">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<h5 class="modal-title">' + title + '</h5>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<p>' + msg_formated + '</p>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>\n'
	);
	
	
	
	$modal.on('hidden.bs.modal', function(){
		$(this).remove();
	});
	
	$modal.modal('show');
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
			}else{
				item1.q_type = item1.type;
				return avaliableData.push(item1);
			}
				
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
				selectedData.unshift(item1);
		});
		
		return selectedData;
	};
};

var Option = function(opt){
	var obj = this;
	this.get$option = function(data){
		var $option = $(
			'<tr name="editorOption" id="">\n' +
			'	<td><input type="text" placeholder="请输入选项..." name="name"></td>\n' +
			'	<td><input type="checkbox" name="isDefault"></td>\n' +
			'	<td><input type="text" name="value" style="width: 50px;"></td>\n' +
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
		
		if(opt && opt.hasDefault == 0){
			$option.find('[name="isDefault"]').closest('td').remove();
		}
		
		if(opt && opt.hasValue == 0){
			$option.find('[name="value"]').closest('td').remove();
		}
		
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
			'		<div question-head>\n' +
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
			'			<div class="col-md-12">\n' +
			'				<div editor-key>\n' +
			'					<label>ID: </label>\n' +
			'					<input type="text" placeholder="请输入ID...">\n' +
			'				</div>\n' +
			'			</div>\n' +
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
			'					<label>提示</label><br>\n' +
			// '					<input type="text" placeholder="请输入提示">\n' +
			'					<textarea type="text" placeholder="请输入提示"></textarea>\n' +
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
		// 2.2.1 ID
		$question.find('[question-editor] [editor-key] input').val(json.key);
		
		// 2.3 tooltip
		var $check = $question.find('[editor-tooltip] [type="checkbox"]');
		var $input = $question.find('[editor-tooltip] [type="text"]');
		if(json.tooltip == undefined || json.tooltip == ''){
			$check.prop('checked', false);
			$input.val('')
				.css({
					'display': 'none'
				});
		}else{
			$check.prop('checked', true);
			$input.val(json.tooltip)
				.css({
					'display': 'inline-block'
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
					var data = $questionToJson($question);
					// validate general id, name
					var error_msg = [];
					if(data.key == ''){
						error_msg.push('ID 不能为空!');
					}
					if(data.title == ''){
						error_msg.push('题目不能为空!');
					}
					var getAllKey_Question = function($question){
						var list_key = [];
						$question.siblings().each(function(index, item){
							var key = $(item).find('[question-title] [data-type="key"]').text()
							list_key.push(key);
							
						});
						return list_key;
					};
					list_key = getAllKey_Question($question);
					if(list_key.includes(data.key)){
						error_msg.push('ID不能重复');
					}
					var temp_err = IDValidation(data.key);
					if(temp_err != '')
						error_msg.push(temp_err);
					
					// option 
					if (data.options != undefined){
						for(var index in data.options){
							if(data.options[index].name == ''){
								error_msg.push('选项名称不能为空！');
								break;
							}
						}
					}
					// table row
					if (data.row != undefined){
						var flag1 = false;
						var flag2 = false;
						var flag3 = false;

						for(var index in data.row){
							if(data.row[index].name == ''){
								flag1 = true;
							}
							if(data.row[index].text == ''){
								flag2 = true;
							}
							
							if(IDValidation(data.row[index].name) != ''){
								flag3 = true;
							}
								
						}
						if(flag1)
							error_msg.push('矩阵行ID不能为空！');
						if(flag2)
							error_msg.push('矩阵行名称不能为空！');
						if(flag3)
							error_msg.push('矩阵行ID格式： 英文字符， 数字， 下划线； 总长度5位到12位.');
						
						var key_list =  data.row.map(function(item, index){
							return item.name;
						});
						
						if(hasDuplicate(key_list))
							error_msg.push('矩阵行ID不能重复！');
					}
					
					// table col
					if (data.col != undefined){
						var flag1 = false;
						var flag2 = false;
						for(var index in data.col){
							if(data.col[index].title == ''){
								flag1 = true;
							}
							if(data.col[index].key == ''){
								flag1 = true;
							}
						}
						if(flag1)
							error_msg.push('矩阵列ID不能为空！');
						if(flag2)
							error_msg.push('矩阵列名称不能为空！');
						
						var key_list =  data.col.map(function(item, index){
							return item.key;
						});
						if(hasDuplicate(key_list))
							error_msg.push('矩阵列ID不能重复！');
					}
					
					if(error_msg.length != 0){
						callAlert(error_msg);
					}else{
						$(this).replaceWith('<div class="btn btn-primary btn-sm" question-action="activateEditor"><i class="fa fa-tag"></i> 编辑</div>');
						$question.removeClass('active');
						obj.loadMain(data, $question)
						new QUESTION_MAP[json.type]().loadAnswer($questionToJson($question), $question);
					}
					break;
				case 'copy':
					var data = $questionToJson($question);
					data.lid = localIDGenerator();
					data.key = localIDGenerator();
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
			$tab.find('.question').each(function(i, item){
				obj.updateConstraint($(item));
			});
		});
		
		// 3.2 tooltip toggle
		$question.on('click', '[editor-tooltip] [type="checkbox"]', function(){
			if($(this).is(':checked')){
				$(this).nextAll('[type="text"]')
					.css({
						'display': 'inline-block'
					})
					.focus();
			}else{
				$(this).nextAll('[type="text"]')
					.val('')
					.css({
						'display': 'none'
					});
			}
		});
		$question.on('focusout', '[editor-tooltip] [type="text"]', function(e){
			if($(this).val() == ''){
				callAlert('提示信息不能为空');
				$question.find('[editor-tooltip] [type="checkbox"]').prop('checked', false);
				$question.find('[editor-tooltip] [type="text"]').val('')
					.css({
						'display': 'none'
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
		json.key = $question.find('[editor-key] [type="text"]').val();
		json.required = $question.find('[editor-required] input').is(':checked') ? 1 : 0;
		json.tooltip = $question.find('[editor-tooltip] [type="text"]').val();
		
		json.constraints = []
		c.getConstraintData($question).each(function(index, item){
			json.constraints.push(item);
		});
		return json;
	}
	
	this.loadMain = function(json, $question){
		// 1.2 index
		$question.find('[question-main] [question-index]').text(json.index);
		// 1.3 title
		$question.find('[question-main] [question-title]')
			.html('[ <span class="type-aids">' + QUESTION_DEFAULT_JSON_MAP[json.type].text + '</span> ]<span> ' + 
				json.title + ' </span>[ <span data-type="key" style="color: red;">' + json.key + '</span> ]');
		
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
			$container.append(c.get$constraint(item));
		});
		var $div = $question.find('[question-constraint]').empty();
		$div.append();
		var tooltip_msg = [];
		var c = list.map(function(item){
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
		
		$select = $('<select style="width: 200px; margin: 5px 0 10px 0;"></select>');
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
			'	</select>\n' +
			'<div>'
		);
		
		for(var key in INPUT_SUBTYPE){
			$select.find('select').append('<option value="' + key + '">' + INPUT_SUBTYPE[key].name + '</option>');
		}
		
		$question.find('[editor-tooltip]').after($select);
		$select.find('[value="' + json.sub_type + '"]').prop('selected', true);
		
		/* 2. ***** */
		$question.find('[editor-basic]').append(
			'<div class="col-md-12">\n' +
			'	<div editor-default-input>\n' +
			'		<label>默认值: </label>\n' +
			'		<input type="text" value="' + json.default_input + '" placeholder="请输入默认值...">\n' +
			'	</div>\n' +
			'</div>'
		);
		/* 2. ***** */
		
		
		return $question;
	};
	
	this.getJson = function($question){
		var json = q.getJson($question);
		json.sub_type = $question.find('select[name="sub_type"] option:selected').val();
		/* 3 ***** */
		json.default_input = $question.find('[editor-default-input] input').val();
		/* 3 ***** */
		return json;
	};
	
	this.loadAnswer = function(data, $question){
		var sub_type = data.sub_type;
		var $container = $question.find('[question-answer]').empty();
		/* 4 ***** */
		var $input = $(
			'<div class="input-group" style="margin: 5px 0 5px;">\n' +
			'	<div class="input-group-addon">\n' +
			'		<i class="fa ' + INPUT_SUBTYPE[sub_type].icon + '"></i>\n' +
			'	</div>\n' +
			'	<input type="text" value="' + data.default_input + '" class="form-control" placeholder="' + INPUT_SUBTYPE[sub_type].placeholder + '">\n' +
			'</div>'
		);
		/* 4 ***** */
		$container.append($input);
	};

};

var File = function(){
	var q = new Question();
	var o = new Option();
	var obj = this;
	
	this.get$question = function(json){
		var $question = q.get$question(json);
		
		var $fileNumber = $(
			'<div data-type="fileNumber">\n' +
			'	<input type="checkbox" name="file_num"><label>文件数量不高于: </label><input class="not-display" type="number" name="file_max_num" style="width: 100px;"><br>\n' +
			'	<input type="checkbox" name="file_size"><label>文件大小不大于: </label><input class="not-display" type="number" name="file_max_size" style="width: 100px;">\n' +
			'</div>'
		);
		
		$fileNumber.on('click', '[type="checkbox"]', function(e){
			var name = $(this).attr('name');
			var selector;
			if(name == 'file_num')
				selector = '[name="file_max_num"]';
			else if(name == "file_size")
				selector = '[name="file_max_size"]';
			if($(this).prop('checked'))
				$fileNumber.find(selector).removeClass('not-display');
			else
				$fileNumber.find(selector).addClass('not-display');
		});
		
		
		$question.find('[editor-tooltip]').after($fileNumber);
		
		
		var updateType = function(list){
			$allowedType.find('span').remove();
			list.forEach(function(type){
				var $type = $('<span style="" data-id="' + type + '">' + type + '</span>\n')
					.css({
						'color': '#555555',
						'background': '#fff',
						'border': '1px solid #ccc',
						'border-radius': '4px',
						'cursor': 'default',
						'margin': '5px 0 0 6px',
						'padding': '0 6px'
					});
				$allowedType.append($type);
			});
		}
		
		var $allowedType = $(
			'<div class="clearfix" data-type="allowedType">\n' +
			'	<a href="javascript: void(0);" data-action="edit"><i class="fa fa-pencil"></i> 文件类型: </a>\n' +
			'</div>'
		);
		
		updateType(json.allowedType);
		
		$allowedType.on('click', '[data-action="edit"]', function(e){
			var left_data = FILE_TYPE_ALL.map(function(type, index){
				return {
					id: type,
					name: type,
					'image': 'dist/img/Pencil-icon.gif'
				};
			});
			
			var right_data = []
			$allowedType.find('span').each(function(index, t){
				var type = $(t).attr('data-id');
				right_data.push({
					id: type,
					name: type,
					'image': 'dist/img/Pencil-icon.gif'
				});
			});
			
			SelectBoxBeta(left_data, right_data, function(a){updateType(a);}, function(i){return '';});
		});
		
		
		
		$question.find('[editor-title]').after($allowedType);
		
		
		/* 
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
		}); */

		
		
		return $question;
	};
	
	this.getJson = function($question){
		var json = q.getJson($question);
		json.allowedType = [];
		$question.find('[data-type="allowedType"] span').each(function(index, item){
			json.allowedType.push($(item).attr('data-id'));
		});

		if($question.find('[name="file_num"]').is(':checked')){
			json.file_max_num = $question.find('[name="file_max_num"]').val();
		}
		
		if($question.find('[name="file_size"]').is(':checked')){
			json.file_max_size = $question.find('[name="file_max_size"]').val();
		}

		return json;
	};
	
	this.loadAnswer = function(data, $question){
		var $container = $question.find('[question-answer]').empty();
		var $input = $(
			'<div class="input-group" style="margin: 5px 0 5px;">\n' +
			'	<input type="text" class="form-control" placeholder="请选择上传文件...">\n' +
			'	<div class="input-group-addon" style="cursor: pointer;">\n' +
			'		<i class="fa fa-file"></i> 选择文件\n' +
			'	</div>\n' +
			'</div>\n'
		);
		$container.append($input);
	};
};

var Text = function(){
	var obj = this;
	this.get$question = function(json){
		var $question = $(
			'<div class="question puretext" question-type question-lid>\n' +
			'	<div question-main  style="margin: 20px;padding: 10px; background-color: rgba(0,0,0,0.07); border:none;">\n' +
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
			'			<div class="col-md-12">\n' +
			'				<div editor-text>\n' +
			'					<label>请输入文本</label>\n' +
			'					<!-- <textarea placeholder="请输入问题标题..." rows=4 style="width: 100%;"></textarea> -->\n' +
			'				</div>\n' +
			'			</div>\n' +
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
		
		// 2. 加载Wysiwyg Editor
		$question.find('[editor-text]').append(getEditor(localIDGenerator()));

		obj.loadAnswer(json, $question);
		$question.find('.editor')
			.css({
				'background-color': 'white'
			})
			.html(json.text);
		
		
		
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
					$question.siblings().find('[question-btn] [question-action="confirmEdit"]').click();
					break;
				case 'confirmEdit':
					if($question.find('[editor-text] textarea').val() == ''){
						callAlert('文本不能为空！');
					}else{
						$(this).replaceWith('<div class="btn btn-primary btn-sm" question-action="activateEditor"><i class="fa fa-tag"></i> 编辑</div>');
						$question.removeClass('active');
						var data = $questionToJson($question);
						console.log(data);
						new QUESTION_MAP[json.type]().loadAnswer($questionToJson($question), $question);
					}
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
		
		return $question;
	};
	
	this.getJson = function($question){
		var json = {};
		json.lid = $question.attr('question-lid');
		json.type = $question.attr('question-type');
		json.text = $question.find('[editor-text] .editor').html();
		return json;
	};
	
	this.loadAnswer = function(data, $question){
		var $container = $question.find('[question-answer]').empty();
		$container.html(data.text);
	};
}

var Rating = function(){
	SingleSelect.call(this);
	this.loadAnswer = function(data, $question){
		var options = data.options;
		var $container = $question.find('[question-answer]').empty();
		$.each(options, function(index, item){
			
			var $option = $(
			'<span class="option rate" data-id="' + item.lid + '">\n' +
			'	<i class="fa ' + (item.isDefault == 0 ? 'fa-circle-o' : 'fa-check-circle-o')  + '"></i> <span name="radioName">' + item.value + '</span>\n' +
			'</span>'
			)
			if(index == 0){
				$container.append('<span class="head">' + item.name + '</span>');
			}
			$container.append($option);
			
			if(index == options.length-1){
				$container.append('<span class="tail">' + item.name + '</span>');
			}
		});
	};
};

var Slide = function(){
	var q = new Question();
	var o = new Option();
	var obj = this;
	
	this.get$question = function(json){
		var $question = q.get$question(json);
		
		$question.find('[editor-basic]').after(
			'<div editor-option>\n' +
			'	<div>\n' +
			'		<span>最小值： </span>\n' +
			'		<input type="number" name="min" value="' + json.min + '"/>\n' +
			'		<span>最小值显示文本： </span>\n' +
			'		<input type="text" name="min_text" value="' + json.min_text + '" />\n' +
			'	</div>\n' +
			'	<div>\n' +
			'		<span>最小值： </span>\n' +
			'		<input type="number" name="max"  value="' + json.max + '" />\n' +
			'		<span>最小值显示文本： </span>\n' +
			'		<input type="text" name="max_text"  value="' + json.max_text + '" />\n' +
			'	</div>\n' +
			'</div>\n'
		);
		
		return $question;
	};
	
	this.getJson = function($question){
		var json = q.getJson($question);
		json.sub_type = $question.find('select[name="sub_type"] option:selected').val();
		
		json.min = $question.find('[editor-option] [name="min"]').val();
		json.min_text = $question.find('[editor-option] [name="min_text"]').val();
		json.max = $question.find('[editor-option] [name="max"]').val();
		json.max_text = $question.find('[editor-option] [name="max_text"]').val();
		
		return json;
	};
	
	this.loadAnswer = function(data, $question){
		var sub_type = data.sub_type;
		var $container = $question.find('[question-answer]').empty();
		var $input = $(
			'<div class="slide-block">\n' +
			'	<div>\n' +
			'		<span class="head">' + data.min_text + '(' + data.min + ')</span>\n' +
			'		<span class="pull-right tail">' + data.max_text + '(' + data.max + ')</span>\n' +
			'	</div>\n' +
			'	<input type="range" min="' + data.min + '" max="' + data.max + '" value="' +  (parseInt(data.min) + parseInt(data.max))/2 + '" id="slider_bar">\n' +
			'</div>\n'
		);

		$container.append($input);
		// $('#slider_bar').slider({ id: "pace_bar", min: 0, max: 10, value: 5 });
	};

};

var Ranking = function(){
	var q = new Question();
	var o = new Option({hasDefault: 0, hasValue: 0});
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
			var $o = o.get$option(item);
			$oContainer.find('tbody').append($o);
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
			'	<i class="fa ' + (item.isDefault == 0 ? 'fa-square-o' : 'fa-check-square-o')  + '"></i> <span name="radioName">' + item.name + '</span>\n' +
			'</div>'
			)
			$container.append($option);
		});
	};

};

// ####
var Row = function(){
	var obj = this;
	this.get$row = function(data){
		var $row = $(
			'<tr name="editorRow" id="">\n' +
			'	<td><input type="text" placeholder="请输入选项..." name="text"></td>\n' +
			'	<td><input type="text" name="name" style="width: 200px;"></td>\n' +
			'	<td>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-create"><i class="fa fa-plus"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-delete"><i class="fa fa-trash"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-moveup"><i class="fa fa-arrow-up"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-movedown"><i class="fa fa-arrow-down"></i></a>\n' +
			'	</td>\n' +
			'</tr>'
		);
		
		$row.attr('data-id', data.lid);
		$row.find('[name="text"]').val(data.text);
		$row.find('[name="name"]').val(data.name);
		
		
		$row.on('click', '[data-action]', function(){
			var actionType = $(this).attr('data-action');
			switch(actionType){
				case 'editor-create':
					$row.after(obj.get$row({
					lid: localIDGenerator(),
					text: '新的行名称',
					name: localIDGenerator()
				}));
					break;
				case 'editor-delete':
					if($row.siblings().length == 0){
						callAlert('选项列表不能为空！');
					}else
						$row.remove();
					break;
				case 'editor-moveup':
					$row.prev().before($row);
					break;
				case 'editor-movedown':
					$row.next().after($row);
					break;
				default:
					console.log('error');
					break;
			}
		});
		
		return $row;
	};
	
	this.getJson = function($row){
		var json = {};
		json.lid = $row.attr('data-id');
		json.text = $row.find('[name="text"]').val();
		json.name = $row.find('[name="name"]').val();
		
		return json;
	};
};

var Table = function(){
	var q = new Question();
	var obj = this;
	var r = new Row();
	
	this.get$question = function(json){

		var $question = q.get$question(json);
		// 7. @@@@
		var $row_editor = $(
			'<div editor-row style="margin-top: 10px;">\n' +
			'	<div style="font-size: 16px; padding-left: 15px;"><i class="fa fa-arrows-h"></i> 行选项</div>\n' +
			'	<table class="table table-hover">\n' +
			'		<!-- <caption>选项行选项</caption> -->\n' +
			'		<thead>\n' +
			'			<tr>\n' +
			'				<th>选项文字</th>\n' +
			'				<th>ID</th>\n' +
			'				<th>操作</th>\n' +
			'			</tr>\n' +
			'		</thead>\n' +
			'		<tbody>\n' +
			'		</tbody>\n' +
			'	</table>\n' +
			'</div>'
		);
		// ! 7. @@@@
		$question.find('[editor-constraint]').before('<div class="row row_editor"></div>')
		$question.find('.row_editor').append($row_editor);
		
		$.each(json.row, function(index, item){
			$row_editor.find('tbody').append(r.get$row(item));
		});
		
		$row_editor.on('change', '[name="editorRow"] [name="name"]', function(e){
			var value = $(this).val();
			var val_list = [];
			$(this).closest('[name="editorRow"]').siblings().each(function(index, item){
				val_list.push( $(item).find('[name="name"]').val());
			});
			// 其它
		});
		
		
		
		return $question;
	};
	
	this.getJson = function($question){
		var json = q.getJson($question);
		
		json.row = [];
		$question.find('[editor-row] [name="editorRow"]').each(function(index, item){
			json.row.push(r.getJson($(item)));
		});
		
		
		
		/* 
		var row_text = $question.find('[eidotr-row] textarea').val();
		json.row = [];
		row_text.split('\n').forEach(function(item){
			if(item != '')
				json.row.push(item);
		});
		 */
		return json;
	};
	
	this.loadAnswer = function(data, $question){
		var rows = data.row;
		var $container = $question.find('[question-answer]').empty();
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
				'<tr>\n' +
				'	<td class="row-name">' + item.text + '(<span style="color: red;">' + item.name + '</span>)' + '</td>\n' +
				'</tr>'
			);
			
			$table.find('tbody').append($tr);
		});
		$container.append($table);
	};
};
// ####


var Table_SingleSelect = function(){
	var t = new Table();
	var q = new Question();
	var o = new Option();
	var obj = this;
	
	this.get$question = function(json){
		$question = t.get$question(json);
		
		// add options
		var $oContainer = $(
			'<div editor-option class="">\n' +
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
		$question.find('.row_editor').append($oContainer);
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
		var json = t.getJson($question);

		json.options = [];
		$question.find('[editor-option] [name="editorOption"]').each(function(index, item){
			json.options.push(o.getJson($(item)));
		});
		
		return json;
	};
	
	this.loadAnswer = function(data, $question){
		t.loadAnswer(data, $question);
		var options = data.options;
		var $table = $question.find('[question-answer] table');
		
		$table.find('thead').append('<tr></tr>');
		var $h_tr = $table.find('thead tr').last();
		$h_tr.append('<td></td>');
		
		$.each(data.row, function(index1){
			var $b_tr = $table.find('tbody tr:nth-child(' +  (index1 + 1) + ')');
			$.each(options, function(index, item){
				if(index1 == 0)
					$h_tr.append('<th>' + item.name + '</th>');
				
				var $option = $(
				'<td class="option" data-id="' + item.lid + '">\n' +
				'	<i class="fa ' + (item.isDefault == 0 ? 'fa-circle-o' : 'fa-check-circle-o')  + '"></i>\n' +
				'</td>'
				)
				$b_tr.append($option);
			});
		});
	};
};

var Table_MultiSelect = function(){
	var t = new Table();
	var ts = new Table_SingleSelect();
	var q = new Question();
	var o = new Option();
	var obj = this;
	
	this.get$question = function(json){
		$question = ts.get$question(json);
		
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
		var json = ts.getJson($question);

		json.options = [];
		$question.find('[editor-option] [name="editorOption"]').each(function(index, item){
			json.options.push(o.getJson($(item)));
		});
		
		return json;
	};
	
	this.loadAnswer = function(data, $question){
		t.loadAnswer(data, $question);
		
		var options = data.options;
		var $table = $question.find('[question-answer] table');
		
		$table.find('thead').append('<tr></tr>');
		var $h_tr = $table.find('thead tr').last();
		$h_tr.append('<td></td>');
		
		$.each(data.row, function(index1){
			var $b_tr = $table.find('tbody tr:nth-child(' +  (index1 + 1) + ')');
			$.each(options, function(index, item){
				if(index1 == 0)
					$h_tr.append('<th>' + item.name + '</th>');
				
				var $option = $(
				'<td class="option" data-id="' + item.lid + '">\n' +
				'	<i class="fa ' + (item.isDefault == 0 ? 'fa-square-o' : 'fa-check-square-o')  + '"></i>\n' +
				'</td>'
				)
				$b_tr.append($option);
			});
		});
		
	};
};

/* 1. &&&&& */
var Table_Input = function(){
	var t = new Table();
	var q = new Question();
	var o = new Option();
	var r = new Row();
	var obj = this;
	
	
	this.get$question = function(json){
		var $question = q.get$question(json);
		// $question = t.get$question(json);
		// $question.find('[editor-constraint]').before('<div class="col-sm-9"></div>');	
		
		var $row_editor = $(
			'<div editor-row style="margin-top: 10px;">\n' +
			'	<div style="font-size: 16px; padding-left: 15px;"><i class="fa fa-arrows-h"></i> 行选项</div>\n' +
			'	<table class="table table-hover">\n' +
			'		<!-- <caption>选项行选项</caption> -->\n' +
			'		<thead>\n' +
			'			<tr>\n' +
			'				<th>选项文字</th>\n' +
			'				<th>ID</th>\n' +
			'				<th>默认值</th>\n' +
			'				<th>类型</th>\n' +
			'				<th>操作</th>\n' +
			'			</tr>\n' +
			'		</thead>\n' +
			'		<tbody>\n' +
			'		</tbody>\n' +
			'	</table>\n' +
			'</div>'
		);
		// ! 7. @@@@
		$question.find('[editor-constraint]').before('<div class="row row_editor"></div>')
		$question.find('.row_editor').append($row_editor);
		
		$.each(json.row, function(index, item){
			var $r = r.get$row(item);
			
			var $select = $(
				'<td><select name="sub_type"></select></td>\n'
			);
			
			for(var key in INPUT_SUBTYPE){
				$select.find('select').append('<option value="' + key + '" ' + (key == item.sub_type ? 'selected' : '') + '>' + INPUT_SUBTYPE[key].name + '</option>');
			}
			
			
			$r.find('td:nth-child(2)')
				.after($select)
				.after('<td><input type="text" name="row-default" value="' + item.default_input + '"></td>');
				
			
			$row_editor.find('tbody').append($r);
		});
		
		return $question;
	};
	
	
	this.getJson = function($question){
		var json = t.getJson($question);
		
		$question.find('[editor-row] [name="editorRow"]').each(function(index, item){
			json.row[index].default_input = $(this).find('[name="row-default"]').val();
			json.row[index].sub_type = $(this).find('select[name="sub_type"] option:selected').val();
			
		});
		
		return json;
	};
	
	this.loadAnswer = function(data, $question){
		t.loadAnswer(data, $question);
		var $table = $question.find('[question-answer] table');
		
		$table.find('thead').append('<tr></tr>');
		var $h_tr = $table.find('thead tr').last();
		$h_tr.append('<td></td>');
		
		$.each(data.row, function(index1, item){
			var $b_tr = $table.find('tbody tr:nth-child(' +  (index1 + 1) + ')');
			var $input = $(
			'<div class="input-group" style="margin: 5px 0 5px;">\n' +
			'	<div class="input-group-addon">\n' +
			'		<i class="fa fa-keyboard-o"></i>\n' +
			'	</div>\n' +
			'	<input type="text" value="' + item.default_input + '" class="form-control" placeholder="请输入..">\n' +
			'</div>'
			)
			$b_tr.append($input);
		});		
	};

};
/* 1. &&&&& */

var Table_SingleDropdown = function(){
	var t = new Table();
	var q = new Question();
	var o = new Option();
	var obj = this;
	
	Table_SingleSelect.call(this);
	this.loadAnswer = function(data, $question){
		t.loadAnswer(data, $question);
		var options = data.options;
		var $table = $question.find('[question-answer] table');
		
		$table.find('thead').append('<tr></tr>');
		var $h_tr = $table.find('thead tr').last();
		$h_tr.append('<td></td>');
		
		$.each(data.row, function(index1){
			var $b_tr = $table.find('tbody tr:nth-child(' +  (index1 + 1) + ')');
			var $select = $('<td><select style="width: 200px; margin: 5px 0 10px 0;"></select></td>');
			$.each(options, function(index, item){
				var $item = $('<option class="option" data-id="' + item.lid + '" value="' + item.value + '" ' + (item.isDefault ? 'selected' : '') + '>' + item.name +'</option>');
				
				$select.find('select').append($item);
			});
			$b_tr.append($select);
		});
	};
};

var Table_Rating = function(){
	var t = new Table();
	var q = new Question();
	var o = new Option();
	var obj = this;
	
	Table_SingleSelect.call(this);
	this.loadAnswer = function(data, $question){
		t.loadAnswer(data, $question);
		var options = data.options;
		var $table = $question.find('[question-answer] table');
		
		$table.find('thead').append('<tr></tr>');
		var $h_tr = $table.find('thead tr').last();
		$h_tr.append('<td></td>');
		
		$table.find('tbody').prepend('<tr class="value-row"></tr>');
		var $b_tr_value = $table.find('tbody tr:nth-child(1)');
		$b_tr_value.append('<td>分值</td>');
		
		$.each(data.row, function(index1){
			var $b_tr = $table.find('tbody tr:nth-child(' +  (index1 + 2) + ')');
			$.each(options, function(index, item){
				if(index1 == 0){
					$h_tr.append('<th>' + item.name + '</th>');
					$b_tr_value.append('<td>' + item.value + '</td>');
				}
					
				
				var $option = $(
				'<td class="option" data-id="' + item.lid + '">\n' +
				'	<i class="fa ' + (item.isDefault == 0 ? 'fa-circle-o' : 'fa-check-circle-o')  + '"></i>\n' +
				'</td>'
				)
				$b_tr.append($option);
			});
		});
	};
};

// 5. @@@@
var Col = function(){
	var c = this;
	
	var map = {
		'singleSelect': SingleSelectCol,
		'singleDropdown': SingleDropdownCol,
		'multiSelect': MultiSelectCol,
		'multiDropdown': MultiDropdownCol,
		'input': InputCol,
	};
	
	this.get$col = function(data){
		var obj = new map[data.type]();
		var $col = obj.get$col(data);
		
		$col.on('click', '[data-action]', function(){
			var actionType = $(this).attr('data-action');
			switch(actionType){
				case 'editor-edit':
					var current_data = obj.getJson($col);
					c.get$Editor(current_data, $col);
					break;
				case 'editor-delete':
					if($col.siblings().length == 0){
						callAlert('选项列表不能为空！');
					}else
						$col.remove();
					break;
				case 'editor-moveup':
					$col.prev().before($col);
					break;
				case 'editor-movedown':
					$col.next().after($col);
					break;
				default:
					console.log('error');
					break;
			}
		});
		
		return $col;
	};
	
	this.getJson = function($col){
		var type = $col.find('[name="type"]').attr('type');
		return new map[type]().getJson($col);
	};
	
	this.get$Answer = function(data){
		return new map[data.type]().get$Answer(data);
	};
	
	this.get$Editor = function(data, $col){
		console.log(data)
		var $editor = $(
			'<div class="modal fade">\n' +
			'	<div class="modal-dialog">\n' +
			'		<div class="modal-content">\n' +
			'			<div class="modal-header">\n' +
			'				<h5 class="modal-title">编辑列属性</h5>\n' +
			'			</div>\n' +
			'			<div class="modal-body">\n' +
			'			</div>\n' +
			'			<div class="modal-footer">\n' +
			'				<button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>\n' +
			'				<button type="button" class="btn btn-primary" data-action="submit">保存</button>\n' +
			'			</div>\n' +
			'		</div>\n' +
			'	</div>\n' +
			'</div>\n'
		);
		
		var $basic_table = $(
			'<table class="table table-hover" basic-table data-id="' + data.lid + '" data-type="' + data.type + '">\n' +
			'	<thead>\n' +
			'		<tr>\n' +
			'			<th>属性名称</th>\n' +
			'			<th>属性详情</th>\n' +
			'		</tr>\n' +
			'	</thead>\n' +
			'	<tbody>\n' +
			'		<!-- <tr>\n' +
			'			<td>\n' +
			'				列数：\n' +
			'			</td>\n' +
			'			<td>\n' +
			'				第' + data.index + '列\n' +
			'			</td>\n' +
			'		</tr> -->\n' +
			'		<tr>\n' +
			'			<td>\n' +
			'				类型：\n' +
			'			</td>\n' +
			'			<td>\n' +
			'				<span name="type" data-type=' + data.type + '>' + QUESTION_DEFAULT_JSON_MAP[data.type].text + '</span>\n' +
			'			</td>\n' +
			'		</tr>\n' +
			'		<tr>\n' +
			'			<td>\n' +
			'				问题：\n' +
			'			</td>\n' +
			'			<td>\n' +
			'				<input type="text" name="title" placeholder="请输入问题" value="' + data.title + '">\n' +
			'			</td>\n' +
			'		</tr>\n' +
						'		<tr>\n' +
			'			<td>\n' +
			'				关键词：\n' +
			'			</td>\n' +
			'			<td>\n' +
			'				<input type="text" name="key" placeholder="请输入问题" value="' + data.key + '">\n' +
			'			</td>\n' +
			'		</tr>\n' +
			'		<tr>\n' +
			'			<td>\n' +
			'				提示信息：\n' +
			'			</td>\n' +
			'			<td>\n' +
			'				<input type="text" name="tooltip" placeholder="请输入提示" value="' + data.tooltip + '">\n' +
			'			</td>\n' +
			'		</tr>\n' +
			'		<tr>\n' +
			'			<td>\n' +
			'				必填：\n' +
			'			</td>\n' +
			'			<td>\n' +
			'				<input type="checkbox" name="required" ' + (data.required == 1 ? 'checked' : '') + '>\n' +
			'			</td>\n' +
			'		</tr>\n' +
			'	</tbody>\n' +
			'</table>\n'
		);
		$editor.find('.modal-body').append($basic_table);
		$editor.find('.modal-body').append($basic_table);
		
		var extra = new map[data.type]().get$Editor(data);
		extra.advance.forEach(function($item, index){
			
			$editor.find('.modal-body').append($item);
		});
		extra.addOn.forEach(function($item, index){
			$basic_table.find('tbody').append($item);
		});
		
		$editor.on('hidden.bs.modal', function(e){
			$(this).remove();
		});
		
		$editor.on('click', '[data-action="submit"]', function(e){
			
			var new_json = c.getEditorData($editor);
			if(new_json.error.length != 0) {
				var text = '';
				new_json.error.forEach(function(item, index){
					text += item + '\n';
				});
				callAlert(text);
			}else{
				var $new_col = c.get$col(new_json);
				$col.after($new_col);
				$col.remove();
				$editor.modal('hide');
			}
		});
		
		$editor.modal('show');
	};
	
	this.getEditorData = function($editor) {
		var json = {};
		var $basic = $editor.find('[basic-table]');
		
		json.lid = $basic.attr('data-id');
		json.key = $basic.find('[name="key"]').val();
		json.type = $basic.attr('data-type');
		json.title = $basic.find('[name="title"]').val();
		json.tooltip = $basic.find('[name="tooltip"]').val();
		json.required = $basic.find('[name="required"]').is(':checked') ? 1 : 0;
		
		json.error = [];
		if(json.title == '')
			json.error.push('问题不能为空！');
		if(json.key == '')
			json.error.push('关键词不能为空！');
		
		var sub_json = new map[json.type]().getEditorData($editor);
		var json = $.extend(json, sub_json);
		
		if(sub_json.sub_error != undefined)
			json.error = json.error.concat(sub_json.sub_error);
		return json;
	};
	
};

var SingleSelectCol = function(){
	var obj = this;
	this.get$col = function(data){
		var $col = $(
			'<tr name="editorCol" id="">\n' +
			'	<td name="type"></td>\n' +
			'	<td name="title"></td>\n' +
			'	<td name="options">\n' +
			'		<select>\n' +
			'		</select>\n' +
			' </td>\n' +
			'	<td name="key">\n' +
			' </td>\n' +
			'	<td>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-edit"><i class="fa fa-pencil"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-delete"><i class="fa fa-trash"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-moveup"><i class="fa fa-arrow-up"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-movedown"><i class="fa fa-arrow-down"></i></a>\n' +
			'	</td>\n' +
			'</tr>'
		);
		
		$col.attr({
			'data-id': data.lid,
			'data-required': data.required,
			'tooltip': data.tooltip
		});
		$col.find('[name="type"]').attr('type', data.type).html(QUESTION_DEFAULT_JSON_MAP[data.type].text);
		$col.find('[name="title"]').html(data.title);
		$col.find('[name="key"]').html(data.key);
		
		var $select = $col.find('[name="options"] select');
		data.options.forEach(function(item, index){
			var $o = $('<option isDefault="' + item.isDefault + '" lid="' + item.lid + '" value="' + item.value + '">' + item.name + '</option>\n');
			if(item.isDefault == 1)
				$o.prop('selected', 1);
			$select.append($o);
		});

		return $col;
	};
	
	this.getJson = function($col){
		var json = {};
		json.lid = $col.attr('data-id');
		json.required = $col.attr('data-required');
		json.tooltip = $col.attr('tooltip');
		json.type = $col.find('[name="type"]').attr('type');
		
		json.title = $col.find('[name="title"]').html();
		json.key = $col.find('[name="key"]').html();
		
		json.options = [];
		$col.find('[name="options"] select option').each(function(index, item){
			var $item = $(item);
			var option = {
				lid: $item.attr('lid'),
				name: $item.text(),
				value: $item.attr('value'),
				isDefault: $item.attr('isDefault') 
			};
			json.options.push(option);
		});
		return json;
	};
	
	this.get$Answer = function(data){
		var $answer = $(
			'<td>\n' +
			
			'</td>\n'
		);

		data.options.forEach(function(item, index){
			var $option = $(
				'<span class="option" data-id="' + item.lid + '">\n' +
				'	<i class="fa ' + (item.isDefault == 0 ? 'fa-circle-o' : 'fa-check-circle-o')  + '"></i> <span name="radioName">' + item.name + '</span>\n' +
				'</span>'
			);

			$answer.append($option);
		});
		
		return $answer;
	};
	
	this.get$Editor = function(data, $col){
		var $editor = $(
			'<table class="table table-hover" option-table>\n' +
			'	<thead>\n' +
			'		<tr>\n' +
			'			<th>选项文字</th>\n' +
			'			<th>默认</th>\n' +
			'			<th>值</th>\n' +
			'			<th>操作</th>\n' +
			'		</tr>\n' +
			'	</thead>\n' +
			'	<tbody>\n' +
			'	</tbody>\n' +
			'</table>\n'
		);
		
		var getOption = function(data) {
			var $o = $(
				'<tr option-item data-id="' + data.lid + '">\n' +
				'	<td>\n' +
				'		<input type="text" name="name" placeholder="请输入问题" value="' + data.name + '">\n' +
				'	</td>\n' +
				'	<td>\n' +
				'		<input type="checkbox" name="isDefault" ' + (data.isDefault == 1 ? 'checked' : '') + '>\n' +
				'	</td>\n' +
				'	<td>\n' +
				'		<input type="text" name="value" placeholder="请输入值" value="' + data.value + '">\n' +
				'	</td>\n' +
				'	<td>\n' +
				'		<a class="btn btn-primary btn-xs" data-action="editor-create"><i class="fa fa-plus"></i></a>\n' +
				'		<a class="btn btn-primary btn-xs" data-action="editor-delete"><i class="fa fa-trash"></i></a>\n' +
				'		<a class="btn btn-primary btn-xs" data-action="editor-moveup"><i class="fa fa-arrow-up"></i></a>\n' +
				'		<a class="btn btn-primary btn-xs" data-action="editor-movedown"><i class="fa fa-arrow-down"></i></a>\n' +
				'	</td>\n' +
				'</tr>\n'
			);
			
			
			$o.on('click', '[data-action]', function(){
				var actionType = $(this).attr('data-action');
				switch(actionType){
					case 'editor-create':
						var json = {
							lid: localIDGenerator(),
							name: '新的选项',
							value: 0,
							isDefault: 0
						};
						$o.after(getOption(json));
						break;
					case 'editor-delete':
						if($o.siblings().length == 0){
							callAlert('选项列表不能为空！');
						}else
							$o.remove();
						break;
					case 'editor-moveup':
						$o.prev().before($o);
						break;
					case 'editor-movedown':
						$o.next().after($o);
						break;
					default:
						console.log('error');
						break;
				}
			});
			
			return $o;
		};
		
		data.options.forEach(function(item, index){
			$editor.find('tbody').append(getOption(item));
		});
		
		return {
			advance: [$editor],
			addOn: []
		};
	};
	
	this.getEditorData = function($editor) {
		var json = {};
		
		
		
		var $table = $editor.find('[option-table]');
		json.options = []
		var total_default = 0
		$table.find('[option-item]').each(function(index, item){
			var option = {};
			option.lid = $(item).attr('data-id');
			option.name = $(item).find('[name="name"]').val();
			option.value = $(item).find('[name="value"]').val();
			option.isDefault = $(item).find('[name="isDefault"]').is(':checked') ? 1 : 0;
			total_default += option.isDefault
			
			json.options.push(option);
		});
		
		json.sub_error = [];
		type = $editor.find('[name="type"]').attr('data-type');
		if(type == 'singleSelect' || type == 'singleDropdown')
		if(total_default > 1 ){
			json.sub_error.push('单选，最多只能有一个默认项！');
		}
		
		return json;
	};
	
};

var SingleDropdownCol = function(){
	SingleSelectCol.call(this);
	
	this.get$Answer = function(data){
		var $answer = $(
			'<td>\n' +
			'	<select>\n' +
			'	</select>\n' +
			'</td>\n'
		);
		
		var $select = $answer.find('select');
		data.options.forEach(function(item, index){
			var $o = $('<option isDefault="' + item.isDefault + '" lid="' + item.lid + '" value="' + item.value + '">' + item.name + '</option>\n');
			if(item.isDefault == 1)
				$o.prop('selected', 1);
			$select.append($o);
		});
		
		return $answer;
	};
};

var MultiSelectCol = function(){
	var ssc = new SingleSelectCol();
	this.get$col = function(data){
		var $col = ssc.get$col(data);
		
		$col.attr({
			'min': data.min,
			'max': data.max,
		});
		
		return $col;
	};
	
	this.getJson = function($col){
		var json = ssc.getJson($col);;
		json.min = $col.attr('min');
		json.max = $col.attr('max');
		
		return json;
	};
	
	this.get$Answer = function(data){
		var $answer = $(
			'<td>\n' +
			
			'</td>\n'
		);

		data.options.forEach(function(item, index){
			var $option = $(
				'<span class="option" data-id="' + item.lid + '">\n' +
				'	<i class="fa ' + (item.isDefault == 0 ? 'fa-square-o' : 'fa-check-square-o')  + '"></i> <span name="radioName">' + item.name + '</span>\n' +
				'</span>'
			);

			$answer.append($option);
		});
		
		return $answer;
	};
	
	this.get$Editor = function(data, $col){
		var $table = new SingleSelectCol().get$Editor(data);
		
		var $addOn = $(
			'<tr>\n' +
			'	<th>最少选几项：</th>\n' +
			'	<td><input type="number" name="min" value="' + data.min + '"></td>\n' +
			'</tr>\n' +
			'<tr>\n' +
			'	<th>最多选几项：</th>\n' +
			'	<td><input type="number" name="max" value="' + data.max + '"></td>\n' +
			'</tr>\n'
		);
		
		return {
			advance: $table.advance,
			addOn: [$addOn]
		};
	};
	
	this.getEditorData = function($editor) {
		var json = new SingleSelectCol().getEditorData($editor);
		
		var $basic = $editor.find('[basic-table]');
		json.min = $basic.find('[name=min]').val();
		json.max = $basic.find('[name=max]').val();
		
		return json;
	};
};

var MultiDropdownCol = function(){
	MultiSelectCol.call(this);
	
	this.get$Answer = function(data){
		var $answer = $(
			'<td>\n' +
			'	<select multiple style="height: 50px;">\n' +
			'	</select>\n' +
			'</td>\n'
		);
		
		var $select = $answer.find('select');
		data.options.forEach(function(item, index){
			var $o = $('<option isDefault="' + item.isDefault + '" lid="' + item.lid + '" value="' + item.value + '">' + item.name + '</option>\n');
			if(item.isDefault == 1)
				$o.prop('selected', 1);
			$select.append($o);
		});
		
		return $answer;
	};
};

/* 3. &&&&& */
var InputCol = function(){
	var obj = this;
	this.get$col = function(data){
		var $col = $(
			'<tr name="editorCol" id="">\n' +
			'	<td name="type"></td>\n' +
			'	<td name="title"></td>\n' +
			'	<td name="sub_type"></td>\n' +
			'	<td name="key"></td>\n' +
			'	<td>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-edit"><i class="fa fa-pencil"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-delete"><i class="fa fa-trash"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-moveup"><i class="fa fa-arrow-up"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-movedown"><i class="fa fa-arrow-down"></i></a>\n' +
			'	</td>\n' +
			'</tr>'
		);
		
		
		$col.attr({
			'data-id': data.lid,
			'required': data.required,
			'tooltip': data.tooltip,
			'max': data.max,
			'max_num': data.max_num,
			'min_num': data.min_num,
			'default_input': data.default_input,
		});
		$col.find('[name="type"]').attr('type', data.type).html(QUESTION_DEFAULT_JSON_MAP[data.type].text);
		$col.find('[name="title"]').html(data.title);
		$col.find('[name="sub_type"]')
			.html('[输入类型] ' + INPUT_SUBTYPE[data.sub_type].name)
			.attr('type', data.sub_type);
		$col.find('[name="key"]').html(data.key);
	
		return $col;
	};
	
	this.getJson = function($col){
		var json = {};
		json.lid = $col.attr('data-id');
		json.required = $col.attr('required');
		json.tooltip = $col.attr('tooltip');
		json.type = $col.find('[name="type"]').attr('type');
		json.sub_type = $col.find('[name="sub_type"]').attr('type');
		json.title = $col.find('[name="title"]').html();
		json.key = $col.find('[name="key"]').html();
		json.max = $col.attr('max');
		json.max_num = $col.attr('max_num');
		json.min_num = $col.attr('min_num');
		json.default_input = $col.attr('default_input');
		
		return json;
	};
	
	this.get$Answer = function(data){
		var $input = $(
			'<td>\n' +
			'	<div class="input-group" style="margin: auto;">\n' +
			'		<div class="input-group-addon">\n' +
			'			<i class="fa ' + INPUT_SUBTYPE[data.sub_type].icon + '"></i>\n' +
			'		</div>\n' +
			'		<input value="' + data.default_input + '" type="text" class="form-control" placeholder="' + INPUT_SUBTYPE[data.sub_type].placeholder + '">\n' +
			'	</div>\n' +
			'</td>\n'
		);
		
		return $input;
	};
	
	this.get$Editor = function(data, $col){
		var $addOn = $(
			'<tr>\n' +
			'	<th>输入类型：</th>\n' +
			'	<td>\n' +
			'		<select name="sub_type">\n' +
			'		</select>\n' +
			'	</td>\n' +
			'</tr>\n'
		);
		
		var addAddition = function(type) {
			$addOn.siblings('[addition]').remove();
			if(type == 'default'){
				return $(
					'<tr addition>\n' +
					'	<th>字符限制：</th>\n' +
					'	<td><input type="number" name="max" value="' + data.max + '"></td>\n' +
					'</tr>\n'
				);
			}else if(type == 'number') {
				return $(
					'<tr addition>\n' +
					'	<th>上限：</th>\n' +
					'	<td><input type="number" name="max_num" value="' + data.max_num + '"></td>\n' +
					'</tr>\n' +
					'<tr addition>\n' +
					'	<th>下限：</th>\n' +
					'	<td><input type="number" name="min_num" value="' + data.min_num + '"></td>\n' +
					'</tr>\n'
				);
			}
		};
		
		var $sub_type = $addOn.find('[name="sub_type"]');
		for(var key in INPUT_SUBTYPE){
			$sub_type.append('<option value="' + key + '" ' + (data.sub_type == key ? 'selected' : '') + '>' + INPUT_SUBTYPE[key].name + '</option>');
		}
		
		
		$sub_type.on('change', function(e){
			$addOn.after(addAddition(this.value));
		});

		var $default_input = $(
			'<tr>\n' +
			'	<th>默认值</th>\n' +
			'	<td>\n' +
			'		<input type="text" name="default_input" value="' + data.default_input + '">\n' +
			'	</td>\n' +
			'</tr>\n'
		);
		
		
		return {
			advance: [],
			addOn: [$addOn, addAddition(data.sub_type), $default_input]
		};
	};
	
	this.getEditorData = function($editor) {
		var json = {};
		var $basic = $editor.find('[basic-table]');
		
		json.max = $basic.find('[name="max"]').val();
		json.min_num = $basic.find('[name="min_num"]').val();
		json.max_num = $basic.find('[name="max_num"]').val();
		json.default_input = $basic.find('[name="default_input"]').val();
		json.sub_type = $basic.find('[name="sub_type"] :selected').val();
		
		json.sub_error = [];
		if(json.sub_type == 'default'){
			if(json.max <= 0)
				json.sub_error.push('最小字符数必须大于0！');
		}else if(json.sub_type == 'number') {
			if(json.min_num > json.max_num)
				json.sub_error.push('数值下限不能大于上限！');
		}
		
		return json;
	};
	
};
/* 3. &&&&& */

const NESTED_COL_MAP = [
	{
		name: '单项',
		action_name: 'singleSelect',
		icon: 'fa-check-circle-o'
	},
	{
		name: '多项',
		action_name: 'multiSelect',
		icon: 'fa-check-square-o'
	},
	{
		name: '单项下拉框',
		action_name: 'singleDropdown',
		icon: 'fa-align-justify'
	},
	{
		name: '多项下拉框',
		action_name: 'multiDropdown',
		icon: 'fa-list'
	},
	{
		name: '填空',
		action_name: 'input',
		icon: 'fa-th'
	}
];
var Table_Nested = function(){
	var t = new Table();
	// var q = new Question();
	// var o = new Option();
	var c = new Col();
	var obj = this;
	
	this.get$question = function(json){
		$question = t.get$question(json);
		
		// add options
		var $colContainer = $(
			'<div editor-col class="">\n' +
			'	<div style="font-size: 16px; padding-left: 15px;"><i class="fa fa-arrows-h"></i> 列选项</div>\n' +
			'	<div class="col-tool-bar"style="padding-left: 15px;">\n' +
			'		<span><i class="fa fa-plus"></i> 添加:</span>\n' +
			' </div>\n' +
			'	<table class="table table-hover">\n' +
			'		<thead>\n' +
			'			<tr>\n' +
			'				<th>题型</th>\n' +
			'				<th>问题</th>\n' +
			'				<th>详情</th>\n' +
			'				<th>关键字</th>\n' +
			'				<th>操作</th>\n' +
			'			</tr>\n' +
			'		</thead>\n' +
			'		<tbody>\n' +
			'		</tbody>\n' +
			'	</table>\n' +
			'</div>'
		);
		
		NESTED_COL_MAP.forEach(function(item, index){
			$colContainer.find('.col-tool-bar').append('<div class="btn btn-default btn-sm" col-add-type="' + item.action_name + '"><i class="fa ' + item.icon + '"></i> ' + item.name + '</div>\n');
		});
		
		$colContainer.on('click', '[col-add-type]', function(e){
			var actionType = $(this).attr('col-add-type');
			$colContainer.find('tbody').append(c.get$col(QUESTION_DEFAULT_JSON_MAP[actionType].getDefaultJson()));
		});
		
		$question.find('.row_editor').append($colContainer);
		$.each(json.col, function(index, item){
			$colContainer.find('tbody').append(c.get$col(item));
		});
				
		return $question;
	};
	
	this.getJson = function($question){
		var json = t.getJson($question);

		json.col = [];
		$question.find('[editor-col] [name="editorCol"]').each(function(index, item){
			json.col.push(c.getJson($(item)));
		});
		
		return json;
	};
	
	this.loadAnswer = function(data, $question){
		t.loadAnswer(data, $question);
		var $table = $question.find('[question-answer] table');
		
		$table.find('thead').append('<tr></tr>');
		var $h_tr = $table.find('thead tr').last();
		$h_tr.append('<td></td>');
		
		$.each(data.row, function(index1){
			var $b_tr = $table.find('tbody tr:nth-child(' +  (index1 + 1) + ')');
			$.each(data.col, function(index, item){
				if(index1 == 0)
					$h_tr.append('<th>[<span style="color: red;">' + QUESTION_DEFAULT_JSON_MAP[item.type].text + '</span>]' + item.title  
						+	(item.required == 1 ? '[<span style="color: red;">必填</span>]' : '' ) + '(<span style="color: red;">' 
						+ item.key + '</span>)</th>');
				var $answer = c.get$Answer(item);

				$b_tr.append($answer);
			});
		});
	};
};
// ！5. @@@@ 


var Tag = function(){
	var q = new Question();
	var o = new Option();
	var obj = this;
	
	this.get$question = function(json){
		var $question = q.get$question(json);
		
		var $tagNumber = $(
			'<div data-type="tagNumber">\n' +
			'	<input type="checkbox" name="tag_max"><label>标签数量不超过: </label>  <input class="not-display" type="number" name="tag_max_num" style="width: 50px;"><br>\n' +
			'	<input type="checkbox" name="tag_text_max"><label>标签字数不超过：</label><input class="not-display" type="number" name="tag_text_max_num" style="width: 50px;">\n' +
			'</div>'
		);
		
		$tagNumber.on('click', '[type="checkbox"]', function(e){
			var name = $(this).attr('name');
			if($(this).prop('checked'))
				$tagNumber.find('[name=' + name + '_num]').removeClass('not-display');
			else
				$tagNumber.find('[name=' + name + '_num]').addClass('not-display');
		});
		
		
		$question.find('[editor-title]').after($tagNumber);
		return $question;
	};
	
	this.getJson = function($question){
		var json = q.getJson($question);
		
		json.tag_max = $question.find('[name="tag_max_num"]:not(.not-display)').val();
		json.tag_text_max = $question.find('[name="tag_text_max_num"]:not(.not-display)').val();
		return json;
	};
	
	this.loadAnswer = function(data, $question){
		var $container = $question.find('[question-answer]').empty();
		var $input = $(
			'<div class="input-group" style="margin: 5px 0 5px;">\n' +
			'	<div class="input-group-addon">\n' +
			'		<i class="fa fa-tags"></i>\n' +
			'	</div>\n' +
			'	<input type="text" class="form-control" placeholder="请输入标签...">\n' +
			'</div>\n'
		);
		$container.append($input);
	};
};

/* 4. #@#@ */
var TagButton = function(){
	var q = new MultiSelect();
	var o = new Option();
	var obj = this;
	
	this.get$question = function(json){
		var $question = q.get$question(json);
		
		$question.off('keyup');
		$question.on('keyup', '[editor-option] input[name="min"], [editor-option] input[name="max"]', function(){
			var value = $(this).val();
			var limit = $question.find('[name="editorOption"]').length;
			var type = $(this).attr('name')
			if(value == ''){
				
			}else if(parseInt(value) == value && parseInt(value)>=0){
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
			}else{
				callAlert('请输入大于等于0的整数!');
				$(this).val('');
			}
		});
		return $question;
	};
	
	this.getJson = function($question){
		var json = q.getJson($question);
		return json;
	};
	
	this.loadAnswer = function(data, $question){
		var $container = $question.find('[question-answer]').empty();
		var $input = $(
			'<ul data-type="tag-container" style="min-height: 35px;"></ul>\n'
		);
		
		data.options.forEach(function(item, index){
			if(item.isDefault == 1){
				var $btn = $(
					'<li style="margin-right: 5px;">\n' +
					'	<span data-value="' + item.value + '" data-lid="' + item.lid + '">' + item.name + '</span> \n'+
					'</li>\n'
				);
				$input.append($btn);
			}
			
			
		});
		
		$container.append($input);
	};
};

var ColorPicker = function(){
	var q = new Question();
	var o = new Option();
	var obj = this;
	
	this.get$question = function(json){
		var $question = q.get$question(json);
		
		var $input = $(
			'<div class="input-group" style="margin: 5px 0 5px;">\n' +
			'	<div class="input-group-addon">\n' +
			'		<i class="fa fa-paint-brush"></i> 默认颜色: \n' +
			'	</div>\n' +
			'	<input class="form-control" value="' + json.default_color + '" type="color" name="color" style="width: 80px;">\n' +
			'</div>\n'
		);
		$question.find('[editor-constraint]').before($input);
		
		return $question;
	};
	
	this.getJson = function($question){
		var json = q.getJson($question);
		
		json.default_color = $question.find('[name="color"]').val();
		
		return json;
	};
	
	this.loadAnswer = function(data, $question){
		var $container = $question.find('[question-answer]').empty();
		var $input = $(
			'<div class="input-group" style="margin: 5px 0 5px;">\n' +
			'	<div class="input-group-addon">\n' +
			'		<i class="fa fa-paint-brush"></i> \n' +
			'	</div>\n' +
			'	<input class="form-control" disabled value="' + data.default_color + '" type="color" style="width: 80px;">\n' +
			'</div>\n'
		);
		$container.append($input);
	};
}
/* !4. #@#@ */

/* 4. ^^^^ */
var Option_Subject = function(opt){
	var obj = this;
	this.get$option = function(data){
		var $option = $(
			'<tr name="editorOption" id="">\n' +
			'	<td><input type="text" placeholder="请输入选项..." name="name"></td>\n' +
			'	<td><input type="text" name="key"></td>\n' +
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
		$option.find('[name="key"]').val(data.key);
		
		$option.on('click', '[data-action]', function(){
			var actionType = $(this).attr('data-action');
			switch(actionType){
				case 'editor-create':
					$option.after(obj.get$option({
					lid: localIDGenerator(),
					name: '新的选项',
					key: localIDGenerator()
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
		json.key = $option.find('[name="key"]').val();
		
		return json;
	};
};
var Counter = function(){
	var q = new Question();
	var o = new Option_Subject();
	var obj = this;
	
	this.get$question = function(json){
		var $question = q.get$question(json);
		$question.find('[editor-title]').closest('.col-md-6').remove();
		$question.find('[editor-key]').closest('.col-md-12')
			.addClass('col-md-6').removeClass('col-md-12');
		
		$question.find('[editor-key]')
			.after(
				'<div editor-title>\n' +
				'	<label>计数对象: </label>\n' +
				'	<input type="text" placeholder="请描述计数对象..." value="' + json.title + '">\n' +
				'</div>\n' +
				'<div editor-unit>\n' +
				'	<label>计数单位: </label>\n' +
				'	<input type="text" placeholder="请描述计数对象..." value="' + json.unit + '">\n' +
				'</div>\n' +
				'<div editor-onSite>\n' +
				'	<label>是否为现场计数: </label>\n' +
				'	<input type="checkbox"' + (json.onSite == 1 ? ' checked' : '') + '>\n' +
				'</div>\n' +
				'<div editor-timeLimit>\n' +
				'	<label>计数时长 (分钟): </label>\n' +
				'	<input type="checkbox">\n' +
				'	<input type="text" placeholder="请输入时间长度" style="margin-left: 10px;">\n' +
				'</div>\n'
			);
		$question.find('.col-md-6:nth-child(1) label').css('width', '150px');
		
		
		var time_display = ''
		if(json.timeLimit != '' && !isNaN(json.timeLimit)){
			time_display = parseInt(json.timeLimit)/60;
			$question.find('[editor-timeLimit] [type="checkbox"]').prop('checked', true);
			$question.find('[editor-timeLimit] [type="text"]')
				.val(time_display)
				.css('visibility', 'visible');
		}else{
			$question.find('[editor-timeLimit] [type="checkbox"]').prop('checked', false);
			$question.find('[editor-timeLimit] [type="text"]')
				.val(time_display)
				.css('visibility', 'hidden');
		}
		
		$question.on('click', '[editor-timeLimit] [type="checkbox"]', function(e){
			if(this.checked){
				$question.find('[editor-timeLimit] [type="text"]')
					.val('')
					.css('visibility', 'visible');
			}else{
				$question.find('[editor-timeLimit] [type="text"]')
					.val('')
					.css('visibility', 'hidden');
			}
		});
		
		// add options
		var $oContainer = $(
			'<div editor-option>\n' +
			'	<table class="table table-hover">\n' +
			'		<!-- <caption>选项设置</caption> -->\n' +
			'		<thead>\n' +
			'			<tr>\n' +
			'				<th>计数对象名称</th>\n' +
			'				<th>ID</th>\n' +
			'				<th>操作</th>\n' +
			'			</tr>\n' +
			'		</thead>\n' +
			'		<tbody>\n' +
			'		</tbody>\n' +
			'	</table>\n' +
			'</div>'
		);
		$question.find('[editor-constraint]').before($oContainer);	
		$.each(json.subjects, function(index, item){
			var $o = o.get$option(item)
			
			$oContainer.find('tbody').append($o);

		});
		
		return $question;
	};
	
	this.getJson = function($question){
		var json = q.getJson($question);
		
		json.subjects = [];
		$question.find('[editor-option] [name="editorOption"]').each(function(index, item){
			json.subjects.push(o.getJson($(item)));
		});
		
		json.title = $question.find('[editor-title] [type="text"]').val();
		json.unit = $question.find('[editor-unit] [type="text"]').val();
		json.onSite = $question.find('[editor-onSite] [type="checkbox"]').is(':checked') ? 1 : 0;
		json.timeLimit = $question.find('[editor-timeLimit] [type="text"]').val()*60;
		
		return json;
	};
	
	this.loadAnswer = function(data, $question){
		var $container = $question.find('[question-answer]').empty();
		
		var $block = $(
			'<div class="counter-container">\n' +
			'	<div class="head">\n' +
			'		<a class="btn btn-success btn-lg">开始</a>\n' +
			'		<a class="btn btn-default btn-lg">暂停</a>\n' +
			'		<a class="btn btn-danger btn-lg">结束</a>\n' +
			'		<a class="btn btn-warning btn-lg">重置</a>\n' +
			'		<div class="pull-right" class="display: inline-block;">\n' +
			'			<div current-time style="font-size: 24px;"></div>\n' +
			'			<div timer-counter>倒计时: <span>' + secToTime(data.timeLimit) + '</span></div>\n' +
			'		</div>\n' +
			'	</div>\n' +
			'	<div class="row body">\n' +
			'	</div>\n' +
			'</div>\n'
		);
		
		if(data.timeLimit == '')
			$block.find('[timer-counter]').css('display', 'none');
		
		if(data.onSite == 0)
			$block.find('[current-time]').css('display', 'none');
		else
			$block.find('[current-time]')
				.text(toHHMMSS(new Date()))
				.css('display', 'block');
		
		data.subjects.forEach(function(item, index){
			var $card = $(
				'<div class="col-sm-2">\n' +
				'	<div class="main-card">\n' +
				'		<div class="line-1">' + item.name + '</div>\n' +
				'		<div class="line-2"><i class="fa fa-plus-square-o"></i></div>\n' +
				'		<div class="line-3"> <span data-number>0</span> ' + data.unit + '</div>\n' +
				'	</div>\n' +
				'	<div class="sub-card">\n' +
				'		<i class="fa fa-minus-square-o"></i> \n' +
				'	</div>\n' +
				'</div>\n'
			);
			$block.find('.body').append($card);
		});
		
		
		$container.append($block);
		
		// $container.append($input);
	};
};
/* ! 4. ^^^^ */



const QC_FILTER = ['singleSelect', 'multiSelect', 'singleDropdown', 'multiDropdown'];

const QUESTION_MAP = {
	'singleSelect': SingleSelect,
	'singleDropdown': SingleDropdown,
	'multiSelect': MultiSelect,
	'multiDropdown': MultiDropdown,
	'input': Input,
	'file': File,
	'text': Text,
	'rating': Rating,
	'slide': Slide,
	'ranking': Ranking,
	'table_singleselect': Table_SingleSelect,
	'table_multiselect': Table_MultiSelect,
	'table_input': Table_Input,
	'table_singledropdown': Table_SingleDropdown,
	'table_rating': Table_Rating,
	// 4. @@@@ 添加多行多列
	'table_nested': Table_Nested,
	// ！4. @@@@ 添加多行多列
	/* 3. #@#@ */
	'tagButton': TagButton,
	'tag': Tag,
	'colorPicker': ColorPicker,
	/* !3. #@#@ */
	/* 3. ^^^^ */
	'counter': Counter,
	/* ! 3. ^^^^ */
};

var jsonTo$question = function(json){
	var type = json.type
	return new QUESTION_MAP[type]().get$question(json);
};

var $questionToJson = function($question){
	var type = $question.attr('question-type');
	
	return new QUESTION_MAP[type]().getJson($question);
};