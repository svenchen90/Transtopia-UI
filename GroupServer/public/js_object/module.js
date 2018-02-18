var ID = function () {
	return '_' + Math.random().toString(36).substr(2, 9);
};

/* 
	Json Data Format
	1. Single-select
	{	
		lid: String, //Local ID
		type: 'single-select',
		required: 0/1,
		question: String,
		tooltip: String,
		options: [
			{
				lid: String, //Local ID
				name: String,
				value: Number,
				isDefualt: 0/1
			}
		]
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
		options: [
			{
				lid: String, //Local ID
				name: String,
				value: Number,
				isDefault: 0/1
			}
		],
	}

	3. text
	{
		lid: String, //Local ID
		type: 'text',
		required: 0/1,
		question: String,
		tooltip: String,
		// no defualt value
		format: [
			'default', 'int', 'float', 'date', 'phone', 'email', 'password', 'url', 'chineseID'
		]
		// based on format
		advance: {}
	}

	4. Single dropdown (similar to single select)
	{
		lid: String, //Local ID
		type: 'single-dropdown',
		required: 0/1,
		question: String,
		tooltip: String,
		options: [
			{
				lid: String, //Local ID
				name: String,
				value: Number,
				isDefualt: 0/1
			}
		]
	}

	5. Multi-Dropdown (similar to single dropdown)
	{
		lid: String, //Local ID
		type: 'mult-dropdown',
		required: 0/1,
		question: String,
		tooltip: String,
		min: Number(-1 means not required),
		max: Number(-1 means not required)
		options: [
			{
				lid: String, //Local ID
				name: String,
				value: Number,
				isDefualt: 0/1
			}
		]
	}

	6. file
	{
		lid: String, //Local ID
		type: 'file',
		required: 0/1,
		question: String,
		tooltip: String,
		// Single File only
		allowedType: [],
		maxSize: Number(MB)
	} 
*/

