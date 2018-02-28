console.log('start of post');
var objIsEmpty = function(obj){
	return Object.keys(obj).length === 0 && obj.constructor === Object || obj == undefined;
};
/* 
依赖
editor.js / editor.css
switch.css
global.js global.css
 */
/* post:{
	id:
	type: 1.indiviudal, 2.group or else
	poster: {id,name,img}
	shared:{name, value, list: [{id, name, img, role: 1 individual / 2 tag}]}
	title:
	content:
	allowSharing: 0/1,
	tags: [{name}]
} */
var postEditor = function(data, action_shareTo, action_modifyTag, action_submit, action_save, action_close, action_formatContent){
	var $modal = $(
		'<div class="modal fade post-modal">\n' +
		'	<div class="modal-dialog modal-lg">\n' +
		'		<div class="modal-content">\n' +
		'			<div class="modal-header">\n' +
		'				<!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->\n' +
		'				<h5 class="modal-title">\n' +
		'					<img data-type="posterImage"/>\n' +
		'					<b class="fa fa-caret-right" ></b>\n' +
		'					<a href="javascript:void(0);" data-action="shareTo"><i class="fa fa-globe"></i></a>\n' +
		'					<span data-type="sharedType"/></span>\n' +
		'					<span data-type="sharedList">\n' +
		'					</span>\n' +
		'				</h5>\n' +
		'			</div>\n' +
		'			<div class="modal-body">\n' +
		'				<div class="form-group">\n' +
		'					<label>标题</label>\n' +
		'					<input data-type="title" class="form-control" placeholder="请输入标题">\n' +
		'				</div>\n' +
		'				<div class="editor-block" data-type="editor"></div>\n' + 
		'				<div class="form-group">\n' +
		'						<label>允许被分享: </label>\n' +
		'						<label class="pull-right switch">\n' +
		'						<input data-type="allowSharing" type="checkbox">\n' +
		'							<div class="slider round"></div>\n' +
		'						</label>\n' +
		'				</div>\n' +
		'				<div class="form-group">\n' +
		'						<label>标签: </label>\n' +
		'						<a href="javascript:void(0);" class="pull-right" data-action="modifyTag"><i class="fa fa-plus-square"></i></a>\n' +
		'						<div class="clearfix"></div>\n' +
		'						<p data-type="tagContainer">\n' +
		'						</p>\n' +
		'				</div>\n' +
		'			</div>\n' +
		'			<div class="modal-footer">\n' +
		'				<a data-action="submit">提交</a>\n' +
		'				<a data-action="save">保存</a>\n' +
		'				<a data-action="close">关闭</a>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	var loadPost = function(data){
		$modal.attr('data-id', data.id);
		$modal.attr('data-post-type', data.type);
		$modal.find('[data-type="posterImage"]').attr({
			'data-id': data.poster.id,
			'title': data.poster.name,
			'src': data.poster.image
		});
		loadSharedWith(data.shared);
		$modal.find('[data-type="title"]').val(data.title);
		$modal.find('[data-type="editor"] #editor').html(data.content);
		$modal.find('[data-type="allowSharing"]').prop('checked', data.allowSharing);
		loadTags(data.tags);
	};
	
	var getPost = function(){
		var result = {
			id: $modal.attr('data-id'),
			type: $modal.attr('data-post-type'),
			poster: {
				id: $modal.find('[data-type="posterImage"]').attr('data-id'),
				name: $modal.find('[data-type="posterImage"]').attr('title'),
				image: $modal.find('[data-type="posterImage"]').attr('src')
			},
			shared:{
				name: $modal.find('[data-type="sharedType"]').text(),
				value: $modal.find('[data-type="sharedType"]').attr('value'),
				list: [] 
			},
			title:$modal.find('[data-type="title"]').val(),
			content: action_formatContent($modal.find('[data-type="editor"] #editor').html()),
			allowSharing: $modal.find('[data-type="allowSharing"]').is(':checked') ? 1 : 0,
			tags: []
		};
		result.shared.list = getSharedWith();
		result.tags = getTags();
		return result;
	};
	
	var loadSharedWith = function(data){
		$modal.find('[data-type="sharedType"]')
			.attr('value', data.value)
			.text(data.name);
		
		var $container = $modal.find('[data-type="sharedList"]').empty();
		$.each(data.listTag, function(index, item){
			var $icon = $('<img data-type="sharedImage" src="' + item.image + '" title="' + item.name + '" data-id="' + item.id + '" data-role="' + item.role + '" />');
			$container.append($icon);
		});
		
		$.each(data.listItem, function(index, item){
			var $icon = $('<img data-type="sharedImage" src="' + item.image + '" title="' + item.name + '" data-id="' + item.id + '" data-role="' + item.role + '" />');
			$container.append($icon);
		});
	};

	var getSharedWith = function(){
		var result = {
			name: $modal.find('[data-type="sharedType"]').text(),
			value: $modal.find('[data-type="sharedType"]').attr('value'),
			listTag: [],
			listItem: []
		};
		
		$modal.find('[data-type="sharedList"] [data-type="sharedImage"][data-role="1"]').each(function(index, item){
			result.listItem.push({
				id: $(this).attr('data-id'),
				name: $(this).attr('title'),
				image: $(this).attr('src'),
				role: $(this).attr('data-role')
			});
		});
		
		$modal.find('[data-type="sharedList"] [data-type="sharedImage"][data-role="2"]').each(function(index, item){
			result.listTag.push({
				id: $(this).attr('data-id'),
				name: $(this).attr('title'),
				image: $(this).attr('src'),
				role: $(this).attr('data-role')
			});
		});
		
		return result;
	};
	
	var loadTags = function(data){
		console.log(data);
		var $container = $modal.find('[data-type="tagContainer"]');
		$container.empty();
		$.each(data, function(index, item){
			var $tag = $('<span class="label" data-type="tag">' + item.name + '</span>').css('background-color', googleColorRandomPicker());
			$container.append($tag);
		});
	};
	
	var getTags = function(){
		var result = [];
		$modal.find('[data-type="tagContainer"] [data-type="tag"]').each(function(index, item){
			result.push({
				name: $(item).text()
			});
		});
		return result;
	};
	
	var close = function(){
		$modal.modal('hide');
	};
	
	var initialize = function(){
		// 初始化编辑器
		$modal.find('.editor-block').append(getEditor());
	
		loadPost(post);
		
		$modal.on('click', '[data-action]', function(){
			var actionType = $(this).attr('data-action');
			console.log(actionType)
			switch(actionType){
				case 'shareTo':
					var data = {
						poster_id: $modal.find('[data-type="posterImage"]').attr('data-id'),
						shared: getSharedWith()
					};
					action_shareTo(data, loadSharedWith);
					break;
				case 'modifyTag':
					var data = {
						tags: getTags()
					};
					action_modifyTag(data, loadTags);
					break;
				case 'submit':
					var data = getPost();
					action_submit(data, close);
					break;
				case 'save':
					var data = getPost();
					action_save(data);
					break;
				case 'close':
					action_close(close);
					break;
				default:
					console.log('error');
			}
		});
		
		// 关闭清楚modal
		$modal.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		// 显示modal
		$modal.modal('show');
	};
	
	initialize();
};

