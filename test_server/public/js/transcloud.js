//文件管理对象
var transCloud = {
	//模态框HTML对象
	styleModal: $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog" style="width: 50vw;">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
		'				<h4 class="modal-title"></h4>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div class="dir" style="display: inline-block; line-height: 34px;"></div>\n' +
		'				<div class="form-group pull-right" style="width: 250px;">\n' +
		'					<div class="input-group">\n' +
		'						<input type="text" class="form-control" placeholder="搜索..." data-action="search" />\n' +
		'						<div class="input-group-addon" style="cursor: pointer;">\n' +
		'							<i class="fa fa-search"></i>\n' +
		'						</div>\n' +
		'					</div>\n' +
		'				</div>\n' +
		'				<div class="clearfix"></div>\n' +
		'				<div class="file-block">\n' +
		'				</div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a href="javascript:void(0)" data-dismiss="modal">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	),
	//初始化
	initialize: function(title){
		/* 
			Dependence: 1. SlimScroll
		 */
		var modal = this.styleModal;
		//CSS
		$(modal).find('.file-block').slimScroll({
			height: '60vh'
		});
		$(modal).find('.modal-dialog').css({width: '50vw'});
		$(modal).find('.modal-title').text(title);
		
		//加载文件列表
		//$(modal).reloadTransCloud({dirFull: inputs.dirFull, dirRoot: inputs.dirRoot, dataRequest: inputs.dataRequest, createCard: createFileCardHTML});
		
		/* 搜索效果 */
		$(modal).find('[data-action="search"]').on('change', function(){
			var query = $(this).val();
			$.each($(modal).find('.file-block > div'), function(i,t){
				var name = $(t).find('[data-type="name"]').text();
				if(!name.match(query)){
					$(t).addClass('hide');
				}else
					$(t).removeClass('hide');
			});
		});
		
		//事件监听：左键点击
		$(modal).find('.modal-body').on("click", function (e) {
			//关闭自定义菜单
			$('body').find('.custom-menu').hide();
		});
		
		//事件监听：关闭模态框
		$(modal).on('hidden.bs.modal', function(){
			//关闭自定义菜单
			$('body').find('.custom-menu').hide();
			//移除模态框
			$(this).remove();
		});
		
		//显示模态框
		$(modal).modal('show');
	},
	//加载数据
	load: function(){
		/* 
		inputs 结构：
		{
			dirFull:
			dirRoot:
			dataRequest: 获取文件列表数据URL
			createCard: function， 创建文件HTML样式
		}
		 */
		var target = $(this);
		$. ({
			url : inputs.dataRequest,
			data: {dir: inputs.dirFull},
			cache : false, 
			async : false,
			type : "GET",
			dataType : 'json',
			success : function (result){
				/* 
				result 结构：
				[{
					type: 1： 文件， 2： 文件夹
					name: 名称
					dir: 路径，此为文件的主键
					icon: 图标
					bgColor: 文件背景色
				}]
				 */
				 
				/* 0.清楚原有数据 */
				$(target).find('.dir').empty();
				$(target).find('.file-block').empty();
				 
				/* 1. 加载dir */
				//获取路径列表
				var listDir = getAvaliablePath(inputs.dirRoot, inputs.dirFull);
				//加载路径
				$.each(listDir, function(index, item){
					var dirStyle = $('<span class="dir-item" data-dir="' + item[1] + '">' + item[0] + '<i class="material-icons">keyboard_arrow_down</i></span>');
					$(target).find('.dir').append(dirStyle);
					
					$(dirStyle).on('click', function(){
						$(target).reloadTransCloud({dirFull: item[1], dirRoot: inputs.dirRoot, dataRequest: inputs.dataRequest, createCard: inputs.createCard});
					});
				});
				
				/* 2.加载文件 */
				$.each(result, function(index, data){
					//创建文件样式
					var createCard = inputs.createCard ? inputs.createCard: createFileCardHTML;
					var item = createCard(data);
					
					if(data.type == 1){
						$(target).find('.file-block').append(item);
					}else if(data.type == 2){
						$(target).find('.file-block').prepend(item);
					}else{
						
					}
					
					
					/* 添加拖拽效果 */
					$(item).draggable({
						zIndex: 2500,
						revert: true
					});
					
					if(data.type == 2)
						$(item).droppable({
							drop: function( event, ui ) {
								/* 
									ui.draggable : drag对象
									event.target : drop对象
								*/
								var dirDrag = $(ui.draggable).find('[data-dir]').attr('data-dir');
								var dirDrop = $(event.target).find('[data-dir]').attr('data-dir');
		
								//$(ui.draggable).remove();
								console.log(dirDrag);
								console.log(dirDrop);
								//console.log($(ui.draggable).find('[data-type="name"]').text());
								callConfirm('移动文件', '您确定要移动该文件？', function(){
									$.ajax({
										url : '/movefile',
										data: {dirItem: dirDrag, dirTarget: dirDrop},
										cache : false, 
										async : false,
										type : "GET",
										dataType : 'json',
										success : function (result){
											$(target).reloadTransCloud(inputs);
											callAlert('文件移动成功！','done');
										}
									});
								});
							}
						});
					
					$(item).on('click',function(ev){
						if(data.type == 1){
							window.open(data.dir);
							//window.location.href = data.dir;
						}else if(data.type == 2){
							//console.log(data.dir);
							$(target).reloadTransCloud({dirFull: data.dir, dirRoot: inputs.dirRoot, dataRequest: inputs.dataRequest, createCard: inputs.createCard});
						}
						
					});
				});
				
				//菜单效果
				$(target).find('.file-block').unbind('contextmenu');
				$(target).find('.file-block').on('contextmenu', function(ev){
					ev.preventDefault();
					
					//获取被点击对象
					var target = $(ev.target).closest('.file-card');
					var dir, type;
					
					if(target.length == 0){
						//点击对象为面板
						dir = inputs.dirFull;
						type = 3;
					}else if(target.length == 1){
						//点击对象为文件||文件夹
						dir = $(target).attr('data-dir');
						type = $(target).attr('data-type');
					}else{
						
					}
					
					//加载菜单
					$.ajax({
						url : '/gerfilemenu',
						data: {dir: dir, dirFolder: inputs.dirFull, type: type, dirCopy: dirCopy, authority: authority},
						cache : false, 
						async : false,
						type : "GET",
						dataType : 'json',
						success : function (result){
							//获取当前操作菜单
							var menuHTML = customizeRightClickMenu(result);
							//添加菜单
							$('body').append(menuHTML);
							//显示菜单
							$(menuHTML).css({position: 'absolute', top: ev.pageY, left: ev.pageX, 'z-index': 2000});
						}
					});
				});
				/* end of success */
			}
		});
	}
};

//transCloud.initializeTransCloud({title: '文件管理'});

$(transCloud.styleModal).on('hidden.bs.modal', function(){
	//移除模态框
	$(this).remove();
});


$('.block-left').on('click', function(){
	$(transCloud.styleModal).on('click', function(){
		console.log(11);
	});

	$(transCloud.styleModal).modal('show');
});

var abc = function(test){
	if(test == undefined)
		console.log(2);
	else
		console.log(test);
}
/* transCloud.initializeTransCloud(11); */