//跳转到用户主页
const URL_RENDER_TO_USER = URLPrefix;
//获取单个动态
const URL_GET_POST = URLPrefix + '/post/operation/get-single-post/';
//点赞动态
const URL_LIKE_POST = URLPrefix + '/post/operation/post-like-action/';
//获取动态评论
const URL_LOAD_COMMENT = URLPrefix + '/post/operation/get-post-comments/';
//删除动态
const URL_DELETE_POST = URLPrefix + '/post/operation/delete-single-post/';
//分享动态
const URL_SHARE_POST = URLPrefix + '/post/operation/add-single-post/';

//获取用户当前友好tag list
const URL_GET_FRIEND_TAG = URLPrefix + '/user/operation/get-user-friend-tags/';

const URL_PUT_POST_AT_TOP = URLPrefix + '/post/operation/put-post-at-top/';

//挑战到用户界面
const URL_RENDER_TO_INDIVIDUAL = URLPrefix + '/user/self-page/';

const URL_MAKE_COMMENT = URLPrefix + '/post/operation/add-single-post-comment/';

const URL_ADD_USER_TO_FRIEND_TAG = URLPrefix + '/user/operation/add-users-to-friend-tag/';

const URL_CREATE_FRIEND_TAG = URLPrefix + '/user/operation/add-user-friend-tag/';

