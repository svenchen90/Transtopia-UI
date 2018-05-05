/* schema{
	geo:
	extData: {}
	style: {}
} */

var UMap = function(containerID, data){
	var DEFAULT_STYLE = {
		resizeEnable: true,
		// dragEnable: false
		enter: [116.397428, 39.90923],//地图中心点
		zoom: 13, //地图显示的缩放级别
		features: ['bg',/* 'point', */ 'road', 'building']
	};
	
	var options = $.extend({}, DEFAULT_STYLE, data.style);
			
	var id = "map";
	$('#' + containerID).append('<div id="map" class="u-map"></div>');
	
	return new AMap.Map(id, options);
};

var UPoint = {
	type: 'point',
	DEFAULT_STYLE: {
		
	},
	drawLisener: undefined,
	validate: function(data){
		return true;
	},
	initialize: function(map, data){
		if(this.validate(data)){
			var options = $.extend({}, this.DEFAULT_STYLE, data.style);
			
			options.map = map;
			options.position = data.geo;
			options.extData = data.extData;
			
			return new AMap.Marker(options);
		}else{
			console.log('error - data invalid');
		}
	},
	setStyle: function(obj, data){
		if(this.validate(data)){
			
		}else{
			console.log('error - data invalid');
		}
	},
	getStyle: function(obj){
		return {};
	},
	getGeo: function(obj){
		var position = obj.getPosition();
		return [position.lng, position.lat];
	},
	toJson: function(obj){
		var data = {
			
		};
		data.type = 'point';
		data.geo = this.getGeo(obj);
		data.style = this.getStyle(obj);
		data.extData = obj.getExtData();
		
		return data;
	},
	enableEdit: function(map, obj, callback){
		obj.setDraggable(true);
		callback();
	},
	disableEdit: function(map, obj, callback){
		obj.setDraggable(false);
		callback();
	},
	enableDraw: function(map, callback){
		if(this.drawLisener){
			AMap.event.removeListener(this.drawLisener);
			this.drawLisener = undefined;
		}
		
		var UP = this;
		this.drawLisener = AMap.event.addListener(map, "click", function(e){
			var geo = [e.lnglat.getLng(),e.lnglat.getLat()];
			var obj = UP.initialize(map, {geo: geo, extData: {lid: localIDGenerator()}})
			callback(obj);
		});
	},
	disableDraw: function(callback){
		AMap.event.removeListener(this.drawLisener);
		//callback();
	},
	toInfoBox: function(obj){
		var $html = $(
			'<div>\n' +
				'ID: <div data-type="id">' + obj.getExtData().lid + '</div>\n' +
				'坐标: <div data-type="geo">' + UPoint.getGeo(obj).join(', ')  + '</div>\n' +
			'</div>'
		);
		
		return $html;
	},
};

