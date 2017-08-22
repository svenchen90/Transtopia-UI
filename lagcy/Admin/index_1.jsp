<%-- 
    Document   : index
    Created on : Apr 6, 2016, 3:04:34 PM
    Author     : zhichengfu
--%>

<%@page import="FileM.User"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en" class="no-js" style="min-height: 100%;">
    <head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">

        <script type="text/javascript" async="" src="./JS/linkid.js"></script>
        <script type="text/javascript" async="" src="./JS/ec.js"></script>
        <script type="text/javascript" async="" defer="" src="./JS/goal.min.js"></script>
        <title>我的Transtopia</title>
        <link href="../CSS/AdminHead/style.css" media="all" rel="stylesheet" type="text/css">
        <link href="../CSS/font-awesome.css" media="all" rel="stylesheet" type="text/css">
        <link href="../CSS/bootstrap.min.css" media="all" rel="stylesheet" type="text/css">
        <link rel="shortcut icon" href="./Img/logo.png">
        <script src="../JS/jquery.min.js"></script>
        <script src="../JS/bootstrap.min.js"></script>
        <script src="../JS/jquery-ui.min.js"></script>
        

        <%
            User user;
            try {
                user = (User) session.getAttribute("user");
                if (user == null) {
                    response.sendRedirect("../index.jsp");
                }
            } catch (Exception e) {
                response.sendRedirect("../index.jsp");
            }


        %>

        <style>
            .nav>li>a:focus, .nav>li>a:hover{
                background-color: black;
                color: white;
            }
            .showprofile
            {
                z-index: 100000;
            }
        </style>
    </head>
    <body id="mainBody" class="full-screen-preview" copyid="">
        <nav class="navbar admin_head" style="border-radius:0px;margin-bottom:0px;border:none;" >
            <div class="container-fluid  ">
                <div class="navbar-header">
                    <a class="navbar-brand admin_a" href="#">Transtopia</a>
                </div>
                <ul class="nav navbar-nav">
                    <li><a id="head1" href="javascript:void(0);" class="admin_a" onclick="showMainContent('1')">消息</a></li>
                    <li><a id="head2" href="javascript:void(0);" class="admin_a" onclick="showMainContent('2')">动态</a></li>
                    <li><a id="head3" href="javascript:void(0);" class="admin_a" onclick="showMainContent('3')">项目管理</a></li>
                    <li><a id="head4" href="javascript:void(0);" class="admin_a" onclick="showMainContent('4')">应用管理</a></li>
                    <li><a id="head5" href="javascript:void(0);" class="admin_a" onclick="showMainContent('5')">论坛</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right" style="margin-right: 10px;">
                    <li><i class="fa fa-plus admin_fa" style="font-size:18px;"></i></li>
                    <li><i class="fa fa-bell admin_fa" style="font-size:18px;"></i></li>
                    <li><i class="fa fa-address-card admin_fa" style="font-size:18px;"></i></li>
                    <li>
                        <div class="dropdown">
                            <i class="fa fa-user-circle dropdown-toggle admin_fa" style="font-size:18px;" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);" onclick="logOut()">安全退出</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        <iframe id="f_content" class="full-screen-preview__frame" src="welcome.html" frameborder="0" noresize="noresize" data-view="fullScreenPreview" style="display: block">
        </iframe>
        <div id="myModal_main" class="modal fade" role="dialog" style="border: none;background: transparent; overflow:hidden;">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">当前信息提醒</h4>
                    </div>
                    <div class="modal-body">
                        <p>你当前的页面信息即将过期，你可以点击继续按钮继续当前的操作</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" onclick=" ResetTimeOutTimer();">继续</button>
                    </div>
                </div>

            </div>
        </div>


        <div id="tempff"></div>
        <script>
            StartWarningTimer();
        </script>
    </body>
</html>d