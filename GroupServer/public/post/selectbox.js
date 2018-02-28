/* 
data:{
	title,
	tags:[
		{
			icon,
			name,
			value,
			hasCollapse: 0/1,
			isSelect: 0/1
			collapseTags: [{
				icon,
				name,
				value,
				isSelect: 0/1
			}],
			collapseBot: {
				icon,
				name,
				value,
				list: [{
					id,
					name,
					src
				}]
			}
		}
	]
}
 */
var selectBox = function(data, action_viewTag, action_selectUser, action_submit){
	var $modal = $(
		'<div class="modal fade select-box noselect">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
		'				<h5 class="modal-title"></h5>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div class="form-group select-box-container">\n' +
		'				</div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a data-action="submit">提交</a>\n' +
		'				<a data-action="close">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	var load = function(data){
		$modal.find('.modal-title').text(data.title);
		
		$container = $modal.find('.select-box-container').empty();
		$.each(data.tags, function(index, tag){
			$container.append(addTag(tag));
		});
	};
	
	var addTag = function(data){
		if(data.hasCollapse == 0){
			return getRadio(data);
		}else{
			return getCollapse(data);
		}
	};
	
	//  1. 单选样式
	var getRadio = function(data){
		var $module = $(
			'<label data-type="radioTag">\n' +
			'	<input type="radio" name="r1" data-type="radio" data-action="hideCollapse">\n' +
			'	<span data-type="icon">' + data.icon + '</span>\n' +
			'	<span data-type="name">' + data.name + '</span>\n' +
			'	<!-- <span class="pull-right" style="margin-right: 20px;"><a href="javascript:void(0)">设置</a></span> -->\n' +
			'	<div class="clearfix"></div>\n' +
			'</label>'
		);
		
		$module.attr({
			'data-name': data.name,
			'data-value': data.value
		}).find('input[name="r1"]').prop('checked', data.isSelect == 1);
		
		return $module;
	};
	
	//  2. 折叠框
	var getCollapse = function(data){
		var $module = $(
			'<div data-type="radioTag">\n' +
			'	<label>\n' +
			'		<input type="radio" name="r1" data-type="collapse" data-action="showCollapse">\n' +
			'		<span>' + data.icon + '</span>\n' +
			'		<span>' + data.name + '</span>\n' +
			'		<!-- <span class="pull-right" style="margin-right: 20px;"><a href="javascript:void(0)">设置</a></span> -->\n' +
			'		<div class="clearfix"></div>\n' +
			'	</label>\n' +
			'	<div class="collapse">\n' +
			'	<!-- 复选框 -->\n' +
			'	</div>\n' +
			'</div>'
		);
		
		$module.attr({
			'data-name': data.name,
			'data-value': data.value
		}).find('input[name="r1"]').prop('checked', data.isSelect == 1);
		
		var $container = $module.find('.collapse').empty();
		$.each(data.collapseTags, function(index, tag){
			$container.append(getMulti_Collapse(tag));
		});
		
		$container.append(getSimple_Collapse(data.collapseBot));
		
		
		// $container.collapse('show');
		return $module;
	};
	
		
	// 3. 复选框-折叠框
	var getMulti_Collapse = function(data){
		var $module = $(
			'<label data-type="tag">\n' +
			'	<input type="checkbox" name="c1">\n' +
			'	<span>' + data.icon + '</span>\n' +
			'	<span data-name>' + data.name + '</span>\n' +
			'	<span class="pull-right" style="margin-right:10px;"><a href="javascript:void(0)" data-action="viewTag">查看</a></span>\n' +
			'	<div class="clearfix"></div>\n' +
			'</label>\n'
		);
		
		$module.attr({
			'data-value': data.value,
			'data-name': data.name,
		}).find('input[name="c1"]').prop('checked', data.isSelect == 1);
		
		return $module;
	};
	
	var tagToJson = function($tag){
		return {
			name: $tag.attr('data-name'),
			value: $tag.attr('data-value'),
		}
	};
	
	// 4. 点击框-折叠框
	var getSimple_Collapse = function(data){
		var $module = $(
			'<label data-type="tail" style="line-height: 30px !important;">\n' +
			'	<span>' + data.icon + '</span>\n' +
			'	<span>' + data.name + '</span>\n' +
			'	<span class="pull-right" style="margin-right:10px;"><a href="javascript:void(0)" data-action="selectUser">选取</a></span>\n' +
			'	<div class="clearfix"></div>\n' +
			'	<span data-container="item"></span>\n' +
			'</label>\n'
		);
		
		var $container = $module.find('[data-container="item"]').empty();
		$.each(data.list, function(index, item){
			$container.append(getSpan(item));
		});
		
		return $module;
	};
	
	var getTailData = function($tail){
		var json = [];
		
		$tail.find('[data-container="item"] [data-type="item"]').each(function(index, item){
			json.push(spanToJson($(item)));
		});
		
		return json;
	};
	
	var updateTail = function($tail, data){
		var $container = $tail.find('[data-container="item"]').empty();
		$.each(data, function(index, item){
			$container.append(getSpan(item));
		});
	};
	
	// 5. 用户span框
	var getSpan = function(data){
		var $span = $('<span data-type="item" style="padding-left: 15px; color: #2196F3; display: inline-block">' + data.name + '</span>');
		
		$span.attr({
			'data-id': data.id,
			'data-name': data.name,
			'data-src': data.src
		});
		
		return $span;
	};
	
	var spanToJson = function($span){
		return {
			id: $span.attr('data-id'),
			name: $span.attr('data-name'),
			src: $span.attr('data-src')
		};
	};
	
	var getData = function(){
		var $tag = $modal.find('[name="r1"]:checked').closest('[data-type="radioTag"]');
			var json = {
				name: $tag.attr('data-name'),
				value: $tag.attr('data-value'),
				tags: []
			};
		if($tag.find('.collapse').length != 0){
			$tag.find('[data-type="tag"] input:checked').each(function(index, item){
				json.tags.push(tagToJson($(item).closest('[data-type="tag"]')));
			});
			json.users = getTailData($tag.find('[data-type="tail"]'));
		}
		
		return json;
	};
	
	
	var initialize = function(){
		load(data);
		
		$modal.on('click', '[data-action]', function(){
			var actionType = $(this).attr('data-action');
			console.log(actionType);
			switch(actionType){
				case 'showCollapse':
					var $collapse = $(this).closest('[data-type="radioTag"]').find('.collapse');
					$modal.find('.collapse').not($collapse).collapse('hide');
					$collapse.collapse('show');
					break;
				case 'hideCollapse':
					$modal.find('.collapse').collapse('hide');
					break;
				case 'viewTag':
					action_viewTag(tagToJson($(this).closest('[data-type="tag"]')));
					break;
				case 'selectUser':
					var selected = getTailData($(this).closest('[data-type="tail"]'));
					action_selectUser(selected, $(this).closest('[data-type="tail"]'), updateTail);
					break;
				case 'submit':
					getData();
					// action_submit();
				default:
					break;
			}
		});
		
		$modal.modal('show');
	};
	
	initialize();
};