var UPolyline = {
	type: 'polyline',
	DEFAULT_STYLE: {
		
	},
	editor: undefined,
	mousetool: undefined,
	validate: function(data){
		return true;
	},
	initialize: function(map, data){
		if(this.validate(data)){
			var options = $.extend({}, this.DEFAULT_STYLE, data.style);
			
			options.map = map;
			options.path = data.geo;
			options.extData = data.extData;
			
			return new AMap.Polyline(options);
		}else{
			console.log('error - data invalid');
		}
	},
	setStyle: function(obj, data){
		if(this.validate(data)){
			
		}else{
			console.log('error - data invalid');
		}
	},
	getStyle: function(obj){
		return {};
	},
	getGeo: function(obj){
		return obj.getPath().map(function(p){
			return [p.lng, p.lat];
		});
	},
	toJson: function(obj){
		var data = {
			
		};
		data.type = this.type;
		data.geo = this.getGeo(obj);
		data.style = this.getStyle(obj);
		data.extData = a_obj.getExtData();
		
		return data;
	},
	enableEdit: function(map, obj, callback){
		this.editor = new AMap.PolyEditor(map, obj);
		this.editor.open();
		
		obj.setOptions({
			draggable: true,
			cursor: "move"
		});
		
		var UP = this;
		
		this.editor.on('addnode', function(e){
			callback(UP.toInfoBox(obj));
		}).on('adjust', function(e){
			callback(UP.toInfoBox(obj));
		}).on('removenode', function(e){
			callback(UP.toInfoBox(obj));
		});
	},
	disableEdit: function(map, obj, callback){
		if(this.editor){
			obj.setOptions({
				draggable: false,
				cursor: "pointer"
			});
			this.editor.close();
			this.editor = undefined;
		}
	},
	enableDraw: function(map, callback){
		this.mousetool = new AMap.MouseTool(map);
		this.mousetool.polyline();
		var UP = this;
		
		this.mousetool.on('draw', function(e){
			console.log(111);
			var geo = UP.getGeo(e.obj);
			map.remove(e.obj);
			var obj = UP.initialize(map, {geo: geo, extData: {lid: localIDGenerator()}})
			callback(obj);
		});
	},
	disableDraw: function(callback){
		this.mousetool.close();
		this.mousetool.off('draw');
		this.mousetool = undefined;
		callback()
	},
	toInfoBox: function(obj){
		var $html = $(
			'<div>\n' +
				'ID: <div data-type="id">' + obj.getExtData().lid + '</div>\n' +
				'长度: <div data-type="length">' + parseInt(AMap.GeometryUtil.distanceOfLine(UPolyline.getGeo(obj)))  + ' 米</div>\n' +
			'</div>'
		);
		
		return $html;
	}
};

var UPolygon = $.extend({}, UPolyline, {
	type: 'polygon', 
	initialize: function(map, data){
		if(this.validate(data)){
			var options = $.extend({}, this.DEFAULT_STYLE, data.style);
			
			options.map = map;
			options.path = data.geo;
			options.extData = data.extData;
			
			return new AMap.Polygon(options);
		}else{
			console.log('error - data invalid');
		}
	},
	enableDraw: function(map, callback){
		this.mousetool = new AMap.MouseTool(map);
		this.mousetool.polygon();
		var UP = this;
		
		this.mousetool.on('draw', function(e){
			var geo = UP.getGeo(e.obj);
			map.remove(e.obj);
			var obj = UP.initialize(map, {geo: geo, extData: {lid: localIDGenerator()}})
			callback(obj);
		});
	},
	toInfoBox: function(obj){
		var $html = $(
			'<div>\n' +
				'ID: <div data-type="id">' + obj.getExtData().lid + '</div>\n' +
				'面积: <div data-type="length">' + parseInt(AMap.GeometryUtil.ringArea(UPolyline.getGeo(obj)))  + ' 平方米</div>\n' +
			'</div>'
		);
		
		return $html;
	}
});

// 其他
var toolbarActive = function($a){
	$a.addClass('active');
	$a.siblings('.active').each(function(index, item){
		toolbarInacitve($(item));
	});
};

var toolbarInacitve = function($a){
	$a.removeClass('active');
};

var localIDGenerator = function () {
	return '_' + Math.random().toString(36).substr(2, 9);
};

// ToolBar
var defaultToolbar = function(containerID){
	var $html = $(
		'<div id="default-bar" class="tool-bar-vertical">\n' +
		'  <a href="javascript:void(0);" data-action="draw-point"><i class="fa fa-dot-circle-o"></i></a>\n' +
		'  <a href="javascript:void(0);" data-action="draw-polyline"><i class="fa fa-line-chart"></i></a>\n' +
		'  <a href="javascript:void(0);" data-action="draw-polygon"><i class="fa fa-area-chart"></i></a>\n' +
		'	<div class="divider"></div>\n' +
		'  <a href="javascript:void(0);" data-action="save"><i class="fa fa-floppy-o"></i></a>\n' +
		'</div>'
	);

	$('#' + containerID).append($html);
	
	return $html;
};

