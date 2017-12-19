// 1. 添加单选
var generateRadio = function(title, radios, isActive){
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
	
	// 加载样式
	var load = function(title, radios){
		// 加载标题
		if(title){
			$item.find('[name="question-title"]').text(title);
		}else{
			$item.find('[name="question-title"]').text('请输入问题');
		}
		
		// 加载选项
		$item.find('.answer').empty();
		$.each(radios, function(idx,i){
			var $temp = $(
				'<div class="radio">\n' +
				'	<i class="fa fa-circle-o"></i> <span name="radioName">' + i + '</span>\n' +
				'</div>'
			);
			$item.find('.answer').append($temp);
		});
	};
	
	// 获取问题数据
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
	
	
	// 操作按钮事件监听
	// 1. 激活编辑
	$item.on('click', '[data-action="activateEditor"]', function(){
		activateEditor();
	});
	
	// 2. 完成编辑
	$item.on('click', '[data-action="confrimEdit"]', function(){
		
		
		var data = getEditorData()
		load(data.title, data.radios);
		
		$(this).replaceWith('<div class="btn btn-primary btn-sm" data-action="activateEditor"><i class="fa fa-tag"></i> 编辑</div>');
		$item.removeClass('active');
	});
	
	// 3. 向上移动
	$item.on('click', '[data-action="moveUp"]', function(){
		moveUp($item);
	});
	
	// 4. 向下移动
	$item.on('click', '[data-action="moveDown"]', function(){
		moveDown($item);
	});
	
	// 5. 置顶
	$item.on('click', '[data-action="moveTop"]', function(){
		moveTop($item);
	});
	
	// 6. 最尾
	$item.on('click', '[data-action="moveBot"]', function(){
		moveBot($item);
	});
	
	// 7. 删除
	$item.on('click', '[data-action="delete"]', function(){
		remove($item);
	});
	
	// 8. 复制
	$item.on('click', '[data-action="copy"]', function(){
		var data = getData();
		$item.after(generateRadio(data.title, data.radios));
		renumbering();
	});	
	
	
	// Editor
	// 激活编辑
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
	
	// 获取数据
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
	
	// 加载
	load(title, radios);

	// 是否展开editor
	if(isActive)
		activateEditor();
	
	return $item;
};

// 2. 添加多选
var generateCheck = function(title, radios, isActive){
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
	
	// 加载样式
	var load = function(title, radios){
		// 加载标题
		if(title){
			$item.find('[name="question-title"]').text(title);
		}else{
			$item.find('[name="question-title"]').text('请输入问题');
		}
		
		// 加载选项
		$item.find('.answer').empty();
		$.each(radios, function(idx,i){
			var $temp = $(
				'<div class="radio">\n' +
				'	<i class="fa fa-square-o"></i> <span name="radioName">' + i + '</span>\n' +
				'</div>'
			);
			$item.find('.answer').append($temp);
		});
	};
	
	// 获取问题数据
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
	
	
	// 操作按钮事件监听
	// 1. 激活编辑
	$item.on('click', '[data-action="activateEditor"]', function(){
		activateEditor();
	});
	
	// 2. 完成编辑
	$item.on('click', '[data-action="confrimEdit"]', function(){
		
		
		var data = getEditorData()
		load(data.title, data.radios);
		
		$(this).replaceWith('<div class="btn btn-primary btn-sm" data-action="activateEditor"><i class="fa fa-tag"></i> 编辑</div>');
		$item.removeClass('active');
	});
	
	// 3. 向上移动
	$item.on('click', '[data-action="moveUp"]', function(){
		moveUp($item);
	});
	
	// 4. 向下移动
	$item.on('click', '[data-action="moveDown"]', function(){
		moveDown($item);
	});
	
	// 5. 置顶
	$item.on('click', '[data-action="moveTop"]', function(){
		moveTop($item);
	});
	
	// 6. 最尾
	$item.on('click', '[data-action="moveBot"]', function(){
		moveBot($item);
	});
	
	// 7. 删除
	$item.on('click', '[data-action="delete"]', function(){
		remove($item);
	});
	
	// 8. 复制
	$item.on('click', '[data-action="copy"]', function(){
		var data = getData();
		$item.after(generateCheck(data.title, data.radios));
		renumbering();
	});	
	
	
	// Editor
	// 激活编辑
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
	
	// 获取数据
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
	
	// 加载
	load(title, radios);

	// 是否展开editor
	if(isActive)
		activateEditor();
	
	return $item;
};


