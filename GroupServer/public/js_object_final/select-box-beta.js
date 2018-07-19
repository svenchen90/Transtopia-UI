var sbb_locale_cn = {
	1: '请输入...',
	2: '选择添加项',
	3: '提交',
	4: '关闭'
};
var sbb_locale_en = {
	1: 'Please input...',
	2: 'Selected to add',
	3: 'Submit',
	4: 'Close'
};

var SelectBoxBeta = function(left_list, right_list, submit_callback, findTagfunction, language=sbb_locale_cn){
	var $modal = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog"  style="width:600px;">\n' +
		'		<div class="modal-content">\n' +
		'			<!-- < style="float: right;position: absolute;right: 10px;top: 5px; color: rgba(0,0,0,0.3); font-weight: 600; cursor: pointer;">&times;</button> -->\n' +
		'			<div class="modal-body" style="padding-top: 0; padding-bottom: 0; ">\n' +
		'				<div class="select-box-beta row" style="margin-top: 0;">\n' +
		'					<div class="left-col col-sm-6">\n' +
		'						<div class="head">\n' +
		'							<div class="input-group">\n' +
		'								<div class="input-group-addon">\n' +
		'									<i class="fa fa-search"></i>\n' +
		'								</div>\n' +
		'								<input type="text" class="form-control search-field" placeholder="' + language[1] + '">\n' +
		'							</div>\n' +
		'						</div>\n' +
		'						<div class="list customized-scrollbar">\n' +
		'							<!-- 列表内容 -->\n' +
		'						</div>\n' +
		'					</div>\n' +
		'					<div class="right-col col-sm-6">\n' +
		'						<div class="head">\n' +
		'							<span>' + language[2] + '</span>\n' +
		'						</div>\n' +
		'						<div class="list customized-scrollbar">\n' +
		'							<!-- 列表内容 -->\n' +
		'						</div>\n' +
		'						<div class="foot">\n' +
		'							<button type="button" class="btn btn-success btn-sm" data-action="submit">' + language[3] + '</button>\n' +
		'							<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">' + language[4] + '</button>\n' +
		'						</div>\n' +
		'					</div>\n' +
		'				</div>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>\n'
	);
	
	var updateLeftByRight = function(){
		var ids = [];
		$modal.find('.right-col .item').each(function(index, item){
			var id = $(item).attr('data-id');
			ids.push(id);
		});
		
		$modal.find('.left-col .item').each(function(index, item){
			var id = $(item).attr('data-id');
			if(ids.includes(id)){
				$modal.find('.left-col .item[data-id="' + id + '"] .right').html('<i class="fa fa-check-circle"></i>\n')
			}else{
				$modal.find('.left-col .item[data-id="' + id + '"] .right').html('<i class="fa fa-circle-o"></i>\n')
			}
		});
	};
	
	var updateRightByLeft = function(){
		$modal.find('.right-col .list').empty();
		$modal.find('.left-col .item').each(function(index, item){
			var id = $(this).attr('data-id');
			var image = $(this).find('.left img').attr('src');
			var name = $(this).find('.middle').text();
			
			if($(this).find('.right i').hasClass('fa-check-circle'))
				$modal.find('.right-col .list').append(
					'<div class="item" data-id="' + id + '">\n' +
					'	<div class="left"><img src="' + image + '"></div>\n' +
					'	<span class="middle">' + name + '</span>\n' +
					// '	<div class="right"><i class="fa fa-check-circle"></i></div>\n' +
					'	<div class="right"><i class="fa fa-times-circle"></i></div>\n' +
					'</div>\n'
				);
		});
	};
	
	var filterLeft = function(query) {
		$modal.find('.left-col .item').addClass('hide');
		$modal.find('.left-col .item').each(function(index, item){
			var name = $(item).find('.middle').text();
			if(name.includes(query)) {
				$(item).removeClass('hide');
			}
		});
	};
	
	left_list.forEach(function(item, index){
		var current_tag = findTagfunction(item);
		var $tag = $modal.find('.left-col .list .tag[value="' + current_tag + '"]');
		
		if($tag.length == 0){
			$modal.find('.left-col .list').append('<div class="tag" value="' + current_tag + '">' + current_tag + '</div>\n');
		}
		
		var $item = $(
			'<div class="item" data-id="' + item.id + '">\n' +
			'	<div class="left"><img src="' + item.image + '"></div>\n' +
			'	<span class="middle">' + item.name + '</span>\n' +
			// '	<div class="right"><i class="fa fa-check-circle"></i></div>\n' +
			'	<div class="right"><i class="fa fa-circle-o"></i></div>\n' +
			'</div>\n'
		);
		
		$modal.find('.left-col .list .tag[value="' + current_tag + '"]').after($item);
	});
	
	right_list.forEach(function(item, index){
		var $item = $(
			'<div class="item" data-id="' + item.id + '">\n' +
			'	<div class="left"><img src="' + item.image + '"></div>\n' +
			'	<span class="middle">' + item.name + '</span>\n' +
			// '	<div class="right"><i class="fa fa-check-circle"></i></div>\n' +
			'	<div class="right"><i class="fa fa-times-circle"></i></div>\n' +
			'</div>\n'
		);
		
		$modal.find('.right-col .list').append($item);
	});
	
	updateLeftByRight();
	
	$modal.on('click', '.left-col .item', function(e){
		$(this).find('.right i')
			.toggleClass('fa-check-circle')
			.toggleClass('fa-circle-o');
		updateRightByLeft();
	});
	
	$modal.on('click', '.right-col .item', function(e){
		$(this).remove();
		updateLeftByRight();
	});
	
	$modal.on('change', '.search-field', function(e){
		var text = $(this).val();
		filterLeft(text);
	});
	
	$modal.on('click', '[data-action="submit"]', function(e){
		var ids = [];
		$modal.find('.right-col .list .item').each(function(index, item){
			ids.push($(item).attr('data-id'));
		});
		submit_callback(ids);
		$modal.modal('hide');
	});
	
	$modal.on('hidden.bs.modal', function(e){
		$(this).remove();
	});
	
	$modal.modal('show');
};