// Info Box
var infoBox = function(containerID){
	var $html = $(
		'<div id="edit-panel">\n' +
		'	<div class="edit-details">\n' +
		'		基本信息: <div data-type="id"></div>\n' +
		'	</div>	\n' +
		'	<div class="edit-btn-group">\n' +
		'		<input type="button" data-action="edit-active" value="编辑"/>\n' +
		'		<input type="button" data-action="edit-inactive" value="完成"/>\n' +
		'		<input type="button" data-action="edit-delete" value="删除"/>\n' +
		'		<input type="button" data-action="edit-refer" value="连接装备"/>\n' +
		'	</div>\n' +
		'</div>'
	);

	$('#' + containerID).append($html);
	
	return $html;
};

var UController = function(containerID){
	var map = UMap(containerID, {});
	var $default_bar = defaultToolbar(containerID);
	var $info_box = infoBox(containerID);
	
	map.plugin(["AMap.MouseTool"],function(){ 
		var stat = 'default'; // default, draw, edit;
		var drawType = undefined; // point, polyline, polygon, .....
		var editType = undefined; // point, polyline, polygon, .....
		var current_obj = undefined;
		var U_DICT = {
			'point': UPoint,
			'polyline': UPolyline,
			'polygon': UPolygon,
		};
		var A_U_Dict = {
			'AMap.Marker': 'point',
			'AMap.Polyline': 'polyline',
			'AMap.Polygon': 'polygon'
		};
		
		var index = 1;
		var activeEdit = function(obj){
			if(stat == 'draw')
				inactiveDraw();
			else if(stat == 'edit'){
				inactiveEdit();
			}
			
			var type = A_U_Dict[obj.CLASS_NAME];
			stat = 'edit';
			editType = type;
			current_obj = obj;
			updateInfoBox(U_DICT[A_U_Dict[obj.CLASS_NAME]].toInfoBox(obj));
			
			U_DICT[type].enableEdit(map, obj, updateInfoBox);
			obj.on('dragend', function(e){
				updateInfoBox(U_DICT[A_U_Dict[obj.CLASS_NAME]].toInfoBox(obj));
			});
		};
		
		var inactiveEdit = function(){
			U_DICT[editType].disableEdit(map, current_obj, function(){/* ##### */});
			stat = 'default';
			editType = undefined;
			console.log(current_obj)
			current_obj.off('dblclick');
			current_obj = undefined;
		};
		
		var inactiveDraw = function(){
			$default_bar.find('[data-action].active').click();
		};
		
		
		var updateInfoBox = function($html){
			$info_box.find('.edit-details').html($html);
		};
		
		
		$default_bar.on('click', '[data-action]', function(e){
			var actionType = $(this).attr('data-action').replace('draw-','');
			if($(this).hasClass('active')){
				stat = 'default';
				drawType = undefined;
				U_DICT[actionType].disableDraw(function(){
					console.log('draw end');
				});
				
				toolbarInacitve($(this));
			}else{
				console.log('draw start');
				if(stat == 'draw'){
					U_DICT[drawType].disableDraw(function(){/* ##### */});
				}else if(stat == 'edit'){
					U_DICT[editType].disableEdit(map, current_obj, function(){/* ##### */});
				}else{
					
				}
				
				stat = 'draw';
				drawType = actionType;
				current_obj = undefined;
				U_DICT[actionType].enableDraw(map, function(obj){
					current_obj = obj;
					updateInfoBox(U_DICT[A_U_Dict[obj.CLASS_NAME]].toInfoBox(obj));
					obj.on('dblclick', function(e){
						activeEdit(e.target);
					});
					obj.on('click', function(e){
						current_obj = e.target;
					});
				});
				
				toolbarActive($(this));
			}
		});
		
		$info_box.on('click', '[data-action]', function(e){
			var actionType = $(this).attr('data-action').replace('edit-','');
			
			if(current_obj != undefined){
				switch(actionType){
					case 'active':
						activeEdit(current_obj);
						break;
					case 'inactive':
						inactiveEdit();
						break;
					case 'delete':
						temp = current_obj
						
						if(stat == 'draw')
							inactiveDraw();
						else if(stat == 'edit'){
							inactiveEdit();
						}
						map.remove(current_obj);
						break;
					case 'refer':
						break;
					default:
						break;
				}
			}else{
				alert('请选择一个编辑对象');
			}
		});
		
	});
};

UController('container')