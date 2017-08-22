$(document).on("ready", function(){
	$("[data-toggle='popover']").popover();
});
	
//¼ÓÔØÁÄÌìÀ¸ÁÄÌìÀ¸
var loadGroupChatContent = function(data, name){
	$(".panel-groupchat .panel-groupchat-header .navbar-header a").text(name);
	$(".panel-groupchat-content").empty();
	$.each(data,function(index, chat){
		if(chat.user_role == 0){
			$(".panel-groupchat-content").append(
				'<div class="panel-groupchat-content-item">\
					<p class="panel-groupchat-message-time">' + chat.time + '</p>\
					<img class="img-circle" src="' + chat.user_img + '" title="' + chat.user_name + '" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="' + chat.user_email + '">\
					<div class="panel-groupchat-personal-message-text">' + chat.text + '</div>\
				</div>');
		}else if(chat.user_role == 1){
			$(".panel-groupchat-content").append(
				'<div class="panel-groupchat-content-item">\
					<p class="panel-groupchat-message-time">' + chat.time + '</p>\
					<div style="text-align: right;">\
						<div class="panel-groupchat-mine-message-text">' + chat.text + '</div>\
					<div>\
				</div>');
		}else{
			$(".panel-groupchat-content").append(
				'<div class="panel-groupchat-content-item">\
					<p class="panel-groupchat-message-time">' + chat.time + '</p>\
					<p class="panel-groupchat-system-message-text">' + chat.text + '</p>\
				</div>');
		}
	});
};

//¼ÓÔØÈº³ÉÔ±
var loadGroupChatMemberBlock = function(data){
	$(".group-members-block-content").empty();
	$.each(data,function(index,member){
		if(index == 0)
			$(".group-members-block-content").append(
			'<img class="img-circle group-members-block-img-holder" src="' + member.img + '" title="' + member.name + '" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="' + member.email +'">');
		else
			$(".group-members-block-content").append(
			'<img style="right:' + (index-1) * 8 + 'px;" class="img-circle group-members-block-img-member" src="' + member.img + '" title="' + member.name + '" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="' + member.email +'">');
	});
}

//·¢ËÍÏûÏ¢
$(".panel-groupchat textarea").keypress(function(e) {
	if(e.which == 13) {
		//ÄÚÈİÎª£º $(this).val()
	}
});



<!-- ÏûÏ¢²âÊÔÊı¾İ -->
test_data_chat = [{
		user_id: 123,
		user_name: "Sven",
		user_img: "Img/Logo.png",
		user_email: "svenchen@gmail.com",
		user_role:5,
		time:"1",
		text:"asdfasfasfasd"
	},{
		user_id: 123,
		user_name: "Sven",
		user_img: "Img/Logo.png",
		user_email: "svenchen@gmail.com",
		user_role:1,
		time:"2",
		text:"asdfasfasfasd"
	},{
		user_id: 123,
		user_name: "Sven",
		user_img: "Img/Logo.png",
		user_email: "svenchen@gmail.com",
		user_role:0,
		time:"3",
		text:"asdfasfasfasd"
	},{
		user_id: 123,
		user_name: "Sven",
		user_img: "Img/Logo.png",
		user_email: "svenchen@gmail.com",
		user_role:1,
		time:"2",
		text:"asdfasfasfasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
	}];
//loadGroupChatContent(test_data_chat, "ÁõìÇ");

test_data_member = [{
	img: "ChatGroup/img/default_avatar_male.jpg",
	name: "Áõ·¼Óî",
	email: "liu.fangyu@gmail.com"
},{
	img: "ChatGroup/img/default_avatar_male.jpg",
	name: "Áõ·¼Óî",
	email: "liu.fangyu@gmail.com"
},{
	img: "ChatGroup/img/default_avatar_male.jpg",
	name: "Áõ·¼Óî",
	email: "liu.fangyu@gmail.com"
},{
	img: "ChatGroup/img/default_avatar_male.jpg",
	name: "Áõ·¼Óî",
	email: "liu.fangyu@gmail.com"
},{
	img: "ChatGroup/img/default_avatar_male.jpg",
	name: "Áõ·¼Óî",
	email: "liu.fangyu@gmail.com"
}];

//loadGroupChatMemberBlock(test_data_member);