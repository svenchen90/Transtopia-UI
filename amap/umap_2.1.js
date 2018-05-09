AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
	var iconTheme = 'default';
	var iconStyles = SimpleMarker.getBuiltInIconStyles(iconTheme);
	
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

	var UPoint = function(map, data){
		this.type = 'point';
		var iconTheme = 'default';
		var iconStyles = SimpleMarker.getBuiltInIconStyles(iconTheme);
		this.DEFAULT_STYLE = {
			iconTheme: iconTheme,
			//使用内置的iconStyle
			iconStyle: 'blue',

			//图标文字
			iconLabel: {
				//A,B,C.....
				// innerHTML: String.fromCharCode('A'.charCodeAt(0) + i),
				// style: {
					/* 颜色, #333, red等等，这里仅作示例，取iconStyle中首尾相对的颜色 */
					// color: iconStyles[0]
				// }
			},

			//显示定位点
			showPositionPoint:true,

			//Marker的label(见http://lbs.amap.com/api/javascript-api/reference/overlay/#Marker)
			// label: {
				// content: iconStyles[0],
				// offset: new AMap.Pixel(27, 25)
			// }
		};
		
		this.validate = function(data){
			return true;
		};
		
		this.initialize = function(){
			if(this.validate(data)){
				this.map = map;
				var options = $.extend({}, this.DEFAULT_STYLE, data.style);
				
				options.map = map;
				options.position = data.geo;
				// options.extData = data.extData;
				
				// this.a_obj = new AMap.Marker(options);
				
				this.a_obj = new SimpleMarker(options);
				this.lid = data.lid;

			}else{
				console.log('error - data invalid');
			}
		};
		
		this.setStyle = function(data){
			
		};
		
		this.getStyle = function(){
			
		};
		
		this.getGeo = function(){
			var position = this.a_obj.getPosition();
			return [position.lng, position.lat];
		};
		
		this.toJson = function(){
			var data = {
				
			};
			data.type = this.type;
			data.geo = this.getGeo();
			data.style = this.getStyle();
			// data.extData = this.a_obj.getExtData();
			
			return data;
		};
		
		this.enableEdit = function(callback){
			this.a_obj.setDraggable(true);
			callback();
		};
		
		this.disableEdit = function(callback){
			this.a_obj.setDraggable(false);
			callback();
		};
		
		this.remove = function(){
			this.map.remove(this.a_obj);
		};
		
		this.toInfoPair = function(){
			return {
				"ID": this.lid,
				"坐标": this.getGeo()
			};
		};
		
		this.initialize();
	};

	var UPlotPoint = function(map){
		var drawLisener = undefined;
		this.enable = function(callback){
			if(drawLisener){
				AMap.event.removeListener(drawLisener);
				drawLisener = undefined;
			}
			
			var UP = this;
			drawLisener = AMap.event.addListener(map, "click", function(e){
				var geo = [e.lnglat.getLng(),e.lnglat.getLat()];
				var obj = new UPoint(map, {lid: localIDGenerator(), geo: geo});
				callback(obj);
			});
		};
		
		this.disable = function(){
			AMap.event.removeListener(drawLisener);
		};
	};
	
	var UEditPoint = function(containerID, upoint){
		var $html = $(
			'<div id="default-edit-bar" class="edit-bar-horizontal">\n' +
			'	<span class="cell theme">\n' +
			'		<span>主题： </span>\n' +
			'		<span class="dropdown">\n' +
			'			<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" data-action-btn="setTheme"> <span name="theme">Dropdown Example </span>\n' +
			'			<span class="caret"></span></button>\n' +
			'			<ul class="dropdown-menu">\n' +
			'			</ul>\n' +
			'		</span>\n' +
			'	</span>\n' +
			'	<span class="cell style">\n' +
			'		<span>样式： </span>\n' +
			'		<span class="dropdown">\n' +
			'			<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" data-action-btn="setStyle"> <span name="style">Dropdown Example </span>\n' +
			'			<span class="caret"></span></button>\n' +
			'			<ul class="dropdown-menu">\n' +
			'			</ul>\n' +
			'		</span>\n' +
			'	</span>\n' +
			'	<span class="cell show-position">\n' +
			'		<span>显示坐标点： </span>\n' +
			'		<input type="checkbox" data-action="showPosition">\n' +
			'	</span>\n' +
			'</div>'
		);
		
		var loadTheme = function(theme){
			var themes = ['default', 'fresh', 'numv1', 'numv2'];
			$html.find('[data-action-btn="setTheme"] [name="theme"]').html(theme);
			var $container = $html.find('.theme .dropdown-menu').empty();
			themes.forEach(function(item, index){
				$container.append('<li><a href="javascript:void(0);" data-action="setTheme" data-value="' + item + '">' + item + '</a></li>\n');
			});
		};
		
		var loadStyle = function(theme, style){
			var styles = SimpleMarker.getBuiltInIconStyles(theme);
			$html.find('[data-action-btn="setStyle"] [name="style"]').html(style);
			var $container = $html.find('.style .dropdown-menu').empty();
			styles.forEach(function(item, index){
				$container.append('<li><a href="javascript:void(0);" data-action="setStyle" data-value="' + item + '">' + item + '</a></li>\n');
			});
		};
		
		var loadShowPosition = function(currentShowPosition){
			$html.find('.show-position [data-action="showPosition"]').attr('checked', currentShowPosition);
		}
		
		this.enable = function(){
			var currentTheme = upoint.a_obj.opts.iconTheme;
			var currentStyle = upoint.a_obj.opts.iconStyle;
			var currentShowPosition = upoint.a_obj.opts.showPositionPoint;
			var a_obj = upoint.a_obj;
			var UPE = this;
			
			loadTheme(currentTheme);
			loadStyle(currentTheme, currentStyle)
			loadShowPosition(currentShowPosition);
			
			$html.on('click', '[data-action="setTheme"]', function(e){
				var themeType = $(this).attr('data-value');
				console.log(themeType)
				$html.find('[data-action-btn="setTheme"] [name="theme"]').html(themeType);
				
				var style = SimpleMarker.getBuiltInIconStyles(themeType)[0];
				loadStyle(themeType, style)
				
				a_obj.setIconThemeAndStyle(themeType, style);
				
				if(themeType == 'default' || themeType == 'fresh'){
					a_obj.setOffset(new AMap.Pixel(-17.5, -43))
				}else{
					a_obj.setOffset(new AMap.Pixel(-17.5, -31))
				}
			});
			
			$html.on('click', '[data-action="setStyle"]', function(e){
				var styleType = $(this).attr('data-value');
				$html.find('[data-action-btn="setStyle"] [name="style"]').html(styleType);
				
				a_obj.setIconStyle(styleType);
			});
			
			$html.on('click', '[data-action="showPosition"]', function(e){
				var checked = $(this).is(':checked');
				if(checked)
					a_obj.showPositionPoint()
				else
					a_obj.hidePositionPoint()
			});
			
			$('#' + containerID).append($html);
			
			upoint.enableEdit(function(){});
		};
		
		this.disable = function(){
			$html.remove();
			upoint.disableEdit(function(){});
		};
	};
	
	var UPolyline = function(map, data){
		this.type = 'polyline';
		this.DEFAULT_STYLE = {
			// strokeWeight: 10,
			lineJoin: 'round',
			lineCap: 'round'
		};
		
		this.validate = function(data){
			return true;
		};
		
		this.initialize = function(){
			if(this.validate(data)){
				this.map = map;
				var options = $.extend({}, this.DEFAULT_STYLE, data.style);
				
				options.map = map;
				options.path = data.geo;
				// options.extData = data.extData;
				
				this.a_obj = new AMap.Polyline(options);
				this.lid = data.lid;
			}else{
				console.log('error - data invalid');
			}
		};
		
		this.setStyle = function(data){
			
		};
		
		this.getStyle = function(){
			
		};
		
		this.getGeo = function(){
			return this.a_obj.getPath().map(function(p){
				return [p.lng, p.lat];
			});
		};
		
		this.toJson = function(){
			var data = {
				
			};
			data.type = this.type;
			data.geo = this.getGeo();
			data.style = this.getStyle();
			// data.extData = a_obj.getExtData();
			
			return data;
		};
		
		this.enableEdit = function(callback){
			this.editor = new AMap.PolyEditor(map, this.a_obj);
			this.editor.open();
			
			this.a_obj.setOptions({
				draggable: true,
				cursor: "move"
			});
			
			// var UP = this;
			// this.editor.on('addnode', function(e){
				// callback(UP.toInfoBox(obj));
			// }).on('adjust', function(e){
				// callback(UP.toInfoBox(obj));
			// }).on('removenode', function(e){
				// callback(UP.toInfoBox(obj));
			// });
		};
		
		this.disableEdit = function(callback){
			if(this.editor){
				this.a_obj.setOptions({
					draggable: false,
					cursor: "pointer"
				});
				this.editor.close();
				this.editor = undefined;
			}
		};
		
		this.remove = function(){
			this.map.remove(this.a_obj);
		};
		
		this.toInfoPair = function(){
			return {
				"ID": this.lid,
				"总长度": parseInt(AMap.GeometryUtil.distanceOfLine(this.getGeo(this.a_obj)))
			};
		};
		
		this.initialize();
	};

	var UPlotPolyline = function(map){
		var mousetool = new AMap.MouseTool(map);
		var drawLisener = undefined;
		
		this.enable = function(callback){
			mousetool.polyline();
			
			if(drawLisener){
				AMap.event.removeListener(drawLisener);
				drawLisener = undefined;
			}
			
			drawLisener = AMap.event.addListener(mousetool, "draw", function(e){
				var geo = e.obj.getPath().map(function(p){
					return [p.lng, p.lat];
				});
				
				map.remove(e.obj);
				var obj = new UPolyline(map, {lid: localIDGenerator(), geo: geo})
				callback(obj);
			});
		};
		
		this.disable = function(){
			mousetool.close(true);
			AMap.event.removeListener(drawLisener);
		};
	};

	var UEditPolyline = function(containerID, upolyline){
		var $html = $(
			'<div id="default-edit-bar" class="edit-bar-horizontal">\n' +
			'	<span class="cell weight">\n' +
			'		<span>粗细： </span>\n' +
			'		<span class="dropdown">\n' +
			'			<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" data-action-btn="setWeight"> <span name="weight">Dropdown Example </span>\n' +
			'			<span class="caret"></span></button>\n' +
			'			<ul class="dropdown-menu">\n' +
			'			</ul>\n' +
			'		</span>\n' +
			'	</span>\n' +
			'	<span class="cell color">\n' +
			'		<span>颜色： </span>\n' +
			'		<input type="color" data-action="setColor">\n' +
			'	</span>\n' +
			'	<span class="cell opacity">\n' +
			'		<span>粗细： </span>\n' +
			'		<span class="dropdown">\n' +
			'			<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" data-action-btn="setOpacity"> <span name="opacity">Dropdown Example </span>\n' +
			'			<span class="caret"></span></button>\n' +
			'			<ul class="dropdown-menu">\n' +
			'			</ul>\n' +
			'		</span>\n' +
			'	</span>\n' +
			'	<span class="cell show-outline">\n' +
			'		<span>显示边框： </span>\n' +
			'		<input type="checkbox" data-action="showOutline">\n' +
			'	</span>\n' +
			'</div>'
		);
		
		var a_obj;
		
		var loadWeight = function(){
			var weights = [];
			for(var i=1; i<11; i++){
				weights.push(i);
			}
			
			$html.find('[data-action-btn="setWeight"] [name="weight"]').html(a_obj.getOptions().strokeWeight);
			var $container = $html.find('.weight .dropdown-menu').empty();
			weights.forEach(function(item, index){
				$container.append('<li><a href="javascript:void(0);" data-action="setWeight" data-value="' + item + '">' + item + '</a></li>\n');
			});
		};

		var loadColor = function(){
			$html.find('[data-action="setColor"]').val(a_obj.getOptions().strokeColor);
		};
			
		var loadOpacity = function(){
			var opacity = [];
			for(var i=1; i<11; i++){
				opacity.push(i/10);
			}
			
			$html.find('[data-action-btn="setOpacity"] [name="opacity"]').html(a_obj.getOptions().strokeOpacity);
			var $container = $html.find('.opacity .dropdown-menu').empty();
			opacity.forEach(function(item, index){
				$container.append('<li><a href="javascript:void(0);" data-action="setOpacity" data-value="' + item + '">' + item + '</a></li>\n');
			});
		};
		
		var loadOutline = function(){
			$html.find('.show-outline [data-action="showOutline"]').attr('checked', a_obj.getOptions().isOutline);
		};
		
		
		
		this.enable = function(){
			a_obj = upolyline.a_obj;

			loadWeight();
			loadColor();
			loadOpacity();
			loadOutline();
			
			$html.on('click', '[data-action="setWeight"]', function(e){
				var weight = $(this).attr('data-value');
				a_obj.setOptions({strokeWeight: weight})
				$html.find('[data-action-btn="setWeight"] [name="weight"]').html(weight);
			});
			
			
			$html.on('change', '[data-action="setColor"]', function(e){
				var color = $(this).val();
				a_obj.setOptions({strokeColor: color})
			});
			
			$html.on('click', '[data-action="setOpacity"]', function(e){
				var opacity = $(this).attr('data-value');
				a_obj.setOptions({strokeOpacity: opacity})
				$html.find('[data-action-btn="setOpacity"] [name="opacity"]').html(opacity);
			});
			
			$html.on('click', '[data-action="showOutline"]', function(e){
				var checked = $(this).is(':checked');
				a_obj.setOptions({isOutline: checked})
			});
			
			$('#' + containerID).append($html);
			
			upolyline.enableEdit(function(){});
		};
		
		this.disable = function(){
			$html.remove();
			upolyline.disableEdit(function(){});
		};
	};
	
	var UPolygon = function(map, data){
		this.type = 'polygon';
		this.DEFAULT_STYLE = {};
		
		this.validate = function(data){
			return true;
		};
		
		this.initialize = function(){
			if(this.validate(data)){
				this.map = map;
				var options = $.extend({}, this.DEFAULT_STYLE, data.style);
				
				options.map = map;
				options.path = data.geo;
				// options.extData = data.extData;
				
				this.a_obj = new AMap.Polygon(options);
				this.lid = data.lid;
			}else{
				console.log('error - data invalid');
			}
		};
		
		this.setStyle = function(data){
			
		};
		
		this.getStyle = function(){
			
		};
		
		this.getGeo = function(){
			return this.a_obj.getPath().map(function(p){
				return [p.lng, p.lat];
			});
		};
		
		this.toJson = function(){
			var data = {
				
			};
			data.type = this.type;
			data.geo = this.getGeo();
			data.style = this.getStyle();
			// data.extData = a_obj.getExtData();
			
			return data;
		};
		
		this.enableEdit = function(callback){
			this.editor = new AMap.PolyEditor(map, this.a_obj);
			this.editor.open();
			
			this.a_obj.setOptions({
				draggable: true,
				cursor: "move"
			});
			
			// var UP = this;
			// this.editor.on('addnode', function(e){
				// callback(UP.toInfoBox(obj));
			// }).on('adjust', function(e){
				// callback(UP.toInfoBox(obj));
			// }).on('removenode', function(e){
				// callback(UP.toInfoBox(obj));
			// });
		};
		
		this.disableEdit = function(callback){
			if(this.editor){
				this.a_obj.setOptions({
					draggable: false,
					cursor: "pointer"
				});
				this.editor.close();
				this.editor = undefined;
			}
		};
		
		this.remove = function(){
			this.map.remove(this.a_obj);
		};
		
		this.toInfoPair = function(){
			return {
				"ID": this.lid,
				"总面积": parseInt(this.a_obj.getArea())
			};
		};
		
		this.initialize();
	};

	var UPlotPolygon = function(map){
		var mousetool = new AMap.MouseTool(map);
		var drawLisener = undefined;
		
		this.enable = function(callback){
			mousetool.polygon();
			
			if(drawLisener){
				AMap.event.removeListener(drawLisener);
				drawLisener = undefined;
			}
			
			drawLisener = AMap.event.addListener(mousetool, "draw", function(e){
				var geo = e.obj.getPath().map(function(p){
					return [p.lng, p.lat];
				});
				
				map.remove(e.obj);
				var obj = new UPolygon(map, {lid: localIDGenerator(), geo: geo})
				callback(obj);
			});
		};
		
		this.disable = function(){
			mousetool.close(true);
			AMap.event.removeListener(drawLisener);
		};
	};
	
	var UEditPolygon= function(containerID, upolygon){
		var $html = $(
			'<div id="default-edit-bar" class="edit-bar-horizontal">\n' +
			'	<span class="cell weight">\n' +
			'		<span>边框粗细： </span>\n' +
			'		<span class="dropdown">\n' +
			'			<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" data-action-btn="setWeight"> <span name="weight">Dropdown Example </span>\n' +
			'			<span class="caret"></span></button>\n' +
			'			<ul class="dropdown-menu">\n' +
			'			</ul>\n' +
			'		</span>\n' +
			'	</span>\n' +
			'	<span class="cell color">\n' +
			'		<span>边框颜色： </span>\n' +
			'		<input type="color" data-action="setColor">\n' +
			'	</span>\n' +
			'	<span class="cell opacity">\n' +
			'		<span>边框透明度： </span>\n' +
			'		<span class="dropdown">\n' +
			'			<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" data-action-btn="setOpacity"> <span name="opacity">Dropdown Example </span>\n' +
			'			<span class="caret"></span></button>\n' +
			'			<ul class="dropdown-menu">\n' +
			'			</ul>\n' +
			'		</span>\n' +
			'	</span>\n' +
			'	<span class="cell fill-color">\n' +
			'		<span>填充颜色： </span>\n' +
			'		<input type="color" data-action="setFillColor">\n' +
			'	</span>\n' +
			'	<span class="cell fill-opacity">\n' +
			'		<span>填充透明度： </span>\n' +
			'		<span class="dropdown">\n' +
			'			<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" data-action-btn="setFillOpacity"> <span name="fill-opacity">Dropdown Example </span>\n' +
			'			<span class="caret"></span></button>\n' +
			'			<ul class="dropdown-menu">\n' +
			'			</ul>\n' +
			'		</span>\n' +
			'	</span>\n' +
			'</div>'
		);
		
		var a_obj;
		
		var loadWeight = function(){
			var weights = [];
			for(var i=1; i<11; i++){
				weights.push(i);
			}
			
			$html.find('[data-action-btn="setWeight"] [name="weight"]').html(a_obj.getOptions().strokeWeight);
			var $container = $html.find('.weight .dropdown-menu').empty();
			weights.forEach(function(item, index){
				$container.append('<li><a href="javascript:void(0);" data-action="setWeight" data-value="' + item + '">' + item + '</a></li>\n');
			});
		};

		var loadColor = function(){
			$html.find('[data-action="setColor"]').val(a_obj.getOptions().strokeColor);
		};
			
		var loadOpacity = function(){
			var opacity = [];
			for(var i=1; i<11; i++){
				opacity.push(i/10);
			}
			
			$html.find('[data-action-btn="setOpacity"] [name="opacity"]').html(a_obj.getOptions().strokeOpacity);
			var $container = $html.find('.opacity .dropdown-menu').empty();
			opacity.forEach(function(item, index){
				$container.append('<li><a href="javascript:void(0);" data-action="setOpacity" data-value="' + item + '">' + item + '</a></li>\n');
			});
		};
		
		var loadFillColor = function(){
			$html.find('[data-action="setFillColor"]').val(a_obj.getOptions().fillColor);
		};
			
		var loadFillOpacity = function(){
			var opacity = [];
			for(var i=1; i<11; i++){
				opacity.push(i/10);
			}
			
			$html.find('[data-action-btn="setFillOpacity"] [name="fill-opacity"]').html(a_obj.getOptions().fillOpacity);
			var $container = $html.find('.fill-opacity .dropdown-menu').empty();
			opacity.forEach(function(item, index){
				$container.append('<li><a href="javascript:void(0);" data-action="setFillOpacity" data-value="' + item + '">' + item + '</a></li>\n');
			});
		};
		
	
		
		this.enable = function(){
			a_obj = upolygon.a_obj;

			loadWeight();
			loadColor();
			loadOpacity();
			loadFillColor();
			loadFillOpacity();
			
			$html.on('click', '[data-action="setWeight"]', function(e){
				var weight = $(this).attr('data-value');
				a_obj.setOptions({strokeWeight: weight})
				$html.find('[data-action-btn="setWeight"] [name="weight"]').html(weight);
			});
			
			
			$html.on('change', '[data-action="setColor"]', function(e){
				var color = $(this).val();
				a_obj.setOptions({strokeColor: color})
			});
			
			$html.on('click', '[data-action="setOpacity"]', function(e){
				var opacity = $(this).attr('data-value');
				a_obj.setOptions({strokeOpacity: opacity})
				$html.find('[data-action-btn="setOpacity"] [name="opacity"]').html(opacity);
			});
			
			$html.on('change', '[data-action="setFillColor"]', function(e){
				var color = $(this).val();
				a_obj.setOptions({fillColor: color})
			});
			
			$html.on('click', '[data-action="setFillOpacity"]', function(e){
				var opacity = $(this).attr('data-value');
				a_obj.setOptions({fillOpacity: opacity})
				$html.find('[data-action-btn="setFillOpacity"] [name="fill-opacity"]').html(opacity);
			});
			
			$('#' + containerID).append($html);
			
			upolygon.enableEdit(function(){});
		};
		
		this.disable = function(){
			$html.remove();
			upolygon.disableEdit(function(){});
		};
	};
	
	var UCircle = function(map, data){
		this.type = 'circle';
		this.DEFAULT_STYLE = {};
		
		this.validate = function(data){
			return true;
		};
		
		this.initialize = function(){
			if(this.validate(data)){
				this.map = map;
				var options = $.extend({}, this.DEFAULT_STYLE, data.style);
				
				options.map = map;
				options.center =  data.center,// 圆心位置
				options.radius = data.radius, //半径
				// options.extData = data.extData;
				
				this.a_obj = new AMap.Circle(options);
				this.lid = data.lid;
			}else{
				console.log('error - data invalid');
			}
		};
		
		this.setStyle = function(data){
			
		};
		
		this.getStyle = function(){
			
		};
		
		this.getGeo = function(){

		};
		
		this.toJson = function(){
			var data = {
				
			};
			data.type = this.type;
			data.geo = this.getGeo();
			data.style = this.getStyle();
			// data.extData = a_obj.getExtData();
			
			return data;
		};
		
		this.enableEdit = function(callback){
			this.editor = new AMap.CircleEditor(map, this.a_obj);
			this.editor.open();
			
			this.a_obj.setOptions({
				draggable: true,
				cursor: "move"
			});
			
			// var UP = this;
			// this.editor.on('addnode', function(e){
				// callback(UP.toInfoBox(obj));
			// }).on('adjust', function(e){
				// callback(UP.toInfoBox(obj));
			// }).on('removenode', function(e){
				// callback(UP.toInfoBox(obj));
			// });
		};
		
		this.disableEdit = function(callback){
			if(this.editor){
				this.a_obj.setOptions({
					draggable: false,
					cursor: "pointer"
				});
				this.editor.close();
				this.editor = undefined;
			}
		};
		
		this.remove = function(){
			this.map.remove(this.a_obj);
		};
		
		this.toInfoPair = function(){
			return {
				"ID": this.lid,
			};
		};
		
		this.initialize();
	};
	
	var UPlotCircle = function(map){
		var mousetool = new AMap.MouseTool(map);
		var drawLisener = undefined;
		
		this.enable = function(callback){
			mousetool.circle();
			
			if(drawLisener){
				AMap.event.removeListener(drawLisener);
				drawLisener = undefined;
			}
			
			drawLisener = AMap.event.addListener(mousetool, "draw", function(e){
				var center = [e.obj.getCenter().getLng(),e.obj.getCenter().getLat()];
				var radius = e.obj.getRadius( );
				map.remove(e.obj);
				var obj = new UCircle(map, {lid: localIDGenerator(), center: center, radius, radius})
				callback(obj);
			});
		};
		
		this.disable = function(){
			mousetool.close(true);
			AMap.event.removeListener(drawLisener);
		};
	};
	
	var UEditCircle= function(containerID, ucircle){
	};
	
	var URectangle = function(map, data){
		this.type = 'rectangle';
		this.DEFAULT_STYLE = {};
		
		this.validate = function(data){
			return true;
		};
		
		this.initialize = function(){
			if(this.validate(data)){
				this.map = map;
				var options = $.extend({}, this.DEFAULT_STYLE, data.style);
				
				options.map = map;
				options.bounds = data.bounds;
				// options.extData = data.extData;
				
				this.a_obj = new AMap.Rectangle(options);
				this.lid = data.lid;
			}else{
				console.log('error - data invalid');
			}
		};
		
		this.setStyle = function(data){
			
		};
		
		this.getStyle = function(){
			
		};
		
		this.getGeo = function(){

		};
		
		this.toJson = function(){
			var data = {
				
			};
			data.type = this.type;
			data.geo = this.getGeo();
			data.style = this.getStyle();
			// data.extData = a_obj.getExtData();
			
			return data;
		};
		
		this.enableEdit = function(callback){
			this.editor = new AMap.RectangleEditor(map, this.a_obj);
			this.editor.open();
			
			this.a_obj.setOptions({
				draggable: true,
				cursor: "move"
			});
			
			// var UP = this;
			// this.editor.on('addnode', function(e){
				// callback(UP.toInfoBox(obj));
			// }).on('adjust', function(e){
				// callback(UP.toInfoBox(obj));
			// }).on('removenode', function(e){
				// callback(UP.toInfoBox(obj));
			// });
		};
		
		this.disableEdit = function(callback){
			if(this.editor){
				this.a_obj.setOptions({
					draggable: false,
					cursor: "pointer"
				});
				this.editor.close();
				this.editor = undefined;
			}
		};
		
		this.remove = function(){
			this.map.remove(this.a_obj);
		};
		
		this.toInfoPair = function(){
			return {
				"ID": this.lid,
				"总面积": parseInt(this.a_obj.getArea())
			};
		};
		
		this.initialize();
	};
	
	var UPlotRectangle = function(map){
		var mousetool = new AMap.MouseTool(map);
		var drawLisener = undefined;
		
		this.enable = function(callback){
			mousetool.rectangle();
			
			if(drawLisener){
				AMap.event.removeListener(drawLisener);
				drawLisener = undefined;
			}
			
			drawLisener = AMap.event.addListener(mousetool, "draw", function(e){
				var bounds = e.obj.getBounds();
				map.remove(e.obj);
				var obj = new URectangle(map, {lid: localIDGenerator(), bounds: bounds})
				callback(obj);
			});
		};
		
		this.disable = function(){
			mousetool.close(true);
			AMap.event.removeListener(drawLisener);
		};
	};
	
	var UEditRectangle = function(){};
	
	var defualtPlotBar = function(map, containerID, callback1, callback2){
		var $html = $(
			'<div id="default-plot-bar" class="tool-bar-vertical">\n' +
			'  <a href="javascript:void(0);" action-type="draw" draw-type="point"><i class="fa fa-dot-circle-o"></i></a>\n' +
			'  <a href="javascript:void(0);" action-type="draw" draw-type="polyline"><i class="fa fa-line-chart"></i></a>\n' +
			'  <a href="javascript:void(0);" action-type="draw" draw-type="polygon"><i class="fa fa-area-chart"></i></a>\n' +
			'  <a href="javascript:void(0);" action-type="draw" draw-type="circle"><i class="fa fa-circle-o"></i></a>\n' +
			'  <a href="javascript:void(0);" action-type="draw" draw-type="rectangle"><i class="fa fa-inbox"></i></a>\n' +
			'	<div class="divider"></div>\n' +
			'  <a href="javascript:void(0);" data-action="save"><i class="fa fa-floppy-o"></i></a>\n' +
			'</div>'
		);
		var PLOT_MAP = {
			'point': new UPlotPoint(map),
			'polyline': new UPlotPolyline(map),
			'polygon': new UPlotPolygon(map),
			'circle': new UPlotCircle(map),
			'rectangle': new UPlotRectangle(map)
		};
		var currentType = undefined;
		var DB = this;
		
		this.disable = function(){
			var pre_plot = PLOT_MAP[currentType];
			pre_plot.disable();
			currentType = undefined;
			$html.find('a.active').removeClass('active');
		};
		
		this.enable = function(type){
			callback1();
			currentType = type;
			var plot = PLOT_MAP[currentType];
			plot.enable(function(obj){
				DB.disable();
				callback2(obj)
			});
		};
		
		$html.on('click', '[action-type="draw"]', function(e){
			var type = $(this).attr('draw-type');
			if(type == currentType){
				DB.disable();
			}else{
				if(currentType != undefined){
					DB.disable();
				}
				
				DB.enable(type);

				toolbarActive($(this));
			}
		});
		
		$('#' + containerID).append($html);
	};
	
	var defaultEditBar = function(containerID, u_obj){
		var EDIT_MAP = {
			'point': UEditPoint,
			'polyline': UEditPolyline,
			'polygon': UEditPolygon,
			'circle': UEditPolygon,
			'rectangle': UEditPolygon
		};
		
		return new EDIT_MAP[u_obj.type](containerID, u_obj);
	};
	
	var defaultInfoBox = function(containerID, u_obj){
		var $html = $(
			'<div class="info-box">\n' +
			'	<div class="info-details row">\n' +
			'	</div>\n' +
			'</div>'
		);

		this.enable = function(){
			var dataPair = u_obj.toInfoPair();
			var $container = $html.find('.info-details').empty();
			Object.keys(dataPair).forEach(function(item){
				$container.append('<div class="col-sm-4">' + item + ': </div>');
				$container.append('<div class="col-sm-8">' + dataPair[item] + '</div>');
			});
			
			
			// $html.find('.info-details').append(u_obj.to);
			
			$('#' + containerID).append($html);
		};
		
		this.disable = function(){
			$html.remove();
		};
	};
	
	var UMapController = function(data, containerID = 'container'){
		var map = UMap(containerID, {});
				
		map.plugin(["AMap.MouseTool"],function(){ 
			var default_plot_bar;
			var selectUObj;
			var default_edit_bar;
			var default_info_box;
			
			var addNewOverlay = function(u_obj){
				var a_obj = u_obj.a_obj;
				
				a_obj.on('click', function(e){
					selectUObj = u_obj;
					
					if(default_info_box != undefined){
						default_info_box.disable();
						default_info_box = undefined;
					}
					default_info_box = new defaultInfoBox(containerID, u_obj);
					default_info_box.enable();
				});
				
				a_obj.on('dblclick', function(e){
					if(default_edit_bar != undefined){
						default_edit_bar.disable();
						default_edit_bar = undefined;
					}
					default_edit_bar = defaultEditBar(containerID, u_obj);
					console.log(u_obj);
					console.log(default_edit_bar);
					default_edit_bar.enable();
				});
			};
			
			default_plot_bar = new defualtPlotBar(map, containerID, function(){
				if(default_edit_bar != undefined){
					default_edit_bar.disable();
					default_edit_bar = undefined;
				}
				if(default_info_box != undefined){
					default_info_box.disable();
					default_info_box = undefined;
				}
			},addNewOverlay);
			
			map.on('rightclick', function(){
				if(default_edit_bar != undefined){
					default_edit_bar.disable();
					default_edit_bar = undefined;
				}
				if(default_info_box != undefined){
					default_info_box.disable();
					default_info_box = undefined;
				}
			});
			
		});
	};
	
	UMapController([]);
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