/* Alpha 创建物品编辑模板 */
var initObjectEditor = function(json, versionID, objectID, callback){
	var $modal = $(
		'<div class="modal fade" id="templateEditor">\n' +
		'	<div class="modal-dialog"  style="width:60vw;">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close" data-dismiss="modal">\n' +
		'					&times;\n' +
		'				</button>\n' +
		'				<h4 class="modal-title">\n' +
		'					模板编辑\n' +
		'				</h4>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<nav class="navbar navbar-default">\n' +
		'					<div class="container-fluid">\n' +
		'					<div class="navbar-header">\n' +
		'						<button type="button" class="navbar-toggle" data-toggle="collapse"\n' +
		'								data-target="#tool-bar">\n' +
		'							<span class="sr-only">切换导航</span>\n' +
		'							<span class="icon-bar"></span>\n' +
		'							<span class="icon-bar"></span>\n' +
		'							<span class="icon-bar"></span>\n' +
		'						</button>\n' +
		'						<span class="navbar-brand"><i class="fa fa-chain"></i></span>\n' +
		'					</div>\n' +
		'					<div class="collapse navbar-collapse" id="tool-bar">\n' +
		'						<ul class="nav navbar-nav" data-container="toolbar">\n' +
		'							<li><a href="#" data-action="createRadio"><i class="fa fa-check-circle-o"></i> 单项</a></li>\n' +
		'							<li><a href="#" data-action="createCheckbox"><i class="fa fa-check-square-o"></i> 多项</a></li>\n' +
		'							<li><a href="#" data-action="createTextarea"><i class="fa fa-pencil"></i> 填空</a></li>\n' +
		'							<li><a href="#" data-action="createDropdown"><i class="fa fa-list"></i> 下拉框</a></li>\n' +
		'							<li><a href="#" data-action="createFile"><i class="fa fa-file-text-o"></i> 上传文件</a></li>\n' +
		'							<li><a href="#" data-action="createNumericInput"><i class="fa fa-arrows-v"></i> 数字输入</a></li>\n' +
		'							<li class="dropdown">\n' +
		'								<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
		'									其它 <b class="caret"></b>\n' +
		'								</a>\n' +
		'								<ul class="dropdown-menu">\n' +
		'									<li><a href="#">其它</a></li>\n' +
		'									<li class="divider"></li>\n' +
		'									<li><a href="#">其它</a></li>\n' +
		'								</ul>\n' +
		'							</li>\n' +
		'						</ul>\n' +
		'					</div>\n' +
		'					</div>\n' +
		'				</nav>\n' +
		'				<ul id="tab-bar" class="nav nav-tabs" style="margin: 0 50px 0 50px;">\n' +
		'					<!-- 标签列表 -->\n' +
		'					<a href="#" data-action="addTab" style="float: left;padding: 8px 15px; font-size: 19px;"><i class="fa fa-plus-square"></i></a>\n' +
		'				</ul>\n' +
		'				<div id="templateList" class="customized-scrollbar tab-content" style="height: 60vh; overflow-y: auto;">\n' +
		'					<!-- 标签分页 -->\n' +
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
		'</div>\n'
	);	
	
	// 添加tab栏
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
				.append('<a href="' + $(this).attr('data-href') + '" data-toggle="tab">' + $(this).val() + '</a>\n');
		})
		.on('keydown', 'input', function(event){
				if(event.keyCode == '13'){
					$(this).focusout();
				}
		});
	
	// C. 添加新的tab
	$modal.find('#tab-bar').on('click', '[data-action="addTab"]', function(){
		var index = $(this).closest('#tab-bar').find('li').length;
		
		var $newTab = $('<li><a href="#tab_' + index + '" data-toggle="tab">新建标签</a></li>');
		$(this).before($newTab);
		
		var $newContent = $(
			'<div class="tab-pane fade" id="tab_' + index + '">\n' +
			'</div>\n'
		);
		$modal.find('#templateList').append($newContent);
		
		$newContent
			.sortable({
				handle: ".question",
				placeholder: "template-placeholder",
				update: function( event, ui ) {
					renumbering($newContent);
				}
			})
			.disableSelection();
		
		$newTab.find('a').tab('show');
		$newTab.find('a').click();
		
	});
	// 添加tab栏
	
	
	var validation = function(){
		return true;
	};
	
	//初始化
	(function(){
		//1. 加载sortable、禁止select
		/* $modal.find('#templateList .tab-pane')
			.sortable({
				handle: ".question",
				placeholder: "template-placeholder",
				update: function( event, ui ) {
					renumbering($('#templateList .tab-pane.active'));
				}
			})
			.disableSelection(); */

		//2. 监听工具栏按钮
		var actionMap = {
			'createRadio' : generateRadio,
			'createCheckbox' : generateCheck,
			'createTextarea' : generateInput,
			'createDropdown' : generateDropdown,
			'createFile' : generateFile,
			'createNumericInput' :  generateInputNumber
		};
		
		$modal.find('[data-container="toolbar"] [data-action]').each(function(index, item){
			$(item).on('click', function(){
				var actionType = $(this).attr('data-action');
				var actionFunc = actionMap[actionType];
				
				clearActive();
				
				var $contentOfList = $modal.find('#templateList');
				var $item = actionFunc(true);
				$modal.find('#templateList .tab-pane.active').append($item)
				$modal.find('#templateList').scrollTop($modal.find('#templateList')[0].scrollHeight);	
				
				renumbering($('#templateList .tab-pane.active'));
			});
		});
		
		// 6. 提交
		$modal.find('[data-action="submit"]').on('click', function(){
			var json = getTemplateJson();
			console.log(json);
			
			updateVersion(versionID, json)
				.then(function(result){
					if(result == 1){
						callback(objectID);
						$modal.modal('hide');
					}
				})
				.catch(function(exception){
					console.log(exception);
				})
		});
		
				
		$modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
	
		// 通过json加载
		if(Array.isArray(json) && json.length > 0){
			if(validation(json)){
				$.each(json, function(index, tab){
					// ####
					var tabName = tab.name;
					var list = tab.list;

					var $newTab = $('<li><a href="#tab_' + index + '" data-toggle="tab">' + tabName + '</a></li>');
					$modal.find('#tab-bar [data-action="addTab"]').before($newTab);
					
					var $newContent = $(
						'<div class="tab-pane fade" id="tab_' + index + '">\n' +
						'</div>\n'
					);
					
					$.each(list, function(index, item){
						$newContent.append(generateByJson(item));
					});
					
					$modal.find('#templateList').append($newContent);
					renumbering($newContent);
					
					if(index == 0){
						$newContent.addClass('in active');
						$newTab.addClass('active');
					}
					
					$newContent
						.sortable({
							handle: '.question [name="question-title"]',
							placeholder: "template-placeholder",
							update: function( event, ui ) {
								renumbering($newContent);
							}
						})
						.disableSelection();
					
					
					
					
					// $modal.find('#templateList').append(generateByJson(item));
				});
				
			}else{
				console.log('error');
			}
		}else{
			//默认加载
			var $newTab = $('<li><a href="#tab_0" data-toggle="tab">默认</a></li>');
			$modal.find('#tab-bar [data-action="addTab"]').before($newTab);
			
			var $newContent = $(
				'<div class="tab-pane fade in active" id="tab_0">\n' +
				'</div>\n'
			);
			
			$modal.find('#templateList').append($newContent);
			
			$newContent
						.sortable({
							handle: '.question [name="question-title"]',
							placeholder: "template-placeholder",
							update: function( event, ui ) {
								renumbering($newContent);
							}
						})
						.disableSelection();
		}
		
		
		$modal.modal('show');
	})();
};


