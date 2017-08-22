/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//写给老付
/*
 post = [{
 id: ,
 user_id: ,
 user_name: ,
 user_img:,
 user_followers: , //关注者总人数
 user_blogs: , //发表总文章数
 user_bestblogs: , //用户精华帖
 
 title: , //标题
 content: , //内容
 datetime: , //时间
 genre: , // 大分类
 tags: [], // 小标签
 sharedwith: [], //分享范围，是否需要？？？
 total_like: , //总点赞人数
 like: (0 or 1), //我是否点赞
 star: (0 or 1), //我是否加星
 
 comments: [{
 user_id: ,
 user_name: ,
 user_img:,
 
 to_id: , //回复用户id
 to_name: , //回复用户姓名
 content: , //内容
 datetime:  //时间
 }] // 评论
 }];
 */

var senders;

var cates;
var tags;
var followOption;

var share1, mygid, senders;

var ACTION_MAP = {
    getRelatedMoment: '../../HandleGetPostInfo?option=5',
    getMomentByID: '../../HandleGetPostInfo?option=2', //通告id获取一条动态 || input: {moment_id} || output: post
    getMomentByUserID: '../../HandleGetPostInfo?option=7', //获取摸一个用户的动态列表
    getFollowedMoment: '../../HandleGetPostInfo?option=5', //获取摸一个用户follow的动态列表
    getOption: '../../HandleGetPostInfo?option=-1', //获取静态的参数，发布新动态时候的OPTION
    postMoment: '../../HandleGetPostInfo?option=0', //发送动态
    postReplyToMoment: '../../HandleGetPostInfo?option=4', //回复动态
    starMoment: '../../HandleGetPostInfo?option=9', //星标或取消
    likeMoment: '../../HandleGetPostInfo?option=6', //喜欢或取消
    removeTagOfMoment: 'removeTagOfMoment?uid=', //移除tag
    getUserInfobyID: '../../HandleGetPostInfo?option=1', //通过ID获取用户资料
    follow: '../../HandleGetPostInfo?option=11', //关注或取消
    getContactInfo: 'getcontactinfo', //获取用户好友和组列表
    sharePost: '../../HandleGetPostInfo?option=12', //获取用户好友和组列表
    getUserRelation: '../../HandleGetPostInfo?option=10',
    getAllGroup: '../../HandleGetGroupMessage?option=5',
    getFriendList: '../../HandleGetGroupMessage?option=4',
    getFeatruedGroup: '../../HandleGetPostInfo?option=13',
    searchmoment: '../../HandleGetPostInfo?option=17',
    editProfile: '../../HandleGetPostInfo?option=15',
    getRecommendItems: '../../HandleGetPostInfo?option=16',
    getFriendList1: '../../HandleFriendRequest?option=6&senderid=0',
    getTopic: '../../HandleGetGroupMessage?option=0',
    doFriendRequest: '../../HandleGetPostInfo?option=18',
    addFriendByEmail: '../../HandleFriendRequest?option=0',
    editMoment:'../../HandleGetPostInfo?option=20',
    deletePost:'../../HandleGetPostInfo?option=19',
    deleteComment:'../../HandleGetPostInfo?option=21',
    starMoment_Modify:'../../HandleGetPostInfo?option=22',
    searchUsers: '../../HandleGetPostInfo?option=23',
    addNewUserToGroup:'../../HandleGetPostInfo?option=24',
    searchUsersByEmail:'../../HandleGetPostInfo?option=25'
};


var timoutWarning = 1200000; // Display warning in 14 Mins.
var timoutNow = 30000; // Warning has been shown, give the user 1 minute to interact

var warningTimer;
var timeoutTimer;

var isPostIcon=false;


function StartWarningTimer() {
    warningTimer = setTimeout("IdleWarning()", timoutWarning);
}
// Reset timers.
function ResetTimeOutTimer() {
    //$("#myModal_main").modal("hide");
    clearTimeout(timeoutTimer);
    StartWarningTimer();

}

// Show idle timeout warning dialog.
function IdleWarning() {
    clearTimeout(warningTimer);
    timeoutTimer = setTimeout("IdleTimeout()", timoutNow);
    //$("#myModal_main").modal();
    //$('#myModal_main').modal({backdrop: 'static', keyboard: false});
}


// Logout the user.
function IdleTimeout() {
    logOut();
}

function logOut()
{
    window.location.href = "../../HandleLogOut";
}

