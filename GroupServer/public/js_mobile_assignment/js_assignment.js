var reloadAssignment = function(list_data, $container){
	var convertDate = function(s){
		return s;
	};
	
	var checkAvailability = function(date_start, date_end){
		var current_time = new Date().getTime();
		var start_time =  new Date(date_start).getTime();
		var end_time = new Date(date_end).getTime();
		
		if(current_time >= start_time && current_time <= end_time)
			return true;
		else
			return false;
	};
	
	var getAssignment = function(data){
		return $(
			'<div class="assignment-item">\n' +
			'	<div class="title">\n' +
			'		<span>' + data.name + '</span>\n' +
			'	</div>\n' +
			'	<div class="clearfix">\n' +
			'		分布者： <span>' + data.author_name + '</span>\n' +
			'	</div>\n' +
			'	<div class="clearfix">\n' +
			'		任务时效： <span>' + convertDate(data.date_start) + '</span> 至 <span>' + convertDate(data.date_end) + '</span>\n' +
			'	</div>\n' +
			'	<div class="clearfix">\n' +
			'		佣金： ￥<span>' + data.commission + '</span>\n' +
			'	</div>\n' +
			'</div>\n'
		);
	};
	
	$container.empty();
	list_data.forEach(function(data){
		var $item = getAssignment(data);
		
		if(checkAvailability(data.date_start, data.date_end)){
			$item.on('click', function(){
				window.location.href = data.link;
			});
		}else{
			$item.addClass('inactive');
			$item.on('click', function(){
				
			});
		}

		$container.append($item);
	});
};