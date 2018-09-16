/* 
依赖
<link href="../plugins/bootstrap-wysiwyg/external/google-code-prettify/prettify.css" rel="stylesheet">
<link href="http://netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" rel="stylesheet">
<script src="../plugins/bootstrap-wysiwyg/external/jquery.hotkeys.js"></script>
<script src="../plugins/bootstrap-wysiwyg/external/google-code-prettify/prettify.js"></script>
<script src="../plugins/bootstrap-wysiwyg/bootstrap-wysiwyg.js"></script> 
*/
var getEditor = function (id) {
	var $html = $(
		'<div class="wysiwyg-editor">\n' +
		'	<div class="btn-toolbar" data-role="editor-toolbar" data-target="#' + id + '">\n' +
		'		<div class="btn-group">\n' +
		'		<a class="btn dropdown-toggle" data-toggle="dropdown" title="字体" ><i class="icon-font"></i><b class="caret"></b></a>\n' +
		'			<ul class="dropdown-menu">\n' +
		'			</ul>\n' +
		'		</div>\n' +
		'		<div class="btn-group">\n' +
		'		<a class="btn dropdown-toggle" data-toggle="dropdown" title="字体大小"><i class="icon-text-height"></i>&nbsp;<b class="caret"></b></a>\n' +
		'			<ul class="dropdown-menu">\n' +
		'			<li><a data-edit="fontSize 5"><font size="5">大</font></a></li>\n' +
		'			<li><a data-edit="fontSize 3"><font size="3">中</font></a></li>\n' +
		'			<li><a data-edit="fontSize 1"><font size="1">小</font></a></li>\n' +
		'			</ul>\n' +
		'		</div>\n' +
		'		<div class="btn-group">\n' +
		'		<a class="btn" data-edit="bold" title="加粗 (Ctrl/Cmd+B)"><i class="icon-bold"></i></a>\n' +
		'		<a class="btn" data-edit="italic" title="斜体 (Ctrl/Cmd+I)"><i class="icon-italic"></i></a>\n' +
		'		<a class="btn" data-edit="strikethrough" title="（加） 删除线"><i class="icon-strikethrough"></i></a>\n' +
		'		<a class="btn" data-edit="underline" title="下划线 (Ctrl/Cmd+U)"><i class="icon-underline"></i></a>\n' +
		'		</div>\n' +
		'		<div class="btn-group">\n' +
		'		<a class="btn" data-edit="insertunorderedlist" title="项目列表"><i class="icon-list-ul"></i></a>\n' +
		'		<a class="btn" data-edit="insertorderedlist" title="数字列表"><i class="icon-list-ol"></i></a>\n' +
		'		<a class="btn" data-edit="outdent" title="清除缩进 (Shift+Tab)"><i class="icon-indent-left"></i></a>\n' +
		'		<a class="btn" data-edit="indent" title="缩进 (Tab)"><i class="icon-indent-right"></i></a>\n' +
		'		</div>\n' +
		'		<div class="btn-group">\n' +
		'		<a class="btn" data-edit="justifyleft" title="居左 (Ctrl/Cmd+L)"><i class="icon-align-left"></i></a>\n' +
		'		<a class="btn" data-edit="justifycenter" title="居中 (Ctrl/Cmd+E)"><i class="icon-align-center"></i></a>\n' +
		'		<a class="btn" data-edit="justifyright" title="居右 (Ctrl/Cmd+R)"><i class="icon-align-right"></i></a>\n' +
		'		<a class="btn" data-edit="justifyfull" title="正常 (Ctrl/Cmd+J)"><i class="icon-align-justify"></i></a>\n' +
		'		</div>\n' +
		'		<div class="btn-group">\n' +
		'			<a class="btn dropdown-toggle" data-toggle="dropdown" title="超链接"><i class="icon-link"></i></a>\n' +
		'			<div class="dropdown-menu input-append">\n' +
		'				<input class="span2" placeholder="URL" type="text" data-edit="createLink"/>\n' +
		'				<button class="btn" type="button">添加</button>\n' +
		'		</div>\n' +
		'		<a class="btn" data-edit="unlink" title="去除链接"><i class="icon-cut"></i></a>\n' +
		'		</div>\n' +
		'    <div class="btn-group">\n' +
		'			<a class="btn" title="选择图片/拖拽" id="pictureBtn"><i class="icon-picture"></i></a>\n' +
		'			<input type="file" class="hide" data-target="#pictureBtn" data-edit="insertImage" />\n' +
		'		</div>\n' +
		'		<div class="btn-group">\n' +
		'		<a class="btn" data-edit="undo" title="撤消 (Ctrl/Cmd+Z)"><i class="icon-undo"></i></a>\n' +
		'		<a class="btn" data-edit="redo" title="重复 (Ctrl/Cmd+Y)"><i class="icon-repeat"></i></a>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'	<div id="' + id + '" class="editor"></div>\n' +
		'</div>'
	);
	
	var $editor = $html.find('#' + id);
	var $toolbar = $html.find('.btn-toolbar');
	
	// initialize toolbar
	var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 
				'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
				'Times New Roman', 'Verdana'],
				fontTarget = $toolbar.find('[title=字体]').siblings('.dropdown-menu');
	$.each(fonts, function (idx, fontName) {
			fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
	});
	$toolbar.find('a[title]').tooltip({container:'body'});
	$toolbar.find('.dropdown-menu input').click(function() {return false;})
		.change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
		.keydown('esc', function () {this.value='';$(this).change();});

	$toolbar.on('click', '#pictureBtn', function(e){
		$toolbar.find('[data-target="#pictureBtn"]').click();
	}) 
	 
	$editor.wysiwyg({
		toolbarSelector: $toolbar
	});

	return $html;
};