// A. 选项生成
// 1. 添加单选
var generateRadio = function(isActive, data){
	var $item = $(
		'<div class="template-item" data-type="radio">\n' +
		'	<div class="question">\n' +
		'		<span name="question-number"></span>\n' +
		'		<span name="question-title"></span>\n' +
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
		'				<input type="checkbox" name="required"> 必选\n' +
		'			</div>\n' +
		'		</div>\n' +
		'		<table class="table table-hover">\n' +
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
	
	// 1. 加载
	var load = function(data){
		console.log(Math.random().toString(36));
		var title, radios;
		if(data){
			title = data.title;
			radios = data.radios;			
		}
		
		console.log(title);
		
		// 加载标题
		if(title){
			$item.find('[name="question-title"]').text(title);
		}else{
			$item.find('[name="question-title"]').text('请输入问题');
		}
		
		// 加载提示
		var msg_html =  (data.required == 1 ? '<div>必填</div>' : '') + (data.tooltip != '' ? '<div>' + data.tooltip + '</div>' : '');
		if(msg_html != ''){
			$item.find('[name="tooltip"]').attr('title', msg_html);
		}else{
			$item.find('[name="tooltip"]').css('display', 'none');
		}
		
		// 加载选项
		$item.find('.answer').empty();
		if(radios == undefined || radios == '' || radios.length == 0){
			radios = ['选项一','选项二'];
		}
		
		$.each(radios, function(idx,i){
			var $temp = $(
				'<div class="radio">\n' +
				'	<i class="fa fa-circle-o"></i> <span name="radioName">' + i + '</span>\n' +
				'</div>'
			);
			$item.find('.answer').append($temp);
		});
		
	};
	
	// 2. 获取数据
	var getData = function(){
		var title = $item.find('[name="question-title"]').text();
		var radios = [];
		$.each($item.find('[name="radioName"]'), function(index, item){
			radios.push($(item).text());
		});
		return {
			title: title,
			radios: radios
		};
	};
	
	// Editor
	// 3. 激活编辑
	var activateEditor = function(){
		$item.addClass('active');
		var title = $item.find('[name="question-title"]').text();
		$item.find('.editor [name="title"]').val(title);
		
		var container = $item.find('.editor tbody');
		container.empty();
		$.each($item.find('.answer .radio [name="radioName"]'), function(index, item){
			var content = $(item).text();
			container.append(getEditorRadio(content));
		});
		if($item.find('[name="editorRadio"]').length == 0)
			$item.find('.editor tbody').append(getEditorRadio());
		
		$item.find('[data-action="activateEditor"]').replaceWith('<div class="btn btn-success btn-sm" data-action="confrimEdit"><i class="fa fa-check"></i> 完成</div>');
	}
	
	// 4. 获取数据
	var getEditorData = function(){
		var result = {
			title : $item.find('.editor [name="title"]').val()
		};
		
		var list = [];
		$.each($item.find('[name="editorRadio"] input'), function(index, item){
			list.push($(item).val());
		});
		result.radios = list;
		return result;
	};
	
	// 按钮列表样式
	var getEditorRadio = function(item){
		return $(
			'<tr name="editorRadio">\n' +
			'	<td><input type="text" placeholder="请输入选项..." value="' + (item.name ? item.name : '') + '"></td>\n' +
			'	<td><input type="checkbox"></td>\n' +
			'	<td><input type="number" style="width: 50px;"></td>\n' +
			'	<td>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-create"><i class="fa fa-plus"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-delete"><i class="fa fa-trash"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-moveup"><i class="fa fa-arrow-up"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-movedown"><i class="fa fa-arrow-down"></i></a>\n' +
			'	</td>\n' +
			'</tr>'
		);
	};
	
	// Editor时间监听
	// 创建新的radio
	// 1. 新建
	$item.on('click', '[data-action="editor-create"]', function(){
		$item.find('.editor tbody').append(getEditorRadio());
	});
	// 2. 删除
	$item.on('click', '[data-action="editor-delete"]', function(){
		$(this).closest('[name="editorRadio"]').remove();
		if($item.find('[name="editorRadio"]').length == 0)
			$item.find('.editor tbody').append(getEditorRadio());
	});
	// 3. 上移
	$item.on('click', '[data-action="editor-moveup"]', function(){
		var $current = $(this).closest('[name="editorRadio"]');
		$current.prev().before($current);
	});
	// 3. 下移
	$item.on('click', '[data-action="editor-movedown"]', function(){
		var $current = $(this).closest('[name="editorRadio"]');
		$current.next().after($current);
	});
	
	
	// 初始化
	(function(){
		load(data);
		//激活按钮组件
		activateToolBtn($item, load, getData, activateEditor, getEditorData, thisFunction);

		// 是否展开editor
		if(isActive)
			activateEditor();
	})();
	// 加载
	
	return $item;
};

// 2. 添加多选
var generateCheck = function(isActive, data){
	var test = 0;
	var $item = $(
		'<div class="template-item" data-type="check">\n' +
		'	<div class="question">\n' +
		'		<span name="question-number"></span>\n' +
		'		<span name="question-title"></span>\n' +
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
		'			<div class="input-group col-md-6">\n' +
		'				<label>请输入问题</label>\n' +
		'				<textarea name="title" placeholder="请输入问题标题..." rows=4 style="width: 100%;"></textarea>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'		<table class="table table-hover">\n' +
		'			<!-- <caption>选项设置</caption> -->\n' +
		'			<thead>\n' +
		'				<tr>\n' +
		'					<th>选项文字</th>\n' +
		'					<th>操作</th>\n' +
		'				</tr>\n' +
		'			</thead>\n' +
		'			<tbody>\n' +
		'			</tbody>\n' +
		'		</table>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	
	// 1. 加载样式
	var load = function(data){
		var title, radios;
		if(data){
			title = data.title;
			radios = data.radios;
		}

		// 加载标题
		if(title){
			$item.find('[name="question-title"]').text(title);
		}else{
			$item.find('[name="question-title"]').text('请输入问题');
		}
		
		// 加载选项
		$item.find('.answer').empty();
		if(radios == undefined || radios == '' || radios.length == 0){
			radios = ['选项一','选项二'];
		}
		$.each(radios, function(idx,i){
			var $temp = $(
				'<div class="radio">\n' +
				'	<i class="fa fa-square-o"></i> <span name="radioName">' + i + '</span>\n' +
				'</div>'
			);
			$item.find('.answer').append($temp);
		});
	};
	
	// 2. 获取问题数据
	var getData = function(){
		var title = $item.find('[name="question-title"]').text();
		var radios = [];
		$.each($item.find('[name="radioName"]'), function(index, item){
			radios.push($(item).text());
		});
		return {
			title: title,
			radios: radios
		};
	};
		
	// Editor
	// 3. 激活编辑
	var activateEditor = function(){
		$item.addClass('active');
		var title = $item.find('[name="question-title"]').text();
		$item.find('.editor [name="title"]').val(title);
		
		var container = $item.find('.editor tbody');
		container.empty();
		$.each($item.find('.answer .radio [name="radioName"]'), function(index, item){
			var content = $(item).text();
			container.append(getEditorRadio(content));
		});
		if($item.find('[name="editorRadio"]').length == 0)
			$item.find('.editor tbody').append(getEditorRadio());
		
		$item.find('[data-action="activateEditor"]').replaceWith('<div class="btn btn-success btn-sm" data-action="confrimEdit"><i class="fa fa-check"></i> 完成</div>');
	}
	
	// 4. 获取编辑栏数据
	var getEditorData = function(){
		var result = {
			title : $item.find('.editor [name="title"]').val()
		};
		
		var list = [];
		$.each($item.find('[name="editorRadio"] input'), function(index, item){
			list.push($(item).val());
		});
		result.radios = list;
		return result;
	};
	
	// 按钮列表样式
	var getEditorRadio = function(value){
		return $(
			'<tr name="editorRadio">\n' +
			'	<td><input type="text" placeholder="请输入选项..." value="' + (value ? value : '') + '"></td>\n' +
			'	<td>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-create"><i class="fa fa-plus"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-delete"><i class="fa fa-trash"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-moveup"><i class="fa fa-arrow-up"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-movedown"><i class="fa fa-arrow-down"></i></a>\n' +
			'	</td>\n' +
			'</tr>'
		);
	};
	
	// Editor时间监听
	// 创建新的radio
	// 1. 新建
	$item.on('click', '[data-action="editor-create"]', function(){
		console.log(test);
		test ++;
		$item.find('.editor tbody').append(getEditorRadio());
	});
	// 2. 删除
	$item.on('click', '[data-action="editor-delete"]', function(){
		console.log(test);
		test ++;
		$(this).closest('[name="editorRadio"]').remove();
		if($item.find('[name="editorRadio"]').length == 0)
			$item.find('.editor tbody').append(getEditorRadio());
	});
	// 3. 上移
	$item.on('click', '[data-action="editor-moveup"]', function(){
		var $current = $(this).closest('[name="editorRadio"]');
		$current.prev().before($current);
	});
	// 3. 下移
	$item.on('click', '[data-action="editor-movedown"]', function(){
		var $current = $(this).closest('[name="editorRadio"]');
		$current.next().after($current);
	});
	
	
	var thisFunction = arguments.callee;
	(function(){
		// 加载
		load(data);
		
		// 是否展开editor
		if(isActive)
			activateEditor();
		
		// 激活功能按钮
		activateToolBtn($item, load, getData, activateEditor, getEditorData, thisFunction)
	})();

	
	return $item;
};

// 3. 添加填空
var generateInput = function(isActive, data){
	var $item = $(
		'<div class="template-item" data-type="input">\n' +
		'	<div class="question">\n' +
		'		<span name="question-number"></span>\n' +
		'		<span name="question-title"></span>\n' +
		'	</div>\n' +
		'	<div class="answer">\n' +
		'  <textarea class="col-md-6" rows=1 style="background-color: white;resize: none; margin: 10px 0 10px" disabled></textarea>\n' +
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
		'			<div class="input-group col-md-6">\n' +
		'				<label>请输入问题</label>\n' +
		'				<textarea name="title" placeholder="请输入问题标题..." rows=4 style="width: 100%;"></textarea>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	
	// 1. 加载样式
	var load = function(data){
		var title;
		if(data){
			title = data.title;
		}
		
		// 加载标题
		if(title){
			$item.find('[name="question-title"]').text(title);
		}else{
			$item.find('[name="question-title"]').text('请输入问题');
		}
	};
	
	// 2. 获取问题数据
	var getData = function(){
		var title = $item.find('[name="question-title"]').text();
		return {
			title: title
		};
	};
	
	// Editor
	// 3. 激活编辑
	var activateEditor = function(){
		$item.addClass('active');
		var title = $item.find('[name="question-title"]').text();
		$item.find('.editor [name="title"]').val(title);
		
		$item.find('[data-action="activateEditor"]').replaceWith('<div class="btn btn-success btn-sm" data-action="confrimEdit"><i class="fa fa-check"></i> 完成</div>');
	}
	
	// 4. 获取数据
	var getEditorData = function(){
		var result = {
			title : $item.find('.editor [name="title"]').val()
		};
		return result;
	};
	
	var thisFunction = arguments.callee;
	(function(){
		// 加载
		load(data);

		// 是否展开editor
		if(isActive)
			activateEditor();
		
		// 激活功能按钮
		activateToolBtn($item, load, getData, activateEditor, getEditorData, thisFunction);
	})();
	return $item;
};

// 4. 下拉框
var generateDropdown = function(isActive, data){
	var $item = $(
		'<div class="template-item" data-type="dropdown">\n' +
		'	<div class="question">\n' +
		'		<span name="question-number"></span>\n' +
		'		<span name="question-title"></span>\n' +
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
		'			<div class="input-group col-md-6">\n' +
		'				<label>请输入问题</label>\n' +
		'				<textarea name="title" placeholder="请输入问题标题..." rows=4 style="width: 100%;"></textarea>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'		<table class="table table-hover">\n' +
		'			<!-- <caption>选项设置</caption> -->\n' +
		'			<thead>\n' +
		'				<tr>\n' +
		'					<th>选项文字</th>\n' +
		'					<th>操作</th>\n' +
		'				</tr>\n' +
		'			</thead>\n' +
		'			<tbody>\n' +
		'			</tbody>\n' +
		'		</table>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	// 1. 加载样式
	var load = function(data){
		var title, radios;
		if(data){
			var title = data.title;
			var radios = data.radios;
		}
		
		
		// 加载标题
		if(title){
			$item.find('[name="question-title"]').text(title);
		}else{
			$item.find('[name="question-title"]').text('请输入问题');
		}
		
		// 加载选项
		$item.find('.answer').empty();
		$select = $(
			'<select multiple="multiple" style="width: 50%;" disabled>\n' +
			'</select>'
		);
		
		/* if(radios == undefined || radios == '' || radios.length == 0)
			radios = ['选项一','选项二'];
		 */
		$.each(radios, function(idx,i){
			$select.append('<option value="' + i + '">' + i +'</option>');
		});
		$item.find('.answer').append($select);
		
	};
	
	// 2. 获取问题数据
	var getData = function(){
		var title = $item.find('[name="question-title"]').text();
		var radios = [];
		$.each($item.find('option'), function(index, item){
			radios.push($(item).val());
		});
		return {
			title: title,
			radios: radios
		};
	};
	
	// Editor
	// 3. 激活编辑
	var activateEditor = function(){
		$item.addClass('active');
		var title = $item.find('[name="question-title"]').text();
		$item.find('.editor [name="title"]').val(title);
		
		var container = $item.find('.editor tbody');
		container.empty();
		$.each($item.find('.answer option'), function(index, item){
			var content = $(item).text();
			container.append(getEditorRadio(content));
		});
		if($item.find('[name="editorRadio"]').length == 0)
			$item.find('.editor tbody').append(getEditorRadio());
		
		$item.find('[data-action="activateEditor"]').replaceWith('<div class="btn btn-success btn-sm" data-action="confrimEdit"><i class="fa fa-check"></i> 完成</div>');
	}
	
	// 4. 获取数据
	var getEditorData = function(){
		var result = {
			title : $item.find('.editor [name="title"]').val()
		};
		
		var list = [];
		$.each($item.find('[name="editorRadio"] input'), function(index, item){
			list.push($(item).val());
		});
		result.radios = list;
		
		console.log(result);
		return result;
	};
	
	// 按钮列表样式
	var getEditorRadio = function(value){
		return $(
			'<tr name="editorRadio">\n' +
			'	<td><input type="text" placeholder="请输入选项..." value="' + (value ? value : '') + '"></td>\n' +
			'	<td>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-create"><i class="fa fa-plus"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-delete"><i class="fa fa-trash"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-moveup"><i class="fa fa-arrow-up"></i></a>\n' +
			'		<a class="btn btn-primary btn-xs" data-action="editor-movedown"><i class="fa fa-arrow-down"></i></a>\n' +
			'	</td>\n' +
			'</tr>'
		);
	};
	
	// Editor时间监听
	// 创建新的radio
	// 1. 新建
	$item.on('click', '[data-action="editor-create"]', function(){
		$item.find('.editor tbody').append(getEditorRadio());
	});
	// 2. 删除
	$item.on('click', '[data-action="editor-delete"]', function(){
		$(this).closest('[name="editorRadio"]').remove();
		if($item.find('[name="editorRadio"]').length == 0)
			$item.find('.editor tbody').append(getEditorRadio());
	});
	// 3. 上移
	$item.on('click', '[data-action="editor-moveup"]', function(){
		var $current = $(this).closest('[name="editorRadio"]');
		$current.prev().before($current);
	});
	// 3. 下移
	$item.on('click', '[data-action="editor-movedown"]', function(){
		var $current = $(this).closest('[name="editorRadio"]');
		$current.next().after($current);
	});
	
	var thisFunction = arguments.callee;
	(function(){
		// 加载
		load(data);

		// 是否展开editor
		if(isActive)
			activateEditor();
		
		activateToolBtn($item, load, getData, activateEditor, getEditorData, thisFunction);
	})();

	return $item;
};

// 5. 文件上传
var generateFile = function(isActive, data){
	var $item = $(
		'<div class="template-item" data-type="file">\n' +
		'	<div class="question">\n' +
		'		<span name="question-number"></span>\n' +
		'		<span name="question-title"></span>\n' +
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
		'			<div class="input-group col-md-6">\n' +
		'				<label>请输入问题</label>\n' +
		'				<textarea name="title" placeholder="请输入问题标题..." rows=4 style="width: 100%;"></textarea>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	
	// 1. 加载样式
	var load = function(data){
		var title;
		if(data){
			title = data.title;
		}
		
		// 加载标题
		if(title){
			$item.find('[name="question-title"]').text(title);
		}else{
			$item.find('[name="question-title"]').text('请输入问题');
		}
	};
	
	// 2. 获取问题数据
	var getData = function(){
		var title = $item.find('[name="question-title"]').text();
		return {
			title: title
		};
	};
	
	// Editor
	// 3. 激活编辑
	var activateEditor = function(){
		$item.addClass('active');
		var title = $item.find('[name="question-title"]').text();
		$item.find('.editor [name="title"]').val(title);
		
		$item.find('[data-action="activateEditor"]').replaceWith('<div class="btn btn-success btn-sm" data-action="confrimEdit"><i class="fa fa-check"></i> 完成</div>');
	}
	
	// 4. 获取数据
	var getEditorData = function(){
		var result = {
			title : $item.find('.editor [name="title"]').val()
		};
		return result;
	};
	
	var thisFunction = arguments.callee;
	(function(){
		// 加载
		load(data);

		// 是否展开editor
		if(isActive)
			activateEditor();
		
		activateToolBtn($item, load, getData, activateEditor, getEditorData, thisFunction);
	})();
	
	return $item;
};

// 6. 数字输入框
var generateInputNumber = function(isActive, data){
	var $item = $(
		'<div class="template-item" data-type="number">\n' +
		'	<div class="question">\n' +
		'		<span name="question-number"></span>\n' +
		'		<span name="question-title"></span>\n' +
		'	</div>\n' +
		'	<div class="answer">\n' +
		'   <input type="number" name="inputNumber" value="0" style="width: 100px; margin: 10px 0 10px;">\n' +
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
		'			<div class="input-group col-md-6">\n' +
		'				<label>请输入问题</label>\n' +
		'				<textarea name="title" placeholder="请输入问题标题..." rows=4 style="width: 100%;"></textarea>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'		<label>其它选项设置： </label>\n' +
		'		<div class="row" style="margin-top: 0;">\n' +
		'			<div class="col-md-3">\n' +
		'				<label>最小值：</label> <input type="number" name="min" value="0" style="width: 100px; margin:5px;">\n' +
		'			</div>\n' +
		'			<div class="col-md-3">\n' +
		'				<label>最大值：</label> <input type="number" name="max" value="10" style="width: 100px; margin:5px;">\n' +
		'			</div>\n' +
		'			<div class="col-md-3">\n' +
		'				<label>默认值：</label> <input type="number" name="def" value="0" style="width: 100px; margin:5px;">\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	
	// 1. 加载样式
	var load = function(data){
		var title, setting;
		if(data){
			title = data.title;
			setting = data.setting;
		}
		
		// 加载标题
		if(title){
			$item.find('[name="question-title"]').text(title);
		}else{
			$item.find('[name="question-title"]').text('请输入问题');
		}
		
		if(setting){
			$item.find('.editor [name="min"]').val(setting.min);
			$item.find('.editor [name="max"]').val(setting.max);
			$item.find('.editor [name="def"]').val(setting.def);
			$item.find('[name="inputNumber"]').attr({max: setting.max, min: setting.min, value: setting.def});
		}
	};
	
	// 2. 获取问题数据
	var getData = function(){
		var title = $item.find('[name="question-title"]').text();
		return {
			title: title,
			min:  $item.find('[name="inputNumber"]').attr('min'),
			max:  $item.find('[name="inputNumber"]').attr('max'),
			def:  0
		};
	};
	
	// Editor
	// 3. 激活编辑
	var activateEditor = function(){
		$item.addClass('active');
		var title = $item.find('[name="question-title"]').text();
		$item.find('.editor [name="title"]').val(title);
		
		$item.find('[data-action="activateEditor"]').replaceWith('<div class="btn btn-success btn-sm" data-action="confrimEdit"><i class="fa fa-check"></i> 完成</div>');
	}
	
	// 4. 获取数据
	var getEditorData = function(){
		var result = {
			title : $item.find('.editor [name="title"]').val(),
			setting: {
				min:  $item.find('.editor [name="min"]').val(),
				max:  $item.find('.editor [name="max"]').val(),
				def:  $item.find('.editor [name="min"]').val()
			}
		};
		return result;
	};
	
	var thisFunction = arguments.callee;
	(function(){
		// 加载
		load(data);

		// 是否展开editor
		if(isActive)
			activateEditor();
		
		// 激活功能按钮
		activateToolBtn($item, load, getData, activateEditor, getEditorData, thisFunction);
	})();
	return $item;
};



// B. 通用方法
// 1. 激活编辑
/*
var activateEditor = function($item){
	$item.addClass('active');
};
*/

// 2. 完成编辑
/* 
var completeEdit = function($item){
	$item.removeClass('active');
};
*/

// 3. 上移
var moveUp = function($item){
	$item.prev().before($item);
	renumbering($('#templateList'));
};

// 4. 下移
var moveDown = function($item){
	$item.next().after($item);
	renumbering($('#templateList'));
};

// 5. 置顶
var moveTop = function($item){
	var list = $item.closest('#templateList');
	list.prepend($item);
	renumbering($('#templateList'));
};

// 6. 最尾
var moveBot = function($item){
	var list = $item.closest('#templateList');
	list.append($item);
	renumbering($('#templateList'));
}

// 7. 删除
var remove = function($item){
	$item.remove();
	renumbering($('#templateList'));
};

// 8. 复制
/* var copy = function($item){
	var $clone = $item.clone(true);
	$item.after($clone);
	renumbering($('#templateList'));
}; */

// 9. 激活功能按钮
var activateToolBtn = function($target, load, getData, activateEditor, getEditorData, constructFunction){
	// 1. 激活编辑
	$target.on('click', '[data-action="activateEditor"]', function(){
		activateEditor();
	});
	
	// 2. 完成编辑
	$target.on('click', '[data-action="confrimEdit"]', function(){
		var data = getEditorData();
		load(data);
		
		$(this).replaceWith('<div class="btn btn-primary btn-sm" data-action="activateEditor"><i class="fa fa-tag"></i> 编辑</div>');
		$target.removeClass('active');
	});
	
	// 3. 向上移动
	$target.on('click', '[data-action="moveUp"]', function(){
		moveUp($target);
	});
	
	// 4. 向下移动
	$target.on('click', '[data-action="moveDown"]', function(){
		moveDown($target);
	});
	
	// 5. 置顶
	$target.on('click', '[data-action="moveTop"]', function(){
		moveTop($target);
	});
	
	// 6. 最尾
	$target.on('click', '[data-action="moveBot"]', function(){
		moveBot($target);
	});
	
	// 7. 删除
	$target.on('click', '[data-action="delete"]', function(){
		remove($target);
	});
	
	// 8. 复制
	$target.on('click', '[data-action="copy"]', function(){
		var data = getData();
		$target.after(constructFunction(false, data));
		renumbering($('#templateList'));
	});
};


// C. 其他
// 1. 重新编号
var renumbering = function($container){
	var count = 1;
	$container.find('.template-item').each(function(index, item){
		$(item).find('[name="question-number"]').text(count++ + '. ');
	});
};

// 2. 清楚所有active状态
var clearActive = function(){
	$('#templateList .template-item.active').removeClass('active');
	$('[data-action="confrimEdit"]').replaceWith('<div class="btn btn-primary btn-sm" data-action="activateEditor"><i class="fa fa-tag"></i> 编辑</div>');
};

// 3. 获取单个template-item Json
var getJson = function($item) {
	var type = $item.attr('data-type');
	switch(type){
		case 'radio':
			var result = {};
			result.type = 'radio';
			result.title = $item.find('.question [name="question-title"]').text();
			result.radios = [];
			$item.find('.answer [name="radioName"]').each(function(idx, i){
				result.radios.push($(i).text());
			});
			return result;
		case 'check':
			var result = {};
			result.type = 'check';
			result.title = $item.find('.question [name="question-title"]').text();
			result.radios = [];
			$item.find('.answer [name="radioName"]').each(function(idx, i){
				result.radios.push($(i).text());
			});
			return result;
		case 'input':
			var result = {};
			result.type = 'input';
			result.title = $item.find('.question [name="question-title"]').text();
			return result;
		case 'dropdown':
			var result = {};
			result.type = 'check';
			result.title = $item.find('.question [name="question-title"]').text();
			result.radios = [];
			$item.find('.answer option').each(function(idx, i){
				result.radios.push($(i).val());
			});
			return result;
		case 'file':
			var result = {};
			result.type = 'file';
			result.title = $item.find('.question [name="question-title"]').text();
			return result;
		case 'number':
			var result = {};
			result.type = 'number';
			result.title = $item.find('.question [name="question-title"]').text();
			return result;
		default:
			break;
	}
};

// 4. 获取模板json数据
var getTemplateJson = function() {
	var json = [];
	$('#templateEditor #tab-bar li').each(function(index, tab){
		var name, href;
		var tabJson = {};
		if($(tab).find('a').length > 0){
			name = $(tab).find('a').text();
			href = $(tab).find('a').attr('href');
		}else if($(tab).find('input').length > 0){
			name = $(tab).find('input').val();
			href = $(tab).find('input').attr('data-href');
		}
		tabJson.name = name;
		tabJson.list = [];
		$('#templateList ' + href + ' .template-item').each(function(index, item){
			tabJson.list.push(getJson($(item)));
		});
		
		json.push(tabJson);
	});
	
	/* $('#templateList .template-item').each(function(index, item){
		json.push(getJson($(item)));
	}); */
	return json;
};

// 5. 通过json生成样式
var generateByJson = function(data) {
	switch(data.type){
		case 'radio':
			return generateRadio(false, data);
		case 'check':
			return generateCheck(false, data);
		case 'input':
			return generateInput(false, data);
		case 'dropdown':
			return generateDropdown(false, data);
		case 'file':
			return generateFile(false, data);
		case 'number':
			return generateInputNumber(false, data);
		default:
			break;
	}
};


/* Beta 创建物品样式模板 */
var initObjectForm = function(json){
	var $modal = $(
		'<div class="modal fade" id="templateForm">\n' +
		'	<div class="modal-dialog"  style="width:60vw;">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close" data-dismiss="modal">\n' +
		'					&times;\n' +
		'				</button>\n' +
		'				<h4 class="modal-title">\n' +
		'					查看版本\n' +
		'				</h4>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<ul id="tab-bar" class="nav nav-tabs" style="margin: 0 50px 0 50px;">\n' +
		'					<!-- 标签列表 -->\n' +
		'				</ul>\n' +
		'				<div id="formList" class="customized-scrollbar tab-content" style="height: 60vh; overflow-y: auto;">\n' +
		'				</div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<button type="button" class="btn btn-default" data-dismiss="modal">关闭\n' +
		'				</button>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>\n'
	);
	
	var actionMap = {
		'radio' : getRadioForm,
		'check' : getCheckboxForm,
		'input' : getInputForm,
		'dropdown' : getDropdownForm,
		'file' : getFileForm
	};
	
	(function(){
		$.each(json, function(index, tab){
			var tabName = tab.name;
			var list = tab.list;

			var $newTab = $('<li><a href="#tab_' + index + '" data-toggle="tab">' + tabName + '</a></li>');
			$modal.find('#tab-bar').append($newTab);
			
			var $newContent = $(
				'<div class="tab-pane fade" id="tab_' + index + '">\n' +
				'</div>\n'
			);
			
			$modal.find('#formList').append($newContent);
			
			if(index == 0){
				$newTab.addClass('active');
				$newContent.addClass('active in');
			}
			
			
			$.each(tab.list, function(index, item){
				var type = item.type;
				var funct = actionMap[type];
				var $item = funct(index+1, item.question, item.list);
				
				$newContent.append($item);
				
				if(type == 'file'){
					$item.find('[name="filesupload"]').fileinput({
						language: "zh",
						theme: "explorer",
						uploadUrl: '/uploadfile_beta/123' /* + id */,
						allowedFileTypes: ['image', 'html', 'text', 'video', 'audio', 'flash'],
						//allowedFileExtensions: ['jpg', 'png'],
						//maxFileCount: 1,
						//showCaption: true,
						//showPreview: true
						//showRemove: true
						//showUpload: true
						//showCancel: true ?
						showClose: false,
						maxFileCount: 1,
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
					});
				}
			});
		});
		
		$modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		$modal.on('shown.bs.modal', function(){
			$modal.find('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
				checkboxClass: 'icheckbox_minimal-blue',
				radioClass: 'iradio_minimal-blue'
			});
		});
		
		$modal.modal('show');
		
		
		$modal.on('click', '#formList .form-item', function(event){
			event.preventDefault();
		});
		
		
	})();

};

// 1. 创建单选框
var getRadioForm = function(index, question, answers){
	var $module = $(
		'<div class="form-group form-item" data-type="radio">\n' +
		'	<div class="question">\n' +
		'		<span name="question-number">' + index + '. </span>\n' +
		'		<span name="question-title">' + question + '</span>\n' +
		'	</div>\n' +
		'	<div class="answer">\n' +
		'	</div>\n' +
		'</div>'
	);
	
	$.each(answers, function(idx, item){
		$module.find('.answer').append(
			'<div>\n' +
			'	<input type="radio" name="' + index + '"  value="' + idx + '" class="minimal">\n' +
			'	<span>' + item + '</span>\n' +
			'</div>'
		);
	});
	
	return $module;
};
	
// 2. 创建多选框
var getCheckboxForm = function(index, question, answers){
	var $module = $(
		'<div class="form-group form-item" data-type="checkbox">\n' +
		'	<div class="question">\n' +
		'		<span name="question-number">' + index + '. </span>\n' +
		'		<span name="question-title">' + question + '</span>\n' +
		'	</div>\n' +
		'	<div class="answer">\n' +
		'	</div>\n' +
		'</div>'
	);
	
	$.each(answers, function(idx, item){
		$module.find('.answer').append(
			'<div>\n' +
			'	<input type="checkbox" value="' + idx + '" class="minimal">\n' +
			'	<span>' + item + '</span>\n' +
			'</div>'
		);
	});
	
	return $module;
};

// 3. 创建输入框
var getInputForm = function(index, question){
	var $module = $(
		'<div class="form-group form-item" data-type="input">\n' +
		'	<div class="question">\n' +
		'		<span name="question-number">' + index + '. </span>\n' +
		'		<span name="question-title">' + question + '</span>\n' +
		'	</div>\n' +
		'	<div class="answer">\n' +
		'		<textarea class="form-control" rows="3" placeholder="请输入 ..." style="resize: none;"></textarea>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	return $module;
};

// 4. 创建单选下拉框
var getDropdownForm = function(index, question, answers){
	var $module = $(
		'<div class="form-group form-item" data-type="dropdown">\n' +
		'	<div class="question">\n' +
		'		<span name="question-number">' + index + '. </span>\n' +
		'		<span name="question-title">' + question + '</span>\n' +
		'	</div>\n' +
		'	<div class="answer">\n' +
		'		<select class="form-control">\n' +
		'			<option value="" disabled selected hidden>请选择...</option>\n' +
		'		</select>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	
	$.each(answers, function(idx, item){
		$module.find('.answer select').append('<option value="' + idx + '">选项一</option>');
	});
	
	return $module;
};

// 5. 创建文件上传框
var getFileForm = function(index, question) {
	var $module = $(
		'<div class="form-item" data-type="file">\n' +
		'	<div class="question">\n' +
		'		<span name="question-number">' + index + '. </span>\n' +
		'		<span name="question-title">' + question + '</span>\n' +
		'	</div>\n' +
		'	<div class="answer">\n' +
		'		<input name="filesupload" type="file" multiple class="file-loading">\n' +
		'	</div>\n' +
		'</div>'
	);
	
	return $module;
};
/* 
var months = ['Jan', 'March', 'April', 'June'];
console.log(months);
months.splice(1, 0, 'Feb');
// inserts at 1st index position
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

months.splice(4, 1);
// replaces 1 element at 4th index
console.log(months); */