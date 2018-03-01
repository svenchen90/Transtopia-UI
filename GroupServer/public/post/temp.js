
var post_Modal = function(data, action_viewUser, action_edit, action_delete, action_stack, 
	action_report, action_like, action_viewComments, action_likeComment, action_deleteComment, action_reportComment, action_reply){
	var $post = $(
		'<div class="modal fade">\n' +
		'	<div class="modal-dialog" style="width: 70vw;">\n' +
		'		<div class="modal-content post-block">\n' +
		'			<div class="modal-body">\n' +
		'				<button type="button" class="close" data-dismiss="modal" style="padding-left: 5px; margin-top: -20px;margin-right: -20px;">&times;</button>\n' +
		'				<div>\n' +
		'					<img data-type="posterImage" data-action="viewUser"/>\n' +
		'					<span class="span-50">\n' +
		'					<span data-type="poster" data-action="viewUser"></span>\n' +
		'					<b class="fa fa-caret-right"></b>\n' +
		'					<span data-type="sharedType"></span>\n' +
		'					<div class="dropdown pull-right">\n' +
		'						<a class="grey-icon" href="javascript: void(0);" data-toggle="dropdown" data-type="moreOptions" title="更多选项"><i class="fa fa-ellipsis-v"></i></a>\n' +
		'						<ul class="dropdown-menu">\n' +
		'							<li data-action="edit"><a href="javascript:void(0);">修改</a></li>\n' +
		'							<li data-action="delete"><a href="javascript:void(0);">删除</a></li>\n' +
		'							<li data-action="stack"><a href="javascript:void(0);">置顶</a></li>\n' +
		'							<li data-action="report"><a href="javascript:void(0);">举报</a></li>\n' +
		'						</ul>\n' +
		'					</div>\n' +
		'				</span>\n' +
		'				<span data-type="createdDate"></span>\n' +
		'			</div>\n' +
		'			<div data-type="title">\n' +
		'				<span></span>\n' +
		'				<a href="javascript: void(0);" style="color: black; cursor: default;"></a>\n' +
		'			</div>\n' +
		'			<div data-type="content"></div>\n' +
		'			<div data-type="tagContainer">\n' +
		'				<i class="fa fa-tags" title="标签">: </i>\n' +
		'			</div>\n' +
		'			<div class="row divider"></div>\n' +
		'			<ul class="list-inline" style="margin-bottom: 0">\n' +
		'				<li>\n' +
		'					<a href="javascript: void(0);" class="link-black text-sm" data-action="like" title="点赞"><i class="fa fa-thumbs-o-up"></i>(<span data-num></span>)</a>\n' +
		'				</li>\n' +
		'				<li class="pull-right">\n' +
		'					<a href="javascript: void(0);" class="link-black text-sm" data-action="viewComments" title="评论"><i class="fa fa-comments-o"></i> 评论(<span data-num></span>)</a>\n' +
		'				</li>\n' +
		'			</ul>\n' +
		'			<div class="clearfix"></div>\n' +  
		'			<div id="comments" class="collapse">\n' +
		'				<div class="row divider"></div>\n' +
		'				<div class="comment-list customized-scrollbar"></div>\n' +
		'				<div class="reply-box">\n' +
		'					<img data-type="posterImage" data-action="viewUser">\n' +
		'					<span class="span-50">\n' +
		'						<textarea data-type="commentContent"></textarea>\n' +
		'						<a href="javascript: void(0);" class="pull-right btn-sm btn-primary" data-action="reply">回复</a>\n' +
		'						<div class="clearfix"></div>\n' +
		'					</span>\n' +
		'				</div>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
	
	var load = function(data){
		// ### is stacked; scroll
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
		//###
		$post.find('[data-type="createdDate"]').text(data.createDate);
		$post.find('[data-type="title"] a').text(data.title);
		$post.find('[data-type="content"]').html(data.content);
	
		$tagContainer = $post.find('[data-type="tagContainer"]');
		$.each(data.tags, function(index, item){
			var $tag = $('<span class="label" data-type="tag">' + item.name + '</span>').css('background-color', googleColorRandomPicker());
			$tagContainer.append($tag);
		});
		
		updateLike(data);
		$post.find('[data-action="viewComments"] [data-num]').text(data.commentLength);
		
		if(data.authority < 2){
			$post.find('[data-action="edit"], [data-action="delete"], [data-action="stack"]').css('display', 'none');
		}else{
			if(data.shared.listTag.length > 0 || data.shared.listItem.length > 0){
				var content = '';
				$.each(data.shared.listTag, function(index, item){
					content += '<img data-type="sharedImage" data-action="viewUser" data-id="' + item.id + '" title="' + item.name + '" src="' + item.image + '" data-role="' + item.role + '">'
				});
				$.each(data.shared.listItem, function(index, item){
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
		}
	};
	
	var updateLike = function(data){
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
	};
	
	var updateComments = function(data){
		$post.find('[data-action="viewComments"] [data-num]').text(data.commentLength);
		$post.find('#comments .comment-list').empty();
		$.each(data.comments, function(index, item){
			$post.find('.comment-list').append(getComment(item));
		});
	};
	
	var getComment = function(data){
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
			byMe: 0/1,
			content,
		}
		 */
		var $comment = $(
			'<div class="comment">\n' +
			'	<div data-type="commentHead">\n' +
			'		<img data-type="senderImage" data-action="viewUser">\n' +
			'		<span class="span-50">\n' +
			'			<span data-type="sender" data-action="viewUser"></span>\n' +
			'			<b class="fa fa-caret-right"></b>\n' +
			'			<span data-type="replyTo" data-action="viewUser"></span>\n' +
			'			<div class="dropdown pull-right">\n' +
			'				<a class="grey-icon" href="javascript: void(0);" data-toggle="dropdown" data-type="moreOptions" title="更多选项"><i class="fa fa-ellipsis-v"></i></a>\n' +
			'				<ul class="dropdown-menu">\n' +
			'					<li data-action="replyTo"><a href="javascript:void(0);">回复</a></li>\n' +
			'					<li data-action="deleteComment"><a href="javascript:void(0);">删除</a></li>\n' +
			'					<li data-action="reportComment"><a href="javascript:void(0);">举报</a></li>\n' +
			'				</ul>\n' +
			'			</div>\n' +
			'				<a href="javascript: void(0);" class="pull-right grey-icon" data-action="likeComment" title="点赞"><i class="fa fa-heart-o"></i></a>\n' +
			'				<a href="javascript: void(0);" class="pull-right grey-icon" data-action="replyTo" title="回复"><i class="fa fa-reply"></i></a>\n' +
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
				$comment.find('.fa-caret-right, [data-type="replyTo"]').css('display', 'none');
			}
			$comment.find('[data-type="commentDate"]').text(data.createDate);
			
			data.$comment = $comment;
			updateLikeComment(data);
			
			var html = '';
			$.each(data.content.split('\n'), function(index, item){
				while(item.includes(" ")){
					item = item.replace(' ', '&nbsp;');
				}
				html += '<div>' + item + '</div>'
			});
			$comment.find('[data-type="commentBody"]').html(html);
			
			if(data.byMe){
				$comment.find('[data-action="likeComment"], [data-action="replyTo"], [data-action="reportComment"]').css('display', 'none');
			}else{
				$comment.find('[data-action="deleteComment"]').css('display', 'none');
			}
		};
		
		load(data);
		
		return $comment;
	};
	
	var updateLikeComment = function(data){
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
	
	var addReplyTo = function(data){
		$post.find('#comments .reply-box .span-50 .reply-to').remove();
		var $replyTo = $(
			'<span class="reply-to">\n' +
			'	<b class="fa fa-caret-right"></b>\n' +
			'	<span data-type="replyTo"></span>\n' +
			'	<span data-action="removeReplyTo">&times</span>\n' +
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
	
	var removeReplyTo = function(){
		$post.find('.reply-to').remove();
	};
	
	var clearReplyBlock = function(){
		removeReplyTo();
		$post.find('.reply-box [data-type="commentContent"]').val('');
	};
	
	var initialize = function(){
		load(data);
		
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
				case 'edit':
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
					break;
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
						}, updateComments);
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
				case 'deleteComment':
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
					break;
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
		
		$post.on('hidden.bs.modal', function(){
			$(this).remove();
		});
		
		
		$post.modal('show');
	};
	
	initialize();
};



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
	 case 'edit':
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
		break; 
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
	case 'deleteComment':
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
		break;
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