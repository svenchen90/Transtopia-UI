/* 
1. 模态卡 - ModalCard
2. 添加模态卡 ModalNewCard
3. 双行操作框(TwinRowModal) -TwinRow
 */
/* 1. 模态卡 */
var ModalCard = function(data){
	/* 
		data: {
			id: '',
			name: '',
			icon: '',
			iconHover: '' //add_circle_outline, highlight_off
			clickCallback: 
		}
	 */
	var card = $(
		'<div class="col-lg-2 col-md-3 col-sm-4">\n' +
		'	<div class="modal-card" style="background-color: ' + googleColorRandomPicker() + ';">\n'+
		'		<div class="card-body">\n'+
		'			<div class="content-default">\n'+
		'				<i class="material-icons"></i>\n'+
		'				<div data-type="name"></div>\n'+		
		'			</div>\n'+
		'			<div class="content-hover">\n'+
		'				<i class="material-icons"></i>\n'+
		'				<div></div>\n'+
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	//加载数据
	if(data.id)
		card.attr('data-id', data.id);
	else
		card.attr('data-id', data.name);
	
	card.find('.content-default .material-icons').text(data.icon);
	card.find('.content-default [data-type="name"]').text(data.name);
	card.find('.content-hover .material-icons').text(data.iconHover);
	
	data.clickCallback(card);
	
	this.getCard = function(){
		return card;
	};
};


/* 2. 添加模态卡 */
var ModalNewCard = function(data){
	/*
		data: {
			name: ,
			modalTitle: ,
			modalPlaceholder: '
			modalSubmitURL:
			callback:
		}
	*/
	var card = $(
		'<div class="col-lg-2 col-md-3 col-sm-4">\n' +
		'	<div class="modal-card" style="background-color: rgba(255,255,255,1);">\n'+
		'		<div class="card-body" style="color: rgba(0,0,0,0.5)">\n'+
		'			<div>\n'+
		'				<i class="material-icons">add_circle_outline</i>\n'+
		'				<div data-target="name"></div>\n'+		
		'			</div>\n'+
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	//加载卡片名称
	card.find('[data-target="name"]').text(data.name);
	
	var InnerModal = function(subData){
		/* 
		subData:{
			title:
			placeholder:
			submitURL:
			callback:
		}
		 */
		var modal = $(
			'<div class="modal fade" id="modal-function1">\n' +
			'	<div class="modal-dialog">\n' +
			'		<div class="modal-content">\n' +
			'			<div class="modal-header">\n' +
			'				<button type="button" class="close btn-close" data-dismiss="modal">&times;</button>\n' +
			'				<h4 class="modal-title"></h4>\n' +
			'			</div>\n' +
			'			<div class="modal-body">\n' +
			'				<div class="form-group">\n' +
			'					<input type="text" class="form-control" />\n' +
			'				</div>\n' +
			'			</div>\n' +
			'			<div class="modal-footer">\n' +
			'				<a href="javascript: void(0);" data-action="submit">确定</a>\n' +
			'				<a href="javascript: void(0);" data-dismiss="modal">关闭</a>\n' +
			'			</div>\n' +
			'		</div>\n' +
			'	</div>\n' + 
			'</div>'
		);
		
		//加载模态框数据
		modal.find('.modal-title').text(subData.title);
		modal.find('input').prop('placeholder', subData.placeholder);
		
		//提交操作
		modal.find('[data-action="submit"]').on('click', function(){
			console.log(URLPrefix + subData.submitURL + modal.find('input').val());
			$.ajax({
				url : URLPrefix + subData.submitURL + modal.find('input').val(),
				data: {},
				cache : true, 
				async : true,
				type : "GET",
				dataType : 'json',
				success : function (result){
					if(result == 0){
						callAlert('添加失败!', 'clear', function(){});
					}else{
						callAlert('添加成功!', 'done', function(){
							modal.modal('hide');
							subData.callback({id: result.id, name:result.name});
						});
					}
				},
				error: function(err){
					callAlert('添加失败!', 'clear', function(){});
				}
			});
		});
		
		modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		modal.modal('show');
	};
	
	
	card.on('click', function(){
		new InnerModal({title: data.modalTitle, placeholder: data.modalPlaceholder, submitURL:data.modalSubmitURL, callback:data.callback});
	});
	
	this.getCard = function(){
		return card;
	}
};




/* 3. 双行操作框(TwinRowModal) */
var TwinRow = function(title, dataTop, dataBot, cardIcon, newCardName, newModalTitle, newModalPlaceholder, newModalSubmitURL, submitCallback){
	var twinRow = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<button type="button" class="close btn-close" data-dismiss="modal">&times;</button>\n' +
		'				<h4 class="modal-title"></h4>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div style="display: inline-block; line-height: 34px;"></div>\n' +
		'				<div class="form-group pull-right" style="width: 250px;">\n' +
		'					<div class="input-group">\n' +
		'						<input type="text" class="form-control" placeholder="搜索..." data-action="searchtop"/>\n' +
		'						<div class="input-group-addon" style="cursor: pointer;">\n' +
		'							<i class="fa fa-search"></i>\n' +
		'						</div>\n' +
		'					</div>\n' +
		'				</div>\n' +
		'				<div class="clearfix"></div>\n' +
		'				<div class="row-top">\n' +
		'					<!-- 上排数据 -->\n' +
		'				</div>\n' +
		'				<div class=="divider" style="margin-top:10px; margin-bottom:10px; border-bottom: 1px solid #ddd;"></div>\n' +
		'				<div style="display: inline-block; line-height: 34px;"></div>\n' +
		'				<div class="form-group pull-right" style="width: 250px;">\n' +
		'					<div class="input-group">\n' +
		'						<input type="text" class="form-control" placeholder="搜索..." data-action="searchbot"/>\n' +
		'						<div class="input-group-addon" style="cursor: pointer;">\n' +
		'							<i class="fa fa-search"></i>\n' +
		'						</div>\n' +
		'					</div>\n' +
		'				</div>\n' +
		'				<div class="clearfix"></div>\n' +
		'				<div class="row-bot">\n' +
		'					<!-- 下排数据 -->\n' +
		'				</div>\n' +
		'				<div class="clearfix"></div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a href="javascript: void(0);" class="btn-submit">确定</a>\n' +
		'				<a href="javascript: void(0);" data-dismiss="modal">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' + 
		'</div>'
	);
	
	var clickCardCallBack = function(card){
		card.on('click', function(){
			if(twinRow.find('.row-top').find(card).length){
				twinRow.find('.row-bot').append(this);
				card.find('.content-hover .material-icons').text('highlight_off');

			}else if(twinRow.find('.row-bot').find(card).length){
				twinRow.find('.row-top').append(this);
				card.find('.content-hover .material-icons').text('add_circle_outline');
			}else{
				callAlert('错误！', 'clear', function(){});
			}
		});
	};
	
	
	//component
	var rowTop = twinRow.find('.row-top');
	var rowBot = twinRow.find('.row-bot');
	
	//CSS
	//加载slimScroll
	rowTop.slimScroll({
			height: '20vh'
	});
	rowBot.slimScroll({
			height: '40vh'
	});
	//设置模态框宽度
	twinRow.find('.modal-dialog').css({width: '50vw'});
	
	//加载模态框标题
	twinRow.find('.modal-title').text(title);
	
	//加载功能卡
	twinRow.find('.row-top').append(new ModalNewCard({name: newCardName, modalTitle: newModalTitle, modalPlaceholder: newModalPlaceholder, modalSubmitURL: newModalSubmitURL, callback: function(data){
		data.icon = cardIcon;
		data.iconHover = 'highlight_off';
		data.clickCallback = clickCardCallBack;
		twinRow.find('.row-bot').prepend(new ModalCard(data).getCard());
	}}).getCard());
	
	//加载row-top 数据
	$.each(dataTop, function(index, item){
		item.icon = cardIcon;
		item.iconHover = 'add_circle_outline';
		item.clickCallback = clickCardCallBack;
		twinRow.find('.row-top').append(new ModalCard(item).getCard());
	});
	
	//加载row-bot 数据
	$.each(dataBot, function(index, item){
		item.icon = cardIcon;
		item.iconHover = 'highlight_off';
		item.clickCallback = clickCardCallBack;
		twinRow.find('.row-bot').append(new ModalCard(item).getCard());
	});
	
	//搜索上半框
	twinRow.find('[data-action="searchtop"]').on('change', function(){
		var query = $(this).val();
			$.each(twinRow.find('.row-top').find('> div'), function(index,item){
				var name = $(item).find('[data-type="name"]').text();
				if(!name.match(query)){
					$(item).addClass('hide');
				}else
					$(item).removeClass('hide');
			});
	});
	
	//搜索上半框
	twinRow.find('[data-action="searchbot"]').on('change', function(){
		var query = $(this).val();
			$.each(twinRow.find('.row-bot').find('> div'), function(index,item){
				var name = $(item).find('[data-type="name"]').text();
				if(!name.match(query)){
					$(item).addClass('hide');
				}else
					$(item).removeClass('hide');
			});
	});
	
	
	
	//submit
	twinRow.find('.btn-submit').on('click', function(){
		var list =  [];
		$.each(twinRow.find('.row-bot').find('> div'), function(index, item){
			console.log(item);
			list.push({
				id: $(item).attr('data-id'),
				name: $(item).find('[data-type="name"]').text()
			});
		});
		
		twinRow.modal('hide');
		submitCallback(list);
	});
	
	//关闭后删除模态框 - Reset
	twinRow.on('hidden.bs.modal', function(){
		$(this).remove();
	});
	
	twinRow.modal('show');
};