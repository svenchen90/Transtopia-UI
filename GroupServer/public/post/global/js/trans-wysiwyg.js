/*
<!-- jQuery -->
<script src="../plugins/jQuery/jquery-2.2.3.min.js"></script>

<!-- Bootstrap -->
<link rel="stylesheet" href="../plugins/bootstrap-3.3.6/css/bootstrap.min.css" />
<script src="../plugins/bootstrap-3.3.6/js/bootstrap.min.js"></script>



<!-- Font -->
<link rel="stylesheet" href="../plugins/font-awesome-4.7.0/css/font-awesome.min.css" />

<!-- bootstrap-wysiwyg -->
<script src="../plugins/bootstrap-wysiwyg/external/jquery.hotkeys.js"></script>
<script src="../plugins/bootstrap-wysiwyg/bootstrap-wysiwyg.js"></script>

<!-- slimscroll -->
<script src="../plugins/slimScroll/jquery.slimscroll.min.js"></script>

<!-- jQuery UI -->
<link rel="stylesheet" href="../plugins/jQueryUI/jquery-ui.css">
<script src="../plugins/jQueryUI/jquery-ui.js"></script>
*/

// 交托帮编辑器
(function($){
	//初始化Editor
	$.fn.transWysiwyg = function(userOptions){
		/*
		userOptions = {
			locale: '', //right now is en or zh_cn
			heightOfEditor: ''
		};
		*/
		var options = $.extend({}, $.fn.transWysiwyg.defaults, userOptions);
		
		//初始化toolbar
		var toolBar = $(
			'<div class="btn-toolbar">\n' +
			'  	<div class="btn-group">\n' +
			'		<a class="btn dropdown-toggle" data-toggle="dropdown" data-title="font"><i class="fa fa-font"></i><b class="caret"></b></a>\n' +
			'	  	<ul class="dropdown-menu">\n' +
			'	  	</ul>\n' +
			'	</div>\n' +
			'	<div class="btn-group">\n' +
			'		<a class="btn dropdown-toggle" data-toggle="dropdown" data-title="fontsize"><i class="fa fa-text-height"></i>&nbsp;<b class="caret"></b></a>\n' +
			'	  	<ul class="dropdown-menu">\n' +
			'	  	</ul>\n' +
			'	</div>\n' +
			'	<div class="btn-group">\n' +
			'		<a class="btn" data-edit="bold" data-title="bold"><i class="fa fa-bold"></i></a>\n' +
			'		<a class="btn" data-edit="italic" data-title="italic"><i class="fa fa-italic"></i></a>\n' +
			'		<a class="btn" data-edit="strikethrough" data-title="strikethrough"><i class="fa fa-strikethrough"></i></a>\n' +
			'		<a class="btn" data-edit="underline" data-title="underline"><i class="fa fa-underline"></i></a>\n' +
			'	</div>\n' +
			'	<div class="btn-group">\n' +
			'		<a class="btn" data-edit="insertunorderedlist" data-title="bulletlist"><i class="fa fa-list-ul"></i></a>\n' +
			'		<a class="btn" data-edit="insertorderedlist" data-title="numberlist"><i class="fa fa-list-ol"></i></a>\n' +
			'		<a class="btn" data-edit="outdent" data-title="reduceindent"><i class="fa fa-angle-double-left"></i></a>\n' +
			'		<a class="btn" data-edit="indent" data-title="indent"><i class="fa fa-angle-double-right"></i></a>\n' +
			'	</div>\n' +
			'	<div class="btn-group">\n' +
			'		<a class="btn" data-edit="justifyleft" data-title="alignleft"><i class="fa fa-align-left"></i></a>\n' +
			'		<a class="btn" data-edit="justifycenter" data-title="center"><i class="fa fa-align-center"></i></a>\n' +
			'		<a class="btn" data-edit="justifyright" data-title="alignright"><i class="fa fa-align-right"></i></a>\n' +
			'		<a class="btn" data-edit="justifyfull" data-title="justify"><i class="fa fa-align-justify"></i></a>\n' +
			'	</div>\n' +
			'	<div class="btn-group">\n' +
			'		<a class="btn dropdown-toggle" data-toggle="dropdown" data-title="hyperlink"><i class="fa fa-link"></i></a>\n' +
			'		<div class="dropdown-menu" style="padding: 0;">\n' +
			'			<div class="input-group">\n' +
			'				<input type="text" class="form-control" placeholder="URL" data-edit="createLink">\n' +
			'				<div class="input-group-addon">\n' +
			'					<i class="fa fa-link"></i>\n' +
			'				</div>\n' +
			'			</div>\n' +
			'		</div>\n' +
			'		<a class="btn" data-edit="unlink" data-title="removehyperlink"><i class="fa fa-chain-broken"></i></a>\n' +
			'	</div>\n' +
			'	<div class="btn-group">\n' +
			'		<div class="fileUpload btn" style="position: relative;overflow: hidden;">\n' +
			'			<i class="fa fa-picture-o"></i>\n' +
			'			<input type="file" class="upload" data-edit="insertImage" style="position: absolute;top: 0;right: 0;margin: 0;padding: 0;font-size: 20px;cursor: pointer;opacity: 0;filter: alpha(opacity=0);"/>\n' +
			'		</div>\n' +
			'	</div>\n' +
			'	<div class="btn-group">\n' +
			'		<a class="btn" data-edit="undo" data-title="undo"><i class="fa fa-undo"></i></a>\n' +
			'		<a class="btn" data-edit="redo" data-title="redo"><i class="fa fa-repeat"></i></a>\n' +
			'	</div>\n' +
			'</div>'
		);
		
		
		//Locale Map
		var localeMap = $.fn.transWysiwyg["locales_" + options.locale];
		
		//根据Locale Map加载Toolbar
		$.each(localeMap, function(key, value){
			if(key == 'fontList'){
				var fontListTarget = toolBar.find('[data-title="font"]').siblings('.dropdown-menu');
				$.each(value, function(index, item){
					fontListTarget.append($('<li><a data-edit="fontName ' + item.code +'" style="font-family:\''+ item.code +'\'">'+ item.name + '</a></li>'));
				});
			}else if(key == 'fontSize'){
				var fontSizeTarget = toolBar.find('[data-title="fontsize"]').siblings('.dropdown-menu');
				$.each(value, function(index, item){
					fontSizeTarget.append($('<li><a data-edit="fontSize ' + item.size + '"><font size="' + item.size + '">' + item.name + '</font></a></li>'));
				});
			}else{
				toolBar.find('[data-title="' + key + '"]').attr('title', value)
					.tooltip();
			}
		});
		

		//超链接下拉框
		toolBar.find('.dropdown-menu input').click(function() {return false;})
			.change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
			.keydown('esc', function () {this.value='';$(this).change();});
		
		
		//错误信息
		var errorMsg = $('<div class="error-alert"></div>');
		var errorAlert = function(reason, detail) {
			var msg='';
			if (reason==='unsupported-file-type') { msg = localeMap.errorMsg.msg1 +detail; }
			else {
				console.log("error uploading file", reason, detail);
			}
			$('<div class="alert alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
			 '<strong>' + localeMap.errorMsg.msg2 + '</strong> '+msg+' </div>').prependTo(errorMsg);
		}; 
		
		

		//加载编辑器
		var editor = $('<div class="editor"></div>').css('border', '1px solid rgba(0,0,0,0.23)');;
		
		editor.wysiwyg({ fileUploadError: errorAlert, toolbarSelector: toolBar} );
		
		
		
		
		
		$(this).append(errorMsg);
		$(this).append(toolBar);
		$(this).append(editor);
		
		
		//添加后加载
		editor.slimScroll({
			height: options.heightOfEditor
		});
		
		//使图片resize
		editor.on('click', function(evt){
			var target = evt.target;
			if($(target).is('img')){
				$(target).resizable({"minWidth": 50, aspectRatio: true});
			}
		});
	};
	
	//处理并获取数据
	$.fn.getTransWysiwygData = function(id){
		var content = $(
			'<div class="content-editor">' + $(this).find('.editor').html() + '</div>'
		);
		var imagesData = [];
		
		$.each(content.find('img'), function(index, item){
			var src = $(item).attr("src");
			if(src!=undefined&&src!=null&&src.startsWith("data:image")){
				imagesData.push(src);
				content.find('img:eq(' + index + ')').attr('src', id + "_" + index + ".png")
					.attr('data-index', imagesData.length - 1);
			}
		});
		
		return {
			content: content.html(),
			images: JSON.stringify(imagesData)
		}
	};
	
	//加载内容
	$.fn.loadTransWysiwygData = function(data){
		$(this).find('.editor').html(data);
	};
	
	
	// 清空Editor
	$.fn.cleanTransWysiwyg = function(){
		$(this).find('.editor').empty();
	};
	
	// 移除Editor
	$.fn.destroyTransWysiwyg = function(){
		$(this).empty();
	};
	
	$.fn.transWysiwyg.defaults = {
		locale: 'zh_cn',
		heightOfEditor: '350px'
	};
	
	$.fn.transWysiwyg.locales_en = {
		"font": "Font",
		fontList: [
			{
				name: 'Serif',
				code: 'Serif'
			},{
				name: 'Sans',
				code: 'Sans'
			},{
				name: 'Arial',
				code: 'Arial'
			},{
				name: 'Arial Black',
				code: 'Arial Black'
			},{
				name: 'Courier',
				code: 'Courier'
			},{
				name: 'Courier New',
				code: 'Courier New'
			},{
				name: 'Comic Sans MS',
				code: 'Comic Sans MS'
			},{
				name: 'Helvetica',
				code: 'Helvetica'
			},{
				name: 'Impact',
				code: 'Impact'
			},{
				name: 'Lucida Grande',
				code: 'Lucida Grande'
			},{
				name: 'Lucida Sans',
				code: 'Lucida Sans'
			},{
				name: 'Tahoma',
				code: 'Tahoma'
			},{
				name: 'Times',
				code: 'Times'
			},{
				name: 'Times New Roman',
				code: 'Times New Roman'
			},{
				name: 'Verdana',
				code: 'Verdana'
			}], 
		"fontsize": "Font Size",
		fontSize: [
			{
				name: "Huge",
				size: "5",
			},{
				name: "Normal",
				size: "3",
			},{
				name: "Small",
				size: "1",
			}
		],
		"bold": "Bold (Ctrl/Cmd+B)",
		"italic" : "Italic (Ctrl/Cmd+I)",
		"strikethrough": "Strikethrough",
		"underline": "Underline (Ctrl/Cmd+U)",
		"bulletlist": "Bullet List",
		"numberlist": "Number List",
		"reduceindent": "Reduce Indent (Shift+Tab)",
		"indent": "Indent (Tab)",
		"alignleft": "Align Left (Ctrl/Cmd+L)",
		"center": "Center (Ctrl/Cmd+E)",
		"alignright": "Align Right (Ctrl/Cmd+R)",
		"justify": "Justify (Ctrl/Cmd+J)",
		"hyperlink": "Hyperlink",
		"removehyperlink": "Remove Hyperlink",
		"undo": "Undo (Ctrl/Cmd+Z)",
		"redo": "Redo (Ctrl/Cmd+Y)",
		errorMsg:{
			msg1: 'Unsupported file format',
			msg2: 'Error when uploading file: '
		}
	};

	
	$.fn.transWysiwyg.locales_zh_cn = {
		"font" : "字体",
		fontList: [
			{
				name: '宋体',
				code: 'SimSun'
			},{
				name: '黑体',
				code: 'SimHei'
			},{
				name: '微软正黑体',
				code: 'Microsoft YaHei'
			},{
				name: '新宋体',
				code: 'NSimSun'
			},{
				name: '新细明体',
				code: 'PMingLiU'
			},{
				name: '细明体',
				code: 'MingLiU'
			},{
				name: '标楷体',
				code: 'DFKai-SB'
			},{
				name: '仿宋',
				code: 'FangSong'
			},{
				name: '楷体',
				code: 'KaiTi'
			},{
				name: '幼圆',
				code: 'YouYuan'
			},{
				name: '隶书',
				code: 'LiSu'
			}
		],
		"fontsize": "字体大小",
		fontSize: [
			{
				name: "大",
				size: "5",
			},{
				name: "中",
				size: "3",
			},{
				name: "小",
				size: "1",
			}
		],
		"bold": "加粗 (Ctrl/Cmd+B)",
		"italic" : "斜体 (Ctrl/Cmd+I)",
		"strikethrough": "删除线",
		"underline": "下划线 (Ctrl/Cmd+U)",
		"bulletlist": "点状列表",
		"numberlist": "数字列表",
		"reduceindent": "取消缩进 (Shift+Tab)",
		"indent": "缩进 (Tab)",
		"alignleft": "居左 (Ctrl/Cmd+L)",
		"center": "居中 (Ctrl/Cmd+E)",
		"alignright": "居右 (Ctrl/Cmd+R)",
		"justify": "左对齐 (Ctrl/Cmd+J)",
		"hyperlink": "超链接",
		"removehyperlink": "取消超链接",
		"undo": "撤销 (Ctrl/Cmd+Z)",
		"redo": "恢复 (Ctrl/Cmd+Y)",
		errorMsg:{
			msg1: '不支持该格式',
			msg2: '文件上传错误：'
		}
	};
	
})(jQuery);