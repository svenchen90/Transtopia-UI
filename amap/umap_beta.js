/* data:{
	mapData: {}
	features: [{
		type:
		geo:
		extData:
		style:
	}] 
} */


/* schema{
	geo:
	extData: {}
	style: {}
} */
var UPoint = function(map){
	var a_obj, editor;
	var type = 'point';
	var DEFAULT_STYLE ={
		
	};
	
	this.initialize = function(data){
		if(this.validate(data)){
			var options = $.extend({}, DEFAULT_STYLE, data.style);
			
			options.map = map;
			options.position = data.geo;
			options.extData = data.extData;
			
			a_obj = new AMap.Marker(options);
		}else{
			console.log('error - data invalid');
		}
	};
	
	this.validate = function(data){
		return true;
	};
	
	this.setStyle = function(data){
		if(this.validate(data)){
			
		}else{
			console.log('error - data invalid');
		}
	};
	
	this.getStyle = function(){
		return {};
	};
	
	this.getGeo = function(){
		var position = a_obj.getPosition();
		return [position.lng, position.lat];
	};
	
	this.enableEdit = function(callback){
		a_obj.setDraggable(true);
		callback();
	};
	
	this.disableEdit = function(callback){
		point.setDraggable(false);
		callback();
	};
	
	this.toJson = function(){
		var data = {
			
		};
		data.type = type;
		data.geo = this.getGeo();
		data.style = this.getStyle();
		data.extData = a_obj.getExtData();
		
		return data;
	};
	
	this.getObj = function(){
		return a_obj;
	};
	
	this.initialize();
};

var UPolyline = function(map, data){
	var a_obj, editor;
	var type = 'polyline';
	var DEFAULT_STYLE ={
		
	};
	
	this.initialize = function(){
		if(this.validate(data)){
			var options = $.extend({}, DEFAULT_STYLE, data.style);
			
			options.map = map;
			options.path = data.geo;
			options.extData = data.extData;
			
			a_obj = new AMap.Marker(options);
			editor = new AMap.PolyEditor(map, a_obj);
		}else{
			console.log('error - data invalid');
		}
	};
	
	this.validate = function(data){
		return true;
	};
	
	this.setStyle = function(data){
		if(this.validate(data)){
			
		}else{
			console.log('error - data invalid');
		}
	};
	
	this.getStyle = function(){
		return {};
	};
	
	this.getGeo = function(){
		return a_obj.getPath().map(function(p){
			return [p.lng, p.lat];
		});
	};
	
	this.enableEdit = function(callback){
		editor.open();
		a_obj.setOptions({
			draggable: true,
			cursor: "move"
		});
		
		callback();
	};
	
	this.disableEdit = function(callback){
		a_obj.setOptions({
			draggable: false,
			cursor: "pointer"
		});
		editor.close();
	};
	
	this.toJson = function(){
		var data = {
			
		};
		data.type = type;
		data.geo = this.getGeo();
		data.style = this.getStyle();
		data.extData = a_obj.getExtData();
		
		return data;
	};
	
	this.getObj = function(){
		return a_obj;
	};
	
	this.initialize();
};

var UPolygon = function(map, data){
	UPolyline.call(this, map, data);
	type = 'polygon';
};
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
	
	this.active = function($a){
		$a.addClass('active');
		$a.siblings('.active').each(function(index, item){
			toolbarInacitve($(item));
		});
	};
	
	this.inactive = function($a){
		$a.removeClass('active');
	};
	
	(function(){
		$html.on('click', '[data-action]', function(e){
			
		});
		
		$('#' + containerID).append($html);
	})();
};

var UMap = function(containerID, data, toolbar=['default']){
	var a_obj;
	var DEFAULT_STYLE = {
		resizeEnable: true,
		// dragEnable: false
		enter: [116.397428, 39.90923],//地图中心点
		zoom: 13, //地图显示的缩放级别
		features: ['bg','point', 'road', 'building']
	};
	var featureDict = {};
	var FEATURE_TYPE_MAP = {
		point: UPoint,
		polyline: UPolyline,
		polygon: UPolygon
	};
	
	this.initialize = function(){
		if(this.validate(data)){
			var options = $.extend({}, DEFAULT_STYLE, data.mapData);
			
			var id = "map_" +  data.mapdata.id;
			$('#' + containerID).append('<div id="map_' + data.mapdata.id + '"></div>');
			
			a_obj = new AMap.Map(id, options);
		}else{
			console.log('error - data invalid');
		}
	};
	
	this.validate = function(data){
		return true;
	};
	
	this.addFeature = function(data){
		var id = data.extData.id;
		featureDict.id = new FEATURE_TYPE_MAP[data.type](a_obj, data);
	};
	
	this.removeFeatureByID = function(id){
		var feature = featureDict.id;
		a_obj.remove(feature.getObj());
		delete featureDict(id);
	};
	
	this.removeAll = function(id){
		featureDict = {};
		a_obj.getAllOverlays().forEach(function(item){
			a_obj.remove(item);
		});
	};
	
	this.toJson = function() {
		var data = {
			features: []
		};
		
		a_obj.getAllOverlays().map(function(item){
			var id = item.extData.id;
			data.features.push(featureDict.id.toJson());
		});
		
		return data;
	};
	
	this.initialize();
};

var UPlot = function(map){
	var pointLisener; // plot point
	var mousetool = new AMap.MouseTool(map);; // plot polyline, polygon & ....
	var current_obj; // current obj on plot;
	
	this.enablePlot = function(type){
		switch(type):
			case 'point':
				enablePoint(function(){
					
				});
				break;
			case 'polyline':
				enablePolyline(function(){
					
				});
				break;
			case 'polygon':
				enablePolyline(function(){
					
				});
				break;
			default:
				console.log('error');
				break;
	};
	
	this.enablePoint = function(callback){
		console.log('starting plot point');
		pointLisener = AMap.event.addListener(map, "click", function(e){		
			var geo = [e.lnglat.getLng(),e.lnglat.getLat()];
			callback(map, geo, 'point');
		});
	};
	
	this.disablePoint = function(){
		console.log('ending plot point');
		if(pointLisener)
			AMap.event.removeListener(pointLisener);
	};
	
	this.enablePolyline = function(callback){
		console.log('starting plot polyline');
		mousetool.polyline();
		
		mousetool.on('draw', function(e){
			var geo = e.obj.getPath();
			map.remove(e.obj);
			callback(map, geo, 'polyline');
		});
	};
	
	this.disablePolyline = function(){
		mousetool.close();
		mousetool.off('draw');
		console.log('ending plot polyline');
	};
	
	this.enablePolygon = function(callback){
		console.log('starting plot polygon');
		mousetool.polygon();
		
		mousetool.on('draw', function(e){
			var geo = e.obj.getPath();
			map.remove(e.obj);
			callback(map, geo, 'polygon');
		});
	};
	
	this.disablePolygon = function(){
		mousetool.close();
		mousetool.off('draw');
		console.log('ending plot polygon');
	};
};


var UController = function(){
	
};