//PS: 上述都需要你添加当前用户的ID
$(document).ready(function () {
    StartWarningTimer();
    $(document).on('show.bs.modal', '.modal', function (event) {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function () {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });
//    /// new
    initialMomentPostBlock('#newpost_beta');
    initialModal_SharedWith('#modal_sharedwith');

    $('#do-search-btn').on('click', function () {
        if ($('#navbar-search-input').val() === "")
        {
            alert("Please input the query content");
            return false;
        } else
        {
            window.location.href = "post_search.jsp?soption=0&qname=" + $('#navbar-search-input').val();
        }

    });


    if ($("#post_main_page").attr("type") === "home")

    {
        isPostIcon=true;
        $.get(ACTION_MAP.getRelatedMoment, {filter: 'all_posts'}, function (data) {
            loadMoment(data, '.post_content_page');
        });
    } else if ($("#post_main_page").attr("type") === "friends")
    {
        $.get(ACTION_MAP.getRelatedMoment, {filter: 'hot_user_items'}, function (data) {
            if (data !== "-1" && data !== "")
            {
                data = JSON.parse(data);
                $.each(data, function (index, item) {
                    $('.post_content_page').append(groupBlockStyle(item));
                });
            }
        });
    } else if ($("#post_main_page").attr("type") === "groups")
    {
        $.get(ACTION_MAP.getRelatedMoment, {filter: 'hot_group_items'}, function (data) {
            if (data !== "-1" && data !== "")
            {
                data = JSON.parse(data);
                $.each(data, function (index, item) {
                    $('.post_content_page').append(groupBlockStyle(item));
                });
            }
        });
    } else if ($("#post_main_page").attr("type") === "user")
    {
        $.get(ACTION_MAP.getUserInfobyID, {gid: '0'}, function (data) {

            if (data !== "-1" && data !== "")
            {
                data = JSON.parse(data);
                loadUserInfo(data, '.post_content_page');
            }
        });
    } else if ($("#post_main_page").attr("type") === "group_info")
    {
        var gid = $("#post_main_page").attr("gid");
        var color = randomColor();
        $.get(ACTION_MAP.getUserInfobyID, {gid: gid}, function (data) {

            if (data !== "-1" && data !== "")
            {
                data = JSON.parse(data);
                $("#top_nav_name").text(data.name);
                loadUserTemplateInfo(data, color);
                $("#sideBar_Transtopia_group").css("background-color", color);
            }
        });
    } else if ($("#post_main_page").attr("type") === "post_info")
    {
        var gid = $("#post_main_page").attr("pid");
        showPostInfo(gid);
    } else if ($("#post_main_page").attr("type") === "search_info")
    {
        var qname = $("#post_main_page").attr("qname");
        var soption = $("#post_main_page").attr("soption");// 0 for all, 1 for position ,2 for category, 3, for tag,4 name
        showSearchInfo(qname, soption);
    }


    $('.page_top_nav_list').on('click', function () {
        var filter = $(this).attr('data-filter');
        $('.page_top_nav_list').removeClass("active");
        $(this).addClass("active");
        $('.post_content_page').empty();
        if (filter.endsWith("posts"))
        {
            if(filter==="all_posts"||filter==="hot_posts")
            {
                isPostIcon=true;
            }
            else
            {
                isPostIcon=false;
            }
            $.get(ACTION_MAP.getRelatedMoment, {filter: filter}, function (data) {
                loadMoment(data, '.post_content_page');
            });
        } else if (filter.endsWith("items"))
        {
            $.get(ACTION_MAP.getRelatedMoment, {filter: filter}, function (data) {
                if (filter === "my_group_items")
                {
                    $('.post_content_page').append(groupBlockStyleEmpty());
                }
                if (filter === "in_user_items")
                {
                    $('.post_content_page').append(friendBlockStyleEmpty());
                }
                if (data !== "-1" && data !== "")
                {
                    data = JSON.parse(data);
                    if (filter === "request_user_items")
                    {
                        $.each(data, function (index, item) {
                            $('.post_content_page').append(friendRequestBlockStyle(item));
                        });
                    } else
                    {
                        $.each(data, function (index, item) {
                            $('.post_content_page').append(groupBlockStyle(item));
                        });
                    }
                }
            });
        }

    });


    $('.sider_nav_list').on('click', function () {
        var filter = $(this).attr('data-filter');

        if (filter === "all_posts")
        {
            window.location.href = "index.jsp";
        } else if (filter === "groups")
        {
            window.location.href = "groups.jsp";
        } else if (filter === "friends")
        {
            window.location.href = "friends.jsp";
        } else if (filter === "mineInfo")
        {
            window.location.href = "user.jsp";
        }
    });
    


});


var addNewUserToGroup = function (item)
{
    var gid=$(item).attr("data-id");
    $("#modal_addUserToGroup").modal("show");
    var formatState = function (data) {
        var $data = $(
                '<div class="user-block">\
				<img class="img-circle img-bordered-sm" src="../../../' + data.img + '" alt="User Image">\
				<span class="username">\
					<div>' + data.text + '</div>\
				</span>\
			</div>'
                );
        return $data;
    };

    $('#to_add_users').select2({
        language: 'zh-CN',
        allowClear: true,
        minimumInputLength: 1,
        ajax: {
            url: ACTION_MAP.searchUsers,
            delay: 250,
            processResults: function (data) {
                return {
                    results: JSON.parse(data)
                };
            }
        },
        templateResult: formatState
    });
    
    $(".doAddNumToGroupSumbit").on('click', function () {
        var uids= $('#to_add_users').val();
        if(uids===null||uids==="")
        {
            alert("请输入姓名");
            return;
        }
        else
        {
            uids=JSON.stringify(uids);
            $.post(ACTION_MAP.addNewUserToGroup, {gid: gid, uids: uids}, function (data) {
                //location.reload();
                if (data !== "-1")
                {
                    location.reload();
                }
                else
                {
                    alert("添加失败");
                }

            }).fail(function () {
                console.log('Err: follow');
            });
        }
    });
};

var goSearchPage = function (item)
{
    var query = $(item).attr("data-query");
    var option = $(item).attr("data-option");
    window.location.href = "post_search.jsp?soption=" + option + "&qname=" + query;
};

// opeartions: following, dismissfollow, send friends, send group request.

var doFollowingOpeartions = function (item)
{
    var action = $(item).attr('data-action');
    var gid = $(item).attr('data-id');
    var uid = 0;
    if (action === "quitgroup_operation")
    {
        uid = $(item).attr('data-uid');
    }

    if (action === "dismissgroup_operation")
    {
        var r = confirm("你确定要退出此群组吗？");
        if (r === false)
        {
            return;
        }
    } else if (action === "dismissfriend_operation")
    {
        var r = confirm("你确定要删除此好友吗？");
        if (r === false)
        {
            return;
        }
    } else if (action === "quitgroup_operation")
    {
        var r = confirm("你确定要从群组中移除此用户吗？");
        if (r === false)
        {
            return;
        }
    }
    $.get(ACTION_MAP.follow, {gid: gid, uid: uid, action: action}, function (data) {
        //location.reload();
        if (data !== "-1")
        {

            if (action === "follow")
            {
                $(item).attr('data-action', "dismissfollow");
                alert("关注成功");
                $(item).html('<i class="fa fa-minus"></i><b>取消关注</b>');
            } else if (action === "dismissfollow")
            {
                $(item).attr('data-action', "follow");
                alert("取消关注成功");
                $(item).html('<i class="fa fa-plus"></i><b>关注</b>');
            } else if (action === "joinfriend_operation")
            {
                alert("好友请求已经发送成功");
            } else if (action === "joingroup_operation")
            {
                alert("加入群组请求已经发送成功");
            } else if (action === "dismissgroup_operation")
            {
                alert("成功退出群组");
            } else if (action === "dismissfriend_operation")
            {
                alert("成功解除好友关系");
            } else if (action === "quitgroup_operation")
            {
                alert("成功从群组解除此用户");
            }
        }

    }).fail(function () {
        console.log('Err: follow');
    });
};

//修改20170317 #15
var getText = function (id, list) {
    var result = "";
    $.each(list, function (index, item) {
        if (id === item.id) {
            result = item.text;
            return false;
        }
    });
    return result;
};
//修改20170317 #15结束

var friendRequestBlockStyle = function (data) {
    var color = randomColor();
    var content = '<div class="col-md-3" style="width:265px;" id="friend_block_' + data.fid + '">\
						<div class="group-box box-moment"  style="background:' + color + '">\
							<div class="group-box-img group-box-post" onclick="showGroupTemplate(this)" color="' + color + '" data-id="' + data.my_groupid + '" style="background: url(\'../../../' + data.bg_image + '\') center center;">\
								<img class="img-circle img-bordered-sm" src="../../../' + data.image + '">\
							</div>\
							<div class="name"><span style="float:left; font-weight:bold">' + data.name + '</span></div>';
    var cates = '<div style="margin-left:15px;margin-top:10px;"><p data-type="topic-genres" style="text-center:left;">';
    $.each(data.category, function (index, genre) {
        cates += '<a href="javascript:void(0);" data-action="follow" onclick="goSearchPage(this)" data-option="2" data-query="' + genre + '" data-genre="' + genre + '" class="label ' + randomPicker(colors) + '" style="margin-left: 3px;">' + genre + '</a>';
    });
    cates += '</p></div>';
    content += cates;
    //此处应完善
    var tags = '<div  style="margin-left:15px;"><p data-type="topic-tags" style="text-center:left;">';
    $.each(data.tags, function (index, tag) {
        tags += '<a data-action="follow"  data-option="3" onclick="goSearchPage(this)" data-query="' + tag + '" data-tag="' + tag + '" class="label ' + randomPicker(colors) + '" style="margin-left: 3px;">' + tag + '</a>';
    });
    tags += '</p></div>';
    content += tags;
    content += '<div class="dropdown option" style="font-weight:bold;">'
            + '<a href="javascript:void(0);" class="pull-right" style="margin: 5px 5px; color: #00a65a;"  onclick="doFriendRequest(this);" data-action="accept" data-id="' + data.fid + '"><i class="fa fa-check" style="font-size:18px;"></i> </a>'
            + '<a href="javascript:void(0);" class="pull-right" style="margin: 5px 5px; color: #d73925;" onclick="doFriendRequest(this);" data-action="decline" data-id="' + data.fid + '"><i class="fa fa-times" style="font-size:18px;"></i> </a>';

    content += '</div>\
							<div class="clearfix"></div>\
						</div>\
					</div>';
    return content;
};

var groupBlockStyleRequest = function (data, gid) {
    var color = randomColor();
    var content = '<div class="col-md-3" style="width:265px;" id="user_request_' + data.my_groupid + '">\
						<div class="group-box box-moment"  style="background:' + color + '">\
							<div class="group-box-img group-box-post" onclick="showGroupTemplate(this)" color="' + color + '" data-id="' + data.my_groupid + '" style="background: url(\'../../../' + data.bg_image + '\') center center;">\
								<img class="img-circle img-bordered-sm" src="../../../' + data.image + '">\
							</div>\
							<div class="name"><span style="float:left; font-weight:bold">' + data.name + '</span></div>';
    var cates = '<div style="margin-left:15px;margin-top:10px;"><p data-type="topic-genres" style="text-center:left;">';
    $.each(data.category, function (index, genre) {
        cates += '<a href="javascript:void(0);" data-action="follow" onclick="goSearchPage(this)" data-option="2" data-query="' + genre + '" data-genre="' + genre + '" class="label ' + randomPicker(colors) + '" style="margin-left: 3px;">' + genre + '</a>';
    });
    cates += '</p></div>';
    content += cates;
    //此处应完善
    var tags = '<div  style="margin-left:15px;"><p data-type="topic-tags" style="text-center:left;">';
    $.each(data.tags, function (index, tag) {
        tags += '<a data-action="follow"  data-option="3" onclick="goSearchPage(this)" data-query="' + tag + '" data-tag="' + tag + '" class="label ' + randomPicker(colors) + '" style="margin-left: 3px;">' + tag + '</a>';
    });
    tags += '</p></div>';
    content += tags;
    content += '<div class="dropdown option" style="font-weight:bold;">'
            + '<a href="javascript:void(0);" class="pull-right" style="margin: 5px 5px; color: #00a65a;"  onclick="doFriendRequest(this);" data-action="accept" data-pid="' + gid + '" data-id="' + data.my_groupid + '"><i class="fa fa-check" style="font-size:18px;"></i> </a>'
            + '<a href="javascript:void(0);" class="pull-right" style="margin: 5px 5px; color: #d73925;" onclick="doFriendRequest(this);" data-action="decline" data-pid="' + gid + '" data-id="' + data.my_groupid + '"><i class="fa fa-times" style="font-size:18px;"></i> </a>';

    content += '</div>\
							<div class="clearfix"></div>\
						</div>\
					</div>';
    return content;
};

var doFriendRequest = function (item)
{
    var action = $(item).attr("data-action");
    var fid = $(item).attr("data-id");
    $.get(ACTION_MAP.doFriendRequest, {action: action, fid: fid}, function (data) {
        if (data === "-1")
        {
            alert('操作失败');
        } else
        {
            alert('操作成功');
            $("#friend_block_" + fid).remove();
        }

    }).fail(function () {
        console.log('err: accept friend');
    });
};

//20170321
var initialMomentPostBlock = function (target) {
    loadWysiwyg(target + ' .editor');

    $('#shareMoment-btn').click(function () {
        var moment = {};
        moment['content'] = $(target + ' .editor').html();
        moment['title'] = $(target + ' #moment-title').val();
        moment['sender'] = $(target + ' #user-block > a').attr('data-id');
        moment['genre'] = JSON.stringify($(target + ' #select-genre').val());
        moment['tags'] = JSON.stringify($(target + ' #select-tags').val());
        moment['sharedwith'] = JSON.stringify($(target + ' #sharedwith_span').attr('data-sharedwith').split(','));


        if (moment.content === "" || moment.title === "" || moment.genre === "" || moment.tags === "")
        {
            alert("输入信息不完全");
            return;
        }

        var result = [];
        var data = '<div>' + $(target + ' .editor').html() + '</div>';
        data = $(data);
        var items = (data).find("img");
        var index1 = 0;
        var uid = $("#post_main_page").attr("userid");
        $.each(items, function (index, item) {
            if ($(item).attr("src").startsWith("data:image"))
            {
                result.push($(item).attr("src"));
                $(item).attr("src", uid + "_" + index1 + ".png");
                index1++;
            }
        });

        moment['content'] = '<div>' + data.html() + '</div>';
        moment['images'] = JSON.stringify(result);

        $.post(ACTION_MAP.postMoment, moment, function (data) {


            if (data === "-1")
            {
                alert("发布失败");
            } else
            {
                $('#newpost select').select2().val('').trigger('change');
                $('#newpost input').val('');
                $('#newpost .editor').text('');
                $('#newpost').modal('hide');
                location.reload();
            }

        });
        //console.log(data)
    });


    //加载更多选项
    $.get(ACTION_MAP.getOption, function (data) {
        data = JSON.parse(data);
        $(target + " #select-genre").select2({
            language: 'zh-CN',
            data: data.genres,
            tags: true
        });

        $(target + " #select-tags").select2({
            language: 'zh-CN',
            tags: true,
            data: data.tags
        });

        var sender_block = $(target + ' #user-block .dropdown-menu');
        sender_block.empty();
        $.each(data.senders, function (index, sender) {
            if (sender.text === '个人') {
                //individual
                sender_block.append('<li class="dropdown-header">个人</li>');
                sender_block.append('<li class="divider"></li>');
                $.each(sender.children, function (index, item) {
                    if (index == 0) {
                        $(target + ' #user-block > a').attr('data-id', item.id);
                        //$(target + ' #user-block > a').attr('data-role', "1");
                        $(target + ' #user-block > a').text(item.text);
                        $(target + ' .modal-title > img:eq(0)').attr('src', "../../../" + item.image);
                    }
                    sender_block.append('<li><a href="javascript:void(0);" data-role="1" data-id="' + item.id + '"><img src="../../../' + item.image + '" class="img-circle img-bordered-sm" style="width: 25px; height: 25px; margin-right: 10px;">' + item.text + '</a></li>');
                });
            } else if (sender.text === '群组') {
                //group
                sender_block.append('<li class="divider"></li>');
                sender_block.append(' <li class="dropdown-header">群组</li>');
                sender_block.append('<li class="divider"></li>');
                $.each(sender.children, function (index, item) {
                    sender_block.append('<li><a href="javascript:void(0);" data-role="2" data-id="' + item.id + '"><img src="../../../' + item.image + '" class="img-circle img-bordered-sm" style="width: 25px; height: 25px; margin-right: 10px;">' + item.text + '</a></li>');
                });
            } else {
                console.log('err');
            }

        });

        $(sender_block).find('a').on('click', function (e) {
            $(target + ' #user-block > a').attr('data-id', $(this).attr('data-id'));
            $(target + ' #user-block > a').text($(this).text());
            $(target + ' .modal-title > img:eq(0)').attr('src', $(this).find('img').attr('src'));
            $(target).attr("data-role", $(this).attr('data-role'));
        });

    })
            .fail(function () {
                console.log('Err: option')
            });
};

var momentReviewBlockStyle = function (data, pid) {
    //修改20170317 #2
    //修改内容：回复用户(样式)

    var comment = '<div class="box-comment" id="comment_box_'+data.id+'">'
            + '<img class="img-circle img-sm" onclick="showGroupTemplate(this)" data-id="' + data.user_id + '" src="../../../' + data.user_img + '" alt="User Image">'
            + '<div class="comment-text">';
    if (data.type === 2)
    {
        comment += '<span class="username"><span style="margin-right:10px;" onclick="showGroupTemplate(this)" data-id="' + data.user_id + '">' + data.user_name + '</span><span style="color:#3c8dbc">回复</span><span style="margin-left:10px;" onclick="showGroupTemplate(this)" data-id="' + data.to_id + '">' + data.to_name + '</span>';
    } else
    {
        comment += '<span class="username"><span onclick="showGroupTemplate(this)" data-id="' + data.user_id + '">' + data.user_name + '</span>';
    }

    comment += '<span class="dropdown pull-right"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa  fa-angle-down" style="color:black;font-size:18px;"></i> </a>\
								<ul class="dropdown-menu">\
									<li><a href="javascript:void(0);" onclick="replyToUser(this)" data-action="reply" data-id="' + data.user_id + '" data-name="' + data.user_name + '" data-pid="' + pid + '">回复</a></li>';

    var usergid = $("#post_main_page").attr("userid");
    if (usergid === data.user_id)
    {
        comment += '<li><a href="javascript:void(0);" onclick="deleteUserComment(this)" data-id="' + data.id + '" data-pid="'+pid+'">删除</a></li>';
    }
    comment += '</ul></span></span><span class="description text-muted">' + getDateTime_Trans(data.datetime) + '</span><br/>'
            + data.content
            + '</div>'
            + '</div>';
    return comment;
};

//修改20170317 #11
var groupBlockStyle = function (data) {
    var color = randomColor();
    var content = '<div class="col-md-3" style="width:265px;">\
						<div class="group-box box-moment"  style="background:' + color + '">\
							<div class="group-box-img group-box-post" onclick="showGroupTemplate(this)" color="' + color + '" data-id="' + data.gid + '" style="background: url(\'../../../' + data.bg_image + '\') center center;">\
								<img class="img-circle img-bordered-sm" src="../../../' + data.imageProfile + '">\
							</div>\
							<div class="name">';
    if (data.role === 6)
    {
        content += '<span style="float:left; font-weight:bold">' + data.name + '</span></div>';
    } else
    {
        content += '<span style="float:left;font-weight:bold">' + data.name + '</span><span style="float:right;margin-right:15px;" class="group_member_count">' + data.member_count + '人</span></div>';
    }

    var cates = '<div style="margin-left:15px;margin-top:10px;"><p data-type="topic-genres" style="text-center:left;">';
    $.each(data.category, function (index, genre) {
        cates += '<a href="javascript:void(0);" data-action="follow" onclick="goSearchPage(this)" data-option="2" data-query="' + genre + '" data-genre="' + genre + '" class="label ' + randomPicker(colors) + '" style="margin-left: 3px;">' + genre + '</a>';
    });
    cates += '</p></div>';
    content += cates;
    //此处应完善
    var tags = '<div  style="margin-left:15px;"><p data-type="topic-tags" style="text-center:left;">';
    $.each(data.tags, function (index, tag) {
        tags += '<a data-action="follow"  data-option="3" onclick="goSearchPage(this)" data-query="' + tag + '" data-tag="' + tag + '" class="label ' + randomPicker(colors) + '" style="margin-left: 3px;">' + tag + '</a>';
    });
    tags += '</p></div>';
    content += tags;
    content += '<div class="dropdown option" style="font-weight:bold;">';
    if (data.isFollowed === 4)
    {
        content += ' <a href="javascript:void(0);" class="btn btn-default btn-sm following_operation following_operation_1" onclick="doFollowingOpeartions(this)" style="margin: 5px 5px;  float:right;" data-action="none" data-id="' + data.gid + '">你本人</a>';

    } else if (data.isFollowed === 5)
    {
        content += ' <a href="javascript:void(0);" class="btn btn-default btn-sm following_operation  following_operation_1" onclick="doFollowingOpeartions(this)" style="margin: 5px 5px; float:left;" data-action="dismissfollow" data-id="' + data.gid + '">取消关注</a>';

        if (data.isAdmin === 1)
        {
            content += '<a href="javascript:void(0);" class="btn btn-default btn-sm following_operation following_operation_1" style="margin: 5px 5px; float:right;" onclick="doFollowingOpeartions(this)" data-action="none" data-id="' + data.gid + '">管理员</a>';

        } else
        {
            content += '<a href="javascript:void(0);" class="btn btn-default btn-sm following_operation following_operation_1" style="margin: 5px 5px; float:right;" onclick="doFollowingOpeartions(this)" data-action="dismissgroup_operation" data-id="' + data.gid + '">已加入(退出)</a>';

        }

    } else if (data.isFollowed === 6)
    {
        content += ' <a href="javascript:void(0);" class="btn btn-default btn-sm following_operation following_operation_1" onclick="doFollowingOpeartions(this)" style="margin: 5px 5px;  float:left;" data-action="follow" data-id="' + data.gid + '"><i class="fa fa-plus"></i>关注</a>';
        if (data.isAdmin === 1)
        {
            content += '<a href="javascript:void(0);" class="btn btn-default btn-sm following_operation following_operation_1" style="margin: 5px 5px; float:right;" onclick="doFollowingOpeartions(this)" data-action="none" data-id="' + data.gid + '">管理员</a>';

        } else
        {
            content += '<a href="javascript:void(0);" class="btn btn-default btn-sm following_operation following_operation_1" style="margin: 5px 5px; float:right;" onclick="doFollowingOpeartions(this)" data-action="dismissgroup_operation" data-id="' + data.gid + '">已加入(退出)</a>';

        }
    } else
    {
        if (data.isFollowed === 0 || data.isFollowed === 2)
        {
            content += '<a href="javascript:void(0);" class="btn btn-default btn-sm following_operation following_operation_1" onclick="doFollowingOpeartions(this)" style="margin: 5px 5px;  float:left;" data-action="follow" data-id="' + data.gid + '">关注</a>';

        } else
        {
            content += ' <a href="javascript:void(0);" class="btn btn-default btn-sm following_operation following_operation_1" onclick="doFollowingOpeartions(this)" style="margin: 5px 5px;  float:left;" data-action="dismissfollow" data-id="' + data.gid + '">取消关注</a>';

        }
        if (data.role !== 6)
        {
            content += '<a href="javascript:void(0);" class="btn btn-default btn-sm following_operation following_operation_1" onclick="doFollowingOpeartions(this)" style="margin: 5px 5px;float:right;" data-action="joingroup_operation" data-id="' + data.gid + '">申请加入</a>';
        } else
        {
            if (data.isFollowed === 0 || data.isFollowed === 1)// friend
            {
                content += '<a href="javascript:void(0);" class="btn btn-default btn-sm following_operation following_operation_1"  onclick="doFollowingOpeartions(this)" style="margin: 5px 5px;float:right;" data-action="joinfriend_operation" data-id="' + data.gid + '">加为好友</a>';
            }

            if (data.isFollowed === 2 || data.isFollowed === 3)
            {
                content += '<a href="javascript:void(0);" class="btn btn-default btn-sm following_operation following_operation_1" onclick="doFollowingOpeartions(this)" style="margin: 5px 5px;float:right;" data-action="dismissfriend_opeartion" data-id="' + data.gid + '">好友(解除好友)</a>';
            }

        }
    }

    content += '</div>\
							<div class="clearfix"></div>\
						</div>\
					</div>';
    return content;
};
     
var groupBlockStyleAdmin = function (data, gid) {
    var color = randomColor();
    var content = '<div class="col-md-3" style="width:265px;">\
						<div class="group-box box-moment"  style="background:' + color + '">';
    if (data.isFollowed !== 4)
    {
        content += '<div class="box-tools" style="top:0px;">';
        content += '<a href="javascript:void(0);" class="btn btn-default btn-sm following_operation following_operation_1" style="margin: 5px 5px;float:right;"  onclick="doFollowingOpeartions(this)" data-action="quitgroup_operation" data-uid="' + data.gid + '" data-id="' + gid + '"><i class="fa fa-close" aria-hidden="true"></i></a></div>';
    }
    content += '<div class="group-box-img group-box-post" onclick="showGroupTemplate(this)" color="' + color + '" data-id="' + data.gid + '" style="background: url(\'../../../' + data.bg_image + '\') center center;">\
								<img class="img-circle img-bordered-sm" src="../../../' + data.imageProfile + '">\
							</div>\
							<div class="name">';
    if (data.role === 6)
    {
        content += '<span style="float:left; font-weight:bold">' + data.name + '</span></div>';
    } else
    {
        content += '<span style="float:left;font-weight:bold">' + data.name + '</span><span style="float:right;margin-right:15px;" class="group_member_count">' + data.member_count + '人</span></div>';
    }

    var cates = '<div style="margin-left:15px;margin-top:10px;"><p data-type="topic-genres" style="text-center:left;">';
    $.each(data.category, function (index, genre) {
        cates += '<a href="javascript:void(0);" data-action="follow" onclick="goSearchPage(this)" data-option="2" data-query="' + genre + '" data-genre="' + genre + '" class="label ' + randomPicker(colors) + '" style="margin-left: 3px;">' + genre + '</a>';
    });
    cates += '</p></div>';
    content += cates;

    //此处应完善
    var tags = '<div  style="margin-left:15px;"><p data-type="topic-tags" style="text-center:left;">';
    $.each(data.tags, function (index, tag) {
        tags += '<a data-action="follow"  data-option="3" onclick="goSearchPage(this)" data-query="' + tag + '" data-tag="' + tag + '" class="label ' + randomPicker(colors) + '" style="margin-left: 3px;">' + tag + '</a>';
    });
    tags += '</p></div>';
    content += tags;
    content += '<div class="col-md-12" style="font-weight:bold;">';
    if (data.isFollowed === 4)
    {
        content += ' <a href="javascript:void(0);" class="btn btn-default btn-sm following_operation following_operation_1" onclick="doFollowingOpeartions(this)" style="margin: 5px 5px;  float:right;" data-action="none" data-id="' + data.gid + '">你本人</a>';
    } else
    {
        if (data.isFollowed === 0 || data.isFollowed === 2)
        {
            content += '<a href="javascript:void(0);" class="col-sm-4 btn btn-default btn-sm following_operation following_operation_1" onclick="doFollowingOpeartions(this)" style="margin: 5px 5px;" data-action="follow" data-id="' + data.gid + '">关注</a>';

        } else
        {
            content += ' <a href="javascript:void(0);" class=" col-sm-4 btn btn-default btn-sm following_operation following_operation_1" onclick="doFollowingOpeartions(this)" style="margin: 5px 5px;" data-action="dismissfollow" data-id="' + data.gid + '">取消关注</a>';

        }
        if (data.isFollowed === 0 || data.isFollowed === 1)// friend
        {
            content += '<a href="javascript:void(0);" class="col-sm-6 btn btn-default btn-sm following_operation following_operation_1"  onclick="doFollowingOpeartions(this)" style="margin: 5px 5px; float:right" data-action="joinfriend_operation" data-id="' + data.gid + '">加为好友</a>';
        }

        if (data.isFollowed === 2 || data.isFollowed === 3)
        {
            content += '<a href="javascript:void(0);" class="col-sm-6 btn btn-default btn-sm following_operation following_operation_1" style="margin: 5px 5px; float:right" onclick="doFollowingOpeartions(this)"  data-action="dismissfriend_operation" data-id="' + data.gid + '">好友(解除好友)</a>';
        }
    }

    content += '</div>\
							<div class="clearfix"></div>\
						</div>\
					</div>';
    return content;
};

var groupBlockStyleEmpty = function () {
    var content = '<div class="col-md-3" style="width:265px;">\
						<div class="group-box box-moment"  style="background:white; width:235px;height:268px;" onclick="createNewGroup();"><i class="fa fa-plus-circle" style="color:gray; font-size:30px; margin-top:45%" aria-hidden="true"></i></br><span style="margin-top:10px;">创建群组</span></div></div>';
    return content;
};

var friendBlockStyleEmpty = function () {
    var content = '<div class="col-md-3" style="width:265px;">\
						<div class="group-box box-moment"  style="background:white; width:235px;height:268px;" onclick="sendFriendRequest();"><i class="fa fa-plus-circle" style="color:gray; font-size:30px; margin-top:45%" aria-hidden="true"></i></br><span style="margin-top:10px;">添加好友</span></div></div>';
    return content;
};

var addUserBlockStyleEmpty = function (gid) {
    var content = '<div class="col-md-3" style="width:265px;text-align:center;">\
						<div class="group-box box-moment"  style="background:white; width:235px;height:268px;" onclick="addNewUserToGroup(this);" data-id="' + gid + '"><i class="fa fa-plus-circle" style="color:gray; font-size:30px; margin-top:45%" aria-hidden="true"></i></br><span style="margin-top:10px;">添加成员</span></div></div>';
    return content;
};


var sendFriendRequestByEmail = function ()
{
    $("#modal_addfriend_email").modal("show");
    var formatState = function (data) {
        var $data = $(
                '<div class="user-block">\
				<img class="img-circle img-bordered-sm" src="../../../' + data.img + '" alt="User Image">\
				<span class="username">\
					<div>' + data.text + '</div>\
				</span>\
			</div>'
                );
        return $data;
    };

    $('#adding_friend_email').select2({
        language: 'zh-CN',
        allowClear: true,
        minimumInputLength: 1,
        ajax: {
            url: ACTION_MAP.searchUsersByEmail,
            delay: 250,
            processResults: function (data) {
                return {
                    results: JSON.parse(data)
                };
            }
        },
        templateResult: formatState
    });

    $(".doSendingFriendRequest").on('click', function () {
        $.get(ACTION_MAP.addFriendByEmail, {senderid: $("#adding_friend_email").val()}, function (data) {
            alert('已发送请求！');
            $("#modal_addfriend_email").modal('hide');
        }).fail(function (err) {
            console.log('err: add friend by email');
        });
        ;
    });

};

var sendFriendRequest = function ()
{
    $("#modal_friend_option").modal("show");
    $(".friend-list-item").on("click", function () {
        if ([0, 1, 2, 5].indexOf($(this).val()) >= 0) {
            $("#modal_addfriend .modal-body").html(
                    '<img src="' + 'dist/img/Test_addFriend.jpg' + '">\
			<p>使用微信“扫一扫”</p>\
			<p>将打开的页面通过右上角分享功能发送给您的好友</p>\
			<input class="btn btn-primary" value="完成">');
        } else if ($(this).val() === 3) {
            sendFriendRequestByEmail();
        } else if ($(this).val() == 4) {
            $("#modal_addfriend .modal-body").html(
                    '<input class="form-control" type="text" placeholder="请输入电话号码">\
		<input class="btn btn-primary" value="完成">');
        } else {
            sendFriendRequestByEmail();
        }

        $('#modal_addfriend').modal('toggle');
    });
};

//var sendFriendRequest = function ()
//{
//    $("#modal_friend_option").modal("show");
//    $(".newfriend-centre-list-item").on("click", function () {
//        $('#modal_addfriend .modal-header .newfriend-centre-list-item').html($(this).html());
//        if ([0, 1, 2, 5].indexOf($(this).val()) >= 0) {
//            $("#modal_addfriend .modal-body").html(
//                    '<img src="' + 'dist/img/Test_addFriend.jpg' + '">\
//			<p>使用微信“扫一扫”</p>\
//			<p>将打开的页面通过右上角分享功能发送给您的好友</p>\
//			<input class="btn btn-primary" value="完成">');
//        } else if ($(this).val() === 3) {
//            $("#modal_addfriend .modal-body").html(
//                    '<input class="form-control" type="text" placeholder="请输入Email地址">\
//		<input class="btn btn-primary btn-submit" value="完成">');
//            $("#modal_addfriend .modal-body .btn-submit").on('click', function () {
//                $.get(ACTION_MAP.addFriendByEmail, {senderid: $("#modal_addfriend .modal-body input[type='text']").val()}, function (data) {
//                    //console.log(data);
//                    //完善
//                    alert('已发送请求！');
//                    $("#modal_addfriend").modal('hide');
//                }).fail(function (err) {
//                    console.log('err: add friend by email');
//                });
//                ;
//            });
//        } else if ($(this).val() == 4) {
//            $("#modal_addfriend .modal-body").html(
//                    '<input class="form-control" type="text" placeholder="请输入电话号码">\
//		<input class="btn btn-primary" value="完成">');
//        } else {
//
//        }
//
//        $('#modal_addfriend').modal('toggle');
//    });
//};

var createNewGroup = function ()
{
    $("#tab_creategroup").modal("show");
    //完善 clear input
    //加载话题
    $.get(ACTION_MAP.getTopic, function (data) {
        data = JSON.parse(data);
        $("#group-topic").select2({
            language: 'zh-CN',
            data: data.category_list,
            tags: true
        });
        $("#group-tags").select2({
            language: 'zh-CN',
            data: data.tags_list,
            tags: true
        });

    }).fail(function (data) {
        console.log('err: topic list');
    });

    //加载成员列表
    var formatState = function (data) {
        var $data = $(
                '<span><img class="img-circle" style="width: 35px; height:35px;" src="../../../' + data.img + '" /> ' + data.text + '</span> <span style="margin-left: 20px;">' + data.title + '</span>'
                );
        return $data;
    };

    $.get(ACTION_MAP.getFriendList1, function (data) {
        var list = [];
        data = JSON.parse(data);
        $.each(data, function (index, d) {
            list.push({'id': d.uid, 'img': d.image, 'title': d.introduction, 'text': d.name});
        });

        $("#select-member").select2({
            language: 'zh-CN',
            data: list,
            templateResult: formatState
        });
    }).fail(function (data) {
        console.log('err: friend list');
    });

    //加载其他
    $("#group_size").select2({
        language: 'zh-CN',
        data: [{id: 1, text: '1G'}, {id: 2, text: '2G'}, {id: 3, text: '5G'}, {id: 4, text: '10G'}, {id: 5, text: '无限制'}]
    });
    $("#group_memberlimit").select2({
        language: 'zh-CN',
        data: [{id: 1, text: '10人'}, {id: 2, text: '100人'}, {id: 3, text: '500人'}, {id: 4, text: '无限制'}]
    });
    $("#group_filexpire").select2({
        language: 'zh-CN',
        data: [{id: 1, text: '7天'}, {id: 2, text: '一个月'}, {id: 3, text: '半年'}, {id: 4, text: '一年'}, {id: 5, text: '永久'}]
    });
    $("#group_subgrouplimit").select2({
        language: 'zh-CN',
        data: [{id: 1, text: '不可分租'}, {id: 2, text: '3组'}, {id: 3, text: '5组'}, {id: 4, text: '10组'}, {id: 5, text: '无限制'}]
    });
    $('input[type="checkbox"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });

    //群图片上传
    $('.post-file :file').on('change', function () {
        var input = $(this),
                numFiles = input.get(0).files ? input.get(0).files.length : 1,
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });

    $('.post-file :file').on('fileselect', function (event, numFiles, label) {

        var input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;

        if (input.length) {
            input.val(log);
        } else {
            if (log)
                alert(log);
        }

    });
    $(function () {
        $(".post-file :file").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
            }
        });
    });
    function imageIsLoaded(e) {
        $('#myImg').attr('src', e.target.result);
        $('#myImg').removeClass("hide");
    }
    ;

    $('.post-file1 :file').on('change', function () {
        var input = $(this),
                numFiles = input.get(0).files ? input.get(0).files.length : 1,
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });

    $('.post-file1 :file').on('fileselect', function (event, numFiles, label) {

        var input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;

        if (input.length) {
            input.val(log);
        } else {
            if (log)
                alert(log);
        }

    });
    $(function () {
        $(".post-file1 :file").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = imageIsLoaded1;
                reader.readAsDataURL(this.files[0]);
            }
        });
    });
    function imageIsLoaded1(e) {
        $('#myImg-bg').attr('src', e.target.result);
        $('#myImg-bg').removeClass("hide");
    }
    ;


    $('#tab_creategroup .btn-create').on('click', function () {


        var data = {};
        data['category'] = JSON.stringify($('#tab_creategroup [name="topic"]').val());
        data['tags'] = JSON.stringify($('#tab_creategroup [name="tags"]').val());
        data['userids'] = JSON.stringify($('#tab_creategroup [name="member"]').val());
        data['image'] = $("#myImg").attr("src");
        data['image_bg'] = $("#myImg-bg").attr("src");
        data['name'] = $('#tab_creategroup [name="name"]').val();
        data['introduction'] = $('#tab_creategroup [name="introduction"]').val();
        $.post("../../HandleGroupRequest", {option: 1, userids: data.userids, name: data.name, image: data.image, bg_image: data.image_bg, tags: data.tags, category: data.category, introduction: data.introduction}, function (result)
        {
            if (result === "0")
            {
                alert("创建失败");
            } else
            {
                alert("创建成功");
                $('#tab_creategroup').modal('hide');
            }
        });
    });
};

