// 1. Map
var initializeMap = function(containerID, options){
	var default_options = {
		resizeEnable: true,
		// dragEnable: false
		enter: [116.397428, 39.90923],//地图中心点
		zoom: 13, //地图显示的缩放级别
		features: ['bg','point', 'road', 'building']
	};

	return new AMap.Map(containerID, $.extend({}, default_options, options));
};

var initialMouseTool = function(map){
	return new AMap.MouseTool(map); 
};

var mapToJson = function(map) {
	return map.getAllOverlays().map(function(item){
		return MAP_SHAPE[item.CLASS_NAME].toJson(item);
	});
};

// 2. Point(Marker)
var loadPoint = function(map, position, extData, options){
	var default_options = {
		
	};
	var options = $.extend({}, default_options, options);
	
	options.map = map;
	options.position = position;
	options.extData = extData;
	
	return new AMap.Marker(options);
};

var enableDrawPoint = function(map, callback=function(){}){
	var lisener = AMap.event.addListener(map, "click", function(e){
		var p = loadPoint(map, [e.lnglat.getLng(),e.lnglat.getLat()], {});
		callback(lisener, p);
	});
	
	return lisener;
};

var disableDrawPoint = function(addPointListener){
	if (addPointListener) {
		AMap.event.removeListener(addPointListener);//移除地图事件，以绑定时返回的对象作为参数
	}
};

var removePoint = function(map, point){
	map.remove(point);
};

var enableEditPoint = function(point){
	point.setDraggable(true);
};

var disableEditPoint = function(point){
	point.setDraggable(false);
};

var pointToJson = function(point){
	console.log('point to json');
	var data = {
		
	};
	
	data.position = (function(){
		var position = point.getPosition();
		return [position.lng, position.lat];
	})();
		
	data.options = (function(){
		return {}
	})();
	
	data.extData = point.getExtData();
	
	console.log(data);
	return data;
};

var Point = {
	load : loadPoint,
	enableDraw: enableDrawPoint,
	disableDraw: disableDrawPoint,
	remove: removePoint,
	enableEdit: enableEditPoint,
	disableEdit: disableEditPoint,
	toJson: pointToJson
};

// 3. Polyline
var loadPolyline = function(map, positionArr, extData, options){
	var default_options = {
		
	};
	var options = $.extend({}, default_options, options);
	
	options.map = map;
	options.path = positionArr;
	options.extData = extData;
	
	return new AMap.Polyline(options);
};

var enableDrawPolyline = function(mousetool){
	mousetool.polyline();
};

var disableDrawPolyline = function(mousetool){
	mousetool.close();
};

var removePolyline = function(map, polyline){
	map.remove(polyline);
};

var enableEditPolyline = function(map, polyline){
	var editor = new AMap.PolyEditor(map, polyline);
	editor.open();
	
	polyline.setOptions({
		draggable: true,
		cursor: "move"
	});
	
	return editor;
};

var disableEditPolyline = function(polyline, editor){
	polyline.setOptions({
		draggable: false,
		cursor: "pointer"
	});
	editor.close();
};

var polylineToJson = function(polyline){
	console.log('polyline to json');
	var data = {
		
	};
	
	data.position = (function(){
		return polyline.getPath().map(function(p){
			return [p.lng, p.lat];
		});
	})();
		
	data.options = (function(){
		return {}
	})();
	
	data.extData = polyline.getExtData();
	
	return data;
};

var Polyline = {
	load : loadPolyline,
	enableDraw: enableDrawPolyline,
	disableDraw: disableDrawPolyline,
	remove: removePolyline,
	enableEdit: enableEditPolyline,
	disableEdit: disableEditPolyline,
	toJson: polylineToJson
};

// 4. Polygon
var loadPolygon = function(map, positionArr, extData, options){
	var default_options = {
		
	};
	var options = $.extend({}, default_options, options);
	
	options.map = map;
	options.path = positionArr;
	options.extData = extData;
	
	return new AMap.Polygon(options);
};

var enableDrawPolygon = function(mousetool){
	mousetool.polygon();
};

var disableDrawPolygon = function(mousetool){
	mousetool.close();
};

var removePolygon = function(map, polygon){
	map.remove(polygon);
};

var enableEditPolygon = function(map, polygon){
	var editor = new AMap.PolyEditor(map, polygon);
	editor.open();
	
	polygon.setOptions({
		draggable: true,
		cursor: "move"
	});
	
	return editor;
};

var disableEditPolygon = function(polygon, editor){
	polygon.setOptions({
		draggable: false,
		cursor: "pointer"
	});
	editor.close();
};

var polygonToJson = function(polygon){
	console.log('polygon to json');
	var data = {
		
	};
	
	data.position = (function(){
		return polygon.getPath().map(function(p){
			return [p.lng, p.lat];
		});
	})();
		
	data.options = (function(){
		return {}
	})();
	
	data.extData = polygon.getExtData();
	
	return data;
};

var Polygon = {
	load : loadPolygon,
	enableDraw: enableDrawPolygon,
	disableDraw: disableDrawPolygon,
	remove: removePolygon,
	enableEdit: enableEditPolygon,
	disableEdit: disableEditPolygon,
	toJson: polygonToJson
};

