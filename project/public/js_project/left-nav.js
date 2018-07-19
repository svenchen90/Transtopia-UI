// promise 
const URL_GET_SUBFOLDERS_BY_ID = '/get_subfolders_by_id';
var querySubfoldersByID = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : URL_GET_SUBFOLDERS_BY_ID,
			data: {id: id},
			type : 'GET',
			dataType : 'json',
			success : function (result){
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

var getNavList = function(data, click_fucntion=function(id, type){console.log(id, type)} ,toggle_function=querySubfoldersByID){
	var $list = $(
		'<div class="nav-list">\n' +
		'</div>\n'
	);
	
	var getNavItem = function(data){
		return $(
			'<div class="item nav-item noselect" data-id="' + data.id + '" data-type="' + data.type + '">\n' +
			'	<span class="icon" data-action="click">' + data.icon + '</span>\n' +
			'	<span class="text" data-action="click">' + data.name + '<span>\n' +
			'</div>\n'
		);
	};
	
	var getNavItem_toggledown = function(data){
		return $(
			'<div class="item nav-item toggle-down noselect" data-id="' + data.id + '" data-type="' + data.type + '">\n' +
			'	<span class="toggle-down" data-action="toggle"><i class="fa fa-caret-right"></i></span>\n' +
			'	<span class="icon" data-action="click">' + data.icon + '</span>\n' +
			'	<span class="text" data-action="click">' + data.name + '<span>\n' +
			'</div>\n'
		);
	};
	
	var getToggleList = function(data, level=0){
		var $list = $(
			'<div class="toogle-down-list" data-level="' + level + '">\n' +
			'</div>\n'
		);
			
		var getToggleItem = function(data){
			return $(
				'<div class="item toogle-down-item noselect" data-id="' + data.id + '">\n' +
				'	<span class="toggle-down" data-action="toggle"><i class="fa fa-caret-right"></i></span>\n' +
				'	<span class="icon" data-action="click"><i class="fa fa-folder"></i></span>\n' +
				'	<span class="text" data-action="click">' + data.name + '<span>\n' +
				'</div>\n'
			);
		};
		
		data.forEach(function(d){
			var $item = getToggleItem(d);
			$item.css({
				'padding-left' : 25 + level*25 + 'px'
			});
			
			$list.append($item);
		});
		
		return $list;
	};
	
	
	
	
	data.forEach(function(d){
		var $item = (d.toggle == 1 ? getNavItem_toggledown(d) : getNavItem(d));
		$list.append($item);
	});
	
	$list.on('click', '[data-action="click"]', function(e){
		var $item = $(this).closest('.item');
		var id = $item.attr('data-id');
		var type = $item.attr('data-type');
		$list.find('.selected').removeClass('selected');
		$item.addClass('selected');
		click_fucntion(id, type);
	});
	
	$list.on('click', '[data-action="toggle"]', function(e){
		var $item = $(this).closest('.item');
		var id = $item.attr('data-id');
		var level = 0;
		var $i = $(this).find('i');
		
		
		if($item.hasClass('toogle-down-item')){
			level = parseInt($item.closest('.toogle-down-list').attr('data-level')) + 1;
			console.log(level);
		}
		
		
		var toUnfold = $(this).find('i').hasClass('fa-caret-right');
		if(toUnfold){
			toggle_function(id)
				.then(function(result){
					var $sub_list = getToggleList(result, level);
					$item.after($sub_list);
					$i.toggleClass('fa-caret-right').toggleClass('fa-caret-down');
				})
				.catch(function(exception){
					console.log(exception);
				});
		}else{
			$item.next('.toogle-down-list').remove();
			$(this).find('i').toggleClass('fa-caret-right').toggleClass('fa-caret-down');
		}
	});
	
	
	return $list;
};