var editPostInfo = function (item)
{
    $.get('../../HandleGetGroupMessage?option=6&pid=' + $(item).attr("data-id"), function (data1) {
        data1 = JSON.parse(data1);
        var post=data1.post;
        var info=data1.info;
        $('#edit_select-genre').select2({
            data: info.category_list
        });
        $('#edit_select-tags').select2({
            data: info.tags_list
        });
        //加载旧信息
        $('#edit_moment-title').val(post.title);
        $('#edit_editor').html(post.content);
        $('#edit_select-genre').select2({tags: true}).val(post.category).trigger('change');
        $('#edit_select-tags').select2({tags: true}).val(post.tags).trigger('change');

        loadWysiwyg('#editpost' + ' .editor');
        $('#editpost').modal('show');
        $('#editMoment-btn').click(function () {
            var moment = {};
            moment['content'] = $('#editpost').html();
            moment['title'] = $('#edit_moment-title').val();
            moment['id'] = $(item).attr("data-id");
            moment['tags'] = JSON.stringify($('#edit_select-tags').val());
            moment['genre'] = JSON.stringify($('#edit_select-genre').val());
            if (moment.content === "" || moment.title === "" || moment.genre === "" || moment.tags === "")
            {
                alert("输入信息不完全");
                return;
            }

            var result = [];
            var data = '<div>' + $('#edit_editor').html() + '</div>';
            data = $(data);
            var items = (data).find("img");
            var index1 = 0;
            var uid = $("#post_main_page").attr("userid");
            $.each(items, function (index, item) {
                if ($(item).attr("src").startsWith("data:image"))
                {
                    result.push($(item).attr("src"));
                    $(item).attr("src", uid + "_" + index1 + ".png");
                    index1++;
                }
            });

            moment['content'] = '<div>' + data.html() + '</div>';
            moment['images'] = JSON.stringify(result);

            $.post(ACTION_MAP.editMoment, moment, function (data) {


                if (data === "-1")
                {
                    alert("修改失败");
                } else
                {
                    location.reload();
                }

            });
            //console.log(data)
        });

    });
};

 var deletePostInfo=function(item)
 {
     var r = confirm("你确定要删除此动态吗？");
     if(r===true)
     {
         var pid=$(item).attr("data-id");
         
         $.post(ACTION_MAP.deletePost,{pid:pid}, function (data) {
             if(data==="-1")
             {
                 alert("系统错误，删除操作没有完成");
             }
             else
             {
                 $("#moment_box_"+pid).remove();
             }
         });
     }
 };
 
 var deleteUserComment=function(item)
 {
     var cid = $(item).attr('data-id');
     var pid = $(item).attr('data-pid');
     var r = confirm("你确定要删除此评论吗？");
     if(r===true)
     {
         $.post(ACTION_MAP.deleteComment,{cid:cid,pid:pid}, function (data) {
             if(data==="-1")
             {
                 alert("系统错误，删除操作没有完成");
             }
             else
             {
                 $("#comment_box_"+cid).remove();
                 var number=$("#comment_size_"+pid).text();
                 number=parseInt(number)-1;
                 $("#comment_size_"+pid).text(number);
             }
         });
     }
 };