// 其它
var toolbarActive = function($a){
	$a.addClass('active');
	$a.siblings('.active').each(function(index, item){
		toolbarInacitve($(item));
	});
};

var toolbarInacitve = function($a){
	$a.removeClass('active');
};


// MAP
var MAP_SHAPE = {
	'AMap.Marker': Point,
	'AMap.Polyline': Polyline,
	'AMap.Polygon': Polygon
};

// var disableEditPolyline = function(polyline, )
(function(){
	var map = initializeMap('container');
	var mousetool = initialMouseTool(map);
	var addPointListener;
	var current;
	var editor;
	
	// 加载默认工具栏
	$('#default-bar').on('click', 'a', function(){
		var actionType = $(this).attr('data-action');
		toolbarActive($(this));
		
		Point.disableDraw(addPointListener)
		Polyline.disableDraw(mousetool)
		Polygon.disableDraw(mousetool)
		if(current && editor)
			MAP_SHAPE[current.CLASS_NAME].disableEdit(current, editor);
		
		switch(actionType){
			case 'draw-point':
				addPointListener = Point.enableDraw(map, function(l, p){
					Point.disableDraw(l);
					toolbarInacitve($('#default-bar .active'));
					current = p;
					Point.enableEdit(current);
				});
				break;
			case 'draw-polyline':
				Polyline.enableDraw(mousetool)
				break;
			case 'draw-polygon':
				Polygon.enableDraw(mousetool)
				break;
			case 'save':
				console.log(mapToJson(map));
				break;
			default:
				console.log('error');
				break;
		};
	});
	
	mousetool.on('draw', function(e){
		current = e.obj;
		MAP_SHAPE[current.CLASS_NAME].disableDraw(mousetool);
		toolbarInacitve($('#default-bar .active'));
		// MAP_SHAPE[current.CLASS_NAME].disableEdit(e.obj,editor);
		editor = MAP_SHAPE[current.CLASS_NAME].enableEdit(map, current);
		
		e.obj.on('dblclick', function(){
			MAP_SHAPE[current.CLASS_NAME].disableEdit(e.obj,editor);
			current = e.obj;
			editor = MAP_SHAPE[current.CLASS_NAME].enableEdit(map, current);
		});
	});
	
	$('#edit-panel').on('click', '[data-action]', function(e){
		var actionType = $(this).attr('data-action');
		
		switch(actionType){
			case 'edit-finish':
				MAP_SHAPE[current.CLASS_NAME].disableEdit(current, editor);
				break;
			case 'edit-delete':
				MAP_SHAPE[current.CLASS_NAME].disableEdit(current, editor);
				MAP_SHAPE[current.CLASS_NAME].remove(map, current);
				break;
			case 'edit-refer':
				alert('连接到装备库');
				break;
			default:
				console.log('error');
				break;
		};
	});
	
	map.on('click', function(e){
		console.log(e);
	});
	
	
	
	/* var mousetool = initialMouseTool(map);
	var addPointListener = enableAddPoint(map)
	
	map.on('click', function(e){
		disableAddPoint(addPointListener);
	}); */
	/* var point = loadPoint(map, [116.368904, 39.913423], {a: 123123});
	
	map.on('click', function(e){
		//removePoint(map, point);
		//enableEditPoint(point);
		var data = pointToJson(point);
	});
	
	point.on('dragend', function(e){
		console.log(point.getPosition());
		disableEditPoint(point);
	}); */
	/*
	var polyline = loadPolyline(map, 
		[
			[116.403322,39.920255],
			[116.410703,39.897555],
			[116.402292,39.892353],
			[116.389846,39.891365]
		], {a: 123123}
	);
	
	var editor;
	map.on('click', function(e){
		editor = enableEditPolyline(map, polyline)
		console.log(polyline);
		
		map.setFitView(polyline);
	});
	
	map.on('rightclick', function(e){
		console.log('rightclick')
		//removePolyline(map, polyline);
		//console.log(editor);
		disableEditPolyline(polyline, editor);
		//polylineToJson(polyline);
		enableDrawPolyline(mousetool);
	});
	
	map.on('dblclick', function(e){
		console.log('dblclick')
		disableDrawPolyline(mousetool)
	});
	
	mousetool.on('draw', function(e){
		enableEditPolyline(map, e.obj);
	});
	*/
	
	/* var point = loadPoint(map, [116.368904, 39.913423], {a: 123123});
	var polygon = loadPolygon(map, 
		[
			[116.403322,39.920255],
			[116.410703,39.897555],
			[116.402292,39.892353],
			[116.389846,39.891365]
		], {a: 123123}
	); */
	
	//console.log(map.getAllOverlays())
	/* 
	var editor;
	map.on('click', function(e){
		map.setFitView(polygon);
	});
	
	map.on('rightclick', function(e){
		console.log('rightclick')
		console.log(polylineToJson(polygon))
		enableDrawPolygon(mousetool);
		// removePolygon(map, polygon)
		// editor = enableEditPolygon(map, polygon)
	});
	
	map.on('dblclick', function(e){
		console.log('dblclick')
		disableDrawPolygon(mousetool)
		// disableEditPolygon(polygon, editor)
	});
	
	mousetool.on('draw', function(e){

	});
	 */
})();

var a = {
	cde: 111,
	abc: function(){
		this.cde = 222;
	}
	
};
a.abc();
console.log(a.cde);