// 3. 添加填空
var generateInput = function(title, isActive){
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
	
	
	// 加载样式
	var load = function(title){
		// 加载标题
		if(title){
			$item.find('[name="question-title"]').text(title);
		}else{
			$item.find('[name="question-title"]').text('请输入问题');
		}
	};
	
	// 获取问题数据
	var getData = function(){
		var title = $item.find('[name="question-title"]').text();
		return {
			title: title
		};
	};
	
	
	// 操作按钮事件监听
	// 1. 激活编辑
	$item.on('click', '[data-action="activateEditor"]', function(){
		activateEditor();
	});
	
	// 2. 完成编辑
	$item.on('click', '[data-action="confrimEdit"]', function(){
		var data = getEditorData()
		load(data.title);
		
		$(this).replaceWith('<div class="btn btn-primary btn-sm" data-action="activateEditor"><i class="fa fa-tag"></i> 编辑</div>');
		$item.removeClass('active');
	});
	
	// 3. 向上移动
	$item.on('click', '[data-action="moveUp"]', function(){
		moveUp($item);
	});
	
	// 4. 向下移动
	$item.on('click', '[data-action="moveDown"]', function(){
		moveDown($item);
	});
	
	// 5. 置顶
	$item.on('click', '[data-action="moveTop"]', function(){
		moveTop($item);
	});
	
	// 6. 最尾
	$item.on('click', '[data-action="moveBot"]', function(){
		moveBot($item);
	});
	
	// 7. 删除
	$item.on('click', '[data-action="delete"]', function(){
		remove($item);
	});
	
	// 8. 复制
	$item.on('click', '[data-action="copy"]', function(){
		var data = getData();
		$item.after(generateInput(data.title));
		renumbering();
	});	
	
	
	// Editor
	// 激活编辑
	var activateEditor = function(){
		$item.addClass('active');
		var title = $item.find('[name="question-title"]').text();
		$item.find('.editor [name="title"]').val(title);
		
		$item.find('[data-action="activateEditor"]').replaceWith('<div class="btn btn-success btn-sm" data-action="confrimEdit"><i class="fa fa-check"></i> 完成</div>');
	}
	
	// 获取数据
	var getEditorData = function(){
		var result = {
			title : $item.find('.editor [name="title"]').val()
		};
		return result;
	};
	
	// 加载
	load(title);

	// 是否展开editor
	if(isActive)
		activateEditor();
	
	return $item;
};