//加载动态

var showNewPost=function()
{
    $("#newpost_beta").modal("show");
};


var momentBlockStyle_Blank = function () {
    var image=$("#post_main_page").attr("uimage");
    var content = '<div id="moment_box_0"><div class="box box-widget box-moment" onclick="showNewPost();">';
    content += '<div class="box-header with-border">'
            + '<div class="user-block">'
            + '<img class="img-circle" src="../../../' + image + '"><span style="color:#bdbdbd;font-size: 16px;margin-left: 10px;position: relative;top: 10px;">你最近有什么新鲜事要分享吗？</span>';
    content += '</div>'
            + '</div>';
    content += '</div>';

    return content;
};

var momentBlockStyle = function (data) {
    var content_brief = '';
    console.log($(data.content).find('img').length);
    var items = $(data.content);
    var hasImage = false;
    var imageURL = '';
    $.each(items, function (index, tagitem) {
        if ($(tagitem).is("img"))
        {
            imageURL = $(tagitem).attr("src");
            hasImage = true;
        }
    });
    if ($(data.content).find('img').length > 0 || hasImage)
    {
        var url = $(data.content).find('img:eq(0)').attr('src');
        if (url === undefined | url === null || url === "")
        {
            url = imageURL;
        }
        content_brief = '<img class="img-responsive pad" src="' + url + '" alt="Photo">';
    } else
    {
        content_brief = '<div style="height:250px;overflow-y:hidden">' + data.content + '</div>';
    }

    var content = '<div id="moment_box_' + data.id + '"><div class="box box-widget box-moment">';
    content += '<div class="box-header with-border">'
            + '<div class="user-block">'
            + '<img class="img-circle" src="../../../' + data.gimage + '" alt="User Image" onclick="showGroupTemplate(this)" color="' + randomColor() + '" data-id="' + data.gid + '">'
            + '<span class="username"><a href="javascript:void(0);" onclick="showGroupTemplate(this)" color="' + randomColor() + '" data-id="' + data.gid + '">' + data.gname + '</a>\
               <small><i class="fa fa-chevron-right" style="margin-right:5px;"></i>';
    $.each(data.genre, function (index, cate) {
        content += '<a href="javascript:void(0);" onclick="goSearchPage(this)" data-option="2" data-query="' + cate + '" data-id="' + cate + '" style="color:#00a65a">' + cate + '&nbsp;&nbsp;</a>';
    });

    content += '</small></span><span class="description" style="margin-top:5px;">' + getDateTime_Trans(data.datetime) + '</span>'
            + '<span class="username" style="margin-left:0px;margin-top: 10px;"><a href="javascript:void(0);" onclick="showSingePostInfo(this)" data-id="' + data.id + '">' + data.title + '</a></span>'
            + '</div>'
            + '<div class="box-tools" style="top:0px;">';
    if (data.isAdmin === 1)
    {
        content += '<button type="button" class="btn btn-box-tool" onclick="editPostInfo(this);" data-id="' + data.id + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>';
    }
    content += '<button type="button" class="btn btn-box-tool" onclick="showSingePostInfo(this)" data-id="' + data.id + '"><i class="fa fa-external-link" aria-hidden="true"></i></button>';
    if (data.isAdmin === 1)
    {
        content += '<button type="button" class="btn btn-box-tool" onclick="deletePostInfo(this);" data-id="' + data.id + '"><i class="fa fa-trash" aria-hidden="true"></i></button>';
    }
    content += '</div>'
            + '</div>';

    content += '<div class="box-body">'
            + content_brief
            + '<div class="box-nav-bottom">'
            + ' <a class="box-footer-item" data-toggle="collapse" href="#collapse-review-' + data.id + '"><span class="fa fa-comment"></span>  <i class="data"></i><i class="data" id="comment_size_' + data.id + '"> ' + $(data.comments).length + '</i></a>\
									<a class="box-footer-item" data-toggle="collapse" href="#collapse-tag-' + data.id + '"><span class="fa fa-tag"></span> <i class="data">' + $(data.tags).length + '</i></a>\
									<a href="javascript:void(0)" onclick="doPostLike(this);" class="moment-like box-footer-item" data-id="' + data.id + '" data-like="' + data.like + '"><span class="fa ' + (data.like == 0 ? "fa-thumbs-o-up" : "fa-thumbs-up") + '"></span> <i class="data" id="total_like_' + data.id + '">' + data.total_like + '</i></a>';
    if (data.userTags != null && data.userTags.length > 0)
    {
        content += '<a class="box-footer-item" data-toggle="collapse" href="#collapse-collection-' + data.id + '"><span class="fa fa-sticky-note"></span> <i class="data">' + $(data.userTags).length + '</i></a>';
    } else
    {
        content += '<a href="javascript:void(0)" onclick="doPostStar(this);" class="moment-star box-footer-item" data-id="' + data.id + '" data-star="' + data.star + '"><span class="fa ' + (data.star == 0 ? "fa-star-o" : "fa-star") + '"></span></a>';
    }

    content += '</div><div id="collapse-tag-' + data.id + '" class="collapse in box-footer"></div>';
    if (data.userTags != null && data.userTags.length > 0)
    {
        content += '<div id="collapse-collection-' + data.id + '" class="collapse in box-footer"></div>';
    }
    content += ' </div>';

    content += '<div class="box-footer box-comments collapse"  id="collapse-review-' + data.id + '"><div style="max-height:200px;overflow-y:scroll;" id="collapse-review-beta-' + data.id + '">';

    content += '</div></div>';

    return content;
};

var showSearchInfo = function (qname, option)// 0 for all, 1 for position ,2 for category, 3, for tag,4 name
{
    option = parseInt(option);
    $.get(ACTION_MAP.searchmoment, {query: qname, soption: option}, function (data) {
        //post_content_page_group
        if (data !== "-1" || data !== "")
        {
            data = JSON.parse(data);
            $('.post_content_page_group').hide();
            $('.post_content_page_user').hide();
            $('.post_content_page_post').hide();
            if(data.groups!==undefined&&data.groups!==null&&data.groups.length>0)
            {
                 $('.post_content_page_group').show();
                 $('.post_content_page_group_main').empty();
            }
            
            if(data.users!==undefined&&data.users!==null&&data.users.length>0)
            {
                 $('.post_content_page_user').show();
                 $('.post_content_page_user_main').empty();
            }
            
            if(data.posts!==undefined&&data.posts!==null&&data.posts.length>0)
            {
                $('.post_content_page_post').show();
                $('.post_content_page_post_main').empty();
            }
           
           
            

            $.each(data.groups, function (index, item) {
                 
                $('.post_content_page_group_main').append(groupBlockStyle(item));
            });


            $.each(data.users, function (index, item) {
                $('.post_content_page_user_main').append(groupBlockStyle(item));
            });


            $.each(data.posts, function (index, item) {
                $('.post_content_page_post_main').append(momentBlockStyle(item, '.post_content_page_post_main'));
            });
        }
    });
};


function showPostSelection()
{
    $("#modal_sharedwith").modal("show");
    if ($("#newpost_beta").attr("data-role") == "2")
    {
        $("#sharedPost_name").text("群组可见");
    } else
    {
        $("#sharedPost_name").text("选择分享范围");
    }
}

