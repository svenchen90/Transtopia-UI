<%-- 
    Document   : groups
    Created on : Mar 25, 2017, 10:34:47 AM
    Author     : DaoDao
--%>
<%-- 
    Document   : groups Post New
    Created on : Jan 8, 2017, 10:08:28 PM
    Author     : zhichengfu
--%>
<%@page import="User.Friend"%>
<%@page import="User.User"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Post</title>
        <!-- Tell the browser to be responsive to screen width -->
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <!-- Bootstrap 3.3.6 -->
        <link rel="stylesheet" href="../../plugins/bootstrap-3.3.6/css/bootstrap.min.css">
        <!-- Font Awesome -->
        <link rel="stylesheet" href="../../plugins/font-awesome-4.7.0/css/font-awesome.min.css">
        <!-- Ionicons -->
        <link rel="stylesheet" href="../../plugins/ionicons-2.0.1/css/ionicons.min.css">

        <!-- Theme style -->
        <link rel="stylesheet" href="../../plugins/AdminLTE-2.3.11/css/AdminLTE.min.css">
        <link rel="stylesheet" href="../../plugins/AdminLTE-2.3.11/css/skins/_all-skins.min.css">
        <link rel="stylesheet" href="../../plugins/AdminLTE-2.3.11/css/skins/skin-red-light.min.css">
        <link rel="shortcut icon" href="./Img/logo.png">
        <link href="../../plugins/bootstrap-fileinput/css/fileinput.css" media="all" rel="stylesheet" type="text/css"/>
        <link href="../../plugins/bootstrap-fileinput/themes/explorer/theme.css" media="all" rel="stylesheet" type="text/css"/>


        <!--用户自定义的CSS-->

        <link rel="stylesheet" href="../../plugins/iCheck/all.css">
        <link href="http://netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" rel="stylesheet">
        <link href="css/select2.min.css" rel="stylesheet" />
        <link rel="shortcut icon" href="./Img/logo.png">
        <link href="css/mine.css" rel="stylesheet" />

    </head>

    <%
        User user = null;
        int unMarkerMessage = 0;
        int friendMessage = 0;
        String name = "";
        String userimage = "";
        try {
            user = (User) session.getAttribute("user");
            if (user == null) {
                response.sendRedirect("../../index.jsp");
            } else {
                name = user.name;
                userimage = user.image;
                //unMarkerMessage = News.News.getUnMarkerMessage(user);
                friendMessage = Friend.getRequestUsersNUMByUserID(user.uid);
            }
        } catch (Exception e) {
            response.sendRedirect("../../index.jsp");
        }
    %>
    
    <body class="hold-transition sidebar-mini skin-red-light" id="post_main_page" type="groups" userid="<%=user.my_groupid%>">
        <div class="wrapper">

            <header class="main-header">
                <!-- Logo -->
                <nav class="navbar navbar-static-top" style="margin-left:0px;">
                    <div class="logo">
                        <!-- mini logo for sidebar mini 50x50 pixels -->
                        <span class="logo-mini"><b>T</b></span>
                        <!-- logo for regular state and mobile devices -->
                        <span class="logo-lg"><a href="index.jsp" class="hand_pointer" style="margin-right:10px; color:white"><b>Transtopia</b></a>