// 4. 下拉框
var generateDropdown = function(title, radios, isActive){
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
	
	// 加载样式
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

		$.each(radios, function(idx,i){
			$select.append('<option value="' + i + '">' + i +'</option>');
		});
		$item.find('.answer').append($select);
		
	};
	
	// 获取问题数据
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
	
	
	// 操作按钮事件监听
	// 1. 激活编辑
	$item.on('click', '[data-action="activateEditor"]', function(){
		activateEditor();
	});
	
	// 2. 完成编辑
	$item.on('click', '[data-action="confrimEdit"]', function(){

		var data = getEditorData()
		load(data.title, data.radios);
		
		$(this).replaceWith('<div class="btn btn-primary btn-sm" data-action="activateEditor"><i class="fa fa-tag"></i> 编辑</div>');
		$item.removeClass('active');
	});
	
	// 3. 向上移动
	$item.on('click', '[data-action="moveUp"]', function(){
		moveUp($item);
	});
	
	// 4. 向下移动
	$item.on('click', '[data-action="moveDown"]', function(){
		moveDown($item);
	});
	
	// 5. 置顶
	$item.on('click', '[data-action="moveTop"]', function(){
		moveTop($item);
	});
	
	// 6. 最尾
	$item.on('click', '[data-action="moveBot"]', function(){
		moveBot($item);
	});
	
	// 7. 删除
	$item.on('click', '[data-action="delete"]', function(){
		remove($item);
	});
	
	// 8. 复制
	$item.on('click', '[data-action="copy"]', function(){
		var data = getData();
		$item.after(generateRadio(data.title, data.radios));
		renumbering();
	});	
	
	
	// Editor
	// 激活编辑
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
	
	// 获取数据
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
	
	// 加载
	load(title, radios);

	// 是否展开editor
	if(isActive)
		activateEditor();
	
	return $item;
};

// 5. 文件上传
var generateFile = function(title, isActive){
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
	
	
	// 加载样式
	var load = function(title){
		// 加载标题
		if(title){
			$item.find('[name="question-title"]').text(title);
		}else{
			$item.find('[name="question-title"]').text('请输入问题');
		}
	};
	
	// 获取问题数据
	var getData = function(){
		var title = $item.find('[name="question-title"]').text();
		return {
			title: title
		};
	};
	
	
	// 操作按钮事件监听
	// 1. 激活编辑
	$item.on('click', '[data-action="activateEditor"]', function(){
		activateEditor();
	});
	
	// 2. 完成编辑
	$item.on('click', '[data-action="confrimEdit"]', function(){
		var data = getEditorData()
		load(data.title);
		
		$(this).replaceWith('<div class="btn btn-primary btn-sm" data-action="activateEditor"><i class="fa fa-tag"></i> 编辑</div>');
		$item.removeClass('active');
	});
	
	// 3. 向上移动
	$item.on('click', '[data-action="moveUp"]', function(){
		moveUp($item);
	});
	
	// 4. 向下移动
	$item.on('click', '[data-action="moveDown"]', function(){
		moveDown($item);
	});
	
	// 5. 置顶
	$item.on('click', '[data-action="moveTop"]', function(){
		moveTop($item);
	});
	
	// 6. 最尾
	$item.on('click', '[data-action="moveBot"]', function(){
		moveBot($item);
	});
	
	// 7. 删除
	$item.on('click', '[data-action="delete"]', function(){
		remove($item);
	});
	
	// 8. 复制
	$item.on('click', '[data-action="copy"]', function(){
		var data = getData();
		$item.after(generateInput(data.title));
		renumbering();
	});	
	
	
	// Editor
	// 激活编辑
	var activateEditor = function(){
		$item.addClass('active');
		var title = $item.find('[name="question-title"]').text();
		$item.find('.editor [name="title"]').val(title);
		
		$item.find('[data-action="activateEditor"]').replaceWith('<div class="btn btn-success btn-sm" data-action="confrimEdit"><i class="fa fa-check"></i> 完成</div>');
	}
	
	// 获取数据
	var getEditorData = function(){
		var result = {
			title : $item.find('.editor [name="title"]').val()
		};
		return result;
	};
	
	// 加载
	load(title);

	// 是否展开editor
	if(isActive)
		activateEditor();
	
	return $item;
};



// 通用方法
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





// 其他
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
			return generateRadio(json.title, json.radios, false);
		case 'check':
			return generateCheck(json.title, json.radios, false);
		case 'input':
			return generateInput(json.title, false);
		case 'dropdown':
			return generateDropdown(json.title, json.radios, false);
		case 'file':
			return generateFile(json.title, false);
		default:
			break;
	}
};

// 6. 通过json加载
var loadJson = function(json){
	$.each(json, function(index, item){
		$('#templateList').append(generateByJson(item));
	});
	renumbering();
};