var initialModal_SharedWith = function (target) {
    $(target + ' input[type="checkbox"].minimal, ' + target + ' input[type="radio"].minimal').iCheck({
        labelHover: true,
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });

    $(target + ' [type="radio"]').on('ifChecked', function (e) {
        if ($(this).val() == 1) {
            $('#modal_sharedwith .box').addClass('hidden');
        } else if ($(this).val() == 2 && $("#newpost_beta").attr("data-role") == "1") {

            $('#modal_sharedwith .box').removeClass('hidden');

            //加载好友
            $.get(ACTION_MAP.getFriendList, function (data) {
                data = JSON.parse(data);
                $(target + ' .box .friend-item').remove();
                $.each(data, function (index, d) {
                    //console.log(d.id);
                    $('#modal_sharedwith .box .friend-nav').after(
                            '<tr class="friend-item">\
							<td><img src="' + d.image + '" class="img-circle img-bordered-sm" style="width: 45px; height: 45px;">\
								' + d.name + '\
							</td>\
							<td></td>\
							<td style="vertical-align: middle; width: 15px;"><input type="checkbox" name="c1" class="minimal" value="' + d.id + '"></td>\
						</tr>'
                            );
                });
                //加载Icheck
                $(target + ' .friend-item input[type="checkbox"].minimal').iCheck({
                    labelHover: true,
                    checkboxClass: 'icheckbox_minimal-blue',
                    radioClass: 'iradio_minimal-blue'
                });
            }).fail(function (err) {
                console.log(err);
            });

            //加载group
            $.get(ACTION_MAP.getAllGroup, function (data) {
                $(target + ' .box .group-item').remove();
                data = JSON.parse(data);
                $.each(data, function (index, d) {
                    $('#modal_sharedwith .box .group-nav').after(
                            '<tr class="group-item">\
							<td><img src="' + d.image + '" class="img-circle img-bordered-sm" style="width: 45px; height: 45px;">\
								' + d.name + '\
							</td>\
							<td style="vertical-align: middle;">\
								' + d.member_count + '\
							</td>\
							<td style="vertical-align: middle; width: 15px;"><input type="checkbox" name="c1" class="minimal" value="' + d.id + '"></td>\
						</tr>'
                            );
                });
                //加载Icheck
                $(target + ' .group-item input[type="checkbox"].minimal').iCheck({
                    labelHover: true,
                    checkboxClass: 'icheckbox_minimal-blue',
                    radioClass: 'iradio_minimal-blue'
                });
            }).fail(function (err) {
                console.log(err);
            });
        }
    });

    //获取上级窗口id
    $('#modal_sharedwith').on('show.bs.modal', function (e) {
        console.log(e.relatedTarget);
        var trigger_id = $(e.relatedTarget).closest('.modal').attr('id');
        if ($("#newpost_beta").attr("data-role") == "2")
        {
            $("#sharedPost_name").text("群组可见");
        } else
        {
            $("#sharedPost_name").text("选择分享范围");
        }
        $('#modal_sharedwith .submit').attr("target", trigger_id);
    });

    $(target + ' .submit').on('click', function (e) {
        var trigger = $(target + ' .submit').attr('target');
        //$('#' + trigger + ' #sharedwith_span').attr('data-sharedwith', '1');
        if ($(target + ' [type="radio"]:checked').val() == 1) {
            console.log(11);
            $('#' + trigger + ' #sharedwith_span').attr('data-sharedwith', '1');
        } else if ($(target + ' [type="radio"]:checked').val() == 2) {
            var ids = [];
            $('#' + trigger + ' #sharedwith_span').empty();
            $.each($("input[name='c1']:checked"), function () {
                ids.push($(this).val());
                $('#' + trigger + ' #sharedwith_span').append('<a class="btn btn-primary btn-xs" style="margin-right: 5px;">' + $(this).closest('tr').find('td:eq(0)').text() + '</a>');
            });
            if (ids.length === 0)
            {
                $('#' + trigger + ' #sharedwith_span').attr('data-sharedwith', '2');
            } else
            {
                $('#' + trigger + ' #sharedwith_span').attr('data-sharedwith', ids);
            }

        } else {
            console.log('err');
        }
        $(target).modal('hide');
    });

};

var goBackPageInfo = function (item)
{
    window.history.back();
};

var showPostInfo = function (id)
{
    //var id=$(item).attr("data-id");
    $.get(ACTION_MAP.getMomentByID, {moment_id: id}, function (data) {
        data = JSON.parse(data);
        var content = '<div class="col-md-8" style="margin-left:12%"><div class="box box-widget">';
        content += '<div class="box-header with-border">'
                + '<div class="user-block">'
                + '<img class="img-circle" src="../../../' + data.gimage + '" alt="User Image" onclick="showUserDetailInfo(this)" data-id="' + data.id + '">'
                + '<span class="username"><a href="javascript:void(0);" onclick="showUserDetailInfo(this)" data-id="' + data.id + '" >' + data.gname + '</a><small><i class="fa fa-chevron-right"></i>';

        $.each(data.genre, function (index, cate) {
            content += '<a href="javascript:void(0);" onclick="goSearchPage(this)" data-option="2" data-query="' + cate + '" data-id="' + cate + '" style="color:#00a65a">' + cate + '&nbsp;&nbsp;</a>';
        });
        content += '</small></span><span class="description">' + getDateTime_Trans(data.datetime) + '</span>'
                + '<span class="username" style="margin-left:0px;margin-top:20px;"><a href="javascript:void(0);" onclick="showPostInfo(this)" data-id="' + data.id + '">' + data.title + '</a></span>'
                + '</div>'
                + '<div class="box-tools">';
        if (data.isAdmin === 1)
        {
            content += '<button type="button" class="btn btn-box-tool" onclick="editPostInfo(this);" data-id="' + data.id + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>';
            content += '<button type="button" class="btn btn-box-tool" onclick="deletePostInfo(this);" data-id="' + data.id + '"><i class="fa fa-trash" aria-hidden="true"></i></button>';
        }
        content += '<button type="button" class="btn btn-box-tool" onclick="goBackPageInfo(this)" data-id="' + data.id + '"><i class="fa fa-close" aria-hidden="true"></i></button>'
                + '</div>'
                + '</div>';

        content += '<div class="box-body">'
                + data.content
                + '<div class="box-nav-bottom">'
                + ' <a class="box-footer-item" data-toggle="collapse" href="#collapse-review-' + data.id + '"><span class="fa fa-comment"></span>  <i class="data"></i><i class="data" id="comment_size_' + data.id + '"> ' + $(data.comments).length + '</i></a>\
									<a class="box-footer-item" data-toggle="collapse" href="#collapse-tag-' + data.id + '"><span class="fa fa-tag"></span> <i class="data">' + $(data.tags).length + '</i></a>\
									<a href="javascript:void(0)" onclick="doPostLike(this);" class="moment-like box-footer-item" data-id="' + data.id + '" data-like="' + data.like + '"><span class="fa ' + (data.like == 0 ? "fa-thumbs-o-up" : "fa-thumbs-up") + '"></span> <i class="data" id="total_like_' + data.id + '">' + data.total_like + '</i></a>';
        if (data.userTags != null && data.userTags.length > 0)
        {
            content += '<a class="box-footer-item" data-toggle="collapse" href="#collapse-collection-' + data.id + '"><span class="fa fa-sticky-note"></span> <i class="data">' + $(data.userTags).length + '</i></a>';
        } else
        {
            content += '<a href="javascript:void(0)" onclick="doPostStar(this);" class="moment-star box-footer-item" data-id="' + data.id + '" data-star="' + data.star + '"><span class="fa ' + (data.star == 0 ? "fa-star-o" : "fa-star") + '"></span></a>';
        }

        content += '</div><div id="collapse-tag-' + data.id + '" class="collapse in box-footer"></div>';
        if (data.userTags != null && data.userTags.length > 0)
        {
            content += '<div id="collapse-collection-' + data.id + '" class="collapse in box-footer"></div>';
        }
        content += ' </div>';

        content += '<div class="box-footer box-comments collapse in"  id="collapse-review-' + data.id + '"><div style="max-height:400px;overflow-y:scroll;" id="collapse-review-beta-' + data.id + '">';

        $.each(data.comments, function (index, review) {
            var comment = '<div class="box-comment">'
                    + '<img class="img-circle img-sm" src="../../../' + review.user_img + '" alt="User Image">'
                    + '<div class="comment-text">'
                    + '<span class="username">' + review.user_name + '<span class="text-muted pull-right">' + getDateTime_Trans(review.datetime) + '</span></span>'
                    + review.content
                    + '</div>'
                    + '</div>';
            $('#collapse-review-beta-' + data.id).prepend(comment);
        });

        content += '</div></div>';
        $(".post_content_page").html(content);
        appendWysiwygEditor(data.id, '#collapse-review-' + data.id, '');

        $.each(data.comments, function (index, review) {
            $('#collapse-review-' + data.id).prepend(momentReviewBlockStyle(review, data.id));
        });

        $.each(data.tags, function (index, tag) {
            $('#collapse-tag-' + data.id).append('<span class="moment-tag" style="margin-right: 5px;"><a href="javascript:void(0);"  data-option="3" onclick="goSearchPage(this)" data-query="' + tag + '" data-genre="' + tag + '" class="btn btn-primary btn-xs"><i class="fa fa-tag">&nbsp;' + tag + '</i></a></span>');
        });

        $.each(data.userTags, function (index, tag) {
            $('#collapse-collection-' + data.id).append('<span class="moment-tag" style="margin-right: 5px;"><a href="javascript:void(0);" onclick="modifyNoteTag(this)" data=\''+JSON.stringify(data.userTags)+'\' data-id="'+id+'" data-option="3"  data-query="' + tag + '" data-genre="' + tag + '" class="btn btn-primary btn-xs  btn-danger" ><i class="fa fa-sticky-note">&nbsp;' + tag + '</i></a></span>');
        });


        $(".post_content_page").fadeIn(1000);

    });

};

var showGroupTemplate = function (item)
{
    window.location.href = "group_info.jsp?gid=" + $(item).attr("data-id");

};

var showSingePostInfo = function (item)
{
    window.location.href = "post_info.jsp?pid=" + $(item).attr("data-id");

};

var userBlockStyle = function (data) {
    if (data.type === '1')
        return '<div class="col-md-3">\
							<div class="user-box">\
								<div class="user-box-img">\
									<img class="img-circle" src="' + data.img + '" alt="User Avatar">\
								</div>\
								<div class="name">\
									' + data.name + '\
								</div>\
								<div class="title">\
									' + data.title + '\
								</div>\
								<div class="follow">\
									<a href="javascript:void(0);" data-type="follow" data-id="' + data.id + '" data-follow="' + data.followed + '"><i class="fa fa-plus"></i> 关注</a>\
								</div>\
							</div>\
						</div>';
    else
        return '<div class="col-md-3">\
						<div class="group-box">\
							<div class="group-box-img" style="background: url(\'' + data.bg_image + '\') center center;">\
								<img class="img-circle img-bordered-sm" src="' + data.img + '">\
							</div>\
							<div class="name">\
								' + data.name + '\
							</div>\
							<div class="member-count">\
								' + data.member_count + '\
							</div>\
							<div class="genre">\
							' + data.genre + '\
							</div>\
							<div class="follow">\
								<a href="javascript:void(0);" data-type="follow" data-id="' + data.id + '" data-follow="' + data.followed + '"><i class="fa fa-plus"></i> 关注</a>\
							</div>\
						</div>\
					</div>';
};

var replyToUser = function (item)
{
    var id = $(item).attr('data-pid');
    var replyto_id = $(item).attr('data-id');
    var replyto_name = $(item).attr('data-name');
    console.log(id, replyto_id, replyto_name);
    $(".reply_to_class").remove();
    $('#collapse-review-' + id + ' #editor-' + id + ' [data-action="reply-to"]').remove();
    $('#collapse-review-' + id + ' #editor-' + id + ' br:eq(0)').remove();
    $('#collapse-review-' + id + ' #editor-' + id + ' hr:eq(0)').remove();
    $('<div style="background: white;border: 1px solid rgb(204, 204, 204);border-bottom:none;" class="reply_to_class" data-action="reply-to" data-id="' + replyto_id + '" id="reply_info_' + id + '">@ ' + replyto_name + ' </div>').insertBefore($("#editor-" + id));

};

var cancelReply = function (item)
{
    var id = $(item).attr('data-id');
    $(".reply_to_class").remove();
    $('#editor-' + id).empty();
};

var doPostLike = function (item)
{
    var val = parseInt($(item).attr('data-like'));
    var temp = $(item);
    var pid = $(item).attr('data-id');
    var number = parseInt($("#total_like_" + pid).text());
    $.get(ACTION_MAP.likeMoment, {moment_id: $(item).attr('data-id'), like: val}, function (data) {
        temp.find('span').toggleClass('fa-thumbs-o-up').toggleClass('fa-thumbs-up');

        if (val === 1) // dislike
        {
            temp.attr('data-like', 0);
            $("#total_like_" + pid).text(number - 1);
        } else
        {
            temp.attr('data-like', 1);
            $("#total_like_" + pid).text(number + 1);
        }
    })
            .fail(function () {
                console.log('Err: like');
            });
};



var doPostStar = function (item)
{
    var temp = $(item);
    var val = parseInt($(item).attr('data-star'));
    if (val === 1)
    {
        alert("你已经收藏了此动态，请勿重复收藏");
    } else
    {
        $("#modal_tagNote").modal("show");

        $("#collection-tags").select2({
            language: 'zh-CN',
            data: "",
            tags: true
        });
    }
    $(".doNoteSumbit").on('click', function (e) {
        
            
            var tags = JSON.stringify($("#collection-tags").val());
            $.get(ACTION_MAP.starMoment, {moment_id: $(item).attr('data-id'), tags: tags}, function (data) {
                if (data !== "-1")
                {
                    temp.find('span').toggleClass('fa-star-o').toggleClass('fa-star');
                    temp.attr('data-star', 1);
                    $("#modal_tagNote").modal("hide");
                } else
                {
                    alert("收藏失败，请重试");
                }
            });
        

    });

};


var replyToPost = function (item)
{
    var id = $(item).attr('value');
    var reply = {};
    reply['id'] = id;
    reply['replyto_id'] = $('#reply_info_' + id).attr('data-id');
    if (reply.replyto_id === undefined || reply.replyto_id === "" || reply.replyto_id === null)
    {
        reply.replyto_id === "";
        reply['type'] = 1;
    } else
    {
        reply['type'] = 2;
    }
    reply['content'] = $('#editor-' + id).html();
    //console.log(reply);
    $.post(ACTION_MAP.postReplyToMoment, reply, function (data) {
        //console.log(data);
        //loadMoment(data, '#allMoments');
        //location.reload();
        $(".reply_to_class").remove();
        $('#editor-' + id).empty();
        if (data === "-1")
        {
            alert("发表评论失败，请重新尝试");
        } else
        {
            data = JSON.parse(data);
            $('#collapse-review-' + id).prepend(momentReviewBlockStyle(data, id));
            var number = parseInt($("#comment_size_" + id).text());
            $("#comment_size_" + id).text(number + 1);
        }

    });
};

var modifyNoteTag = function (item)
{
    var tags = JSON.parse($(item).attr("data"));
    $("#modal_tagNote").modal("show");
    $("#collection-tags").select2({
        language: 'zh-CN',
        data: tags,
        tags: true
    });
    
     $('#collection-tags').select2({tags: true}).val(tags).trigger('change');

    $(".doNoteSumbit").on('click', function (e) {
        var tags = JSON.stringify($("#collection-tags").val());
        $.get(ACTION_MAP.starMoment_Modify, {pid: $(item).attr('data-id'), tags: tags}, function (data) {
            if (data !== "-1")
            {
                $("#modal_tagNote").modal("hide");
                location.reload();
            } else
            {
                alert("修改失败，请重试");
            }
        });
    });

};

