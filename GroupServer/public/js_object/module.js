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
		'								data-target="#example-navbar-collapse">\n' +
		'							<span class="sr-only">切换导航</span>\n' +
		'							<span class="icon-bar"></span>\n' +
		'							<span class="icon-bar"></span>\n' +
		'							<span class="icon-bar"></span>\n' +
		'						</button>\n' +
		'						<span class="navbar-brand"><i class="fa fa-chain"></i></span>\n' +
		'					</div>\n' +
		'					<div class="collapse navbar-collapse" id="example-navbar-collapse">\n' +
		'						<ul class="nav navbar-nav" data-container="toolbar">\n' +
		'							<li><a href="#" data-action="createRadio"><i class="fa fa-check-circle-o"></i> 单项</a></li>\n' +
		'							<li><a href="#" data-action="createCheckbox"><i class="fa fa-check-square-o"></i> 多项</a></li>\n' +
		'							<li><a href="#" data-action="createTextarea"><i class="fa fa-pencil"></i> 填空</a></li>\n' +
		'							<li><a href="#" data-action="createDropdown"><i class="fa fa-list"></i> 下拉框</a></li>\n' +
		'							<li><a href="#" data-action="createFile"><i class="fa fa-file-text-o"></i> 上传文件</a></li>\n' +
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
		'				<div id="templateList" class="customized-scrollbar" style="height: 60vh; overflow-y: auto;">\n' +
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
	
	var validation = function(){
		return true;
	};
	
	//初始化
	(function(){
		//1. 加载sortable、禁止select
		$modal.find('#templateList')
			.sortable({
				handle: ".question",
				placeholder: "template-placeholder",
				update: function( event, ui ) {
					renumbering();
				}
			})
			.disableSelection();

		//2. 监听工具栏按钮
		var actionMap = {
			'createRadio' : generateRadio,
			'createCheckbox' : generateCheck,
			'createTextarea' : generateInput,
			'createDropdown' : generateDropdown,
			'createFile' : generateFile
		};
		
		$modal.find('[data-container="toolbar"] [data-action]').each(function(index, item){
			$(item).on('click', function(){
				var actionType = $(this).attr('data-action');
				var actionFunc = actionMap[actionType];
				
				clearActive();
				
				var $contentOfList = $modal.find('#templateList');
				var $item = actionFunc(true);
				$contentOfList
					.append($item)
					.scrollTop($contentOfList[0].scrollHeight);	
				
				renumbering();
			});
		});
		
		// 6. 提交
		$modal.find('[data-action="submit"]').on('click', function(){
			var json = getTemplateJson();
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
		if(json != undefined){
			if(validation(json)){
				$.each(json, function(index, item){
					$modal.find('#templateList').append(generateByJson(item));
				});
				renumbering();
			}else{
				console.log('error');
			}
		}
		$modal.modal('show');
	})();
};

// A. 选项生成
// 1. 添加单选
var generateRadio = function(isActive, title, radios){
	var $item = $(
		'<div class="template-item" data-type="radio">\n' +
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
	
	var thisFunction = arguments.callee;
	
	// 1. 加载
	var load = function(title, radios){
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
	
	
	// 初始化
	(function(){
		load(title, radios);
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
var generateCheck = function(isActive, title, radios){
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
	var load = function(title, radios){
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
		load(title, radios);
		
		// 是否展开editor
		if(isActive)
			activateEditor();
		
		// 激活功能按钮
		activateToolBtn($item, load, getData, activateEditor, getEditorData, thisFunction)
	})();

	
	return $item;
};

// 3. 添加填空
var generateInput = function(isActive, title){
	var $item = $(
		'<div class="template-item" data-type="input">\n' +
		'	<div class="question">\n' +
		'		<span name="question-number"></span>\n' +
		'		<span name="question-title"></span>\n' +
		'	</div>\n' +
		'	<div class="answer">\n' +
		'  <textarea rows=1 style="width: 100%; background-color: white;resize: none;" disabled></textarea>\n' +
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
	var load = function(title){
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
		load(title);

		// 是否展开editor
		if(isActive)
			activateEditor();
		
		// 激活功能按钮
		activateToolBtn($item, load, getData, activateEditor, getEditorData, thisFunction);
	})();
	return $item;
};

// 4. 下拉框
var generateDropdown = function(isActive, title, radios){
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
	var load = function(title, radios){
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
		
		if(radios == undefined || radios == '' || radios.length == 0)
			radios = ['选项一','选项二'];
		
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
		load(title, radios);

		// 是否展开editor
		if(isActive)
			activateEditor();
		
		activateToolBtn($item, load, getData, activateEditor, getEditorData, thisFunction);
	})();

	return $item;
};

// 5. 文件上传
var generateFile = function(isActive, title){
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
	var load = function(title){
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
		load(title);

		// 是否展开editor
		if(isActive)
			activateEditor();
		
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
	renumbering();
};

// 4. 下移
var moveDown = function($item){
	$item.next().after($item);
	renumbering();
};

// 5. 置顶
var moveTop = function($item){
	var list = $item.closest('#templateList');
	list.prepend($item);
	renumbering();
};

// 6. 最尾
var moveBot = function($item){
	var list = $item.closest('#templateList');
	list.append($item);
	renumbering();
}

// 7. 删除
var remove = function($item){
	$item.remove();
	renumbering();
};

// 8. 复制
/* var copy = function($item){
	var $clone = $item.clone(true);
	$item.after($clone);
	renumbering();
}; */

// 9. 激活功能按钮
var activateToolBtn = function($target, load, getData, activateEditor, getEditorData, constructFunction){
	// 1. 激活编辑
	$target.on('click', '[data-action="activateEditor"]', function(){
		activateEditor();
	});
	
	// 2. 完成编辑
	$target.on('click', '[data-action="confrimEdit"]', function(){
		var data = getEditorData()
		load(data.title, data.radios);
		
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
		$target.after(constructFunction(false, data.title, data.radios));
		renumbering();
	});
};


// C. 其他
// 1. 重新编号
var renumbering = function(){
	var count = 1;
	$('#templateList .template-item').each(function(index, item){
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
		default:
			break;
	}
};

// 4. 获取模板json数据
var getTemplateJson = function() {
	var json = [];
	$('#templateList .template-item').each(function(index, item){
		json.push(getJson($(item)));
	});
	return json;
};

// 5. 通过json生成样式
var generateByJson = function(json) {
	switch(json.type){
		case 'radio':
			return generateRadio(false, json.title, json.radios);
		case 'check':
			return generateCheck(false, json.title, json.radios);
		case 'input':
			return generateInput(false, json.title);
		case 'dropdown':
			return generateDropdown(false, json.title, json.radios);
		case 'file':
			return generateFile(false, json.title);
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
		'				<div id="formList" class="customized-scrollbar" style="height: 60vh; overflow-y: auto;">\n' +
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
		$.each(json, function(index, item){
			var type = item.type;
			var funct = actionMap[type];
			var $item = funct(index+1, item.title, item.radios);
			$modal.find('#formList').append($item);
			
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