var LoadPostPage = function() {
    var obj = this;
    var target = $('#main-block .main-content');

    // 初始化
    this.initPost = function() {
        target.empty();
        target.append('<div class="col-lg-4" data-col></div>\n' +
            '<div class="col-lg-4" data-col></div>\n' +
            '<div class="col-lg-4" data-col></div>');
    };

    this.loadPost = function(list) {
        console.log(1);
        var listOfCol = [];
        var heightOfCOl = [];
        $.each(target.find('[data-col]'), function(index, item) {
            listOfCol.push($(item));
            heightOfCOl.push(0);
        });

        $.each(list, function(index, post) {
            var indexOfCol = findSmallestIndex(heightOfCOl);
            listOfCol[indexOfCol].append(Post(post));
            heightOfCOl[indexOfCol] = listOfCol[indexOfCol].height();
        });
    };

    // 加载动态
    this.ajaxInitPost = function(id, url) {
        loadingPageShow(true);
        $.ajax({
            url: url,
            data: {
                id: id,
                cursor: $("#main-block").attr("cursor")
            },
            type: "GET",
            dataType: 'json',
            success: function(post) {
                if (post === 0) {
                    console.log(post, '错误');
                    loadingPageShow(false);
                } else {
                    loadingPageShow(false);
                    obj.initPost();
                    obj.loadPost(post);
                    if (post !== null) {
                        $("#main-block").attr("size", post.length);
                        if (post.length > 0) {
                            $("#main-block").attr("cursor", post[post.length - 1].time);
                        }
                    }
                }
            },
            error: function(err) {
                console.log(err);
                loadingPageShow(false);
            }
        });
    };

    this.ajaxInitPost_More = function(id, url) {
        loadingPageShow(true);
        $.ajax({
            url: url,
            data: {
                id: id,
                cursor: $("#main-block").attr("cursor")
            },
            type: "GET",
            dataType: 'json',
            success: function(post) {
                if (post === 0) {
                    console.log(post, '错误');
                    loadingPageShow(false);
                } else {
                    loadingPageShow(false);
                    obj.loadPost(post);
                    if (post !== null) {
                        $("#main-block").attr("size", post.length);
                        if (post.length > 0) {
                            $("#main-block").attr("cursor",
                                post[post.length - 1].time);
                        }
                    }
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    };

    var findSmallestIndex = function(array) {
        if (!Array.isArray(array) || array.length == 0) {
            return -1;
        } else {
            var index = 0;
            var value = array[0];
            for (i = 1; i < array.length; i++) {
                if (array[i] < value) {
                    value = array[i];
                    index = i;
                }
            };
            return index;
        }
    };
};

var PostController = function() {

    var obj = this;
    var modal = $('<div class="modal fade">\n' +
        '	<div class="modal-dialog">\n' +
        '		<div class="modal-content">\n' +
        '			<div class="modal-header">\n' +
        '				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '				<h5 class="modal-title">\n' +
        '					<img data-name="image" style="width: 50px;height: 50px; padding: 2px; border: 2px solid #d2d6de;border-radius: 50%;"/>\n' +
        '					<b class="fa fa-caret-right" style="font-size: 16px; margin-left:5px;"></b>\n' +
        '					<a href="javascript:void(0);" data-action="sharedwith"><i class="fa fa-globe"></i></a>\n' +
        '					<span data-target="sharewith" data-value=""></span>\n' +
        '				</h5>\n' +
        '			</div>\n' +
        '			<div class="modal-body">\n' +
        '				<div class="form-group">\n' +
        '					<label>标题</label>\n' +
        '					<input name="title" class="form-control" placeholder="请输入标题">\n' +
        '				</div>\n' +
        '				<div class="editor-block" style="padding-bottom: 15px;"></div>\n' +
        '				<div class="form-group" data-name="allow-share-block">\n' +
        '						<label>允许被分享: </label>\n' +
        '						<label class="pull-right switch">\n' +
        '						<input name="allowshared" type="checkbox" checked>\n' +
        '							<div class="slider round"></div>\n' +
        '						</label>\n' +
        '				</div>\n' +
        '				<div class="form-group">\n' +
        '						<label>标签: </label>\n' +
        '						<a href="javascript:void(0);" class="pull-right" data-target="tags"><i class="fa fa-plus-square"></i></a>\n' +
        '						<div class="clearfix"></div>\n' +
        '						<p data-value="tags">\n' + '						</p>\n' + '				</div>\n' +
        '			</div>\n' + '			<div class="modal-footer">\n' +
        '				<a data-action="submit" style="font-size:18px;">发布</a>\n' +
        '				<a data-action="save" style="font-size:18px;" data-name="post-save-button">保存</a>\n' +
        '				<a data-dismiss="modal" style="font-size:18px;">关闭</a>\n' +
        '			</div>\n' + '		</div>\n' + '	</div>\n' + '</div>');

    var sharedWithData = {
        type: '1',
        authority_tags: [], // name
        authority_ids: []
        // id
    };

    var setSharedWithData = function(type, authority_tags, authority_ids) {
        sharedWithData.type = type;
        sharedWithData.authority_tags = authority_tags;
        sharedWithData.authority_ids = authority_ids;
    };

    var getSharedWithData = function() {
        return sharedWithData;
    };

    // 初始化
    (function() {
        // 加载编辑器
        modal.find('.editor-block').transWysiwyg();

        $(modal).find('[data-target="tags"]').on(
            'click',
            function() {
                var MController = new multiController('标签',
                    '<i class="material-icons">loyalty</i>');
                MController.load(getTag(), URL_GET_ALL_TAG, URL_ADD_TAG,
                    function(data) {
                        loadTag(data);
                    });
            });

        modal.on('hidden.bs.modal', function() {

            modal.find('.editor').empty();
            modal.find('[name="title"]').val("");
            modal.remove();

            // callConfirm("关闭动态","你确定要取消此动态的发送吗？", function(){
            // modal.find('.editor').empty();
            // modal.find('[name="title"]').val("");
            // modal.remove();
            //				
            // }, function(){
            //				
            // });

        });

    })();

    // 加载标题
    var loadTitle = function(title) {
        modal.find('[name="title"]').val(title);
    };

    // 获取标题
    var getTitle = function() {
        return modal.find('[name="title"]').val();
    };


    // 加载Tag数据
    var loadTag = function(list) {
        modal.find('[data-value="tags"]').empty();

        if (!Array.isArray(list)) {
            console.log('not a list');
        } else if (list.length == 0) {
            modal
                .find('[data-value="tags"]')
                .append(
                    '<span style="color: rgba(0,0,0,0.54); margin-left: 15px;">暂无</span>');
        } else {
            $.each(list, function(i, g) {
                modal.find('[data-value="tags"]').append(
                    '<span class="label" style="margin-right: 5px; background-color: ' +
                    googleColorRandomPicker() + ';">' + g +
                    '</span>');
            });
        }
    };

    // 获取tag数据
    var getTag = function() {
        var tags = [];
        $.each(modal.find('[data-value="tags"] .label'), function(index, item) {
            tags.push($(item).text());
        });
        return tags;
    };

    // 加载编辑器内容
    var loadContent = function(data) {
        console.log(data);
        modal.find('.editor-block').loadTransWysiwygData(data);
    };

    // 获取编辑器内容数据
    var getContent = function(id) {
        return modal.find('.editor-block').getTransWysiwygData(id);
    };

    // 获取allowshared
    var getAllowShared = function() {
        return modal.find('[type="checkbox"]').is(':checked') ? 1 : 0;
    };

    // 设置allowshared
    var loadAllowShared = function(checked) {
        console.log(checked);
        modal.find('[type="checkbox"]').prop('checked', checked);
    };

    // 加载分享范围
    var loadShareWith = function(type, role, sharedTag, sharedUser) {
        var target = modal.find('[data-target="sharewith"]');
        if (role == 1) {
            var textMap = ['', '公开', '朋友圈', '自定义', '自定义', '私有'];
            target.text(textMap[type]);
            setSharedWithData(type, sharedTag, sharedUser);
        } else if (role == 2) {
            var textMap = ['', '公开', '仅群成员可见'];
            target.text(textMap[type]);
            setSharedWithData(type, sharedTag, sharedUser);

        } else {
            console.log('error');
        }
    };

    var getShareWith = function() {
        return getSharedWithData();
    };

    
    // 发布群组动态
    this.createGroupPost = function(gid, pdata) {
        // 加载用户信息
        $.ajax({
            url: URL_GET_GROUP_INSTANCE + gid,
            type: "GET",
            dataType: 'json',
            success: function(result) {
                if (result == 0) {
                	messageAlert("获取数据失败， 请重新尝试","clear", function(){});
                } else {
                    modal.find('[data-name="image"]').prop('src',
                        ImageURLPrefix + result.image);
                }
            },
            error: function(err) {
            	messageAlert("获取数据失败， 请重新尝试","clear", function(){});
            }
        });

        // 分享动态初始值
        modal.find('[data-target="sharewith"]').attr('data-type', '1').text(
            '公开');

        // 初始化群组分享范围
        modal.find('[data-action="sharedwith"]').on(
            'click',
            function() {
                var dataShareWith = getShareWith();
                var SWModal = new SharedWithModal();
                SWModal.loadForGroup(gid, dataShareWith.type, function(
                    data, submodal) {
                    loadShareWith(data.type, 2, [], [])
                    submodal.modal('hide');
                })

            });

        var psid = "0";
        if (pdata == undefined) {
            psid = "0";
        } else {
            psid = pdata.id;
        }

        if (pdata !== undefined) {
            loadTitle(pdata.title);
            loadCategory(pdata.category);
            loadTag(pdata.tags);
            loadContent(pdata.content);
            loadAllowShared(pdata.allowShare);
            psid = pdata.id;
        }

        // 确定保存
        modal
            .find('[data-action="save"]')
            .on(
                'click',
                function() {
                    // 获取数据
                    var cate = getCategory();
                    var tags = getTag();

                    // 编辑器内容
                    var dataEditor = getContent(gid);

                    // var dataShareWith = getShareWith();

                    var post = {
                        gid: gid,
                        role: 2,
                        type: 1,
                        title: modal.find('[name="title"]').val(),
                        content: dataEditor.content,
                        category: JSON.stringify(cate),
                        tags: JSON.stringify(tags),
                        allowshare: (modal.find('[type="checkbox"]')
                            .is(':checked') ? 1 : 0),
                        images: dataEditor.images
                    };

                    if (post.content == "" || post.title == "") {
                    	messageAlert("动态的内容和标题不能为空","warning", function(){});
                        return false;
                    }

                    // 发布
                    $
                        .ajax({
                            url: URL_SAVE_POST,
                            data: post,
                            type: "POST",
                            dataType: 'json',
                            success: function(result) {
                                if (result == 0) {
                                	messageAlert("保存动态失败， 请重新尝试","clear", function(){});
                                } else {
                                	messageAlert("动态保存成功","done", function(){location.reload();});
                     
                                }
                            },
                            error: function(err) {
                            	messageAlert("请求出现异常， 请重新尝试","clear", function(){});
                            }
                        });
                });

        // 确定提交
        modal
            .find('[data-action="submit"]')
            .on(
                'click',
                function() {
                    // 获取数据
                    var cate = getCategory();
                    var tags = getTag();

                    // 编辑器内容
                    var dataEditor = getContent(gid);

                    var dataShareWith = getShareWith();

                    var post = {
                        gid: gid,
                        role: 2,
                        type: 1,
                        authority: dataShareWith.type,
                        title: modal.find('[name="title"]').val(),
                        content: dataEditor.content,
                        category: JSON.stringify(cate),
                        tags: JSON.stringify(tags),
                        allowshare: (modal.find('[type="checkbox"]')
                            .is(':checked') ? 1 : 0),
                        images: dataEditor.images,
                        lat: '0',
                        lng: '0',
                        psid: psid
                    };

                    if (post.content == "" || post.title == "") {
                    	messageAlert("动态的标题和内容不能为空","warning", function(){});
                        return false;
                    }

                    // 发布
                    $
                        .ajax({
                            url: URL_ADD_POST,
                            data: post,
                            type: "POST",
                            dataType: 'json',
                            success: function(result) {
                                if (result == 0) {
                                	messageAlert("动态发布失败， 请重新尝试","clear", function(){});
                                } else {
                                	messageAlert("动态发布成功","done", function(){ location.reload();});
                                }
                            },
                            error: function(err) {
                            	messageAlert("请求出现异常， 请重新尝试","clear", function(){});
                            }
                        });
                });

        modal.modal('show');
    };

    // 发布个人动态
    this.createIndividualPost = function(uid, pdata) {
        // 加载用户信息
        $.ajax({
            url: URL_GET_CURRENT_USER,
            type: "GET",
            dataType: 'json',
            success: function(user) {
                if (user == 0) {
                	messageAlert("请求出现异常， 请重新尝试","clear", function(){});
                } else {
                    modal.find('[data-name="image"]').prop('src',
                        ImageURLPrefix + user.image);

                    // 分享动态初始值
                    modal.find('[data-target="sharewith"]').attr('data-type',
                        '1').text('公开');

                    // 初始化群组分享范围
                    modal.find('[data-action="sharedwith"]').on(
                        'click',
                        function() {
                            var dataShareWith = getShareWith();
                            var SWModal = new SharedWithModal(user.id);
                            SWModal.ajaxLoadForIndividual(
                                dataShareWith.type,
                                dataShareWith.authority_tags,
                                dataShareWith.authority_ids,
                                function(
                                    data, modal) {
                                    loadShareWith(data.type, 1,
                                        data.selectedTag,
                                        data.selectedUser)
                                    modal.modal('hide');
                                });
                        });
                }
            },
            error: function(err) {
            	messageAlert("请求出现异常， 请重新尝试","clear", function(){});
            }
        });

        var psid = "0";
        if (pdata == undefined) {
            psid = "0";
        } else {
            psid = pdata.id;
        }

        if (pdata !== undefined) {
            loadTitle(pdata.title);
            loadCategory(pdata.category);
            loadTag(pdata.tags);
            loadContent(pdata.content);
            loadAllowShared(pdata.allowShare);
            psid = pdata.id;
        }

        // 确定保存
        modal
            .find('[data-action="save"]')
            .on(
                'click',
                function() {
                    // 获取数据
                    var cate = getCategory();
                    var tags = getTag();

                    // 编辑器内容
                    var dataEditor = getContent(uid);

                    var post = {
                        role: 1,
                        type: 1,
                        title: modal.find('[name="title"]').val(),
                        content: dataEditor.content,
                        category: JSON.stringify(cate),
                        tags: JSON.stringify(tags),
                        allowshare: (modal.find('[type="checkbox"]')
                            .is(':checked') ? 1 : 0),
                        images: dataEditor.images
                    };

                    if (post.content == "" || post.title == "") {
                    	messageAlert("请求出现异常， 请重新尝试","clear", function(){});
                        return false;
                    }
                    $
                        .ajax({
                            url: URL_SAVE_POST,
                            data: post,
                            type: "POST",
                            dataType: 'json',
                            success: function(result) {
                                if (result == 0) {
                                	messageAlert("请求出现异常， 请重新尝试","clear", function(){});
                                } else {
                                	messageAlert("请求出现异常， 请重新尝试","clear", function(){});
                                }
                            },
                            error: function(err) {
                            	messageAlert("请求出现异常， 请重新尝试","clear", function(){});
                            }
                        });
                });

        // 确定提交
        modal
            .find('[data-action="submit"]')
            .on(
                'click',
                function() {
                    // 获取数据
                    var cate = getCategory();
                    var tags = getTag();

                    // 编辑器内容
                    var dataEditor = getContent(uid);

                    // 分享范围
                    var dataShareWith = getShareWith();

                    var post = {
                        role: 1,
                        type: 1,
                        authority: dataShareWith.type,
                        authority_tags: JSON
                            .stringify(dataShareWith.authority_tags),
                        authority_ids: JSON
                            .stringify(dataShareWith.authority_ids),
                        title: modal.find('[name="title"]').val(),
                        content: dataEditor.content,
                        category: JSON.stringify(cate),
                        tags: JSON.stringify(tags),
                        allowshare: (modal.find('[type="checkbox"]')
                            .is(':checked') ? 1 : 0),
                        images: dataEditor.images,
                        lat: '0',
                        lng: '0',
                        psid: psid
                    };
                    if (post.authority == 3 || post.authority == 4) {
                        if (!(JSON.parse(post.authority_ids).length > 0 || JSON
                                .parse(post.authority_tags).length > 0)) {
                        	messageAlert("分享范围不能为空","warning", function(){});
                            
                            return false;
                        }
                    }

                    if (post.content == "" || post.title == "") {
                        callAlert(
                            '动态的标题和内容不能为空！',
                            '<i class="material-icons">error_outline</i>',
                            function() {});
                        return false;
                    }

                    // 发布
                    $
                        .ajax({
                            url: URL_ADD_POST,
                            data: post,
                            type: "POST",
                            dataType: 'json',
                            success: function(result) {
                                if (result == 0) {
                                    callAlert(
                                        '发布失败！',
                                        '<i class="material-icons">error_outline</i>',
                                        function() {});
                                } else {
                                    callAlert(
                                        '发布成功！',
                                        '<i class="material-icons">done</i>',
                                        function() {
                                            // modal.modal('hide');
                                            location.reload();
                                        });
                                }
                            },
                            error: function(err) {
                                callAlert(
                                    '发布失败！',
                                    '<i class="material-icons">error_outline</i>',
                                    function() {});
                            }
                        });
                });

        modal.modal('show');
    };

    this.editPost = function(data) {
        if (data.type == 1) {
            if (data.role == 1) {
                // 加载用户信息
                $
                    .ajax({
                        url: URL_GET_CURRENT_USER,
                        type: "GET",
                        dataType: 'json',
                        success: function(user) {
                            if (user == 0) {
                                callAlert(
                                    '加载失败！',
                                    '<i class="material-icons">error_outline</i>',
                                    function() {});
                            } else {
                                modal.find('[data-name="image"]').prop(
                                    'src', ImageURLPrefix + user.image);

                                // 分享动态初始值
                                loadTitle(data.title);
                                loadShareWith(data.authority, data.role,
                                    data.authority_tags,
                                    data.authority_ids);

                                // 初始化群组分享范围
                                modal
                                    .find('[data-action="sharedwith"]')
                                    .on(
                                        'click',
                                        function() {
                                            var dataShareWith = getShareWith();
                                            var SWModal = new SharedWithModal(
                                                user.id);
                                            SWModal
                                                .ajaxLoadForIndividual(
                                                    dataShareWith.type,
                                                    dataShareWith.authority_tags,
                                                    dataShareWith.authority_ids,
                                                    function(
                                                        data,
                                                        modal) {
                                                        loadShareWith(
                                                            data.type,
                                                            1,
                                                            data.selectedTag,
                                                            data.selectedUser)
                                                        modal
                                                            .modal('hide');
                                                    });
                                        });

                                loadContent(data.content);
                                loadCategory(data.category);
                                loadTag(data.tags);
                                loadAllowShared(data.allowShare);

                                // 确定提交
                                modal
                                    .find('[data-action="submit"]')
                                    .on(
                                        'click',
                                        function() {
                                            // 获取数据
                                            var cate = getCategory();
                                            var tags = getTag();

                                            // 编辑器内容
                                            var dataEditor = getContent(user.id);

                                            // 分享范围
                                            var dataShareWith = getShareWith();

                                            var post = {
                                                pid: data.pid,
                                                authority: dataShareWith.type,
                                                authority_tags: JSON
                                                    .stringify(dataShareWith.authority_tags),
                                                authority_ids: JSON
                                                    .stringify(dataShareWith.authority_ids),
                                                title: modal
                                                    .find(
                                                        '[name="title"]')
                                                    .val(),
                                                content: dataEditor.content,
                                                category: JSON
                                                    .stringify(cate),
                                                tags: JSON
                                                    .stringify(tags),
                                                allowshare: (modal
                                                    .find(
                                                        '[type="checkbox"]')
                                                    .is(
                                                        ':checked') ? 1 :
                                                    0),
                                                images: dataEditor.images,
                                                lat: '0',
                                                lng: '0'
                                            };

                                            if (post.authority == 3 ||
                                                post.authority == 4) {
                                                if (!(JSON
                                                        .parse(post.authority_ids).length > 0 || JSON
                                                        .parse(post.authority_tags).length > 0)) {
                                                    callAlert(
                                                        '分享范围不能为空！',
                                                        '<i class="material-icons">error_outline</i>',
                                                        function() {});
                                                    return false;
                                                }
                                            }

                                            // 发布
                                            $
                                                .ajax({
                                                    url: URL_UPDATE_POST,
                                                    data: post,
                                                    type: "POST",
                                                    dataType: 'json',
                                                    success: function(
                                                        result) {
                                                        if (result == 0) {
                                                            callAlert(
                                                                '修改失败！',
                                                                '<i class="material-icons">error_outline</i>',
                                                                function() {});
                                                        } else {
                                                            callAlert(
                                                                '修改成功！',
                                                                '<i class="material-icons">done</i>',
                                                                function() {
                                                                    // modal.modal('hide');
                                                                    location
                                                                        .reload();
                                                                });
                                                        }
                                                    },
                                                    error: function(
                                                        err) {
                                                        callAlert(
                                                            '发布失败！',
                                                            '<i class="material-icons">error_outline</i>',
                                                            function() {});
                                                    }
                                                });
                                        });

                                modal.modal('show');

                            }
                        },
                        error: function(err) {
                            callAlert(
                                '加载失败！',
                                '<i class="material-icons">error_outline</i>',
                                function() {});
                        }
                    });
            } else if (data.role == 2) {
                // 加载用户信息
                $
                    .ajax({
                        url: URL_GET_GROUP_INSTANCE + data.gid,
                        type: "GET",
                        dataType: 'json',
                        success: function(result) {
                            if (result == 0) {
                                callAlert(
                                    '加载失败！',
                                    '<i class="material-icons">error_outline</i>',
                                    function() {});
                            } else {
                                modal.find('[data-name="image"]').prop(
                                    'src',
                                    ImageURLPrefix + result.image);

                                loadShareWith(data.authority, data.role,
                                    data.authority_tags,
                                    data.authority_ids);

                                // 初始化群组分享范围
                                modal
                                    .find('[data-action="sharedwith"]')
                                    .on(
                                        'click',
                                        function() {
                                            var dataShareWith = getShareWith();
                                            var SWModal = new SharedWithModal();
                                            SWModal
                                                .loadForGroup(
                                                    data.gid,
                                                    dataShareWith.type,
                                                    function(
                                                        data,
                                                        submodal) {
                                                        loadShareWith(
                                                            data.type,
                                                            2,
                                                            data.selectedTag,
                                                            data.selectedUser);
                                                        submodal
                                                            .modal('hide');
                                                    })

                                        });

                                loadTitle(data.title);
                                loadContent(data.content);
                                loadCategory(data.category);
                                loadTag(data.tags);
                                loadAllowShared(data.allowShare);

                                // 确定提交
                                modal
                                    .find('[data-action="submit"]')
                                    .on(
                                        'click',
                                        function() {
                                            // 获取数据
                                            var cate = getCategory();
                                            var tags = getTag();

                                            // 编辑器内容
                                            var dataEditor = getContent(data.gid);

                                            var dataShareWith = getShareWith();

                                            var post = {
                                                pid: data.pid,
                                                authority: dataShareWith.type,
                                                title: modal
                                                    .find(
                                                        '[name="title"]')
                                                    .val(),
                                                content: dataEditor.content,
                                                category: JSON
                                                    .stringify(cate),
                                                tags: JSON
                                                    .stringify(tags),
                                                allowshare: (modal
                                                    .find(
                                                        '[type="checkbox"]')
                                                    .is(
                                                        ':checked') ? 1 :
                                                    0),
                                                images: dataEditor.images,
                                                lat: '0',
                                                lng: '0'
                                            };

                                            // 发布
                                            $
                                                .ajax({
                                                    url: URL_UPDATE_POST,
                                                    data: post,
                                                    type: "POST",
                                                    dataType: 'json',
                                                    success: function(
                                                        result) {
                                                        if (result == 0) {
                                                            callAlert(
                                                                '修改失败！',
                                                                '<i class="material-icons">error_outline</i>',
                                                                function() {});
                                                        } else {
                                                            callAlert(
                                                                '修改成功！',
                                                                '<i class="material-icons">done</i>',
                                                                function() {
                                                                    // modal.modal('hide');
                                                                    location
                                                                        .reload();
                                                                });
                                                        }
                                                    },
                                                    error: function(
                                                        err) {
                                                        callAlert(
                                                            '发布失败！',
                                                            '<i class="material-icons">error_outline</i>',
                                                            function() {});
                                                    }
                                                });
                                        });

                                modal.modal('show');
                            }
                        },
                        error: function(err) {
                            callAlert(
                                '加载失败！',
                                '<i class="material-icons">error_outline</i>',
                                function() {});
                        }
                    });
            } else {
                console.log('error');
            }
        } else if (data.type == 2) {
            var SPController = new SharePostController();
            SPController.modifySharePost(data.id);
        } else {
            console.log('error');
        }
    };

};


var changeImageURL = function(content) {
    var parent = $('<div>' + content + '</div>');

    $.each(parent.find('img'), function(index, image) {
        var src = $(image).attr("src");
        if (src.startsWith("TData")) {
            $(image).attr("src", ImageURLPrefix + src);
        }
        //post.find('[data-comment]').append('<div class="divider"></div>');
    });
    return parent.html();
}

var Post = function(data) {
    var post = $(
        '<div class="post">\n' +
        '	<div class="user-block">\n' +
        '		<img class="img-circle img-bordered-sm" data-name="userimage">\n' +
        '				<span class="username">\n' +
        '					<a href="#" data-name="username"></a>\n' +
        '				</span>\n' +
        '		<span class="description" data-name="posttime"></span>\n' +
        '	</div>\n' +
        '	<div data-name="title">\n' +
        '		<a href="#" data-name="posttile"></a>\n' +
        '	</div>\n' +
        '	<div data-name="content">\n' +
        '	</div>\n' +
        '	<div class="post_tags"><i class="fa fa-tags margin-r-5" title="标签"></i><span data-name="tag"></span></div>\n' +
        '	<div class="row divider"></div>\n' +
        '	<ul class="list-inline">\n' +
        '	</ul>\n' +
        '	<div class="panel-collapse collapse" data-container="comment">\n' +
        '		<div class="row divider"></div>\n' +
        '		<div class="panel-body" style="padding:0; padding-bottom: 10px;">\n' +
        '			<div data-comment class="customized-scrollbar" style="max-height: 300px; overflow-y: auto;"></div>\n' +
        '			<div data-reply>\n' +
        '				<textarea data-newcomment placeholder="请输入评论..." rows=3 style="width: 100%; resize: none;"></textarea>\n' +
        '				<div class="btn btn-primary pull-right" data-action="submit">回复</div>\n' +
        '			</div>\n' +
        '		</div>\n' +
        '	</div>\n' +
        ' <div class="clearfix"></div>\n' +
        '</div>'
    );

    //添加回复人
    var appendReplyTo = function(user) {
        var replyTo = $(
            '<div data-reply-to data-id="' + user.from_uid + '">回复： \n' +
            '	<a href="#">' + user.from_uname + '</a>\n' +
            '	<span class="pull-right" data-remove style="cursor: pointer;"><i class="material-icons">clear</i></span>\n' +
            '</div>'
        );
        post.find('[data-reply-to]').remove();
        post.find('[data-reply]').prepend(replyTo);

        replyTo.find('[data-remove]').click(function() {
            replyTo.remove();
        });
    };

    //获取回复人
    var getReplyID = function() {
        var id = post.find('[data-reply-to]').attr('data-id');
        return id ? id : '';
    };

    //获取评论
    var getComment = function(data) {
        var comment = $(
            '<div class="comment" style="padding-bottom: 15px;">\n' +
            '	<div class="user-block">\n' +
            '		<img class="img-circle img-bordered-sm" data-comment-name="userimage">\n' +
            '				<span class="username">\n' +
            '					<a href="#" data-comment-name="username"></a>\n' +
            '				</span>\n' +
            '		<span class="description" data-comment-name="posttime"></span>\n' +
            '	</div>\n' +
            '	<div  data-comment-name="content" style="word-break: break-all;"></div>\n' +
            '</div>'
        );

        //添加发布者信息
        comment.find('[data-comment-name="userimage"]').attr('src', ImageURLPrefix + data.from_uimage);
        comment.find('[data-comment-name="username"]').attr('href', URL_RENDER_TO_INDIVIDUAL + data.from_uid).text(data.from_uname);
        comment.find('[data-comment-name="posttime"]').text(formatDatetime(data.datetime));

        if (data.type == 1) {
            // 普通回复
            comment.find('[data-comment-name="content"]').append(data.content);
        } else if (data.type == 2) {
            // 回复用户
            console.log(1111);
            var toUser = $('<span data-comment-toid="' + data.to_uid + '" style="color: #2962ff; cursor: pointer; padding-right: 15px;">@ ' + data.to_uname + '</span>');
            comment.find('[data-comment-name="content"]').append(toUser);
            comment.find('[data-comment-name="content"]').append(data.content);
        } else {
            console.log('error');
        }

        //选项按钮
        var getCommentMenuData = function() {
            return [{
                    name: '回复',
                    action: function() {
                        appendReplyTo(data);
                    }
                },
                {
                    name: '举报',
                    action: function() {

                    }
                }
            ];
        };
        var btnMenu = createMenu(getCommentMenuData()).addClass('pull-right');
        btnMenu.find('[data-toggle="dropdown"]').css({
            'color': '#97a0b3',
            'margin-right': '5px'
        });
        comment.find('.username').append(btnMenu);
        return comment;
    };

    //加载评论
    var reloadComment = function(list) {
        console.log(list);
        post.find('[data-comment]').empty();
        $.each(list, function(index, comment) {
            post.find('[data-comment]').append(getComment(comment));
            post.find('[data-comment]').append('<div class="divider"></div>');
        });
    };

    //动态加载
    var ajaxReloadComment = function() {
        $.ajax({
            url: data.loadCommentURL,
            data: {
                id: data.id
            },
            type: "GET",
            dataType: 'json',
            success: function(comments) {
                if (!Array.isArray(comments)) {
                    console.log(result, '错误');
                } else {
                    post.find('[data-type="comment-count"]').text(comments.length);
                    reloadComment(comments);

                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    };

    //加载动态
    var reloadPost = function(data) {
        data.content = changeImageURL(data.content);
        //console.log(data);
        if (data.top == 1) {
            post.addClass("color_post");
        }
        post.attr('data-id', data.id);
        post.attr('data-refer-id', data.refer_id);
        post.find('[data-name="userimage"]').attr('src', data.image);
        post.find('[data-name="username"]').attr('href', data.goPosterPage).text(data.uname);
        post.find('[data-sharedwith]').remove();
        var sharedWith = $('<span data-sharedwith><i class="fa fa-caret-right"></i></span>');


        if (data.role == 1) {
            if (data.authority == 1) {
                sharedWith.append(' 公开');
            } else if (data.authority == 2) {
                sharedWith.append(' 朋友圈');
            } else if (data.authority == 3) {
                if (data.hasAuthority == 1) {
                    sharedWith.append('给谁看');
                    loadSharedDetails(sharedWith, data.authority_tags, data.authority_ids, data.authority);
                } else {
                    sharedWith.append('朋友圈');
                }

            } else if (data.authority == 4) {

                if (data.hasAuthority == 1) {
                    sharedWith.append('不给谁看');
                    loadSharedDetails(sharedWith, data.authority_tags, data.authority_ids, data.authority);
                } else {
                    sharedWith.append('朋友圈');
                }
            } else if (data.authority == 5) {
                sharedWith.append(' 私有');
            } else {

            }
        } else if (data.role == 2) // group
        {
            if (data.authority == 1) {
                sharedWith.append(' 公开');
            } else if (data.authority == 2) {
                sharedWith.append(' 仅群成员可见');
            }
        } else if (data.role == 3) // item
        {
            if (data.authority == 1) {
                sharedWith.append(' 公开');
            } else if (data.authority == 2) {
                sharedWith.append(' 仅用户可见');
            }
        } else {

        }
        post.find('.username').append(sharedWith);


        //加载时间
        post.find('[data-name="posttime"]').text(formatDatetime(data.datetime));
        post.find('.username .dropdown').remove();
        var btnMenu = createMenu(getPostMenu(data.id, data.hasAuthority, data.top)).addClass('pull-right');
        btnMenu.find('[data-toggle="dropdown"]').css({
            'color': '#97a0b3',
            'margin-right': '5px',
            'margin-left': '10px'
        });
        post.find('.username').append(btnMenu);

        //查看详情
        post.find('.username [data-opennew]').remove();
        btnOpen = $('<a href="#" class="pull-right btn-box-tool" style="padding: 0;" data-opennew><i class="material-icons">open_in_new</i></a>');
        post.find('.username').append(btnOpen);
        btnOpen.click(function() {
            var postDetails = new PostDetails();
            postDetails.ajaxLoadPost(data.getSinglePostURL, data.id);
        });
        //加载tag
        post.find('[data-name="tag"]').empty();
        if (!Array.isArray(data.tags) || data.tags.length == 0) {
            post.find('[data-name="tag"]').append('暂无');
        } else {
            $.each(data.tags, function(i, g) {
                post.find('[data-name="tag"]').append('<span class="label tag-label" style="margin-left: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
            });
        }

        post.find('.tag-label').on('click', function() {
            var value = $(this).text();
            window.location.href = data.searchPostByTagURL + "?q=+value";
        });

        //标题
        post.find('[data-name="posttile"]').text(data.title);

        //内容
        post.find('[data-name="content"]').empty();
        if (data.type == 1) {
            //普通动态
            //加载标题
            // 内容
            var warpContent = $('<div>' + data.content + '</div>');

            //changeImageURL(warpContent);
            if (warpContent.find('img').length > 0) {
                console.log(11);
                post.find('[data-name="content"]').append(
                    '<div class="row" style="max-height: 500px; overflow: hidden;">\n' +
                    '	<img src="' + $(warpContent.find('img')[0]).attr('src') + '"class="img-responsive" data-name="postimage">\n' +
                    '</div>'
                );
            } else {
                post.find('[data-name="content"]').append(warpContent);
                //加载limscroll
                post.find('[data-name="content"]').css({
                    'max-height': '450px',
                    'overflow': 'hidden'
                });

            }

            $(post.find('[data-name="posttile"]')).click(function() {
                var postDetails = new PostDetails();
                postDetails.ajaxLoadPost(data.getSinglePostURL, data.id);
            });
        } else if (data.type == 2) {
            //被分享的动态
            post.find('.post_category').hide();
            post.find('.post_tags').hide();
            post.find('[data-name="content"]').append(data.content);
            post.find('[data-name="content"]').append('<div class="row divider"></div>');

            if (data.share_post == undefined || data.share_post == "") {
                post.find('[data-name="content"]').append(
                    '<div data-name="title" data-type="share_title">\n' +
                    '	<div data-link="title" style="font-size: 20px; width: 100%;"><i class="fa fa-exclamation-circle"> </i> 无法查看该动态</div>\n' +
                    '</div>'
                );
            } else {
                var warpContent = $('<div>' + data.share_post.content + '</div>');
                //changeImageURL(warpContent);
                if (warpContent.find('img').length > 0) {
                    post.find('[data-name="content"]').append(
                        '<div data-name="title"  data-type="share_post_item">\n' +
                        '	<a href="javascript:void(0);">' + data.share_post.title + '</a>\n' +
                        '</div>'
                    ).append(
                        '<div class="row"  data-type="share_post_item" style="max-height: 500px; overflow: hidden;"><img src="' + $(warpContent.find('img')[0]).attr('src') + '" class="img-responsive"/></div>'
                    );
                } else {
                    post.find('[data-name="content"]').append(
                        '<div data-name="title" data-type="share_post_item">\n' +
                        '	<a href="#">' + data.share_post.title + '</a>\n' +
                        '</div>'
                    );
                }
                $(post.find('[data-type="share_post_item"]')).addClass("share_post_content");
                $(post.find('[data-type="share_post_item"]')).click(function() {
                    var postDetails = new PostDetails();
                    postDetails.ajaxLoadPost(data.getSinglePostURL, data.share_post.id);
                });
            }
        } else {
            console.log('error')
        }



        /* 底端菜单栏 */
        //是否允许被分享
        post.find('.list-inline').empty();
        if (data.allowShare == 1 && data.type == 1 && data.hasAuthority != 1) {
            var btn = $('<li><a href="#" class="link-black text-sm" title="转发"><i class="fa fa-share margin-r-5"></i></a></li>');
            post.find('.list-inline').append(btn);

            btn.click(function() {
                var SPController = new SharePostController();
                SPController.createSharePost(data.id);

                //SharePost();
            });
        }

        //点赞
        var btnLike;
        if (data.islike == 1) {
            btnLike = $('<li><a href="#" class="link-black text-sm" title="点赞"><i class="fa fa-thumbs-up  margin-r-5 dolike" id="do-like-icon-' + data.id + '"></i><span data-type="count" id="like_id_' + data.id + '">' + data.total_like + '</span></a></li>');
        } else if (data.islike == 0) {
            btnLike = $('<li><a href="#" class="link-black text-sm" title="点赞"><i class="fa fa-thumbs-o-up margin-r-5 dolike" id="do-like-icon-' + data.id + '"></i><span data-type="count" id="like_id_' + data.id + '">' + data.total_like + '</span></a></li>');
        }
        post.find('.list-inline').append(btnLike);
        btnLike.click(function() {
            likePost(data.id, (data.islike + 1) % 2, function() {
                var flag = (data.islike + 1) % 2;
                if (flag === 1) {
                    btnLike.find(".dolike").removeClass("fa-thumbs-o-up");
                    btnLike.find(".dolike").addClass("fa-thumbs-up");
                    data.islike = 1;
                } else {
                    data.islike = 0;
                    btnLike.find(".dolike").removeClass("fa-thumbs-up");
                    btnLike.find(".dolike").addClass("fa-thumbs-o-up");
                }
            });
        });

        //收藏
        //post.find('.list-inline').append('<li><a href="#" class="link-black text-sm" title="备注"><i class="fa fa-pencil margin-r-5"></i></a></li>');

        //附件
        //post.find('.list-inline').append('<li><a href="#" class="link-black text-sm" title="附件"><i class="fa fa-file margin-r-5"></i></a></li>');

        //评论
        var btnComment = $('<li class="pull-right"><a href="#" class="link-black text-sm" data-action="comment"><i class="fa fa-comments-o margin-r-5"></i><span data-type="comment-count">' + data.commentNumber + '</span></a></li>');
        post.find('.list-inline').append(btnComment);
        btnComment.click(function() {
            post.find('[data-container="comment"]').collapse('toggle');
        });

        //post.find('[data-comment]').css({'max-height': '200px', 'overflow-y': 'scroll'});

        post.find('[data-container="comment"]')
            .on('shown.bs.collapse', function() {
                ajaxReloadComment();
            })
            .on('hide.bs.collapse', function() {

            });

        post.find('[data-action="submit"]').on('click', function() {
            var text = post.find('textarea').val();
            var to_id = getReplyID();
            makeComments(data.sendCommentURL, data.id, text, (to_id ? 2 : 1), to_id, ajaxReloadComment);
            post.find('textarea').val('');
            post.find('[data-reply-to]').remove();
        });
    };



    //初始化
    (function() {
        reloadPost(data);
    })();
    return post;
};

var putPostTop = function(pid, value) {
    $.ajax({
        url: URL_PUT_POST_AT_TOP,
        data: {
            id: id,
            value: value
        },
        type: "GET",
        dataType: 'json',
        success: function(result) {
            if (result == 1) {
                value = parseInt(value);
                if (value == 1) {
                    callAlert('置顶成功!', '<i class="material-icons">done</i>',
                        function() {
                            location.reload();
                        });

                } else {
                    callAlert('取消置顶成功!', '<i class="material-icons">done</i>',
                        function() {
                            location.reload();
                        });

                }

            } else {
                callAlert('失败!', '<i class="material-icons">clear</i>',
                    function() {
                        // location.reload();
                    });
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

var PostDetails = function() {
    var post = $(
        '<div class="modal fade post-modal" style="overflow-y: auto;">\n' +
        '	<div class="modal-dialog">\n' +
        '		<div class="modal-content">\n' +
        '			<div class="modal-header">\n' +
        '				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '				<h5 class="modal-title">\n' +
        '				</h5>\n' +
        '			</div>\n' +
        '			<div class="modal-body">\n' +
        '				<div data-type="title"></div>\n' +
        '				<div data-type="brief">\n' +
        '				</div>\n' +
        '				<div data-type="content">\n' +
        '				</div>\n' +
        '				<div data-type="category" class="post_category">\n' +
        '					<i class="fa fa-tasks margin-r-5" title="动态类别"> 动态类别</i>\n' +
        '				</div>\n' +
        '				<div data-type="tag" class="post_tags">\n' +
        '					<i class="fa fa-tags margin-r-5" title="兴趣类别"> 动态话题</i>\n' +
        '				</div>\n' +
        '				<div data-type="func">\n' +
        '				</div>\n' +
        '				<div class="row divider"></div>\n' +
        '				<div data-type="comment-container" class="customized-scrollbar" style="max-height: 300px; overflow-y: auto;">\n' +
        '				</div>\n' +
        '				<div class="row divider"></div>\n' +
        '				<div data-type="reply">\n' +
        '					<div data-reply></div>\n' +
        '				</div>\n' +
        '			</div>\n' +
        '		</div>\n' +
        '	</div>\n' +
        '</div>'
    );

    // 0. 加载回到顶端按钮
    var appendToTopBtn = function() {
        var button = $('<a class="btn btn-default" id="toTop"><i class="material-icons">navigation</i></a>');
        button.on('click', function() {
            post.animate({
                scrollTop: 0
            }, "slow");
            //post.scrollTop(0);
        });
        post.scroll(function() {

        });
        button.css({
            'position': 'fixed',
            'bottom': '20px',
            'margin-left': '15px',
            'z-index': '99'
        });
        post.append(button);
    };

    //1. 加载用户模块
    var loadUserBlock = function(data) {
        var user = $(
            '<div class="user-block">\n' +
            '	<img class="img-circle img-bordered-sm" data-name="userimage">\n' +
            '		<span class="username">\n' +
            '			<a href="#" data-name="username"></a>\n' +
            '			<span data-sharedwith><i class="fa fa-caret-right"> </i></span>\n' +
            '		</span>\n' +
            '	<span class="description" data-name="posttime"></span>\n' +
            '</div>'
        );

        // ### 点击用户头像跳转
        if (data.role == 1) {
            var authorityMap = [
                '', '公开', '朋友圈', '给谁看', '不给谁看', '私有'
            ];
            //普通用户
            user.find('[data-name="userimage"]').attr('src', ImageURLPrefix + data.uimage);
            user.find('[data-name="username"]').text(data.uname);
            //console.log(authorityMap[data.authority]);
            user.find('[data-sharedwith]').append(authorityMap[data.authority]);
            //			if(data.authority == 3 || data.authority == 4){
            //				loadSharedDetails(user.find('[data-sharedwith]'), data.authority_tags, data.authority_ids, data.authority);
            //			}

            if (data.authority == 3) {
                //sharedWith.append('可观看的用户范围');

                if (data.hasAuthority == 1) {
                    loadSharedDetails(user.find('[data-sharedwith]'), data.authority_tags, data.authority_ids, data.authority);
                } else {
                    user.find('[data-sharedwith]').empty();
                    user.find('[data-sharedwith]').append("朋友圈");
                }

            }
            if (data.authority == 4) {
                //sharedWith.append('不可观看的用户范围');
                if (data.hasAuthority == 1) {
                    loadSharedDetails(user.find('[data-sharedwith]'), data.authority_tags, data.authority_ids, data.authority);
                } else {
                    user.find('[data-sharedwith]').empty();
                    user.find('[data-sharedwith]').append("朋友圈");
                }
            }
        } else if (data.role == 2) {
            //群组
            var authorityMap = [
                '', '公开', '群组可见'
            ];
            //普通用户
            user.find('[data-name="userimage"]').attr('src', ImageURLPrefix + data.gimage);
            user.find('[data-name="username"]').text(data.gname);
            user.find('[data-sharedwith]').append(authorityMap[data.authority]);
        } else {
            console.log('error');
        }
        user.find('[data-name="posttime"]').text(formatDatetime(data.datetime));

        //点击跳转
        user.find('[data-name="userimage"], [data-name="username"]').click(function() {
            renderToIndex((data.role == 1 ? data.uid : data.gid), data.role);
        });


        //加载菜单
        user.find('.username').append(getPostMenu(data.id, data.hasAuthority, data.top));

        post.find('.modal-title')
            .empty()
            .append(user);
    };

    //2. 加载动态内容
    var loadContentBlock = function(data) {
        data.content = changeImageURL(data.content);
        //标题
        post.find('[data-type="title"]').text(data.title);
        //overview
        var brief = post.find('[data-type="brief"]');
        brief.empty();
        if (data.total_view)
            brief.append('<span><i class="fa fa-eye"></i>' + data.total_view + ' 人查阅</span>');
        if (data.total_like)
            brief.append('<span><i class="fa fa-thumbs-up"></i>' + data.total_like + ' 人点赞</span>');
        if (data.total_comment)
            brief.append('<span><i class="fa fa-comments"></i>' + data.total_comment + ' 人评论</span>');
        if (data.total_collect)
            brief.append('<span><i class="fa fa-star"></i>' + data.total_collect + ' 人收藏</span>');

        //类别
        var category = post.find('[data-type="category"]');
        category.find('[removeable]').remove();
        if (data.category.length == 0) {
            category.append('<span removeable>暂无</span>');
        } else {
            $.each(data.category, function(index, item) {
                category.append('<span class="label category-label" style="background-color: ' + googleColorRandomPicker() + '" removeable>' + item + '</span>')
            });
        }
        //兴趣
        var tag = post.find('[data-type="tag"]');
        tag.find('[removeable]').remove();
        if (data.tags.length == 0) {
            tag.append('<span removeable>暂无</span>');
        } else {
            $.each(data.tags, function(index, item) {
                tag.append('<span class="label tag-label" style="background-color: ' + googleColorRandomPicker() + '" removeable>' + item + '</span>')
            });
        }

        post.find('.category-label').on('click', function() {
            var value = $(this).text();
            window.location.href = URLPrefix + '/user/home/search-post/?q=' + value + "&sp=1";
        });

        post.find('.tag-label').on('click', function() {
            var value = $(this).text();
            window.location.href = URLPrefix + '/user/home/search-post/?q=' + value + "&sp=2";
        });


        //内容
        if (data.type == 2) {
            //被分享的动态
            post.find('.post_category').hide();
            post.find('.post_tags').hide();
            post.find('[data-type="content"]').append(data.content);
            post.find('[data-type="content"]').append('<div class="row divider"></div>');

            if (data.share_post == undefined || data.share_post == "") {
                post.find('[data-type="content"]').append(
                    '<div data-name="title">\n' +
                    '	<div data-link="title" style="font-size: 20px; width: 100%;"><i class="fa fa-exclamation-circle"> </i> 无法查看该动态</div>\n' +
                    '</div>'
                );
            } else {
                var warpContent = $('<div>' + data.share_post.content + '</div>');
                if (warpContent.find('img').length > 0) {
                    post.find('[data-type="content"]').append(
                        '<div data-name="title">\n' +
                        '	<a href="#">' + data.share_post.title + '</a>\n' +
                        '</div>'
                    ).append(
                        '<div class="row"><img src="' + $(warpContent.find('img')[0]).attr('src') + '" class="img-responsive"/></div>'
                    );
                } else {
                    post.find('[data-type="content"]').append(
                        '<div data-name="title">\n' +
                        '	<a href="#">' + data.share_post.title + '</a>\n' +
                        '</div>'
                    );
                }

                $(post.find('[data-type="content"]')).addClass("share_post_content");
                $(post.find('[data-type="content"]')).click(function() {
                    var postDetails = new PostDetails();
                    postDetails.ajaxLoadPost(data.share_post.id);
                });
            }
        } else {
            post.find('[data-type="content"]').html(data.content);
        }


        //功能键
        var func = post.find('[data-type="func"]');
        func.empty();

        //var collect = $('<a href="#" class="pull-right btn-box-tool"><i class="material-icons">star_border</i></a>');
        //func.append(collect);

        var like = $('<a href="#" class="pull-right btn-box-tool" style="font-size: 1.5em;"><i class="fa ' + (data.islike == 1 ? 'fa-thumbs-up' : 'fa-thumbs-o-up') + '"></i> ( <span data-count>' + data.total_like + '</span> )</a>');
        func.append(like);

        like.click(function() {
            likePost(data.id, (data.islike + 1) % 2, function() {
                like.find('i').toggleClass('fa-thumbs-up fa-thumbs-o-up');
                like.find('[data-count]').text(parseInt(like.find('[data-count]').text()) + (like.find('i').hasClass('fa-thumbs-up') ? 1 : -1));

                var flag = (data.islike + 1) % 2;
                if (flag === 1) {
                    $("#do-like-icon-" + data.id).removeClass("fa-thumbs-o-up");
                    $("#do-like-icon-" + data.id).addClass("fa-thumbs-up");
                    data.islike = 1;
                } else {
                    data.islike = 0;
                    $("#do-like-icon-" + data.id).removeClass("fa-thumbs-up");
                    $("#do-like-icon-" + data.id).addClass("fa-thumbs-o-up");
                }
            });
        });

        if (data.allowShare == 1) {
            var share = $('<a href="#" class="pull-right btn-box-tool" style="font-size: 1.5em;"><i class="fa fa-share"></i></a>');
            func.append(share);
            share.click(function() {
                var SPController = new SharePostController();
                SPController.createSharePost(data.id);
            });
        }
    };

    //3. 加载评论
    var loadCommentBlock = function(data) {
        var container = post.find('[data-type="comment-container"]');
        container.empty();
        $.each(data, function(index, item) {
            container.append(getCommet(item));
        });
    };

    //添加回复人
    var appendReplyTo = function(user) {
        var replyTo = $(
            '<div data-reply-to data-id="' + user.from_uid + '">回复： \n' +
            '	<a href="#">' + user.from_uname + '</a>\n' +
            '	<span class="pull-right" data-remove style="cursor: pointer;"><i class="material-icons">clear</i></span>\n' +
            '</div>'
        );
        post.find('[data-reply-to]').remove();
        post.find('[data-type="reply"]').prepend(replyTo);

        replyTo.find('[data-remove]').click(function() {
            replyTo.remove();
        });
    };

    //获取单挑评论
    var getCommet = function(data) {
        var comment = $(
            '<div data-type="comment">\n' +
            '	<div class="user-block">\n' +
            '		<img class="img-circle img-bordered-sm" src="' + ImageURLPrefix + data.from_uimage + '">\n' +
            '				<span class="username">\n' +
            '					<a href="#">' + data.from_uname + '</a>\n' +
            '				</span>\n' +
            '		<span class="description">' + formatDatetime(data.datetime) + ' </span>\n' +
            '	</div>\n' +
            '	<p data-comment-name="content" style="padding: 10px;"></p>\n' +
            '</div>'
        );

        if (data.type == 1) {
            // 普通回复
            comment.find('[data-comment-name="content"]').append(data.content);
        } else if (data.type == 2) {
            // 回复用户
            console.log(1111);
            var toUser = $('<span data-comment-toid="' + data.to_uid + '" style="color: #2962ff; cursor: pointer; padding-right: 15px;">@ ' + data.to_uname + '</span>');
            comment.find('[data-comment-name="content"]').append(toUser);
            comment.find('[data-comment-name="content"]').append(data.content);
        } else {
            console.log('error');
        }

        //选项按钮
        var getMenuData = function(authority) {
            return [{
                    name: '回复',
                    action: function() {
                        appendReplyTo(data);
                    }
                },
                {
                    name: '举报',
                    action: function() {

                    }
                }
            ];
        };
        var btnMenu = createMenu(getMenuData()).addClass('pull-right');
        btnMenu.find('[data-toggle="dropdown"]').css({
            'color': '#97a0b3',
            'margin-right': '5px'
        });
        comment.find('.username').append(btnMenu);

        /*
        var btnLike = $('<a href="#" class="pull-right btn-box-tool" style="padding: 0;"><i class="material-icons">' + (data.islike == 1 ? 'favorite' : 'favorite_border') + '</i></a>');
        comment.find('.username').append(btnLike);
        */
        return comment;
    };

    //动态加载
    var ajaxReloadComment = function(data) {
        $.ajax({
            url: URL_LOAD_COMMENT + data.id,
            type: "GET",
            dataType: 'json',
            success: function(comments) {
                if (!Array.isArray(comments)) {
                    console.log(result, '错误');
                } else {
                    loadCommentBlock(comments);

                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    };


    /*
    	'<div data-type="reply-to">@ \n' +
    	'	<a href="#" data-type="reply-name">张英航</a>\n' +
    	'	<a href="#" class="pull-right btn-box-tool" style="padding: 0;"><i class="material-icons">clear</i></a>\n' +
    	'</div>'
    */
    //4. 加载回复栏
    var loadReplyBlock = function(data) {
        var reply = post.find('[data-type="reply"]');
        reply.empty();
        var textarea = $(
            '<div>\n' +
            '	<textarea rows=5 placeholder="请输入评论..." style="width:100%; resize: none;"></textarea>\n' +
            '	<a class="btn btn-primary pull-right" data-atcion="submit">提交</a>\n' +
            '	<div class="clearfix"></div>\n' +
            '</div>'
        );

        textarea.find('[data-atcion="submit"]').click(function() {
            var text = textarea.find('textarea').val();
            var to_id = reply.find('[data-reply-to]').attr('data-id');

            makeComments(data.id, text, (to_id ? 2 : 1), to_id, function() {
                ajaxReloadComment(data);
            });
            loadReplyBlock(data);
        });

        reply.append(textarea);
    };

    //加载动态
    var loadPost = function(data) {
        loadUserBlock(data);
        loadContentBlock(data);
        ajaxReloadComment(data);
        //loadCommentBlock(data);
        loadReplyBlock(data);
    };

    //ajax加载
    this.ajaxLoadPost = function(id) {
        $.ajax({
            url: URL_GET_POST + id,
            type: "GET",
            dataType: 'json',
            success: function(data) {
                if (data == 0) {
                    console.log(data, '错误');
                } else {
                    loadPost(data);
                    post.modal('show');
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    };

    //初始化
    (function() {
        post.on('hidden.bs.modal', function() {
            $(this).remove();
        });
        appendToTopBtn();
    })();
};


var PostDraft = function(data) {
    var post = $(
        '<div class="post">\n' +
        '	<div class="user-block">\n' +
        '		<img class="img-circle img-bordered-sm" data-name="userimage">\n' +
        '				<span class="username">\n' +
        '					<a href="#" data-name="username"></a>\n' +
        '				</span>\n' +
        '		<span class="description" data-name="posttime"></span>\n' +
        '	</div>\n' +
        '	<div data-name="title">\n' +
        '		<a href="#" data-name="posttile"></a>\n' +
        '	</div>\n' +
        '	<div data-name="content">\n' +
        '	</div>\n' +
        '	<div style="margin-top: 10px;" class="post_category"><i class="fa fa-tasks margin-r-5" title="动态类别"></i><span data-name="category"></span></div>\n' +
        '	<div class="post_tags"><i class="fa fa-tags margin-r-5" title="动态话题"></i><span data-name="tag"></span></div>\n' +
        '	<div class="row divider"></div>\n' +
        '	<ul class="list-inline">\n' +
        '	</ul>\n' +
        ' <div class="clearfix"></div>\n' +
        '</div>'
    );

    //加载动态
    var reloadPost = function(data) {
        data.content = changeImageURL(data.content);
        //console.log(data);
        if (data.top == 1) {
            post.addClass("color_post");
        }
        if (data.role == 1) {
            //用户动态
            post.attr('data-id', data.uid);
            post.find('[data-name="userimage"]').attr('src', ImageURLPrefix + data.uimage);
            post.find('[data-name="username"]').attr('href', URL_RENDER_TO_INDIVIDUAL + data.uid).text(data.uname);
        } else if (data.role == 2) {
            //群组动态
            post.attr('data-id', data.gid);
            post.find('[data-name="userimage"]').attr('src', ImageURLPrefix + data.gimage);
            post.find('[data-name="username"]').attr('href', URL_REDNER_TO_GROUP + data.gid).text(data.gname);
        } else {
            console.log('error');
        }

        post.find('[data-sharedwith]').remove();
        var sharedWith = $('<span data-sharedwith><i class="fa fa-caret-right"></i></span>');
        sharedWith.append('草稿');
        post.find('.username').append(sharedWith);
        //加载时间
        post.find('[data-name="posttime"]').text(formatDatetime(data.datetime));


        //选项按钮
        var getMenuData = function(hasAuthority) {
            var actionMap;
            actionMap = [{
                name: '编辑',
                action: function() {
                    var PController = new PostController();
                    if (data.role == 1) {
                        PController.createIndividualPost(data.refer_id, data);
                    } else {
                        PController.createGroupPost(data.refer_id, data);
                    }

                }
            }, {
                name: '删除',
                action: function() {
                    deletePostDraft(data.id, function() {
                        location.reload();
                    });
                }
            }];
            return actionMap;
        };
        post.find('.username .dropdown').remove();
        var btnMenu = createMenu(getMenuData(data.hasAuthority)).addClass('pull-right');
        btnMenu.find('[data-toggle="dropdown"]').css({
            'color': '#97a0b3',
            'margin-right': '5px',
            'margin-left': '10px'
        });
        post.find('.username').append(btnMenu);

        //查看详情
        post.find('.username [data-opennew]').remove();
        btnOpen = $('<a href="#" class="pull-right btn-box-tool" style="padding: 0;" data-opennew><i class="material-icons">open_in_new</i></a>');
        post.find('.username').append(btnOpen);
        btnOpen.click(function() {
            var PController = new PostController();
            if (data.role == 1) {
                PController.createIndividualPost(data.refer_id, data);
            } else {
                PController.createGroupPost(data.refer_id, data);
            }
        });

        //加载category数据
        post.find('[data-name="category"]').empty();
        if (!Array.isArray(data.category) || data.category.length == 0) {
            post.find('[data-name="category"]').append('暂无');
        } else {
            $.each(data.category, function(i, g) {
                post.find('[data-name="category"]').append('<span class="label category-label" style="margin-left: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
            });
        }

        //加载tag
        post.find('[data-name="tag"]').empty();
        if (!Array.isArray(data.tags) || data.tags.length == 0) {
            post.find('[data-name="tag"]').append('暂无');
        } else {
            $.each(data.tags, function(i, g) {
                post.find('[data-name="tag"]').append('<span class="label tag-label" style="margin-left: 5px; background-color: ' + googleColorRandomPicker() + ';">' + g + '</span>');
            });
        }


        post.find('.category-label').on('click', function() {
            var value = $(this).text();
            window.location.href = URLPrefix + '/user/home/search/?q=' + value;
        });

        post.find('.tag-label').on('click', function() {
            var value = $(this).text();
            window.location.href = URLPrefix + '/user/home/search/?q=' + value;
        });

        //标题
        post.find('[data-name="posttile"]').text(data.title);

        //内容
        post.find('[data-name="content"]').empty();
        if (data.type == 1) {
            //普通动态
            //加载标题
            // 内容
            var warpContent = $('<div>' + data.content + '</div>');

            //changeImageURL(warpContent);
            if (warpContent.find('img').length > 0) {
                console.log(11);
                post.find('[data-name="content"]').append(
                    '<div class="row" style="max-height: 500px; overflow: hidden;">\n' +
                    '	<img src="' + $(warpContent.find('img')[0]).attr('src') + '"class="img-responsive" data-name="postimage">\n' +
                    '</div>'
                );
            } else {
                post.find('[data-name="content"]').append(warpContent);
                //加载limscroll
                post.find('[data-name="content"]').css({
                    'max-height': '450px',
                    'overflow': 'hidden'
                });

            }

            $(post.find('[data-name="posttile"]')).click(function() {
                var PController = new PostController();
                if (data.role == 1) {
                    PController.createIndividualPost(data.refer_id, data);
                } else {
                    PController.createGroupPost(data.refer_id, data);
                }
            });
        } else {
            console.log('error')
        }



        /* 底端菜单栏 */
        //是否允许被分享
        post.find('.list-inline').empty();
    };



    //初始化
    (function() {
        reloadPost(data);
    })();
    return post;
};


var SharePostController = function() {
    var modal = $(
        '<div class="modal fade">\n' +
        '	<div class="modal-dialog">\n' +
        '		<div class="modal-content">\n' +
        '			<div class="modal-header">\n' +
        '				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '				<h5 class="modal-title">\n' +
        '					<img data-name="image" style="width: 50px;height: 50px; padding: 2px; border: 2px solid #d2d6de;border-radius: 50%;"/>\n' +
        '					<b class="fa fa-caret-right" style="font-size: 16px; margin-left:5px;"></b>\n' +
        '					<a href="javascript:void(0);" data-action="sharedwith"><i class="fa fa-globe"></i></a>\n' +
        '					<span data-target="sharewith" data-value=""></span>\n' +
        '				</h5>\n' +
        '			</div>\n' +
        '			<div class="modal-body">\n' +
        '				<textarea data-newcomment placeholder="请输入转发评论..." rows=3 style="width: 100%; resize: none;"></textarea>\n' +
        '			</div>\n' +
        '			<div class="modal-footer">\n' +
        '				<a data-action="submit">提交</a>\n' +
        '				<a data-dismiss="modal">关闭</a>\n' +
        '			</div>\n' +
        '		</div>\n' +
        '	</div>\n' +
        '</div>'
    );

    var sharedWith = {
        role: '',
        authority: '',
        authority_ids: [],
        authority_tags: []
    };

    var setSharedWith = function(role, authority, authority_tags, authority_ids) {
        sharedWith.role = role;
        sharedWith.authority = authority;
        sharedWith.authority_tags = authority_tags;
        sharedWith.authority_ids = authority_ids;

        displaySharedWith();
    };

    var getShareWith = function() {
        return sharedWith;
    };


    var displaySharedWith = function() {
        var target = modal.find('[data-target="sharewith"]');
        if (sharedWith.role == 1) {
            var textMap = [
                '',
                '公开',
                '朋友圈',
                '自定义',
                '自定义',
                '私有'
            ];
            target.text(textMap[sharedWith.authority]);
            // something else
        } else if (sharedWith.role == 2) {
            var textMap = [
                '',
                '公开',
                '仅群成员可见'
            ];
            target.text(textMap[sharedWith.authority]);
        } else {
            console.log('error');
        }
    };


    //分享新动态
    this.createSharePost = function(pid) {
        //加载用户信息
        $.ajax({
            url: URL_GET_CURRENT_USER,
            type: "GET",
            dataType: 'json',
            success: function(user) {
                if (user == 0) {
                    callAlert('加载失败！', '<i class="material-icons">error_outline</i>', function() {});
                } else {
                    modal.find('[data-name="image"]').prop('src', ImageURLPrefix + user.image);

                    // 初始化群组分享范围
                    setSharedWith(1, 1, [], []);
                    modal.find('[data-action="sharedwith"]').on('click', function() {
                        var dataShareWith = getShareWith();
                        var SWModal = new SharedWithModal(user.id);
                        SWModal.ajaxLoadForIndividual(dataShareWith.authority, dataShareWith.authority_tags, dataShareWith.authority_ids, function(data, modal) {
                            setSharedWith(1, data.type, data.selectedTag, data.selectedUser);
                            modal.modal('hide');
                        });
                    });

                }
            },
            error: function(err) {
                callAlert('加载失败！', '<i class="material-icons">error_outline</i>', function() {});
            }
        });

        //submit
        modal.find('[data-action="submit"]').click(function() {
            var sharedWith = getShareWith();
            var content = modal.find('textarea').val();
            $.ajax({
                url: URL_SHARE_POST,
                data: {
                    role: sharedWith.role,
                    type: 2,
                    authority: sharedWith.authority,
                    authority_tags: JSON.stringify(sharedWith.authority_tags),
                    authority_ids: JSON.stringify(sharedWith.authority_ids),
                    content: content,
                    sharepid: pid
                },
                type: "GET",
                dataType: 'json',
                success: function(result) {
                    if (result == 0) {
                        callAlert('错误 ！', '<i class="material-icons">clear</i>', function() {});
                    } else {
                        callAlert('成功！', '<i class="material-icons">done</i>', function() {
                            location.reload();
                        });
                    }
                },
                error: function(err) {
                    console.log(err);
                }
            });
        });

        modal.modal('show');
    };

    // 修改分享动态
    this.modifySharePost = function(pid) {
        //加载post
        $.ajax({
            url: URL_GET_POST + pid,
            type: "GET",
            dataType: 'json',
            success: function(post) {
                if (post == 0) {
                    callAlert('加载失败！', '<i class="material-icons">error_outline</i>', function() {});
                } else {
                    if (post.role == 1) {
                        // 用户分享
                        modal.find('[data-name="image"]').prop('src', ImageURLPrefix + post.uimage);
                        setSharedWith(post.role, post.authority, post.authority_tags, post.authority_ids);
                        modal.find('textarea').val(post.content);
                        modal.find('[data-action="sharedwith"]').on('click', function() {
                            var dataShareWith = getShareWith();
                            var SWModal = new SharedWithModal(post.uid);
                            SWModal.ajaxLoadForIndividual(dataShareWith.authority, dataShareWith.authority_tags, dataShareWith.authority_ids, function(data, modal) {
                                setSharedWith(1, data.type, data.selectedTag, data.selectedUser);
                                modal.modal('hide');
                            });
                        });
                    } else if (post.role == 2) {
                        //群组分享
                        console.log('群组分享借口')
                    } else {
                        console.log('error');
                    }
                }
            },
            error: function(err) {
                callAlert('加载失败！', '<i class="material-icons">error_outline</i>', function() {});
            }
        });

        //submit
        modal.find('[data-action="submit"]').click(function() {
            var sharedWith = getShareWith();
            var content = modal.find('textarea').val();
            $.ajax({
                url: URL_UPDATE_POST,
                data: {
                    pid: pid,
                    role: sharedWith.role,
                    authority: sharedWith.authority,
                    authority_tags: JSON.stringify(sharedWith.authority_tags),
                    authority_ids: JSON.stringify(sharedWith.authority_ids),
                    content: content
                },
                type: "GET",
                dataType: 'json',
                success: function(result) {
                    if (result == 0) {
                        callAlert('错误 ！', '<i class="material-icons">clear</i>', function() {});
                    } else {
                        callAlert('成功！', '<i class="material-icons">done</i>', function() {
                            location.reload();
                        });
                    }
                },
                error: function(err) {
                    console.log(err);
                }
            });
        });

        modal.modal('show');
    };


    (function() {
        modal.on('hidden.bs.modal', function() {
            $(this).remove();
        });
    })();
};


//分享范围
var SharedWithModal = function(id) {
    var obj = this;
    var modal = $(
        '<div class="modal fade shared-with">\n' +
        '	<div class="modal-dialog">\n' +
        '		<div class="modal-content">\n' +
        '			<div class="modal-header">\n' +
        '				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '				<h5 class="modal-title">\n' +
        '					请选择分享范围\n' +
        '				</h5>\n' +
        '			</div>\n' +
        '			<div class="modal-body">\n' +
        '				<div class="form-group">\n' +
        '				</div>\n' +
        '			</div>\n' +
        '			<div class="modal-footer">\n' +
        '				<a data-action="submit">提交</a>\n' +
        '				<a data-dismiss="modal">关闭</a>\n' +
        '			</div>\n' +
        '		</div>\n' +
        '	</div>\n' +
        '</div>'
    );


    //获取简单Label
    var getLabel = function(data) {
        var label = $(
            '<label>\n' +
            '	<input type="radio" name="r1" class="minimal" value=' + data.value + '>\n' +
            '	<span>' + data.icon + ' ' + data.name + '</span>\n' +
            '</label>'
        );

        return label;
    };

    //获取collapse
    var getCollapse = function(data, selectedTag, selectedUser) {

        var collapse = $(
            '<div class="panel-body collapse">\n' +
            '</div>'
        );

        collapse.empty();
        //标签模块
        $.each(data, function(index, item) {
            var label = $(
                '<label data-type="tag">\n' +
                '	<input type="checkbox" name="c1" class="minimal"  data-id="' + item.name + '">\n' +
                '	<span><i class="fa fa-tag"></i> ' + item.name + '</span>\n' +
                '	<span class="pull-right"<a href="javascript: void(0);" data-action="checklist" style="margin-right:10px;color: #3c8dbc;">查看</a></span>\n' +
                '</label>'
            );

            if (selectedTag.includes(item.name))
                label.find('input').prop('checked', true);

            label.find('[data-action="checklist"]').on('click', function(ev) {
                ev.stopImmediatePropagation()
                $.ajax({
                    url: URL_GET_USERS_IN_FRIEND_TAG,
                    data: {
                        name: item.name
                    },
                    type: "GET",
                    dataType: 'json',
                    success: function(result) {
                        if (result === '0') {
                            callAlert('失败！', '<i class="material-icons">clear</i>', function() {});
                        } else {
                            var FTController = new FriendTagController(id);
                            FTController.ajaxLoad(
                                result,
                                function(data, modal) {
                                    $.ajax({
                                        url: URL_ADD_USERS_TO_FRIEND_TAG,
                                        data: {
                                            name: item.name,
                                            uids: JSON.stringify(data)
                                        },
                                        type: "GET",
                                        dataType: 'json',
                                        success: function(result) {
                                            if (result == 0) {
                                                callAlert('失败！', '<i class="material-icons">clear</i>', function() {});
                                            } else {

                                                modal.modal('hide');
                                            }
                                        },
                                        error: function(err) {
                                            console.log(err);
                                        }
                                    });
                                }
                            );


                        }
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            });

            collapse.append(label);
        });

        //加载被选中数据
        var loadSelectedUser = function(data) {
            nameList.empty();
            $.each(data, function(index, uid) {
                $.ajax({
                    url: URL_GET_INDIVIDUAL_INSTANCE + uid,
                    type: "GET",
                    dataType: 'json',
                    success: function(user) {
                        if (data == 0) {
                            console.log(data, '错误');
                        } else {

                            var u = $('<span class="user-label" user-id="' + user.id + '" user-image="' + user.image + '" user-bg="' + user.bg_image + '">' + user.name + '</span>');
                            nameList.append(u);
                        }
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            });
        };

        //获取被选中用户数据
        var getSelectedUser = function() {
            var result = [];

            $.each(selectLabel.find('.user-label'), function(index, item) {
                console.log(index);
                result.push({
                    id: $(item).attr('user-id'),
                    name: $(item).text(),
                    image: $(item).attr('user-image'),
                    bg_image: $(item).attr('user-bg')
                });
            });

            return result;
        };

        var getSelectedUID = function() {
            var result = [];

            $.each(selectLabel.find('.user-label'), function(index, item) {
                console.log(index);
                result.push($(item).attr('user-id'));
            });

            return result;
        };


        //用户选定模块
        var selectLabel = $(
            '	<label>\n' +
            '		<span><a href="#"><i class="fa fa-plus-circle"></i> 从好友中选取</a></span>\n' +
            '		<div class="name-list"></div>\n' +
            '	</label>'
        );

        var nameList = selectLabel.find('.name-list');
        loadSelectedUser(selectedUser);
        collapse.append(selectLabel);

        //点击事件
        selectLabel.click(function() {
            var FTController = new FriendTagController(id);
            FTController.ajaxLoad(
                getSelectedUser(),
                function(data, modal) {
                    //console.log(1);
                    //console.log(data);
                    callConfirm('新建标签', '您是否要创建一个新的标签？',
                        function() {
                            // 不创建标签
                            singleLineInput('创建新标签', '请输入您要创建的新标签名称', function(tagTitle) {
                                console.log(data);
                                $.ajax({
                                    url: URL_CREATE_FRIEND_TAG,
                                    data: {
                                        name: tagTitle
                                    },
                                    type: "GET",
                                    dataType: 'json',
                                    success: function(result) {
                                        if (result == 0) {
                                            callAlert('添加标签失败！', '<i class="material-icons">clear</i>', function() {});
                                        } else if (result == 1) {
                                            callAlert('已存在！', '<i class="material-icons">clear</i>', function() {});
                                        } else if (result == 2) {
                                            var idList = [];
                                            $.each(data, function(index, user) {
                                                idList.push(user);
                                            });
                                            $.ajax({
                                                url: URL_ADD_USER_TO_FRIEND_TAG,
                                                data: {
                                                    uids: JSON.stringify(idList),
                                                    name: tagTitle
                                                },
                                                type: "GET",
                                                dataType: 'json',
                                                success: function(result) {
                                                    if (result == 0) {
                                                        callAlert('添加标签失败！', '<i class="material-icons">clear</i>', function() {});
                                                    } else if (result == 1) {
                                                        callAlert('添加成功！', '<i class="material-icons">done</i>', function() {
                                                            appendToCollapse(tagTitle, tagTitle);
                                                            clearSelectedUserTag();
                                                            modal.modal('hide');
                                                        });
                                                    }
                                                },
                                                error: function(err) {
                                                    console.log(err);
                                                }
                                            });
                                        }
                                    },
                                    error: function(err) {
                                        console.log(err);
                                    }
                                });
                            });
                        },
                        function() {
                            console.log(data);
                            // 创建标签
                            loadSelectedUser(data);
                            modal.modal('hide');
                        }
                    );
                }
            );
        });

        return collapse;
    };

    var appendToCollapse = function(tid, name) {
        $.each(modal.find('.collapse'), function(index, collapse) {
            var label = $(
                '<label data-type="tag">\n' +
                '	<input type="checkbox" name="c1" class="minimal"  data-id="' + tid + '" checked>\n' +
                '	<span><i class="fa fa-tag"></i> ' + name + '</span>\n' +
                '	<span class="pull-right"<a href="javascript: void(0);" data-action="checklist" style="margin-right:10px;color: #3c8dbc;">查看</a></span>\n' +
                '</label>'
            );

            label.find('[data-action="checklist"]').on('click', function(ev) {
                ev.stopImmediatePropagation()
                $.ajax({
                    url: URL_GET_USERS_IN_FRIEND_TAG,
                    data: {
                        name: name
                    },
                    type: "GET",
                    dataType: 'json',
                    success: function(result) {
                        if (result === '0') {
                            callAlert('失败！', '<i class="material-icons">clear</i>', function() {});
                        } else {
                            var FTController = new FriendTagController(id);
                            FTController.ajaxLoad(
                                result,
                                function(data, modal) {
                                    $.ajax({
                                        url: URL_ADD_USERS_TO_FRIEND_TAG,
                                        data: {
                                            name: name,
                                            uids: JSON.stringify(data)
                                        },
                                        type: "GET",
                                        dataType: 'json',
                                        success: function(result) {
                                            if (result == 0) {
                                                callAlert('失败！', '<i class="material-icons">clear</i>', function() {});
                                            } else {

                                                modal.modal('hide');
                                            }
                                        },
                                        error: function(err) {
                                            console.log(err);
                                        }
                                    });
                                }
                            );


                        }
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            });



            $(collapse).prepend(label);
            label.iCheck({
                checkboxClass: 'icheckbox_minimal-blue'
            });
        });
    };

    var clearSelectedUserTag = function() {
        modal.find('.name-list').empty();
    }

    //获取数据
    var getData = function() {
        var result = {
            type: '',
            selectedTag: [],
            selectedUser: []
        };

        result.type = modal.find('[name="r1"]:checked').val();

        if (result.type == 3 || result.type == 4) {
            var collapse = modal.find('.collapse[data-target="' + result.type + '"]');

            $.each(collapse.find('[data-type="tag"] input:checked'), function(index, item) {
                result.selectedTag.push($(item).attr('data-id'));
            });

            $.each(collapse.find('.user-label'), function(index, item) {
                result.selectedUser.push($(item).attr('user-id'));
            });
        };

        return result;
    };

    //群组菜单
    this.loadForGroup = function(id, type, callback) {
        //群组菜单
        var groupData = [{
                name: '公开',
                icon: '<i class="fa fa-globe"></i>',
                value: 1
            },
            {
                name: '仅群组可见',
                icon: '<i class="fa fa-eye-slash"></i>',
                value: 2
            }
        ];

        var container = modal.find('.modal-body .form-group');
        container.empty();
        $.each(groupData, function(index, item) {
            var label = getLabel(item);
            container.append(label);

            if (type == item.value)
                label.find('input').prop('checked', true);
        });

        //submit
        modal.find('[data-action="submit"]').unbind('click');
        modal.find('[data-action="submit"]').click(function() {
            callback(getData(), modal);
        });

        modal.modal('show');
    };

    //ajax为个人添加
    this.ajaxLoadForIndividual = function(type, selectedTag, selectedUser, callback) {
        $.ajax({
            url: URL_GET_FRIEND_TAG,
            type: "GET",
            dataType: 'json',
            success: function(tag) {
                if (!Array.isArray(tag)) {
                    callAlert('加载标签失败！', '<i class="material-icons">clear</i>', function() {});
                } else {
                    loadForIndividual(type, selectedTag, selectedUser, tag, callback);
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    };

    //为个人添加
    var loadForIndividual = function(type, selectedTag, selectedUser, tagList, callback) {
        //个人数据
        var individualData = [{
                name: '公开',
                icon: '<i class="fa fa-globe"></i>',
                value: 1
            },
            {
                name: '朋友圈',
                icon: '<i class="fa fa-user-circle-o"></i></i>',
                value: 2
            },
            {
                name: '部分可见',
                icon: '<i class="fa fa-plus-square"></i>',
                value: 3
            },
            {
                name: '不可见',
                icon: '<i class="fa fa-minus-square"></i>',
                value: 4
            },
            {
                name: '私有',
                icon: '<i class="fa fa-eye-slash"></i>',
                value: 5
            }
        ];

        var container = modal.find('.modal-body .form-group');
        container.empty();
        $.each(individualData, function(index, item) {
            var label = getLabel(item).addClass('toggle-btn');
            container.append(label);

            var collapse;
            if (item.value == 3 || item.value == 4) {
                if (item.value == type) {
                    collapse = getCollapse(tagList, selectedTag, selectedUser);
                    collapse.addClass('in');
                } else
                    collapse = getCollapse(tagList, [], []);

                label.attr('data-target', item.value);

                collapse.attr('data-target', item.value)
                    .addClass('toggle-content');
            }
            container.append(collapse);

            if (type == item.value)
                label.find('input').prop('checked', true);


        });

        //点击互斥时间
        container.find('.toggle-btn').click(function() {
            var value = $(this).attr('data-target');
            $.each(container.find('.toggle-content'), function(index, item) {
                var collapse = $(item);
                if (collapse.attr('data-target') == value) {
                    collapse.collapse('show');
                } else {
                    collapse.collapse('hide');
                }
            });
        });



        //submit
        modal.find('[data-action="submit"]').unbind('click');
        modal.find('[data-action="submit"]').click(function() {
            callback(getData(), modal);
        });

        modal.modal('show');
    };



    //初始化
    (function() {

        modal.on('hidden.bs.modal', function() {
            $(this).remove();
        }).on('shown.bs.modal', function() {
            $(this).find('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
                checkboxClass: 'icheckbox_minimal-blue',
                radioClass: 'iradio_minimal-blue'
            });
        });

    })();
};



var FriendTagController = function(id) {
    var obj = this;
    TwinRow.call(this, '好友名单');

    var modal = this.getTwinRow();

    //获取卡片
    var getCard = function(data, place) {
        var card = getHoverUserCard(data);
        card.attr('allowremove', '');
        card.attr('allowsearch', '');
        if (place == 1) {
            card.find('.card-hover').html('<i class="material-icons">add_circle_outline</i>');
        } else if (place == 2) {
            card.find('.card-hover').html('<i class="material-icons">clear</i>');
        } else {
            console.log('error');
        }

        var top = modal.find('.row-top');
        var bot = modal.find('.row-bot');
        card.click(function() {
            if (card.closest('.row-top').length == 1) {
                card.find('.card-hover').html('<i class="material-icons">clear</i>');
                obj.prependBot(card);
            } else if (card.closest('.row-bot').length == 1) {
                card.find('.card-hover').html('<i class="material-icons">add_circle_outline</i>');
                obj.prependTop(card);
            } else {
                console.log('error');
            }
        });

        return card;
    };

    var getCardList = function(list, place) {
        var result = [];
        $.each(list, function(index, item) {
            result.push(getCard(item, place));
        });

        return result;
    };

    var getDifferent = function(list1, list2) {
        var result = [];

        $.each(list1, function(idx1, item1) {
            var signal = true;
            $.each(list2, function(idx2, item2) {
                if (item1.id == item2.id) {
                    signal = false;
                    return false;
                }
            });
            if (signal)
                result.push(item1);
        });

        return result;
    };

    //添加submit事件
    var bindSubmit = function(callback) {
        modal.find('[data-action=submit]').unbind('click');
        modal.find('[data-action=submit]').click(function() {
            callback(getValueListOfObjects(obj.getData(), 'id'), modal);
        })
    };

    //加载数据
    var load = function(dataTop, dataBot, callback) {
        var listTop = getCardList(getDifferent(dataTop, dataBot), 1);
        var listBot = getCardList(dataBot, 2);

        bindSubmit(callback);
        obj.reload(listTop, listBot);
    };

    //ajax加载
    this.ajaxLoad = function(dataBot, callback) {
        $.ajax({
            url: URL_GET_FRIEND + id,
            type: "GET",
            dataType: 'json',
            success: function(list) {
                if (!Array.isArray(list)) {
                    callAlert('加载失败!', '<i class="material-icons">clear</i>', function() {});
                } else {
                    load(list, dataBot, callback);
                }
            },
            error: function(err) {
                callAlert('添加失败!', '<i class="material-icons">clear</i>', function() {});
            }
        });
    };
};

var getHoverUserCard = function(data) {
    var card = $(
        '<div class="col-lg-2 col-md-4 col-sm-6" data-id="' + data.id + '">\n' +
        '	<div class="card-user" style="background-color: ' + googleColorRandomPicker() + ';">\n' +
        '		<div class="card-user-header" style="background: url(\'' + ImageURLPrefix + data.bg_image + '\') no-repeat center center; height: 90px;">\n' +
        '			<div class="clearfix"></div>\n' +
        '			<div style="text-align: center; margin-top: 40px;">\n' +
        '				<img src="' + ImageURLPrefix + data.image + '" class="img-circle" style="width: 40px;height: 40px;">\n' +
        '			</div>\n' +
        '		</div>\n' +
        '		<div class="card-user-body" style="height: 80px;">\n' +
        '			<div class="name" style="inline-height: 80px;" data-name="name">' + data.name + '</div>\n' +
        '		</div>\n' +
        '		<div class="card-hover"></div>\n' +
        '	</div>\n' +
        '</div>'
    );
    return card;
};



//获取动态编辑菜单
var getPostMenu = function(id, authority, top) {
    var getMenuData = function(authority) {
        var data = [];
        if (authority == 1 && top == 1) {
            data.push({
                name: '修改',
                action: function() {
                    modifyPost(id);
                }
            });
            data.push({
                name: '删除',
                action: function() {
                    deletePost(id, function() {
                        location.reload();
                    });
                }
            });
            data.push({
                name: '置顶',
                action: function() {
                    putPostTop(id, 1);
                }
            });
            data.push({
                name: '取消置顶',
                action: function() {
                    putPostTop(id, 0);
                }
            });
        } else if (authority == 1 && top == 0) {
            data.push({
                name: '修改',
                action: function() {
                    modifyPost(id);
                }
            });
            data.push({
                name: '删除',
                action: function() {
                    deletePost(id, function() {
                        location.reload();
                    });
                }
            });
            data.push({
                name: '置顶',
                action: function() {
                    putPostTop(id, 1);
                }
            });
        } else {
            data.push({
                name: '举报',
                action: function() {

                }
            });
        }

        return data;
    };

    var btnMenu = createMenu(getMenuData(authority)).addClass('pull-right');
    btnMenu.find('[data-toggle="dropdown"]').css({
        'color': '#97a0b3',
        'margin-right': '5px',
        'margin-left': '10px'
    });

    return btnMenu;
};

//删除动态
var deletePost = function(id, callback) {
    callConfirm('删除动态', '您确定要删除此动态？',
        function() {
            $.ajax({
                url: URL_DELETE_POST + id,
                type: "GET",
                dataType: 'json',
                success: function(result) {
                    if (result == 0) {
                        callAlert('删除失败！', '<i class="material-icons">clear</i>', function() {});
                    } else {
                        callAlert('删除成功！', '<i class="material-icons">done</i>', function() {
                            callback();
                        });
                    }
                },
                error: function(err) {
                    console.log(err);
                }
            });
        },
        function() {}
    )
};

var deletePostDraft = function(id, callback) {
    callConfirm('删除草稿', '您确定要删除此草稿？',
        function() {
            $.ajax({
                url: URL_DELETE_POST_DRAFT,
                type: "GET",
                dataType: 'json',
                data: {
                    id: id
                },
                success: function(result) {
                    if (result == 0) {
                        callAlert('删除失败！', '<i class="material-icons">clear</i>', function() {});
                    } else {
                        callAlert('删除成功！', '<i class="material-icons">done</i>', function() {
                            callback();
                        });
                    }
                },
                error: function(err) {
                    console.log(err);
                }
            });
        },
        function() {}
    )
};


// 修改动态
var modifyPost = function(id) {
    $.ajax({
        url: URL_GET_POST + id,
        type: "GET",
        dataType: 'json',
        success: function(data) {
            if (data == 0) {
                console.log(data, '错误');
            } else {
                var PController = new PostController();
                PController.editPost(data);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
};

//点赞or取消动态
var likePost = function(id, value, callback) {
    $.ajax({
        url: URL_LIKE_POST + id + '/' + value,
        type: "GET",
        dataType: 'json',
        success: function(result) {
            if (result === -1) {
                callAlert('错误 ！', '<i class="material-icons">clear</i>', function() {});
            } else {
                $("#like_id_" + id).text(result);
                callback();
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
};



var makeComments = function(url, id, text, type, to_uid, callback) {
    $.ajax({
        url: url,
        data: {
            id: id,
            content: text,
            type: type,
            to_uid: to_uid
        },
        type: "GET",
        dataType: 'json',
        success: function(result) {
            if (result == 0) {
                callAlert('错误 ！', '<i class="material-icons">clear</i>', function() {});
            } else {
                callback();
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
};

// 加载分享范围popover
var loadSharedDetails = function(target, tags, users, title) {
    target.css('cursor', 'pointer');
    //target.attr('title', (title == 3 ? '部分可见': '不可见'));
    var content = $(
        '<div>\n' +
        '	<p data-tags><span style="font-weight: 700; color: #777;"><i class="fa fa-group"></i> ：</span> </p>\n' +
        '	<p data-users><span style="font-weight: 700; color: #777;"><i class="fa fa-user-circle-o"></i> ：</span> </p>\n' +
        '</div>'
    );

    $.each(tags, function(index, tag) {
        content.find('[data-tags]').append('<span class="label" data-id="' + tag + '" style="margin-right: 5px; background-color: rgb(119, 143, 155);">' + tag + '</span>');
    });

    $.each(users, function(index, user) {
        $.ajax({
            url: URL_GET_INDIVIDUAL_INSTANCE + user,
            type: "GET",
            dataType: 'json',
            success: function(data) {
                if (data == 0) {
                    console.log(data, '错误');
                } else {
                    content.find('[data-users]').append('<span data-id="' + data.uid + '" style="margin-right: 5px; "><a href="' + URL_RENDER_TO_INDIVIDUAL + user + '">' + data.name + '</a></span>');
                }
            },
            error: function(err) {
                console.log(err);
            }
        });

    });

    target.popover({
        html: true,
        placement: 'right',
        content: content
    });
};


var PostControllerModal = function(refer_id, type) {

    var obj = this;
    var modal = $('<div class="modal fade">\n' +
        '	<div class="modal-dialog">\n' +
        '		<div class="modal-content">\n' +
        '			<div class="modal-header">\n' +
        '				<button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '				<h5 class="modal-title">\n' +
        '					<img data-name="image" style="width: 50px;height: 50px; padding: 2px; border: 2px solid #d2d6de;border-radius: 50%;"/>\n' +
        '					<b class="fa fa-caret-right" style="font-size: 16px; margin-left:5px;"></b>\n' +
        '					<a href="javascript:void(0);" data-action="sharedwith"><i class="fa fa-globe"></i></a>\n' +
        '					<span data-target="sharewith" data-value=""></span>\n' +
        '				</h5>\n' +
        '			</div>\n' +
        '			<div class="modal-body">\n' +
        '				<div class="form-group">\n' +
        '					<label>标题</label>\n' +
        '					<input name="title" class="form-control" placeholder="请输入标题">\n' +
        '				</div>\n' +
        '				<div class="editor-block" style="padding-bottom: 15px;"></div>\n' +
        '				<div class="form-group" data-name="allow-share-block">\n' +
        '						<label>允许被分享: </label>\n' +
        '						<label class="pull-right switch">\n' +
        '						<input name="allowshared" type="checkbox" checked>\n' +
        '							<div class="slider round"></div>\n' +
        '						</label>\n' +
        '				</div>\n' +
        '				<div class="form-group" data-name="tag-controller">\n' +
        '						<label>标签: </label>\n' +
        '						<a href="javascript:void(0);" class="pull-right" data-target="tags"><i class="fa fa-plus-square"></i></a>\n' +
        '						<div class="clearfix"></div>\n' +
        '						<p data-value="tags">\n' + '						</p>\n' + '				</div>\n' +
        '			</div>\n' + '			<div class="modal-footer">\n' +
        '				<a data-action="submit" style="font-size:18px;">发布</a>\n' +
        '				<a data-action="save" style="font-size:18px;" data-name="post-save-button">保存</a>\n' +
        '				<a data-dismiss="modal" style="font-size:18px;">关闭</a>\n' +
        '			</div>\n' + '		</div>\n' + '	</div>\n' + '</div>');

    var sharedWithData = {
        type: '1',
        authority_tags: [], // name
        authority_ids: []// id
    };

    var setSharedWithData = function(type, authority_tags, authority_ids) {
        sharedWithData.type = type;
        sharedWithData.authority_tags = authority_tags;
        sharedWithData.authority_ids = authority_ids;
    };

    var getSharedWithData = function() {
        return sharedWithData;
    };

    // 初始化
    (function() {
        // 加载编辑器
        modal.find('.editor-block').transWysiwyg();

        $(modal).find('[data-target="tags"]').on(
            'click',
            function() {
                var MController = new multiController('标签',
                    '<i class="material-icons">loyalty</i>');
                MController.load(getTag(), URL_GET_ALL_TAG, URL_ADD_TAG,
                    function(data) {
                        loadTag(data);
                    });
            });

        modal.on('hidden.bs.modal', function() {

            modal.find('.editor').empty();
            modal.find('[name="title"]').val("");
            modal.remove();
        });

    })();

    // 加载标题
    var loadTitle = function(title) {
        modal.find('[name="title"]').val(title);
    };

    // 获取标题
    var getTitle = function() {
        return modal.find('[name="title"]').val();
    };


    // 加载Tag数据
    var loadTag = function(list) {
        modal.find('[data-value="tags"]').empty();

        if (!Array.isArray(list)) {
            console.log('not a list');
        } else if (list.length == 0) {
            modal
                .find('[data-value="tags"]')
                .append(
                    '<span style="color: rgba(0,0,0,0.54); margin-left: 15px;">暂无</span>');
        } else {
            $.each(list, function(i, g) {
                modal.find('[data-value="tags"]').append(
                    '<span class="label" style="margin-right: 5px; background-color: ' +
                    googleColorRandomPicker() + ';">' + g +
                    '</span>');
            });
        }
    };

    // 获取tag数据
    var getTag = function() {
        var tags = [];
        $.each(modal.find('[data-value="tags"] .label'), function(index, item) {
            tags.push($(item).text());
        });
        return tags;
    };

    // 加载编辑器内容
    var loadContent = function(data) {
        console.log(data);
        modal.find('.editor-block').loadTransWysiwygData(data);
    };

    // 获取编辑器内容数据
    var getContent = function(id) {
        return modal.find('.editor-block').getTransWysiwygData(id);
    };

    // 获取allowshared
    var getAllowShared = function() {
        return modal.find('[type="checkbox"]').is(':checked') ? 1 : 0;
    };

    // 设置allowshared
    var loadAllowShared = function(checked) {
        console.log(checked);
        modal.find('[type="checkbox"]').prop('checked', checked);
    };

    // 加载分享范围
    var loadShareWith = function(type, role, sharedTag, sharedUser) {
        var target = modal.find('[data-target="sharewith"]');
        if (role == 1) {
            var textMap = ['', '公开', '朋友圈', '自定义', '自定义', '私有'];
            target.text(textMap[type]);
            setSharedWithData(type, sharedTag, sharedUser);
        } else if (role == 2) {
            var textMap = ['', '公开', '仅群成员可见'];
            target.text(textMap[type]);
            setSharedWithData(type, sharedTag, sharedUser);

        } else {
            console.log('error');
        }
    };

    var getShareWith = function() {
        return getSharedWithData();
    };

    
    // 发布群组动态
    this.createGroupPost = function(gid, pdata) {
        // 加载用户信息
        $.ajax({
            url: URL_GET_GROUP_INSTANCE + gid,
            type: "GET",
            dataType: 'json',
            success: function(result) {
                if (result == 0) {
                	messageAlert("获取数据失败， 请重新尝试","clear", function(){});
                } else {
                    modal.find('[data-name="image"]').prop('src',
                        ImageURLPrefix + result.image);
                }
            },
            error: function(err) {
            	messageAlert("获取数据失败， 请重新尝试","clear", function(){});
            }
        });

        // 分享动态初始值
        modal.find('[data-target="sharewith"]').attr('data-type', '1').text(
            '公开');

        // 初始化群组分享范围
        modal.find('[data-action="sharedwith"]').on(
            'click',
            function() {
                var dataShareWith = getShareWith();
                var SWModal = new SharedWithModal();
                SWModal.loadForGroup(gid, dataShareWith.type, function(
                    data, submodal) {
                    loadShareWith(data.type, 2, [], [])
                    submodal.modal('hide');
                })

            });

        var psid = "0";
        if (pdata == undefined) {
            psid = "0";
        } else {
            psid = pdata.id;
        }

        if (pdata !== undefined) {
            loadTitle(pdata.title);
            loadCategory(pdata.category);
            loadTag(pdata.tags);
            loadContent(pdata.content);
            loadAllowShared(pdata.allowShare);
            psid = pdata.id;
        }

        // 确定保存
        modal
            .find('[data-action="save"]')
            .on(
                'click',
                function() {
                    // 获取数据
                    var cate = getCategory();
                    var tags = getTag();

                    // 编辑器内容
                    var dataEditor = getContent(gid);

                    // var dataShareWith = getShareWith();

                    var post = {
                        gid: gid,
                        role: 2,
                        type: 1,
                        title: modal.find('[name="title"]').val(),
                        content: dataEditor.content,
                        category: JSON.stringify(cate),
                        tags: JSON.stringify(tags),
                        allowshare: (modal.find('[type="checkbox"]')
                            .is(':checked') ? 1 : 0),
                        images: dataEditor.images
                    };

                    if (post.content == "" || post.title == "") {
                    	messageAlert("动态的内容和标题不能为空","warning", function(){});
                        return false;
                    }

                    // 发布
                    $
                        .ajax({
                            url: URL_SAVE_POST,
                            data: post,
                            type: "POST",
                            dataType: 'json',
                            success: function(result) {
                                if (result == 0) {
                                	messageAlert("保存动态失败， 请重新尝试","clear", function(){});
                                } else {
                                	messageAlert("动态保存成功","done", function(){location.reload();});
                     
                                }
                            },
                            error: function(err) {
                            	messageAlert("请求出现异常， 请重新尝试","clear", function(){});
                            }
                        });
                });

        // 确定提交
        modal
            .find('[data-action="submit"]')
            .on(
                'click',
                function() {
                    // 获取数据
                    var cate = getCategory();
                    var tags = getTag();

                    // 编辑器内容
                    var dataEditor = getContent(gid);

                    var dataShareWith = getShareWith();

                    var post = {
                        gid: gid,
                        role: 2,
                        type: 1,
                        authority: dataShareWith.type,
                        title: modal.find('[name="title"]').val(),
                        content: dataEditor.content,
                        category: JSON.stringify(cate),
                        tags: JSON.stringify(tags),
                        allowshare: (modal.find('[type="checkbox"]')
                            .is(':checked') ? 1 : 0),
                        images: dataEditor.images,
                        lat: '0',
                        lng: '0',
                        psid: psid
                    };

                    if (post.content == "" || post.title == "") {
                    	messageAlert("动态的标题和内容不能为空","warning", function(){});
                        return false;
                    }

                    // 发布
                    $
                        .ajax({
                            url: URL_ADD_POST,
                            data: post,
                            type: "POST",
                            dataType: 'json',
                            success: function(result) {
                                if (result == 0) {
                                	messageAlert("动态发布失败， 请重新尝试","clear", function(){});
                                } else {
                                	messageAlert("动态发布成功","done", function(){ location.reload();});
                                }
                            },
                            error: function(err) {
                            	messageAlert("请求出现异常， 请重新尝试","clear", function(){});
                            }
                        });
                });

        modal.modal('show');
    };

    // 发布个人动态
    this.createIndividualPost = function(uid, pdata) {
        // 加载用户信息
        $.ajax({
            url: URL_GET_CURRENT_USER,
            type: "GET",
            dataType: 'json',
            success: function(user) {
                if (user == 0) {
                	messageAlert("请求出现异常， 请重新尝试","clear", function(){});
                } else {
                    modal.find('[data-name="image"]').prop('src',
                        ImageURLPrefix + user.image);

                    // 分享动态初始值
                    modal.find('[data-target="sharewith"]').attr('data-type',
                        '1').text('公开');

                    // 初始化群组分享范围
                    modal.find('[data-action="sharedwith"]').on(
                        'click',
                        function() {
                            var dataShareWith = getShareWith();
                            var SWModal = new SharedWithModal(user.id);
                            SWModal.ajaxLoadForIndividual(
                                dataShareWith.type,
                                dataShareWith.authority_tags,
                                dataShareWith.authority_ids,
                                function(
                                    data, modal) {
                                    loadShareWith(data.type, 1,
                                        data.selectedTag,
                                        data.selectedUser)
                                    modal.modal('hide');
                                });
                        });
                }
            },
            error: function(err) {
            	messageAlert("请求出现异常， 请重新尝试","clear", function(){});
            }
        });

        var psid = "0";
        if (pdata == undefined) {
            psid = "0";
        } else {
            psid = pdata.id;
        }

        if (pdata !== undefined) {
            loadTitle(pdata.title);
            loadCategory(pdata.category);
            loadTag(pdata.tags);
            loadContent(pdata.content);
            loadAllowShared(pdata.allowShare);
            psid = pdata.id;
        }

        // 确定保存
        modal
            .find('[data-action="save"]')
            .on(
                'click',
                function() {
                    // 获取数据
                    var cate = getCategory();
                    var tags = getTag();

                    // 编辑器内容
                    var dataEditor = getContent(uid);

                    var post = {
                        role: 1,
                        type: 1,
                        title: modal.find('[name="title"]').val(),
                        content: dataEditor.content,
                        category: JSON.stringify(cate),
                        tags: JSON.stringify(tags),
                        allowshare: (modal.find('[type="checkbox"]')
                            .is(':checked') ? 1 : 0),
                        images: dataEditor.images
                    };

                    if (post.content == "" || post.title == "") {
                    	messageAlert("请求出现异常， 请重新尝试","clear", function(){});
                        return false;
                    }
                    $
                        .ajax({
                            url: URL_SAVE_POST,
                            data: post,
                            type: "POST",
                            dataType: 'json',
                            success: function(result) {
                                if (result == 0) {
                                	messageAlert("请求出现异常， 请重新尝试","clear", function(){});
                                } else {
                                	messageAlert("请求出现异常， 请重新尝试","clear", function(){});
                                }
                            },
                            error: function(err) {
                            	messageAlert("请求出现异常， 请重新尝试","clear", function(){});
                            }
                        });
                });

        // 确定提交
        modal
            .find('[data-action="submit"]')
            .on(
                'click',
                function() {
                    // 获取数据
                    var cate = getCategory();
                    var tags = getTag();

                    // 编辑器内容
                    var dataEditor = getContent(uid);

                    // 分享范围
                    var dataShareWith = getShareWith();

                    var post = {
                        role: 1,
                        type: 1,
                        authority: dataShareWith.type,
                        authority_tags: JSON
                            .stringify(dataShareWith.authority_tags),
                        authority_ids: JSON
                            .stringify(dataShareWith.authority_ids),
                        title: modal.find('[name="title"]').val(),
                        content: dataEditor.content,
                        category: JSON.stringify(cate),
                        tags: JSON.stringify(tags),
                        allowshare: (modal.find('[type="checkbox"]')
                            .is(':checked') ? 1 : 0),
                        images: dataEditor.images,
                        lat: '0',
                        lng: '0',
                        psid: psid
                    };
                    if (post.authority == 3 || post.authority == 4) {
                        if (!(JSON.parse(post.authority_ids).length > 0 || JSON
                                .parse(post.authority_tags).length > 0)) {
                        	messageAlert("分享范围不能为空","warning", function(){});
                            
                            return false;
                        }
                    }

                    if (post.content == "" || post.title == "") {
                        callAlert(
                            '动态的标题和内容不能为空！',
                            '<i class="material-icons">error_outline</i>',
                            function() {});
                        return false;
                    }

                    // 发布
                    $
                        .ajax({
                            url: URL_ADD_POST,
                            data: post,
                            type: "POST",
                            dataType: 'json',
                            success: function(result) {
                                if (result == 0) {
                                    callAlert(
                                        '发布失败！',
                                        '<i class="material-icons">error_outline</i>',
                                        function() {});
                                } else {
                                    callAlert(
                                        '发布成功！',
                                        '<i class="material-icons">done</i>',
                                        function() {
                                            // modal.modal('hide');
                                            location.reload();
                                        });
                                }
                            },
                            error: function(err) {
                                callAlert(
                                    '发布失败！',
                                    '<i class="material-icons">error_outline</i>',
                                    function() {});
                            }
                        });
                });

        modal.modal('show');
    };

    this.editPost = function(data) {
        if (data.type == 1) {
            if (data.role == 1) {
                // 加载用户信息
                $
                    .ajax({
                        url: URL_GET_CURRENT_USER,
                        type: "GET",
                        dataType: 'json',
                        success: function(user) {
                            if (user == 0) {
                                callAlert(
                                    '加载失败！',
                                    '<i class="material-icons">error_outline</i>',
                                    function() {});
                            } else {
                                modal.find('[data-name="image"]').prop(
                                    'src', ImageURLPrefix + user.image);

                                // 分享动态初始值
                                loadTitle(data.title);
                                loadShareWith(data.authority, data.role,
                                    data.authority_tags,
                                    data.authority_ids);

                                // 初始化群组分享范围
                                modal
                                    .find('[data-action="sharedwith"]')
                                    .on(
                                        'click',
                                        function() {
                                            var dataShareWith = getShareWith();
                                            var SWModal = new SharedWithModal(
                                                user.id);
                                            SWModal
                                                .ajaxLoadForIndividual(
                                                    dataShareWith.type,
                                                    dataShareWith.authority_tags,
                                                    dataShareWith.authority_ids,
                                                    function(
                                                        data,
                                                        modal) {
                                                        loadShareWith(
                                                            data.type,
                                                            1,
                                                            data.selectedTag,
                                                            data.selectedUser)
                                                        modal
                                                            .modal('hide');
                                                    });
                                        });

                                loadContent(data.content);
                                loadCategory(data.category);
                                loadTag(data.tags);
                                loadAllowShared(data.allowShare);

                                // 确定提交
                                modal
                                    .find('[data-action="submit"]')
                                    .on(
                                        'click',
                                        function() {
                                            // 获取数据
                                            var cate = getCategory();
                                            var tags = getTag();

                                            // 编辑器内容
                                            var dataEditor = getContent(user.id);

                                            // 分享范围
                                            var dataShareWith = getShareWith();

                                            var post = {
                                                pid: data.pid,
                                                authority: dataShareWith.type,
                                                authority_tags: JSON
                                                    .stringify(dataShareWith.authority_tags),
                                                authority_ids: JSON
                                                    .stringify(dataShareWith.authority_ids),
                                                title: modal
                                                    .find(
                                                        '[name="title"]')
                                                    .val(),
                                                content: dataEditor.content,
                                                category: JSON
                                                    .stringify(cate),
                                                tags: JSON
                                                    .stringify(tags),
                                                allowshare: (modal
                                                    .find(
                                                        '[type="checkbox"]')
                                                    .is(
                                                        ':checked') ? 1 :
                                                    0),
                                                images: dataEditor.images,
                                                lat: '0',
                                                lng: '0'
                                            };

                                            if (post.authority == 3 ||
                                                post.authority == 4) {
                                                if (!(JSON
                                                        .parse(post.authority_ids).length > 0 || JSON
                                                        .parse(post.authority_tags).length > 0)) {
                                                    callAlert(
                                                        '分享范围不能为空！',
                                                        '<i class="material-icons">error_outline</i>',
                                                        function() {});
                                                    return false;
                                                }
                                            }

                                            // 发布
                                            $
                                                .ajax({
                                                    url: URL_UPDATE_POST,
                                                    data: post,
                                                    type: "POST",
                                                    dataType: 'json',
                                                    success: function(
                                                        result) {
                                                        if (result == 0) {
                                                            callAlert(
                                                                '修改失败！',
                                                                '<i class="material-icons">error_outline</i>',
                                                                function() {});
                                                        } else {
                                                            callAlert(
                                                                '修改成功！',
                                                                '<i class="material-icons">done</i>',
                                                                function() {
                                                                    // modal.modal('hide');
                                                                    location
                                                                        .reload();
                                                                });
                                                        }
                                                    },
                                                    error: function(
                                                        err) {
                                                        callAlert(
                                                            '发布失败！',
                                                            '<i class="material-icons">error_outline</i>',
                                                            function() {});
                                                    }
                                                });
                                        });

                                modal.modal('show');

                            }
                        },
                        error: function(err) {
                            callAlert(
                                '加载失败！',
                                '<i class="material-icons">error_outline</i>',
                                function() {});
                        }
                    });
            } else if (data.role == 2) {
                // 加载用户信息
                $
                    .ajax({
                        url: URL_GET_GROUP_INSTANCE + data.gid,
                        type: "GET",
                        dataType: 'json',
                        success: function(result) {
                            if (result == 0) {
                                callAlert(
                                    '加载失败！',
                                    '<i class="material-icons">error_outline</i>',
                                    function() {});
                            } else {
                                modal.find('[data-name="image"]').prop(
                                    'src',
                                    ImageURLPrefix + result.image);

                                loadShareWith(data.authority, data.role,
                                    data.authority_tags,
                                    data.authority_ids);

                                // 初始化群组分享范围
                                modal
                                    .find('[data-action="sharedwith"]')
                                    .on(
                                        'click',
                                        function() {
                                            var dataShareWith = getShareWith();
                                            var SWModal = new SharedWithModal();
                                            SWModal
                                                .loadForGroup(
                                                    data.gid,
                                                    dataShareWith.type,
                                                    function(
                                                        data,
                                                        submodal) {
                                                        loadShareWith(
                                                            data.type,
                                                            2,
                                                            data.selectedTag,
                                                            data.selectedUser);
                                                        submodal
                                                            .modal('hide');
                                                    })

                                        });

                                loadTitle(data.title);
                                loadContent(data.content);
                                loadCategory(data.category);
                                loadTag(data.tags);
                                loadAllowShared(data.allowShare);

                                // 确定提交
                                modal
                                    .find('[data-action="submit"]')
                                    .on(
                                        'click',
                                        function() {
                                            // 获取数据
                                            var cate = getCategory();
                                            var tags = getTag();

                                            // 编辑器内容
                                            var dataEditor = getContent(data.gid);

                                            var dataShareWith = getShareWith();

                                            var post = {
                                                pid: data.pid,
                                                authority: dataShareWith.type,
                                                title: modal
                                                    .find(
                                                        '[name="title"]')
                                                    .val(),
                                                content: dataEditor.content,
                                                category: JSON
                                                    .stringify(cate),
                                                tags: JSON
                                                    .stringify(tags),
                                                allowshare: (modal
                                                    .find(
                                                        '[type="checkbox"]')
                                                    .is(
                                                        ':checked') ? 1 :
                                                    0),
                                                images: dataEditor.images,
                                                lat: '0',
                                                lng: '0'
                                            };

                                            // 发布
                                            $
                                                .ajax({
                                                    url: URL_UPDATE_POST,
                                                    data: post,
                                                    type: "POST",
                                                    dataType: 'json',
                                                    success: function(
                                                        result) {
                                                        if (result == 0) {
                                                            callAlert(
                                                                '修改失败！',
                                                                '<i class="material-icons">error_outline</i>',
                                                                function() {});
                                                        } else {
                                                            callAlert(
                                                                '修改成功！',
                                                                '<i class="material-icons">done</i>',
                                                                function() {
                                                                    // modal.modal('hide');
                                                                    location
                                                                        .reload();
                                                                });
                                                        }
                                                    },
                                                    error: function(
                                                        err) {
                                                        callAlert(
                                                            '发布失败！',
                                                            '<i class="material-icons">error_outline</i>',
                                                            function() {});
                                                    }
                                                });
                                        });

                                modal.modal('show');
                            }
                        },
                        error: function(err) {
                            callAlert(
                                '加载失败！',
                                '<i class="material-icons">error_outline</i>',
                                function() {});
                        }
                    });
            } else {
                console.log('error');
            }
        } else if (data.type == 2) {
            var SPController = new SharePostController();
            SPController.modifySharePost(data.id);
        } else {
            console.log('error');
        }
    };

};