var loadMoment = function (data, loadto) {

    if (data === null || data.length === 0 || data === "-1")
    {
        return false;
    }
    data = JSON.parse(data);
    data = data.reverse();
    $(loadto).empty();
    if ($("#post_main_page").attr("type") === "home"&&isPostIcon)
    {
        $(loadto).append(momentBlockStyle_Blank());
    }
    
    $.each(data, function (index, moment) {
        //加载动态
        $(loadto).append(momentBlockStyle(moment));
        appendSimpleWysiwygEditor(moment.id, loadto + ' #collapse-review-' + moment.id, '');
       
        $.each(moment.comments, function (index, review) {
            $('#collapse-review-beta-' + moment.id).prepend(momentReviewBlockStyle(review, moment.id));
        });

        $.each(moment.tags, function (index, tag) {
            $('#collapse-tag-' + moment.id).append('<span class="moment-tag" style="margin-right: 5px;"><a href="javascript:void(0);"  data-option="3" onclick="goSearchPage(this)" data-query="' + tag + '" data-genre="' + tag + '" class="btn btn-primary btn-xs "><i class="fa fa-tag">&nbsp;' + tag + '</i></a></span>');
        });

        $.each(moment.userTags, function (index, tag) {
            $('#collapse-collection-' + moment.id).append('<span class="moment-tag" style="margin-right: 5px;"><a href="javascript:void(0);"  onclick="modifyNoteTag(this)" data=\''+JSON.stringify(moment.userTags)+'\' data-id="'+moment.id+'" data-option="3"  data-query="' + tag + '" data-genre="' + tag + '" class="btn btn-primary btn-xs  btn-danger"><i class="fa fa-sticky-note">&nbsp;' + tag + '</i></a></span>');
        });
    });




    //加载用户信息popover
    $(loadto + " [data-toggle='popover']").popover();


};

//用户跳转

var loadUserTemplateInfo = function (data, color) {
    var data_gid = data.gid;
    var target = ".group_info_template";
    $(target + ' [data-type="bg"]').css({'background': 'url("../../../' + data.bg_image + '") center center'});

    $(target + ' [data-type="img"]').attr({'src': "../../../" + data.imageProfile});
    $(target + ' [data-type="name"]').html('<b>' + data.name + '</b>');
    $(target + ' [data-type="introduction"]').text(data.introduction);
    $(".user-box-footer").css("background", color);
    //此处应完善
    //修改20170317 #8
    //修改内容： 修改个人信息
    $(target + ' .infoList').empty();
    if (data.isFollowed === 0)// unfollow and not friend
    {
        $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation"  style="margin-right:8px;" onclick="doFollowingOpeartions(this)" data-action="follow" data-id="' + data.gid + '" ><i class="fa fa-plus"></i><b>关注</b></a>');
        if (data.role === 6)
        {
            $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation" style="margin-right:8px;" onclick="doFollowingOpeartions(this)" data-action="joinfriend_operation" data-id="' + data.gid + '" ><i class="fa fa-plus"></i><b>加为好友</b></a>');
        } else
        {
            $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation" style="margin-right:8px;" onclick="doFollowingOpeartions(this)" data-action="joingroup_operation" data-id="' + data.gid + '" ><i class="fa fa-plus"></i><b>申请加入</b></a>');
        }
    } else if (data.isFollowed === 1)// follow and not friend
    {
        $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation" style="margin-right:8px;" onclick="doFollowingOpeartions(this)" data-action="dismissfollow" data-id="' + data.gid + '" ><i class="fa fa-minus"></i><b>取消关注</b></a>');
        if (data.role === 6)
        {
            $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation" style="margin-right:8px;" onclick="doFollowingOpeartions(this)" data-action="joinfriend_operation" data-id="' + data.gid + '" ><i class="fa fa-plus"></i><b>加为好友</b></a>');
        } else
        {
            $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation" style="margin-right:8px;" onclick="doFollowingOpeartions(this)" data-action="joingroup_operation" data-id="' + data.gid + '" ><i class="fa fa-plus"></i><b>申请加入</b></a>');
        }
    } else if (data.isFollowed === 2)// unfollow and  friend
    {
        $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation" style="margin-right:8px;" onclick="doFollowingOpeartions(this)" data-action="follow" data-id="' + data.gid + '" ><i class="fa fa-plus"></i><b>关注</b></a>');
        if (data.role === 6)
        {
            $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation"  style="margin-right:8px;" onclick="doFollowingOpeartions(this)" data-action="dismissfriend_operation" data-id="' + data.gid + '" ><i class="fa fa-gear"></i><b>好友(解除好友)</b></a>');
        } else
        {
            $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation"  onclick="doFollowingOpeartions(this)" style="margin-right:8px;" data-action="dismissgroup_operation" data-id="' + data.gid + '" ><i class="fa fa-gear"></i><b>已加入(退出)</b></a>');
        }
    } else if (data.isFollowed === 3)// follow and  friend
    {
        $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation" style="margin-right:8px;" onclick="doFollowingOpeartions(this)" data-action="dismissfollow" data-id="' + data.gid + '" ><i class="fa fa-minus"></i><b>取消关注</b></a>');
        if (data.role === 6)
        {
            $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation"  style="margin-right:8px;" data-action="dismissfriend_operation" onclick="doFollowingOpeartions(this)" data-id="' + data.gid + '" ><i class="fa fa-gear"></i><b>好友(解除好友)</b></a>');
        } else
        {
            if(data.isAdmin===1)
            {
                 $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation"  style="margin-right:8px;" data-action="none" data-id="' + data.gid + '" ><i class="fa fa-gear"></i><b>管理员</b></a>');
            }
            else
            {
                 $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation"  style="margin-right:8px;" onclick="doFollowingOpeartions(this)" data-action="dismissgroup_operation" data-id="' + data.gid + '" ><i class="fa fa-gear"></i><b>已加入(退出)</b></a>');
            }
           
        }
    } else if (data.isFollowed === 4)// user self
    {
        $(target + ' .infoList').append('<a href="#" class="btn btn-primary btn-xs following_operation_modify" data-action="modifyprofile" style="margin-right:8px;" data-id="' + data.gid + '" ><i class="fa fa-gear"></i><b>修改个人信息</b></a>');

    } else if (data.isFollowed === 5)// use  in group
    {
        $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation" style="margin-right:8px;" onclick="doFollowingOpeartions(this)" data-action="dismissfollow" data-id="' + data.gid + '" ><i class="fa fa-minus"></i><b>取消关注</b></a>');
        if (data.role === 6)
        {
            $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation"  style="margin-right:8px;" onclick="doFollowingOpeartions(this)" data-action="dismissfriend_operation" data-id="' + data.gid + '" ><i class="fa fa-gear"></i><b>好友(解除好友)</b></a>');
        } else
        {
            if(data.isAdmin===1)
            {
                 $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation"  style="margin-right:8px;" data-action="none" data-id="' + data.gid + '" ><i class="fa fa-gear"></i><b>管理员</b></a>');
            }
            else
            {
                 $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation"  style="margin-right:8px;" onclick="doFollowingOpeartions(this)" data-action="dismissgroup_operation" data-id="' + data.gid + '" ><i class="fa fa-gear"></i><b>已加入(退出)</b></a>');
            }
        }
    } else if (data.isFollowed === 6)// user not in the group
    {
        $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation" style="margin-right:8px;" onclick="doFollowingOpeartions(this)" data-action="follow" data-id="' + data.gid + '" ><i class="fa fa-plus"></i><b>关注</b></a>');
        if (data.role === 6)
        {
            $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation"  style="margin-right:8px;" data-action="dismissfriend_operation" data-id="' + data.gid + '" ><i class="fa fa-gear"></i><b>好友(解除好友)</b></a>');
        } else
        {
            $(target + ' .infoList').append('<a href="javascript:void(0);" class="btn btn-primary btn-xs following_operation"  style="margin-right:8px;" data-action="dismissgroup_opeartion" data-id="' + data.gid + '" ><i class="fa fa-gear"></i><b>已加入(退出)</b></a>');
        }
    }

    if (data.isAdmin === 1 && data.role !== 6)
    {
        $(target + ' .infoList').append('<a href="#" class="btn btn-primary btn-xs following_operation_modify" data-action="modifyprofile" style="margin-right:8px;" data-id="' + data.gid + '" ><i class="fa fa-gear"></i><b>修改群组信息</b></a>');
    }

    // modify group and user profile
    if (data.isFollowed === 4 || data.isAdmin === 1)
    {
        $('.following_operation_modify').on('click', function () {
            //加载图片模块
            $('.post-file :file').on('change', function () {
                var input = $(this),
                        numFiles = input.get(0).files ? input.get(0).files.length : 1,
                        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
                input.trigger('fileselect', [numFiles, label]);
            });

            $('.post-file :file').on('fileselect', function (event, numFiles, label) {
                var input = $(this).parents('.input-group').find(':text'),
                        log = numFiles > 1 ? numFiles + ' files selected' : label;

                if (input.length) {
                    input.val(log);
                } else {
                    if (log)
                        alert(log);
                }
            });
            $(function () {
                $(".post-file :file").change(function () {
                    if (this.files && this.files[0]) {
                        var reader = new FileReader();
                        reader.onload = imageIsLoaded;
                        reader.readAsDataURL(this.files[0]);
                    }
                });
            });
            function imageIsLoaded(e) {
                $('#avatarImg').attr('src', e.target.result);
                $('#avatarImg').removeClass("hide");
            }
            ;

            $('.post-file1 :file').on('change', function () {
                var input = $(this),
                        numFiles = input.get(0).files ? input.get(0).files.length : 1,
                        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
                input.trigger('fileselect', [numFiles, label]);
            });

            $('.post-file1 :file').on('fileselect', function (event, numFiles, label) {
                var input = $(this).parents('.input-group').find(':text'),
                        log = numFiles > 1 ? numFiles + ' files selected' : label;

                if (input.length) {
                    input.val(log);
                } else {
                    if (log)
                        alert(log);
                }
            });
            $(function () {
                $(".post-file1 :file").change(function () {
                    if (this.files && this.files[0]) {
                        var reader = new FileReader();
                        reader.onload = imageIsLoaded1;
                        reader.readAsDataURL(this.files[0]);
                    }
                });
            });
            function imageIsLoaded1(e) {
                $('#avatarImg-bg').attr('src', e.target.result);
                $('#avatarImg-bg').removeClass("hide");
            }
            ;

            //加载genre和tag选项

            $.get('../../HandleGetGroupMessage?option=0', function (data1) {
                data1 = JSON.parse(data1);
                $('#modify-genres').select2({
                    data: data1.category_list
                });
                $('#modify-tags').select2({
                    data: data1.tags_list
                });
                if (data.role === 6)
                {
                    $('#modify-titles').select2({
                        data: data1.titles_list
                    });
                }
                //加载旧信息
                $('#modal_modifyprofile [name="name"]').val(data.name);
                $('#modal_modifyprofile [id="avatarImg"]').attr('src', "../../../" + data.imageProfile);
                $('#modal_modifyprofile [id="avatarImg-bg"]').attr('src', "../../../" + data.bg_image);
                $('#modal_modifyprofile [name="introduction"]').text(data.introduction);
                if (data.role !== 6)
                {
                    $(".user-title-1").hide();
                } else
                {
                    $(".user-title-1").show();
                    $('#modify-titles').select2({tags: true}).val(data.titles).trigger('change');
                }
                $('#modify-genres').select2({tags: true}).val(data.category).trigger('change');
                $('#modify-tags').select2({tags: true}).val(data.tags).trigger('change');
                $('#modal_modifyprofile').modal('show');
            });




            $('#modal_modifyprofile .submit').on('click', function (e) {
                var titles = "";
                if (data.role === 6)
                {
                    titles = JSON.stringify($('#modify-titles').val());
                }

                var sdata = {isGroup: data.role, gid: data_gid, image: $("#avatarImg").attr("src"), bg_image: $("#avatarImg-bg").attr("src"),
                    titles: titles, category: JSON.stringify($('#modify-genres').val()), tags: JSON.stringify($('#modify-tags').val()), introduction: $('#modal_modifyprofile [name="introduction"]').val()};

                $.post(ACTION_MAP.editProfile, sdata, function (result) {
                    if (result === "1")
                    {
                        alert('成功修改个人信息');
                        $('#modal_modifyprofile').modal('hide');
                        location.reload();
                    } else
                    {
                        alert('修改个人信息Fail');
                    }
                }).fail(function (e) {

                });
            });


        });
    }
    // follow or unfollow


    //此处应完善
    if (data.role === 6)
    {
        $(".user-title").show();
        $(target + ' [data-type="titles"]').empty();

        $.each(data.titles, function (index, title) {
            $(target + ' [data-type="titles"]').append('<a href="javascript:void(0);" onclick="goSearchPage(this);" data-action="follow" data-query="' + title + '" data-option="1"  data-title="' + title + '" class="label ' + randomPicker(colors) + '" style="margin-left: 3px;">' + title + '</a>');
        });
    } else
    {
        $(".user-title").hide();
    }

    $(target + ' [data-type="topic-genres"]').empty();

    $.each(data.category, function (index, genre) {
        $(target + ' [data-type="topic-genres"]').append('<a href="javascript:void(0);" onclick="goSearchPage(this);" data-action="follow" data-query="' + genre + '" data-option="2" data-genre="' + genre + '" class="label ' + randomPicker(colors) + '" style="margin-left: 3px;">' + genre + '</a>');
    });
    //此处应完善
    $(target + ' [data-type="topic-tags"]').empty();
    $.each(data.tags, function (index, tag) {
        $(target + ' [data-type="topic-tags"]').append('<a href="javascript:void(0);"  onclick="goSearchPage(this);" data-action="follow"  data-query="' + tag + '" data-option="3" data-tag="' + tag + '" class="label ' + randomPicker(colors) + '" style="margin-left: 3px;">' + tag + '</a>');
    });


    //修改20170317 #8结束
    $(target + ' [data-type="moment-count"]').text(' ' + data.post_count);
    if (data.isFollowed === 4)
    {
        $(".userType").show();
        $(".groupType").hide();
        $(".groupType_beta").hide();
        $(target + ' [data-type="following_friends_name"]').text('我的好友');
        $(target + ' [data-type="following_users_name"]').text('我关注的用户');
        $(target + ' [data-type="followed_users_name"]').text('关注我的用户');
        $(target + ' [data-type="following_groups_name"]').text('我关注的群组');
        $(target + ' [data-type="following_collections_name"]').text('我的收藏');
        $(target + ' [data-type="following_collections_count"]').text(' ' + data.collection_count);
        $(target + ' [data-type="following_friends_count"]').text(data.following_friends_count);
        $(target + ' [data-type="following_users_count"]').text(' ' + data.following_user_count);
        $(target + ' [data-type="following_groups_count"]').text(' ' + data.following_group_count);
        $(target + ' [data-type="followed_users_count"]').text(' ' + data.follower_count);

    } else
    {
        if (data.role === 6)
        {
            $(".userType").show();
            $(".groupType").hide();
            $(".groupType_beta").hide();
            $(".userType").show();
            $(".groupType").hide();
            $(target + ' [data-type="following_friends_name"]').text('它的好友');
            $(target + ' [data-type="following_users_name"]').text('它关注的用户');
            $(target + ' [data-type="followed_users_name"]').text('关注它的用户');
            $(target + ' [data-type="following_groups_name"]').text('它关注的群组');
            $(target + ' [data-type="following_collections_name"]').text('它的收藏');
            $(target + ' [data-type="following_collections_count"]').text(' ' + data.collection_count);
            $(target + ' [data-type="following_friends_count"]').text(data.following_friends_count);
            $(target + ' [data-type="following_users_count"]').text(' ' + data.following_user_count);
            $(target + ' [data-type="following_groups_count"]').text(' ' + data.following_group_count);
            $(target + ' [data-type="followed_users_count"]').text(' ' + data.follower_count);
        } else
        {
            $(".userType").hide();
            $(".groupType").show();
            if (data.isAdmin === 1)
            {
                $(".groupType_beta").show();
                $(target + ' [data-type="request_group_members_count"]').text(' ' + data.request_users_count);
            }
            $(target + ' [data-type="group_members_count"]').text(' ' + data.member_count);
            $(target + ' [data-type="followed_group_users_count"]').text(' ' + data.follower_count);
        }
    }

    //

    $("#post_info_content").empty();

    var isAdmin = data.isAdmin;
    $.get(ACTION_MAP.getMomentByUserID, {gid: data.gid}, function (data) {
        loadMoment(data, '.post_content_page');
    }).fail(function () {
        console.log("err");
    });
    $(target + ' .post_tab').unbind().on('click', function () {
        var gid = data.gid;
        $(".post_tab").css("color", "white");
        $(this).css("color", "red");
        console.log($(this).attr('data-type'));

        if ($(this).attr('data-type') === 'following_post') {
            $.get(ACTION_MAP.getMomentByUserID, {gid: data.gid}, function (data) {
                $(".post_content_page_1").hide();
                $(".post_content_page").show();
                loadMoment(data, '.post_content_page');
                // 
            }).fail(function () {
                console.log("err");
            });
        } else if ($(this).attr('data-type') === 'following_friends') {
            $.get(ACTION_MAP.getUserRelation, {filter: $(this).attr('data-type'), gid: gid}, function (data) {
                $(".post_content_page_1").show();
                $(".post_content_page").hide();
                loadFollowList(data, '.post_content_page_1');
            }).fail(function () {
                console.log("err");
            });
        } else if ($(this).attr('data-type') === 'following_users') {
            $.get(ACTION_MAP.getUserRelation, {filter: $(this).attr('data-type'), gid: gid}, function (data) {
                $(".post_content_page_1").show();
                $(".post_content_page").hide();
                loadFollowList(data, '.post_content_page_1');
            }).fail(function () {
                console.log("err");
            });
        } else if ($(this).attr('data-type') === 'followed_users') {
            $.get(ACTION_MAP.getUserRelation, {filter: $(this).attr('data-type'), gid: gid}, function (data) {
                $(".post_content_page_1").show();
                $(".post_content_page").hide();
                loadFollowList(data, '.post_content_page_1');
            }).fail(function () {
                console.log("err");
            });
        } else if ($(this).attr('data-type') === 'following_groups') {
            $.get(ACTION_MAP.getUserRelation, {filter: $(this).attr('data-type'), gid: gid}, function (data) {
                $(".post_content_page_1").show();
                $(".post_content_page").hide();
                loadFollowList(data, '.post_content_page_1');
            }).fail(function () {
                console.log("err");
            });
        } else if ($(this).attr('data-type') === 'request_groups') {
            $.get(ACTION_MAP.getUserRelation, {filter: $(this).attr('data-type'), gid: gid}, function (data) {
                $(".post_content_page_1").show();
                $(".post_content_page").hide();
                loadFollowListUserRequest(data, '.post_content_page_1', gid);

            }).fail(function () {
                console.log("err");
            });
        } else if ($(this).attr('data-type') === 'group_members') {
            $.get(ACTION_MAP.getUserRelation, {filter: $(this).attr('data-type'), gid: gid}, function (data) {
                $(".post_content_page_1").show();
                $(".post_content_page").hide();
                if (isAdmin === 1)
                {
                    $('.post_content_page_1').empty();
                    $('.post_content_page_1').append(addUserBlockStyleEmpty(gid));
                    loadFollowListAdmin(data, '.post_content_page_1', gid);
                } else
                {
                    loadFollowList(data, '.post_content_page_1');

                }

            }).fail(function () {
                console.log("err");
            });
        } else if ($(this).attr('data-type') === 'collection_posts') {
            $.get(ACTION_MAP.getRelatedMoment, {filter: $(this).attr('data-type')}, function (data) {
                $(".post_content_page_1").hide();
                $(".post_content_page").show();
                loadMoment(data, '.post_content_page');
            }).fail(function () {
                console.log("err");
            });
        }
        //$('#tab_customerhome #tab_2').empty();
        //alert(2);
    });
};