// action_clickTag
// stack
// check authority after updateCommands ??? 
const POST_AUTHORITY_LIST = {
	'viewUser': 1,
	'viewDetails': 1,
	'edit': 2,
	'delete': 2,
	'stack': 2,
	'report': 1,
	'like': 1,
	'viewComments': 1,
	'reply': 1
};

const COMMENT_AUTHORITY_LIST = {
	'likeComment': 1,
	'deleteComment': 2,
	'reportComment': 1,
	'replyComment': 1
}
var post_Block = function(data, list_postAction, list_commentAction, action_viewUser, action_viewDetails, action_edit, action_delete, action_stack, 
	action_report, action_like, action_viewComments, action_likeComment, action_deleteComment, action_reportComment, action_reply){
	var instance = this;
	var $post = $(
		'<div class="post-block">\n' +
		'	<div>\n' +
		'		<img class="always-display" data-type="posterImage" data-action="viewUser"/>\n' +
		'		<span class="span-50">\n' +
		'			<span data-type="poster" data-action="viewUser"></span>\n' +
		'			<b class="fa fa-caret-right"></b>\n' +
		'			<span data-type="sharedType"></span>\n' +
		'			<div class="dropdown pull-right post-option">\n' +
		'				<a class="grey-icon" href="javascript: void(0);" data-toggle="dropdown" title="更多选项"><i class="fa fa-ellipsis-v"></i></a>\n' +
		'				<ul class="dropdown-menu">\n' +
		'				</ul>\n' +
		'			</div>\n' +
		'			<a href="javascript: void(0);" class="pull-right grey-icon" data-action="viewDetails" title="查看详情"><i class="fa fa-external-link"></i></a>\n' +
		'			<a href="javascript: void(0);" class="pull-right grey-icon" data-type="stack" title="置顶" style="color: red;"><i class="fa fa-thumb-tack"></i></a>\n' +
		'		</span>\n' +
		'		<span data-type="createdDate"></span>\n' +
		'	</div>\n' +
		'	<div data-type="title">\n' +
		'		<a class="always-display" href="javascript: void(0);" data-action="viewDetails"></a>\n' +
		'	</div>\n' +
		'	<div data-type="content">\n' +
		'		<div class="row">\n' +
		'			<img  class="img-responsive" data-name="postimage">\n' +
		'		</div>\n' +
		'	</div>\n' +
		'	<div data-type="tagContainer">\n' +
		'		<i class="fa fa-tags" title="标签">: </i>\n' +
		'	</div>\n' +
		'	<div class="row divider"></div>\n' +
		'	<ul class="list-inline" style="margin-bottom: 0">\n' +
		'		<li class="always-display" data-action="like">\n' +
		'			<a href="javascript: void(0);" class="link-black text-sm"  title="点赞" ><i class="fa fa-thumbs-o-up"></i>(<span data-num></span>)</a>\n' +
		'		</li>\n' +
		'		<li class="always-display pull-right" data-action="viewComments">\n' +
		'			<a href="javascript: void(0);" class="link-black text-sm"  title="评论" ><i class="fa fa-comments-o"></i> 评论(<span data-num></span>)</a>\n' +
		'		</li>\n' +
		'	</ul>\n' +
		' 	<div class="clearfix"></div>\n' + 
		'	<div id="comments" class="collapse">\n' +
		'		<div class="row divider"></div>\n' +
		'		<div class="comment-list customized-scrollbar"></div>\n' +
		'		<div class="reply-box">\n' +
		'			<img class="always-display" data-type="posterImage">\n' +
		'			<span class="span-50">\n' +
		'				<textarea data-type="commentContent"></textarea>\n' +
		'				<a href="javascript: void(0);" class="pull-right btn-sm btn-primary always-display" data-action="reply">回复</a>\n' +
		'				<div class="clearfix"></div>\n' +
		'			</span>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	// data: [{name}]
	this.loadTag = function(data){
		var $tagContainer = $post.find('[data-type="tagContainer"]');
		$tagContainer.find('[data-type="tag"]').remove();
		$.each(data, function(index, item){
			var $tag = $('<span class="label" data-type="tag">' + item.name + '</span>').css('background-color', googleColorRandomPicker());
			$tagContainer.append($tag);
		});
	};
	
	// data: {isLike: 0/1, likes: number}
	this.updateLike = function(data){
		// {isLike: 0/1, likes: 'total number'}
		if(data.isLike == 1){
			$post.find('[data-action="like"] i')
				.removeClass('fa-thumbs-o-up')
				.addClass('fa-thumbs-up');
		}else if(data.isLike == 0){
			$post.find('[data-action="like"] i')
				.addClass('fa-thumbs-o-up')
				.removeClass('fa-thumbs-up');
		}else{
			console.log('error');
		}
		
		$post.find('[data-action="like"]').attr('data-value', data.isLike);
		$post.find('[data-action="like"] [data-num]').text(data.likes);
	}
	
	// data{$item, authority, checkList}
	this.loadAuthority = function(data){
		data.$item.find('[data-action]').each(function(index, item){
			var actionType = $(this).attr('data-action');
			if(actionType in data.checkList){
				if(data.authority >= data.checkList[actionType]){
					$(this).attr({'has-authority': 1}).removeClass('none-display');
				}else{
					$(this).attr({'has-authority': 0});
					if(!$(this).hasClass('always-display'))
						$(this).addClass('none-display');
				}
			}
		});
		
		data.$item.find('.dropdown').each(function(index, item){
			if($(this).find('.dropdown-menu li:not(.none-display)').length == 0)
				$(this).addClass('none-display');
			else
				$(this).removeClass('none-display');
		});
	};
	
	this.loadTooltip = function(data){
		if(data.listTag.length > 0 || data.listItem.length > 0){
			var content = '';
			$.each(data.listTag, function(index, item){
				content += '<img data-type="sharedImage" data-action="viewUser" data-id="' + item.id + '" title="' + item.name + '" src="' + item.image + '" data-role="' + item.role + '">'
			});
			$.each(data.listItem, function(index, item){
				content += '<img data-type="sharedImage" data-action="viewUser" data-id="' + item.id + '" title="' + item.name + '" src="' + item.image + '" data-role="' + item.role + '">'
			});
			
			$post.find('[data-type="sharedType"]')
				.css('cursor', 'pointer')
				.tooltip({
					placement: 'right',
					html: true,
					title: content
				});
		}
	};

	// {isStacked: 0/1}
	this.updateStack = function(data){
		if(data.isStacked == 1)
			$post.find('[data-type="stack"]').removeClass('none-display');
		else
			$post.find('[data-type="stack"]').addClass('none-display');
	};
	
		// [comment]
	this.updateComments = function(data){
		$post.find('[data-action="viewComments"] [data-num]').text(data.commentLength);
		$post.find('#comments .comment-list').empty();
		$.each(data.comments, function(index, item){
			$post.find('.comment-list').append(instance.getComment(item));
		});
	};
	
	// data: {$comment, isLike: 0/1}
	this.updateLikeComment = function(data){
		if(data.isLike == 0){
			data.$comment.find('[data-action="likeComment"] i')
				.addClass('fa-heart-o')
				.removeClass('fa-heart');
		}else{
			data.$comment.find('[data-action="likeComment"] i')
				.addClass('fa-heart')
				.removeClass('fa-heart-o');
		}
		
		data.$comment.find('[data-action="likeComment"]').attr('data-value', data.isLike);
	};
	
	this.load = function(data){
		$post.attr('data-id', data.id);
		$post.attr('data-post-type', data.type);
		$post.find('[data-type="posterImage"]').attr({
			'data-id': data.poster.id,
			'title': data.poster.name,
			'src': data.poster.image,
			'user-type': data.type
		});
		$post.find('[data-type="poster"]')
			.attr({
				'data-id': data.poster.id,
				'user-type': data.type
			})
			.text(data.poster.name);
		
		$post.find('[data-type="sharedType"]')
			.attr('value', data.shared.type)
			.text(data.shared.name);
		
		instance.updateStack(data);
		
		var $postOptions = $post.find('.post-option .dropdown-menu').empty();
		$.each(list_postAction, function(index, item){
			var $o = $('<li data-action="' + item.actionType + '"><a href="javascript:void(0);">' + item.name + '</a></li>');
			$postOptions.append($o);
		});
		
		$post.find('[data-type="createdDate"]').text(instance.formatDatetime(data.createDate));
		
		$post.find('[data-type="title"] a').text(data.title);
		$post.find('[data-type="content"] img').attr('src', data.postImage);
	
		instance.loadTag(data.tags);
		
		instance.updateLike(data);
		$post.find('[data-action="viewComments"] [data-num]').text(data.commentLength);
		
		// this.authorityCheck(data.authority);
		if(data.authority >= 2)
			this.loadTooltip(data.shared);
		
		
		instance.loadAuthority({
			$item: $post,
			authority: data.authority,
			checkList: POST_AUTHORITY_LIST
		});
	};
	
	/* {
			id,
			sender: {
				id,
				name,
				image
			},
			replyTo: {
				id,
				name,
				image
			},
			createDate,
			isLike: 0/1,
			authority: 0/1,
			content,
		}
	*/
	this.getComment = function(data){
		var $comment = $(
			'<div class="comment">\n' +
			'	<div data-type="commentHead">\n' +
			'		<img class="always-display" data-type="senderImage" data-action="viewUser">\n' +
			'		<span class="span-50">\n' +
			'			<span data-type="sender" data-action="viewUser"></span>\n' +
			'			<b class="fa fa-caret-right"></b>\n' +
			'			<span data-type="replyTo" data-action="viewUser"></span>\n' +
			'			<div class="dropdown pull-right comment-option">\n' +
			'				<a class="grey-icon" href="javascript: void(0);" data-toggle="dropdown" title="更多选项"><i class="fa fa-ellipsis-v"></i></a>\n' +
			'				<ul class="dropdown-menu">\n' +
			'				</ul>\n' +
			'			</div>\n' +
			'				<a href="javascript: void(0);" class="pull-right grey-icon" data-action="likeComment" title="点赞"><i class="fa fa-heart-o"></i></a>\n' +
			'				<a href="javascript: void(0);" class="pull-right grey-icon" data-action="replyComment" title="回复"><i class="fa fa-reply"></i></a>\n' +
			'		</span>\n' +
			'		<span data-type="commentDate"></span>\n' +
			'	</div>\n' +
			'	<div data-type="commentBody"></div>\n' +
			'	<div data-type="commentFoot"></div>\n' +
			'</div>'
		);
		
		var load = function(data){
			$comment.attr('data-id', data.id);
			$comment.find('[data-type="senderImage"]')
				.attr({
					'data-id': data.sender.id,
					'title': data.sender.name,
					'src': data.sender.image,
					'user-type': 1
				});
			$comment.find('[data-type="sender"]')
				.attr({
					'data-id': data.sender.id,
					'title': data.sender.name,
					'user-type': 1
				})
				.text(data.sender.name);
			if(!objIsEmpty(data.replyTo)){
				$comment.find('[data-type="replyTo"]')
				.attr({
					'data-id': data.replyTo.id,
					'title': data.replyTo.name,
					'src': data.replyTo.image,
					'user-type': 1
				})
				.text(data.replyTo.name);
			}else{
				$comment.find('.fa-caret-right, [data-type="replyTo"]').addClass('none-display');
			}
			
			$comment.find('[data-type="commentDate"]').text(instance.formatDatetime(data.createDate));
			
			data.$comment = $comment;
			instance.updateLikeComment(data);
			
			var $container = $comment.find('.comment-option .dropdown-menu').empty();
			$.each(list_commentAction, function(index, item){
				var $o = $('<li data-action="' + item.actionType + '"><a href="javascript:void(0);">' + item.name + '</a></li>');
				$container.append($o);
			});
			
			$comment.find('[data-type="commentBody"]').html(instance.formatCommentContent(data.content));
			
			instance.loadAuthority({
				$item: $comment,
				authority: data.authority,
				checkList: COMMENT_AUTHORITY_LIST
			});
			
			// ?? check if is me
		};
		
		load(data);
		
		return $comment;
	};
	

	this.addReplyTo = function(data){
		$post.find('#comments .reply-box .span-50 .reply-to').remove();
		var $replyTo = $(
			'<span class="reply-to">\n' +
			'	<b class="fa fa-caret-right"></b>\n' +
			'	<span data-type="replyTo"></span>\n' +
			'	<span data-action="removeReplyTo" has-authority="1">&times</span>\n' +
			'</span>\n'
		);
		
		$replyTo.find('[data-type="replyTo"]')
			.attr({
				'data-id': data.id,
				'user-type': data.type,
				'src': data.image
			})
			.text(data.name);
		
		$post.find('#comments .reply-box .span-50').prepend($replyTo);
	};
	
	this.removeReplyTo = function(){
		$post.find('.reply-to').remove();
	};
	
	var clearReplyBlock = function(){
		instance.removeReplyTo();
		$post.find('.reply-box [data-type="commentContent"]').val('');
	};
	
	// by spance, tab and \n
	this.formatCommentContent = function(data){
		var html = '';
		$.each(data.split('\n'), function(index, item){
			while(item.includes(" ")){
				item = item.replace(' ', '&nbsp;');
			}
			html += '<div>' + item + '</div>'
		});
		return html;
	};
	
	this.formatDatetime = function(data){
		return data;
	};
	
	
	var initialize = function(){
		this.load(data);
		
		$post.on('click', '[data-action]', function(){
			var actionType = $(this).attr('data-action');
			console.log(actionType);
			switch(actionType){
				case 'viewUser':
					action_viewUser({
						id: $(this).attr('data-id'),
						type: $(this).attr('user-type')
					});
					break;
				case 'viewDetails':
					action_viewDetails({
						id: $(this).closest('.post-block').attr('data-id')
					});
					break;
				/* case 'edit':
					action_edit({
						id: $(this).closest('.post-block').attr('data-id')
					});
					break;
				case 'delete':
					action_delete({
						id: $(this).closest('.post-block').attr('data-id')
					});
					break;
				case 'stack':
					action_stack({
						id: $(this).closest('.post-block').attr('data-id')
					});
					break;
				case 'report':
					action_report({
						id: $(this).closest('.post-block').attr('data-id')
					});
					break; */
				case 'like':
					action_like({
						id: $(this).closest('.post-block').attr('data-id'),
						isLike: ((parseInt($(this).attr('data-value')) + 1))%2
					}, updateLike);
					break;
				case 'viewComments':
					if($post.find('#comments').hasClass('in')){
						$post.find('#comments').collapse('hide');
					}else{
						action_viewComments({
							id: $(this).closest('.post-block').attr('data-id')
						}, instance.updateComments);
						$post.find('#comments').collapse('show');
					}
					break;
				case 'likeComment':
					action_likeComment({
						pid: $(this).closest('.post-block').attr('data-id'),
						id: $(this).closest('.comment').attr('data-id'),
						isLike: ((parseInt($(this).attr('data-value')) + 1))%2,
						$comment: $(this).closest('.comment')
					}, updateLikeComment);
					break;
				/* case 'deleteComment':
					action_deleteComment({
						pid: $(this).closest('.post-block').attr('data-id'),
						id: $(this).closest('.comment').attr('data-id')
					}, updateComments)
					break;
				case 'reportComment':
					action_reportComment({
						pid: $(this).closest('.post-block').attr('data-id'),
						id: $(this).closest('.comment').attr('data-id')
					});
					break; */
				case 'replyTo':
					var $replyTo = $(this).prevAll('[data-type="sender"]');
					addReplyTo({
						id: $replyTo.attr('data-id'),
						name: $replyTo.text(),
						type: $replyTo.attr('user-type'),
						image: $replyTo.attr('src')
					});
					break;
				case 'removeReplyTo':
					removeReplyTo();
					break;
				case 'reply':
					var comment = {
						pid: $(this).closest('.post-block').attr('data-id'),
						content: $post.find('[data-type="commentContent"]').val()
					};
					if($post.find('.reply-to').length == 1){
						var $replyTo = $post.find('.reply-to [data-type="replyTo"]') 
						comment.replyTo = {
							id: $replyTo.attr('data-id'),
							name: $replyTo.text(),
							image: $replyTo.attr('src')
						};
					}
					
					action_reply(comment,updateComments, clearReplyBlock);
					break;
				default:
					console.log('error');
			}
		});
	};
	
	initialize();
	
	return $post;
};