<!--                            <i class="fa fa-chevron-circle-right" aria-hidden="true"></i><a class="hand_pointer"  href="index.jsp" style="margin-left:10px; color:white"><b>动态</b></a>-->
                        </span>
                    </div>
                    <!-- Sidebar toggle button-->
                    <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>

                    <div class="collapse navbar-collapse pull-left" id="navbar-collapse">
                        <ul class="nav navbar-nav">
                            <li><a href="#" id="top_nav_name" class="top_nav_name" style="font-size:18px; font-weight:bold">社群</a></li>
                        </ul>
                        <form class="navbar-form navbar-left" role="search" style="margin-left:15px;">
                            <div class="input-group">
                                <input type="text" name="q" class="form-control" placeholder="Search..." id="navbar-search-input" style="width:400px;">
                                <span class="input-group-btn">
                                    <button type="button" name="search" id="do-search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>

                    <div class="navbar-custom-menu" >
                        <ul class="nav navbar-nav">
                            <!-- Messages: style can be found in dropdown.less-->
                            <li class="dropdown messages-menu">
                                <a href="#">
                                    <i class="fa fa-envelope-o"></i>
                                    <span class="label label-success">4</span>
                                </a>
                            </li>
                            <!-- Notifications: style can be found in dropdown.less -->
                            <li class="dropdown notifications-menu">
                                <a href="#" >
                                    <i class="fa fa-bell-o"></i>
                                    <span class="label label-warning">10</span>
                                </a>
                            </li>
                            <!-- Tasks: style can be found in dropdown.less -->
                            <li class="dropdown tasks-menu">
                                <a href="#">
                                    <i class="fa fa-address-book-o"></i>
                                    <span class="label label-danger">9</span>
                                </a>
                            </li>
                            <!-- User Account: style can be found in dropdown.less -->
                            <li class="dropdown user user-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <img src="../../../<%=userimage%>" class="user-image" alt="User Image">
                                    <span class="hidden-xs"><%=name%></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <!-- User image -->
                                    <li class="user-header">
                                        <img src="../../../<%=userimage%>" class="img-circle" alt="User Image">

                                        <p>
                                            <%=name%>
                                            <small>Member since Nov. 2012</small>
                                        </p>
                                    </li>
                                    <!-- Menu Body -->
                                    <li class="user-body">
                                        <div class="row">
                                            <div class="col-xs-4 text-center">
                                                <a href="#">Followers</a>
                                            </div>
                                            <div class="col-xs-4 text-center">
                                                <a href="#">Sales</a>
                                            </div>
                                            <div class="col-xs-4 text-center">
                                                <a href="#">Friends</a>
                                            </div>
                                        </div>
                                        <!-- /.row -->
                                    </li>
                                    <!-- Menu Footer-->
                                    <li class="user-footer">
                                        <div class="pull-left">
                                            <a href="#" class="btn btn-default btn-flat">个人主页</a>
                                        </div>
                                        <div class="pull-right">
                                            <a href="javascript:void(0);" class="btn btn-default btn-flat" onclick="logOut();">退出登录</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <!-- Control Sidebar Toggle Button -->
                            <li>
                                <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                            </li>
                        </ul>
                    </div>


                </nav>

                <nav class="navbar navbar-static-top nav_post_top_bar" style="margin-left:0px; display: block;z-index:500;" id="nav_recommend_tab" status="0">
                    <!-- Sidebar toggle button-->
                    <div class="container-fluid" style="text-align: center;">
                        <ul class="nav navbar-nav" style="float:none;display: inline-block;">
                            <li class="active page_top_nav_list page_top_nav_list_1" style="margin-right:10px;" data-filter="hot_group_items"><a href="javascript:void(0);">推荐</a></li>
                            <li class="page_top_nav_list" style="margin-right:10px;" data-filter="following_group_items"><a href="javascript:void(0);">我的关注</a></li>
                            <li class="page_top_nav_list" style="margin-right:10px;" data-filter="in_group_items"><a href="javascript:void(0);" >我的加入</a></li>
                            <li class="page_top_nav_list" style="margin-right:10px;" data-filter="my_group_items"><a href="javascript:void(0);" >我的创建</a></li>
                        </ul>
                    </div>

                </nav>
            </header>
            <!-- Left side column. contains the logo and sidebar -->
            <aside class="main-sidebar" id="sideBar_Transtopia" style="background-color: #ecf0f5;padding-top:100px;">
                <ul class="sidebar-menu" style="margin-top:20px;">
                    <!-- Optionally, you can add icons to the links -->
                    <li class="sider_nav_list" data-filter="all_posts" data-name="发现"><a href="javascript:void(0);" class="post_nav_tab" ><i class="fa fa-list-ol" aria-hidden="true"></i><span>发现</span></a></li>
                    <li class="sider_nav_list" data-filter="news" data-name="消息"><a href="javascript:void(0);" class="post_nav_tab" ><i class="fa fa-commenting-o" aria-hidden="true"></i><span>消息</span></a></li>
                    <li class="sider_nav_list active" data-filter="groups" data-name="社群"><a href="javascript:void(0);" class="post_nav_tab" ><i class="fa fa-fire" aria-hidden="true"></i><span>社群</span></a></li>                    
                    <li class="sider_nav_list" data-filter="friends" data-name="人脉"><a href="javascript:void(0);" class="post_nav_tab" ><i class="fa fa-star" aria-hidden="true"></i><span>人脉</span></a></li>
                    <li class="sider_nav_list" data-filter="mineInfo" data-name="个人"><a href="javascript:void(0);" class="post_nav_tab" ><i class="fa fa-user-o" aria-hidden="true"></i><span>个人</span></a></li>
                </ul>
                </section>
            </aside>

            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper" style="border-left:none;">
                <section class="content row" id="content_Transtopia">

                    <div class="post_content col-md-12">
                        <div class="container-fluid post_content_page" style="padding-right:0px; padding-left:0px; text-align: center;">
                        </div>

                        <!-- 好友选项框 -->
                        <div class="modal fade" id="modal_sharedwith" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        <h4 class="modal-title" id="myModalLabel">选择分享范围</h4>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label>
                                                <input type="radio" name="r1" class="minimal" value="1" checked>
                                                <span style="margin-left: 20px;">公开</span>
                                            </label>
                                        </div>
                                        <div class="form-group">
                                            <label>
                                                <input type="radio" name="r1" class="minimal" value="2">
                                                <span style="margin-left: 20px;" id='sharedPost_name'>选择分享范围</span>
                                            </label>
                                        </div>

                                        <div class="box hidden">
                                            <div class="box-header">
                                                <h3 class="box-title">分享列表</h3>

                                                <div class="box-tools">
                                                    <div class="input-group input-group-sm" style="width: 150px;">
                                                        <input type="text" name="table_search" class="form-control pull-right" placeholder="搜索">

                                                        <div class="input-group-btn">
                                                            <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- /.box-header -->
                                            <div class="box-body table-responsive no-padding" style="max-height: 400px;">
                                                <table class="table table-hover" >
                                                    <tbody>
                                                        <tr class="friend-nav">
                                                            <td style="font-weight: 500;color: #9e9e9e;">
                                                                好友列表
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        <tr class="group-nav">
                                                            <td style="font-weight: 500;color: #9e9e9e;">
                                                                群组列表
                                                            </td>
                                                            <td></td>
                                                        </tr>

                                                    </tbody></table>
                                            </div>
                                            <!-- /.box-body -->
                                        </div>

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                        <button type="button" class="btn btn-primary submit">确认</button>
                                    </div>
                                </div><!-- /.modal-content -->
                            </div><!-- /.modal -->
                        </div> 
                        <!-- /.post moment -->
                        <div class="modal fade" id="newpost_beta" tabindex="-1" data-role='1'>
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header" style="padding-bottom: 5px;">
                                        <button type="button" class="close" data-dismiss="modal">
                                            &times;
                                        </button>
                                        <h4 class="modal-title">
                                            <img src="" class="img-circle img-bordered-sm" style="width: 50px; height: 50px;">
                                            <span id="user-block" class="dropdown">
                                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                                </a>
                                                <ul class="dropdown-menu">

                                                </ul>
                                            </span>
                                            <b class="fa fa-caret-right" style="font-size: 16px; margin-left:5px;"></b>
                                            <span style="margin-left: 5px; font-weight: 500;">
                                               <a href="#modal_sharedwith" data-toggle="modal"><i class="fa fa-globe" style="color: #757575;"></i></a>
                                                <span id="sharedwith_span" data-sharedwith="1" style="font-size: 12px;"></span>
                                            </span>
                                        </h4>
                                    </div>
                                    <div class="modal-body">
                                        <div id="moment-content">
                                            <div class="form-group">
                                                <label>标题</label>
                                                <input id="moment-title" class="form-control" placeholder="请输入标题">
                                            </div>
                                            <div class="btn-toolbar" data-role="editor-toolbar" data-target="#editor">
                                                <div class="btn-group">
                                                    <a class="btn dropdown-toggle" data-toggle="dropdown" title="字体"><i class="icon-font"></i><b class="caret"></b></a>
                                                    <ul class="dropdown-menu">
                                                    </ul>
                                                </div>
                                                <div class="btn-group">
                                                    <a class="btn dropdown-toggle" data-toggle="dropdown" title="字体大小"><i class="icon-text-height"></i>&nbsp;<b class="caret"></b></a>
                                                    <ul class="dropdown-menu">
                                                        <li><a data-edit="fontSize 5"><font size="5">大</font></a></li>
                                                        <li><a data-edit="fontSize 3"><font size="3">中</font></a></li>
                                                        <li><a data-edit="fontSize 1"><font size="1">小</font></a></li>
                                                    </ul>
                                                </div>
                                                <div class="btn-group">
                                                    <a class="btn" data-edit="bold" title="加粗 (Ctrl/Cmd+B)"><i class="icon-bold"></i></a>
                                                    <a class="btn" data-edit="italic" title="斜体 (Ctrl/Cmd+I)"><i class="icon-italic"></i></a>
                                                    <a class="btn" data-edit="strikethrough" title="（加） 删除线"><i class="icon-strikethrough"></i></a>
                                                    <a class="btn" data-edit="underline" title="下划线 (Ctrl/Cmd+U)"><i class="icon-underline"></i></a>
                                                </div>
                                                <div class="btn-group">
                                                    <a class="btn" data-edit="insertunorderedlist" title="项目列表"><i class="icon-list-ul"></i></a>
                                                    <a class="btn" data-edit="insertorderedlist" title="数字列表"><i class="icon-list-ol"></i></a>
                                                    <a class="btn" data-edit="outdent" title="清除缩进 (Shift+Tab)"><i class="icon-indent-left"></i></a>
                                                    <a class="btn" data-edit="indent" title="缩进 (Tab)"><i class="icon-indent-right"></i></a>
                                                </div>
                                                <div class="btn-group">
                                                    <a class="btn" data-edit="justifyleft" title="居左 (Ctrl/Cmd+L)"><i class="icon-align-left"></i></a>
                                                    <a class="btn" data-edit="justifycenter" title="居中 (Ctrl/Cmd+E)"><i class="icon-align-center"></i></a>
                                                    <a class="btn" data-edit="justifyright" title="居右 (Ctrl/Cmd+R)"><i class="icon-align-right"></i></a>
                                                    <a class="btn" data-edit="justifyfull" title="正常 (Ctrl/Cmd+J)"><i class="icon-align-justify"></i></a>
                                                </div>
                                                <div class="btn-group">
                                                    <a class="btn dropdown-toggle" data-toggle="dropdown" title="超链接"><i class="icon-link"></i></a>
                                                    <div class="dropdown-menu input-append">
                                                        <input class="span2" placeholder="URL" type="text" data-edit="createLink"/>
                                                        <button class="btn" type="button">添加</button>
                                                    </div>
                                                    <a class="btn" data-edit="unlink" title="去除链接"><i class="icon-cut"></i></a>
                                                </div>
                                                <div class="btn-group">
                                                    <a class="btn" title="浏览或拖拽添加图片" id="pictureBtn"><i class="icon-picture"></i></a>
                                                    <input type="file" data-role="magic-overlay" data-target="#pictureBtn" data-edit="insertImage" />
                                                </div>
                                                <div class="btn-group">
                                                    <a class="btn" data-edit="undo" title="撤消 (Ctrl/Cmd+Z)"><i class="icon-undo"></i></a>
                                                    <a class="btn" data-edit="redo" title="重复 (Ctrl/Cmd+Y)"><i class="icon-repeat"></i></a>
                                                </div>
                                            </div>
                                            <div id="editor" class="editor"></div>
                                            <!-- 更多选项 -->
                                            <div class="timeline-footer">
                                                <div class="form-group">
                                                    <label>分类: </label>
                                                    <select id="select-genre" class="form-control"  multiple="multiple" style="width: 100%; display: inline-block;" data-placeholder="请选择类别">
                                                    </select>
                                                </div>
                                                <div >
                                                    <label>标签: </label>
                                                    <select id="select-tags" class="form-control" multiple="multiple" data-placeholder="请选择标签" style="width: 100%;">
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="clearfix" style="margin-top:5px;">
                                                <a id="shareMoment-btn" class="btn btn-primary btn-flat btn-xs pull-right">分享</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal fade" id="tab_creategroup" tabindex="-1">
                            <div class="modal-dialog" style="width: 1000px;">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        <h4 class="modal-title">创建新的群组</h4>
                                    </div>
                                    <div class="modal-body row" style="min-height: 400px;">
                                        <div class="col-sm-3">
                                            <a href="#tab_1" data-toggle="tab" class="btn btn-block btn-social btn-default" ><i class="fa fa-cube"></i> 基本信息</a>
                                            <a href="#tab_2" data-toggle="tab" class="btn btn-block btn-social btn-default"><i class="fa fa-users"></i> 成员列表</a>
                                            <a href="#tab_3" data-toggle="tab" class="btn btn-block btn-social btn-default"><i class="fa fa-gear"></i> 其他</a>
                                        </div>
                                        <div class="tab-content col-sm-9">
                                            <div class="tab-pane active" id="tab_1">
                                                <div class="form-group">
                                                    <label>群组名称：</label>
                                                    <input name="name" type="text" class="form-control" placeholder="请输入群组名称">
                                                </div>

                                                <!-- 上传商品封面 -->
                                                <div class="form-group">
                                                    <label>上传群组头像：</label>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control">
                                                        <div class="input-group-addon btn btn-default btn-file post-file">
                                                            <i class="fa fa-image"></i> 上传图片 <input name="poster" type="file" single>
                                                        </div>
                                                    </div>
                                                    <img id="myImg" class="img-thumbnail col-md-6 hide" src="#" style="margin-top:10px;"/>
                                                    <div class="clearfix"></div>
                                                </div>
                                                
                                                <div class="form-group">
                                                    <label>上传背景图片：</label>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control">
                                                        <div class="input-group-addon btn btn-default btn-file post-file1">
                                                            <i class="fa fa-image"></i> 上传背景图片 <input name="poster" type="file" single>
                                                        </div>
                                                    </div>
                                                    <img id="myImg-bg" class="img-thumbnail col-md-6 hide" src="#" style="margin-top:10px;"/>
                                                    <div class="clearfix"></div>
                                                </div>
                                                <div class="form-group">
                                                    <label>群组类别：</label>
                                                    <select name="topic" id="group-topic" class="form-control" multiple="multiple" data-placeholder="请选择群组类别" style="width: 100%;">
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>群组标签：</label>
                                                    <select name="tags" id="group-tags" class="form-control" multiple="multiple" data-placeholder="请选择群组标签" style="width: 100%;">
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>群组简介: </label>
                                                    <textarea name="introduction" type="text" class="form-control" rows=4 placeholder="请输入群组简介 不多于50字"></textarea>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="tab_2">
                                                <div class="form-group">
                                                    <label>群组成员：</label>
                                                    <select name="member" id="select-member" class="form-control" multiple="multiple" data-placeholder="请添加群组成员" style="width: 100%;">
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="tab_3">
                                                <div class="form-group">
                                                    <label>群组空间大小：</label>
                                                    <select name="filesize" id="group_size" class="form-control" style="width: 100%;">
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>允许最大成员数：</label>
                                                    <select name="memberlimit" id="group_memberlimit" class="form-control" style="width: 100%;">
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>文件消息存放时效：</label>
                                                    <select name="filexpire" id="group_filexpire" class="form-control" style="width: 100%;">
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>最大分组数：</label>
                                                    <select name="subgrouplimit" id="group_subgrouplimit" class="form-control" style="width: 100%;">
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>
                                                        <input type="checkbox" class="minimal" name="r1">
                                                        仅允许群组以及管理员邀请新成员
                                                    </label>
                                                </div>
                                                <div class="form-group">
                                                    <label>
                                                        <input type="checkbox" class="minimal" name="r2">
                                                        新成员加入需要管理员验证
                                                    </label>
                                                </div>
                                                <div class="form-group">
                                                    <label>
                                                        <input type="checkbox" class="minimal" name="r3">
                                                        消息免打扰
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                        <button type="button" class="btn btn-primary btn-create">创建群组</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                         <!-- /edit moment -->
                        <div class="modal fade" id="editpost" tabindex="-1" data-role='1'>
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header" style="padding-bottom: 5px;">
                                        <button type="button" class="close" data-dismiss="modal">
                                            &times;
                                        </button>
                                        <h4 class="modal-title">
                                            修改动态
                                        </h4>
                                    </div>
                                    <div class="modal-body">
                                        <div id="moment-content">
                                            <div class="form-group">
                                                <label>标题</label>
                                                <input id="edit_moment-title" class="form-control" placeholder="请输入标题">
                                            </div>
                                            <div class="btn-toolbar" data-role="editor-toolbar" data-target="#editor">
                                                <div class="btn-group">
                                                    <a class="btn dropdown-toggle" data-toggle="dropdown" title="字体"><i class="icon-font"></i><b class="caret"></b></a>
                                                    <ul class="dropdown-menu">
                                                    </ul>
                                                </div>
                                                <div class="btn-group">
                                                    <a class="btn dropdown-toggle" data-toggle="dropdown" title="字体大小"><i class="icon-text-height"></i>&nbsp;<b class="caret"></b></a>
                                                    <ul class="dropdown-menu">
                                                        <li><a data-edit="fontSize 5"><font size="5">大</font></a></li>
                                                        <li><a data-edit="fontSize 3"><font size="3">中</font></a></li>
                                                        <li><a data-edit="fontSize 1"><font size="1">小</font></a></li>
                                                    </ul>
                                                </div>
                                                <div class="btn-group">
                                                    <a class="btn" data-edit="bold" title="加粗 (Ctrl/Cmd+B)"><i class="icon-bold"></i></a>
                                                    <a class="btn" data-edit="italic" title="斜体 (Ctrl/Cmd+I)"><i class="icon-italic"></i></a>
                                                    <a class="btn" data-edit="strikethrough" title="（加） 删除线"><i class="icon-strikethrough"></i></a>
                                                    <a class="btn" data-edit="underline" title="下划线 (Ctrl/Cmd+U)"><i class="icon-underline"></i></a>
                                                </div>
                                                <div class="btn-group">
                                                    <a class="btn" data-edit="insertunorderedlist" title="项目列表"><i class="icon-list-ul"></i></a>
                                                    <a class="btn" data-edit="insertorderedlist" title="数字列表"><i class="icon-list-ol"></i></a>
                                                    <a class="btn" data-edit="outdent" title="清除缩进 (Shift+Tab)"><i class="icon-indent-left"></i></a>
                                                    <a class="btn" data-edit="indent" title="缩进 (Tab)"><i class="icon-indent-right"></i></a>
                                                </div>
                                                <div class="btn-group">
                                                    <a class="btn" data-edit="justifyleft" title="居左 (Ctrl/Cmd+L)"><i class="icon-align-left"></i></a>
                                                    <a class="btn" data-edit="justifycenter" title="居中 (Ctrl/Cmd+E)"><i class="icon-align-center"></i></a>
                                                    <a class="btn" data-edit="justifyright" title="居右 (Ctrl/Cmd+R)"><i class="icon-align-right"></i></a>
                                                    <a class="btn" data-edit="justifyfull" title="正常 (Ctrl/Cmd+J)"><i class="icon-align-justify"></i></a>
                                                </div>
                                                <div class="btn-group">
                                                    <a class="btn dropdown-toggle" data-toggle="dropdown" title="超链接"><i class="icon-link"></i></a>
                                                    <div class="dropdown-menu input-append">
                                                        <input class="span2" placeholder="URL" type="text" data-edit="createLink"/>
                                                        <button class="btn" type="button">添加</button>
                                                    </div>
                                                    <a class="btn" data-edit="unlink" title="去除链接"><i class="icon-cut"></i></a>
                                                </div>
                                                <div class="btn-group">
                                                    <a class="btn" title="浏览或拖拽添加图片" id="pictureBtn"><i class="icon-picture"></i></a>
                                                    <input type="file" data-role="magic-overlay" data-target="#pictureBtn" data-edit="insertImage" style="width:40px;height:40px;"/>
                                                </div>
                                                <div class="btn-group">
                                                    <a class="btn" data-edit="undo" title="撤消 (Ctrl/Cmd+Z)"><i class="icon-undo"></i></a>
                                                    <a class="btn" data-edit="redo" title="重复 (Ctrl/Cmd+Y)"><i class="icon-repeat"></i></a>
                                                </div>
                                            </div>
                                            <div id="edit_editor" class="editor"></div>
                                            <!-- 更多选项 -->
                                            <div class="timeline-footer">
                                                <div class="form-group">
                                                    <label>分类: </label>
                                                    <select id="edit_select-genre" class="form-control"  multiple="multiple" style="width: 100%; display: inline-block;" data-placeholder="请选择类别">
                                                    </select>
                                                </div>
                                                <div >
                                                    <label>标签: </label>
                                                    <select id="edit_select-tags" class="form-control" multiple="multiple" data-placeholder="请选择标签" style="width: 100%;">
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="clearfix" style="margin-top:5px;">
                                                <a id="editMoment-btn" class="btn btn-primary btn-flat btn-xs pull-right">确定修改</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                         
                          <div class="modal fade" id="modal_tagNote" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        <h4 class="modal-title" id="myModalLabel">请添加要收藏的Note</h4>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label>标签: </label>
                                            <select id="collection-tags" class="form-control" multiple="multiple" data-placeholder="请添加Note" style="width: 100%;">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                        <button type="button" class="btn btn-primary submit doNoteSumbit">确认</button>
                                    </div>
                                </div><!-- /.modal-content -->
                            </div><!-- /.modal -->
                        </div> 
                        
                        <a class="btn btn-danger btn-lg" style=" position: fixed; top: 90vh; right: 80px; z-index: 10000;   width: 50px;
                           height: 50px;
                           padding: 10px 16px;
                           font-size: 20px;
                           line-height: 1.33;
                           border-radius: 25px;" href="#newpost_beta" data-toggle="modal"><i class="fa fa-pencil"></i></a>
                        <!-- 修改20170317 #14结束 -->
                </section>
                <!-- /.content -->
            </div>
            <!-- /.content-wrapper -->
            <!--            <footer class="main-footer">
                            <div class="pull-right hidden-xs">
                                <b>Version</b> 2.3.5
                            </div>
                            <strong>Copyright &copy; 2014-2017 <a href="http://almsaeedstudio.com">Transtopia</a>.</strong> All rights
                            reserved.
                        </footer>-->

            <!-- Control Sidebar -->
            <aside class="control-sidebar control-sidebar-dark">
                <!-- Create the tabs -->
                <!-- Tab panes -->
                <div class="tab-content">
                    <!-- Settings tab content -->
                    <div class="tab-pane active" id="control-sidebar-theme">
                        <!-- /.control-sidebar-menu -->

                    </div>
                    <!-- /.tab-pane -->
                </div>
            </aside>
            <div class="control-sidebar-bg"></div>
        </div>
        <!-- ./wrapper -->

        <!-- jQuery 2.2.3 -->

    </body>

    <script src="../../plugins/jQuery/jquery-2.2.3.min.js"></script>
    <script src="../../JS/jquery-ui.min.js"></script>
    <!-- Bootstrap 3.3.6 -->
    <script src="../../plugins/bootstrap-3.3.6/js/bootstrap.min.js"></script>
    <!-- AdminLTE App -->
    <script src="../../plugins/AdminLTE-2.3.11/js/app.min.js"></script>
    <!-- Slimscroll -->
    <script src="../../plugins/slimScroll/jquery.slimscroll.min.js"></script>
    <!-- FastClick -->
    <script src="../../JS/raphael-min.js"></script>
    <script src="../../JS/morris.min.js"></script>
    <script src="../../plugins/fastclick/fastclick.min.js"></script>
    <script src="../../plugins/bootstrap-fileinput/js/plugins/sortable.js" type="text/javascript"></script>
    <script src="../../plugins/bootstrap-fileinput/js/fileinput.js" type="text/javascript"></script>
    <script src="../../plugins/bootstrap-fileinput/themes/explorer/theme.js" type="text/javascript"></script>
    <script src="../../plugins/bootstrap-fileinput/js/locales/zh.js" type="text/javascript"></script>


    <script src="bootstrap-wysiwyg/external/jquery.hotkeys.js"></script>
    <!-- <script src="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js"></script> -->
    <script src="bootstrap-wysiwyg/external/google-code-prettify/prettify.js"></script>
    <script src="bootstrap-wysiwyg/bootstrap-wysiwyg.js"></script>

    <script src="../../JS/sideRow.js"></script>
    <!--    <script src="../../JS/Admin_Head/mine.js"></script>-->
    <script>
                                                        $.widget.bridge('uibutton', $.ui.button);
    </script>
    <!-- custome javascript and css-->
    <script src="../../plugins/iCheck/icheck.min.js"></script>
    <script src="js/select2.full.min.js"></script>
    <script src="js/mine.js"></script>
    <!-- 用户自定义的javascript-->



</html>