var loadUserInfo = function (data, target) {
    var data_gid = data.gid;
    $(target + ' [data-type="bg"]').css({'background': 'url("../../../' + data.bg_image + '") center center'});
    $(target + ' [data-type="img"]').attr({'src': "../../../" + data.imageProfile});
    $(target + ' [data-type="name"]').html('<b>' + data.name + '</b>');
    $(target + ' [data-type="introduction"]').text(data.introduction);
    $(".user-box-footer").css("background", randomColor());
    //此处应完善
    //修改20170317 #8
    //修改内容： 修改个人信息
    $(target + ' .infoList').empty();

    if (data.isAdmin === 1 && data.role !== 6)
    {
        $(target + ' .infoList').append('<a href="#" class="btn btn-primary btn-xs following_operation_modify" data-action="modifyprofile" style="margin-right:8px;" data-id="' + data.gid + '" ><i class="fa fa-gear"></i><b>修改群组信息</b></a>');
    }

    // modify group and user profile
    if (data.isFollowed === 4 || data.isAdmin === 1)
    {
        $('.following_operation_modify').on('click', function () {
            //加载图片模块
            $('.post-file :file').on('change', function () {
                var input = $(this),
                        numFiles = input.get(0).files ? input.get(0).files.length : 1,
                        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
                input.trigger('fileselect', [numFiles, label]);
            });

            $('.post-file :file').on('fileselect', function (event, numFiles, label) {
                var input = $(this).parents('.input-group').find(':text'),
                        log = numFiles > 1 ? numFiles + ' files selected' : label;

                if (input.length) {
                    input.val(log);
                } else {
                    if (log)
                        alert(log);
                }
            });
            $(function () {
                $(".post-file :file").change(function () {
                    if (this.files && this.files[0]) {
                        var reader = new FileReader();
                        reader.onload = imageIsLoaded;
                        reader.readAsDataURL(this.files[0]);
                    }
                });
            });
            function imageIsLoaded(e) {
                $('#avatarImg').attr('src', e.target.result);
                $('#avatarImg').removeClass("hide");
            }
            ;

            $('.post-file1 :file').on('change', function () {
                var input = $(this),
                        numFiles = input.get(0).files ? input.get(0).files.length : 1,
                        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
                input.trigger('fileselect', [numFiles, label]);
            });

            $('.post-file1 :file').on('fileselect', function (event, numFiles, label) {
                var input = $(this).parents('.input-group').find(':text'),
                        log = numFiles > 1 ? numFiles + ' files selected' : label;

                if (input.length) {
                    input.val(log);
                } else {
                    if (log)
                        alert(log);
                }
            });
            $(function () {
                $(".post-file1 :file").change(function () {
                    if (this.files && this.files[0]) {
                        var reader = new FileReader();
                        reader.onload = imageIsLoaded1;
                        reader.readAsDataURL(this.files[0]);
                    }
                });
            });
            function imageIsLoaded1(e) {
                $('#avatarImg-bg').attr('src', e.target.result);
                $('#avatarImg-bg').removeClass("hide");
            }
            ;

            //加载genre和tag选项

            $.get('../../HandleGetGroupMessage?option=0', function (data1) {
                data1 = JSON.parse(data1);
                $('#modify-genres').select2({
                    data: data1.category_list
                });
                $('#modify-tags').select2({
                    data: data1.tags_list
                });
                if (data.role === 6)
                {
                    $('#modify-titles').select2({
                        data: data1.titles_list
                    });
                }
                //加载旧信息
                $('#modal_modifyprofile [name="name"]').val(data.name);
                $('#modal_modifyprofile [id="avatarImg"]').attr('src', "../../../" + data.imageProfile);
                $('#modal_modifyprofile [id="avatarImg-bg"]').attr('src', "../../../" + data.bg_image);
                $('#modal_modifyprofile [name="introduction"]').text(data.introduction);
                if (data.role !== 6)
                {
                    $(".user-title-1").hide();
                } else
                {
                    $(".user-title-1").show();
                    $('#modify-titles').select2({tags: true}).val(data.titles).trigger('change');
                }
                $('#modify-genres').select2({tags: true}).val(data.category).trigger('change');
                $('#modify-tags').select2({tags: true}).val(data.tags).trigger('change');
                $('#modal_modifyprofile').modal('show');
            });




            $('#modal_modifyprofile .submit').on('click', function (e) {
                var titles = "";
                if (data.role === 6)
                {
                    titles = JSON.stringify($('#modify-titles').val());
                }

                var sdata = {isGroup: data.role, gid: data_gid, image: $("#avatarImg").attr("src"), bg_image: $("#avatarImg-bg").attr("src"),
                    titles: titles, category: JSON.stringify($('#modify-genres').val()), tags: JSON.stringify($('#modify-tags').val()), introduction: $('#modal_modifyprofile [name="introduction"]').val()};

                $.post(ACTION_MAP.editProfile, sdata, function (result) {
                    if (result === "1")
                    {
                        alert('成功修改个人信息');
                        $('#modal_modifyprofile').modal('hide');
                        location.reload();
                    } else
                    {
                        alert('修改个人信息Fail');
                    }
                }).fail(function (e) {

                });
            });


        });
    }
    // follow or unfollow


    //此处应完善
    if (data.role === 6)
    {
        $(".user-title").show();
        $(target + ' [data-type="titles"]').empty();

        $.each(data.titles, function (index, title) {
            $(target + ' [data-type="titles"]').append('<a href="javascript:void(0);"  onclick="goSearchPage(this);" data-query="' + title + '" data-option="1" data-action="follow"  data-title="' + title + '" class="label ' + randomPicker(colors) + '" style="margin-left: 3px;">' + title + '</a>');
        });
    } else
    {
        $(".user-title").hide();
    }

    $(target + ' [data-type="topic-genres"]').empty();

    $.each(data.category, function (index, genre) {
        $(target + ' [data-type="topic-genres"]').append('<a href="javascript:void(0);" onclick="goSearchPage(this);" data-query="' + genre + '" data-option="2" data-action="follow" data-genre="' + genre + '" class="label ' + randomPicker(colors) + '" style="margin-left: 3px;">' + genre + '</a>');
    });
    //此处应完善
    $(target + ' [data-type="topic-tags"]').empty();
    $.each(data.tags, function (index, tag) {
        $(target + ' [data-type="topic-tags"]').append('<a href="javascript:void(0);" onclick="goSearchPage(this);" data-action="follow"  data-query="' + tag + '" data-option="3" data-tag="' + tag + '" class="label ' + randomPicker(colors) + '" style="margin-left: 3px;">' + tag + '</a>');
    });


    //修改20170317 #8结束
    $(target + ' [data-type="moment-count"]').text(' ' + data.post_count);
    $(target + ' [data-type="collection-count"]').text(' ' + data.collection_count);

    $("#post_info_content").empty();
    $.get(ACTION_MAP.getMomentByUserID, {gid: data.gid}, function (data) {
        loadMoment(data, '#post_info_content');
    }).fail(function () {
        console.log("err");
    });
    $(target + ' .post_tab').on('click', function () {
        var gid = data.gid;
        $(".post_tab").css("color", "white");
        $(this).css("color", "red");
        console.log($(this).attr('data-type'));

        //$("#post_info_content").css("background","black");
        if ($(this).attr('data-type') === 'following_post') {
            $.get(ACTION_MAP.getMomentByUserID, {gid: data.gid}, function (data) {
                $("#post_info_content").show();
                $("#post_info_content_1").hide();
                loadMoment(data, '#post_info_content');
                // 
            }).fail(function () {
                console.log("err");
            });
        } else if ($(this).attr('data-type') === 'following_friends') {
            $.get(ACTION_MAP.getUserRelation, {filter: $(this).attr('data-type'), gid: gid}, function (data) {
                $("#post_info_content").hide();
                $("#post_info_content_1").show();
                loadFollowList(data, '#post_info_content_1');
            }).fail(function () {
                console.log("err");
            });
        } else if ($(this).attr('data-type') === 'following_users') {
            $.get(ACTION_MAP.getUserRelation, {filter: $(this).attr('data-type'), gid: gid}, function (data) {
                $("#post_info_content").hide();
                $("#post_info_content_1").show();
                loadFollowList(data, '#post_info_content_1');
            }).fail(function () {
                console.log("err");
            });
        } else if ($(this).attr('data-type') === 'followed_users') {
            $.get(ACTION_MAP.getUserRelation, {filter: $(this).attr('data-type'), gid: gid}, function (data) {
                $("#post_info_content").hide();
                $("#post_info_content_1").show();
                loadFollowList(data, '#post_info_content_1');
            }).fail(function () {
                console.log("err");
            });
        } else if ($(this).attr('data-type') === 'following_groups') {
            $.get(ACTION_MAP.getUserRelation, {filter: $(this).attr('data-type'), gid: gid}, function (data) {
                $("#post_info_content").hide();
                $("#post_info_content_1").show();
                loadFollowList(data, '#post_info_content_1');
            }).fail(function () {
                console.log("err");
            });
        } else if ($(this).attr('data-type') === 'group_members') {
            $.get(ACTION_MAP.getUserRelation, {filter: $(this).attr('data-type'), gid: gid}, function (data) {
                $("#post_info_content").hide();
                $("#post_info_content_1").show();
                loadFollowList(data, '#post_info_content_1');
            }).fail(function () {
                console.log("err");
            });
        } else if ($(this).attr('data-type') === 'collection_posts') {
            $.get(ACTION_MAP.getRelatedMoment, {filter: $(this).attr('data-type')}, function (data) {
                $("#post_info_content").show();
                $("#post_info_content_1").hide();
                loadMoment(data, '#post_info_content');
            }).fail(function () {
                console.log("err");
            });
        }
        //$('#tab_customerhome #tab_2').empty();
        //alert(2);
    });
};

var loadFollowList = function (data, target) {
    $(target).empty();
    if (data === "-1" || data.length === 0)
    {
        return false;
    }
    data = JSON.parse(data);
    $.each(data, function (index, user) {
        $(target).append(groupBlockStyle(user));
    });
};

var loadFollowListUserRequest = function (data, target, gid) {
    $(target).empty();
    if (data === "-1" || data.length === 0)
    {
        return false;
    }
    data = JSON.parse(data);
    $.each(data, function (index, user) {
        $(target).append(groupBlockStyleRequest(user, gid));
    });
};

var loadFollowListAdmin = function (data, target, gid) {
    if (data === "-1" || data.length === 0)
    {
        return false;
    }
    data = JSON.parse(data);
    $.each(data, function (index, user) {
        $(target).append(groupBlockStyleAdmin(user, gid));
    });
};

//加载editor
var appendWysiwygEditor = function (id, appendto, location) {
    var html = '<div class="btn-toolbar" data-role="editor-toolbar" data-target="#editor-' + id + '" id="editor_bar_' + id + '">\
								<div class="btn-group">\
								<a class="btn dropdown-toggle" data-toggle="dropdown" title="字体"><i class="icon-font"></i><b class="caret"></b></a>\
									<ul class="dropdown-menu">\
									</ul>\
								</div>\
								<div class="btn-group">\
								<a class="btn dropdown-toggle" data-toggle="dropdown" title="字体大小"><i class="icon-text-height"></i>&nbsp;<b class="caret"></b></a>\
									<ul class="dropdown-menu">\
									<li><a data-edit="fontSize 5"><font size="5">大</font></a></li>\
									<li><a data-edit="fontSize 3"><font size="3">中</font></a></li>\
									<li><a data-edit="fontSize 1"><font size="1">小</font></a></li>\
									</ul>\
								</div>\
								<div class="btn-group">\
								<a class="btn" data-edit="bold" title="加粗 (Ctrl/Cmd+B)"><i class="icon-bold"></i></a>\
								<a class="btn" data-edit="italic" title="斜体 (Ctrl/Cmd+I)"><i class="icon-italic"></i></a>\
								<a class="btn" data-edit="strikethrough" title="（加） 删除线"><i class="icon-strikethrough"></i></a>\
								<a class="btn" data-edit="underline" title="下划线 (Ctrl/Cmd+U)"><i class="icon-underline"></i></a>\
								</div>\
								<div class="btn-group">\
								<a class="btn" data-edit="insertunorderedlist" title="项目列表"><i class="icon-list-ul"></i></a>\
								<a class="btn" data-edit="insertorderedlist" title="数字列表"><i class="icon-list-ol"></i></a>\
								<a class="btn" data-edit="outdent" title="清除缩进 (Shift+Tab)"><i class="icon-indent-left"></i></a>\
								<a class="btn" data-edit="indent" title="缩进 (Tab)"><i class="icon-indent-right"></i></a>\
								</div>\
								<div class="btn-group">\
								<a class="btn" data-edit="justifyleft" title="居左 (Ctrl/Cmd+L)"><i class="icon-align-left"></i></a>\
								<a class="btn" data-edit="justifycenter" title="居中 (Ctrl/Cmd+E)"><i class="icon-align-center"></i></a>\
								<a class="btn" data-edit="justifyright" title="居右 (Ctrl/Cmd+R)"><i class="icon-align-right"></i></a>\
								<a class="btn" data-edit="justifyfull" title="正常 (Ctrl/Cmd+J)"><i class="icon-align-justify"></i></a>\
								</div>\
								<div class="btn-group">\
									<a class="btn dropdown-toggle" data-toggle="dropdown" title="超链接"><i class="icon-link"></i></a>\
									<div class="dropdown-menu input-append">\
										<input class="span2" placeholder="URL" type="text" data-edit="createLink"/>\
										<button class="btn" type="button">添加</button>\
								</div>\
								<a class="btn" data-edit="unlink" title="去除链接"><i class="icon-cut"></i></a>\
								</div>\
								<div class="btn-group">\
								<a class="btn" title="浏览或拖拽添加图片" id="pictureBtn' + id + '"><i class="icon-picture"></i></a>\
								<input type="file" data-role="magic-overlay" data-target="#pictureBtn' + id + '" data-edit="insertImage" />\
								</div>\
								<div class="btn-group">\
								<a class="btn" data-edit="undo" title="撤消 (Ctrl/Cmd+Z)"><i class="icon-undo"></i></a>\
								<a class="btn" data-edit="redo" title="重复 (Ctrl/Cmd+Y)"><i class="icon-repeat"></i></a>\
								</div>\
							</div>\
							<div id="editor-' + id + '" class="editor">\
							</div>\
							<div style="text-align: right; margin-top:5px;"><a href="javascript:void(0);" class="btn btn-primary btn-flat btn-xs cancelMoment-btn" data-id="' + id + '" style="margin-right:15px;" onclick="cancelReply(this);">取消</a> <a href="javascript:void(0);" class="btn btn-primary btn-flat btn-xs replyMoment-btn" value="' + id + '" onclick="replyToPost(this)">回复</a> </div>'

    if (location == 'pre')
        $(appendto).prepend(html);
    else
        $(appendto).append(html);

    loadWysiwyg('#editor-' + id + '');
};

var appendSimpleWysiwygEditor = function (id, appendto, location) {
    var html = '<div class="btn-toolbar" data-role="editor-toolbar" data-target="#editor-' + id + '" id="editor_bar_' + id + '">\
								<div class="btn-group">\
								<a class="btn dropdown-toggle" data-toggle="dropdown" title="字体"><i class="icon-font"></i><b class="caret"></b></a>\
									<ul class="dropdown-menu">\
									</ul>\
								</div>\
								<div class="btn-group">\
								<a class="btn" title="浏览或拖拽添加图片" id="pictureBtn' + id + '"><i class="icon-picture"></i></a>\
								<input type="file" data-role="magic-overlay" data-target="#pictureBtn' + id + '" data-edit="insertImage" />\
								</div>\
								<div class="btn-group">\
								<a class="btn" data-edit="undo" title="撤消 (Ctrl/Cmd+Z)"><i class="icon-undo"></i></a>\
								<a class="btn" data-edit="redo" title="重复 (Ctrl/Cmd+Y)"><i class="icon-repeat"></i></a>\
								</div>\
							</div>\
							<div id="editor-' + id + '" class="editor" style="min-height:80px;">\
							</div>\
							<div style="text-align: right; margin-top:5px;"><a href="javascript:void(0);" class="btn btn-primary btn-flat btn-xs cancelMoment-btn" data-id="' + id + '" style="margin-right:15px;" onclick="cancelReply(this);">取消</a> <a href="javascript:void(0);" class="btn btn-primary btn-flat btn-xs replyMoment-btn" value="' + id + '" onclick="replyToPost(this)">回复</a> </div>'

    if (location == 'pre')
        $(appendto).prepend(html);
    else
        $(appendto).append(html);

    loadWysiwyg('#editor-' + id + '');
};

//加载用户弹框
var appendUserPopup = function (data, appendto) {
    $(appendto).attr({
        'data-container': 'body',
        'data-trigger': 'hover',
        'data-toggle': 'popover',
        'data-placement': 'right',
        'data-html': 'true',
        'data-content': '<div class="box box-primary" style="width:200px;">\
										<div class="box-body box-profile">\
											<img class="profile-user-img img-responsive img-circle" src="' + data.user_img + '" alt="User profile picture">\
											<h3 class="profile-username text-center">' + data.user_name + '</h3>\
											<ul class="list-group list-group-unbordered">\
												<li class="list-group-item">\
													<b>动态</b> <a class="pull-right">' + data.user_blogs + '</a>\
												</li>\
												<li class="list-group-item">\
													<b>精华</b> <a class="pull-right">' + data.user_bestblogs + '</a>\
												</li>\
												<li class="list-group-item">\
													<b>关注者</b> <a class="pull-right">' + data.user_followers + '</a>\
												</li>\
											</ul>\
											<a href="#" class="btn btn-primary btn-block follow-btn" value="' + data.user_id + '"><b>关注</b></a>\
										</div>\
									</div>'
    });
};

var loadWysiwyg = function (target) {
    $(function () {
        function initToolbarBootstrapBindings() {
            var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
                'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
                'Times New Roman', 'Verdana', 'SimHei'],
                    fontTarget = $('[title=字体]').siblings('.dropdown-menu');
            $.each(fonts, function (idx, fontName) {
                fontTarget.append($('<li><a data-edit="fontName ' + fontName + '" style="font-family:\'' + fontName + '\'">' + fontName + '</a></li>'));
            });
            $('a[title]').tooltip({container: 'body'});
            $('.dropdown-menu input').click(function () {
                return false;
            })
                    .change(function () {
                        $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
                    })
                    .keydown('esc', function () {
                        this.value = '';
                        $(this).change();
                    });

            $('[data-role=magic-overlay]').each(function () {
                var overlay = $(this), target = $(overlay.data('target'));
                overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
            });
            /*
             if ("onwebkitspeechchange"  in document.createElement("input")) {
             var editorOffset = $('#editor').offset();
             $('#voiceBtn').css('position','absolute').offset({top: editorOffset.top, left: editorOffset.left+$('#editor').innerWidth()-35});
             } else {
             $('#voiceBtn').hide();
             }
             */
        }
        ;
        function showErrorAlert(reason, detail) {
            var msg = '';
            if (reason === 'unsupported-file-type') {
                msg = "Unsupported format " + detail;
            } else {
                console.log("error uploading file", reason, detail);
            }
            $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong>File upload error</strong> ' + msg + ' </div>').prependTo('#alerts');
        }
        ;
        initToolbarBootstrapBindings();
        $(target).wysiwyg({fileUploadError: showErrorAlert});
        window.prettyPrint && prettyPrint();
    });

    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'http://www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-37452180-6', 'github.io');
    ga('send', 'pageview');
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id))
            return;
        js = d.createElement(s);
        js.id = id;
        js.src = "http://connect.facebook.net/en_GB/all.js#xfbml=1";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    !function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = "http://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, "script", "twitter-wjs");
};

//辅助方法
var getDate_Trans = function (datetime) {
    datetime = datetime.split(" ");
    var eles = datetime[0].split("-");
    return eles[0] + "年" + eles[1] + "月" + eles[2] + "号";
};

var getDateTime_Trans = function (datetime) {
    datetime = datetime.split(" ");
    var eles = datetime[0].split("-");
    return eles[0] + "年" + eles[1] + "月" + eles[2] + "号 " + datetime[1];
};
var getTime_Trans = function (datetime) {
    datetime = datetime.split(" ");
    return datetime[1];
};

var colors = ['label-danger', 'label-success', 'label-info', 'label-warning', 'label-primary'];
var randomPicker = function (array) {
    var random = Math.floor(Math.random() * (array.length));
    return array[random];
};

var randomColor = function ()
{
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
};

function getCatesIns(ids)
{
    var result = [];
    for (var i = 0; i < ids.length; i++)
    {
        for (var j = 0; j < cates.length; j++)
        {
            if (ids[i] === cates[j].id)
            {
                result.push(cates[j].text);
            }
        }
    }
    return result;

}

function getTagsIns(ids)
{
    var result = [];
    for (var i = 0; i < ids.length; i++)
    {
        for (var j = 0; j < tags.length; j++)
        {
            if (ids[i] === tags[j].id)
            {
                result.push(tags[j].text);
            }
        }
    }
    return result;
}